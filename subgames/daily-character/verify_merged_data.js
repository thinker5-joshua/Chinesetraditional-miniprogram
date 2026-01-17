const fs = require('fs');
const path = require('path');

// 1. 读取合并后的数据
const cloudFilePath = path.join(__dirname, 'daily_characters_export.json');
const mergedData = fs.readFileSync(cloudFilePath, 'utf-8');
const mergedCharacters = JSON.parse(mergedData);

console.log(`合并后总数据量: ${mergedCharacters.length}`);
console.log(`预期数据量: 462 + 91 = 553`);

// 2. 检查数据量是否正确
if (mergedCharacters.length === 553) {
  console.log('✓ 数据量正确');
} else {
  console.log(`✗ 数据量错误，预期553，实际${mergedCharacters.length}`);
}

// 3. 检查charId是否正确递增
const charIds = mergedCharacters.map(char => char.charId).sort((a, b) => a - b);
let hasCorrectCharIds = true;
let expectedCharId = 1;

for (const charId of charIds) {
  if (charId !== expectedCharId) {
    console.log(`✗ charId不连续，预期${expectedCharId}，实际${charId}`);
    hasCorrectCharIds = false;
    break;
  }
  expectedCharId++;
}

if (hasCorrectCharIds) {
  console.log('✓ charId连续递增正确');
}

// 4. 检查是否有重复数据
const seen = new Set();
const duplicates = [];

for (const char of mergedCharacters) {
  const key = `${char.char}-${char.correctPronunciation}`;
  if (seen.has(key)) {
    duplicates.push(char);
  } else {
    seen.add(key);
  }
}

if (duplicates.length > 0) {
  console.log(`✗ 发现重复数据 (${duplicates.length} 条):`);
  duplicates.forEach(char => {
    console.log(`  - ${char.char}: ${char.correctPronunciation} (charId: ${char.charId})`);
  });
} else {
  console.log('✓ 没有重复数据');
}

// 5. 检查新数据的时间戳
const newDataStartId = 464;
const newData = mergedCharacters.filter(char => char.charId >= newDataStartId);
console.log(`\n新添加数据量: ${newData.length}`);

let hasValidTimestamps = true;
for (const char of newData) {
  if (!char.createdAt || !char.updatedAt) {
    console.log(`✗ charId ${char.charId} 缺少时间戳`);
    hasValidTimestamps = false;
  } else if (char.createdAt !== char.updatedAt) {
    console.log(`✗ charId ${char.charId} createdAt和updatedAt不一致`);
    hasValidTimestamps = false;
  }
}

if (hasValidTimestamps) {
  console.log('✓ 新数据时间戳正确');
}

// 6. 检查数据结构
const requiredFields = ['charId', 'char', 'correctPronunciation', 'wrongPronunciations', 'relatedPhrases', 'explanation', 'errorReasonType', 'difficultyLevel', 'createdAt', 'updatedAt'];
let structureErrors = 0;

mergedCharacters.forEach((char, index) => {
  for (const field of requiredFields) {
    if (char[field] === undefined || char[field] === null) {
      console.log(`✗ 第 ${index + 1} 条数据缺少 ${field} 字段 (charId: ${char.charId})`);
      structureErrors++;
    }
  }
  
  // 检查char字段是否为单个字符
  if (char.char.length !== 1) {
    console.log(`✗ charId ${char.charId} 的 char 字段不是单个字符: ${char.char}`);
    structureErrors++;
  }
});

if (structureErrors === 0) {
  console.log('✓ 所有数据结构正确');
} else {
  console.log(`✗ 发现 ${structureErrors} 个数据结构错误`);
}

// 7. 检查新数据的charId范围
const minNewCharId = Math.min(...newData.map(char => char.charId));
const maxNewCharId = Math.max(...newData.map(char => char.charId));
console.log(`\n新数据charId范围: ${minNewCharId} - ${maxNewCharId}`);
console.log(`预期范围: 464 - 554`);

if (minNewCharId === 464 && maxNewCharId === 554) {
  console.log('✓ 新数据charId范围正确');
} else {
  console.log(`✗ 新数据charId范围错误`);
}

// 8. 总结
console.log('\n=== 验证总结 ===');
if (
  mergedCharacters.length === 553 &&
  hasCorrectCharIds &&
  duplicates.length === 0 &&
  hasValidTimestamps &&
  structureErrors === 0 &&
  minNewCharId === 464 &&
  maxNewCharId === 554
) {
  console.log('🎉 所有验证通过！数据合并成功！');
} else {
  console.log('❌ 部分验证未通过，请检查上述错误');
}
