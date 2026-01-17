// 数据导入云函数
// 用于将导出的 JSON 数据导入到云数据库

const fs = require('fs');
const path = require('path');

// 云函数模块仅在云函数环境中加载
let cloud;
let db;
let dailyCharactersCollection;

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
    dailyCharactersCollection = db.collection('daily_characters');
  }
  return { cloud, db, dailyCharactersCollection };
}

/**
 * 导入数据到云数据库
 * @param {Array} data - 要导入的数据数组
 * @param {number} batchSize - 批次大小
 * @returns {Object} 导入结果
 */
async function importData(data, batchSize = 50) {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      success: false,
      message: '数据为空或格式错误',
      imported: 0,
      failed: 0,
      errors: []
    };
  }

  // 初始化云开发环境
  const { db } = initCloud();

  let imported = 0;
  let failed = 0;
  const errors = [];
  const total = data.length;

  console.log(`开始导入数据，共 ${total} 条`);
  console.log(`批次大小: ${batchSize}`);

  // 分批导入
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const batchStart = i + 1;
    const batchEnd = Math.min(i + batchSize, total);

    console.log(`处理批次: ${batchStart}-${batchEnd}`);

    try {
      // 使用事务批量导入
      const transaction = await db.startTransaction();
      
      for (const item of batch) {
        try {
          // 检查是否已存在相同 ID 的记录
          const existing = await transaction.collection('daily_characters')
            .where({ id: item.id })
            .get();

          if (existing.data.length > 0) {
            // 更新现有记录
            await transaction.collection('daily_characters')
              .where({ id: item.id })
              .update({
                data: item
              });
          } else {
            // 插入新记录
            await transaction.collection('daily_characters')
              .add({
                data: item
              });
          }

          imported++;
        } catch (error) {
          console.error(`导入第 ${item.id} 条数据失败:`, error);
          failed++;
          errors.push({
            id: item.id,
            char: item.char,
            error: error.message
          });
        }
      }

      // 提交事务
      await transaction.commit();
      console.log(`批次 ${batchStart}-${batchEnd} 处理完成`);

    } catch (error) {
      console.error(`批次 ${batchStart}-${batchEnd} 处理失败:`, error);
      failed += batch.length;
      errors.push({
        batch: `${batchStart}-${batchEnd}`,
        error: error.message
      });
    }

    // 每批处理后暂停一下，避免触发频率限制
    if (i + batchSize < data.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`数据导入完成`);
  console.log(`成功: ${imported}`);
  console.log(`失败: ${failed}`);

  return {
    success: failed === 0,
    message: `导入完成，成功 ${imported} 条，失败 ${failed} 条`,
    imported,
    failed,
    total,
    errors
  };
}

/**
 * 读取 JSON 数据文件
 * @param {string} filePath - 文件路径
 * @returns {Array} 数据数组
 */
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    if (!Array.isArray(data)) {
      throw new Error('JSON 文件内容不是数组格式');
    }
    
    return data;
  } catch (error) {
    console.error('读取 JSON 文件失败:', error);
    throw error;
  }
}

/**
 * 检查云数据库数据
 * @returns {Object} 检查结果
 */
async function checkData() {
  // 初始化云开发环境
  const { db } = initCloud();

  try {
    // 查询数据总量
    const countResult = await db.collection('daily_characters').count();
    
    console.log(`云数据库中共有 ${countResult.total} 条数据`);
    
    return {
      success: true,
      count: countResult.total,
      message: `云数据库中共有 ${countResult.total} 条数据`
    };
  } catch (error) {
    console.error('检查数据失败:', error);
    return {
      success: false,
      message: `检查数据失败: ${error.message}`,
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
    if (event.action === 'check') {
      // 检查数据
      const result = await checkData();
      return result;
    } else {
      // 默认执行导入操作
      // 读取导出的数据文件
      const jsonFilePath = path.join(__dirname, 'export_data.json');
      const data = readJsonFile(jsonFilePath);

      console.log(`读取到 ${data.length} 条数据`);

      // 验证数据格式
      const validData = data.filter(item => {
        const requiredFields = ['id', 'char', 'correctPronunciation', 'wrongPronunciations', 
                               'relatedPhrases', 'explanation', 'errorReasonType', 'difficultyLevel'];
        
        return requiredFields.every(field => field in item);
      });

      if (validData.length < data.length) {
        console.warn(`过滤掉 ${data.length - validData.length} 条无效数据`);
      }

      // 导入数据
      const result = await importData(validData);

      return {
        success: result.success,
        data: result,
        message: result.message
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

/**
 * 本地测试函数
 * 可以直接运行此文件进行测试
 */
async function testImport() {
  console.log('开始本地测试导入...');
  
  try {
    // 读取导出的数据文件
    const jsonFilePath = path.join(__dirname, 'export_data.json');
    const data = readJsonFile(jsonFilePath);

    console.log(`读取到 ${data.length} 条数据`);

    // 验证数据格式
    const validData = data.filter(item => {
      const requiredFields = ['id', 'char', 'correctPronunciation', 'wrongPronunciations', 
                             'relatedPhrases', 'explanation', 'errorReasonType', 'difficultyLevel'];
      
      return requiredFields.every(field => field in item);
    });

    if (validData.length < data.length) {
      console.warn(`过滤掉 ${data.length - validData.length} 条无效数据`);
    }

    console.log(`准备导入 ${validData.length} 条有效数据`);
    
    // 统计数据分布
    const difficultyStats = {};
    const errorReasonStats = {};
    
    validData.forEach(item => {
      // 统计难度等级
      const difficulty = item.difficultyLevel;
      difficultyStats[difficulty] = (difficultyStats[difficulty] || 0) + 1;
      
      // 统计错误原因类型
      const errorReason = item.errorReasonType;
      errorReasonStats[errorReason] = (errorReasonStats[errorReason] || 0) + 1;
    });
    
    console.log('\n数据分布统计:');
    console.log('难度等级分布:');
    Object.entries(difficultyStats).forEach(([level, count]) => {
      console.log(`  ${level}: ${count} 条`);
    });
    
    console.log('\n错误原因类型分布:');
    Object.entries(errorReasonStats).forEach(([type, count]) => {
      console.log(`  类型 ${type}: ${count} 条`);
    });
    
    console.log('\n测试完成，数据验证通过');
    
  } catch (error) {
    console.error('测试失败:', error);
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  // 仅运行测试函数，不加载云函数模块
  testImport();
}
