// 检查每个地点的诗词数量
const poemsData = require('./poems_data.js');
const cavesData = require('./caves_data.js');

// 创建cave_id到name的映射
const caveMap = {};
cavesData.caves.forEach(cave => {
  caveMap[cave.id] = cave.name;
});

// 统计每个地点的诗词数量
const caveCounts = {};
poemsData.poems.forEach(poem => {
  caveCounts[poem.cave_id] = (caveCounts[poem.cave_id] || 0) + 1;
});

// 输出每个地点的诗词数量
console.log('每个地点的诗词数量:');
Object.entries(caveMap).forEach(([id, name]) => {
  const count = caveCounts[id] || 0;
  console.log(`- ${name} (${id}): ${count} 首`);
});

// 输出诗词不足3首的地点
console.log('\n诗词不足3首的地点:');
let hasInsufficient = false;
Object.entries(caveMap).forEach(([id, name]) => {
  const count = caveCounts[id] || 0;
  if (count < 3) {
    console.log(`- ${name} (${id}): ${count} 首`);
    hasInsufficient = true;
  }
});

if (!hasInsufficient) {
  console.log('所有地点的诗词数量都满足3首及以上！');
}
