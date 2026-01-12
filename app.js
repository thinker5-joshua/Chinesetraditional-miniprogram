// app.js

// 尝试引入云存储模块，添加错误处理
let cloudStorage = null;
try {
  cloudStorage = require('./utils/cloudStorage');
} catch (error) {
  console.error('引入云存储模块失败:', error);
  // 提供备用实现
  cloudStorage = {
    getImage: (fileName) => {
      return new Promise((resolve) => {
        // 使用本地默认图片
        const defaultPaths = {
          'official-account-qr.png': '/images/official-account-qr.png',
          'wyhd-share-default.png': '/images/qrcode-default.png'
        };
        resolve(defaultPaths[fileName] || '/images/qrcode-default.png');
      });
    },
    clearExpiredCache: () => {
      console.log('云存储模块未加载，跳过缓存清理');
      return 0;
    },
    preloadCloudImages: (fileNames) => {
      console.log('云存储模块未加载，跳过图片预加载:', fileNames);
    }
  };
}

App({
  onLaunch: function() {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-4g76v9gbd3112c01', // 使用腾讯云开发环境ID
        traceUser: true,
      });
    }

    // 清理过期缓存
    cloudStorage.clearExpiredCache();
    
    // 预加载常用云存储图片
    cloudStorage.preloadCloudImages(['official-account-qr.png', 'wyhd-share-default.png']);

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