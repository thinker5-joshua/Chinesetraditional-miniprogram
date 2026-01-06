// utils/cloudStorage.js

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

// 缓存过期时间（7天，单位：毫秒）
const CACHE_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000;

// 缓存目录
const CACHE_DIR = wx.env.USER_DATA_PATH + '/cloud-image-cache/';

/**
 * 确保缓存目录存在
 */
function ensureCacheDirExists() {
  const fs = wx.getFileSystemManager();
  try {
    fs.accessSync(CACHE_DIR);
  } catch (error) {
    // 目录不存在，创建目录
    fs.mkdirSync(CACHE_DIR, true);
  }
}

/**
 * 计算字符串的哈希值，用于生成缓存文件名
 * @param {string} str - 输入字符串
 * @returns {string} - 哈希值
 */
function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

/**
 * 获取缓存图片路径
 * @param {string} fileID - 云文件ID
 * @returns {string} - 缓存图片路径
 */
function getCachePath(fileID) {
  const hash = getHash(fileID);
  const ext = fileID.split('.').pop() || 'jpg';
  return `${CACHE_DIR}${hash}.${ext}`;
}

/**
 * 获取缓存索引
 * @returns {Object} - 缓存索引对象
 */
function getCacheIndex() {
  try {
    return wx.getStorageSync('cloud_image_cache_index') || {};
  } catch (error) {
    console.error('获取缓存索引失败:', error);
    return {};
  }
}

/**
 * 保存缓存索引
 * @param {Object} index - 缓存索引对象
 */
function saveCacheIndex(index) {
  try {
    wx.setStorageSync('cloud_image_cache_index', index);
  } catch (error) {
    console.error('保存缓存索引失败:', error);
  }
}

/**
 * 检查缓存是否有效
 * @param {string} fileID - 云文件ID
 * @returns {string|null} - 有效缓存路径，无效返回null
 */
function checkCache(fileID) {
  const cacheIndex = getCacheIndex();
  const cacheItem = cacheIndex[fileID];
  
  if (!cacheItem) {
    return null;
  }
  
  const now = Date.now();
  if (now > cacheItem.expire) {
    // 缓存过期，清理
    delete cacheIndex[fileID];
    saveCacheIndex(cacheIndex);
    
    // 删除过期文件
    const fs = wx.getFileSystemManager();
    try {
      fs.unlinkSync(cacheItem.path);
    } catch (error) {
      // 文件不存在，忽略
    }
    
    return null;
  }
  
  // 检查文件是否存在
  const fs = wx.getFileSystemManager();
  try {
    fs.accessSync(cacheItem.path);
    return cacheItem.path;
  } catch (error) {
    // 文件不存在，清理索引
    delete cacheIndex[fileID];
    saveCacheIndex(cacheIndex);
    return null;
  }
}

/**
 * 保存缓存
 * @param {string} fileID - 云文件ID
 * @param {string} tempFilePath - 临时文件路径
 * @returns {string} - 缓存文件路径
 */
function saveCache(fileID, tempFilePath) {
  ensureCacheDirExists();
  
  const cachePath = getCachePath(fileID);
  const fs = wx.getFileSystemManager();
  
  try {
    // 复制文件到缓存目录
    fs.copyFileSync(tempFilePath, cachePath);
    
    // 更新缓存索引
    const cacheIndex = getCacheIndex();
    const now = Date.now();
    
    cacheIndex[fileID] = {
      path: cachePath,
      expire: now + CACHE_EXPIRE_TIME,
      lastUsed: now
    };
    
    saveCacheIndex(cacheIndex);
    
    return cachePath;
  } catch (error) {
    console.error('保存缓存失败:', error);
    return null;
  }
}

/**
 * 下载云文件到本地
 * @param {string} fileID - 云文件ID
 * @returns {Promise<string>} - 本地文件路径
 */
function downloadFile(fileID) {
  return new Promise((resolve, reject) => {
    wx.cloud.downloadFile({
      fileID,
      success: res => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          reject(new Error(`下载失败，HTTP状态码: ${res.statusCode}`));
        }
      },
      fail: error => {
        console.error('云文件下载失败:', error);
        reject(error);
      }
    });
  });
}

/**
 * 获取云存储图片（带缓存机制）
 * @param {string} fileName - 文件名
 * @returns {Promise<string>} - 图片路径（本地路径或云文件ID）
 */
function getCloudImageUrl(fileName) {
  return new Promise((resolve, reject) => {
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
    
    // 先检查缓存
    const cachedPath = checkCache(fileID);
    if (cachedPath) {
      resolve(cachedPath);
      return;
    }
    
    // 缓存无效，下载图片
    downloadFile(fileID)
      .then(tempFilePath => {
        // 保存到缓存
        const cachePath = saveCache(fileID, tempFilePath);
        resolve(cachePath || tempFilePath);
      })
      .catch(error => {
        console.error('获取云存储图片失败:', error);
        // 下载失败，使用本地图片作为备选
        if (localFiles[fileName]) {
          resolve(localFiles[fileName]);
        } else {
          reject(error);
        }
      });
  });
}

/**
 * 预加载云存储图片，提前缓存
 * @param {Array<string>} fileNames - 文件名数组
 */
function preloadCloudImages(fileNames) {
  fileNames.forEach(fileName => {
    getCloudImageUrl(fileName).catch(error => {
      console.error(`预加载图片 ${fileName} 失败:`, error);
    });
  });
}

/**
 * 清理过期缓存
 */
function clearExpiredCache() {
  const cacheIndex = getCacheIndex();
  const now = Date.now();
  const fs = wx.getFileSystemManager();
  let deletedCount = 0;
  
  for (const fileID in cacheIndex) {
    const cacheItem = cacheIndex[fileID];
    if (now > cacheItem.expire) {
      // 删除过期文件
      try {
        fs.unlinkSync(cacheItem.path);
        deletedCount++;
      } catch (error) {
        // 文件不存在，忽略
      }
      
      // 删除缓存索引
      delete cacheIndex[fileID];
    }
  }
  
  saveCacheIndex(cacheIndex);
  console.log(`清理了 ${deletedCount} 个过期缓存`);
  return deletedCount;
}

// 统一导出（兼容CommonJS和ES模块）
module.exports = {
  getCloudImageUrl,
  preloadCloudImages,
  clearExpiredCache,
  // 为了兼容性，添加getImage别名
  getImage: getCloudImageUrl
};
