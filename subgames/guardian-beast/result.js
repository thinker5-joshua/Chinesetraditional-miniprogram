// 抽取结果页
const beastsData = require('./beasts');
const imageConfig = require('./imageConfig');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    beast: null, // 守护神兽信息
    isGeneratingPoster: false, // 是否正在生成海报
    // 页面数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收传递的神兽ID和箴言
    const beastId = options.beastId;
    const proverb = decodeURIComponent(options.proverb || '');
    this.loadBeastData(beastId, proverb);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 图片加载完成调试代码
    console.log('=== 页面渲染完成 ===');
    if (this.data.beast) {
      console.log('当前神兽:', this.data.beast.name);
      console.log('当前神兽图片:', this.data.beast.image);
    }
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

  // 加载神兽数据
  loadBeastData(beastId, proverb) {
    // 从本地JSON文件加载数据
    const beasts = beastsData.beasts;
    const beast = beasts.find(item => item.id === beastId);
    
    if (beast) {
      // 为神兽添加选中的箴言
      beast.selectedProverb = proverb;
      
      this.setData({ beast });
      
      // 图片获取调试代码
      console.log('=== 图片获取调试 ===');
      console.log('神兽ID:', beastId);
      console.log('图片路径:', beast.image);
      
      // 测试图片是否能正常获取
      wx.getImageInfo({
        src: beast.image,
        success: (res) => {
          console.log('图片获取成功:', res.width, 'x', res.height);
        },
        fail: (err) => {
          console.error('图片获取失败:', err);
        }
      });
      
      // 将抽取的神兽保存到本地存储
      try {
        wx.setStorageSync('guardianBeast', beast);
        console.log('神兽数据保存到本地成功');
      } catch (error) {
        console.error('保存抽取神兽到本地存储失败', error);
      }
    } else {
      // 如果没有找到对应神兽，返回首页
      console.error('未找到对应神兽:', beastId);
      wx.navigateBack();
    }
  },

  // 生成海报
  generatePoster() {
    if (this.data.isGeneratingPoster) return;
    
    this.setData({ isGeneratingPoster: true });
    
    // 跳转到海报生成页，传递神兽数据和箴言
    setTimeout(() => {
      wx.navigateTo({
        url: `/subgames/guardian-beast/poster?beastId=${this.data.beast.id}&proverb=${encodeURIComponent(this.data.beast.selectedProverb)}`
      });
      this.setData({ isGeneratingPoster: false });
    }, 500);
  },

  // 重新抽取
  redraw() {
    wx.navigateBack({
      delta: 1 // 返回抽取页
    });
  },

  // 查看详情
  viewDetail() {
    wx.navigateTo({
      url: '/subgames/guardian-beast/knowledge/detail?id=' + this.data.beast.id
    });
  }
})