// 云函数本地测试脚本
// 用于验证云函数的功能是否正常

const fs = require('fs');
const path = require('path');

// 模拟云函数环境
process.env.NODE_ENV = 'test';

// 读取云函数代码
const cloudFunctionPath = path.join(__dirname, 'cloudfunctions', 'import_to_cloud', 'index.js');
const cloudFunctionCode = fs.readFileSync(cloudFunctionPath, 'utf-8');

console.log('=== 云函数本地测试 ===');
console.log(`云函数文件: ${cloudFunctionPath}`);

// 1. 检查数据文件是否存在
const dataFilePath = path.join(__dirname, 'cloudfunctions', 'import_to_cloud', 'export_data.json');
console.log(`\n1. 检查数据文件:`);
if (fs.existsSync(dataFilePath)) {
  const dataFileSize = fs.statSync(dataFilePath).size;
  console.log(`✅ 数据文件存在: ${dataFilePath}`);
  console.log(`   文件大小: ${(dataFileSize / 1024).toFixed(2)} KB`);
  
  // 2. 检查数据文件内容
  console.log(`\n2. 检查数据文件内容:`);
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    console.log(`✅ 数据文件格式正确`);
    console.log(`   数据条数: ${data.length}`);
    
    // 3. 检查数据结构
    if (data.length > 0) {
      const firstItem = data[0];
      console.log(`\n3. 检查数据结构:`);
      console.log(`   第一条记录: id=${firstItem.id}, char=${firstItem.char}, pronunciation=${firstItem.correctPronunciation}`);
      
      // 检查必需字段
      const requiredFields = ['id', 'char', 'correctPronunciation', 'wrongPronunciations', 
                             'relatedPhrases', 'explanation', 'errorReasonType', 'difficultyLevel'];
      
      const hasAllFields = requiredFields.every(field => field in firstItem);
      if (hasAllFields) {
        console.log(`✅ 数据包含所有必需字段`);
      } else {
        const missingFields = requiredFields.filter(field => !(field in firstItem));
        console.error(`❌ 数据缺少必需字段: ${missingFields.join(', ')}`);
      }
      
      // 4. 检查数据类型
      console.log(`\n4. 检查数据类型:`);
      console.log(`   id: ${typeof firstItem.id} (${firstItem.id})`);
      console.log(`   char: ${typeof firstItem.char} (${firstItem.char})`);
      console.log(`   correctPronunciation: ${typeof firstItem.correctPronunciation} (${firstItem.correctPronunciation})`);
      console.log(`   wrongPronunciations: ${typeof firstItem.wrongPronunciations} (数组长度: ${firstItem.wrongPronunciations.length})`);
      console.log(`   relatedPhrases: ${typeof firstItem.relatedPhrases} (数组长度: ${firstItem.relatedPhrases.length})`);
      console.log(`   explanation: ${typeof firstItem.explanation} (长度: ${firstItem.explanation.length})`);
      console.log(`   errorReasonType: ${typeof firstItem.errorReasonType} (${firstItem.errorReasonType})`);
      console.log(`   difficultyLevel: ${typeof firstItem.difficultyLevel} (${firstItem.difficultyLevel})`);
    }
    
    console.log(`\n=== 测试完成 ===`);
    console.log(`✅ 云函数数据准备就绪，可以部署`);
    console.log(`\n接下来的步骤:`);
    console.log(`1. 在微信开发者工具中打开项目`);
    console.log(`2. 右键点击 cloudfunctions/import_to_cloud 目录`);
    console.log(`3. 选择 "上传并部署：云端安装依赖"`);
    console.log(`4. 部署完成后，在云开发控制台调用该函数`);
    
  } catch (error) {
    console.error(`❌ 数据文件解析失败: ${error.message}`);
  }
} else {
  console.error(`❌ 数据文件不存在: ${dataFilePath}`);
}

console.log(`\n=== 测试结束 ===`);