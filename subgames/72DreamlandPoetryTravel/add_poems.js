// 为新洞天添加诗词脚本
// 为每个新洞天查找并添加3-5首相关诗词

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

// 读取现有诗词数据和洞天数据
const poemsData = require('./poems_data.js');
const cavesData = require('./caves_data.js');

// 创建cave_id到name的映射
const caveMap = {};
cavesData.caves.forEach(cave => {
  caveMap[cave.id] = cave.name;
});

// 地点别名和古地名映射
const locationAliases = {
  // 五岳名山
  '黄山': ['黟山', '天都', '莲花峰', '光明顶'],
  '泰山': ['岱宗', '岱岳', '东岳', '泰岳'],
  '庐山': ['匡庐', '匡山'],
  '峨眉山': ['峨眉', '峨嵋', '普贤菩萨道场'],
  '华山': ['西岳', '太华', '华岳'],
  '衡山': ['南岳', '寿岳', '衡岳'],
  '恒山': ['北岳', '常山', '恒岳'],
  '嵩山': ['嵩岳', '中岳', '少室山', '太室山'],
  
  // 湖泊河流
  '洞庭湖': ['云梦泽', '八百里洞庭'],
  '太湖': ['震泽', '具区', '五湖'],
  '长江三峡': ['三峡', '长江', '瞿塘峡', '巫峡', '西陵峡'],
  '桂林漓江': ['漓江', '桂江'],
  
  // 名楼寺庙
  '黄鹤楼': ['黄鹤矶', '黄鹤山'],
  '岳阳楼': ['岳阳城'],
  '滕王阁': ['滕王阁'],
  '灵隐寺': ['灵隐', '灵隐禅寺', '飞来峰'],
  '寒山寺': ['寒山', '枫桥'],
  '九华山': ['九子山', '九华'],
  '普陀山': ['普陀', '寶陀', '補陀', '南海观音道场'],
  '五台山': ['五台', '清凉山', '文殊菩萨道场'],
  '少林寺': ['少林', '嵩山少林寺'],
  '大足石刻': ['大足'],
  
  // 古城古镇
  '扬州瘦西湖': ['扬州', '维扬', '广陵'],
  '西安古城': ['长安', '西京', '镐京'],
  '洛阳龙门石窟': ['洛阳', '东都', '洛邑', '龙门'],
  '南京古城': ['金陵', '建康', '建业', '江宁'],
  '绍兴兰亭': ['绍兴', '会稽', '山阴', '兰亭'],
  '曲阜孔庙': ['孔庙', '曲阜', '阙里'],
  '敦煌莫高窟': ['敦煌', '莫高窟', '千佛洞'],
  
  // 其他景点
  '青城山': ['青城', '丈人山'],
  '雁荡山': ['雁宕山', '雁山'],
  '苏州园林': ['苏州', '姑苏', '吴门'],
  '桂林山水': ['桂林', '桂州', '八桂'],
  '厦门鼓浪屿': ['厦门', '鹭岛', '鼓浪'],
  '武夷山': ['武夷'],
  '张掖丹霞地貌': ['张掖', '甘州'],
  '青海湖': ['西海', '鲜水', '卑禾羌海'],
  '张家界': ['张家界', '武陵源'],
  '黄龙': ['黄龙寺'],
  '龙虎山': ['龙虎', '正一道祖庭'],
  '崆峒山': ['崆峒'],
  '云台山': ['云台'],
  
  // 新添加的21个地点
  '采石矶': ['采石', '牛渚矶'],
  '乌衣巷': ['乌衣', '朱雀桥'],
  '杜甫草堂': ['草堂', '浣花草堂'],
  '三仙山': ['蓬莱', '方丈', '瀛洲'],
  '阳关': ['阳关', '西出阳关'],
  '玉门关': ['玉门', '玉关'],
  '凉州': ['武威', '西凉'],
  '河西走廊': ['河西', '河陇'],
  '岳麓山': ['岳麓', '岳麓书院'],
  '金山寺': ['金山', '金山禅寺'],
  '鸡鸣寺': ['鸡鸣', '鸡鸣埭'],
  '净慈寺': ['净慈', '南屏'],
  '绍兴鉴湖': ['鉴湖', '镜湖'],
  '奉节白帝城': ['白帝城', '白帝', '夔门'],
  '趵突泉': ['趵突', '济南', '历下', '泺水', '历下亭'],
  '鹳雀楼': ['鹳雀', '永济', '蒲州', '河中府'],
  '雁门关': ['雁门', '代州', '代县', '勾注', '雁门塞'],
  
  // 城市
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
  '珠海': ['香山县'],
  '儋州': ['儋耳', '儋县', '昌化军', '儋州古城', '东坡书院']
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
              
              // 最多返回10首诗词，以便后续筛选
              if (foundPoems.length >= 10) {
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
  }
  
  return foundPoems;
}

// 获取诗词语料库中的朝代信息
function getDynasty(sourceDir) {
  switch (sourceDir) {
    case '全唐诗':
    case '御定全唐詩':
      return '唐';
    case '宋词':
      return '宋';
    case '元曲':
      return '元';
    case '五代诗词':
      return '五代';
    default:
      return '未知';
  }
}

// 主函数
async function main() {
  console.log('开始为所有洞天添加诗词...');
  
  // 获取所有洞天
  const allCaves = cavesData.caves;
  
  // 只处理儋州（id:67）
  const cavesToAdd = allCaves.filter(cave => cave.id === 67);
  
  console.log(`\n=== 处理儋州 (id 67) ===`);
  
  // 创建现有诗词的映射，避免重复
  const existingPoemsMap = new Map();
  poemsData.poems.forEach(poem => {
    const key = `${poem.cave_id}-${poem.title}-${poem.author}`;
    existingPoemsMap.set(key, true);
  });
  
  // 为每个洞天添加诗词
  let nextPoemId = 1; // 从1开始重新编号
  const newPoems = [...poemsData.poems];
  
  for (const cave of cavesToAdd) {
    const caveId = cave.id;
    const caveName = cave.name;
    
    console.log(`\n正在处理 ${caveName} (${caveId})...`);
    
    // 查找相关诗词
    const aliases = locationAliases[caveName] || [];
    const foundPoems = await findLocationPoems(caveName, aliases);
    
    console.log(`找到 ${foundPoems.length} 首相关诗词`);
    
    // 筛选并添加3-5首诗词
    let addedCount = 0;
    for (const poem of foundPoems) {
      if (addedCount >= 5) {
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
        dynasty: getDynasty(poem.sourceDir),
        location: caveName,
        reason: `诗词内容、标题或别名提及${caveName}`
      };
      
      newPoems.push(newPoem);
      existingPoemsMap.set(key, true);
      addedCount++;
      
      console.log(`已添加: ${poem.title} - ${poem.author}`);
    }
    
    console.log(`实际添加 ${addedCount} 首诗词`);
    
    // 如果找到的诗词不够，显示警告
    if (addedCount < 3) {
      console.warn(`警告：${caveName} 只添加了 ${addedCount} 首诗词，数量不足3首`);
    }
  }
  
  // 保存更新后的诗词数据
  const outputPath = path.join(__dirname, 'poems_data.js');
  const content = `module.exports = {
  "poems": ${JSON.stringify(newPoems, null, 2)}
};`;
  
  fs.writeFileSync(outputPath, content, 'utf8');
  
  console.log(`\n诗词添加完成！`);
  console.log(`总诗词数量: ${newPoems.length}`);
}

// 运行主函数
main().catch(err => {
  console.error('添加诗词过程中出现错误:', err);
  process.exit(1);
});
