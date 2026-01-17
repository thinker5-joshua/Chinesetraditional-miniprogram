const fs = require('fs');
const path = require('path');

// 读取修复后的数据
const fixedCharacters = require('./data-diff.js');
console.log(`修复后的数据量: ${fixedCharacters.length}`);

// 检查本地重复
const seen = new Set();
const duplicates = [];

for (const char of fixedCharacters) {
  const key = `${char.char}-${char.correctPronunciation}`;
  if (seen.has(key)) {
    duplicates.push(char);
  } else {
    seen.add(key);
  }
}

if (duplicates.length > 0) {
  console.log(`发现本地重复数据 (${duplicates.length} 条):`);
  duplicates.forEach(char => {
    console.log(`  - ${char.char}: ${char.correctPronunciation}`);
  });
} else {
  console.log('✓ 没有本地重复数据');
}

// 检查与云数据库重复
const cloudFilePath = path.join(__dirname, 'daily_characters_export.json');
if (fs.existsSync(cloudFilePath)) {
  const cloudData = fs.readFileSync(cloudFilePath, 'utf-8');
  const cloudCharacters = JSON.parse(cloudData);
  
  const cloudSeen = new Set();
  for (const char of cloudCharacters) {
    const key = `${char.char}-${char.correctPronunciation}`;
    cloudSeen.add(key);
  }
  
  const cloudDuplicates = [];
  for (const char of fixedCharacters) {
    const key = `${char.char}-${char.correctPronunciation}`;
    if (cloudSeen.has(key)) {
      cloudDuplicates.push(char);
    }
  }
  
  if (cloudDuplicates.length > 0) {
    console.log(`发现与云数据库重复数据 (${cloudDuplicates.length} 条):`);
    cloudDuplicates.forEach(char => {
      console.log(`  - ${char.char}: ${char.correctPronunciation}`);
    });
  } else {
    console.log('✓ 没有与云数据库重复的数据');
  }
}

// 检查数据结构
console.log('\n数据结构验证:');
const requiredFields = ['id', 'char', 'correctPronunciation', 'wrongPronunciations', 'relatedPhrases', 'explanation', 'errorReasonType', 'difficultyLevel'];
let structureErrors = 0;

fixedCharacters.forEach((char, index) => {
  for (const field of requiredFields) {
    if (char[field] === undefined || char[field] === null) {
      console.log(`  - 第 ${index + 1} 条数据缺少 ${field} 字段`);
      structureErrors++;
    }
  }
  
  // 检查char字段是否为单个字符
  if (char.char.length !== 1) {
    console.log(`  - 第 ${index + 1} 条数据的 char 字段不是单个字符: ${char.char}`);
    structureErrors++;
  }
});

if (structureErrors === 0) {
  console.log('✓ 所有数据结构正确');
} else {
  console.log(`发现 ${structureErrors} 个数据结构错误`);
}

console.log('\n验证完成!');
