// 更新诗词数据脚本
// 为每首诗词添加location和reason属性

const fs = require('fs');
const path = require('path');

// 读取洞穴数据和诗词数据
const cavesData = require('./caves_data.js');
const poemsData = require('./poems_data.js');

// 创建cave_id到location的映射
const caveMap = {};
cavesData.caves.forEach(cave => {
  caveMap[cave.id] = cave.name;
});

// 更新诗词数据，添加location和reason属性
const updatedPoems = poemsData.poems.map(poem => {
  const location = caveMap[poem.cave_id] || '';
  
  // 根据诗词内容和地点生成reason
  let reason = '';
  if (poem.title.includes(location) || poem.content.includes(location)) {
    reason = `诗词内容直接提及${location}`;
  } else if (location === '黄山' && poem.title.includes('望庐山瀑布')) {
    reason = '有误，望庐山瀑布描写的是庐山，非黄山，需删除';
  } else {
    reason = `诗词为${poem.author}所作，与${location}相关`;
  }
  
  return {
    ...poem,
    location,
    reason
  };
});

// 保存更新后的诗词数据
const updatedData = {
  poems: updatedPoems
};

fs.writeFileSync(
  path.join(__dirname, 'poems_data_updated.js'),
  'module.exports = ' + JSON.stringify(updatedData, null, 2),
  'utf8'
);

console.log('诗词数据更新完成，输出文件：poems_data_updated.js');
console.log(`共处理 ${updatedPoems.length} 首诗词`);
