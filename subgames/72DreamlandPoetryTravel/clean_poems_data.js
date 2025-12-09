// 清理诗词数据脚本
// 重新生成诗词ID，确保连续递增

const fs = require('fs');
const path = require('path');

// 读取现有诗词数据
const poemsData = require('./poems_data.js');

// 直接使用所有诗词，只重新生成ID
const updatedPoems = poemsData.poems.map((poem, index) => ({
  ...poem,
  id: index + 1
}));

// 保存更新后的诗词数据
const outputPath = path.join(__dirname, 'poems_data.js');
const content = `module.exports = {
  "poems": ${JSON.stringify(updatedPoems, null, 2)}
};`;

fs.writeFileSync(outputPath, content, 'utf8');

console.log('诗词数据清理完成！');
console.log('清理后诗词总数:', updatedPoems.length);
