Page({
  data: {
    openid: '',
    games: [
      {
        id: '64Hexagrams',
        title: '六十四卦学习',
        iconText: '易',
        cssClass: 'yijing-icon'
      },
      {
        id: 'future',
        title: '成语消除',
        iconText: '语',
        cssClass: 'chengyu-icon'
      },
      {
        id: '28Stars',
        title: '二十八星宿探秘',
        iconText: '星',
        cssClass: 'star-icon'
      },
      {
        id: 'VegetableRootSayings',
        title: '菜根谭摘录',
        iconText: '根',
        cssClass: 'root-icon'
      }
    ]
  },
  onLoad() {
    // 移除云函数调用，成语消除游戏不需要用户认证
  },
  
  navigateToGame(e) {
    const gameId = e.currentTarget.dataset.game
    wx.navigateTo({
      url: `/subgames/${gameId}/index`
    })
  },

  /**
   * 用户点击右上角分享给朋友
   */
  onShareAppMessage(options) {
    return {
      title: '探索中国传统文化的魅力',
      path: '/pages/index/index',
      imageUrl: '/images/wyhd-share-default.png'
    };
  },

  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: '探索中国传统文化的魅力',
      query: '',
      imageUrl: '/images/wyhd-share-default.png'
    };
  }
})