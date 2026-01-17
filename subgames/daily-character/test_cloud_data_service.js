// 云数据服务测试脚本
// 模拟不同场景下的云数据服务行为

console.log('=== 云数据服务测试脚本 ===');

// 模拟 CloudDataService 类
class MockCloudDataService {
  constructor() {
    this.memoryCache = null;
    this.cache = null;
    this.cacheTimestamp = 0;
    this.cloudCount = 0;
  }
  
  // 模拟初始化
  async init() {
    return true;
  }
  
  // 模拟获取云端数据数量
  async getCloudDataCount() {
    console.log('✓ 调用 getCloudDataCount()，返回:', this.cloudCount);
    return this.cloudCount;
  }
  
  // 模拟预加载数据
  async preloadData() {
    console.log('\n✓ 调用 preloadData()');
    
    // 1. 优先使用内存缓存
    if (this.memoryCache && this.memoryCache.length > 0) {
      console.log('  - 检测到内存缓存，数量:', this.memoryCache.length);
      try {
        // 检查云端数据数量
        const cloudCount = await this.getCloudDataCount();
        if (cloudCount === this.memoryCache.length) {
          console.log('  - 云端数量与内存缓存数量相同，继续使用内存缓存');
          return this.memoryCache;
        } else {
          console.log('  - 云端数量与内存缓存数量不同，重新加载');
        }
      } catch (error) {
        console.log('  - 获取云端数量失败，继续使用内存缓存:', error.message);
        return this.memoryCache;
      }
    }

    // 2. 使用磁盘缓存
    if (this.cache && this.cache.length > 0 && Date.now() - this.cacheTimestamp < 24 * 60 * 60 * 1000) {
      console.log('  - 检测到有效磁盘缓存，数量:', this.cache.length);
      try {
        // 检查云端数据数量
        const cloudCount = await this.getCloudDataCount();
        if (cloudCount === this.cache.length) {
          console.log('  - 云端数量与磁盘缓存数量相同，继续使用磁盘缓存');
          // 同时更新内存缓存
          this.memoryCache = this.cache;
          return this.cache;
        } else {
          console.log('  - 云端数量与磁盘缓存数量不同，重新加载');
        }
      } catch (error) {
        console.log('  - 获取云端数量失败，继续使用磁盘缓存:', error.message);
        // 同时更新内存缓存
        this.memoryCache = this.cache;
        return this.cache;
      }
    }

    // 3. 从云端加载数据
    console.log('  - 从云端加载全量数据...');
    // 模拟加载数据
    const data = this.generateMockData(this.cloudCount);
    // 保存到缓存
    this.cache = data;
    this.cacheTimestamp = Date.now();
    this.memoryCache = data;
    console.log('  - 云端数据加载完成，共', data.length, '条');
    return data;
  }
  
  // 生成模拟数据
  generateMockData(count) {
    const data = [];
    for (let i = 1; i <= count; i++) {
      data.push({
        id: i,
        char: `字${i}`,
        correctPronunciation: `pron${i}`,
        wrongPronunciations: [`wrong${i}_1`, `wrong${i}_2`],
        relatedPhrases: [`phrase${i}_1`, `phrase${i}_2`],
        explanation: `explanation${i}`
      });
    }
    return data;
  }
  
  // 设置模拟的云端数据数量
  setCloudCount(count) {
    this.cloudCount = count;
    console.log('\n✓ 设置云端数据数量为:', count);
  }
  
  // 设置模拟缓存
  setCache(count) {
    this.cache = this.generateMockData(count);
    this.cacheTimestamp = Date.now();
    this.memoryCache = null;
    console.log('✓ 设置本地缓存数量为:', count);
  }
  
  // 设置模拟内存缓存
  setMemoryCache(count) {
    this.memoryCache = this.generateMockData(count);
    console.log('✓ 设置内存缓存数量为:', count);
  }
  
