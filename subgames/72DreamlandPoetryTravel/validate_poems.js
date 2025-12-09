// 诗词验证脚本
// 检查诗词的作者真实性和地点关联性

const fs = require('fs');
const path = require('path');

// 读取更新后的诗词数据
const poemsData = require('./poems_data_updated.js');

// 定义存疑的诗词列表
const suspiciousPoems = [];

// 检查每首诗词
poemsData.poems.forEach(poem => {
  let isSuspicious = false;
  let reason = '';
  
  // 检查已知的存疑情况
  if (poem.location === '黄山' && poem.title === '望庐山瀑布') {
    isSuspicious = true;
    reason = '诗词描写的是庐山，非黄山';
  } else if (poem.location === '普陀山' && ['陆游', '苏轼', '王安石'].includes(poem.author)) {
    isSuspicious = true;
    reason = `普陀山的诗词，作者${poem.author}存疑`;
  } else if (poem.location === '大连') {
    isSuspicious = true;
    reason = '大连的诗词存疑';
  } else if (poem.location === '大足石刻') {
    isSuspicious = true;
    reason = '大足石刻的诗词存疑';
  }
  
  if (isSuspicious) {
    suspiciousPoems.push({
      ...poem,
      suspiciousReason: reason
    });
  }
});

// 统计每地的诗词数量
const locationCount = {};
poemsData.poems.forEach(poem => {
  locationCount[poem.location] = (locationCount[poem.location] || 0) + 1;
});

// 找出诗词数量少于3首的地点
const locationsWithFewPoems = Object.entries(locationCount)
  .filter(([location, count]) => count < 3)
  .map(([location, count]) => ({ location, count }));

// 生成验证报告
const report = {
  totalPoems: poemsData.poems.length,
  suspiciousPoems: suspiciousPoems.length,
  locationsWithFewPoems: locationsWithFewPoems.length,
  suspiciousPoemsList: suspiciousPoems,
  locationCount,
  locationsWithFewPoems
};

// 保存验证报告
fs.writeFileSync(
  path.join(__dirname, 'poems_validation_report.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log('诗词验证完成，生成报告：poems_validation_report.json');
console.log(`共检查 ${poemsData.poems.length} 首诗词`);
console.log(`发现 ${suspiciousPoems.length} 首存疑诗词`);
console.log(`发现 ${locationsWithFewPoems.length} 个地点诗词数量少于3首`);
