// 仅检查 data-diff.js 与云数据库重复数据的脚本
// 用于找出字和正确读音都相同的重复数据，只生成报告不修改原文件

const fs = require('fs');
const path = require('path');

// 读取本地 data-diff.js 文件
function readLocalData() {
  console.log('开始读取本地 data-diff.js 文件...');
  
  try {
    const filePath = path.join(__dirname, 'data-diff.js');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // 提取 characters 数组
    const startIndex = fileContent.indexOf('const characters = [');
    const endIndex = fileContent.lastIndexOf('];');
    
    if (startIndex === -1 || endIndex === -1) {
      console.error('无法找到 characters 数组');
      return { characters: [], startIndex, endIndex };
    }
    
    // 使用正则表达式提取并清理 characters 数组内容
    let charactersContent = fileContent.slice(startIndex + 19, endIndex);
    
    // 移除所有注释
    charactersContent = charactersContent
      .replace(/\/\/.*$/gm, '') // 移除单行注释
      .replace(/\/\*[\s\S]*?\*\//g, '') // 移除多行注释
      .replace(/\s+/g, ' ') // 移除多余空格和换行
      .trim();
    
    // 修复 JSON 格式
    charactersContent = charactersContent
      .replace(/([a-zA-Z_]+)\s*:/g, '"$1":') // 添加引号到键
      .replace(/:\s*([^"\s,\}\]]+)/g, ': "$1"') // 添加引号到值
      .replace(/:"\{/g, ': {') // 修复对象值
      .replace(/\}"/g, '}') // 修复对象值
      .replace(/:"\[/g, ': [') // 修复数组值
      .replace(/\]"/g, ']') // 修复数组值
      .replace(/,\s*\}/g, ' }') // 移除对象末尾多余逗号
      .replace(/,\s*\]/g, ' ]') // 移除数组末尾多余逗号
      .replace(/""([a-zA-Z_]+)""/g, '"$1"') // 修复重复引号
      .replace(/:"\s*"/g, ': ""') // 修复空字符串
      .replace(/\s*([\{\}\[\],:])\s*/g, '$1'); // 移除多余空格
    
    // 尝试解析 JSON
    let characters = [];
    try {
      characters = JSON.parse('[' + charactersContent + ']');
      console.log(`成功读取 ${characters.length} 条本地数据`);
    } catch (jsonError) {
      console.error('JSON 解析失败，尝试手动解析...');
      characters = manualParse(charactersContent);
    }
    
    return { characters, startIndex, endIndex };
  } catch (error) {
    console.error('读取本地数据失败:', error);
    return { characters: [], startIndex: -1, endIndex: -1 };
  }
}

// 手动解析字符数组
function manualParse(content) {
  const characters = [];
  let currentObject = '';
  let braceCount = 0;
  let inString = false;
  let escapeNext = false;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    // 处理字符串
    if (char === '"' && !escapeNext) {
      inString = !inString;
    }
    
    // 处理转义字符
    escapeNext = char === '\\' && !escapeNext;
    
    if (inString) {
      currentObject += char;
      continue;
    }
    
    // 处理括号
    if (char === '{') {
      braceCount++;
    } else if (char === '}') {
      braceCount--;
    }
    
    currentObject += char;
    
    // 当括号匹配且遇到逗号或结束时，解析当前对象
    if ((braceCount === 0 && char === ',') || (i === content.length - 1 && braceCount === 0)) {
      // 清理并解析对象
      const cleanObjectStr = currentObject.replace(/,$/, '').trim();
      if (cleanObjectStr) {
        try {
          const obj = JSON.parse(cleanObjectStr);
          characters.push(obj);
        } catch (e) {
          console.warn('跳过解析失败的对象:', cleanObjectStr);
        }
      }
      currentObject = '';
    }
  }
  
  console.log(`手动解析成功读取 ${characters.length} 条本地数据`);
  return characters;
}

// 读取云数据库模拟数据
function readCloudData() {
  console.log('\n开始读取云数据库模拟数据...');
  
  try {
    const filePath = path.join(__dirname, '../../cloudfunctions/import_to_cloud/export_data.json');
    
    if (!fs.existsSync(filePath)) {
      console.log('未找到云数据库模拟数据文件，将使用空数据进行检查');
      return { cloudData: [], cloudDataMap: new Map() };
    }
    
    const cloudContent = fs.readFileSync(filePath, 'utf-8');
    const cloudData = JSON.parse(cloudContent);
    
    console.log(`成功读取 ${cloudData.length} 条云数据库模拟数据`);
    
    // 创建映射，键为 字+正确读音
    const cloudDataMap = new Map();
    cloudData.forEach(item => {
      const key = `${item.char}-${item.correctPronunciation}`;
      cloudDataMap.set(key, item);
    });
    
    return { cloudData, cloudDataMap };
  } catch (error) {
    console.error('读取云数据库模拟数据失败:', error);
    return { cloudData: [], cloudDataMap: new Map() };
  }
}

// 检查本地数据与云数据库重复
function checkCloudDuplicates(localData, cloudDataMap) {
  console.log('\n开始检查本地数据与云数据库重复...');
  
  const duplicates = [];
  
  localData.forEach((localItem, index) => {
    const key = `${localItem.char}-${localItem.correctPronunciation}`;
    
    if (cloudDataMap.has(key)) {
      const cloudItem = cloudDataMap.get(key);
      duplicates.push({
        char: localItem.char,
        correctPronunciation: localItem.correctPronunciation,
        localId: localItem.id,
        cloudId: cloudItem.id,
        localIndex: index + 1
      });
    }
  });
  
  return duplicates;
}

// 检查本地数据内部重复
function checkLocalDuplicates(localData) {
  console.log('\n开始检查本地数据内部重复...');
  
  const duplicates = [];
  const seen = new Map();
  
  localData.forEach((item, index) => {
    const key = `${item.char}-${item.correctPronunciation}`;
    
    if (seen.has(key)) {
      const firstItem = seen.get(key);
      duplicates.push({
        char: item.char,
        correctPronunciation: item.correctPronunciation,
        firstId: firstItem.id,
        firstIndex: firstItem.index + 1,
        duplicateId: item.id,
        duplicateIndex: index + 1
      });
    } else {
      seen.set(key, { id: item.id, index });
    }
  });
  
  return duplicates;
}

// 生成报告
function generateReport(localData, cloudData, cloudDuplicates, localDuplicates) {
  console.log('\n======================================');
  console.log('重复数据核对报告');
  console.log('======================================');
  console.log(`本地数据总量: ${localData.length} 条`);
  console.log(`云数据库数据总量: ${cloudData.length} 条`);
  console.log(`本地数据与云数据库重复: ${cloudDuplicates.length} 条`);
  console.log(`本地数据内部重复: ${localDuplicates.length} 条`);
  console.log('======================================');
  
  // 显示本地与云数据库重复详情
  if (cloudDuplicates.length > 0) {
    console.log('\n本地数据与云数据库重复详情:');
    console.log('序号 | 字 | 正确读音 | 本地ID | 云数据库ID | 本地索引');
    console.log('-----|----|----------|--------|-------------|--------');
    
    cloudDuplicates.forEach((item, index) => {
      console.log(`${index + 1} | ${item.char} | ${item.correctPronunciation} | ${item.localId} | ${item.cloudId} | ${item.localIndex}`);
    });
  } else {
    console.log('\n本地数据与云数据库没有重复数据');
  }
  
  // 显示本地内部重复详情
  if (localDuplicates.length > 0) {
    console.log('\n本地数据内部重复详情:');
    console.log('序号 | 字 | 正确读音 | 第一次出现ID | 第一次索引 | 重复出现ID | 重复索引');
    console.log('-----|----|----------|--------------|----------|--------------|----------');
    
    localDuplicates.forEach((item, index) => {
      console.log(`${index + 1} | ${item.char} | ${item.correctPronunciation} | ${item.firstId} | ${item.firstIndex} | ${item.duplicateId} | ${item.duplicateIndex}`);
    });
  } else {
    console.log('\n本地数据内部没有重复数据');
  }
  
  console.log('\n======================================');
  console.log('报告生成完成');
  console.log('======================================');
}

// 主函数
async function main() {
  console.log('开始执行重复数据检查...');
  
  // 1. 读取本地数据
  const { characters: localData } = readLocalData();
  
  if (localData.length === 0) {
    console.error('未读取到本地数据，检查失败');
    return;
  }
  
  // 2. 读取云数据库数据
  const { cloudData, cloudDataMap } = readCloudData();
  
  // 3. 检查本地数据与云数据库重复
  const cloudDuplicates = checkCloudDuplicates(localData, cloudDataMap);
  
  // 4. 检查本地数据内部重复
  const localDuplicates = checkLocalDuplicates(localData);
  
  // 5. 生成报告
  generateReport(localData, cloudData, cloudDuplicates, localDuplicates);
  
  console.log('\n重复数据检查完成，未修改任何文件');
}

// 执行主函数
main();
