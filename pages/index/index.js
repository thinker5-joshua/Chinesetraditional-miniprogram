// 尝试引入云存储模块，添加错误处理
let cloudStorage = null;
try {
  cloudStorage = require('../../utils/cloudStorage');
} catch (error) {
  console.error('引入云存储模块失败:', error);
  // 提供备用实现
  cloudStorage = {
    getImage: (fileName) => {
      return new Promise((resolve) => {
        // 使用本地默认图片
        const defaultPaths = {
          'wyhd-share-default.png': '/images/qrcode-default.png'
        };
        resolve(defaultPaths[fileName] || '/images/qrcode-default.png');
      });
    }
  };
}

Page({
  data: {
    openid: '',
    wyhdShareDefaultUrl: '',
    games: [
      {
        id: 'guardian-beast',
        title: '守护神兽',
        iconText: '守',
        cssClass: 'guardian-icon'
      },
      {
        id: 'future',
        title: '成语消除',
        iconText: '语',
        cssClass: 'chengyu-icon'
      },
      {
        id: '64Hexagrams',
        title: '六十四卦学习',
        iconText: '易',
        cssClass: 'yijing-icon'
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
    // 获取分享默认图片URL
    cloudStorage.getImage('wyhd-share-default.png')
      .then(url => {
        this.setData({
          wyhdShareDefaultUrl: url
        });
      })
      .catch(error => {
        console.error('Get share default image error:', error);
      });
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
      imageUrl: this.data.wyhdShareDefaultUrl
    };
  },

  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: '探索中国传统文化的魅力',
      query: '',
      imageUrl: this.data.wyhdShareDefaultUrl || '/images/wyhd-share-default.png'
    };
  }
})