const fs = require('fs');
const path = require('path');

// 检查当前云数据库文件
const cloudFilePath = path.join(__dirname, 'daily_characters_export.json');
if (fs.existsSync(cloudFilePath)) {
  const cloudData = fs.readFileSync(cloudFilePath, 'utf-8');
  const cloudCharacters = JSON.parse(cloudData);
  console.log(`当前云数据库数据量: ${cloudCharacters.length}`);
  
  // 检查备份文件
  const backupFilePath = path.join(__dirname, 'daily_characters_export.json.backup');
  if (fs.existsSync(backupFilePath)) {
    const backupData = fs.readFileSync(backupFilePath, 'utf-8');
    const backupCharacters = JSON.parse(backupData);
    console.log(`备份文件数据量: ${backupCharacters.length}`);
    console.log(`数据增量: ${cloudCharacters.length - backupCharacters.length}`);
  }
  
  // 检查新添加的数据
  const newData = cloudCharacters.filter(char => char.charId >= 464);
  console.log(`新添加的数据量 (charId >= 464): ${newData.length}`);
  
  // 显示前5条新数据
  if (newData.length > 0) {
    console.log('\n前5条新添加的数据:');
    newData.slice(0, 5).forEach(char => {
      console.log(`  charId: ${char.charId}, char: ${char.char}, pronunciation: ${char.correctPronunciation}`);
    });
  }
} else {
  console.error('未找到云数据库文件');
}
