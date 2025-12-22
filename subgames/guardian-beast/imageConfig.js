// 图片配置文件 - 集中管理所有图片路径
// 注意：云存储文件名区分大小写，必须与实际存储完全一致

const imageCache = require('./imageCache');

const imageConfig = {
  // 图片尺寸配置
  sizes: {
    small: 120,    // 列表场景：120rpx × 120rpx
    medium: 200,   // 单个卡片/详情页：200rpx × 200rpx
    large: 400     // 海报生成：400rpx × 400rpx
  },
  
  // 脊兽图片配置
  beasts: {
    "xianren": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-xianren.jpg",
    "dragon": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-dragon.jpg",
    "phoenix": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-phoenix.jpg",
    "lion": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-lion.jpg",
    "tianma": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-tianma.jpg",
    "haima": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-haima.jpg",
    "suanmi": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-suanmi.jpg",
    "xiayu": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-xiayu.jpg",
    "xiezhi": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-xiezhi.jpg",
    "douniu": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-douniu.jpg",
    "hangshi": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-hangshi.jpg"
  },
  
  // 神兽卡背面图
  cardBack: {
    "back": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-Back.jpg"
  },
  
  // 获取原始图片路径的方法
  getOriginalImage(imageId) {
    return this.beasts[imageId] || this.cardBack[imageId] || '';
  },
  
  // 获取图片路径的方法（带缓存）
  getImage(imageId) {
    return this.getOriginalImage(imageId);
  },
  
  // 获取图片的缓存路径（异步）
  async getCachedImage(imageId) {
    const imageUrl = this.getOriginalImage(imageId);
    if (!imageUrl) return '';
    
    try {
      return await imageCache.getImage(imageUrl);
    } catch (err) {
      console.error('获取缓存图片失败:', imageId, err);
      return imageUrl;
    }
  },
  
  // 预加载所有图片到缓存
  preloadAllImages() {
    const allImageUrls = [
      ...Object.values(this.beasts),
      ...Object.values(this.cardBack)
    ];
    
    return imageCache.preloadImages(allImageUrls);
  },
  
  // 清理过期缓存
  clearExpiredCache() {
    return imageCache.clearExpiredCache();
  },
  
  // 获取缓存统计信息
  getCacheInfo() {
    return imageCache.getCacheInfo();
  },
  
  // 获取指定尺寸的方法
  getSize(sizeType) {
    return this.sizes[sizeType] || this.sizes.medium;
  }
};

module.exports = imageConfig;
