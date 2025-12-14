// 抽取仪式页
const beastsData = require('./beasts');
const proverbsData = require('./proverbs');
const imageConfig = require('./imageConfig');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    countdown: 3,
    showCountdown: false,
    isDrawing: false,
    cardBackImage: '',    // 神兽卡背面图
    cardAnimation: ''     // 卡牌动画
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置卡牌背面图
    this.setData({
      cardBackImage: imageConfig.getImage('back')
    });
    
    // 初始化卡牌动画
    this.initCardAnimation();
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
    // 清除定时器
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
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

  // 开始抽取
  startDraw() {
    if (this.data.isDrawing) return;
    
    this.setData({
      showCountdown: true,
      isDrawing: true
    });

    // 启动倒计时
    this.startCountdown();
  },

  // 倒计时函数
  startCountdown() {
    let countdown = 3;
    this.setData({ countdown });

    this.countdownTimer = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        this.setData({ countdown });
      } else {
        clearInterval(this.countdownTimer);
        this.setData({ showCountdown: false });
        // 执行抽取逻辑
        this.performDraw();
      }
    }, 1000);
  },

  // 执行抽取
  performDraw() {
    // 模拟抽取过程
    setTimeout(() => {
      // 随机选择一个神兽
      const beasts = beastsData.beasts;
      const randomIndex = Math.floor(Math.random() * beasts.length);
      const selectedBeast = beasts[randomIndex];

      // 为选中的神兽随机匹配一条箴言
      const proverbs = proverbsData.proverbs.filter(p => p.beastId === selectedBeast.id);
      let selectedProverb = '';
      if (proverbs.length > 0) {
        const proverbIndex = Math.floor(Math.random() * proverbs.length);
        selectedProverb = proverbs[proverbIndex].content;
      } else {
        // 如果没有匹配的箴言，从所有箴言中随机选择
        const allProverbs = proverbsData.proverbs;
        const proverbIndex = Math.floor(Math.random() * allProverbs.length);
        selectedProverb = allProverbs[proverbIndex].content;
      }

      // 跳转到结果页面，并传递选中的神兽和箴言
      wx.navigateTo({
        url: `/subgames/guardian-beast/result?beastId=${selectedBeast.id}&proverb=${encodeURIComponent(selectedProverb)}`
      });
    }, 1500);
  },
  
  /**
   * 初始化卡牌动画
   */
  initCardAnimation() {
    // 创建动画实例
    const animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease-in-out',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    
    // 设置动画效果
    animation.scale(1.05).opacity(0.9).scale(1).opacity(1).step();
    
    // 循环播放动画
    this.setData({
      cardAnimation: animation.export()
    });
    
    // 持续播放动画
    setInterval(() => {
      animation.scale(1.05).opacity(0.9).scale(1).opacity(1).step();
      this.setData({
        cardAnimation: animation.export()
      });
    }, 3000);
  }
})