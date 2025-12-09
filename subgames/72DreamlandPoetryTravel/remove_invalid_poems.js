// 删除无效诗词脚本
// 根据综合验证报告删除无效诗词

const fs = require('fs');
const path = require('path');

// 读取现有诗词数据
const poemsData = require('./poems_data.js');

// 无效诗词ID列表
const invalidPoemIds = [378, 429, 483, 490, 494, 495, 497];

// 删除无效诗词
const validPoems = poemsData.poems.filter(poem => !invalidPoemIds.includes(poem.id));

// 保存更新后的诗词数据
const outputPath = path.join(__dirname, 'poems_data.js');
const content = `module.exports = {
  "poems": ${JSON.stringify(validPoems, null, 2)}
};`;

fs.writeFileSync(outputPath, content, 'utf8');

console.log(`已删除 ${invalidPoemIds.length} 首无效诗词`);
console.log(`删除的诗词ID: ${invalidPoemIds.join(', ')}`);
console.log(`更新后的诗词总数: ${validPoems.length}`);
