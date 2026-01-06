// 每日一字汉字数据 - 优化版
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
    "id": 1,
    "char": "龟",
    "correctPronunciation": "jūn",
    "wrongPronunciations": [
      "guī",
      "qiū"
    ],
    "relatedPhrases": [
      "龟裂",
      "龟手"
    ],
    "explanation": "龟（jūn）：同\"皲\"，皮肤因寒冷或干燥而裂开。如：龟裂。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 2,
    "char": "巷",
    "correctPronunciation": "hàng",
    "wrongPronunciations": [
      "xiàng"
    ],
    "relatedPhrases": [
      "巷道",
      "平巷",
      "矿巷"
    ],
    "explanation": "巷（hàng）：巷道，采矿或探矿时挖的坑道。如：矿巷。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 3,
    "char": "薄",
    "correctPronunciation": "bò",
    "wrongPronunciations": [
      "báo",
      "bó"
    ],
    "relatedPhrases": [
      "薄荷",
      "薄荷脑",
      "薄荷叶"
    ],
    "explanation": "薄（bò）：多年生草本植物，茎叶有清凉香气，可入药。如：薄荷。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 4,
    "char": "折",
    "correctPronunciation": "shé",
    "wrongPronunciations": [
      "zhé",
      "zhē"
    ],
    "relatedPhrases": [
      "折本",
      "树枝折了",
      "折耗",
      "折本而归"
    ],
    "explanation": "断（多用于长条形的东西）：树枝～了。桌子腿撞～了。亏损：～本儿。～耗。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 5,
    "char": "乘",
    "correctPronunciation": "shèng",
    "wrongPronunciations": [
      "chéng"
    ],
    "relatedPhrases": [
      "千乘之国",
      "万乘之君"
    ],
    "explanation": "乘（shèng）：古代称兵车，四马一车为一乘。如：千乘之国。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 6,
    "char": "仇",
    "correctPronunciation": "qiú",
    "wrongPronunciations": [
      "chóu"
    ],
    "relatedPhrases": [
      "仇英",
      "仇池",
      "仇由",
      "仇览"
    ],
    "explanation": "仇（qiú）：姓氏。如：仇英（明代画家）。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 7,
    "char": "给",
    "correctPronunciation": "jǐ",
    "wrongPronunciations": [
      "gěi"
    ],
    "relatedPhrases": [
      "呼不给吸",
      "家给民足",
      "家给人足",
      "目不暇给"
    ],
    "explanation": "表示供给、丰足、接续等义，属于文言用法",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 8,
    "char": "血",
    "correctPronunciation": "xuè",
    "wrongPronunciations": [
      "xiě"
    ],
    "relatedPhrases": [
      "血液",
      "血缘",
      "碧血丹心",
      "兵不血刃"
    ],
    "explanation": "多用于书面语、成语和双音词中，如血液、血缘、血雨腥风等",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 9,
    "char": "载",
    "correctPronunciation": "zǎi",
    "wrongPronunciations": [
      "zài"
    ],
    "relatedPhrases": [
      "百载树人",
      "饿莩载道",
      "跗萼载韡"
    ],
    "explanation": "年（百载）、充满（载道）。 ",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 10,
    "char": "着",
    "correctPronunciation": "zhuó",
    "wrongPronunciations": [
      "zháo",
      "zhāo",
      "zhe"
    ],
    "relatedPhrases": [
      "不着边际",
      "不着疼热"
    ],
    "explanation": "表示接触、达到、感受、用于古语、书面语",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 11,
    "char": "氛",
    "correctPronunciation": "fēn",
    "wrongPronunciations": [
      "fèn"
    ],
    "relatedPhrases": [
      "氛围",
      "气氛",
      "氛氲"
    ],
    "explanation": "氛（fēn）：周围的气氛或情调。如：氛围。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 12,
    "char": "场",
    "correctPronunciation": "cháng",
    "wrongPronunciations": [
      "chǎng"
    ],
    "relatedPhrases": [
      "矮人观场",
      "打谷场",
      "膏场绣浍"
    ],
    "explanation": "农业场地、田野、古义空地\t多用于农村、古语、成语 ",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 13,
    "char": "称",
    "correctPronunciation": "chèn",
    "wrongPronunciations": [
      "chēng",
      "chèng"
    ],
    "relatedPhrases": [
      "称心快意",
      "称心满意"
    ],
    "explanation": "表示符合、适合，指心意完全契合、满意。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 14,
    "char": "种",
    "correctPronunciation": "chóng",
    "wrongPronunciations": [
      "zhǒng",
      "zhòng"
    ],
    "relatedPhrases": [
      "种放",
      "种暠",
      "种谔",
      "种师道"
    ],
    "explanation": "种（chóng）：姓。如：种放（宋代学者）。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 15,
    "char": "处",
    "correctPronunciation": "chǔ",
    "wrongPronunciations": [
      "chù"
    ],
    "relatedPhrases": [
      "安常处顺",
      "处世之道",
      "抱法处势",
      "不遑宁处"
    ],
    "explanation": "在文言和成语中，处读chǔ，作动词使用，表示以下含义：处于、安于（强调状态），处理、安置（强调动作）",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 16,
    "char": "汆",
    "correctPronunciation": "cuān",
    "wrongPronunciations": [
      "cuàn"
    ],
    "relatedPhrases": [
      "汆丸子",
      "汆汤",
      "汆白肉",
      "汆鱼"
    ],
    "explanation": "汆（cuān）：把食物放到沸水里稍微一煮。如：汆丸子。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 17,
    "char": "档",
    "correctPronunciation": "dàng",
    "wrongPronunciations": [
      "dǎng"
    ],
    "relatedPhrases": [
      "一搭一档",
      "档案",
      "档期",
      "档位"
    ],
    "explanation": "量词/名词\t成套事物（文件、时间、分界）",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 18,
    "char": "当",
    "correctPronunciation": "dàng",
    "wrongPronunciations": [
      "dāng"
    ],
    "relatedPhrases": [
      "当仁不让",
      "安步当车",
      "长歌当哭",
      "大而无当"
    ],
    "explanation": "表当作，文言用法，仅用于成语、固定搭配。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 19,
    "char": "胴",
    "correctPronunciation": "dòng",
    "wrongPronunciations": [
      "tóng"
    ],
    "relatedPhrases": [
      "胴体"
    ],
    "explanation": "胴（dòng）：躯干（多指人或动物）如：胴体。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 20,
    "char": "掇",
    "correctPronunciation": "duō",
    "wrongPronunciations": [
      "duò"
    ],
    "relatedPhrases": [
      "掇拾",
      "掇弄",
      "拾掇无遗"
    ],
    "explanation": "拾取；搬动。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 21,
    "char": "菲",
    "correctPronunciation": "fěi",
    "wrongPronunciations": [
      "fēi"
    ],
    "relatedPhrases": [
      "妄自菲薄",
      "菲食薄衣",
      "躬自菲薄",
      "卑宫菲食"
    ],
    "explanation": "古汉语中表微薄、简陋，固定读 fěi（第三声），与菲读 fēi（第一声，如芳菲）无关。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 22,
    "char": "噶",
    "correctPronunciation": "gá",
    "wrongPronunciations": [
      "gé"
    ],
    "relatedPhrases": [
      "噶布伦",
      "噶伦",
      "萨噶达娃节",
      "噶厦"
    ],
    "explanation": "藏语借词用字（例：噶伦、噶厦）。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 23,
    "char": "呱",
    "correctPronunciation": "gū",
    "wrongPronunciations": [
      "guā"
    ],
    "relatedPhrases": [
      "呱呱坠地",
      "呱呱而泣",
      "呱呱声",
      "呱呱叫"
    ],
    "explanation": "呱（gū）：拟声词，形容婴儿的哭声。如：呱呱坠地。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 24,
    "char": "诃",
    "correctPronunciation": "hē",
    "wrongPronunciations": [
      "kē"
    ],
    "relatedPhrases": [
      "诃佛诋巫",
      "诃佛骂祖"
    ],
    "explanation": "同呵，大声斥责、责骂。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 25,
    "char": "哄",
    "correctPronunciation": "hòng",
    "wrongPronunciations": [
      "hōng",
      "hǒng"
    ],
    "relatedPhrases": [
      "起哄",
      "一哄而起",
      "哄抢",
      "撮科打哄"
    ],
    "explanation": "吵闹，搅扰；开玩笑",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 26,
    "char": "骸",
    "correctPronunciation": "hái",
    "wrongPronunciations": [
      "hài"
    ],
    "relatedPhrases": [
      "骸骨",
      "放浪形骸",
      "残骸",
      "四肢百骸"
    ],
    "explanation": "本义为胫骨（小腿骨），后引申为人体骨骼的总称，再进一步引申为身体的代称。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 27,
    "char": "薅",
    "correctPronunciation": "hāo",
    "wrongPronunciations": [
      "rǔ"
    ],
    "relatedPhrases": [
      "薅草",
      "薅苗",
      "薅羊毛",
      "薅锄"
    ],
    "explanation": "薅（hāo）：用手拔（草等）。如：薅草。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 28,
    "char": "桦",
    "correctPronunciation": "huà",
    "wrongPronunciations": [
      "huá"
    ],
    "relatedPhrases": [
      "白桦",
      "桦树",
      "桦木",
      "桦林"
    ],
    "explanation": "桦（huà）：落叶乔木或灌木，树皮白色、灰色、黄色或黑色，有的光滑，有的开裂。木材致密，可制器具。如：白桦。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 29,
    "char": "馄",
    "correctPronunciation": "hún",
    "wrongPronunciations": [
      "hùn"
    ],
    "relatedPhrases": [
      "馄饨",
      "馄钝",
      "云吞",
      "馄饨面"
    ],
    "explanation": "馄（hún）：〔馄饨〕一种面食，用薄面片包上馅儿，煮熟后带汤吃。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 30,
    "char": "和",
    "correctPronunciation": "huó",
    "wrongPronunciations": [
      "hé",
      "hè",
      "huò"
    ],
    "relatedPhrases": [
      "和面",
      "和泥",
      "和面团",
      "和稀泥"
    ],
    "explanation": "和（huó）：在粉状物中加液体搅拌或揉弄使有黏性。如：和面。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 31,
    "char": "囫",
    "correctPronunciation": "hú",
    "wrongPronunciations": [
      "hù"
    ],
    "relatedPhrases": [
      "囫囵半片",
      "囫囵觉",
      "囫囵吞枣"
    ],
    "explanation": "本义为整个的、完全不缺。常与囵组成囫囵一词，表示完整无缺的状态。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 32,
    "char": "溃",
    "correctPronunciation": "huì",
    "wrongPronunciations": [
      "kuì"
    ],
    "relatedPhrases": [
      "溃脓",
      "溃脓",
      "溃破",
      "溃疡"
    ],
    "explanation": "在医学语境中（如溃脓）必须读作huì，而在其他语境（如溃烂、溃败）中读作kuì。这是汉语中典型的多音字在不同语境下读音不同的现象。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 33,
    "char": "缉",
    "correctPronunciation": "jī",
    "wrongPronunciations": [
      "qī",
      "jí"
    ],
    "relatedPhrases": [
      "挨风缉缝"
    ],
    "explanation": "缉 ",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 34,
    "char": "几",
    "correctPronunciation": "jī",
    "wrongPronunciations": [
      "jǐ"
    ],
    "relatedPhrases": [
      "窗明几净",
      "堆案盈几",
      "极深研几",
      "几不欲生"
    ],
    "explanation": "几 ",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 35,
    "char": "嫉",
    "correctPronunciation": "jí",
    "wrongPronunciations": [
      "jì"
    ],
    "relatedPhrases": [
      "妒贤嫉能",
      "忿世嫉俗",
      "愤世嫉俗",
      "刚肠嫉恶"
    ],
    "explanation": "嫉 ",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 36,
    "char": "济",
    "correctPronunciation": "jǐ",
    "wrongPronunciations": [
      "jì"
    ],
    "relatedPhrases": [
      "彬彬济济",
      "材优干济",
      "济济一堂",
      "人才济济"
    ],
    "explanation": "济 ",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 37,
    "char": "脊",
    "correctPronunciation": "jǐ",
    "wrongPronunciations": [
      "jí"
    ],
    "relatedPhrases": [
      "飞檐走脊"
    ],
    "explanation": "脊 ",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 38,
    "char": "渐",
    "correctPronunciation": "jiān",
    "wrongPronunciations": [
      "jiàn"
    ],
    "relatedPhrases": [
      "渐染",
      "渐渍",
      "渐摩",
      "渐涵"
    ],
    "explanation": "渐（jiān）：浸；流入。如：渐染。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 39,
    "char": "睑",
    "correctPronunciation": "jiǎn",
    "wrongPronunciations": [
      "liǎn"
    ],
    "relatedPhrases": [
      "眼睑",
      "睑裂",
      "睑腺炎",
      "上睑"
    ],
    "explanation": "睑（jiǎn）：眼皮。如：眼睑。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 40,
    "char": "绢",
    "correctPronunciation": "juàn",
    "wrongPronunciations": [
      "juān"
    ],
    "relatedPhrases": [
      "黄绢幼妇"
    ],
    "explanation": "绢 ",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 41,
    "char": "角",
    "correctPronunciation": "jué",
    "wrongPronunciations": [
      "jiǎo"
    ],
    "relatedPhrases": [
      "埒才角妙",
      "以宫笑角"
    ],
    "explanation": "角〈名〉",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 42,
    "char": "酵",
    "correctPronunciation": "jiào",
    "wrongPronunciations": [
      "xiào"
    ],
    "relatedPhrases": [
      "发酵",
      "酵母",
      "酵母菌",
      "发酵粉"
    ],
    "explanation": "酵（jiào）：有机物由于某些菌或酶而分解称“发酵”。能使有机物发酵的真菌称“酵母菌”。亦称“酵母”、“酿母”。",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  }
];

module.exports = {
  characters
};