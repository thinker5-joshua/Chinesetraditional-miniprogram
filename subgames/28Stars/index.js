// 二十八星宿探秘 - 小程序版本

// 引入外部数据文件
const { starsData, directionColors, directionNames, fourBeastsRhyme } = require('./stars-data.js');

Page({
  data: {
    // 学习模式状态
    currentDirection: 'east', // 当前选中的方位
    selectedStar: null,      // 当前选中的星宿
    showStarDetail: false,   // 是否显示星宿详情
    
    // 方位配置
    directionTabs: [
      { key: 'east', name: '东方青龙', char: '东', beast: '青龙', icon: 'dragon' },
      { key: 'south', name: '南方朱雀', char: '南', beast: '朱雀', icon: 'phoenix' },
      { key: 'west', name: '西方白虎', char: '西', beast: '白虎', icon: 'tiger' },
      { key: 'north', name: '北方玄武', char: '北', beast: '玄武', icon: 'turtle' }
    ],
    
    // 神兽表情符号
    beastEmoji: {
      dragon: '🐉',
      phoenix: '🦅', 
      tiger: '🐅',
      turtle: '🐢'
    },
    
    // 星宿数据
    currentDirectionStars: [],     // 当前方位的星宿列表
    currentDirectionName: '',        // 当前方位名称
    currentDirectionIcon: '',        // 当前方位图标
    
    // 星宿详情
    selectedStarInfo: {
      id: '',
      name: '',
      pinyin: '',
      symbol: '',
      description: '',
      meaning: '',
      position: ''
    }
  },

  onLoad() {
    this.initStudyMode();
  },

  /**
   * 初始化学习模式
   */
  initStudyMode() {
    // 设置当前方位
    this.setData({
      currentDirection: 'east'
    });
    
    // 加载对应方位的星宿
    this.loadDirectionStars('east');
  },

  /**
   * 切换方位
   */
  switchDirection(e) {
    const direction = e.currentTarget.dataset.direction;
    
    this.setData({
      currentDirection: direction
    });
    
    // 加载新方位的星宿
    this.loadDirectionStars(direction);
  },

  /**
   * 加载指定方位的星宿
   */
  loadDirectionStars(direction) {
    const directionConfig = this.data.directionTabs.find(tab => tab.key === direction);
    const stars = starsData[direction] || [];
    
    this.setData({
      currentDirectionStars: stars,
      currentDirectionName: directionConfig.name,
      currentDirectionIcon: directionConfig.icon,
      selectedStar: null,
      showStarDetail: false
    });
  },

  /**
   * 选择星宿
   */
  selectStar(e) {
    const star = e.currentTarget.dataset.star;
    const currentStars = this.data.currentDirectionStars;
    const index = currentStars.findIndex(s => s.id === star.id) + 1;
    
    this.setData({
      selectedStar: star.id,
      selectedStarInfo: {
        ...star,
        positionIndex: index
      }
    });
    
    // 同时显示详情
    this.setData({
      showStarDetail: true
    });
  },

  /**
   * 显示星宿详情
   */
  showStarDetail(e) {
    const star = e.currentTarget.dataset.star;
    const currentStars = this.data.currentDirectionStars;
    const index = currentStars.findIndex(s => s.id === star.id) + 1;
    
    this.setData({
      selectedStarInfo: {
        ...star,
        positionIndex: index
      },
      showStarDetail: true
    });
  },

  /**
   * 隐藏星宿详情
   */
  hideStarDetail() {
    this.setData({
      showStarDetail: false
    });
  },

  /**
   * 查看星象
   */
  viewConstellation() {
    wx.navigateTo({
      url: '/subgames/28Stars/pages/constellation-map/constellation-map?direction=' + this.data.currentDirection
    });
  },

  /**
   * 开始配对游戏
   */
  startMatchGame() {
    wx.navigateTo({
      url: '/subgames/28Stars/pages/star-matching/star-matching'
    });
  },

  // 分享给朋友
  onShareAppMessage() {
    const { currentDirection, currentDirectionName } = this.data;
    return {
      title: `${currentDirectionName} - 二十八星宿探秘`,
      path: `/subgames/28Stars/index?direction=${currentDirection}`
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    const { currentDirection, currentDirectionName } = this.data;
    return {
      title: `${currentDirectionName} - 二十八星宿探秘`,
      query: `direction=${currentDirection}`
    };
  }
});