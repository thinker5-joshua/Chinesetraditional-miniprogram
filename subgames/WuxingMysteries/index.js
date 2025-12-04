// 五行奥秘入口页面 - 直接跳转到主页
Page({
  data: {
    // 加载状态
    isLoading: true
  },

  onLoad() {

    // 立即跳转，不等待onReady
    this.navigateToMain();
  },

  onReady() {

  },

  navigateToMain() {
    try {
      wx.redirectTo({
        url: '/subgames/WuxingMysteries/pages/main/index',
        success: () => {

        },
        fail: () => {

          // 尝试使用navigateTo作为备选方案
          wx.navigateTo({
            url: '/subgames/WuxingMysteries/pages/main/index',
            fail: () => {

              wx.showToast({
                title: '页面加载失败',
                icon: 'none',
                duration: 2000
              });
            }
          });
        }
      });
    } catch (err) {

      wx.showToast({
        title: '页面加载异常',
        icon: 'none', 
        duration: 2000
      });
    }
  },

  /**
   * 分享功能
   */
  onShareAppMessage() {
    return {
      title: '五行奥秘 - 探索中国传统哲学',
      path: '/subgames/WuxingMysteries/index',
      imageUrl: '/images/wyhd-share-default.png'
    };
  }
});