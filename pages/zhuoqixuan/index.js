// 琢器轩首页
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gameList: [
      {
        id: 'future',
        name: '成语消除',
        iconText: '语',
        cssClass: 'chengyu-icon'
      },
      {
        id: 'WuxingMysteries',
        name: '五行奥秘',
        iconText: '五',
        cssClass: 'wuxing-icon'
      },
      {
        id: '72DreamlandPoetryTravel',
        name: '洞天诗意游',
        iconText: '诗',
        cssClass: 'poetry-icon'
      },
      {
        id: '28Stars',
        name: '二十八星宿探秘',
        iconText: '星',
        cssClass: 'star-icon'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '抽取你的专属守护神兽',
      path: '/subgames/guardian-beast/index'
    };
  },

  // 跳转到游戏页面
  navigateToGame(e) {
    const gameId = e.currentTarget.dataset.game;
    wx.navigateTo({
      url: `/subgames/${gameId}/index`
    });
  }
})