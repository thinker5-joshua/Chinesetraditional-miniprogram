// 游戏数据存储
let gameData = {
    caves: [],
    poets: [],
    currentCave: null,
    currentPoem: null,
    hiddenChars: [],
    selectedPoetId: null,
    revealedHints: 0
};

// 全局变量用于存储当前显示的洞天和定时器
let currentDisplayedCaves = [];
let caveRotationTimer = null;

Page({
  data: {
    currentView: 'compass',
    showStars: true,
    showSuccessModal: false,
    showErrorModal: false,
    cavePromptText: '',
    currentCave: null,
    currentPoem: null,
    currentCavePoem: null,
    displayedCaves: [],
    mapMarkers: []
  },

  onLoad() {
    console.log('页面开始加载...');
    this.loadGameData();
    this.setupEventListeners();
    console.log('页面加载完成，当前视图:', this.data.currentView);
  },

  onShow() {
    // 页面显示时确保地图容器可见
    console.log('页面显示，当前洞天体数量:', this.data.displayedCaves.length);
    this.ensureContainersVisible();
    
    // 如果没有洞天体显示，重新初始化
    if (this.data.displayedCaves.length === 0) {
      console.log('洞天体未显示，重新初始化...');
      setTimeout(() => {
        this.initializeImmortalMap();
      }, 200);
    }
  },

  onHide() {
    // 清理定时器
    if (caveRotationTimer) {
      clearInterval(caveRotationTimer);
    }
  },

  onUnload() {
    // 页面卸载时清理资源
    if (caveRotationTimer) {
      clearInterval(caveRotationTimer);
    }
  },

  /**
   * 加载游戏数据
   */
  loadGameData() {
    try {
      console.log('开始加载游戏数据...');
      // 使用JavaScript模块加载数据
      const data = require('./data_full.js');
      
      // 存储游戏数据
      gameData.caves = data.caves || [];
      gameData.poets = data.poets || [];
      
      console.log('成功加载数据:', gameData.caves.length, '个洞天');
      console.log('洞天数据样本:', gameData.caves.slice(0, 2).map(c => ({ id: c.id, name: c.name })));
      
      // 延迟初始化仙界地图，确保数据完全加载
      setTimeout(() => {
        this.initializeImmortalMap();
      }, 100);
    } catch (error) {
      console.error('加载数据失败:', error);
      // 使用模拟数据
      this.useMockData();
    }
  },

  /**
   * 使用模拟数据（当无法加载data.json时使用）
   */
  useMockData() {
    // 模拟数据与data.json中的结构一致，每个洞天直接包含相关诗词
    gameData.caves = [
      {
        "id": 1,
        "name": "黄山",
        "location": "安徽省黄山市",
        "description": "黄山位于安徽省南部，以奇松、怪石、云海、温泉'四绝'闻名于世，被誉为'天下第一奇山'。",
        "mapImage": "assets/images/gugong.jpg",
        "related_poems": [
          {
            "id": "huangshan-001",
            "title": "送温处士归黄山白鹅峰旧居",
            "author": "李白",
            "content": "黄山四千仞，三十二莲峰。丹崖夹石柱，菡萏金芙蓉。",
            "dynasty": "盛唐",
            "connection_reason": "李白赞美黄山的雄伟壮观。"
          }
        ]
      },
      {
        "id": 2,
        "name": "西湖",
        "location": "浙江省杭州市",
        "description": "西湖位于浙江省杭州市西面，是中国大陆首批国家重点风景名胜区和中国十大风景名胜之一。",
        "mapImage": "assets/images/huangshan.jpg",
        "related_poems": [
          {
            "id": "westlake-001",
            "title": "饮湖上初晴后雨",
            "author": "苏轼",
            "content": "水光潋滟晴方好，山色空蒙雨亦奇。欲把西湖比西子，淡妆浓抹总相宜。",
            "dynasty": "北宋",
            "connection_reason": "苏轼描写西湖美景的经典之作。"
          }
        ]
      }
    ];
    
    // 初始化仙界地图
    this.initializeImmortalMap();
  },

  /**
   * 确保容器可见
   */
  ensureContainersVisible() {
    // 小程序中容器默认可见，主要是确保数据正确
  },

  /**
   * 初始化仙界地图
   */
  initializeImmortalMap() {
    console.log('开始初始化仙界地图...');
    
    // 创建星空效果
    this.createStars();
    
    // 打印游戏数据信息
    console.log('游戏数据中有洞天数量:', gameData.caves ? gameData.caves.length : 0);
    
    // 检查数据有效性
    if (!gameData.caves || gameData.caves.length === 0) {
      console.error('游戏数据为空，无法初始化地图');
      wx.showToast({
        title: '数据加载失败',
        icon: 'none'
      });
      return;
    }
    
    // 立即显示洞天体，与地图同步显示
    console.log('开始显示随机洞天...');
    currentDisplayedCaves = this.displayRandomCaves();
    console.log('洞天体数据准备完成:', currentDisplayedCaves);
    
    // 更新页面数据
    this.setData({
      displayedCaves: currentDisplayedCaves,
      currentView: 'compass'
    }, () => {
      console.log('页面数据更新完成，洞天体数量:', currentDisplayedCaves.length);
      console.log('当前视图状态:', this.data.currentView);
      console.log('实际页面数据中的洞天数量:', this.data.displayedCaves.length);
      
      // 强制触发页面重绘
      setTimeout(() => {
        this.setData({
          displayedCaves: [...currentDisplayedCaves]
        });
      }, 100);
    });
    
    console.log('洞天体显示完成，共显示:', currentDisplayedCaves.length);
    
    // 设置定时器，每2秒轮换显示新的洞天体
    console.log('启动洞天轮换定时器...');
    this.startCaveRotation();
    console.log('仙界地图初始化完成');
  },

  /**
   * 创建星星效果
   */
  createStars() {
    // 小程序中通过CSS动画实现星星效果
    this.setData({
      showStars: true
    });
  },

  /**
   * 开始洞天轮换
   */
  startCaveRotation() {
    // 清除已有的定时器（如果存在）
    if (caveRotationTimer) {
      clearInterval(caveRotationTimer);
    }
    
    // 设置新的定时器，每2秒执行一次
    caveRotationTimer = setInterval(() => {
      // 淡出当前洞天体
      this.fadeOutCurrentCaves();
      
      // 短暂延迟后显示新的洞天体
      setTimeout(() => {
        currentDisplayedCaves = this.displayRandomCaves();
        this.setData({
          displayedCaves: currentDisplayedCaves
        });
      }, 400);
    }, 2000);
  },

  /**
   * 淡出当前洞天
   */
  fadeOutCurrentCaves() {
    // 在小程序中通过数据更新实现动画
    this.setData({
      displayedCaves: []
    });
  },

  /**
   * 在地图上显示随机的5个洞天，分布在仙界地图区域内
   */
  displayRandomCaves() {
    console.log('开始显示随机洞天...');
    
    // 定义洞天体在地图区域内的随机位置和颜色
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#ff9ff3', '#a29bfe', '#fd79a8'];
    
    // 3. 从游戏数据中随机选择5个洞天
    let cavesToDisplay = [];
    if (gameData.caves && gameData.caves.length > 0) {
      console.log('使用游戏数据中的洞天，总数:', gameData.caves.length);
      // 复制数组以避免修改原始数据
      const cavesCopy = [...gameData.caves];
      // 随机排序并取前5个
      cavesToDisplay = cavesCopy.sort(() => Math.random() - 0.5).slice(0, Math.min(5, cavesCopy.length));
    } else {
      console.log('使用默认洞天数据');
      // 如果没有洞天数据，使用默认数据
      cavesToDisplay = [
        { id: 1, name: '黄山', related_poems: [{id: 'default-1', title: '黄山美景', author: '诗人', content: '黄山奇景甲天下', dynasty: '古代'}] },
        { id: 2, name: '西湖', related_poems: [{id: 'default-2', title: '西湖风光', author: '诗人', content: '西湖美景不胜收', dynasty: '古代'}] },
        { id: 3, name: '桂林山水', related_poems: [{id: 'default-3', title: '桂林山水', author: '诗人', content: '桂林山水甲天下', dynasty: '古代'}] },
        { id: 4, name: '庐山', related_poems: [{id: 'default-4', title: '庐山云雾', author: '诗人', content: '庐山云雾绕青峰', dynasty: '古代'}] },
        { id: 5, name: '长江三峡', related_poems: [{id: 'default-5', title: '长江三峡', author: '诗人', content: '三峡风光无限好', dynasty: '古代'}] }
      ];
    }
    
    console.log('选择的洞天数量:', cavesToDisplay.length);
    
    // 创建所有洞天体，确保不重叠
    const displayCaves = [];
    const positions = [];
    
    for (let i = 0; i < cavesToDisplay.length; i++) {
      const cave = cavesToDisplay[i];
      let x, y;
      let attempts = 0;
      
      // 尝试找到不重叠的位置
      do {
        // 使用网格布局避免重叠
        const gridCols = 3; // 3列布局
        const cellWidth = 25; // 每列宽度25%
        const cellHeight = 25; // 每行高度25%
        
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);
        
        x = 10 + col * cellWidth + Math.random() * 10; // 10%开始，加随机偏移
        y = 5 + row * cellHeight + Math.random() * 8;   // 5%开始，加随机偏移
        
        attempts++;
      } while (positions.some(pos => 
        Math.abs(pos.x - x) < 15 && Math.abs(pos.y - y) < 15
      ) && attempts < 50);
      
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      positions.push({ x, y });
      
      console.log(`创建洞天 ${i + 1}/${cavesToDisplay.length}: ${cave.name}，位置(${x.toFixed(1)}%, ${y.toFixed(1)}%)，颜色: ${colors[colorIndex]}`);
      
      displayCaves.push({
        id: cave.id,
        name: cave.name,
        x: x,
        y: y,
        color: colors[colorIndex],
        animationDelay: `${i * 0.3}s`,
        zIndex: 1000 + i
      });
    }
    
    console.log('所有洞天体创建完成，预期数量:', cavesToDisplay.length, '，实际创建数量:', displayCaves.length);
    console.log('洞天体详情:', displayCaves.map(c => ({ name: c.name, pos: `(${c.x}%, ${c.y}%)` })));
    return displayCaves;
  },

  /**
   * 设置事件监听器
   */
  setupEventListeners() {
    // 小程序中事件通过WXML绑定处理
  },



  /**
   * 仙界任意门点击
   */
  startMapClick() {
    console.log('点击仙界任意门');
    
    // 暂停定时器
    if (caveRotationTimer) {
      clearInterval(caveRotationTimer);
    }
    
    // 播放音效
    this.playFairyDoorSound();
    
    // 延迟后选择随机洞天
    setTimeout(() => {
      this.selectRandomCaveFromDisplayed();
    }, 1100);
  },

  /**
   * 播放任意门音效
   */
  playFairyDoorSound() {
    try {
      const audio = wx.createInnerAudioContext();
      audio.src = '/subgames/future/sounds/success.wav';
      audio.volume = 0.6;
      audio.play();
      
      // 振动反馈
      wx.vibrateShort({ type: 'light' });
    } catch (error) {
      console.log('音效播放失败:', error);
    }
  },

  /**
   * 点击选择洞天
   */
  selectCave(e) {
    const caveId = e.currentTarget.dataset.caveId;
    
    // 暂停定时器
    if (caveRotationTimer) {
      clearInterval(caveRotationTimer);
    }
    
    // 查找对应的洞天数据
    gameData.currentCave = gameData.caves.find(cave => cave.id === caveId);
    
    if (!gameData.currentCave) {
      wx.showToast({
        title: '洞天数据加载失败',
        icon: 'none'
      });
      return;
    }
    
    // 从该洞天相关的诗词中随机选择一首
    if (gameData.currentCave.related_poems && gameData.currentCave.related_poems.length > 0) {
      gameData.currentPoem = gameData.currentCave.related_poems[Math.floor(Math.random() * gameData.currentCave.related_poems.length)];
    } else {
      // 设置一个基本的默认诗词
      gameData.currentPoem = {
        title: '默认诗词',
        content: '此处应有诗词内容',
        author: '未知诗人',
        explanation: '暂无解释'
      };
    }
    
    // 重置游戏状态
    gameData.hiddenChars = [];
    gameData.selectedPoetId = null;
    gameData.revealedHints = 0;
    
    // 播放选择音效
    this.playSelectSound();
    
    // 更新页面数据
    this.setData({
      currentCave: gameData.currentCave,
      currentPoem: gameData.currentPoem,
      cavePromptText: `你即将进入${gameData.currentCave.name}，请你完成此洞天诗词通关`,
      displayedCaves: [] // 隐藏洞天体
    });
    
    // 延迟后切换到诗词挑战视图
    setTimeout(() => {
      this.showPoetryChallengeView();
    }, 1000);
  },

  /**
   * 播放选择音效
   */
  playSelectSound() {
    try {
      const audio = wx.createInnerAudioContext();
      audio.src = '/subgames/future/sounds/success.wav';
      audio.volume = 0.5;
      audio.play();
      
      // 振动反馈
      wx.vibrateShort({ type: 'light' });
    } catch (error) {
      console.log('选择音效播放失败:', error);
    }
  },

  /**
   * 地图标记点击
   */
  onMarkerTap(e) {
    const markerId = e.detail.markerId;
    console.log('点击地图标记:', markerId);
  },

  /**
   * 从当前显示的5个洞天中随机选择一个
   */
  selectRandomCaveFromDisplayed() {
    if (currentDisplayedCaves.length === 0) {
      // 重新显示洞天体
      currentDisplayedCaves = this.displayRandomCaves();
      this.setData({
        displayedCaves: currentDisplayedCaves
      });
      return;
    }
    
    // 随机选择一个洞天
    const randomIndex = Math.floor(Math.random() * currentDisplayedCaves.length);
    const selectedCave = currentDisplayedCaves[randomIndex];
    
    // 查找对应的洞天数据
    gameData.currentCave = gameData.caves.find(cave => cave.id === selectedCave.id);
    
    // 从该洞天相关的诗词中随机选择一首
    if (gameData.currentCave && gameData.currentCave.related_poems && gameData.currentCave.related_poems.length > 0) {
      gameData.currentPoem = gameData.currentCave.related_poems[Math.floor(Math.random() * gameData.currentCave.related_poems.length)];
    } else {
      // 设置一个基本的默认诗词
      gameData.currentPoem = {
        title: '默认诗词',
        content: '此处应有诗词内容',
        author: '未知诗人',
        explanation: '暂无解释'
      };
    }
    
    // 重置游戏状态
    gameData.hiddenChars = [];
    gameData.selectedPoetId = null;
    gameData.revealedHints = 0;
    
    // 更新页面数据
    this.setData({
      currentCave: gameData.currentCave,
      currentPoem: gameData.currentPoem,
      cavePromptText: `你即将进入${gameData.currentCave.name}，请你完成此洞天诗词通关`,
      displayedCaves: [] // 隐藏洞天体
    });
    
    // 延迟后切换到诗词挑战视图
    setTimeout(() => {
      this.showPoetryChallengeView();
    }, 1500);
  },

  /**
   * 显示诗词挑战界面
   */
  showPoetryChallengeView() {
    console.log('显示诗词挑战界面');
    
    // 检查诗词数据
    if (!gameData.currentPoem) {
      wx.showToast({
        title: '无法加载诗词挑战，请重试',
        icon: 'none'
      });
      return;
    }
    
    // 切换视图
    this.setData({
      currentView: 'poetry-challenge'
    });
    
    // 处理诗词内容，生成隐藏字和选项
    this.processPoemContent();
  },

  /**
   * 处理诗词分行排版
   */
  processPoemLines(content) {
    if (!content) return [];
    
    // 根据标点符号分行
    const lines = content.split(/[，。、；；！？]/).filter(line => line.trim());
    
    // 如果没有标点符号，按字数分行（一般7言或5言诗）
    if (lines.length === 1) {
      const chars = content.split('');
      const lineLength = chars.length <= 20 ? 5 : 7; // 判断是五言还是七言
      
      const result = [];
      for (let i = 0; i < chars.length; i += lineLength) {
        result.push(chars.slice(i, i + lineLength).join(''));
      }
      return result;
    }
    
    return lines;
  },

  /**
   * 处理诗词内容，生成挑战
   */
  processPoemContent() {
    if (!gameData.currentPoem || !gameData.currentPoem.content) {
      console.error('诗词数据无效');
      return;
    }
    
    const content = gameData.currentPoem.content;
    
    // 随机选择要隐藏的字
    const chars = content.split('');
    const nonPunctuationChars = chars.filter(char => /[\u4e00-\u9fa5]/.test(char));
    
    if (nonPunctuationChars.length === 0) {
      console.error('没有可隐藏的汉字');
      return;
    }
    
    const targetCharIndex = Math.floor(Math.random() * nonPunctuationChars.length);
    const targetChar = nonPunctuationChars[targetCharIndex];
    
    // 找到目标字在原文中的位置
    let actualIndex = -1;
    let charCount = 0;
    for (let i = 0; i < chars.length; i++) {
      if (/[\u4e00-\u9fa5]/.test(chars[i])) {
        if (charCount === targetCharIndex) {
          actualIndex = i;
          break;
        }
        charCount++;
      }
    }
    
    // 生成答案选项
    const answerOptions = this.generateRelatedOptions(targetChar);
    
    // 构建显示内容，隐藏的字用特殊标记
    const displayContent = chars.map((char, index) => {
      if (index === actualIndex) {
        return '🌟';
      }
      return char;
    }).join('');
    
    // 更新页面数据
    this.setData({
      poemDisplayContent: displayContent,
      answerOptions: answerOptions,
      targetChar: targetChar
    });
  },

  /**
   * 生成与目标字相关的干扰选项
   */
  generateRelatedOptions(targetChar) {
    // 扩展的相似字库
    const similarCharsMap = {
      '山': ['出', '岩', '岗', '峰'],
      '水': ['江', '河', '湖', '海'],
      '云': ['雾', '霞', '烟', '雪'],
      '日': ['月', '星', '光', '明'],
      '春': ['夏', '秋', '冬', '年'],
      '风': ['雨', '霜', '露', '雪'],
      '花': ['草', '树', '木', '叶'],
      '天': ['地', '人', '山', '水'],
      '人': ['民', '众', '群', '众'],
      '心': ['思', '想', '念', '意'],
      '目': ['眼', '睛', '看', '见'],
      '手': ['指', '掌', '拳', '臂'],
      '口': ['舌', '唇', '齿', '牙'],
      '耳': ['听', '闻', '声', '音'],
      '足': ['腿', '脚', '步', '走'],
      '路': ['道', '途', '径', '行'],
      '门': ['户', '窗', '墙', '院'],
      '书': ['文', '字', '笔', '纸'],
      '诗': ['词', '歌', '赋', '文'],
      '画': ['图', '景', '色', '彩'],
      '楼': ['台', '阁', '殿', '堂']
    };
    
    let options = [targetChar];
    
    // 从相似字库中获取相关字
    const similarChars = similarCharsMap[targetChar] || ['山', '水', '云', '风', '花', '月', '雪', '雨', '春', '秋'];
    
    // 添加3个干扰选项
    while (options.length < 4 && similarChars.length > 0) {
      const randomIndex = Math.floor(Math.random() * similarChars.length);
      const similarChar = similarChars[randomIndex];
      if (!options.includes(similarChar)) {
        options.push(similarChar);
      }
      similarChars.splice(randomIndex, 1);
    }
    
    // 如果相似字不够，添加常用字
    const commonChars = ['山', '水', '云', '风', '花', '月', '雪', '雨', '春', '秋', '天', '地', '人', '心', '手', '足'];
    while (options.length < 4) {
      const randomChar = commonChars[Math.floor(Math.random() * commonChars.length)];
      if (!options.includes(randomChar)) {
        options.push(randomChar);
      }
    }
    
    // 随机打乱选项顺序
    options.sort(() => Math.random() - 0.5);
    
    return options.map((char, index) => ({
      id: index,
      char: char,
      isCorrect: char === targetChar
    }));
  },

  /**
   * 选择答案
   */
  selectAnswer(e) {
    const selectedIndex = e.currentTarget.dataset.index;
    const selectedOption = this.data.answerOptions[selectedIndex];
    
    if (selectedOption.isCorrect) {
      // 答对了
      this.handleCorrectAnswer();
    } else {
      // 答错了
      this.handleWrongAnswer();
    }
  },

  /**
   * 处理正确答案
   */
  handleCorrectAnswer() {
    // 播放成功音效
    this.playSuccessSound();
    
    // 显示成功模态框
    this.setData({
      showSuccessModal: true
    });
  },

  /**
   * 处理错误答案
   */
  handleWrongAnswer() {
    // 播放失败音效
    this.playFailureSound();
    
    // 显示错误模态框
    this.setData({
      showErrorModal: true
    });
  },

  /**
   * 播放成功音效
   */
  playSuccessSound() {
    try {
      const audio = wx.createInnerAudioContext();
      audio.src = '/subgames/future/sounds/success.wav';
      audio.volume = 0.6;
      audio.play();
      
      // 振动反馈
      wx.vibrateShort({ type: 'light' });
    } catch (error) {
      console.log('成功音效播放失败:', error);
    }
  },

  /**
   * 播放失败音效
   */
  playFailureSound() {
    try {
      const audio = wx.createInnerAudioContext();
      audio.src = '/subgames/future/sounds/failure.wav';
      audio.volume = 0.7;
      audio.play();
      
      // 振动反馈
      wx.vibrateShort({ type: 'heavy' });
    } catch (error) {
      console.log('失败音效播放失败:', error);
    }
  },

  /**
   * 进入洞天
   */
  enterCave() {
    // 隐藏成功模态框
    this.setData({
      showSuccessModal: false
    });
    
    // 设置洞天诗词
    if (gameData.currentCave.related_poems && gameData.currentCave.related_poems.length > 0) {
      const poem = gameData.currentCave.related_poems[0];
      // 处理诗词分行排版
      const poemLines = this.processPoemLines(poem.content);
      
      this.setData({
        currentCavePoem: poem,
        poemLines: poemLines
      });
    }
    
    // 设置地图标记
    this.setData({
      mapMarkers: [{
        id: gameData.currentCave.id,
        latitude: gameData.currentCave.latitude || 39.9042,
        longitude: gameData.currentCave.longitude || 116.4074,
        title: gameData.currentCave.name
      }]
    });
    
    // 切换到洞天展示界面
    this.setData({
      currentView: 'cave'
    });
  },

  /**
   * 关闭错误模态框
   */
  closeErrorModal() {
    this.setData({
      showErrorModal: false
    });
  },

  /**
   * 下一首诗
   */
  nextPoem() {
    if (!gameData.currentCave.related_poems || gameData.currentCave.related_poems.length <= 1) {
      wx.showToast({
        title: '没有更多诗词了',
        icon: 'none'
      });
      return;
    }
    
    const currentPoems = gameData.currentCave.related_poems;
    const currentIndex = currentPoems.findIndex(poem => poem.id === this.data.currentCavePoem.id);
    const nextIndex = (currentIndex + 1) % currentPoems.length;
    const nextPoem = currentPoems[nextIndex];
    
    // 处理新诗的分行排版
    const poemLines = this.processPoemLines(nextPoem.content);
    
    this.setData({
      currentCavePoem: nextPoem,
      poemLines: poemLines
    });
  },

  /**
   * 探索下一幻境
   */
  nextDreamland() {
    // 重置游戏状态
    this.resetGameState();
  },

  /**
   * 重置游戏状态
   */
  resetGameState() {
    gameData.currentCave = null;
    gameData.currentPoem = null;
    gameData.hiddenChars = [];
    gameData.selectedPoetId = null;
    gameData.revealedHints = 0;
    
    // 重置页面数据
    this.setData({
      currentView: 'compass',
      currentCave: null,
      currentPoem: null,
      currentCavePoem: null,
      cavePromptText: '',
      poemDisplayContent: '',
      answerOptions: [],
      displayedCaves: []
    });
    
    // 重新初始化地图
    setTimeout(() => {
      this.initializeImmortalMap();
    }, 100);
  },

  /**
   * 页面分享
   */
  onShareAppMessage() {
    return {
      title: '七十二洞天诗意旅行',
      path: '/subgames/72DreamlandPoetryTravel/index',
      imageUrl: '/images/share-poetry.jpg'
    };
  }
});