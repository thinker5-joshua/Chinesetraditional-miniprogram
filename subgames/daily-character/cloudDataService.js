// 云数据访问模块
// 用于从云数据库读取每日一字数据，实现缓存策略和错误处理

const DB_NAME = 'daily_characters';
const CACHE_KEY = 'daily_character_cache';
const CACHE_EXPIRE = 24 * 60 * 60 * 1000; // 24小时缓存
const SEQUENCE_CACHE_KEY = 'daily_character_sequence_cache';
const SEQUENCE_CACHE_EXPIRE = 24 * 60 * 60 * 1000; // 24小时序列缓存

/**
 * 云数据服务类
 */
class CloudDataService {
  constructor() {
    this.isInitialized = false;
    this.cache = null;
    this.cacheTimestamp = 0;
    this.sequenceCache = null;
    this.sequenceCacheTimestamp = 0;
    this.memoryCache = null; // 内存缓存，减少磁盘读写
    this.memoryCacheTimestamp = 0;
  }

  /**
   * 初始化云开发环境
   * @returns {Promise<boolean>} 初始化结果
   */
  async init() {
    if (this.isInitialized) {
      return true;
    }

    if (!wx.cloud) {
      console.error('云开发环境未初始化');
      return false;
    }

    try {
      // 初始化云开发环境
      wx.cloud.init({
        env: wx.cloud.DYNAMIC_CURRENT_ENV
      });

      this.db = wx.cloud.database();
      this.collection = this.db.collection(DB_NAME);
      this.isInitialized = true;
      
      console.log('云数据服务初始化成功');
      
      // 加载缓存
      this.loadCache();
      this.loadSequenceCache();
      
      return true;
    } catch (error) {
      console.error('云数据服务初始化失败:', error);
      return false;
    }
  }

  /**
   * 加载缓存
   */
  loadCache() {
    try {
      const cacheData = wx.getStorageSync(CACHE_KEY);
      if (cacheData && Array.isArray(cacheData.data) && cacheData.data.length > 0) {
        this.cache = cacheData.data;
        this.cacheTimestamp = cacheData.timestamp;
        console.log('缓存加载成功，共', this.cache.length, '条数据');
      } else {
        // 缓存数据无效，清空缓存
        this.cache = null;
        this.cacheTimestamp = 0;
        console.log('缓存数据无效，清空缓存');
      }
    } catch (error) {
      console.error('加载缓存失败:', error);
      this.cache = null;
      this.cacheTimestamp = 0;
    }
  }

  /**
   * 保存缓存
   * @param {Array} data 要缓存的数据
   */
  saveCache(data) {
    try {
      // 确保只存储完整的数据
      if (!Array.isArray(data) || data.length === 0) {
        console.warn('数据为空或格式错误，不保存到缓存');
        return;
      }
      
      // 数据量验证
      if (data.length < 400) {
        console.warn(`缓存数据量较少：仅 ${data.length} 条，可能不是全量数据`);
      } else {
        console.log(`缓存数据量充足：共 ${data.length} 条，符合全量数据要求`);
      }
      
      // 数据结构验证
      const sampleItem = data[0];
      const requiredFields = ['id', 'char', 'correctPronunciation', 'wrongPronunciations', 'relatedPhrases', 'explanation'];
      const hasRequiredFields = requiredFields.every(field => field in sampleItem);
      
      if (!hasRequiredFields) {
        console.warn('数据结构不完整，缺少必要字段，不保存到缓存');
        return;
      }
      
      // 保存到缓存
      const cacheData = {
        data: data,
        timestamp: Date.now(),
        count: data.length, // 记录数据量
        validated: true, // 标记数据已验证
        validationTime: Date.now() // 验证时间
      };
      
      wx.setStorageSync(CACHE_KEY, cacheData);
      this.cache = data;
      this.cacheTimestamp = Date.now();
      
      // 同时更新内存缓存
      this.memoryCache = data;
      this.memoryCacheTimestamp = Date.now();
      
      console.log('缓存保存成功，共', data.length, '条数据');
    } catch (error) {
      console.error('保存缓存失败:', error);
    }
  }

  /**
   * 检查缓存是否有效
   * @returns {boolean} 缓存是否有效
   */
  isCacheValid() {
    if (!this.cache || !Array.isArray(this.cache) || this.cache.length === 0) {
      return false;
    }
    if (Date.now() - this.cacheTimestamp > CACHE_EXPIRE) {
      return false;
    }
    return true;
  }

  /**
   * 清除缓存
   */
  clearCache() {
    try {
      wx.removeStorageSync(CACHE_KEY);
      this.cache = null;
      this.cacheTimestamp = 0;
      
      // 同时清除内存缓存
      this.memoryCache = null;
      this.memoryCacheTimestamp = 0;
      
      console.log('缓存清除成功');
    } catch (error) {
      console.error('清除缓存失败:', error);
    }
  }

