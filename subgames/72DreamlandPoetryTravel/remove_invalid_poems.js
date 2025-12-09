// 删除旧地点诗词脚本
// 删除乐山大佛、都江堰和泉州开元寺的所有诗词

const fs = require('fs');
const path = require('path');

// 读取现有诗词数据
const poemsData = require('./poems_data.js');

// 需要删除诗词的地点ID列表
const oldCaveIds = [40, 69, 72];

// 删除旧地点诗词
const validPoems = poemsData.poems.filter(poem => !oldCaveIds.includes(poem.cave_id));

// 保存更新后的诗词数据
const outputPath = path.join(__dirname, 'poems_data.js');
const content = `module.exports = {
  "poems": ${JSON.stringify(validPoems, null, 2)}
};`;

fs.writeFileSync(outputPath, content, 'utf8');

console.log(`已删除 ${poemsData.poems.length - validPoems.length} 首旧地点诗词`);
console.log(`删除的地点ID: ${oldCaveIds.join(', ')}`);
console.log(`更新后的诗词总数: ${validPoems.length}`);
