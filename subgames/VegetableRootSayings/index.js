// 菜根谭摘录页面 - 优化版本，适配小程序操作习惯
const data = require('./data.js');

Page({
  data: {
    quotes: [],
    randomSequence: [],
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
   * 生成随机序列
   */
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  /**
   * 初始化应用
   */
  initApp() {
    // 加载名言数据
    const quotes = data.quotes;
    // 生成随机序列
    const randomSequence = this.shuffleArray(Array.from({ length: quotes.length }, (_, i) => i));
    this.setData({
      quotes: quotes,
      randomSequence: randomSequence
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
    const randomSequence = this.data.randomSequence;
    if (!randomSequence || randomSequence.length === 0) return;
    
    const randomPosition = Math.floor(Math.random() * randomSequence.length);
    this.showQuote(randomPosition);
  },

  /**
   * 显示指定索引的名言（基于随机序列）
   */
  showQuote(sequenceIndex) {
    const quotes = this.data.quotes;
    const randomSequence = this.data.randomSequence;
    if (!quotes || !randomSequence || sequenceIndex < 0 || sequenceIndex >= randomSequence.length) return;
    
    const quoteIndex = randomSequence[sequenceIndex];
    const currentQuote = quotes[quoteIndex];
    this.setData({
      currentIndex: sequenceIndex,
      currentQuote: currentQuote,
      isOriginalVisible: false,
      showOriginalDetail: false
    });
  },

  /**
   * 显示上一句名言（基于随机序列）
   */
  showPreviousQuote() {
    const randomSequence = this.data.randomSequence;
    let newIndex = this.data.currentIndex - 1;
    if (newIndex < 0) {
      newIndex = randomSequence.length - 1;
    }
    this.showQuote(newIndex);
  },

  /**
   * 显示下一句名言（基于随机序列）
   */
  showNextQuote() {
    const randomSequence = this.data.randomSequence;
    let newIndex = this.data.currentIndex + 1;
    if (newIndex >= randomSequence.length) {
      newIndex = 0;
    }
    this.showQuote(newIndex);
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
    
    const copyContent = `${quote.theme}\n\n${quote.quote}\n\n——《菜根谭》${quote.source}`;
    
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
      title: `菜根谭智慧：${quote.theme} - ${quote.quote.substring(0, 15)}${quote.quote.length > 15 ? '...' : ''}`,
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
      title: `菜根谭智慧：${quote.theme} - ${quote.quote.substring(0, 15)}${quote.quote.length > 15 ? '...' : ''}`,
      query: ''
    };
  }
});