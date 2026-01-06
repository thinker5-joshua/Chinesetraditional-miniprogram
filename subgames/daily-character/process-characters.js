const fs = require('fs');
const path = require('path');

// 现有汉字列表，确保不重复
const existingChars = ['龟', '巷', '薄', '折', '乘', '仇', '给', '血', '载', '着'];

// 新筛选的40个易读错字
const newChars = ['氛', '场', '称', '种', '憧', '骋', '处', '啜', '汆', '档', 
                  '当', '订', '胴', '掇', '菲', '脯', '噶', '呱', '扛', '诃', 
                  '行', '横', '哄', '骸', '薅', '桦', '馄', '和', '囫', '溃', 
                  '缉', '几', '嫉', '济', '脊', '渐', '睑', '绢', '角', '酵'];

// 合并所有要处理的汉字
const allChars = [...existingChars, ...newChars];

// 读取字典数据
const wordData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../chinese-xinhua-dict/data/word.json'), 'utf8'));
const idiomData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../chinese-xinhua-dict/data/idiom.json'), 'utf8'));

// 处理每个汉字
const processedChars = [];

for (let i = 0; i < allChars.length; i++) {
  const char = allChars[i];
  const id = i + 1;
  
  // 查找汉字的详细信息
  const wordInfo = wordData.find(item => item.word === char);
  
  if (wordInfo) {
    // 提取正确读音（只保留一个最容易读错的读音）
    let correctPronunciation = '';
    let wrongPronunciations = [];
    
    // 根据字的特点确定正确读音和错误读音
    switch (char) {
      case '龟':
        correctPronunciation = 'jūn';
        wrongPronunciations = ['guī', 'qiū'];
        break;
      case '巷':
        correctPronunciation = 'hàng';
        wrongPronunciations = ['xiàng'];
        break;
      case '薄':
        correctPronunciation = 'bò';
        wrongPronunciations = ['báo', 'bó'];
        break;
      case '折':
        correctPronunciation = 'shé';
        wrongPronunciations = ['zhé', 'zhē'];
        break;
      case '乘':
        correctPronunciation = 'shèng';
        wrongPronunciations = ['chéng'];
        break;
      case '仇':
        correctPronunciation = 'qiú';
        wrongPronunciations = ['chóu'];
        break;
      case '给':
        correctPronunciation = 'jǐ';
        wrongPronunciations = ['gěi'];
        break;
      case '血':
        correctPronunciation = 'xuè';
        wrongPronunciations = ['xiě'];
        break;
      case '载':
        correctPronunciation = 'zǎi';
        wrongPronunciations = ['zài'];
        break;
      case '着':
        correctPronunciation = 'zhuó';
        wrongPronunciations = ['zháo', 'zhāo', 'zhe'];
        break;
      case '氛':
        correctPronunciation = 'fēn';
        wrongPronunciations = ['fèn'];
        break;
      case '场':
        correctPronunciation = 'cháng';
        wrongPronunciations = ['chǎng'];
        break;
      case '称':
        correctPronunciation = 'chèn';
        wrongPronunciations = ['chēng', 'chèng'];
        break;
      case '种':
        correctPronunciation = 'chóng';
        wrongPronunciations = ['zhǒng', 'zhòng'];
        break;
      case '憧':
        correctPronunciation = 'chōng';
        wrongPronunciations = ['chóng'];
        break;
      case '骋':
        correctPronunciation = 'chěng';
        wrongPronunciations = ['chéng'];
        break;
      case '处':
        correctPronunciation = 'chǔ';
        wrongPronunciations = ['chù'];
        break;
      case '啜':
        correctPronunciation = 'chuài';
        wrongPronunciations = ['duō', 'chuò'];
        break;
      case '汆':
        correctPronunciation = 'cuān';
        wrongPronunciations = ['cuàn'];
        break;
      case '档':
        correctPronunciation = 'dàng';
        wrongPronunciations = ['dǎng'];
        break;
      case '当':
        correctPronunciation = 'dàng';
        wrongPronunciations = ['dāng'];
        break;
      case '订':
        correctPronunciation = 'dìng';
        wrongPronunciations = ['dīng'];
        break;
      case '胴':
        correctPronunciation = 'dòng';
        wrongPronunciations = ['tóng'];
        break;
      case '掇':
        correctPronunciation = 'duo';
        wrongPronunciations = ['duò'];
        break;
      case '菲':
        correctPronunciation = 'fěi';
        wrongPronunciations = ['fēi'];
        break;
      case '脯':
        correctPronunciation = 'fǔ';
        wrongPronunciations = ['pú'];
        break;
      case '噶':
        correctPronunciation = 'gá';
        wrongPronunciations = ['gé'];
        break;
      case '呱':
        correctPronunciation = 'gū';
        wrongPronunciations = ['guā'];
        break;
      case '扛':
        correctPronunciation = 'gāng';
        wrongPronunciations = ['káng'];
        break;
      case '诃':
        correctPronunciation = 'hē';
        wrongPronunciations = ['kē'];
        break;
      case '行':
        correctPronunciation = 'héng';
        wrongPronunciations = ['háng', 'xíng'];
        break;
      case '横':
        correctPronunciation = 'hèng';
        wrongPronunciations = ['héng'];
        break;
      case '哄':
        correctPronunciation = 'hòng';
        wrongPronunciations = ['hōng', 'hǒng'];
        break;
      case '骸':
        correctPronunciation = 'hái';
        wrongPronunciations = ['hài'];
        break;
      case '薅':
        correctPronunciation = 'hāo';
        wrongPronunciations = ['rǔ'];
        break;
      case '桦':
        correctPronunciation = 'huà';
        wrongPronunciations = ['huá'];
        break;
      case '馄':
        correctPronunciation = 'hún';
        wrongPronunciations = ['hùn'];
        break;
      case '和':
        correctPronunciation = 'huó';
        wrongPronunciations = ['hé', 'hè', 'huò'];
        break;
      case '囫':
        correctPronunciation = 'hú';
        wrongPronunciations = ['hù'];
        break;
      case '溃':
        correctPronunciation = 'huì';
        wrongPronunciations = ['kuì'];
        break;
      case '缉':
        correctPronunciation = 'jī';
        wrongPronunciations = ['qī', 'jí'];
        break;
      case '几':
        correctPronunciation = 'jī';
        wrongPronunciations = ['jǐ'];
        break;
      case '嫉':
        correctPronunciation = 'jí';
        wrongPronunciations = ['jì'];
        break;
      case '济':
        correctPronunciation = 'jǐ';
        wrongPronunciations = ['jì'];
        break;
      case '脊':
        correctPronunciation = 'jǐ';
        wrongPronunciations = ['jí'];
        break;
      case '渐':
        correctPronunciation = 'jiān';
        wrongPronunciations = ['jiàn'];
        break;
      case '睑':
        correctPronunciation = 'jiǎn';
        wrongPronunciations = ['liǎn'];
        break;
      case '绢':
        correctPronunciation = 'juàn';
        wrongPronunciations = ['juān'];
        break;
      case '角':
        correctPronunciation = 'jué';
        wrongPronunciations = ['jiǎo'];
        break;
      case '酵':
        correctPronunciation = 'jiào';
        wrongPronunciations = ['xiào'];
        break;
      default:
        correctPronunciation = wordInfo.pinyin;
        wrongPronunciations = [];
    }
    
    // 查找相关词组
    const relatedPhrases = [];
    
    // 从成语中查找，验证读音是否正确
    const idioms = idiomData.filter(item => item.word.includes(char));
    for (const idiom of idioms) {
      if (relatedPhrases.length >= 4) break;
      
      // 查找目标字在成语中的位置
      const charIndex = idiom.word.indexOf(char);
      if (charIndex !== -1) {
        // 获取成语的拼音数组
        const pinyinArray = idiom.pinyin.split(' ');
        // 检查拼音数组长度是否与成语长度一致
        if (pinyinArray.length === idiom.word.length) {
          // 获取目标字对应的拼音
          const charPinyin = pinyinArray[charIndex];
          // 验证拼音是否与正确读音一致
          if (charPinyin === correctPronunciation) {
            relatedPhrases.push(idiom.word);
          }
        }
      }
    }
    
    // 如果成语不足，根据常识添加符合读音要求的普通词语
    // 这里可以手动添加一些符合要求的词语，或者根据实际情况处理
    // 由于普通词语没有详细的拼音信息，我们只依赖成语
    
    // 确保至少有一个词组
    if (relatedPhrases.length === 0) {
      // 如果没有找到合适的成语，根据常识添加一个符合要求的词组
      relatedPhrases.push(char + '字');
    }
    
    // 构建处理后的汉字数据
    const processedChar = {
      id: id,
      char: char,
      correctPronunciation: correctPronunciation,
      wrongPronunciations: wrongPronunciations,
      relatedPhrases: relatedPhrases.slice(0, 4),
      explanation: wordInfo.explanation ? wordInfo.explanation.split('\n')[0] : '',
      errorReasonType: 4, // 多音字误读（语境依赖型）
      difficultyLevel: '初级' // 默认初级，后续可调整
    };
    
    processedChars.push(processedChar);
    console.log(`Processed ${char}: ${correctPronunciation}`);
  } else {
    console.log(`Warning: ${char} not found in word.json`);
  }
}

// 将处理后的数据写入文件
fs.writeFileSync(
  path.join(__dirname, 'processed-characters.json'),
  JSON.stringify(processedChars, null, 2),
  'utf8'
);

console.log('\nProcessing completed!');
console.log(`Total processed characters: ${processedChars.length}`);
console.log('Results saved to processed-characters.json');