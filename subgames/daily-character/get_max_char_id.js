const fs = require('fs');
const path = require('path');

// 读取云数据库数据
const cloudFilePath = path.join(__dirname, 'daily_characters_export.json');
let cloudCharacters = [];

if (fs.existsSync(cloudFilePath)) {
  const cloudData = fs.readFileSync(cloudFilePath, 'utf-8');
  cloudCharacters = JSON.parse(cloudData);
  
  // 找到最大的charId
  let maxCharId = 0;
  cloudCharacters.forEach(char => {
    if (char.charId > maxCharId) {
      maxCharId = char.charId;
    }
  });
  
  console.log(`云数据库中最大的charId: ${maxCharId}`);
  console.log(`云数据库数据量: ${cloudCharacters.length}`);
} else {
  console.error('未找到云数据库数据文件 daily_characters_export.json');
}