  // 清除缓存
  clearCache() {
    this.cache = null;
    this.memoryCache = null;
    this.cacheTimestamp = 0;
    console.log('✓ 清除所有缓存');
  }
}

// 创建测试实例
const service = new MockCloudDataService();

// 测试场景
async function runTestScenarios() {
  console.log('\n=== 测试场景 1: 正常流程 - 本地有缓存，云端数据无更新 ===');
  service.setCloudCount(100);
  service.setCache(100);
  const result1 = await service.preloadData();
  console.log('  结果: 使用', result1 === service.cache ? '缓存' : '新数据', '，数量:', result1.length);
  console.log('  预期: 使用缓存，数量: 100');
  console.log('  测试', result1.length === 100 && result1 === service.cache ? '通过' : '失败');
  
  console.log('\n=== 测试场景 2: 正常流程 - 本地有内存缓存，云端数据无更新 ===');
  service.setMemoryCache(100);
  const result2 = await service.preloadData();
  console.log('  结果: 使用', result2 === service.memoryCache ? '内存缓存' : '新数据', '，数量:', result2.length);
  console.log('  预期: 使用内存缓存，数量: 100');
  console.log('  测试', result2.length === 100 && result2 === service.memoryCache ? '通过' : '失败');
  
  console.log('\n=== 测试场景 3: 更新流程 - 本地有缓存，云端数据有更新 ===');
  service.setCloudCount(150);
  service.setCache(100);
  const result3 = await service.preloadData();
  console.log('  结果: 重新加载数据，数量:', result3.length);
  console.log('  预期: 重新加载，数量: 150');
  console.log('  测试', result3.length === 150 ? '通过' : '失败');
  
  console.log('\n=== 测试场景 4: 更新流程 - 本地有内存缓存，云端数据有更新 ===');
  service.setCloudCount(200);
  service.setMemoryCache(150);
  const result4 = await service.preloadData();
  console.log('  结果: 重新加载数据，数量:', result4.length);
  console.log('  预期: 重新加载，数量: 200');
  console.log('  测试', result4.length === 200 ? '通过' : '失败');
  
  console.log('\n=== 测试场景 5: 无缓存流程 - 本地无缓存 ===');
  service.clearCache();
  service.setCloudCount(80);
  const result5 = await service.preloadData();
  console.log('  结果: 从云端加载数据，数量:', result5.length);
  console.log('  预期: 从云端加载，数量: 80');
  console.log('  测试', result5.length === 80 ? '通过' : '失败');
  
  console.log('\n=== 测试场景 6: 异常处理 - 获取云端数量失败 ===');
  service.setCloudCount(80);
  service.setMemoryCache(80);
  // 模拟获取云端数量失败
  service.getCloudDataCount = async () => {
    throw new Error('网络错误');
  };
  const result6 = await service.preloadData();
  console.log('  结果: 使用', result6 === service.memoryCache ? '内存缓存' : '新数据', '，数量:', result6.length);
  console.log('  预期: 使用内存缓存，数量: 80');
  console.log('  测试', result6.length === 80 && result6 === service.memoryCache ? '通过' : '失败');
  
  // 恢复正常的 getCloudDataCount 方法
  service.getCloudDataCount = async () => {
    console.log('✓ 调用 getCloudDataCount()，返回:', service.cloudCount);
    return service.cloudCount;
  };
  
  console.log('\n=== 测试场景 7: 空数据处理 ===');
  service.clearCache();
  service.setCloudCount(0);
  const result7 = await service.preloadData();
  console.log('  结果: 从云端加载数据，数量:', result7.length);
  console.log('  预期: 从云端加载，数量: 0');
  console.log('  测试', result7.length === 0 ? '通过' : '失败');
}

// 执行测试
runTestScenarios().then(() => {
  console.log('\n=== 所有测试场景执行完成 ===');
}).catch(error => {
  console.error('测试执行失败:', error);
});