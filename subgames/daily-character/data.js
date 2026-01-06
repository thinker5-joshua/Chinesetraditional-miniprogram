// 每日一字汉字数据
// 数据结构：
// id: 字ID
// char: 汉字
// correctPronunciation: 正确读音
// wrongPronunciations: 错误读音列表
// relatedPhrases: 关联词组（合并了原wrongPhrases和relatedPhrases）
// explanation: 字典解释
// errorReasonType: 常见错误原因分类
// difficultyLevel: 测试难度等级（初级、中级、高级、挑战级）

const characters = [
  {
    id: 1,
    char: "长",
    correctPronunciation: "cháng",
    wrongPronunciations: ["zhǎng", "chāng"],
    relatedPhrases: ["长短", "长江", "长城", "长途", "长坂坡", "长年累月"],
    explanation: "长度大；与'短'相对；时间久；长远等",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "中级"
  },
  {
    id: 2,
    char: "着",
    correctPronunciation: "zháo",
    wrongPronunciations: ["zhe", "zhuó", "zhāo"],
    relatedPhrases: ["着凉", "着迷", "着忙", "着慌", "着急", "着火"],
    explanation: "燃烧；接触；感受；陷入等",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "中级"
  },
  {
    id: 3,
    char: "给",
    correctPronunciation: "jǐ",
    wrongPronunciations: ["gěi"],
    relatedPhrases: ["补给", "配给", "自给自足", "给予", "供给"],
    explanation: "供应；富裕；丰足等",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "初级"
  },
  {
    id: 4,
    char: "血",
    correctPronunciation: "xuè",
    wrongPronunciations: ["xiě"],
    relatedPhrases: ["血型", "血压", "血汗", "血迹", "血液", "血管"],
    explanation: "人或动物体内循环系统的液体组织",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "初级"
  },
  {
    id: 5,
    char: "仇",
    correctPronunciation: "qiú",
    wrongPronunciations: ["chóu"],
    relatedPhrases: ["仇池", "仇繇", "姓仇", "仇英"],
    explanation: "姓氏；古地名等",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "高级"
  },
  {
    id: 6,
    char: "龟",
    correctPronunciation: "guī",
    wrongPronunciations: ["jūn", "qiū"],
    relatedPhrases: ["乌龟", "海龟", "龟缩", "龟龄", "龟裂", "龟甲"],
    explanation: "爬行动物的一科，腹背都有硬甲，头尾和脚能缩入甲中",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "中级"
  },
  {
    id: 7,
    char: "巷",
    correctPronunciation: "xiàng",
    wrongPronunciations: ["hàng"],
    relatedPhrases: ["小巷", "陋巷", "巷陌", "巷尾", "巷道", "巷战"],
    explanation: "较窄的街道；胡同",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "初级"
  },
  {
    id: 8,
    char: "薄",
    correctPronunciation: "bó",
    wrongPronunciations: ["báo", "bò"],
    relatedPhrases: ["薄礼", "薄情", "薄命", "薄利多销", "单薄", "薄弱"],
    explanation: "轻微；少；不厚道；轻视等",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "中级"
  },
  {
    id: 9,
    char: "折",
    correctPronunciation: "shé",
    wrongPronunciations: ["zhé", "zhē"],
    relatedPhrases: ["折秤", "折钱", "折本生意", "折本", "折耗"],
    explanation: "亏损；断；弯曲等",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "高级"
  },
  {
    id: 10,
    char: "乘",
    correctPronunciation: "chéng",
    wrongPronunciations: ["shèng"],
    relatedPhrases: ["乘机", "乘客", "乘凉", "乘风破浪", "乘车", "乘法"],
    explanation: "骑；坐；趁；就着；运算方法等",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "初级"
  },
  {
    id: 11,
    char: "涸",
    correctPronunciation: "hé",
    wrongPronunciations: ["gù"],
    relatedPhrases: ["干涸", "涸泽而渔", "涸辙之鲋"],
    explanation: "水干；枯竭",
    errorReasonType: 1, // 形声字误读（声旁误导型）
    difficultyLevel: "中级"
  },
  {
    id: 12,
    char: "哺",
    correctPronunciation: "bǔ",
    wrongPronunciations: ["pǔ"],
    relatedPhrases: ["哺育", "哺乳", "哺养", "哺食"],
    explanation: "喂不会取食的幼儿",
    errorReasonType: 1, // 形声字误读（声旁误导型）
    difficultyLevel: "初级"
  },
  {
    id: 13,
    char: "梏",
    correctPronunciation: "gù",
    wrongPronunciations: ["gào"],
    relatedPhrases: ["桎梏", "梏拲", "梏掠"],
    explanation: "古代木制的手铐",
    errorReasonType: 1, // 形声字误读（声旁误导型）
    difficultyLevel: "高级"
  },
  {
    id: 14,
    char: "提",
    correctPronunciation: "tí",
    wrongPronunciations: ["dī"],
    relatedPhrases: ["提纲", "提高", "提前", "提醒", "提防", "提溜"],
    explanation: "垂手拿着有环、柄或绳套的东西；引领（向上或向前等）",
    errorReasonType: 2, // 形近字混淆（字形相似型）
    difficultyLevel: "初级"
  },
  {
    id: 15,
    char: "沧",
    correctPronunciation: "cāng",
    wrongPronunciations: ["sāng"],
    relatedPhrases: ["沧桑", "沧海", "沧浪", "沧溟"],
    explanation: "暗绿色（指水）",
    errorReasonType: 2, // 形近字混淆（字形相似型）
    difficultyLevel: "初级"
  },
  {
    id: 16,
    char: "弛",
    correctPronunciation: "chí",
    wrongPronunciations: ["chí"],
    relatedPhrases: ["松弛", "弛缓", "弛禁", "弛懈"],
    explanation: "放松；松懈",
    errorReasonType: 2, // 形近字混淆（字形相似型）
    difficultyLevel: "中级"
  },
  {
    id: 17,
    char: "徙",
    correctPronunciation: "xǐ",
    wrongPronunciations: ["tú"],
    relatedPhrases: ["迁徙", "徙居", "徙倚", "徙宅"],
    explanation: "迁移；搬家",
    errorReasonType: 2, // 形近字混淆（字形相似型）
    difficultyLevel: "高级"
  },
  {
    id: 18,
    char: "继",
    correctPronunciation: "jì",
    wrongPronunciations: ["jì"],
    relatedPhrases: ["继往开来", "继续", "继承", "继任"],
    explanation: "连续；接着",
    errorReasonType: 3, // 音近字/同音字混淆（读音相近型）
    difficultyLevel: "初级"
  },
  {
    id: 19,
    char: "洲",
    correctPronunciation: "zhōu",
    wrongPronunciations: ["zhōu"],
    relatedPhrases: ["亚洲", "非洲", "洲际", "沙洲", "州府", "州郡"],
    explanation: "水中的陆地；大陆及其附属岛屿的总称",
    errorReasonType: 3, // 音近字/同音字混淆（读音相近型）
    difficultyLevel: "初级"
  },
  {
    id: 20,
    char: "震",
    correctPronunciation: "zhèn",
    wrongPronunciations: ["zhèn"],
    relatedPhrases: ["震耳欲聋", "震动", "地震", "震惊", "振动", "振臂"],
    explanation: "迅速或剧烈地颤动；震动",
    errorReasonType: 3, // 音近字/同音字混淆（读音相近型）
    difficultyLevel: "中级"
  },
  {
    id: 21,
    char: "更",
    correctPronunciation: "gēng",
    wrongPronunciations: ["gèng"],
    relatedPhrases: ["万象更新", "更改", "更换", "更正", "更加", "更好"],
    explanation: "改变；改换；经历；旧时夜间计时单位",
    errorReasonType: 5, // 字义误解（语境义/古今异义型）
    difficultyLevel: "中级"
  },
  {
    id: 22,
    char: "走",
    correctPronunciation: "zǒu",
    wrongPronunciations: ["zǒu"],
    relatedPhrases: ["走马观花", "走路", "行走", "走漏", "奔跑", "奔走"],
    explanation: "人或鸟兽的脚交互向前移动；跑；离开；去",
    errorReasonType: 5, // 字义误解（语境义/古今异义型）
    difficultyLevel: "高级"
  },
  {
    id: 23,
    char: "辽",
    correctPronunciation: "liáo",
    wrongPronunciations: ["liào"],
    relatedPhrases: ["辽阔", "辽东", "辽国", "辽远"],
    explanation: "远；辽阔；朝代名",
    errorReasonType: 6, // 偏僻字/生僻字（使用频率极低型）
    difficultyLevel: "初级"
  },
  {
    id: 24,
    char: "澜",
    correctPronunciation: "lán",
    wrongPronunciations: ["làn"],
    relatedPhrases: ["波澜", "涟漪", "狂澜", "澜倒波随"],
    explanation: "大波浪",
    errorReasonType: 6, // 偏僻字/生僻字（使用频率极低型）
    difficultyLevel: "中级"
  },
  {
    id: 25,
    char: "璇",
    correctPronunciation: "xuán",
    wrongPronunciations: ["xuàn", "zhuàn"],
    relatedPhrases: ["璇玑", "璇宫", "璇室", "璇玉"],
    explanation: "美玉",
    errorReasonType: 6, // 偏僻字/生僻字（使用频率极低型）
    difficultyLevel: "高级"
  },
  {
    id: 26,
    char: "瑰",
    correctPronunciation: "guī",
    wrongPronunciations: ["guì"],
    relatedPhrases: ["玫瑰", "瑰宝", "瑰丽", "瑰奇"],
    explanation: "珍奇；美丽",
    errorReasonType: 6, // 偏僻字/生僻字（使用频率极低型）
    difficultyLevel: "初级"
  },
  {
    id: 27,
    char: "貔",
    correctPronunciation: "pí",
    wrongPronunciations: ["bǐ", "pì"],
    relatedPhrases: ["貔貅", "貔虎", "貔武"],
    explanation: "传说中的一种猛兽",
    errorReasonType: 6, // 偏僻字/生僻字（使用频率极低型）
    difficultyLevel: "挑战级"
  },
  {
    id: 28,
    char: "餮",
    correctPronunciation: "tiè",
    wrongPronunciations: ["tāo", "tiǎn"],
    relatedPhrases: ["饕餮", "餮富", "餮切"],
    explanation: "传说中的一种凶恶贪食的野兽",
    errorReasonType: 6, // 偏僻字/生僻字（使用频率极低型）
    difficultyLevel: "挑战级"
  },
  {
    id: 29,
    char: "载",
    correctPronunciation: "zǎi",
    wrongPronunciations: ["zài"],
    relatedPhrases: ["记载", "载重", "载体", "载歌载舞", "三年五载", "满载而归"],
    explanation: "记录；刊登；年",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "中级"
  },
  {
    id: 30,
    char: "倔",
    correctPronunciation: "jué",
    wrongPronunciations: ["juè"],
    relatedPhrases: ["倔强", "倔脾气", "倔头倔脑", "倔犟"],
    explanation: "刚强；不屈服",
    errorReasonType: 4, // 多音字误读（语境依赖型）
    difficultyLevel: "初级"
  }
];

module.exports = {
  characters
};