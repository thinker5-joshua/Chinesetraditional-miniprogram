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
   * 用户点击右上角分享给朋友
   */
  onShareAppMessage() {
    const { beast } = this.data;
    return {
      title: `我抽到了${beast.name} - 守护神兽`,
      path: `/subgames/guardian-beast/result?beastId=${beast.id}&proverb=${encodeURIComponent(beast.selectedProverb || '')}`
    };
  },
  
  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline() {
    const { beast } = this.data;
    return {
      title: `我抽到了${beast.name} - 守护神兽`,
      query: `beastId=${beast.id}&proverb=${encodeURIComponent(beast.selectedProverb || '')}`
    };
  },

  // 加载神兽数据
  async loadBeastData(beastId, proverb) {
    // 从本地JSON文件加载数据
    const beasts = beastsData.beasts;
    const beast = beasts.find(item => item.id === beastId);
    
    if (beast) {
      // 为神兽添加选中的箴言
      beast.selectedProverb = proverb;
      
      // 加载神兽图片到缓存
      try {
        const cachedImage = await imageConfig.getCachedImage(beast.id);
        beast.image = cachedImage;
      } catch (err) {
        console.error('加载神兽图片失败:', err);
        // 使用原始图片路径作为备选
        beast.image = imageConfig.getImage(beast.id);
      }
      
      this.setData({ beast });
      
      // 将抽取的神兽保存到本地存储
      try {
        wx.setStorageSync('guardianBeast', beast);
      } catch (error) {
        console.error('保存抽取神兽到本地存储失败', error);
      }
    } else {
      // 如果没有找到对应神兽，返回首页
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

  // 返回首页
  goBack() {
    wx.redirectTo({
      url: '/subgames/guardian-beast/index'
    });
  }
})