const data = require('./data-optimized.js');
const fs = require('fs');

let content = '# 易读错字检查列表\n\n以下是50个易读错字的详细信息，包括正确读音、常见错误读音、相关词组等：\n\n';

data.characters.forEach((char, index) => {
  content += `${index + 1}. 字：${char.char}\n`;
  content += `   正确读音：${char.correctPronunciation}\n`;
  content += `   常见错误读音：${char.wrongPronunciations.join('、')}\n`;
  content += `   相关词组：${char.relatedPhrases.join('、')}\n`;
  content += `   解释：${char.explanation}\n`;
  content += `   错误类型：${char.errorReasonType === 4 ? '多音字误读（语境依赖型）' : char.errorReasonType}\n`;
  content += `   难度等级：${char.difficultyLevel}\n\n`;
});

fs.writeFileSync('character-list.txt', content);
console.log('易读错字检查列表已生成！');
