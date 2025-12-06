// 星象图页面
const { starsData } = require('../../stars-data.js');

// 星宿位置配置（使用百分比，相对于constellation-canvas容器）
const starPositions = {
  east: [  // 东方青龙 - 龙形图案
    { x: 30, y: 30 },  // 角 - 龙角
    { x: 50, y: 25 },  // 亢 - 龙颈
    { x: 70, y: 20 },  // 氐 - 龙胸前
    { x: 85, y: 35 },  // 房 - 龙胸
    { x: 85, y: 50 },  // 心 - 龙心
    { x: 70, y: 65 },  // 尾 - 龙身
    { x: 40, y: 60 }   // 箕 - 龙尾
  ],
  south: [  // 南方朱雀 - 鸟形图案
    { x: 25, y: 25 },  // 斗 - 鸟头
    { x: 40, y: 20 },  // 牛 - 颈前
    { x: 60, y: 25 },  // 女 - 颈后
    { x: 80, y: 35 },  // 虚 - 胸前
    { x: 85, y: 55 },  // 危 - 胸
    { x: 65, y: 70 },  // 室 - 身前
    { x: 35, y: 65 }   // 壁 - 身后
  ],
  west: [  // 西方白虎 - 虎形图案
    { x: 30, y: 20 },  // 奎 - 虎头
    { x: 45, y: 30 },  // 娄 - 颈
    { x: 65, y: 40 },  // 胃 - 胸前
    { x: 70, y: 60 },  // 昴 - 胸
    { x: 55, y: 75 },  // 毕 - 腹前
    { x: 35, y: 65 },  // 觜 - 腹后
    { x: 25, y: 45 }   // 参 - 尾
  ],
  north: [  // 北方玄武 - 龟蛇形图案
    { x: 25, y: 30 },  // 井 - 龟头
    { x: 40, y: 25 },  // 牛 - 颈前
    { x: 60, y: 20 },  // 柳 - 颈后
    { x: 80, y: 30 },  // 星 - 背前
    { x: 85, y: 50 },  // 张 - 背中
    { x: 70, y: 70 },  // 翼 - 背后
    { x: 45, y: 60 }   // 轸 - 尾
  ]
};



// 神兽表情符号
const beastEmojis = {
  dragon: '🐉',
  phoenix: '🦅',
  tiger: '🐅',
  turtle: '🐢'
};

