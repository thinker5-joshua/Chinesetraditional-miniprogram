// 琢器轩首页
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gameList: [
      {
        id: 'guardian-beast',
        name: '守护神兽',
        description: '抽取你的专属守护神兽，生成精美海报分享',
        icon: 'cloud://env-id/tradEngage/guardian-beast-icon.png',
        path: '/subgames/guardian-beast/index'
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
    // 根据游戏ID跳转到对应的游戏页面
    switch (gameId) {
      case 'guardian-beast':
        wx.navigateTo({
          url: '/subgames/guardian-beast/index'
        });
        break;
      default:
        console.error('未知游戏ID:', gameId);
    }
  }
})