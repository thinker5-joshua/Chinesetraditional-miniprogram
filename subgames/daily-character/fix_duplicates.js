const fs = require('fs');
const path = require('path');

// 读取本地数据
const localCharacters = require('./data-diff.js');

console.log(`原始数据量: ${localCharacters.length}`);

// 去除本地重复数据（基于char和correctPronunciation）
const uniqueLocalCharacters = [];
const seen = new Set();

for (const char of localCharacters) {
  const key = `${char.char}-${char.correctPronunciation}`;
  if (!seen.has(key)) {
    seen.add(key);
    uniqueLocalCharacters.push(char);
  }
}

console.log(`去除本地重复后的数据量: ${uniqueLocalCharacters.length}`);

// 读取云数据库数据
const cloudFilePath = path.join(__dirname, 'daily_characters_export.json');
let cloudCharacters = [];
if (fs.existsSync(cloudFilePath)) {
  const cloudData = fs.readFileSync(cloudFilePath, 'utf-8');
  cloudCharacters = JSON.parse(cloudData);
  console.log(`云数据库数据量: ${cloudCharacters.length}`);
  
  // 去除与云数据库重复的数据
  const cloudSeen = new Set();
  for (const char of cloudCharacters) {
    const key = `${char.char}-${char.correctPronunciation}`;
    cloudSeen.add(key);
  }
  
  const finalCharacters = uniqueLocalCharacters.filter(char => {
    const key = `${char.char}-${char.correctPronunciation}`;
    return !cloudSeen.has(key);
  });
  
  console.log(`去除云数据库重复后的数据量: ${finalCharacters.length}`);
  
  // 写入结果
  const resultContent = `// 每日一字汉字数据 - 难读字版
// 数据结构：
// id: 字ID
// char: 汉字
// correctPronunciation: 正确读音
// wrongPronunciations: 错误读音列表
// relatedPhrases: 关联词组（合并了原wrongPhrases和relatedPhrases）
// explanation: 字典解释
// errorReasonType: 常见错误原因分类
// difficultyLevel: 测试难度等级（初级、中级、高级、挑战级）

const characters = ${JSON.stringify(finalCharacters, null, 4)};

module.exports = characters;`;
  
  fs.writeFileSync('./data-diff.js', resultContent, 'utf-8');
  console.log('数据修复完成，结果已写入 data-diff.js');
} else {
  console.error('未找到云数据库数据文件 daily_characters_export.json');
  
  // 只写入去除本地重复后的结果
  const resultContent = `// 每日一字汉字数据 - 难读字版
// 数据结构：
// id: 字ID
// char: 汉字
// correctPronunciation: 正确读音
// wrongPronunciations: 错误读音列表
// relatedPhrases: 关联词组（合并了原wrongPhrases和relatedPhrases）
// explanation: 字典解释
// errorReasonType: 常见错误原因分类
// difficultyLevel: 测试难度等级（初级、中级、高级、挑战级）

const characters = ${JSON.stringify(uniqueLocalCharacters, null, 4)};

module.exports = characters;`;
  
  fs.writeFileSync('./data-diff.js', resultContent, 'utf-8');
  console.log('只去除了本地重复数据，结果已写入 data-diff.js');
}