  /**
   * 加载序列缓存
   */
  loadSequenceCache() {
    try {
      const cacheData = wx.getStorageSync(SEQUENCE_CACHE_KEY);
      if (cacheData && cacheData.sequence && Array.isArray(cacheData.sequence)) {
        this.sequenceCache = cacheData.sequence;
        this.sequenceCacheTimestamp = cacheData.timestamp;
        console.log('序列缓存加载成功');
      } else {
        this.sequenceCache = null;
        this.sequenceCacheTimestamp = 0;
        console.log('序列缓存无效，清空缓存');
      }
    } catch (error) {
      console.error('加载序列缓存失败:', error);
      this.sequenceCache = null;
      this.sequenceCacheTimestamp = 0;
    }
  }

  /**
   * 保存序列缓存
   * @param {Array} sequence 随机序列
   */
  saveSequenceCache(sequence) {
    try {
      const cacheData = {
        sequence: sequence,
        timestamp: Date.now()
      };
      wx.setStorageSync(SEQUENCE_CACHE_KEY, cacheData);
      this.sequenceCache = sequence;
      this.sequenceCacheTimestamp = Date.now();
      console.log('序列缓存保存成功');
    } catch (error) {
      console.error('保存序列缓存失败:', error);
    }
  }

  /**
   * 清除序列缓存
   */
  clearSequenceCache() {
    try {
      wx.removeStorageSync(SEQUENCE_CACHE_KEY);
      this.sequenceCache = null;
      this.sequenceCacheTimestamp = 0;
      console.log('序列缓存清除成功');
    } catch (error) {
      console.error('清除序列缓存失败:', error);
    }
  }

  /**
   * 检查序列缓存是否有效
   * @returns {boolean} 序列缓存是否有效
   */
  isSequenceCacheValid() {
    if (!this.sequenceCache || !Array.isArray(this.sequenceCache) || this.sequenceCache.length === 0) {
      return false;
    }
    if (Date.now() - this.sequenceCacheTimestamp > SEQUENCE_CACHE_EXPIRE) {
      return false;
    }
    return true;
  }

