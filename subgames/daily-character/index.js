// 每日一字入口页面
Page({
  /**
   * 页面的初始数据
   */
  data: {
    todayCharacter: null,
    relatedPoems: [],
    loading: true,
    isFlipped: false,
    isFavorite: false,
    // 使用四个独立变量管理难度选择状态
    difficultyBeginner: true,    // 初级难度，0未选中，1选中
    difficultyIntermediate: true, // 中级难度，0未选中，1选中
    difficultyAdvanced: true,     // 高级难度，0未选中，1选中
    difficultyChallenge: true,    // 挑战级难度，0未选中，1选中
    allCharacters: [],
    filteredCharacters: [],
    currentCharacterIndex: 0,
    // 设置窗口相关变量
    settingVisible: false,        // 设置窗口显示状态
    // 临时存储设置中的难度选择
    tempDifficulties: {
      beginner: true,
      intermediate: true,
      advanced: true,
      challenge: true
    },
    // 测试难度选择，默认为均衡
    testDifficulty: '均衡',       // 可选值：'容易', '均衡', '挑战'
    testDifficultyOptions: ['容易', '均衡', '挑战']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 读取上次选择的难度模式
    const savedDifficulties = wx.getStorageSync('dailyCharacterDifficulties');
    
    // 初始状态：默认四个难度都选中
    let difficultyBeginner = true;
    let difficultyIntermediate = true;
    let difficultyAdvanced = true;
    let difficultyChallenge = true;
    
    if (savedDifficulties && typeof savedDifficulties === 'object') {
      // 如果是新的对象格式，直接使用
      if (savedDifficulties.difficultyBeginner !== undefined) {
        difficultyBeginner = savedDifficulties.difficultyBeginner || true;
        difficultyIntermediate = savedDifficulties.difficultyIntermediate || true;
        difficultyAdvanced = savedDifficulties.difficultyAdvanced || true;
        difficultyChallenge = savedDifficulties.difficultyChallenge || true;
        console.log('读取到本地存储的难度模式:', savedDifficulties);
      } 
      // 如果是旧的数组格式，转换为新格式
      else if (Array.isArray(savedDifficulties)) {
        difficultyBeginner = savedDifficulties.includes('初级');
        difficultyIntermediate = savedDifficulties.includes('中级');
        difficultyAdvanced = savedDifficulties.includes('高级');
        difficultyChallenge = savedDifficulties.includes('挑战级');
        console.log('读取到旧格式本地存储，转换为新格式:', {
          difficultyBeginner,
          difficultyIntermediate,
          difficultyAdvanced,
          difficultyChallenge
        });
        
        // 保存为新格式
        wx.setStorageSync('dailyCharacterDifficulties', {
          difficultyBeginner,
          difficultyIntermediate,
          difficultyAdvanced,
          difficultyChallenge
        });
      }
    } else {
      // 无本地存储，使用默认值
      console.log('无本地存储，使用默认难度模式');
      // 保存默认值到本地存储
      wx.setStorageSync('dailyCharacterDifficulties', {
        difficultyBeginner,
        difficultyIntermediate,
        difficultyAdvanced,
        difficultyChallenge
      });
    }
    
    // 读取测试难度设置
    const savedTestDifficulty = wx.getStorageSync('dailyCharacterTestDifficulty');
    const testDifficulty = savedTestDifficulty || '均衡';
    console.log('读取到本地存储的测试难度:', testDifficulty);
    
    // 设置初始状态
    this.setData({
      difficultyBeginner,
      difficultyIntermediate,
      difficultyAdvanced,
      difficultyChallenge,
      // 初始化临时难度为当前难度
      tempDifficulties: {
        beginner: difficultyBeginner,
        intermediate: difficultyIntermediate,
        advanced: difficultyAdvanced,
        challenge: difficultyChallenge
      },
      testDifficulty
    });
    
    this.loadCharacters();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 仅在需要时更新UI
    if (this.data.allCharacters.length > 0) {
      this.filterCharacters();
    }
  },

  /**
   * 加载汉字数据
   */
  loadCharacters() {
    const characters = require('./data-optimized.js').characters;
    const poems = require('./poems-optimized.js').poems;
    
    this.setData({
      allCharacters: characters,
      filteredCharacters: characters,
      loading: false
    });
    
    this.loadRandomCharacter();
  },

  /**
   * 加载随机汉字
   */
  loadRandomCharacter() {
    const { filteredCharacters } = this.data;
    if (filteredCharacters.length === 0) {
      wx.showToast({
        title: '暂无符合条件的汉字',
        icon: 'none'
      });
      return;
    }
    
    // 随机选择一个汉字
    const randomIndex = Math.floor(Math.random() * filteredCharacters.length);
    const character = filteredCharacters[randomIndex];
    
    // 加载关联的诗词
    const poems = require('./poems.js').poems;
    const relatedPoems = poems.filter(poem => poem.charId === character.id);
    
    // 检查是否已收藏
    const favorites = wx.getStorageSync('dailyCharacterFavorites') || [];
    const isFavorite = favorites.includes(character.id);
    
    // 调试代码：输出相关数据
    console.log('加载的汉字数据:', character);
    console.log('错误读音:', character.wrongPronunciations);
    console.log('错误原因类型:', character.errorReasonType);
    console.log('转换后的错误原因:', this.getErrorReasonText(character.errorReasonType));
    
    // 处理错误读音显示
    const wrongPronunciationsText = character.wrongPronunciations ? character.wrongPronunciations.join('、') : '暂无数据';
    
    // 处理错误原因分类显示
    const errorReasonText = this.getErrorReasonText(character.errorReasonType);
    
    this.setData({
      todayCharacter: character,
      relatedPoems: relatedPoems,
      isFavorite: isFavorite,
      currentCharacterIndex: randomIndex,
      wrongPronunciationsText: wrongPronunciationsText,
      errorReasonText: errorReasonText, // 预先计算好的错误原因文本
      loading: false
    });
  },

  /**
   * 切换卡片正反面
   */
  toggleCardFlip() {
    this.setData({
      isFlipped: !this.data.isFlipped
    });
  },

  /**
   * 保存字卡
   */
  saveCard() {
    wx.showToast({
      title: '保存功能开发中',
      icon: 'none'
    });
    // 后续实现保存字卡图像到相册功能
  },

  /**
   * 切换收藏状态
   */
  toggleFavorite() {
    const { todayCharacter, isFavorite } = this.data;
    let favorites = wx.getStorageSync('dailyCharacterFavorites') || [];
    
    if (isFavorite) {
      // 取消收藏
      favorites = favorites.filter(id => id !== todayCharacter.id);
    } else {
      // 添加收藏
      favorites.push(todayCharacter.id);
    }
    
    wx.setStorageSync('dailyCharacterFavorites', favorites);
    
    this.setData({
      isFavorite: !isFavorite
    });
    
    wx.showToast({
      title: isFavorite ? '取消收藏成功' : '收藏成功',
      icon: 'success'
    });
  },

  /**
   * 跳转到测试页面
   */
  navigateToTest() {
    wx.navigateTo({
      url: '/subgames/daily-character/pages/test/index'
    });
  },

  /**
   * 显示易读错字列表
   */
  showCharacterList() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 1500
    });
  },

  /**
   * 打开设置窗口
   */
  openSettings() {
    // 打开设置窗口前，将当前难度设置同步到临时变量
    this.setData({
      settingVisible: true,
      tempDifficulties: {
        beginner: this.data.difficultyBeginner,
        intermediate: this.data.difficultyIntermediate,
        advanced: this.data.difficultyAdvanced,
        challenge: this.data.difficultyChallenge
      }
    });
  },

  /**
   * 关闭设置窗口（不保存）
   */
  closeSettings() {
    this.setData({
      settingVisible: false
    });
  },

  /**
   * 保存设置
   */
  saveSettings() {
    // 获取临时难度设置
    const { tempDifficulties, testDifficulty } = this.data;
    
    // 检查是否至少选择了一个难度
    const hasSelectedDifficulty = Object.values(tempDifficulties).some(value => value === true);
    if (!hasSelectedDifficulty) {
      wx.showToast({
        title: '难度选择配置必须至少选择一个选项',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 更新实际难度设置
    const difficultyBeginner = tempDifficulties.beginner;
    const difficultyIntermediate = tempDifficulties.intermediate;
    const difficultyAdvanced = tempDifficulties.advanced;
    const difficultyChallenge = tempDifficulties.challenge;
    
    // 保存到本地存储
    wx.setStorageSync('dailyCharacterDifficulties', {
      difficultyBeginner,
      difficultyIntermediate,
      difficultyAdvanced,
      difficultyChallenge
    });
    
    // 保存测试难度到本地存储
    wx.setStorageSync('dailyCharacterTestDifficulty', testDifficulty);
    
    // 更新数据
    this.setData({
      difficultyBeginner,
      difficultyIntermediate,
      difficultyAdvanced,
      difficultyChallenge,
      settingVisible: false
    });
    
    // 重新过滤汉字
    this.filterCharacters();
    
    // 显示保存成功提示
    wx.showToast({
      title: '设置已保存',
      icon: 'success',
      duration: 1500
    });
  },

  /**
   * 切换设置中的难度选择（临时）
   */
  toggleTempDifficulty(e) {
    const { level } = e.currentTarget.dataset;
    let updateData = {};
    
    switch(level) {
      case '初级':
        updateData['tempDifficulties.beginner'] = !this.data.tempDifficulties.beginner;
        break;
      case '中级':
        updateData['tempDifficulties.intermediate'] = !this.data.tempDifficulties.intermediate;
        break;
      case '高级':
        updateData['tempDifficulties.advanced'] = !this.data.tempDifficulties.advanced;
        break;
      case '挑战级':
        updateData['tempDifficulties.challenge'] = !this.data.tempDifficulties.challenge;
        break;
      default:
        console.error('未知的难度等级:', level);
        return;
    }
    
    this.setData(updateData);
  },

  /**
   * 选择测试难度
   */
  selectTestDifficulty(e) {
    const { difficulty } = e.currentTarget.dataset;
    this.setData({
      testDifficulty: difficulty
    });
  },

  /**
   * 显示上一个汉字
   */
  showPreviousCharacter() {
    const { filteredCharacters, currentCharacterIndex } = this.data;
    if (filteredCharacters.length === 0) return;
    
    let newIndex = currentCharacterIndex - 1;
    if (newIndex < 0) {
      newIndex = filteredCharacters.length - 1;
    }
    
    this.loadCharacterByIndex(newIndex);
  },

  /**
   * 显示下一个汉字
   */
  showNextCharacter() {
    const { filteredCharacters, currentCharacterIndex } = this.data;
    if (filteredCharacters.length === 0) return;
    
    let newIndex = currentCharacterIndex + 1;
    if (newIndex >= filteredCharacters.length) {
      newIndex = 0;
    }
    
    this.loadCharacterByIndex(newIndex);
  },

  /**
   * 根据索引加载汉字
   */
  loadCharacterByIndex(index) {
    const { filteredCharacters } = this.data;
    const character = filteredCharacters[index];
    
    // 加载关联的诗词
    const poems = require('./poems.js').poems;
    const relatedPoems = poems.filter(poem => poem.charId === character.id);
    
    // 检查是否已收藏
    const favorites = wx.getStorageSync('dailyCharacterFavorites') || [];
    const isFavorite = favorites.includes(character.id);
    
    // 调试代码：输出相关数据
    console.log('加载的汉字数据:', character);
    console.log('错误读音:', character.wrongPronunciations);
    console.log('错误原因类型:', character.errorReasonType);
    console.log('转换后的错误原因:', this.getErrorReasonText(character.errorReasonType));
    
    // 处理错误读音显示
    const wrongPronunciationsText = character.wrongPronunciations ? character.wrongPronunciations.join('、') : '暂无数据';
    
    // 处理错误原因分类显示
    const errorReasonText = this.getErrorReasonText(character.errorReasonType);
    
    this.setData({
      todayCharacter: character,
      relatedPoems: relatedPoems,
      isFavorite: isFavorite,
      currentCharacterIndex: index,
      wrongPronunciationsText: wrongPronunciationsText,
      errorReasonText: errorReasonText, // 预先计算好的错误原因文本
      isFlipped: false
    });
  },



  /**
   * 根据难度过滤汉字
   */
  filterCharacters() {
    const { allCharacters, difficultyBeginner, difficultyIntermediate, difficultyAdvanced, difficultyChallenge } = this.data;
    console.log('过滤汉字 - 所有汉字数量:', allCharacters.length);
    console.log('难度选择状态:', {
      difficultyBeginner,
      difficultyIntermediate,
      difficultyAdvanced,
      difficultyChallenge
    });
    
    // 空值检查
    if (!allCharacters || !Array.isArray(allCharacters)) {
      console.error('allCharacters不是有效的数组:', allCharacters);
      return;
    }
    
    // 过滤汉字，根据四个独立变量的值
    const filteredCharacters = allCharacters.filter(char => {
      switch(char.difficultyLevel) {
        case '初级':
          return difficultyBeginner;
        case '中级':
          return difficultyIntermediate;
        case '高级':
          return difficultyAdvanced;
        case '挑战级':
          return difficultyChallenge;
        default:
          console.error('未知的难度等级:', char.difficultyLevel);
          return false;
      }
    });
    
    console.log('过滤后汉字数量:', filteredCharacters.length);
    
    this.setData({
      filteredCharacters: filteredCharacters
    });
    
    this.loadRandomCharacter();
  },

  /**
   * 获取错误原因文本
   */
  getErrorReasonText(type) {
    const errorReasonMap = {
      1: '形声字误读',
      2: '形近字混淆',  
      3: '音近字/同音字混淆',
      4: '多音字误读',
      5: '字义误解',
      6: '偏僻字/生僻字'
    };
    
    // 详细调试日志
    console.log('错误原因类型转换 - 输入:', type, '类型:', typeof type);
    
    // 确保type是数字类型
    const numType = Number(type) || 0;
    console.log('转换为数字类型:', numType);
    
    // 获取对应的文本
    const text = errorReasonMap[numType] || '未知类型';
    
    // 确保返回字符串类型
    const result = String(text);
    console.log('最终结果:', result, '类型:', typeof result);
    
    return result;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: `每日一字 - ${this.data.todayCharacter?.char || '汉字学习'}`,
      path: '/subgames/daily-character/index',
      imageUrl: ''
    };
  }
});