// 守护神兽首页
const beastsData = require('./beasts');
const imageConfig = require('./imageConfig');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    extractedBeast: null, // 已抽取的守护神兽
    beastsList: [],       // 脊兽列表
    loading: true,        // 加载状态
    cardBackImage: '',    // 神兽卡背面图
    cardAnimation: '',     // 卡牌动画
    preloadingImages: 0,   // 正在预加载的图片数量
    totalImages: 0         // 总图片数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载脊兽数据和已抽取的神兽
    this.loadBeastsData();
    this.loadExtractedBeast();
    
    // 设置卡牌背面图
    this.setData({
      cardBackImage: imageConfig.getImage('back')
    });
    
    // 初始化卡牌动画
    this.initCardAnimation();
    
    // 预加载所有图片
    this.preloadAllImages();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 每次页面显示时重新加载已抽取的神兽，确保数据最新
    this.loadExtractedBeast();
  },

  /**
   * 加载所有脊兽数据
   */
  loadBeastsData() {
    try {
      const beasts = beastsData.beasts;
      this.setData({
        beastsList: beasts,
        loading: false
      });
    } catch (error) {
      console.error('加载脊兽数据失败', error);
      this.setData({ loading: false });
    }
  },

  /**
   * 从本地存储加载已抽取的神兽
   */
  loadExtractedBeast() {
    try {
      const extractedBeast = wx.getStorageSync('guardianBeast');
      if (extractedBeast) {
        this.setData({ extractedBeast });
      }
    } catch (error) {
      console.error('加载已抽取神兽失败', error);
    }
  },

  /**
   * 跳转到抽取页面
   */
  goToDraw() {
    // 重置抽取状态和记录，先回到没有抽取的状态
    try {
      // 清除本地存储的已抽取神兽数据
      wx.removeStorageSync('guardianBeast');
      // 重置页面状态
      this.setData({
        extractedBeast: null
      });
    } catch (error) {
      console.error('重置抽取状态失败', error);
    }
    
    wx.navigateTo({
      url: '/subgames/guardian-beast/draw'
    });
  },

  /**
   * 查看已抽取神兽的海报
   */
  viewExtractedPoster() {
    const { extractedBeast } = this.data;
    if (extractedBeast) {
      wx.navigateTo({
        url: `/subgames/guardian-beast/poster?beastId=${extractedBeast.id}&proverb=${encodeURIComponent(extractedBeast.selectedProverb || '')}`
      });
    }
  },

  /**
   * 跳转到详情页
   */
  navigateToDetail(e) {
    const beastId = e.currentTarget.dataset.beastId;
    wx.navigateTo({
      url: `/subgames/guardian-beast/knowledge/detail?id=${beastId}`
    });
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
  },
  
  /**
   * 预加载所有图片
   */
  preloadAllImages() {
    const allImageIds = [...Object.keys(imageConfig.beasts), 'back'];
    const totalImages = allImageIds.length;
    
    this.setData({
      totalImages,
      preloadingImages: totalImages
    });
    
    // 预加载所有图片
    allImageIds.forEach(imageId => {
      this.preloadImage(imageConfig.getImage(imageId));
    });
  },
  
  /**
   * 预加载单张图片
   * @param {string} imageUrl - 图片URL
   */
  preloadImage(imageUrl) {
    if (!imageUrl) return;
    
    wx.getImageInfo({
      src: imageUrl,
      success: () => {
        console.log('图片预加载成功:', imageUrl);
      },
      fail: (err) => {
        console.error('图片预加载失败:', imageUrl, err);
      },
      complete: () => {
        // 更新预加载计数
        this.setData({
          preloadingImages: this.data.preloadingImages - 1
        });
      }
    });
  },
  
  /**
   * 用户点击右上角分享给朋友
   */
  onShareAppMessage() {
    return {
      title: '守护神兽 - 古建脊兽，守护灵契',
      path: '/subgames/guardian-beast/index'
    };
  },
  
  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: '守护神兽 - 古建脊兽，守护灵契',
      query: ''
    };
  }
})