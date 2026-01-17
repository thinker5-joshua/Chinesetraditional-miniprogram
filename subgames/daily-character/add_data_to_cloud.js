const fs = require('fs');
const path = require('path');

// 获取当前时间戳
const now = new Date().toISOString();

// 1. 读取本地数据
const localCharacters = require('./data-diff.js');
console.log(`本地数据量: ${localCharacters.length}`);

// 2. 读取云数据库数据
const cloudFilePath = path.join(__dirname, 'daily_characters_export.json');
const cloudData = fs.readFileSync(cloudFilePath, 'utf-8');
const cloudCharacters = JSON.parse(cloudData);
console.log(`云数据库原数据量: ${cloudCharacters.length}`);

// 3. 创建备份文件
const backupFilePath = path.join(__dirname, 'daily_characters_export.json.backup');
fs.writeFileSync(backupFilePath, cloudData, 'utf-8');
console.log(`已创建备份文件: ${backupFilePath}`);

// 4. 找到最大的charId
let maxCharId = 0;
for (const char of cloudCharacters) {
  if (char.charId > maxCharId) {
    maxCharId = char.charId;
  }
}
console.log(`云数据库最大charId: ${maxCharId}`);

// 5. 转换本地数据
const newCloudCharacters = [];
let newCharId = maxCharId + 1;

for (const char of localCharacters) {
  // 创建新的数据对象，添加必要的字段
  const newChar = {
    charId: newCharId,
    char: char.char,
    correctPronunciation: char.correctPronunciation,
    wrongPronunciations: char.wrongPronunciations,
    relatedPhrases: char.relatedPhrases,
    explanation: char.explanation,
    errorReasonType: char.errorReasonType,
    difficultyLevel: char.difficultyLevel,
    createdAt: now,
    updatedAt: now
  };
  
  newCloudCharacters.push(newChar);
  newCharId++;
}

console.log(`转换后的数据量: ${newCloudCharacters.length}`);
console.log(`新数据charId范围: ${maxCharId + 1} - ${newCharId - 1}`);

// 6. 合并数据
const mergedCharacters = [...cloudCharacters, ...newCloudCharacters];
console.log(`合并后总数据量: ${mergedCharacters.length}`);

// 7. 写入新的云数据库文件
const mergedDataContent = JSON.stringify(mergedCharacters, null, 2);
fs.writeFileSync(cloudFilePath, mergedDataContent, 'utf-8');
console.log(`已更新云数据库文件: ${cloudFilePath}`);

console.log('\n数据添加完成!');
console.log(`- 原云数据库数据: ${cloudCharacters.length}条`);
console.log(`- 新增数据: ${newCloudCharacters.length}条`);
console.log(`- 合并后数据: ${mergedCharacters.length}条`);
console.log(`- 新数据charId从${maxCharId + 1}开始`);
