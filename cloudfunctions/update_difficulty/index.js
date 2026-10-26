// 难度级别更新云函数
// 用于将调整后的难度级别更新到云数据库

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
 * 检查数据库字段名
 * @returns {Object} 字段名检查结果
 */
async function checkFieldNames() {
  const { db } = initCloud();
  
  try {
    // 查询一条记录，查看实际的字段名
    const result = await db.collection('daily_characters').limit(1).get();
    
    if (result.data && result.data.length > 0) {
      const record = result.data[0];
      const fieldNames = Object.keys(record);
      
      console.log('数据库实际字段名:', fieldNames);
      
      // 检查是否存在难度相关字段
      const difficultyFields = fieldNames.filter(field => 
        field.includes('difficulty') || field.includes('level')
      );
      
      return {
        success: true,
        fieldNames: fieldNames,
        difficultyFields: difficultyFields,
        sampleRecord: record
      };
    } else {
      return {
        success: false,
        message: '集合中没有数据'
      };
    }
  } catch (error) {
    console.error('字段名检查失败:', error);
    return {
      success: false,
      message: '字段名检查失败',
      error: error.message
    };
  }
}

/**
 * 更新难度级别
 * @param {Array} updateData - 要更新的数据数组
 * @param {number} batchSize - 批次大小
 * @returns {Object} 更新结果
 */
