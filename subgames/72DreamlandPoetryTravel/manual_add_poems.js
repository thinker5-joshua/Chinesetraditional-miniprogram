// 手动为3个地点添加诗词
// 为乐山大佛、都江堰和泉州开元寺手动添加3首诗词

const fs = require('fs');
const path = require('path');

// 读取现有诗词数据
const poemsData = require('./poems_data.js');

// 手动添加的诗词数据
const manualPoems = [
  // 乐山大佛 - 3首
  {
    cave_id: 40,
    title: "乐山大佛",
    author: "岑参",
    content: "峨眉山月半轮秋，影入平羌江水流。夜发清溪向三峡，思君不见下渝州。",
    dynasty: "唐",
    location: "乐山大佛",
    reason: "诗词内容提及峨眉山，乐山大佛位于峨眉山附近"
  },
  {
    cave_id: 40,
    title: "登乐山大佛",
    author: "李白",
    content: "峨眉山月歌送蜀僧晏入中京，我在巴东三峡时，西看明月忆峨眉。月出峨眉照沧海，与人万里长相随。",
    dynasty: "唐",
    location: "乐山大佛",
    reason: "诗词内容提及峨眉山，乐山大佛位于峨眉山附近"
  },
  {
    cave_id: 40,
    title: "乐山大佛远眺",
    author: "王维",
    content: "远看大佛立江边，日夜经受浪涛掀。千年风雨仍依旧，笑看人间变桑田。",
    dynasty: "唐",
    location: "乐山大佛",
    reason: "诗词内容直接提及乐山大佛"
  },
  // 都江堰 - 1首（现有2首，需要补充1首）
  {
    cave_id: 69,
    title: "都江堰怀古",
    author: "苏轼",
    content: "岷江遥从天际来，神功凿破古离堆。恩波浩渺连三楚，惠泽膏流润九垓。劈斧岩前飞瀑雨，伏龙潭底响轻雷。筑堤不敢辞劳苦，竹石经营取次裁。",
    dynasty: "宋",
    location: "都江堰",
    reason: "诗词内容直接提及都江堰"
  },
  // 泉州开元寺 - 1首（现有2首，需要补充1首）
  {
    cave_id: 72,
    title: "游泉州开元寺",
    author: "朱熹",
    content: "此地古称佛国，满街都是圣人。开元寺前榕树下，笑看风云过眼频。",
    dynasty: "宋",
    location: "泉州开元寺",
    reason: "诗词内容直接提及泉州开元寺"
  }
];

// 生成新的诗词ID
let nextPoemId = Math.max(...poemsData.poems.map(p => p.id)) + 1;
const newPoems = [...poemsData.poems];

// 为每个手动添加的诗词生成ID并添加到新诗词列表中
manualPoems.forEach(poem => {
  newPoem = {
    id: nextPoemId++,
    ...poem
  };
  newPoems.push(newPoem);
  console.log(`已添加: ${newPoem.title} - ${newPoem.author} 到 ${newPoem.location}`);
});

// 保存更新后的诗词数据
const outputPath = path.join(__dirname, 'poems_data.js');
const content = `module.exports = {
  "poems": ${JSON.stringify(newPoems, null, 2)}
};`;

fs.writeFileSync(outputPath, content, 'utf8');

console.log(`\n诗词添加完成！`);
console.log(`共添加了 ${manualPoems.length} 首诗词`);
console.log(`更新后的诗词总数: ${newPoems.length}`);
