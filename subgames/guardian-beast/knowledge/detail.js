// 脊兽详情页
const beastsData = require('../beasts');
const imageConfig = require('../imageConfig');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    beast: null, // 脊兽详细信息
    // 页面数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收传递的神兽ID
    const beastId = options.id;
    this.loadBeastDetail(beastId);
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
    // 重新加载数据
    const beastId = this.data.beast.id;
    this.loadBeastDetail(beastId);
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

  // 加载脊兽详情数据
  async loadBeastDetail(beastId) {
    // 从本地JSON文件加载数据
    const beasts = beastsData.beasts;
    const beast = beasts.find(item => item.id === beastId);
    
    if (beast) {
      // 加载神兽图片到缓存
      try {
        const cachedImage = await imageConfig.getCachedImage(beastId);
        beast.image = cachedImage;
      } catch (err) {
        console.error('加载神兽图片失败:', err);
        // 使用原始图片路径作为备选
        beast.image = imageConfig.getImage(beastId);
      }
      
      this.setData({ beast });
    } else {
      // 如果没有找到对应神兽，返回列表页
      wx.navigateBack();
    }
  },

  // 返回列表页
  goBack() {
    wx.navigateBack();
  }
});