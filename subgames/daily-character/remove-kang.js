const fs = require('fs');
const path = require('path');

// 读取当前数据
const data = require('./data-optimized.js');

// 要删除的字的ID
const idToRemove = 24;

// 过滤掉要删除的字
const filteredData = data.characters.filter(char => char.id !== idToRemove);

// 重新生成连续的ID
const processedData = filteredData.map((char, index) => ({
  ...char,
  id: index + 1
}));

// 将处理后的数据写入文件
const outputData = `// 每日一字汉字数据 - 优化版
// 数据结构：
// id: 字ID
// char: 汉字
// correctPronunciation: 正确读音
// wrongPronunciations: 错误读音列表
// relatedPhrases: 关联词组（合并了原wrongPhrases和relatedPhrases）
// explanation: 字典解释
// errorReasonType: 常见错误原因分类
// difficultyLevel: 测试难度等级（初级、中级、高级、挑战级）

const characters = ${JSON.stringify(processedData, null, 2)};

module.exports = {
  characters
};`;

fs.writeFileSync(
  path.join(__dirname, 'data-optimized.js'),
  outputData,
  'utf8'
);

console.log('删除扛字完成！');
console.log(`原数据数量：${data.characters.length}`);
console.log(`处理后数据数量：${processedData.length}`);
console.log(`删除的字数量：${data.characters.length - processedData.length}`);
console.log('已删除的字ID：', idToRemove);
