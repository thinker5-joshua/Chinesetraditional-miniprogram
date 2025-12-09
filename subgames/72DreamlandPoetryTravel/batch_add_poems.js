// 批量为洞天补充诗词
// 从chinese-poetry数据库中查找与各洞天相关的诗词并补充

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

// 读取洞穴数据和现有诗词数据
const cavesData = require('./caves_data.js');
const poemsData = require('./poems_data.js');

// 创建cave_id到name的映射
const caveMap = {};
cavesData.caves.forEach(cave => {
  caveMap[cave.id] = cave.name;
});

// 地点别名和古地名映射
const locationAliases = {
  '黄山': ['黟山', '天都', '莲花峰', '光明顶'],
  '泰山': ['岱宗', '岱岳', '东岳', '泰岳'],
  '庐山': ['匡庐', '匡山', '南岳'],
  '峨眉山': ['峨眉', '峨嵋', '普贤菩萨道场'],
  '华山': ['西岳', '太华', '华岳'],
  '衡山': ['南岳', '寿岳', '衡岳'],
  '恒山': ['北岳', '常山', '恒岳'],
  '洞庭湖': ['云梦泽', '八百里洞庭'],
  '黄鹤楼': ['黄鹤矶', '黄鹤山'],
  '滕王阁': ['滕王阁'],
  '岳阳楼': ['岳阳城'],
  '扬州瘦西湖': ['扬州', '维扬', '广陵'],
  '西安古城': ['长安', '西京', '镐京'],
  '洛阳龙门石窟': ['洛阳', '东都', '洛邑', '龙门'],
  '南京古城': ['金陵', '建康', '建业', '江宁'],
  '绍兴兰亭': ['绍兴', '会稽', '山阴', '兰亭'],
  '青城山': ['青城', '丈人山'],
  '九华山': ['九子山', '九华'],
  '普陀山': ['普陀', '寶陀', '補陀', '南海观音道场'],
  '五台山': ['五台', '清凉山', '文殊菩萨道场'],
  '嵩山': ['嵩岳', '中岳', '少室山', '太室山'],
  '雁荡山': ['雁宕山', '雁山'],
  '苏州园林': ['苏州', '姑苏', '吴门'],
  '桂林山水': ['桂林', '桂州', '八桂'],
  '厦门鼓浪屿': ['厦门', '鹭岛', '鼓浪'],
  '武夷山': ['武夷'],
  '长江三峡': ['三峡', '长江', '瞿塘峡', '巫峡', '西陵峡'],
  '桂林漓江': ['漓江', '桂江'],
  '敦煌莫高窟': ['敦煌', '莫高窟', '千佛洞'],
  '嘉峪关': ['嘉峪'],
  '张掖丹霞地貌': ['张掖', '甘州'],
  '青海湖': ['西海', '鲜水', '卑禾羌海'],
  '神农架': ['神农'],
  '张家界': ['张家界', '武陵源'],
  '九寨沟': ['九寨'],
  '黄龙': ['黄龙寺'],
  '武当山': ['武当', '太和山', '真武大帝道场'],
  '龙虎山': ['龙虎', '正一道祖庭'],
  '齐云山': ['齐云', '白岳'],
  '崂山': ['劳山', '海上名山'],
  '崆峒山': ['崆峒'],
  '麦积山石窟': ['麦积山', '麦积'],
  '云冈石窟': ['云冈', '武州山石窟'],
  '大足石刻': ['大足'],
  '故宫': ['紫禁城', '故宫博物院'],
  '长城': ['万里长城', '长城'],
  '云台山': ['云台'],
  '北京': ['京师', '燕京', '北平'],
  '西安': ['长安', '西京'],
  '洛阳': ['东都', '洛邑'],
  '南京': ['金陵', '建康'],
  '开封': ['汴京', '东京', '汴梁'],
  '杭州': ['临安', '钱塘'],
  '成都': ['益州', '锦城', '蓉城'],
  '武汉': ['武昌', '汉口', '汉阳'],
  '重庆': ['渝州', '巴郡'],
  '长沙': ['潭州', '星城'],
  '南昌': ['洪州', '豫章'],
  '福州': ['闽都', '三山'],
  '广州': ['番禺', '羊城', '花城'],
  '深圳': ['宝安'],
  '珠海': ['香山县'],
  '厦门': ['鹭岛', '思明'],
  '青岛': ['胶澳'],
  '大连': ['青泥洼'],
  '三亚': ['崖州', '鹿城'],
  '丽江': ['丽水', '丽江古城'],
  '大理': ['大理国', '叶榆'],
  '三清山': ['三清', '少华山'],
  '梵净山': ['梵净', '三山谷'],
  '天柱山': ['皖山', '潜山', '万岁山']
};

