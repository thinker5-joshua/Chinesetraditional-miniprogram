// 重新生成诗词ID，确保连续无重复
const fs = require('fs');
const poemsData = require('./poems_data.js');

// 重新生成ID，从1开始连续编号
const updatedPoems = poemsData.poems.map((poem, index) => ({
  ...poem,
  id: index + 1
}));

// 保存更新后的数据
const outputContent = `module.exports = {
  "poems": ${JSON.stringify(updatedPoems, null, 2)}
};
`;

fs.writeFileSync('./poems_data.js', outputContent, 'utf8');

console.log(`诗词ID重新生成完成！`);
console.log(`总诗词数: ${updatedPoems.length}`);
console.log(`诗词ID范围: 1 - ${updatedPoems.length}`);
