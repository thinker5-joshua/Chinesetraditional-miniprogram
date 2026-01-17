const fs = require('fs');
const path = require('path');

// 读取云数据库数据
const cloudFilePath = path.join(__dirname, 'daily_characters_export.json');
const cloudData = fs.readFileSync(cloudFilePath, 'utf-8');
const cloudCharacters = JSON.parse(cloudData);

console.log(`总数据量: ${cloudCharacters.length}`);

// 提取新增数据（charId >= 464）
const newData = cloudCharacters.filter(char => char.charId >= 464);

console.log(`新增数据量: ${newData.length}`);

// 检查数据完整性
const requiredFields = ['charId', 'char', 'correctPronunciation', 'wrongPronunciations', 'relatedPhrases', 'explanation', 'errorReasonType', 'difficultyLevel'];
const validData = newData.filter(item => {
  return requiredFields.every(field => field in item);
});

if (validData.length < newData.length) {
  console.warn(`过滤掉 ${newData.length - validData.length} 条无效数据`);
}

// 保存到新文件
const newDataPath = path.join(__dirname, 'new_cloud_data.json');
fs.writeFileSync(newDataPath, JSON.stringify(validData, null, 2), 'utf-8');

console.log(`提取完成，共${validData.length}条有效新增数据`);
console.log(`保存到文件: ${newDataPath}`);

// 显示前5条数据示例
console.log('\n前5条新增数据:');
validData.slice(0, 5).forEach((item, index) => {
  console.log(`${index + 1}. charId: ${item.charId}, char: ${item.char}, pronunciation: ${item.correctPronunciation}`);
});
