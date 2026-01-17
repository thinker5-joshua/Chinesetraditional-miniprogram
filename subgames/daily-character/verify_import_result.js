// 验证导入结果脚本
// 用于检查云数据库中新增数据是否导入成功

const fs = require('fs');
const path = require('path');

/**
 * 验证本地数据文件
 * @returns {Object} 验证结果
 */
function verifyLocalData() {
  console.log('开始验证本地数据...');
  
  // 读取新增数据文件
  const newDataPath = path.join(__dirname, 'new_cloud_data.json');
  if (!fs.existsSync(newDataPath)) {
    console.error('新增数据文件不存在');
    return {
      success: false,
      message: '新增数据文件不存在',
      localDataCount: 0
    };
  }
  
  const newData = JSON.parse(fs.readFileSync(newDataPath, 'utf-8'));
  console.log(`本地新增数据量: ${newData.length}`);
  
  // 读取云数据库数据文件
  const cloudFilePath = path.join(__dirname, 'daily_characters_export.json');
  const cloudData = JSON.parse(fs.readFileSync(cloudFilePath, 'utf-8'));
  console.log(`云数据库文件总数据量: ${cloudData.length}`);
  
  // 检查新增数据是否在云数据库文件中
  const newCharIds = new Set(newData.map(item => item.charId));
  const cloudCharIds = new Set(cloudData.map(item => item.charId));
  
  const missingCharIds = [];
  for (const charId of newCharIds) {
    if (!cloudCharIds.has(charId)) {
      missingCharIds.push(charId);
    }
  }
  
  if (missingCharIds.length > 0) {
    console.warn(`云数据库文件中缺少 ${missingCharIds.length} 条新增数据`);
    console.warn(`缺少的charId: ${missingCharIds.join(', ')}`);
  } else {
    console.log('✓ 所有新增数据都已存在于云数据库文件中');
  }
  
  return {
    success: missingCharIds.length === 0,
    message: `本地数据验证完成，共${newData.length}条新增数据`,
    localDataCount: newData.length,
    cloudFileDataCount: cloudData.length,
    missingCharIds: missingCharIds
  };
}

/**
 * 生成验证报告
 * @param {Object} localVerifyResult - 本地验证结果
 * @returns {Object} 验证报告
 */
function generateReport(localVerifyResult) {
  console.log('\n=== 验证报告 ===');
  console.log(`验证时间: ${new Date().toLocaleString()}`);
  console.log(`本地新增数据量: ${localVerifyResult.localDataCount}`);
  console.log(`云数据库文件总数据量: ${localVerifyResult.cloudFileDataCount}`);
  console.log(`预期云数据库文件数据量: 462 + ${localVerifyResult.localDataCount} = ${462 + localVerifyResult.localDataCount}`);
  
  if (localVerifyResult.cloudFileDataCount === 462 + localVerifyResult.localDataCount) {
    console.log('✓ 云数据库文件数据量正确');
  } else {
    console.warn(`✗ 云数据库文件数据量错误，预期${462 + localVerifyResult.localDataCount}，实际${localVerifyResult.cloudFileDataCount}`);
  }
  
  if (localVerifyResult.missingCharIds.length === 0) {
    console.log('✓ 所有新增数据都已存在于云数据库文件中');
  } else {
    console.warn(`✗ 云数据库文件中缺少 ${localVerifyResult.missingCharIds.length} 条新增数据`);
  }
  
  console.log('\n=== 新增数据样本 ===');
  const newData = JSON.parse(fs.readFileSync(path.join(__dirname, 'new_cloud_data.json'), 'utf-8'));
  newData.slice(0, 5).forEach((item, index) => {
    console.log(`${index + 1}. charId: ${item.charId}, char: ${item.char}, pronunciation: ${item.correctPronunciation}`);
  });
  
  console.log('\n=== 结论 ===');
  if (localVerifyResult.success) {
    console.log('✓ 本地数据验证通过，新增数据已成功添加到云数据库文件中');
    console.log('  下一步：部署云函数并调用，将数据上传到实际的云数据库服务');
  } else {
    console.log('✗ 本地数据验证失败，请检查云数据库文件');
  }
  
  return {
    timestamp: new Date().toISOString(),
    localDataCount: localVerifyResult.localDataCount,
    cloudFileDataCount: localVerifyResult.cloudFileDataCount,
    expectedCloudDataCount: 462 + localVerifyResult.localDataCount,
    missingCharIds: localVerifyResult.missingCharIds,
    success: localVerifyResult.success,
    conclusion: localVerifyResult.success ? '本地数据验证通过' : '本地数据验证失败'
  };
}

/**
 * 主函数
 */
function main() {
  console.log('=== 验证数据导入结果 ===');
  
  // 验证本地数据
  const localVerifyResult = verifyLocalData();
  
  // 生成报告
  const report = generateReport(localVerifyResult);
  
  // 保存报告
  const reportPath = path.join(__dirname, 'import_verification_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n验证报告已保存到: ${reportPath}`);
  
  return report;
}

// 如果直接运行此文件，则执行验证
if (require.main === module) {
  main();
}

module.exports = {
  verifyLocalData,
  generateReport,
  main
};
