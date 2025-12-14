// 图片配置文件 - 集中管理所有图片路径
// 注意：云存储文件名区分大小写，必须与实际存储完全一致

const imageConfig = {
  // 图片尺寸配置
  sizes: {
    small: 120,    // 列表场景：120rpx × 120rpx
    medium: 200,   // 单个卡片/详情页：200rpx × 200rpx
    large: 400     // 海报生成：400rpx × 400rpx
  },
  
  // 脊兽图片配置
  beasts: {
    "xianren": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-xianren.png",
    "dragon": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-dragon.PNG",
    "phoenix": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-phoenix.PNG",
    "lion": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-lion.PNG",
    "tianma": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-tianma.PNG",
    "haima": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-haima.PNG",
    "suanmi": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-suanmi.PNG",
    "xiayu": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-xiayu.PNG",
    "xiezhi": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-xiezhi.PNG",
    "douniu": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-douniu.PNG",
    "hangshi": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-hangshi.PNG"
  },
  
  // 神兽卡背面图
  cardBack: {
    "back": "cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-Back.PNG"
  },
  
  // 获取图片路径的方法
  getImage(imageId) {
    return this.beasts[imageId] || this.cardBack[imageId] || '';
  },
  
  // 获取指定尺寸的方法
  getSize(sizeType) {
    return this.sizes[sizeType] || this.sizes.medium;
  }
};

module.exports = imageConfig;
