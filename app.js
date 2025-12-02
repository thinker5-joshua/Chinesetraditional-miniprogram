// app.js
App({
  onLaunch: function() {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-9gc2gh7abcf27e54-1386637660', // 使用腾讯云开发环境ID
        traceUser: true,
      });
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  
  globalData: {
    userInfo: null,
    games: [
      { id: 'stars', name: '二十八星宿', description: '探索古代天文学' },
      { id: 'hexagrams', name: '六十四卦', description: '学习易经智慧' },
      { id: 'dreamland', name: '七十二梦境诗游记', description: '古典诗词探索' },
      { id: 'future', name: '未来游戏', description: '传统与现代结合' },
      { id: 'vegetable', name: '菜根谭', description: '处世哲学学习' },
      { id: 'family', name: '家谱探索', description: '家族历史探寻' }
    ]
  }
}); 