// 云函数调用脚本
// 用于直接调用云函数完成数据导入和检查

const cloud = require('wx-server-sdk');
const fs = require('fs');
const path = require('path');

// 配置云开发环境
const envId = 'chinesetraditional-2gz7l53c5be110a3'; // 从project.config.json或云开发控制台获取

// 初始化云开发环境
function initCloud() {
  console.log('初始化云开发环境...');
  try {
    cloud.init({
      env: envId,
      traceUser: true
    });
    console.log('✅ 云开发环境初始化成功');
    return cloud;
  } catch (error) {
    console.error('❌ 云开发环境初始化失败:', error.message);
    process.exit(1);
  }
}

// 调用云函数
async function callCloudFunction(functionName, data = {}) {
  console.log(`\n调用云函数: ${functionName}`);
  console.log(`参数: ${JSON.stringify(data)}`);
  
  try {
    const result = await cloud.callFunction({
      name: functionName,
      data: data
    });
    console.log('✅ 云函数调用成功');
    return result.result;
  } catch (error) {
    console.error('❌ 云函数调用失败:', error.message);
    throw error;
  }
}

// 执行数据导入流程
async function executeImportFlow() {
  try {
    // 1. 初始化云开发环境
    const cloud = initCloud();
    
    // 2. 调用检查功能，获取当前数据条数
    console.log('\n=== 步骤1: 检查当前数据条数 ===');
    const checkResultBefore = await callCloudFunction('import_to_cloud', { action: 'check' });
    console.log(`当前数据条数: ${checkResultBefore.count}`);
    
    // 3. 调用导入功能，执行数据导入
    console.log('\n=== 步骤2: 执行数据导入 ===');
    const importResult = await callCloudFunction('import_to_cloud');
    
    if (importResult.success) {
      console.log('✅ 数据导入成功');
      console.log(`导入数据条数: ${importResult.imported}`);
      console.log(`失败数据条数: ${importResult.failed}`);
      console.log(`总数据条数: ${importResult.total}`);
    } else {
      console.error('❌ 数据导入失败:', importResult.message);
      if (importResult.errors && importResult.errors.length > 0) {
        console.error('失败详情:', importResult.errors);
      }
      process.exit(1);
    }
    
    // 4. 再次调用检查功能，验证导入结果
    console.log('\n=== 步骤3: 验证导入结果 ===');
    const checkResultAfter = await callCloudFunction('import_to_cloud', { action: 'check' });
    console.log(`导入后数据条数: ${checkResultAfter.count}`);
    
    // 5. 比较导入前后的数据条数
    const dataIncrease = checkResultAfter.count - checkResultBefore.count;
    console.log(`\n=== 导入结果总结 ===`);
    console.log(`导入前数据条数: ${checkResultBefore.count}`);
    console.log(`导入后数据条数: ${checkResultAfter.count}`);
    console.log(`数据增加条数: ${dataIncrease}`);
    
    // 6. 验证是否达到预期结果
    const expectedIncrease = 91;
    if (dataIncrease === expectedIncrease) {
      console.log('✅ 数据导入符合预期，成功导入91条数据');
    } else {
      console.warn(`⚠️  数据导入不符合预期，预期增加91条，实际增加${dataIncrease}条`);
    }
    
    // 7. 输出最终结果
    console.log('\n🎉 数据导入流程执行完成');
    
  } catch (error) {
    console.error('\n❌ 数据导入流程执行失败:', error.message);
    process.exit(1);
  }
}

// 执行导入流程
executeImportFlow();