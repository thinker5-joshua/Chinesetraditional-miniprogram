// 新增数据导入脚本
// 用于将新增的91条数据上传到云数据库

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

  console.log(`开始导入数据，共 ${data.length} 条`);
  console.log(`批次大小: ${batchSize}`);

  let imported = 0;
  let failed = 0;
  const errors = [];
  const total = data.length;

  // 数据映射：将charId转换为id
  const mappedData = data.map(item => ({
    id: item.charId,
    char: item.char,
    correctPronunciation: item.correctPronunciation,
    wrongPronunciations: item.wrongPronunciations,
    relatedPhrases: item.relatedPhrases,
    explanation: item.explanation,
    errorReasonType: item.errorReasonType,
    difficultyLevel: item.difficultyLevel
  }));

  // 本地测试模式，不实际调用云函数
  if (process.env.NODE_ENV !== 'cloud') {
    console.log('本地测试模式，不实际调用云函数');
    console.log(`将导入 ${mappedData.length} 条数据`);
    
    // 验证数据格式
    const validData = mappedData.filter(item => {
      const requiredFields = ['id', 'char', 'correctPronunciation', 'wrongPronunciations', 
                             'relatedPhrases', 'explanation', 'errorReasonType', 'difficultyLevel'];
      
      return requiredFields.every(field => field in item);
    });

    console.log(`有效数据: ${validData.length} 条`);
    
    if (validData.length < mappedData.length) {
      console.warn(`过滤掉 ${mappedData.length - validData.length} 条无效数据`);
    }

    return {
      success: true,
      message: '本地测试完成',
      imported: validData.length,
      failed: 0,
      errors: [],
      testMode: true,
      data: validData
    };
  }

  // 初始化云开发环境
  const { db } = initCloud();

  for (let i = 0; i < mappedData.length; i += batchSize) {
    const batch = mappedData.slice(i, i + batchSize);
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
            console.log(`更新记录: id=${item.id}, char=${item.char}`);
          } else {
            // 插入新记录
            await transaction.collection('daily_characters')
              .add({
                data: item
              });
            console.log(`插入记录: id=${item.id}, char=${item.char}`);
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
    if (i + batchSize < mappedData.length) {
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
 * 主函数
 * @param {Object} event - 事件参数
 * @param {Object} context - 上下文
 * @returns {Promise<Object>} 处理结果
 */
exports.main = async function(event, context) {
  try {
    // 读取新增的数据文件
    const jsonFilePath = path.join(__dirname, 'new_cloud_data.json');
    const data = readJsonFile(jsonFilePath);

    console.log(`读取到 ${data.length} 条新增数据`);

    // 导入数据
    const result = await importData(data);

    return {
      success: result.success,
      data: result,
      message: result.message
    };
  } catch (error) {
    console.error('导入过程中发生错误:', error);
    return {
      success: false,
      message: `导入失败: ${error.message}`,
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
    // 读取新增的数据文件
    const jsonFilePath = path.join(__dirname, 'new_cloud_data.json');
    const data = readJsonFile(jsonFilePath);

    console.log(`读取到 ${data.length} 条新增数据`);

    // 导入数据（本地测试模式）
    const result = await importData(data);

    console.log('\n测试结果:');
    console.log(`成功: ${result.success}`);
    console.log(`消息: ${result.message}`);
    console.log(`导入: ${result.imported} 条`);
    console.log(`失败: ${result.failed} 条`);
    
    if (result.testMode) {
      console.log('\n测试数据示例:');
      result.data.slice(0, 3).forEach(item => {
        console.log(`  id: ${item.id}, char: ${item.char}, pronunciation: ${item.correctPronunciation}`);
      });
    }
    
  } catch (error) {
    console.error('测试失败:', error);
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  // 仅运行测试函数，不加载云函数模块
  testImport();
}
