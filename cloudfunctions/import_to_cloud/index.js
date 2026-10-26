// 数据导入云函数
// 用于将导出的 JSON 数据导入到云数据库
// 支持每日一言数据库初始化和数据迁移

const fs = require('fs');
const path = require('path');

// 云函数模块仅在云函数环境中加载
let cloud;
let db;
let dailyQuotesCollection;
let dailyQuotesConfigCollection;

/**
 * 初始化云开发环境
 */
function initCloud() {
  if (!cloud) {
    cloud = require('wx-server-sdk');
    cloud.init({
      env: cloud.DYNAMIC_CURRENT_ENV
    });
    db = cloud.database();
    dailyQuotesCollection = db.collection('daily_quotes');
    dailyQuotesConfigCollection = db.collection('daily_quotes_config');
  }
  return { cloud, db, dailyQuotesCollection, dailyQuotesConfigCollection };
}



/**
 * 初始化每日一言数据库集合
 * @returns {Object} 初始化结果
 */
async function initDailyQuoteDatabase() {
  // 初始化云开发环境
  const { db } = initCloud();

  try {
    console.log('开始初始化每日一言数据库...');
    
    // 集合已手动创建，直接初始化配置数据
    console.log('初始化配置数据...');
    
    // 获取配置数据
    const configResult = await db.collection('daily_quotes_config').get();
    
    if (configResult.data.length === 0) {
      // 插入默认配置
      console.log('初始化配置数据...');
      await db.collection('daily_quotes_config').add({
        data: {
          lastModified: new Date(),
          version: '1.0.0',
          totalCount: 0,
          sources: ['菜根谭', '围炉夜话', '小窗幽记', '幽梦影', '了凡四训', '增广贤文', '道德经'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      console.log('✓ 配置数据初始化成功');
    } else {
      console.log('✓ 配置数据已存在，跳过初始化');
    }
    
    console.log('每日一言数据库初始化完成');
    
    return {
      success: true,
      message: '每日一言数据库初始化成功',
      collections: ['daily_quotes', 'daily_quotes_config']
    };
  } catch (error) {
    console.error('初始化每日一言数据库失败:', error);
    return {
      success: false,
      message: `初始化失败: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * 迁移每日一言数据
 * @returns {Object} 迁移结果
 */
async function migrateDailyQuoteData() {
  // 初始化云开发环境
  const { db } = initCloud();

  try {
    console.log('开始迁移每日一言数据...');
    
    // 1. 读取菜根谭数据
    console.log('读取菜根谭数据...');
    const dataPath = path.join(__dirname, 'daily_quote_data.js');
    
    if (!fs.existsSync(dataPath)) {
      console.error('❌ 未找到 data.js 文件');
      return {
        success: false,
        message: '未找到 data.js 文件',
        error: 'File not found'
      };
    }
    
    // 读取并解析数据
    const dataContent = fs.readFileSync(dataPath, 'utf8');
    
    // 直接使用 eval 解析整个文件
    console.log('解析菜根谭数据...');
    let quotes;
    
    try {
      // 构造一个安全的 eval 环境
      const module = { exports: {} };
      // 使用 Function 构造函数创建一个安全的执行环境
      const require = () => {};
      const execute = new Function('module', 'require', dataContent);
      execute(module, require);
      quotes = module.exports.quotes;
      
      if (!quotes || !Array.isArray(quotes)) {
        console.error('❌ 数据格式错误，quotes 不是数组');
        return {
          success: false,
          message: '数据格式错误，quotes 不是数组',
          error: 'Invalid data format'
        };
      }
    } catch (error) {
      console.error('❌ 解析数据失败:', error);
      return {
        success: false,
        message: '解析数据失败',
        error: error.message
      };
    }
    
    console.log(`✓ 成功读取 ${quotes.length} 条菜根谭数据`);
    
    // 2. 准备迁移数据
    console.log('准备迁移数据...');
    const migrateData = quotes.map(quote => ({
      id: quote.id,
      quote: quote.quote,
      source: quote.source || '',
      volumeNumber: quote.volumeNumber || '',
      category: quote.category || '',
      theme: quote.theme || '',
      fullText: quote.fullText || '',
      origin: '菜根谭', // 新增字段，标识格言来源
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    console.log('✓ 数据准备完成');
    
    // 3. 批量导入数据，集合已手动创建
    console.log('批量导入数据...');
    
    // 分批导入，每批最多100条
    const batchSize = 100;
    let totalImported = 0;
    let totalFailed = 0;
    const errors = [];
    
    for (let i = 0; i < migrateData.length; i += batchSize) {
      const batch = migrateData.slice(i, i + batchSize);
      console.log(`导入批次 ${Math.floor(i / batchSize) + 1}, 条数: ${batch.length}`);
      
      for (const item of batch) {
        try {
          // 检查是否已存在
          const existing = await db.collection('daily_quotes').where({ id: item.id }).get();
          if (existing.data.length === 0) {
            await db.collection('daily_quotes').add({ data: item });
            totalImported++;
            console.log(`导入成功: ${item.id}`);
          } else {
            console.log(`跳过已存在的数据: ${item.id}`);
          }
        } catch (error) {
          console.error(`导入第 ${item.id} 条数据失败:`, error);
          totalFailed++;
          errors.push({ id: item.id, error: error.message });
        }
      }
      
      // 每批处理后暂停一下
      if (i + batchSize < migrateData.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`✓ 数据迁移完成，成功导入 ${totalImported} 条数据，失败 ${totalFailed} 条`);
    
    // 4. 更新配置信息
    console.log('更新配置信息...');
    try {
      await db.collection('daily_quotes_config').update({
        data: {
          lastModified: new Date(),
          totalCount: totalImported,
          updatedAt: new Date()
        }
      });
      console.log('✓ 配置信息更新成功');
    } catch (error) {
      console.error('更新配置信息失败:', error);
    }
    
    return {
      success: totalFailed === 0,
      message: `数据迁移完成，成功导入 ${totalImported} 条数据，失败 ${totalFailed} 条`,
      imported: totalImported,
      failed: totalFailed,
      total: migrateData.length,
      errors
    };
  } catch (error) {
    console.error('迁移每日一言数据失败:', error);
    return {
      success: false,
      message: `迁移失败: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * 检查每日一言数据库状态
 * @returns {Object} 检查结果
 */
async function checkDailyQuoteData() {
  // 初始化云开发环境
  const { db } = initCloud();

  try {
    console.log('检查每日一言数据库状态...');
    
    // 检查配置集合
    const configResult = await db.collection('daily_quotes_config').get();
    const configCount = configResult.data.length;
    
    // 检查数据集合
    const countResult = await db.collection('daily_quotes').count();
    const dataCount = countResult.total;
    
    console.log(`配置数据: ${configCount} 条`);
    console.log(`菜根谭数据: ${dataCount} 条`);
    
    return {
      success: true,
      message: '每日一言数据库检查完成',
      configCount,
      dataCount,
      status: {
        config: configCount > 0 ? 'initialized' : 'not_initialized',
        data: dataCount > 0 ? 'migrated' : 'not_migrated'
      }
    };
  } catch (error) {
    console.error('检查每日一言数据库失败:', error);
    return {
      success: false,
      message: `检查失败: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * 主函数
 * @param {Object} event - 事件参数
 * @param {Object} context - 上下文
 * @returns {Promise<Object>} 处理结果
 */
exports.main = async function(event, context) {
  try {
    // 根据 action 参数执行不同操作
    if (event.action === 'initDailyQuote') {
      // 初始化每日一言数据库
      const result = await initDailyQuoteDatabase();
      return result;
    } else if (event.action === 'migrateDailyQuote') {
      // 迁移每日一言数据
      const result = await migrateDailyQuoteData();
      return result;
    } else if (event.action === 'checkDailyQuote') {
      // 检查每日一言数据库状态
      const result = await checkDailyQuoteData();
      return result;
    } else if (event.action === 'fullDailyQuoteSetup') {
      // 完整的每日一言设置（初始化 + 迁移）
      console.log('开始完整的每日一言设置...');
      
      // 1. 初始化数据库
      const initResult = await initDailyQuoteDatabase();
      if (!initResult.success) {
        return initResult;
      }
      
      // 2. 迁移数据
      const migrateResult = await migrateDailyQuoteData();
      
      return {
        success: migrateResult.success,
        message: `完整设置完成: ${migrateResult.message}`,
        initResult,
        migrateResult
      };
    } else {
      // 未知操作
      console.warn('未知的操作类型:', event.action);
      return {
        success: false,
        message: `未知的操作类型: ${event.action}`,
        error: 'Unknown action'
      };
    }
  } catch (error) {
    console.error('处理过程中发生错误:', error);
    return {
      success: false,
      message: `操作失败: ${error.message}`,
      error: error.message
    };
  }
};


