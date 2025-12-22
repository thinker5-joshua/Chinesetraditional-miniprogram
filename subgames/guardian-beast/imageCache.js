// 守护神兽图片缓存模块
// 提供统一的图片缓存管理功能，供所有页面使用

const imageCache = {
  // 计算字符串的简单哈希值，用于生成缓存文件名
  getHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  },
  
  // 从缓存获取图片路径
  getImageFromCache(fileID) {
    try {
      const cacheIndex = wx.getStorageSync('guardianBeastCacheIndex') || {};
      const cacheInfo = cacheIndex[fileID];
      
      if (cacheInfo) {
        const { localPath, expireTime } = cacheInfo;
        const now = Date.now();
        
        // 检查缓存是否过期（7天过期）
        if (now < expireTime) {
          // 检查文件是否存在
          const fs = wx.getFileSystemManager();
          try {
            fs.accessSync(localPath);
            return localPath;
          } catch (e) {
            // 文件不存在，删除缓存索引
            delete cacheIndex[fileID];
            wx.setStorageSync('guardianBeastCacheIndex', cacheIndex);
            return null;
          }
        } else {
          // 缓存过期，删除缓存索引和文件
          delete cacheIndex[fileID];
          wx.setStorageSync('guardianBeastCacheIndex', cacheIndex);
          try {
            const fs = wx.getFileSystemManager();
            fs.unlinkSync(localPath);
          } catch (e) {
            // 文件不存在，忽略
          }
          return null;
        }
      }
      return null;
    } catch (e) {
      console.error('获取缓存图片失败', e);
      return null;
    }
  },
  
  // 将图片保存到缓存
  saveImageToCache(fileID, tempFilePath) {
    try {
      const hash = this.getHash(fileID);
      const localPath = `${wx.env.USER_DATA_PATH}/guardian-beast-${hash}.jpg`;
      
      // 复制文件到本地缓存目录
      const fs = wx.getFileSystemManager();
      fs.copyFileSync(tempFilePath, localPath);
      
      // 更新缓存索引
      const cacheIndex = wx.getStorageSync('guardianBeastCacheIndex') || {};
      const expireTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天过期
      cacheIndex[fileID] = {
        localPath,
        expireTime,
        lastUsed: Date.now()
      };
      wx.setStorageSync('guardianBeastCacheIndex', cacheIndex);
      
      return localPath;
    } catch (e) {
      console.error('保存图片到缓存失败', e);
      return null;
    }
  },
  
  // 下载图片（结合缓存机制）
  downloadImage(fileID) {
    return new Promise((resolve, reject) => {
      // 先检查缓存
      const cachedPath = this.getImageFromCache(fileID);
      if (cachedPath) {
        console.log('使用缓存图片:', fileID);
        resolve(cachedPath);
        return;
      }
      
      // 缓存不存在，下载图片
      console.log('下载图片:', fileID);
      wx.cloud.downloadFile({
        fileID,
        success: (res) => {
          // 保存到缓存
          const localPath = this.saveImageToCache(fileID, res.tempFilePath);
          resolve(localPath || res.tempFilePath);
        },
        fail: (err) => {
          console.error('下载图片失败', err);
          reject(err);
        }
      });
    });
  },
  
  // 统一的图片加载接口
  // 支持云文件和本地文件
  getImage(imageUrl) {
    return new Promise((resolve, reject) => {
      if (!imageUrl) {
        reject(new Error('图片URL不能为空'));
        return;
      }
      
      // 检查是否是云文件ID
      if (imageUrl.startsWith('cloud://')) {
        // 使用缓存机制下载文件
        this.downloadImage(imageUrl)
          .then(resolve)
          .catch(reject);
      } else {
        // 非云文件ID，直接使用
        console.log('使用本地图片:', imageUrl);
        resolve(imageUrl);
      }
    });
  },
  
  // 预加载多张图片到缓存
  preloadImages(imageUrls) {
    const promises = imageUrls.map(url => this.getImage(url));
    return Promise.all(promises);
  },
  
  // 清理过期缓存
  clearExpiredCache() {
    try {
      const cacheIndex = wx.getStorageSync('guardianBeastCacheIndex') || {};
      const now = Date.now();
      const fs = wx.getFileSystemManager();
      let deletedCount = 0;
      
      // 遍历缓存索引，删除过期缓存
      for (const fileID in cacheIndex) {
        const { localPath, expireTime } = cacheIndex[fileID];
        if (now > expireTime) {
          // 删除文件
          try {
            fs.unlinkSync(localPath);
            deletedCount++;
          } catch (e) {
            // 文件不存在，忽略
          }
          // 删除缓存索引
          delete cacheIndex[fileID];
        }
      }
      
      // 更新缓存索引
      wx.setStorageSync('guardianBeastCacheIndex', cacheIndex);
      
      if (deletedCount > 0) {
        console.log(`清理了 ${deletedCount} 个过期缓存`);
      }
      
      return deletedCount;
    } catch (e) {
      console.error('清理过期缓存失败', e);
      return 0;
    }
  },
  
  // 获取缓存统计信息
  getCacheInfo() {
    try {
      const cacheIndex = wx.getStorageSync('guardianBeastCacheIndex') || {};
      const now = Date.now();
      let totalSize = 0;
      let totalCount = 0;
      let expiredCount = 0;
      
      // 遍历缓存索引，统计缓存信息
      for (const fileID in cacheIndex) {
        const { localPath, expireTime } = cacheIndex[fileID];
        totalCount++;
        
        if (now > expireTime) {
          expiredCount++;
        } else {
          // 获取文件大小
          try {
            const fs = wx.getFileSystemManager();
            const stat = fs.statSync(localPath);
            totalSize += stat.size;
          } catch (e) {
            // 文件不存在，忽略
          }
        }
      }
      
      return {
        totalCount,
        expiredCount,
        totalSize: Math.round(totalSize / 1024), // 转换为KB
        cacheIndex
      };
    } catch (e) {
      console.error('获取缓存信息失败', e);
      return null;
    }
  }
};

module.exports = imageCache;