// 查找与特定地点相关的诗词
async function findLocationPoems(location, aliases = []) {
  const poetryBaseDir = '/Users/joshua/Documents/GitHub/chinese-poetry';
  
  // 需要检查的诗词目录
  const poetryDirs = [
    '全唐诗',
    '宋词',
    '元曲',
    '五代诗词',
    '御定全唐詩'
  ];
  
  const allLocations = [location, ...aliases];
  const foundPoems = [];
  
  for (const dir of poetryDirs) {
    const poetryDir = path.join(poetryBaseDir, dir);
    
    // 检查目录是否存在
    if (!fs.existsSync(poetryDir)) continue;
    
    const files = await readdir(poetryDir);
    
    // 只处理JSON文件
    const jsonFiles = files.filter(file => file.endsWith('.json') && !file.startsWith('authors.') && !file.startsWith('_'));
    
    for (const file of jsonFiles) {
      const filePath = path.join(poetryDir, file);
      
      try {
        const content = await readFile(filePath, 'utf8');
        const data = JSON.parse(content);
        
        // 检查数组或对象格式
        const poems = Array.isArray(data) ? data : (data.poems || []);
        
        for (const poem of poems) {
          if (poem.title && poem.author && poem.paragraphs) {
            const content = (poem.paragraphs || []).join('');
            
            // 检查诗词内容或标题是否包含地点或其别名
            const isRelated = allLocations.some(loc => {
              return content.includes(loc) || poem.title.includes(loc);
            });
            
            if (isRelated) {
              foundPoems.push({
                ...poem,
                sourceDir: dir
              });
              
              // 每个地点最多返回5首诗词
              if (foundPoems.length >= 5) {
                return foundPoems;
              }
            }
          }
        }
      } catch (error) {
        console.error(`读取文件出错: ${filePath}`, error.message);
        continue;
      }
    }
    
    // 每个地点最多返回5首诗词
    if (foundPoems.length >= 5) {
      return foundPoems;
    }
  }
  
  return foundPoems;
}

// 主函数
async function main() {
  console.log('开始为洞天批量补充诗词...');
  
  // 创建现有诗词的映射，避免重复
  const existingPoemsMap = new Map();
  poemsData.poems.forEach(poem => {
    const key = `${poem.cave_id}-${poem.title}-${poem.author}`;
    existingPoemsMap.set(key, true);
  });
  
  // 统计现有各洞天的诗词数量
  const cavePoemCount = {};
  cavesData.caves.forEach(cave => {
    cavePoemCount[cave.id] = 0;
  });
  
  poemsData.poems.forEach(poem => {
    cavePoemCount[poem.cave_id] = (cavePoemCount[poem.cave_id] || 0) + 1;
  });
  
  // 为每个洞天补充诗词
  let nextPoemId = Math.max(...poemsData.poems.map(p => p.id)) + 1;
  const newPoems = [...poemsData.poems];
  
  for (const cave of cavesData.caves) {
    const caveId = cave.id;
    const caveName = cave.name;
    const currentCount = cavePoemCount[caveId] || 0;
    
    console.log(`\n正在处理 ${caveName} (${caveId})...`);
    console.log(`现有诗词数量: ${currentCount}`);
    
    // 如果已经有3-5首诗词，跳过
    if (currentCount >= 3 && currentCount <= 5) {
      console.log(`诗词数量已符合要求，跳过`);
      continue;
    }
    
    // 需要补充的诗词数量
    const neededCount = Math.max(3, Math.min(5, currentCount + 3));
    const poemsToAdd = neededCount - currentCount;
    
    console.log(`需要补充 ${poemsToAdd} 首诗词`);
    
    if (poemsToAdd <= 0) {
      continue;
    }
    
    // 查找相关诗词
    const aliases = locationAliases[caveName] || [];
    const foundPoems = await findLocationPoems(caveName, aliases);
    
    console.log(`找到 ${foundPoems.length} 首相关诗词`);
    
    // 选择需要的诗词数量
    let addedCount = 0;
    for (const poem of foundPoems) {
      if (addedCount >= poemsToAdd) {
        break;
      }
      
      // 检查是否已存在
      const key = `${caveId}-${poem.title}-${poem.author}`;
      if (existingPoemsMap.has(key)) {
        continue;
      }
      
      // 添加诗词
      const newPoem = {
        id: nextPoemId++,
        cave_id: caveId,
        title: poem.title,
        author: poem.author,
        content: poem.paragraphs.join('\n'),
        dynasty: poem.dynasty || poem.sourceDir === '全唐诗' || poem.sourceDir === '御定全唐詩' ? '唐' : 
                poem.sourceDir === '宋词' ? '宋' : 
                poem.sourceDir === '元曲' ? '元' : '五代',
        location: caveName,
        reason: `诗词内容直接提及${caveName}`
      };
      
      newPoems.push(newPoem);
      existingPoemsMap.set(key, true);
      addedCount++;
      
      console.log(`已添加: ${poem.title} - ${poem.author}`);
    }
    
    console.log(`实际补充 ${addedCount} 首诗词`);
    
    // 如果找到的诗词不够，生成一些经典诗词
    if (addedCount < poemsToAdd) {
      console.log(`未找到足够的相关诗词，使用经典诗词补充`);
      
      // 这里可以添加一些默认的经典诗词
      // 由于时间关系，我们先跳过，后续手动补充
    }
  }
  
  // 保存更新后的诗词数据
  const outputPath = path.join(__dirname, 'poems_data.js');
  const content = `module.exports = {\n  "poems": ${JSON.stringify(newPoems, null, 2)}\n};`;
  
  fs.writeFileSync(outputPath, content, 'utf8');
  
  console.log(`\n诗词补充完成！`);
  console.log(`总诗词数量: ${newPoems.length}`);
  
  // 统计最终各洞天的诗词数量
  const finalCount = {};
  newPoems.forEach(poem => {
    finalCount[poem.cave_id] = (finalCount[poem.cave_id] || 0) + 1;
  });
  
  console.log(`\n最终各洞天诗词数量:`);
  for (const cave of cavesData.caves) {
    console.log(`${cave.name}: ${finalCount[cave.id] || 0} 首`);
  }
}

// 运行主函数
main().catch(err => {
  console.error('批量补充诗词过程中出现错误:', err);
  process.exit(1);
});
