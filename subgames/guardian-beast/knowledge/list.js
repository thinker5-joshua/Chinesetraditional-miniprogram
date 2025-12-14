// 脊兽列表页
const beastsData = require('../beasts');
const imageConfig = require('../imageConfig');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    beastsList: [], // 脊兽列表数据
    // 页面数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadBeastsList();
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
    this.loadBeastsList();
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

  },

  // 加载脊兽列表数据
  loadBeastsList() {
    // 从本地JSON文件加载数据
    const beasts = beastsData.beasts;
    
    // 按排位排序
    const sortedBeasts = beasts.sort((a, b) => {
      // 处理"领队"等非数字排位
      if (a.rank === '领队') return -1;
      if (b.rank === '领队') return 1;
      return parseInt(a.rank) - parseInt(b.rank);
    });
    
    this.setData({ beastsList: sortedBeasts });
  },

  // 跳转到脊兽详情页
  navigateToDetail(e) {
    const beastId = e.currentTarget.dataset.beastId;
    wx.navigateTo({
      url: '/subgames/guardian-beast/knowledge/detail?id=' + beastId
    });
  }
})