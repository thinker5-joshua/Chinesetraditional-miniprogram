const fs = require('fs');
const path = require('path');
const OpenCC = require('opencc-js');

// 读取原始诗词数据
const poemsDataPath = path.join(__dirname, 'poems_data.js');
const backupPath = path.join(__dirname, 'poems_data_backup.js');

console.log('正在读取诗词数据...');
const originalData = require(poemsDataPath);

// 备份原始数据
console.log('正在备份原始数据...');
fs.writeFileSync(backupPath, fs.readFileSync(poemsDataPath, 'utf8'));

console.log('开始转换繁体中文到简体中文...');

// 创建转换实例：香港繁体中文转简体中文
const converter = OpenCC.Converter({ from: 'hk', to: 'cn' });

// 转换诗词数据
const simplifiedData = {
  poems: originalData.poems.map(poem => {
    return {
      ...poem,
      title: converter(poem.title),
      author: converter(poem.author),
      content: converter(poem.content),
      reason: converter(poem.reason)
    };
  })
};

// 写入转换后的数据
console.log('正在写入转换后的数据...');
const outputContent = `module.exports = ${JSON.stringify(simplifiedData, null, 2)}`;
fs.writeFileSync(poemsDataPath, outputContent, 'utf8');

console.log('转换完成！');
console.log('备份文件：', backupPath);
console.log('转换后文件：', poemsDataPath);
