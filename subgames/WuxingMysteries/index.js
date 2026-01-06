// 五行奥秘入口页面 - 直接跳转到主页
// 直接将云存储功能集成到页面中，避免模块导入问题

// 云存储文件配置
const cloudFiles = {
  'official-account-qr.png': 'cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/main/official-account-qr.png',
  'wyhd-share-default.png': 'cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/main/wyhd-share-default.png'
};

// 本地图片备选路径
const localFiles = {
  'official-account-qr.png': '/images/official-account-qr.png',
  'wyhd-share-default.png': '/images/wyhd-share-default.png'
};

// 获取云存储图片（带缓存机制）
function getCloudImage(fileName) {
  return new Promise((resolve, reject) => {
    try {
      // 检查文件名是否在配置中
      if (!cloudFiles[fileName]) {
        // 如果配置中没有，尝试返回本地图片
        if (localFiles[fileName]) {
          resolve(localFiles[fileName]);
        } else {
          reject(new Error(`File ${fileName} not configured in cloudFiles`));
        }
        return;
      }
      
      const fileID = cloudFiles[fileName];
      
      // 直接使用云存储文件ID（小程序图片组件支持直接使用cloud://路径）
      resolve(fileID);
    } catch (error) {
      console.error('获取云存储图片失败:', error);
      // 发生错误，使用本地图片作为备选
      if (localFiles[fileName]) {
        resolve(localFiles[fileName]);
      } else {
        reject(error);
      }
    }
  });
}

Page({
  data: {
    // 加载状态
    isLoading: true,
    wyhdShareDefaultUrl: ''
  },

  onLoad() {
    // 获取分享默认图片URL
    getCloudImage('wyhd-share-default.png')
      .then(url => {
        this.setData({
          wyhdShareDefaultUrl: url
        });
      })
      .catch(error => {
        console.error('Get share default image error:', error);
      });

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
      imageUrl: this.data.wyhdShareDefaultUrl || '/images/wyhd-share-default.png'
    };
  }
});