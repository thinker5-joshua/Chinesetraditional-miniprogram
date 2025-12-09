// 清理诗词数据脚本
// 删除存疑的诗词，生成最终的诗词数据文件

const fs = require('fs');
const path = require('path');

// 读取更新后的诗词数据
const poemsData = require('./poems_data_updated.js');

// 读取验证报告
const reportData = require('./poems_validation_report.json');

// 获取存疑诗词的ID列表
const suspiciousIds = reportData.suspiciousPoemsList.map(poem => poem.id);

// 删除存疑的诗词
const cleanedPoems = poemsData.poems.filter(poem => !suspiciousIds.includes(poem.id));

// 统计清理后的每地诗词数量
const cleanedLocationCount = {};
cleanedPoems.forEach(poem => {
  cleanedLocationCount[poem.location] = (cleanedLocationCount[poem.location] || 0) + 1;
});

// 找出清理后诗词数量少于3首的地点
const cleanedLocationsWithFewPoems = Object.entries(cleanedLocationCount)
  .filter(([location, count]) => count < 3)
  .map(([location, count]) => ({ location, count }));

// 保存清理后的诗词数据
const cleanedData = {
  poems: cleanedPoems
};

fs.writeFileSync(
  path.join(__dirname, 'poems_data_cleaned.js'),
  'module.exports = ' + JSON.stringify(cleanedData, null, 2),
  'utf8'
);

// 保存清理后的统计报告
const cleanedReport = {
  totalPoems: cleanedPoems.length,
  deletedPoems: suspiciousIds.length,
  locationCount: cleanedLocationCount,
  locationsWithFewPoems: cleanedLocationsWithFewPoems
};

fs.writeFileSync(
  path.join(__dirname, 'poems_cleaned_report.json'),
  JSON.stringify(cleanedReport, null, 2),
  'utf8'
);

console.log('诗词数据清理完成，输出文件：poems_data_cleaned.js');
console.log(`共删除 ${suspiciousIds.length} 首存疑诗词`);
console.log(`清理后剩余 ${cleanedPoems.length} 首诗词`);
console.log(`清理后诗词数量少于3首的地点：${cleanedLocationsWithFewPoems.length} 个`);

if (cleanedLocationsWithFewPoems.length > 0) {
  console.log('需要补充诗词的地点：');
  cleanedLocationsWithFewPoems.forEach(location => {
    console.log(`- ${location.location}: ${location.count} 首`);
  });
}
