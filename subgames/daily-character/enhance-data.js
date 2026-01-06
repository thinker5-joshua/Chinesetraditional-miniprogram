const fs = require('fs');
const path = require('path');

// 读取当前数据
const data = require('./data-optimized.js');

// 增强数据的映射表，包含详细解释和相关词组
const enhancedDataMap = {
  // 龟 (jūn)
  '龟': {
    explanation: '龟（jūn）：同"皲"，皮肤因寒冷或干燥而裂开。如：龟裂。',
    relatedPhrases: ['龟裂', '龟手', '冻龟']
  },
  // 巷 (hàng)
  '巷': {
    explanation: '巷（hàng）：巷道，采矿或探矿时挖的坑道。如：矿巷。',
    relatedPhrases: ['巷道', '巷战', '平巷', '斜巷']
  },
  // 薄 (bò)
  '薄': {
    explanation: '薄（bò）：多年生草本植物，茎叶有清凉香气，可入药。如：薄荷。',
    relatedPhrases: ['薄荷', '薄荷脑', '薄荷油', '薄荷叶']
  },
  // 乘 (shèng)
  '乘': {
    explanation: '乘（shèng）：古代称兵车，四马一车为一乘。如：千乘之国。',
    relatedPhrases: ['千乘之国', '万乘之君', '乘舆', '乘黄']
  },
  // 仇 (qiú)
  '仇': {
    explanation: '仇（qiú）：姓氏。如：仇英（明代画家）。',
    relatedPhrases: ['仇英', '仇池', '仇由', '仇览']
  },
  // 氛 (fēn)
  '氛': {
    explanation: '氛（fēn）：周围的气氛或情调。如：氛围。',
    relatedPhrases: ['氛围', '气氛', '氛气', '氛氲']
  },
  // 种 (chóng)
  '种': {
    explanation: '种（chóng）：姓。如：种放（宋代学者）。',
    relatedPhrases: ['种放', '种暠', '种谔', '种师道']
  },
  // 憧 (chōng)
  '憧': {
    explanation: '憧（chōng）：心意不定；向往。如：憧憬。',
    relatedPhrases: ['憧憬', '憧憧', '憧扰', '憧憬未来']
  },
  // 啜 (chuài)
  '啜': {
    explanation: '啜（chuài）：姓；或指（chuò）喝，饮。但在此处正确读音为chuài，多用于姓氏。',
    relatedPhrases: ['啜姓', '啜泣（注意：此处"啜"读chuò，非chuài）']
  },
  // 汆 (cuān)
  '汆': {
    explanation: '汆（cuān）：把食物放到沸水里稍微一煮。如：汆丸子。',
    relatedPhrases: ['汆丸子', '汆汤', '汆白肉', '汆鱼']
  },
  // 订 (dìng)
  '订': {
    explanation: '订（dìng）：预先约定；改正；装订。如：订购。',
    relatedPhrases: ['订购', '订阅', '订单', '订货']
  },
  // 胴 (dòng)
  '胴': {
    explanation: '胴（dòng）：躯干，特指牲畜屠宰后除去头、尾、四肢、内脏等剩下的部分。如：胴体。',
    relatedPhrases: ['胴体', '胴肛', '胴部', '胴长']
  },
  // 噶 (gá)
  '噶': {
    explanation: '噶（gá）：译音用字。如：噶布伦（原西藏地方政府的主要官员）。',
    relatedPhrases: ['噶布伦', '噶伦', '萨噶达娃节', '噶厦']
  },
  // 呱 (gū)
  '呱': {
    explanation: '呱（gū）：拟声词，形容婴儿的哭声。如：呱呱坠地。',
    relatedPhrases: ['呱呱坠地', '呱呱而泣', '呱呱声', '呱呱叫']
  },
  // 行 (héng)
  '行': {
    explanation: '行（héng）：行列；排行；行业。如：银行。',
    relatedPhrases: ['银行', '行伍', '行辈', '行号']
  },
  // 薅 (hāo)
  '薅': {
    explanation: '薅（hāo）：用手拔（草等）。如：薅草。',
    relatedPhrases: ['薅草', '薅苗', '薅羊毛', '薅锄']
  },
  // 桦 (huà)
  '桦': {
    explanation: '桦（huà）：落叶乔木或灌木，树皮白色、灰色、黄色或黑色，有的光滑，有的开裂。木材致密，可制器具。如：白桦。',
    relatedPhrases: ['白桦', '桦树', '桦木', '桦林']
  },
  // 馄 (hún)
  '馄': {
    explanation: '馄（hún）：〔馄饨〕一种面食，用薄面片包上馅儿，煮熟后带汤吃。',
    relatedPhrases: ['馄饨', '馄钝', '云吞', '馄饨面']
  },
  // 和 (huó)
  '和': {
    explanation: '和（huó）：在粉状物中加液体搅拌或揉弄使有黏性。如：和面。',
    relatedPhrases: ['和面', '和泥', '和面团', '和稀泥']
  },
  // 溃 (huì)
  '溃': {
    explanation: '溃（huì）：疮溃烂。如：溃烂。',
    relatedPhrases: ['溃烂', '溃脓', '溃破', '溃疡']
  },
  // 渐 (jiān)
  '渐': {
    explanation: '渐（jiān）：浸；流入。如：渐染。',
    relatedPhrases: ['渐染', '渐渍', '渐摩', '渐涵']
  },
  // 睑 (jiǎn)
  '睑': {
    explanation: '睑（jiǎn）：眼皮。如：眼睑。',
    relatedPhrases: ['眼睑', '睑裂', '睑腺炎', '上睑']
  },
  // 酵 (jiào)
  '酵': {
    explanation: '酵（jiào）：有机物由于某些菌或酶而分解称“发酵”。能使有机物发酵的真菌称“酵母菌”。亦称“酵母”、“酿母”。',
    relatedPhrases: ['发酵', '酵母', '酵母菌', '发酵粉']
  }
};

// 处理数据
const processedData = data.characters.map(char => {
  // 获取增强数据
  const enhancedData = enhancedDataMap[char.char] || {};
  
  // 补充解释
  const explanation = enhancedData.explanation || char.explanation;
  
  // 处理相关词组
  let relatedPhrases = [];
  // 如果有增强的相关词组，使用增强的
  if (enhancedData.relatedPhrases && enhancedData.relatedPhrases.length > 0) {
    relatedPhrases = enhancedData.relatedPhrases;
  } else {
    // 否则，从原有词组中删除"X字"
    relatedPhrases = char.relatedPhrases.filter(phrase => phrase !== char.char + '字');
  }
  
  return {
    ...char,
    explanation,
    relatedPhrases
  };
});

// 过滤掉没有相关词组的字
const filteredData = processedData.filter(char => char.relatedPhrases.length > 0);

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

const characters = ${JSON.stringify(filteredData, null, 2)};

module.exports = {
  characters
};`;

fs.writeFileSync(
  path.join(__dirname, 'data-optimized.js'),
  outputData,
  'utf8'
);

console.log('数据增强完成！');
console.log(`原数据数量：${data.characters.length}`);
console.log(`处理后数据数量：${filteredData.length}`);
console.log(`删除的字数量：${data.characters.length - filteredData.length}`);
console.log('已删除的字：', data.characters.filter(char => !filteredData.find(c => c.id === char.id)).map(char => char.char).join('、'));
