// 补充诗词数据脚本
// 为普陀山补充诗词，使其达到3首

const fs = require('fs');
const path = require('path');

// 读取清理后的诗词数据
const poemsData = require('./poems_data_cleaned.js');

// 为普陀山补充的诗词
const supplementPoems = [
  {
    "id": 289, // 新的ID
    "cave_id": 19, // 普陀山的cave_id
    "title": "普陀山觀音巖祈雨一首",
    "author": "王阮",
    "content": "南風不爲雨，躬即寶陀求。地勢到此盡，天河相接流。鼇舒千丈背，蜃吐數層樓。念彼觀音力，楊枝洒有秋。",
    "dynasty": "宋",
    "location": "普陀山",
    "reason": "宋代诗人王阮所作，直接提及普陀山"
  },
  {
    "id": 290, // 新的ID
    "cave_id": 19, // 普陀山的cave_id
    "title": "寶陀清賞夙慕展遊願不從心因成小詠",
    "author": "利登",
    "content": "寶陀十里路，此日想同遊。萬古不收雨，四時長是秋。樹寒煙半擁，山濕霧長流。獨我思歸苦，無因到上頭。",
    "dynasty": "宋",
    "location": "普陀山",
    "reason": "宋代诗人利登所作，直接提及寶陀（普陀山）"
  }
];

// 添加补充的诗词
const finalPoems = [...poemsData.poems, ...supplementPoems];

// 统计最终的每地诗词数量
const finalLocationCount = {};
finalPoems.forEach(poem => {
  finalLocationCount[poem.location] = (finalLocationCount[poem.location] || 0) + 1;
});

// 找出最终诗词数量少于3首的地点
const finalLocationsWithFewPoems = Object.entries(finalLocationCount)
  .filter(([location, count]) => count < 3)
  .map(([location, count]) => ({ location, count }));

// 保存最终的诗词数据
const finalData = {
  poems: finalPoems
};

fs.writeFileSync(
  path.join(__dirname, 'poems_data_final.js'),
  'module.exports = ' + JSON.stringify(finalData, null, 2),
  'utf8'
);

// 保存最终的统计报告
const finalReport = {
  totalPoems: finalPoems.length,
  supplementPoems: supplementPoems.length,
  locationCount: finalLocationCount,
  locationsWithFewPoems: finalLocationsWithFewPoems
};

fs.writeFileSync(
  path.join(__dirname, 'poems_final_report.json'),
  JSON.stringify(finalReport, null, 2),
  'utf8'
);

console.log('诗词数据补充完成，输出文件：poems_data_final.js');
console.log(`共补充 ${supplementPoems.length} 首诗词`);
console.log(`最终诗词总数：${finalPoems.length} 首`);
console.log(`最终诗词数量少于3首的地点：${finalLocationsWithFewPoems.length} 个`);

if (finalLocationsWithFewPoems.length > 0) {
  console.log('仍需补充诗词的地点：');
  finalLocationsWithFewPoems.forEach(location => {
    console.log(`- ${location.location}: ${location.count} 首`);
  });
} else {
  console.log('所有地点的诗词数量均已达到3首或以上');
}
