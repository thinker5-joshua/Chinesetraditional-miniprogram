// 菜根谭摘录页面 - 优化版本，适配小程序操作习惯
const data = require('./data.js');

Page({
  data: {
    quotes: [],
    currentIndex: 0,
    currentQuote: null,
    isOriginalVisible: false,
    showOriginalDetail: false,
    isLoading: true
  },

  onLoad() {
    this.initApp();
  },



  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    // 显示随机名言
    this.showRandomQuote();
    
    // 停止下拉刷新
    wx.stopPullDownRefresh();
    
    wx.showToast({
      title: '已刷新',
      icon: 'none',
      duration: 800
    });
  },

  /**
   * 初始化应用
   */
  initApp() {
    // 加载名言数据
    this.setData({
      quotes: data.quotes
    });
    
    // 显示随机名言
    this.showRandomQuote();
    
    // 减少加载时间，提升用户体验
    setTimeout(() => {
      this.setData({ isLoading: false });
    }, 600);
  },

  /**
   * 显示随机名言
   */
  showRandomQuote() {
    const quotes = this.data.quotes;
    if (!quotes || quotes.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    this.showQuote(randomIndex);
  },

  /**
   * 显示指定索引的名言
   */
  showQuote(index) {
    const quotes = this.data.quotes;
    if (!quotes || index < 0 || index >= quotes.length) return;
    
    const currentQuote = quotes[index];
    this.setData({
      currentIndex: index,
      currentQuote: currentQuote,
      isOriginalVisible: false,
      showOriginalDetail: false
    });
  },

  /**
   * 显示上一句名言
   */
  showPreviousQuote() {
    const newIndex = this.data.currentIndex - 1;
    if (newIndex < 0) {
      this.showQuote(this.data.quotes.length - 1);
    } else {
      this.showQuote(newIndex);
    }
  },

  /**
   * 显示下一句名言
   */
  showNextQuote() {
    const newIndex = this.data.currentIndex + 1;
    if (newIndex >= this.data.quotes.length) {
      this.showQuote(0);
    } else {
      this.showQuote(newIndex);
    }
  },

  /**
   * 显示原文详情页
   */
  showOriginalDetail() {
    this.setData({
      showOriginalDetail: true
    });
  },

  /**
   * 隐藏原文详情页
   */
  hideOriginalDetail() {
    this.setData({
      showOriginalDetail: false
    });
  },



  /**
   * 分享名言
   */
  shareQuote() {
    const quote = this.data.currentQuote;
    if (!quote) return;
    
    // 微信小程序会自动调用 onShareAppMessage
  },



  /**
   * 复制名言
   */
  copyQuote() {
    const quote = this.data.currentQuote;
    if (!quote) return;
    
    const copyContent = `${quote.quote}\n\n——《菜根谭》${quote.source}`;
    
    wx.setClipboardData({
      data: copyContent,
      success: () => {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'none',
          duration: 1500
        });
      },
      fail: () => {
        wx.showToast({
          title: '复制失败',
          icon: 'none'
        });
      }
    });
  },



  /**
   * 微信分享给朋友
   */
  onShareAppMessage() {
    const quote = this.data.currentQuote;
    if (!quote) {
      return {
        title: '菜根谭智慧',
        path: '/subgames/VegetableRootSayings/index'
      };
    }
    
    return {
      title: `菜根谭智慧：${quote.quote.substring(0, 20)}${quote.quote.length > 20 ? '...' : ''}`,
      path: '/subgames/VegetableRootSayings/index'
    };
  },

  /**
   * 微信分享到朋友圈
   */
  onShareTimeline() {
    const quote = this.data.currentQuote;
    if (!quote) {
      return {
        title: '菜根谭智慧',
        query: ''
      };
    }
    
    return {
      title: `菜根谭智慧：${quote.quote.substring(0, 20)}${quote.quote.length > 20 ? '...' : ''}`,
      query: ''
    };
  }
});