  /**
   * 计算当天是当年的第几天
   * @returns {number} 当年的第几天
   */
  getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear;
  }

  /**
   * 随机打乱数组
   * @param {Array} array 要打乱的数组
   * @returns {Array} 打乱后的数组
   */
  shuffleArray(array) {
    if (!Array.isArray(array)) {
      return [];
    }
    
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * 预加载数据
   * @returns {Promise<Array>} 预加载的数据
   */
  async preloadData() {
    if (!await this.init()) {
      return [];
    }

    // 1. 优先使用内存缓存
    if (this.memoryCache && this.memoryCache.length > 0) {
      try {
        // 检查云端数据数量
        const cloudCount = await this.getCloudDataCount();
        if (cloudCount === this.memoryCache.length) {
          console.log('使用内存缓存数据，共', this.memoryCache.length, '条，云端数据无更新');
          return this.memoryCache;
        } else {
          console.log('内存缓存数据过时，云端数据数量已变更（本地：', this.memoryCache.length, '，云端：', cloudCount, '）');
        }
      } catch (error) {
        console.error('检查云端数据数量失败，继续使用内存缓存:', error);
        return this.memoryCache;
      }
    }

    // 2. 使用磁盘缓存
    if (this.isCacheValid() && this.cache.length > 0) {
      try {
        // 检查云端数据数量
        const cloudCount = await this.getCloudDataCount();
        if (cloudCount === this.cache.length) {
          console.log('使用磁盘缓存数据，共', this.cache.length, '条，云端数据无更新');
          // 同时更新内存缓存
          this.memoryCache = this.cache;
          this.memoryCacheTimestamp = Date.now();
          return this.cache;
        } else {
          console.log('磁盘缓存数据过时，云端数据数量已变更（本地：', this.cache.length, '，云端：', cloudCount, '）');
        }
      } catch (error) {
        console.error('检查云端数据数量失败，继续使用磁盘缓存:', error);
        // 同时更新内存缓存
        this.memoryCache = this.cache;
        this.memoryCacheTimestamp = Date.now();
        return this.cache;
      }
    }

    try {
      console.log('开始预加载全量数据...');
      
      // 1. 查询数据总量
      const countResult = await this.collection.count();
      const total = countResult.total;
      console.log('数据总量:', total);
      
      if (total === 0) {
        console.log('数据库中无数据');
        return [];
      }
      
      // 2. 分页查询获取全量数据
      const batchSize = 20; // 小程序端最大限制：20条/次
      const data = [];
      
      console.log(`开始分页查询，共 ${total} 条数据，每次查询 ${batchSize} 条`);
      
      for (let i = 0; i < total; i += batchSize) {
        const batchStart = i;
        const batchEnd = Math.min(i + batchSize - 1, total - 1);
        console.log(`查询第 ${batchStart}-${batchEnd} 条数据`);
        
        const result = await this.collection.skip(batchStart).limit(batchSize).get();
        const batchData = result.data;
        data.push(...batchData);
        
        console.log(`当前已获取 ${data.length} 条数据（本次获取 ${batchData.length} 条）`);
        
        // 每批查询后短暂暂停，避免触发频率限制
        if (i + batchSize < total) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      // 3. 验证数据完整性
      if (data.length !== total) {
        console.warn(`数据量不一致：预期 ${total} 条，实际获取 ${data.length} 条`);
      } else {
        console.log('数据量验证通过，共', data.length, '条数据');
      }
      
      // 4. 数据结构验证
      if (data.length > 0) {
        const sampleItem = data[0];
        const requiredFields = ['id', 'char', 'correctPronunciation', 'wrongPronunciations', 'relatedPhrases', 'explanation'];
        const hasRequiredFields = requiredFields.every(field => field in sampleItem);
        if (hasRequiredFields) {
          console.log('数据结构验证通过');
        } else {
          console.warn('数据结构不完整，缺少必要字段');
        }
      }
      
      console.log('数据预加载成功，共', data.length, '条数据');
      
      // 5. 保存到缓存
      this.saveCache(data);
      
      // 6. 更新内存缓存
      this.memoryCache = data;
      this.memoryCacheTimestamp = Date.now();
      
      return data;
    } catch (error) {
      console.error('数据预加载失败:', error);
      return [];
    }
  }

  /**
   * 根据ID获取汉字数据
   * @param {number} id 汉字ID
   * @returns {Promise<Object|null>} 汉字数据
   */
  async getCharacterById(id) {
    if (!await this.init()) {
      return null;
    }

    // 先预加载全量数据
    const data = await this.preloadData();
    if (data.length === 0) {
      return null;
    }

    // 从全量数据中查找
    const character = data.find(item => item.id === id);
    if (character) {
      return character;
    }

    return null;
  }

  /**
   * 根据汉字获取数据
   * @param {string} char 汉字
   * @returns {Promise<Object|null>} 汉字数据
   */
  async getCharacterByChar(char) {
    if (!await this.init()) {
      return null;
    }

    // 先预加载全量数据
    const data = await this.preloadData();
    if (data.length === 0) {
      return null;
    }

    // 从全量数据中查找
    const character = data.find(item => item.char === char);
    if (character) {
      return character;
    }

    return null;
  }

  /**
   * 获取随机汉字
   * @param {string} difficultyLevel 难度等级过滤
   * @returns {Promise<Object|null>} 随机汉字数据
   */
  async getRandomCharacter(difficultyLevel = null) {
    if (!await this.init()) {
      return null;
    }

    // 先预加载全量数据
    const data = await this.preloadData();
    if (data.length === 0) {
      return null;
    }

    // 过滤难度等级
    let filteredData = data;
    if (difficultyLevel) {
      filteredData = data.filter(item => item.difficultyLevel === difficultyLevel);
      if (filteredData.length === 0) {
        return null;
      }
    }

    // 随机选择一个
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    return filteredData[randomIndex];
  }

  /**
   * 根据难度等级获取汉字列表
   * @param {string} difficultyLevel 难度等级
   * @returns {Promise<Array>} 汉字列表
   */
  async getCharactersByDifficulty(difficultyLevel) {
    if (!await this.init()) {
      return [];
    }

    // 先预加载数据
    const data = await this.preloadData();
    if (data.length === 0) {
      return [];
    }

    // 过滤难度等级
    return data.filter(item => item.difficultyLevel === difficultyLevel);
  }

  /**
   * 获取所有汉字数据
   * @returns {Promise<Array>} 所有汉字数据
   */
  async getAllCharacters() {
    return this.preloadData();
  }

  /**
   * 快速获取云端数据数量
   * @returns {Promise<number>} 云端数据数量
   */
  async getCloudDataCount() {
    if (!await this.init()) {
      return 0;
    }
    try {
      const countResult = await this.collection.count();
      return countResult.total;
    } catch (error) {
      console.error('获取云端数据数量失败:', error);
      return 0;
    }
  }

  /**
   * 获取数据统计信息
   * @returns {Promise<Object>} 统计信息
   */
  async getStatistics() {
    if (!await this.init()) {
      return {};
    }

    // 先预加载数据
    const data = await this.preloadData();
    if (data.length === 0) {
      return {};
    }

    // 统计难度等级分布
    const difficultyStats = {};
    // 统计错误原因类型分布
    const errorReasonStats = {};

    data.forEach(item => {
      // 统计难度等级
      const difficulty = item.difficultyLevel;
      if (!difficultyStats[difficulty]) {
        difficultyStats[difficulty] = 0;
      }
      difficultyStats[difficulty]++;

      // 统计错误原因类型
      const errorReason = item.errorReasonType;
      if (!errorReasonStats[errorReason]) {
        errorReasonStats[errorReason] = 0;
      }
      errorReasonStats[errorReason]++;
    });

    return {
      total: data.length,
      difficultyDistribution: difficultyStats,
      errorReasonDistribution: errorReasonStats
    };
  }

  /**
   * 搜索汉字
   * @param {string} keyword 搜索关键词
   * @returns {Promise<Array>} 搜索结果
   */
  async searchCharacters(keyword) {
    if (!await this.init()) {
      return [];
    }

    // 先预加载数据
    const data = await this.preloadData();
    if (data.length === 0) {
      return [];
    }

    // 简单搜索：匹配汉字或拼音
    const keywordLower = keyword.toLowerCase();
    return data.filter(item => {
      return (
        item.char.includes(keyword) ||
        item.correctPronunciation.includes(keywordLower) ||
        item.relatedPhrases.some(phrase => phrase.includes(keyword)) ||
        item.explanation.includes(keyword)
      );
    });
  }

  /**
   * 生成随机序列
   * @param {string} difficultyLevel 难度等级（可选）
   * @returns {Promise<Array>} 随机序列
   */
  async generateRandomSequence(difficultyLevel = null) {
    if (!await this.init()) {
      return [];
    }

    // 先预加载全量数据
    const data = await this.preloadData();
    if (data.length === 0) {
      return [];
    }

    // 过滤难度等级
    let filteredData = data;
    if (difficultyLevel) {
      filteredData = data.filter(item => item.difficultyLevel === difficultyLevel);
      if (filteredData.length === 0) {
        return [];
      }
    }

    // 生成随机序列
    const randomSequence = this.shuffleArray(filteredData);
    return randomSequence;
  }

  /**
   * 获取每日一字
   * @param {string} difficultyLevel 难度等级（可选）
   * @returns {Promise<Object|null>} 每日一字
   */
  async getDailyCharacter(difficultyLevel = null) {
    if (!await this.init()) {
      return null;
    }

    // 计算每日首字ID
    const dayOfYear = this.getDayOfYear();
    const dailyCharacterId = dayOfYear + 1;
    console.log('每日一字ID:', dailyCharacterId);

    // 先预加载全量数据
    const data = await this.preloadData();
    if (data.length === 0) {
      return null;
    }

    // 过滤难度等级
    let filteredData = data;
    if (difficultyLevel) {
      filteredData = data.filter(item => item.difficultyLevel === difficultyLevel);
      if (filteredData.length === 0) {
        return null;
      }
    }

    // 尝试获取指定ID的字
    const dailyCharacter = filteredData.find(item => item.id === dailyCharacterId);
    if (dailyCharacter) {
      console.log('找到每日一字:', dailyCharacter.char);
      return dailyCharacter;
    }

    // 如果不存在，随机选择一个
    console.log('未找到指定ID的字，随机选择');
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    return filteredData[randomIndex];
  }

  /**
   * 获取随机序列（包含每日一字）
   * @param {string} difficultyLevel 难度等级（可选）
   * @returns {Promise<Array>} 随机序列
   */
  async getRandomSequence(difficultyLevel = null) {
    if (!await this.init()) {
      return [];
    }

    // 检查序列缓存是否有效
    if (this.isSequenceCacheValid()) {
      console.log('使用缓存的随机序列');
      return this.sequenceCache;
    }

    // 生成新的随机序列
    const randomSequence = await this.generateRandomSequence(difficultyLevel);
    if (randomSequence.length === 0) {
      return [];
    }

    // 获取每日一字
    const dailyCharacter = await this.getDailyCharacter(difficultyLevel);
    if (dailyCharacter) {
      // 确保每日一字在序列开头
      const dailyCharacterIndex = randomSequence.findIndex(item => item.id === dailyCharacter.id);
      if (dailyCharacterIndex > 0) {
        // 移到开头
        randomSequence.splice(dailyCharacterIndex, 1);
        randomSequence.unshift(dailyCharacter);
      }
    }

    // 保存到序列缓存
    this.saveSequenceCache(randomSequence);

    console.log('生成新的随机序列，共', randomSequence.length, '条数据');
    return randomSequence;
  }
}

// 导出单例实例
const cloudDataService = new CloudDataService();

export default cloudDataService;
