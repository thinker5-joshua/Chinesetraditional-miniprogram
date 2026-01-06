// 字卡展示页面
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
  loadCharacter() {
    const characters = require('../../data.js').characters;
    const poems = require('../../poems.js').poems;
    
    // 简单实现：随机选择一个汉字展示
    const randomIndex = Math.floor(Math.random() * characters.length);
    const character = characters[randomIndex];
    
    // 加载关联的诗词
    const relatedPoems = poems.filter(poem => poem.charId === character.id);
    
    this.setData({
      character: character,
      relatedPoems: relatedPoems,
      loading: false
    });
  },

  /**
   * 重新加载一个新的汉字
   */
  reloadCharacter() {
    this.setData({ loading: true });
    setTimeout(() => {
      this.loadCharacter();
    }, 500);
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