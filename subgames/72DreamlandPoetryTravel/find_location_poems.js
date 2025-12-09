// 查找与特定地点相关的诗词
// 从chinese-poetry数据库中搜索与指定地点相关的诗词

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

// 搜索与指定地点相关的诗词
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

// 主函数
async function main() {
  const location = process.argv[2] || '峨眉山';
  const aliases = process.argv.slice(3) || ['峨眉', '峨嵋'];
  
  console.log(`正在查找与"${location}"相关的诗词...`);
  console.log(`别名: ${aliases.join(', ')}`);
  
  const poems = await findLocationPoems(location, aliases);
  
  console.log(`\n共找到 ${poems.length} 首与"${location}"相关的诗词:`);
  console.log('='.repeat(80));
  
  poems.forEach((poem, index) => {
    console.log(`\n${index + 1}. ${poem.title} - ${poem.author} (${poem.sourceDir})`);
    console.log('-' .repeat(80));
    console.log(poem.paragraphs.join('\n'));
  });
  
  console.log('\n' + '='.repeat(80));
  console.log(`查找完成，共找到 ${poems.length} 首诗词。`);
}

// 运行主函数
main().catch(err => {
  console.error('查找过程中出现错误:', err);
  process.exit(1);
});
