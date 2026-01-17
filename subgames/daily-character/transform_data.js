// 数据转换脚本
// 将 new_cloud_data.json 中的 charId 转换为 id 字段

const fs = require('fs');
const path = require('path');

// 读取原始数据文件
const inputFilePath = path.join(__dirname, 'new_cloud_data.json');
const outputFilePath = path.join(__dirname, 'export_data.json');

console.log('开始转换数据...');
console.log(`输入文件: ${inputFilePath}`);
console.log(`输出文件: ${outputFilePath}`);

try {
  // 读取数据
  const rawData = fs.readFileSync(inputFilePath, 'utf-8');
  const data = JSON.parse(rawData);
  
  console.log(`读取到 ${data.length} 条数据`);
  
  // 转换 charId 为 id
  const transformedData = data.map(item => ({
    id: item.charId,
    char: item.char,
    correctPronunciation: item.correctPronunciation,
    wrongPronunciations: item.wrongPronunciations,
    relatedPhrases: item.relatedPhrases,
    explanation: item.explanation,
    errorReasonType: item.errorReasonType,
    difficultyLevel: item.difficultyLevel
  }));
  
  console.log('数据转换完成');
  
  // 写入转换后的数据
  fs.writeFileSync(outputFilePath, JSON.stringify(transformedData, null, 2), 'utf-8');
  
  console.log('转换后的数据已写入文件');
  
  // 验证转换结果
  const verifyData = JSON.parse(fs.readFileSync(outputFilePath, 'utf-8'));
  console.log(`验证: 转换后的数据包含 ${verifyData.length} 条记录`);
  
  // 检查是否包含 id 字段
  if (verifyData.length > 0) {
    const firstItem = verifyData[0];
    console.log(`第一条记录: id=${firstItem.id}, char=${firstItem.char}, pronunciation=${firstItem.correctPronunciation}`);
    
    if ('id' in firstItem) {
      console.log('✅ 数据包含 id 字段');
    } else {
      console.error('❌ 数据不包含 id 字段');
      process.exit(1);
    }
    
    if (!('charId' in firstItem)) {
      console.log('✅ charId 字段已移除');
    } else {
      console.error('❌ charId 字段未移除');
      process.exit(1);
    }
  }
  
  console.log('\n数据转换成功！');
  console.log(`转换后的文件已生成: ${outputFilePath}`);
  
} catch (error) {
  console.error('数据转换失败:', error);
  process.exit(1);
}