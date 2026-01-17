// 字卡展示页面
const cloudDataService = require('../../cloudDataService').default;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    character: null,
    relatedPoems: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadCharacter();
  },

  /**
   * 加载汉字详情
   */
  async loadCharacter() {
    try {
      console.log('开始加载字卡数据...');
      
      // 使用云数据服务的每日一字功能
      const character = await cloudDataService.getDailyCharacter();
      
      console.log('字卡数据加载成功:', character.char);
      
      // 这里可以添加诗词关联逻辑
      // 暂时使用空数组
      const relatedPoems = [];
      
      this.setData({
        character: character,
        relatedPoems: relatedPoems,
        loading: false
      });
    } catch (error) {
      console.error('字卡数据加载失败:', error);
      this.setData({
        loading: false
      });
    }
  },

  /**
   * 重新加载一个新的汉字
   */
  async reloadCharacter() {
    this.setData({ loading: true });
    try {
      console.log('重新加载字卡数据...');
      
      // 使用云数据服务的随机汉字功能
      const character = await cloudDataService.getRandomCharacter();
      
      console.log('字卡数据重新加载成功:', character.char);
      
      const relatedPoems = [];
      
      this.setData({
        character: character,
        relatedPoems: relatedPoems,
        loading: false
      });
    } catch (error) {
      console.error('字卡数据重新加载失败:', error);
      this.setData({ loading: false });
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: `每日一字 - ${this.data.character.char}`,
      path: '/subgames/daily-character/pages/card/index',
      imageUrl: ''
    };
  }
});