async function updateDifficultyLevels(updateData, batchSize = 10) {
  if (!Array.isArray(updateData) || updateData.length === 0) {
    return {
      success: false,
      message: '更新数据为空或格式错误',
      updated: 0,
      failed: 0,
      errors: []
    };
  }

  // 初始化云开发环境
  const { db } = initCloud();

  // 先检查字段名
  const fieldCheckResult = await checkFieldNames();
  console.log('字段名检查结果:', fieldCheckResult);

  let updated = 0;
  let failed = 0;
  const errors = [];
  const total = updateData.length;

  console.log(`开始更新难度级别，共 ${total} 条记录`);
  console.log(`批次大小: ${batchSize}`);

  // 分批更新
  for (let i = 0; i < updateData.length; i += batchSize) {
    const batch = updateData.slice(i, i + batchSize);
    const batchStart = i + 1;
    const batchEnd = Math.min(i + batchSize, total);

    console.log(`处理批次: ${batchStart}-${batchEnd}`);

    try {
      // 并行处理当前批次，但限制并发数为5
      const concurrency = 5;
      const chunkedPromises = [];
      
      // 将当前批次再分割为更小的块，控制并发数
      for (let j = 0; j < batch.length; j += concurrency) {
        const chunk = batch.slice(j, j + concurrency);
        const chunkPromises = chunk.map(async (item) => {
          try {
            // 先查询记录是否存在
            const queryResult = await db.collection('daily_characters')
              .where({
                id: item.charId
              })
              .get();
            
            if (queryResult.data.length === 0) {
              console.warn(`⚠ id ${item.charId} 记录不存在`);
              return { 
                success: false, 
                charId: item.charId, 
                error: '记录不存在' 
              };
            }
            
            // 记录原始数据用于调试
            const originalRecord = queryResult.data[0];
            console.log(`📋 id ${item.charId} 原始数据:`, {
              id: originalRecord.id,
              difficultyLevel: originalRecord.difficultyLevel || originalRecord.level || '未设置',
              fields: Object.keys(originalRecord)
            });
            
            // 准备更新数据，尝试使用不同的字段名
            const updateData = {
              updatedAt: item.updatedAt
            };
            
            // 检查数据库中实际存在的字段名，动态选择正确的字段
            const recordFields = Object.keys(originalRecord);
            if (recordFields.includes('difficultyLevel')) {
              updateData.difficultyLevel = item.difficultyLevel;
              console.log(`🔍 使用字段名: difficultyLevel`);
            } else if (recordFields.includes('level')) {
              updateData.level = item.difficultyLevel;
              console.log(`🔍 使用字段名: level`);
            } else {
              // 如果都不存在，尝试同时设置两个字段
              updateData.difficultyLevel = item.difficultyLevel;
              updateData.level = item.difficultyLevel;
              console.log(`🔍 同时使用字段名: difficultyLevel 和 level`);
            }
            
            // 更新难度级别
            const updateResult = await db.collection('daily_characters')
              .where({
                id: item.charId
              })
              .update({
                data: updateData
              });
            
            console.log(`📝 id ${item.charId} 更新结果:`, updateResult);
            
            // 验证更新结果
            const verifyResult = await db.collection('daily_characters')
              .where({
                id: item.charId
              })
              .get();
            
            if (verifyResult.data.length > 0) {
              const updatedRecord = verifyResult.data[0];
              const finalDifficulty = updatedRecord.difficultyLevel || updatedRecord.level;
              console.log(`✅ id ${item.charId} 更新后难度: ${finalDifficulty}`);
              
              // 检查是否更新成功
              if (finalDifficulty === item.difficultyLevel) {
                return { success: true, charId: item.charId };
              } else {
                console.error(`❌ id ${item.charId} 更新未生效，期望: ${item.difficultyLevel}，实际: ${finalDifficulty}`);
                return { 
                  success: false, 
                  charId: item.charId, 
                  error: `更新未生效，期望: ${item.difficultyLevel}，实际: ${finalDifficulty}` 
                };
              }
            } else {
              return { 
                success: false, 
                charId: item.charId, 
                error: '更新后查询不到记录' 
              };
            }
          } catch (error) {
            console.error(`💥 id ${item.charId} 更新过程出错:`, error);
            return { success: false, charId: item.charId, error: error.message };
          }
        });
        
        // 等待当前块完成后再处理下一块，避免并发过高
        const chunkResults = await Promise.all(chunkPromises);
        chunkedPromises.push(...chunkResults);
      }

      // 统计结果
      chunkedPromises.forEach(result => {
        if (result.success) {
          updated++;
          console.log(`✓ charId ${result.charId} 更新成功`);
        } else {
          failed++;
          errors.push({
            charId: result.charId,
            error: result.error
          });
          console.error(`✗ charId ${result.charId} 更新失败: ${result.error}`);
        }
      });

    } catch (error) {
      console.error(`批次 ${batchStart}-${batchEnd} 处理失败:`, error);
      failed += batch.length;
      batch.forEach(item => {
        errors.push({
          charId: item.charId,
          error: error.message
        });
      });
    }
  }

  console.log(`\n更新完成，共 ${total} 条记录`);
  console.log(`成功: ${updated}`);
  console.log(`失败: ${failed}`);

  return {
    success: failed === 0,
    message: `更新完成，成功 ${updated} 条，失败 ${failed} 条`,
    updated,
    failed,
    errors,
    total,
    fieldCheck: fieldCheckResult
  };
}

/**
 * 云函数入口
 * @param {Object} event - 事件对象
 * @param {Object} context - 上下文对象
 * @returns {Object} 执行结果
 */
exports.main = async (event, context) => {
  console.log('云函数调用事件:', event);

  try {
    // 获取更新数据
    let updateData;
    if (event.updateData && Array.isArray(event.updateData)) {
      // 从事件参数中获取更新数据
      updateData = event.updateData;
    } else {
      // 从文件中读取更新数据
      const updateDataPath = path.join(__dirname, 'difficulty_update_data.json');
      if (!fs.existsSync(updateDataPath)) {
        return {
          success: false,
          message: '更新数据文件不存在',
          error: 'difficulty_update_data.json not found'
        };
      }
      updateData = JSON.parse(fs.readFileSync(updateDataPath, 'utf8'));
    }

    // 执行更新
    const result = await updateDifficultyLevels(updateData, event.batchSize || 20);
    return result;
  } catch (error) {
    console.error('云函数执行失败:', error);
    return {
      success: false,
      message: '云函数执行失败',
      error: error.message
    };
  }
};
