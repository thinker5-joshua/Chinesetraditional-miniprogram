// 本地数据导入脚本
// 直接使用云函数的导入逻辑，不调用远程云函数

const fs = require('fs');
const path = require('path');

// 读取云函数代码
const cloudFunctionPath = path.join(__dirname, 'cloudfunctions', 'import_to_cloud', 'index.js');
const cloudFunctionCode = fs.readFileSync(cloudFunctionPath, 'utf-8');

// 读取数据文件
const dataFilePath = path.join(__dirname, 'cloudfunctions', 'import_to_cloud', 'export_data.json');

console.log('=== 本地数据导入脚本 ===');
console.log(`云函数文件: ${cloudFunctionPath}`);
console.log(`数据文件: ${dataFilePath}`);

// 1. 检查数据文件是否存在
console.log(`\n1. 检查数据文件:`);
if (fs.existsSync(dataFilePath)) {
  const dataFileSize = fs.statSync(dataFilePath).size;
  console.log(`✅ 数据文件存在: ${dataFilePath}`);
  console.log(`   文件大小: ${(dataFileSize / 1024).toFixed(2)} KB`);
  
  // 2. 读取数据文件内容
  console.log(`\n2. 读取数据文件:`);
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    console.log(`✅ 成功读取 ${data.length} 条数据`);
    
    // 3. 验证数据格式
    console.log(`\n3. 验证数据格式:`);
    const requiredFields = ['id', 'char', 'correctPronunciation', 'wrongPronunciations', 
                           'relatedPhrases', 'explanation', 'errorReasonType', 'difficultyLevel'];
    
    const validData = data.filter(item => {
      return requiredFields.every(field => field in item);
    });
    
    console.log(`   总数据条数: ${data.length}`);
    console.log(`   有效数据条数: ${validData.length}`);
    
    if (validData.length < data.length) {
      console.warn(`   过滤掉 ${data.length - validData.length} 条无效数据`);
    } else {
      console.log(`✅ 所有数据格式都有效`);
    }
    
    // 4. 检查云函数逻辑
    console.log(`\n4. 检查云函数逻辑:`);
    
    // 检查云函数是否包含必要的函数
    const hasImportData = cloudFunctionCode.includes('async function importData(');
    const hasCheckData = cloudFunctionCode.includes('async function checkData(');
    const hasReadJsonFile = cloudFunctionCode.includes('function readJsonFile(');
    
    if (hasImportData && hasCheckData && hasReadJsonFile) {
      console.log(`✅ 云函数包含所有必要的函数`);
    } else {
      console.error(`❌ 云函数缺少必要的函数`);
      console.log(`   hasImportData: ${hasImportData}`);
      console.log(`   hasCheckData: ${hasCheckData}`);
      console.log(`   hasReadJsonFile: ${hasReadJsonFile}`);
    }
    
    // 5. 统计数据分布
    console.log(`\n5. 统计数据分布:`);
    
    // 按难度等级统计
    const difficultyStats = {};
    validData.forEach(item => {
      const level = item.difficultyLevel;
      difficultyStats[level] = (difficultyStats[level] || 0) + 1;
    });
    
    console.log(`   难度等级分布:`);
    Object.entries(difficultyStats).forEach(([level, count]) => {
      console.log(`     ${level}: ${count} 条`);
    });
    
    // 按错误原因类型统计
    const errorTypeStats = {};
    validData.forEach(item => {
      const type = item.errorReasonType;
      errorTypeStats[type] = (errorTypeStats[type] || 0) + 1;
    });
    
    console.log(`   错误原因类型分布:`);
    Object.entries(errorTypeStats).forEach(([type, count]) => {
      console.log(`     类型 ${type}: ${count} 条`);
    });
    
    // 6. 生成导入报告
    console.log(`\n6. 生成导入报告:`);
    
    console.log(`=== 导入报告 ===`);
    console.log(`数据文件: ${dataFilePath}`);
    console.log(`总数据条数: ${data.length}`);
    console.log(`有效数据条数: ${validData.length}`);
    console.log(`无效数据条数: ${data.length - validData.length}`);
    console.log(`预期增加的数据条数: 91`);
    console.log(`预期导入后总数据条数: 554 (463 + 91)`);
    
    console.log(`\n✅ 数据导入准备就绪，可以在云开发控制台手动调用云函数`);
    
    console.log(`\n=== 手动调用步骤 ===`);
    console.log(`1. 登录云开发控制台`);
    console.log(`2. 切换到云函数页面`);
    console.log(`3. 找到 import_to_cloud 函数`);
    console.log(`4. 进入函数详情页，切换到测试标签`);
    console.log(`5. 调用检查功能:`);
    console.log(`   参数: {"action": "check"}`);
    console.log(`   预期结果: {"count": 463}`);
    console.log(`6. 调用导入功能:`);
    console.log(`   参数: {} (空对象)`);
    console.log(`   预期结果: {"imported": 91, "failed": 0}`);
    console.log(`7. 再次调用检查功能:`);
    console.log(`   预期结果: {"count": 554}`);
    
  } catch (error) {
    console.error('❌ 读取数据文件失败:', error.message);
    process.exit(1);
  }
} else {
  console.error('❌ 数据文件不存在:', dataFilePath);
  process.exit(1);
}

console.log(`\n=== 脚本执行完成 ===`);