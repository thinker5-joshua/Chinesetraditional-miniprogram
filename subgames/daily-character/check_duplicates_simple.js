// 简单的重复数据检查脚本
// 使用 Node.js require 直接加载 data-diff.js 文件

const fs = require('fs');
const path = require('path');

// 主函数
async function main() {
  console.log('开始执行重复数据检查...');
  
  try {
    // 1. 直接 require 加载本地数据
    console.log('\n开始读取本地 data-diff.js 文件...');
    const localCharacters = require('./data-diff.js');
    console.log(`成功读取 ${localCharacters.length} 条本地数据`);
    
    // 2. 读取云数据库模拟数据
    console.log('\n开始读取云数据库模拟数据...');
    let cloudCharacters = [];
    const cloudFilePath = path.join(__dirname, '../../cloudfunctions/import_to_cloud/export_data.json');
    
    if (fs.existsSync(cloudFilePath)) {
      const cloudContent = fs.readFileSync(cloudFilePath, 'utf-8');
      cloudCharacters = JSON.parse(cloudContent);
      console.log(`成功读取 ${cloudCharacters.length} 条云数据库模拟数据`);
    } else {
      console.log('未找到云数据库模拟数据文件，将使用空数据进行检查');
    }
    
    // 3. 检查本地数据内部重复
    console.log('\n开始检查本地数据内部重复...');
    const localDuplicates = [];
    const localSeen = new Map();
    
    localCharacters.forEach((item, index) => {
      const key = `${item.char}-${item.correctPronunciation}`;
      
      if (localSeen.has(key)) {
        const firstItem = localSeen.get(key);
        localDuplicates.push({
          char: item.char,
          correctPronunciation: item.correctPronunciation,
          firstId: firstItem.id,
          firstIndex: firstItem.index + 1,
          duplicateId: item.id,
          duplicateIndex: index + 1
        });
      } else {
        localSeen.set(key, { id: item.id, index });
      }
    });
    
    // 4. 检查本地数据与云数据库重复
    console.log('\n开始检查本地数据与云数据库重复...');
    const cloudDuplicates = [];
    const cloudMap = new Map();
    
    // 创建云数据库数据映射
    cloudCharacters.forEach(item => {
      const key = `${item.char}-${item.correctPronunciation}`;
      cloudMap.set(key, item);
    });
    
    // 检查重复
    localCharacters.forEach((item, index) => {
      const key = `${item.char}-${item.correctPronunciation}`;
      
      if (cloudMap.has(key)) {
        const cloudItem = cloudMap.get(key);
        cloudDuplicates.push({
          char: item.char,
          correctPronunciation: item.correctPronunciation,
          localId: item.id,
          cloudId: cloudItem.id,
          localIndex: index + 1
        });
      }
    });
    
    // 5. 生成报告
    console.log('\n======================================');
    console.log('重复数据核对报告');
    console.log('======================================');
    console.log(`本地数据总量: ${localCharacters.length} 条`);
    console.log(`云数据库数据总量: ${cloudCharacters.length} 条`);
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
    console.log('\n重复数据检查完成，未修改任何文件');
    
  } catch (error) {
    console.error('检查过程中出现错误:', error);
  }
}

// 执行主函数
main();