Page({
  data: {
    direction: '',
    directionName: '',
    directionChar: '',
    directionIcon: '',
    currentStars: [],
    selectedStar: null,
    beastEmoji: '',
    beastName: '',
    currentIndex: 0
  },

  onLoad(options) {
    const direction = options.direction || 'east';
    this.loadDirectionStars(direction);
  },

  onUnload() {
    // 页面卸载时清除定时器
    if (this.flashTimer) {
      clearInterval(this.flashTimer);
    }
    if (this.starDetailTimer) {
      clearTimeout(this.starDetailTimer);
    }
  },

  /**
   * 加载指定方位的星宿
   */
  loadDirectionStars(direction) {
    const directionMap = {
      east: { name: '东方青龙', char: '东', icon: 'dragon', beastName: '青龙' },
      south: { name: '南方朱雀', char: '南', icon: 'phoenix', beastName: '朱雀' },
      west: { name: '西方白虎', char: '西', icon: 'tiger', beastName: '白虎' },
      north: { name: '北方玄武', char: '北', icon: 'turtle', beastName: '玄武' }
    };

    const stars = starsData[direction] || [];
    
    // 为每个星宿添加位置样式
    const starsWithPosition = stars.map((star, index) => {
      const positions = starPositions[direction] || [];
      const position = positions[index] || { x: 50, y: 50 };
      const style = `position: absolute !important; left: ${position.x}%; top: ${position.y}%; transform: translate(-50%, -50%); z-index: 30 !important;`;
      
      return {
        ...star,
        style: style,
        position: position,
        isFlashing: false
      };
    });
    
    this.setData({
      direction,
      directionName: directionMap[direction].name,
      directionChar: directionMap[direction].char,
      directionIcon: directionMap[direction].icon,
      beastName: directionMap[direction].beastName,
      beastEmoji: beastEmojis[directionMap[direction].icon],
      currentStars: starsWithPosition,
      currentIndex: 0
    });

    // 开始闪烁效果
    this.startFlashing();
  },

  /**
   * 开始星宿闪烁效果
   */
  startFlashing() {
    // 清除之前的定时器
    if (this.flashTimer) {
      clearInterval(this.flashTimer);
    }

    let flashIndex = 0;
    const starsCount = this.data.currentStars.length;

    this.flashTimer = setInterval(() => {
      // 更新星宿闪烁状态
      const updatedStars = this.data.currentStars.map((star, index) => ({
        ...star,
        isFlashing: index === flashIndex
      }));

      this.setData({
        currentStars: updatedStars,
        currentIndex: flashIndex
      });

      // 移动到下一个星宿
      flashIndex++;
      
      // 完成一轮循环
      if (flashIndex >= starsCount) {
        flashIndex = 0;
        
        // 新一轮之前停顿1.5秒
        clearInterval(this.flashTimer);
        
        setTimeout(() => {
          // 将所有星宿设为不闪烁状态
          const resetStars = this.data.currentStars.map(star => ({
            ...star,
            isFlashing: false
          }));
          
          this.setData({ currentStars: resetStars });
          
          // 继续下一轮循环
          setTimeout(() => {
            this.startFlashing();
          }, 1000);
        }, 500);
      }
    }, 1000); // 每个星宿闪烁1秒
  },



  /**
   * 获取星宿CSS类名
   */
  getStarClass(star) {
    const pinyinMap = {
      '角': 'jiao',
      '亢': 'kang', 
      '氐': 'di',
      '房': 'fang',
      '心': 'xin',
      '尾': 'wei',
      '箕': 'ji',
      '斗': 'dou',
      '牛': 'niu',
      '女': 'nu',
      '虚': 'xu',
      '危': 'wei-star',
      '室': 'shi',
      '壁': 'bi',
      '奎': 'kui',
      '娄': 'lou',
      '胃': 'wei-west',
      '昴': 'mao',
      '毕': 'bi-west',
      '觜': 'zi',
      '参': 'shen',
      '井': 'jing',
      '鬼': 'gui',
      '柳': 'liu',
      '星': 'xing',
      '张': 'zhang',
      '翼': 'i',
      '轸': 'zhen'
    };
    
    return pinyinMap[star.id] || star.id;
  },



  /**
   * 选择星宿
   */
  selectStar(e) {
    const star = e.currentTarget.dataset.star;
    
    // 清除之前的定时器
    if (this.starDetailTimer) {
      clearTimeout(this.starDetailTimer);
    }
    
    this.setData({
      selectedStar: star
    });
    
    // 3秒后自动清除星宿信息
    this.starDetailTimer = setTimeout(() => {
      this.setData({
        selectedStar: null
      });
    }, 3000);
  },

  /**
   * 切换方位
   */
  switchDirection(e) {
    const direction = e.currentTarget.dataset.direction;
    const directions = ['east', 'south', 'west', 'north'];
    let currentIndex = directions.indexOf(this.data.direction);
    let newIndex;
    
    if (direction === 'next') {
      // 下一个方位，循环到第一个
      newIndex = (currentIndex + 1) % directions.length;
    } else {
      // 上一个方位，循环到最后一个
      newIndex = currentIndex === 0 ? directions.length - 1 : currentIndex - 1;
    }
    
    const newDirection = directions[newIndex];
    
    // 清除当前的闪烁定时器
    if (this.flashTimer) {
      clearInterval(this.flashTimer);
    }
    
    // 清除星宿信息定时器并重置选中的星宿
    if (this.starDetailTimer) {
      clearTimeout(this.starDetailTimer);
    }
    this.setData({
      selectedStar: null
    });
    
    // 加载新方位的星宿
    this.loadDirectionStars(newDirection);
  },

  /**
   * 返回主页
   */
  goBack() {
    // 获取页面栈
    const pages = getCurrentPages();
    if (pages.length > 1) {
      // 正常返回上一页
      wx.navigateBack();
    } else {
      // 从分享进入，跳转到模块首页
      wx.redirectTo({
        url: '/subgames/28Stars/index'
      });
    }
  },

  /**
   * 用户点击右上角分享给朋友
   */
  onShareAppMessage(options) {
    return {
      title: `${this.data.directionName} - 二十八星宿探秘`,
      path: `/subgames/28Stars/pages/constellation-map/constellation-map?direction=${this.data.direction}`
    };
  },

  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: `${this.data.directionName} - 二十八星宿探秘`,
      query: `direction=${this.data.direction}`
    };
  }
});