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
      "目不暇给",
      "供给"
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
      "跗萼载韡",
      "千载难逢"
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
      "不着疼热",
      "着想"
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
    "explanation": "农业场地、田野、古义空地	多用于农村、古语、成语 ",
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
      "称心满意",
      "称心",
      "匀称"
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
      "不遑宁处",
      "处女"
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
    "explanation": "量词/名词	成套事物（文件、时间、分界）",
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
      "卑宫菲食",
      "菲薄"
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
      "诃佛骂祖",
      "契诃夫"
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
      "hài",
      "hǎi"
    ],
    "relatedPhrases": [
      "骸骨",
      "放浪形骸",
      "残骸",
      "四肢百骸",
      "骨骸"
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
      "桦林",
      "白桦树"
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
      "挨风缉缝",
      "通缉"
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
      "刚肠嫉恶",
      "嫉妒"
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
  },
  {
    "id": 38,
    "char": "塞",
    "correctPronunciation": "sè",
    "wrongPronunciations": [
      "sāi",
      "sài"
    ],
    "relatedPhrases": [
      "堵塞",
      "闭目塞听",
      "不塞不流",
      "敷衍塞责",
      "茅塞顿开"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 39,
    "char": "匕",
    "correctPronunciation": "bǐ",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "匕首"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 40,
    "char": "羼",
    "correctPronunciation": "chàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "羼水"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 41,
    "char": "哄",
    "correctPronunciation": "hǒng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "哄骗"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 42,
    "char": "憧",
    "correctPronunciation": "chōng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "憧憬"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 43,
    "char": "模",
    "correctPronunciation": "mú",
    "wrongPronunciations": [
      "mó"
    ],
    "relatedPhrases": [
      "模样",
      "一模一样"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 44,
    "char": "讪",
    "correctPronunciation": "shàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "讪笑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 45,
    "char": "龋",
    "correctPronunciation": "qǔ",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "龋齿"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 46,
    "char": "骁",
    "correctPronunciation": "xiāo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "骁勇"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 47,
    "char": "枢",
    "correctPronunciation": "shū",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "枢纽"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 48,
    "char": "谮",
    "correctPronunciation": "zèn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "谮言"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 49,
    "char": "札",
    "correctPronunciation": "zhá",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "札记"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 50,
    "char": "轴",
    "correctPronunciation": "zhòu",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "压轴"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 51,
    "char": "睑",
    "correctPronunciation": "jiǎn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "眼睑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 52,
    "char": "纂",
    "correctPronunciation": "zuǎn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "编纂"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 53,
    "char": "髓",
    "correctPronunciation": "suǐ",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "精髓"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 54,
    "char": "坯",
    "correctPronunciation": "pī",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "土坯"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 55,
    "char": "畦",
    "correctPronunciation": "qí",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "菜畦"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 56,
    "char": "淖",
    "correctPronunciation": "nào",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "泥淖"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 57,
    "char": "脯",
    "correctPronunciation": "fǔ",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "果脯"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 58,
    "char": "轧",
    "correctPronunciation": "yà",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "倾轧"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 59,
    "char": "累",
    "correctPronunciation": "lěi",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "连累"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 60,
    "char": "哑",
    "correctPronunciation": "yin",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "喑哑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 61,
    "char": "辍",
    "correctPronunciation": "chuò",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "辍学"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 62,
    "char": "臭",
    "correctPronunciation": "xiù",
    "wrongPronunciations": [
      "chòu"
    ],
    "relatedPhrases": [
      "乳臭",
      "乳臭未干"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 63,
    "char": "诘",
    "correctPronunciation": "jié",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "诘问"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 64,
    "char": "啜",
    "correctPronunciation": "chuò",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "啜泣"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 65,
    "char": "撷",
    "correctPronunciation": "xié",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "采撷"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 66,
    "char": "凿",
    "correctPronunciation": "záo",
    "wrongPronunciations": [
      "zuò"
    ],
    "relatedPhrases": [
      "确凿",
      "确凿不移"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 67,
    "char": "憔",
    "correctPronunciation": "qiáo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "憔悴"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 68,
    "char": "脊",
    "correctPronunciation": "jǐ",
    "wrongPronunciations": [
      "jī"
    ],
    "relatedPhrases": [
      "脊梁",
      "里脊"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 69,
    "char": "渍",
    "correctPronunciation": "zì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "浸渍"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 70,
    "char": "俭",
    "correctPronunciation": "jiǎn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "勤俭"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 71,
    "char": "否",
    "correctPronunciation": "pǐ",
    "wrongPronunciations": [
      "fǒu"
    ],
    "relatedPhrases": [
      "臧否",
      "否极泰来"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 72,
    "char": "勘",
    "correctPronunciation": "kān",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "校勘"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 73,
    "char": "拯",
    "correctPronunciation": "zhěng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "拯救"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 74,
    "char": "笺",
    "correctPronunciation": "jiān",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "信笺"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 75,
    "char": "贮",
    "correctPronunciation": "zhù",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "贮存"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 76,
    "char": "忏",
    "correctPronunciation": "chàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "忏悔"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 77,
    "char": "勾",
    "correctPronunciation": "gòu",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "勾当"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 78,
    "char": "佣",
    "correctPronunciation": "yōng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "佣人"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 79,
    "char": "曳",
    "correctPronunciation": "yè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "摇曳"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 80,
    "char": "喟",
    "correctPronunciation": "kuì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "感喟"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 81,
    "char": "诣",
    "correctPronunciation": "yì",
    "wrongPronunciations": [
      "zhǐ"
    ],
    "relatedPhrases": [
      "造诣",
      "苦心孤诣"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 82,
    "char": "傀",
    "correctPronunciation": "kuǐ",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "傀儡"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 83,
    "char": "魇",
    "correctPronunciation": "yǎn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "梦魇"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 84,
    "char": "括",
    "correctPronunciation": "kuò",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "囊括"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 85,
    "char": "赝",
    "correctPronunciation": "yàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "赝品"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 86,
    "char": "瞰",
    "correctPronunciation": "kàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "鸟瞰"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 87,
    "char": "靥",
    "correctPronunciation": "yè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "笑靥"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 88,
    "char": "恪",
    "correctPronunciation": "kè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "恪守"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 89,
    "char": "忖",
    "correctPronunciation": "cǔn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "忖度"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 90,
    "char": "度",
    "correctPronunciation": "duó",
    "wrongPronunciations": [
      "dù"
    ],
    "relatedPhrases": [
      "忖度",
      "审时度势"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 91,
    "char": "稂",
    "correctPronunciation": "láng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "稂莠"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 92,
    "char": "莠",
    "correctPronunciation": "yǒu",
    "wrongPronunciations": [
      "xiù"
    ],
    "relatedPhrases": [
      "稂莠",
      "不稂不莠",
      "良莠不齐"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 93,
    "char": "弦",
    "correctPronunciation": "xián",
    "wrongPronunciations": [
      "xuán"
    ],
    "relatedPhrases": [
      "弓弦",
      "改弦更张"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 94,
    "char": "岚",
    "correctPronunciation": "lán",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "山岚"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 95,
    "char": "黠",
    "correctPronunciation": "xiá",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "狡黠"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 96,
    "char": "罹",
    "correctPronunciation": "lí",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "罹难"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 97,
    "char": "酗",
    "correctPronunciation": "xù",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "酗酒"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 98,
    "char": "繆",
    "correctPronunciation": "móu",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "绸繆"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 99,
    "char": "檄",
    "correctPronunciation": "xí",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "檄文"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 100,
    "char": "脉",
    "correctPronunciation": "mò",
    "wrongPronunciations": [
      "mài"
    ],
    "relatedPhrases": [
      "脉脉",
      "含情脉脉"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 101,
    "char": "暇",
    "correctPronunciation": "xiá",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "闲暇"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 102,
    "char": "袂",
    "correctPronunciation": "mèi",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "联袂"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 103,
    "char": "谑",
    "correctPronunciation": "xuè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "戏谑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 104,
    "char": "懑",
    "correctPronunciation": "mèn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "愤懑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 105,
    "char": "辖",
    "correctPronunciation": "xiá",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "辖制"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 106,
    "char": "谬",
    "correctPronunciation": "miù",
    "wrongPronunciations": [
      "miào"
    ],
    "relatedPhrases": [
      "荒谬",
      "大谬不然"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 107,
    "char": "兴",
    "correctPronunciation": "xīng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "兴奋"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 108,
    "char": "霾",
    "correctPronunciation": "mái",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "阴霾"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 109,
    "char": "淆",
    "correctPronunciation": "xiáo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "混淆"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 110,
    "char": "赧",
    "correctPronunciation": "nǎn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "羞赧"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 111,
    "char": "噱",
    "correctPronunciation": "xué",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "噱头"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 112,
    "char": "懦",
    "correctPronunciation": "nuò",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "怯懦"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 113,
    "char": "斡",
    "correctPronunciation": "wò",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "斡旋"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 114,
    "char": "拗",
    "correctPronunciation": "niù",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "执拗"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 115,
    "char": "娲",
    "correctPronunciation": "wā",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "女娲"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 116,
    "char": "馁",
    "correctPronunciation": "něi",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "气馁"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 117,
    "char": "挞",
    "correctPronunciation": "tà",
    "wrongPronunciations": [
      "dá"
    ],
    "relatedPhrases": [
      "鞭挞",
      "大张挞伐"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 118,
    "char": "酝",
    "correctPronunciation": "yùn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "酝酿"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 119,
    "char": "酿",
    "correctPronunciation": "niàng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "酝酿"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 120,
    "char": "帖",
    "correctPronunciation": "tiè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "字帖"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 121,
    "char": "拈",
    "correctPronunciation": "nian",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "拈轻"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 122,
    "char": "迢",
    "correctPronunciation": "tiáo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "迢迢"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 123,
    "char": "捺",
    "correctPronunciation": "nà",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "按捺"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 124,
    "char": "湍",
    "correctPronunciation": "tuān",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "湍急"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 125,
    "char": "炮",
    "correctPronunciation": "páo",
    "wrongPronunciations": [
      "pào"
    ],
    "relatedPhrases": [
      "炮制",
      "如法炮制"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 126,
    "char": "赡",
    "correctPronunciation": "shàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "赡养"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 127,
    "char": "粕",
    "correctPronunciation": "pò",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "糟粕"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 128,
    "char": "说",
    "correctPronunciation": "shuì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "游说"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 129,
    "char": "溯",
    "correctPronunciation": "sù",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "追溯"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 130,
    "char": "讣",
    "correctPronunciation": "fù",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "讣告"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 131,
    "char": "中",
    "correctPronunciation": "zhòng",
    "wrongPronunciations": [
      "zhōng"
    ],
    "relatedPhrases": [
      "中伤",
      "百发百中"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 132,
    "char": "胚",
    "correctPronunciation": "pēi",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "胚胎"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 133,
    "char": "绽",
    "correctPronunciation": "zhàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "破绽"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 134,
    "char": "剖",
    "correctPronunciation": "pōu",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "剖析"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 135,
    "char": "璞",
    "correctPronunciation": "pú",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "璞玉"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 136,
    "char": "绮",
    "correctPronunciation": "qǐ",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "绮丽"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 137,
    "char": "悭",
    "correctPronunciation": "qiān",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "悭吝"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 138,
    "char": "翘",
    "correctPronunciation": "qiáo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "翘望"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 139,
    "char": "栖",
    "correctPronunciation": "qī",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "栖息"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 140,
    "char": "擎",
    "correctPronunciation": "qíng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "引擎"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 141,
    "char": "戕",
    "correctPronunciation": "qiang",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "戕害"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 142,
    "char": "堑",
    "correctPronunciation": "qiàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "天堑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 143,
    "char": "慑",
    "correctPronunciation": "shè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "慑服"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 144,
    "char": "蹊",
    "correctPronunciation": "qī",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "蹊跷"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 145,
    "char": "闷",
    "correctPronunciation": "mēn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "闷热"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 146,
    "char": "遒",
    "correctPronunciation": "qiú",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "遒劲"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 147,
    "char": "殷",
    "correctPronunciation": "yān",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "殷红"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 148,
    "char": "蜷",
    "correctPronunciation": "quán",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "蜷曲"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 149,
    "char": "徜",
    "correctPronunciation": "cháng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "徜徉"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 150,
    "char": "癖",
    "correctPronunciation": "pǐ",
    "wrongPronunciations": [
      "pì"
    ],
    "relatedPhrases": [
      "怪癖",
      "癖好",
      "嗜痂成癖"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 151,
    "char": "狩",
    "correctPronunciation": "shòu",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "狩猎"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 152,
    "char": "媲",
    "correctPronunciation": "pì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "媲美"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 153,
    "char": "涮",
    "correctPronunciation": "shuàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "洗涮"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 154,
    "char": "湃",
    "correctPronunciation": "pài",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "澎湃"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 155,
    "char": "稔",
    "correctPronunciation": "rěn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "熟稔"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 156,
    "char": "纶",
    "correctPronunciation": "guān",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "纶巾"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 157,
    "char": "肖",
    "correctPronunciation": "xiào",
    "wrongPronunciations": [
      "xiāo"
    ],
    "relatedPhrases": [
      "肖像",
      "生肖",
      "不肖子孙"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 158,
    "char": "蓦",
    "correctPronunciation": "mò",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "蓦然"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 159,
    "char": "谄",
    "correctPronunciation": "chǎn",
    "wrongPronunciations": [
      "xiàn"
    ],
    "relatedPhrases": [
      "谄媚",
      "胁肩谄笑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 160,
    "char": "恫",
    "correctPronunciation": "dòng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "恫吓"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 161,
    "char": "择",
    "correctPronunciation": "zhái",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "择菜"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 162,
    "char": "藉",
    "correctPronunciation": "jiè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "慰藉"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 163,
    "char": "拮",
    "correctPronunciation": "jié",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "拮据"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 164,
    "char": "屑",
    "correctPronunciation": "xiè",
    "wrongPronunciations": [
      "xuē"
    ],
    "relatedPhrases": [
      "纸屑",
      "不屑一顾"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 165,
    "char": "悚",
    "correctPronunciation": "sǒng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "悚然"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 166,
    "char": "讧",
    "correctPronunciation": "hòng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "内讧"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 167,
    "char": "剽",
    "correctPronunciation": "piāo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "剽悍"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 168,
    "char": "卡",
    "correctPronunciation": "qiǎ",
    "wrongPronunciations": [
      "kǎ"
    ],
    "relatedPhrases": [
      "关卡",
      "哨卡"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 169,
    "char": "讹",
    "correctPronunciation": "é",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "讹诈",
      "讹传"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 170,
    "char": "禅",
    "correctPronunciation": "shàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "禅让"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 171,
    "char": "怵",
    "correctPronunciation": "chù",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "发怵"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 172,
    "char": "挟",
    "correctPronunciation": "xié",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "挟持"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 173,
    "char": "谧",
    "correctPronunciation": "mì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "静谧"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 174,
    "char": "弋",
    "correctPronunciation": "yì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "游弋"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 175,
    "char": "烙",
    "correctPronunciation": "lào",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "烙印"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 176,
    "char": "与",
    "correctPronunciation": "yù",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "与会"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 177,
    "char": "泞",
    "correctPronunciation": "ning",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "泥泞"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 178,
    "char": "鄙",
    "correctPronunciation": "bǐ",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "卑鄙"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 179,
    "char": "绥",
    "correctPronunciation": "suí",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "绥靖"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 180,
    "char": "跛",
    "correctPronunciation": "bǒ",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "跛脚"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 181,
    "char": "纤",
    "correctPronunciation": "xiān",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "纤维"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 182,
    "char": "挫",
    "correctPronunciation": "cuò",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "挫折"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 183,
    "char": "瑰",
    "correctPronunciation": "guī",
    "wrongPronunciations": [
      "guì"
    ],
    "relatedPhrases": [
      "瑰丽",
      "玫瑰"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 184,
    "char": "宿",
    "correctPronunciation": "sù",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "宿敌"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 185,
    "char": "梏",
    "correctPronunciation": "gù",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "桎梏"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 186,
    "char": "拙",
    "correctPronunciation": "zhuō",
    "wrongPronunciations": [
      "zhuó"
    ],
    "relatedPhrases": [
      "拙劣",
      "弄巧成拙"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 187,
    "char": "亘",
    "correctPronunciation": "gèn",
    "wrongPronunciations": [
      "dàn"
    ],
    "relatedPhrases": [
      "绵亘",
      "亘古未有"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 188,
    "char": "伉",
    "correctPronunciation": "kàng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "伉俪"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 189,
    "char": "扳",
    "correctPronunciation": "bān",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "扳平"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 190,
    "char": "奔",
    "correctPronunciation": "bèn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "投奔"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 191,
    "char": "豁",
    "correctPronunciation": "huò",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "豁免"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 192,
    "char": "脂",
    "correctPronunciation": "zhī",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "血脂"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 193,
    "char": "荷",
    "correctPronunciation": "hè",
    "wrongPronunciations": [
      "hé"
    ],
    "relatedPhrases": [
      "负荷",
      "荷锄"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 194,
    "char": "婢",
    "correctPronunciation": "bì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "奴婢"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 195,
    "char": "诲",
    "correctPronunciation": "huì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "教诲"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 196,
    "char": "和",
    "correctPronunciation": "huò",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "和稀泥"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 197,
    "char": "涸",
    "correctPronunciation": "hé",
    "wrongPronunciations": [
      "gù"
    ],
    "relatedPhrases": [
      "干涸",
      "涸辙之鲋"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 198,
    "char": "噬",
    "correctPronunciation": "shì",
    "wrongPronunciations": [
      "wū"
    ],
    "relatedPhrases": [
      "吞噬",
      "噬脐莫及"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 199,
    "char": "峙",
    "correctPronunciation": "zhì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "对峙"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 200,
    "char": "阂",
    "correctPronunciation": "hé",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "隔阂"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 201,
    "char": "屏",
    "correctPronunciation": "bǐng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "屏气"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 202,
    "char": "隽",
    "correctPronunciation": "juàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "隽永"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 203,
    "char": "祛",
    "correctPronunciation": "qū",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "祛除"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 204,
    "char": "逮",
    "correctPronunciation": "dài",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "逮捕"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 205,
    "char": "剥",
    "correctPronunciation": "bō",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "剥削"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 206,
    "char": "削",
    "correctPronunciation": "xuē",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "剥削",
      "削减"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 207,
    "char": "痹",
    "correctPronunciation": "bì",
    "wrongPronunciations": [
      "pí"
    ],
    "relatedPhrases": [
      "麻痹",
      "麻痹大意"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 208,
    "char": "隘",
    "correctPronunciation": "ài",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "狭隘"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 209,
    "char": "庇",
    "correctPronunciation": "bì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "包庇"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 210,
    "char": "恻",
    "correctPronunciation": "cè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "恻隐"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 211,
    "char": "濒",
    "correctPronunciation": "bīn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "濒临"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 212,
    "char": "徊",
    "correctPronunciation": "huái",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "徘徊"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 213,
    "char": "哺",
    "correctPronunciation": "bǔ",
    "wrongPronunciations": [
      "fǔ"
    ],
    "relatedPhrases": [
      "哺育",
      "嗷嗷待哺"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 214,
    "char": "莅",
    "correctPronunciation": "li",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "莅临"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 215,
    "char": "肄",
    "correctPronunciation": "yì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "肄业"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 216,
    "char": "吁",
    "correctPronunciation": "yù",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "呼吁"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 217,
    "char": "饬",
    "correctPronunciation": "chì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "整饬"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 218,
    "char": "赁",
    "correctPronunciation": "lìn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "租赁"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 219,
    "char": "刹",
    "correctPronunciation": "chà",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "刹那"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 220,
    "char": "憎",
    "correctPronunciation": "zēng",
    "wrongPronunciations": [
      "zèng"
    ],
    "relatedPhrases": [
      "憎恨",
      "爱憎分明"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 221,
    "char": "颤",
    "correctPronunciation": "chàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "颤动"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 222,
    "char": "悄",
    "correctPronunciation": "qiǎo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "悄然"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 223,
    "char": "木",
    "correctPronunciation": "nè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "木讷"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 224,
    "char": "殍",
    "correctPronunciation": "piǎo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "饿殍"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 225,
    "char": "悼",
    "correctPronunciation": "dào",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "悼念"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 226,
    "char": "膝",
    "correctPronunciation": "xī",
    "wrongPronunciations": [
      "qī"
    ],
    "relatedPhrases": [
      "膝盖",
      "卑躬屈膝",
      "促膝谈心"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 227,
    "char": "提",
    "correctPronunciation": "dī",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "提防"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 228,
    "char": "稽",
    "correctPronunciation": "jī",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "滑稽"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 229,
    "char": "侩",
    "correctPronunciation": "kuài",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "市侩"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 230,
    "char": "祈",
    "correctPronunciation": "qí",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "祈祷"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 231,
    "char": "浣",
    "correctPronunciation": "huàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "浣洗"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 232,
    "char": "茎",
    "correctPronunciation": "jīng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "根茎"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 233,
    "char": "扁",
    "correctPronunciation": "piān",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "扁舟"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 234,
    "char": "慎",
    "correctPronunciation": "shèn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "慎重"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 235,
    "char": "驰",
    "correctPronunciation": "chěng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "驰骋"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 236,
    "char": "倥",
    "correctPronunciation": "kǒng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "倥偬"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 237,
    "char": "偬",
    "correctPronunciation": "zǒng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "倥偬"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 238,
    "char": "腼",
    "correctPronunciation": "miǎn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "腼腆"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 239,
    "char": "腆",
    "correctPronunciation": "tiǎn",
    "wrongPronunciations": [
      "diǎn"
    ],
    "relatedPhrases": [
      "腼腆"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 240,
    "char": "娉",
    "correctPronunciation": "pīng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "娉婷",
      "娉婷袅娜"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 241,
    "char": "忸",
    "correctPronunciation": "niǔ",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "忸怩"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 242,
    "char": "怩",
    "correctPronunciation": "ní",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "忸怩"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 243,
    "char": "睥睨",
    "correctPronunciation": "pì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "睥睨"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 244,
    "char": "睨",
    "correctPronunciation": "nì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "睥睨"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 245,
    "char": "窈",
    "correctPronunciation": "yǎo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "窈窕"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 246,
    "char": "窕",
    "correctPronunciation": "tiǎo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "窈窕"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 247,
    "char": "矩",
    "correctPronunciation": "jǔ",
    "wrongPronunciations": [
      "jù"
    ],
    "relatedPhrases": [
      "矩形",
      "循规蹈矩"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 248,
    "char": "砭",
    "correctPronunciation": "biān",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "针砭"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 249,
    "char": "扒",
    "correctPronunciation": "pá",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "扒窃"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 250,
    "char": "畸",
    "correctPronunciation": "jī",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "畸形"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 251,
    "char": "迸",
    "correctPronunciation": "bèng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "迸发"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 252,
    "char": "狙",
    "correctPronunciation": "jū",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "狙击"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 253,
    "char": "糙",
    "correctPronunciation": "cāo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "粗糙"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 254,
    "char": "戛",
    "correctPronunciation": "jiá",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "戛然"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 255,
    "char": "亵",
    "correctPronunciation": "xiè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "亵渎"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 256,
    "char": "歼",
    "correctPronunciation": "jiān",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "歼灭"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 257,
    "char": "孽",
    "correctPronunciation": "niè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "罪孽"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 258,
    "char": "矜",
    "correctPronunciation": "jīn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "矜夸"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 259,
    "char": "劣",
    "correctPronunciation": "liè",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "劣迹"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 260,
    "char": "粳",
    "correctPronunciation": "jīng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "粳米"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 261,
    "char": "纤",
    "correctPronunciation": "qiàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "拉纤"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 262,
    "char": "棘",
    "correctPronunciation": "jí",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "棘手"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 263,
    "char": "间",
    "correctPronunciation": "jiàn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "离间"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 264,
    "char": "著",
    "correctPronunciation": "zhuó",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "执著"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 265,
    "char": "娠",
    "correctPronunciation": "shēn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "妊娠"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 266,
    "char": "角",
    "correctPronunciation": "jué",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "角色"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 267,
    "char": "泌",
    "correctPronunciation": "mì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "分泌"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 268,
    "char": "症",
    "correctPronunciation": "zhēng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "症结"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 269,
    "char": "汲",
    "correctPronunciation": "jí",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "汲水"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 270,
    "char": "蛰",
    "correctPronunciation": "zhé",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "惊蛰"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 271,
    "char": "缜",
    "correctPronunciation": "zhěn",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "缜密"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 272,
    "char": "一",
    "correctPronunciation": "cháng",
    "wrongPronunciations": [
      "chǎng"
    ],
    "relatedPhrases": [
      "一场雨"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 273,
    "char": "4",
    "correctPronunciation": "chóng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "种师正"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 274,
    "char": "安",
    "correctPronunciation": "dàng",
    "wrongPronunciations": [
      "dāng"
    ],
    "relatedPhrases": [
      "安步当车"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 275,
    "char": "订",
    "correctPronunciation": "dìng",
    "wrongPronunciations": [
      "dīng"
    ],
    "relatedPhrases": [
      "订正"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 276,
    "char": "掇",
    "correctPronunciation": "duo",
    "wrongPronunciations": [
      "duò"
    ],
    "relatedPhrases": [
      "掇拾"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 277,
    "char": "准",
    "correctPronunciation": "gá",
    "wrongPronunciations": [
      "gé"
    ],
    "relatedPhrases": [
      "准噶尔"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 278,
    "char": "横",
    "correctPronunciation": "hèng",
    "wrongPronunciations": [
      "héng"
    ],
    "relatedPhrases": [
      "飞来横祸"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 279,
    "char": "横",
    "correctPronunciation": "héng",
    "wrongPronunciations": [
      "hèng"
    ],
    "relatedPhrases": [
      "横加阻拦"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 280,
    "char": "饨",
    "correctPronunciation": "tun",
    "wrongPronunciations": [
      "dùn"
    ],
    "relatedPhrases": [
      "馄饨"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 281,
    "char": "囵",
    "correctPronunciation": "lún",
    "wrongPronunciations": [
      "lùn"
    ],
    "relatedPhrases": [
      "囫囵吞枣"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 282,
    "char": "渐",
    "correctPronunciation": "jiān",
    "wrongPronunciations": [
      "jiàn"
    ],
    "relatedPhrases": [
      "渐染"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 283,
    "char": "绢",
    "correctPronunciation": "juàn",
    "wrongPronunciations": [
      "juān"
    ],
    "relatedPhrases": [
      "绢花"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 284,
    "char": "解",
    "correctPronunciation": "jiè",
    "wrongPronunciations": [
      "jiě"
    ],
    "relatedPhrases": [
      "押解"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 285,
    "char": "解",
    "correctPronunciation": "xiè",
    "wrongPronunciations": [
      "jiě"
    ],
    "relatedPhrases": [
      "浑身解数"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 286,
    "char": "籼",
    "correctPronunciation": "xīan",
    "wrongPronunciations": [
      "shān"
    ],
    "relatedPhrases": [
      "籼米"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 287,
    "char": "颈",
    "correctPronunciation": "jǐng",
    "wrongPronunciations": [
      "jìng"
    ],
    "relatedPhrases": [
      "颈部"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 288,
    "char": "靓",
    "correctPronunciation": "jìng",
    "wrongPronunciations": [
      "liàng"
    ],
    "relatedPhrases": [
      "靓妆"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 289,
    "char": "儆",
    "correctPronunciation": "jǐng",
    "wrongPronunciations": [
      "jìng"
    ],
    "relatedPhrases": [
      "以儆效尤"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 290,
    "char": "腈",
    "correctPronunciation": "jīng",
    "wrongPronunciations": [
      "qíng"
    ],
    "relatedPhrases": [
      "腈纶"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 291,
    "char": "唠",
    "correctPronunciation": "láo",
    "wrongPronunciations": [
      "lào"
    ],
    "relatedPhrases": [
      "唠叨"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 292,
    "char": "落",
    "correctPronunciation": "lào",
    "wrongPronunciations": [
      "luò"
    ],
    "relatedPhrases": [
      "落不是"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 293,
    "char": "量",
    "correctPronunciation": "liàng",
    "wrongPronunciations": [
      "liáng"
    ],
    "relatedPhrases": [
      "量体裁衣"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 294,
    "char": "丽",
    "correctPronunciation": "lí",
    "wrongPronunciations": [
      "lì"
    ],
    "relatedPhrases": [
      "浙江丽水"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 295,
    "char": "淋",
    "correctPronunciation": "lìn",
    "wrongPronunciations": [
      "lín"
    ],
    "relatedPhrases": [
      "淋病"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 296,
    "char": "绿",
    "correctPronunciation": "lù",
    "wrongPronunciations": [
      "lǜ"
    ],
    "relatedPhrases": [
      "绿林好汉"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 297,
    "char": "莽",
    "correctPronunciation": "mǎng",
    "wrongPronunciations": [
      "máng"
    ],
    "relatedPhrases": [
      "草莽"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 298,
    "char": "扪",
    "correctPronunciation": "mén",
    "wrongPronunciations": [
      "mèn"
    ],
    "relatedPhrases": [
      "扪心自问"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 299,
    "char": "酊",
    "correctPronunciation": "dǐng",
    "wrongPronunciations": [
      "dīng"
    ],
    "relatedPhrases": [
      "酩酊"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 300,
    "char": "靡",
    "correctPronunciation": "mǐ",
    "wrongPronunciations": [
      "mí"
    ],
    "relatedPhrases": [
      "所向披靡",
      "靡靡之音"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 301,
    "char": "抹",
    "correctPronunciation": "mò",
    "wrongPronunciations": [
      "mǒ"
    ],
    "relatedPhrases": [
      "抹墙"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 302,
    "char": "喷",
    "correctPronunciation": "pèn",
    "wrongPronunciations": [
      "pēn"
    ],
    "relatedPhrases": [
      "喷香"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 303,
    "char": "睥",
    "correctPronunciation": "pì",
    "wrongPronunciations": [
      "bǐ"
    ],
    "relatedPhrases": [
      "睥睨"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 304,
    "char": "胖",
    "correctPronunciation": "pán",
    "wrongPronunciations": [
      "pàng"
    ],
    "relatedPhrases": [
      "心广体胖"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 305,
    "char": "便",
    "correctPronunciation": "pián",
    "wrongPronunciations": [
      "biàn"
    ],
    "relatedPhrases": [
      "大腹便便"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 306,
    "char": "骠",
    "correctPronunciation": "piào",
    "wrongPronunciations": [
      "biāo"
    ],
    "relatedPhrases": [
      "骠勇"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 307,
    "char": "砒",
    "correctPronunciation": "pī",
    "wrongPronunciations": [
      "pí"
    ],
    "relatedPhrases": [
      "砒霜"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 308,
    "char": "繁",
    "correctPronunciation": "pó",
    "wrongPronunciations": [
      "fán"
    ],
    "relatedPhrases": [
      "繁钦"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 309,
    "char": "强",
    "correctPronunciation": "qiǎng",
    "wrongPronunciations": [
      "qiáng"
    ],
    "relatedPhrases": [
      "牵强附会"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 310,
    "char": "台",
    "correctPronunciation": "tāi",
    "wrongPronunciations": [
      "tái"
    ],
    "relatedPhrases": [
      "台州"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 311,
    "char": "节",
    "correctPronunciation": "jiē",
    "wrongPronunciations": [
      "jié"
    ],
    "relatedPhrases": [
      "节骨眼"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 312,
    "char": "吱",
    "correctPronunciation": "zī",
    "wrongPronunciations": [
      "zhī"
    ],
    "relatedPhrases": [
      "不吱声"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 313,
    "char": "妮",
    "correctPronunciation": "nī",
    "wrongPronunciations": [
      "ní"
    ],
    "relatedPhrases": [
      "燕妮"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 314,
    "char": "邪",
    "correctPronunciation": "yé",
    "wrongPronunciations": [
      "xié"
    ],
    "relatedPhrases": [
      "莫邪"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 315,
    "char": "剔",
    "correctPronunciation": "tī",
    "wrongPronunciations": [
      "tì"
    ],
    "relatedPhrases": [
      "剔透"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 316,
    "char": "汤",
    "correctPronunciation": "shāng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "浩浩汤汤"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 317,
    "char": "结",
    "correctPronunciation": "jié",
    "wrongPronunciations": [
      "jiē"
    ],
    "relatedPhrases": [
      "结婚"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 318,
    "char": "坊",
    "correctPronunciation": "fáng",
    "wrongPronunciations": [
      "fāng"
    ],
    "relatedPhrases": [
      "磨坊"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 319,
    "char": "蔓",
    "correctPronunciation": "wàn",
    "wrongPronunciations": [
      "màn"
    ],
    "relatedPhrases": [
      "藤蔓"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 320,
    "char": "糊",
    "correctPronunciation": "hù",
    "wrongPronunciations": [
      "hú"
    ],
    "relatedPhrases": [
      "芝麻糊"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 321,
    "char": "禁",
    "correctPronunciation": "jīn",
    "wrongPronunciations": [
      "jìn"
    ],
    "relatedPhrases": [
      "情不自禁",
      "忍俊不禁",
      "弱不禁风"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 322,
    "char": "梵",
    "correctPronunciation": "fàn",
    "wrongPronunciations": [
      "fán"
    ],
    "relatedPhrases": [
      "梵语"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 323,
    "char": "雒",
    "correctPronunciation": "luò",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "雒城"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 324,
    "char": "袅",
    "correctPronunciation": "niǎo",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "娉婷袅娜"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 325,
    "char": "娜",
    "correctPronunciation": "nuó",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "娉婷袅娜"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 326,
    "char": "涕",
    "correctPronunciation": "tī",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "涕泗滂沱"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 327,
    "char": "泗",
    "correctPronunciation": "sì",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "涕泗滂沱"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 328,
    "char": "滂",
    "correctPronunciation": "pāng",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "涕泗滂沱"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 329,
    "char": "沱",
    "correctPronunciation": "tuó",
    "wrongPronunciations": [],
    "relatedPhrases": [
      "涕泗滂沱"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 330,
    "char": "恙",
    "correctPronunciation": "yàng",
    "wrongPronunciations": [
      "gāo"
    ],
    "relatedPhrases": [
      "安然无恙"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 331,
    "char": "重",
    "correctPronunciation": "zhòng",
    "wrongPronunciations": [
      "chóng"
    ],
    "relatedPhrases": [
      "安土重迁"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 332,
    "char": "骥",
    "correctPronunciation": "jì",
    "wrongPronunciations": [
      "yì"
    ],
    "relatedPhrases": [
      "按图索骥"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 333,
    "char": "屹",
    "correctPronunciation": "yì",
    "wrongPronunciations": [
      "yī"
    ],
    "relatedPhrases": [
      "傲然屹立"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 334,
    "char": "跋",
    "correctPronunciation": "bá",
    "wrongPronunciations": [
      "pá"
    ],
    "relatedPhrases": [
      "跋山涉水",
      "飞扬跋扈"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 335,
    "char": "挠",
    "correctPronunciation": "náo",
    "wrongPronunciations": [
      "ráo"
    ],
    "relatedPhrases": [
      "百折不挠",
      "不屈不挠"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 336,
    "char": "稗",
    "correctPronunciation": "bài",
    "wrongPronunciations": [
      "bēi"
    ],
    "relatedPhrases": [
      "稗官野史"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 337,
    "char": "遂",
    "correctPronunciation": "suí",
    "wrongPronunciations": [
      "zhú"
    ],
    "relatedPhrases": [
      "半身不遂"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 338,
    "char": "冯",
    "correctPronunciation": "píng",
    "wrongPronunciations": [
      "féng"
    ],
    "relatedPhrases": [
      "暴虎冯河"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 339,
    "char": "殄",
    "correctPronunciation": "tiǎn",
    "wrongPronunciations": [
      "zhēn"
    ],
    "relatedPhrases": [
      "暴殄天物"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 340,
    "char": "髀",
    "correctPronunciation": "bì",
    "wrongPronunciations": [
      "pì"
    ],
    "relatedPhrases": [
      "髀肉复生"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 341,
    "char": "辟",
    "correctPronunciation": "pì",
    "wrongPronunciations": [
      "bì"
    ],
    "relatedPhrases": [
      "鞭辟入里"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 342,
    "char": "便",
    "correctPronunciation": "biàn",
    "wrongPronunciations": [
      "pián"
    ],
    "relatedPhrases": [
      "便宜行事"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 343,
    "char": "杼",
    "correctPronunciation": "zhù",
    "wrongPronunciations": [
      "shū"
    ],
    "relatedPhrases": [
      "别出机杼"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 344,
    "char": "长",
    "correctPronunciation": "cháng",
    "wrongPronunciations": [
      "zhǎng"
    ],
    "relatedPhrases": [
      "别无长物"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 345,
    "char": "彬",
    "correctPronunciation": "bīn",
    "wrongPronunciations": [
      "shān"
    ],
    "relatedPhrases": [
      "彬彬有礼"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 346,
    "char": "悖",
    "correctPronunciation": "bèi",
    "wrongPronunciations": [
      "bó"
    ],
    "relatedPhrases": [
      "并行不悖"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 347,
    "char": "肓",
    "correctPronunciation": "huāng",
    "wrongPronunciations": [
      "máng"
    ],
    "relatedPhrases": [
      "病入膏肓"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 348,
    "char": "擘",
    "correctPronunciation": "bò",
    "wrongPronunciations": [
      "bì"
    ],
    "relatedPhrases": [
      "擘肌分理"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 349,
    "char": "捕",
    "correctPronunciation": "bǔ",
    "wrongPronunciations": [
      "pǔ"
    ],
    "relatedPhrases": [
      "捕风捉影"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 350,
    "char": "畛",
    "correctPronunciation": "zhěn",
    "wrongPronunciations": [
      "zhèn"
    ],
    "relatedPhrases": [
      "不分畛域"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 351,
    "char": "寂",
    "correctPronunciation": "jì",
    "wrongPronunciations": [
      "jí"
    ],
    "relatedPhrases": [
      "不甘寂寞"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 352,
    "char": "穑",
    "correctPronunciation": "sè",
    "wrongPronunciations": [
      "qiáng"
    ],
    "relatedPhrases": [
      "不稼不穑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 353,
    "char": "缕",
    "correctPronunciation": "lǚ",
    "wrongPronunciations": [
      "lǒu"
    ],
    "relatedPhrases": [
      "不绝如缕"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 354,
    "char": "磨",
    "correctPronunciation": "mó",
    "wrongPronunciations": [
      "mò"
    ],
    "relatedPhrases": [
      "不可磨灭",
      "磨杵成针"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 355,
    "char": "窠",
    "correctPronunciation": "kē",
    "wrongPronunciations": [
      "cháo"
    ],
    "relatedPhrases": [
      "不落窠臼"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 356,
    "char": "省",
    "correctPronunciation": "xǐng",
    "wrongPronunciations": [
      "shěng"
    ],
    "relatedPhrases": [
      "不省人事",
      "发人深省",
      "反躬自省"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 357,
    "char": "粟",
    "correctPronunciation": "sù",
    "wrongPronunciations": [
      "lì"
    ],
    "relatedPhrases": [
      "沧海一粟"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 358,
    "char": "菅",
    "correctPronunciation": "jiān",
    "wrongPronunciations": [
      "guǎn"
    ],
    "relatedPhrases": [
      "草菅人命"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 359,
    "char": "姹",
    "correctPronunciation": "chà",
    "wrongPronunciations": [
      "chá"
    ],
    "relatedPhrases": [
      "姹紫嫣红"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 360,
    "char": "载",
    "correctPronunciation": "zài",
    "wrongPronunciations": [
      "zǎi"
    ],
    "relatedPhrases": [
      "车载斗量",
      "载歌载舞"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 361,
    "char": "瞠",
    "correctPronunciation": "chēng",
    "wrongPronunciations": [
      "táng"
    ],
    "relatedPhrases": [
      "瞠目结舌"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 362,
    "char": "媚",
    "correctPronunciation": "mèi",
    "wrongPronunciations": [
      "méi"
    ],
    "relatedPhrases": [
      "崇洋媚外"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 363,
    "char": "臭",
    "correctPronunciation": "chòu",
    "wrongPronunciations": [
      "xiù"
    ],
    "relatedPhrases": [
      "臭味相投"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 364,
    "char": "疵",
    "correctPronunciation": "cī",
    "wrongPronunciations": [
      "bǐ"
    ],
    "relatedPhrases": [
      "吹毛求疵"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 365,
    "char": "涎",
    "correctPronunciation": "xián",
    "wrongPronunciations": [
      "yán"
    ],
    "relatedPhrases": [
      "垂涎欲滴"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 366,
    "char": "厥",
    "correctPronunciation": "jué",
    "wrongPronunciations": [
      "què"
    ],
    "relatedPhrases": [
      "大放厥词"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 367,
    "char": "凛",
    "correctPronunciation": "lǐn",
    "wrongPronunciations": [
      "bǐng"
    ],
    "relatedPhrases": [
      "大义凛然"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 368,
    "char": "殚",
    "correctPronunciation": "dān",
    "wrongPronunciations": [
      "chán"
    ],
    "relatedPhrases": [
      "殚精竭虑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 369,
    "char": "食",
    "correctPronunciation": "sì",
    "wrongPronunciations": [
      "shí"
    ],
    "relatedPhrases": [
      "箪食壶浆"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 370,
    "char": "喝",
    "correctPronunciation": "hè",
    "wrongPronunciations": [
      "hē"
    ],
    "relatedPhrases": [
      "当头棒喝"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 371,
    "char": "膜",
    "correctPronunciation": "mó",
    "wrongPronunciations": [
      "mò"
    ],
    "relatedPhrases": [
      "顶礼膜拜"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 372,
    "char": "垣",
    "correctPronunciation": "yuán",
    "wrongPronunciations": [
      "héng"
    ],
    "relatedPhrases": [
      "断井颓垣"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 373,
    "char": "咄",
    "correctPronunciation": "duō",
    "wrongPronunciations": [
      "duó"
    ],
    "relatedPhrases": [
      "咄咄逼人"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 374,
    "char": "阿",
    "correctPronunciation": "ē",
    "wrongPronunciations": [
      "ā"
    ],
    "relatedPhrases": [
      "阿谀奉承",
      "刚直不阿"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 375,
    "char": "鬓",
    "correctPronunciation": "bìn",
    "wrongPronunciations": [
      "bīn"
    ],
    "relatedPhrases": [
      "耳鬓厮磨"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 376,
    "char": "缛",
    "correctPronunciation": "rù",
    "wrongPronunciations": [
      "rǔ"
    ],
    "relatedPhrases": [
      "繁文缛节"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 377,
    "char": "吠",
    "correctPronunciation": "fèi",
    "wrongPronunciations": [
      "quǎn"
    ],
    "relatedPhrases": [
      "吠形吠声"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 378,
    "char": "晷",
    "correctPronunciation": "guǐ",
    "wrongPronunciations": [
      "jiù"
    ],
    "relatedPhrases": [
      "焚膏继晷"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 379,
    "char": "仆",
    "correctPronunciation": "pú",
    "wrongPronunciations": [
      "pū"
    ],
    "relatedPhrases": [
      "风尘仆仆"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 380,
    "char": "掣",
    "correctPronunciation": "chè",
    "wrongPronunciations": [
      "zhì"
    ],
    "relatedPhrases": [
      "风驰电掣"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 381,
    "char": "唳",
    "correctPronunciation": "lì",
    "wrongPronunciations": [
      "lèi"
    ],
    "relatedPhrases": [
      "风声鹤唳"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 382,
    "char": "荫",
    "correctPronunciation": "yìn",
    "wrongPronunciations": [
      "yīn"
    ],
    "relatedPhrases": [
      "封妻荫子"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 383,
    "char": "隅",
    "correctPronunciation": "yú",
    "wrongPronunciations": [
      "ǒu"
    ],
    "relatedPhrases": [
      "负隅顽抗"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 384,
    "char": "愎",
    "correctPronunciation": "bì",
    "wrongPronunciations": [
      "fù"
    ],
    "relatedPhrases": [
      "刚愎自用"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 385,
    "char": "瓴",
    "correctPronunciation": "líng",
    "wrongPronunciations": [
      "lǐng"
    ],
    "relatedPhrases": [
      "高屋建瓴"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 386,
    "char": "纛",
    "correctPronunciation": "dào",
    "wrongPronunciations": [
      "dú"
    ],
    "relatedPhrases": [
      "高牙大纛"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 387,
    "char": "篑",
    "correctPronunciation": "kuì",
    "wrongPronunciations": [
      "guì"
    ],
    "relatedPhrases": [
      "功亏一篑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 388,
    "char": "掷",
    "correctPronunciation": "zhì",
    "wrongPronunciations": [
      "zhèng"
    ],
    "relatedPhrases": [
      "孤注一掷"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 389,
    "char": "蒂",
    "correctPronunciation": "dì",
    "wrongPronunciations": [
      "tí"
    ],
    "relatedPhrases": [
      "瓜熟蒂落"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 390,
    "char": "窥",
    "correctPronunciation": "kuī",
    "wrongPronunciations": [
      "guī"
    ],
    "relatedPhrases": [
      "管中窥豹"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 391,
    "char": "霁",
    "correctPronunciation": "jì",
    "wrongPronunciations": [
      "qí"
    ],
    "relatedPhrases": [
      "光风霁月"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 392,
    "char": "枯",
    "correctPronunciation": "kū",
    "wrongPronunciations": [
      "gù",
      "gū"
    ],
    "relatedPhrases": [
      "海枯石烂",
      "枯木逢春"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 393,
    "char": "蜃",
    "correctPronunciation": "shèn",
    "wrongPronunciations": [
      "chén"
    ],
    "relatedPhrases": [
      "海市蜃楼"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 394,
    "char": "咀",
    "correctPronunciation": "jǔ",
    "wrongPronunciations": [
      "zuǐ"
    ],
    "relatedPhrases": [
      "含英咀华"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 395,
    "char": "浃",
    "correctPronunciation": "jiā",
    "wrongPronunciations": [
      "jiá"
    ],
    "relatedPhrases": [
      "汗流浃背"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 396,
    "char": "沆",
    "correctPronunciation": "hàng",
    "wrongPronunciations": [
      "kàng"
    ],
    "relatedPhrases": [
      "沆瀣一气"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 397,
    "char": "瀣",
    "correctPronunciation": "xiè",
    "wrongPronunciations": [
      "jiǔ"
    ],
    "relatedPhrases": [
      "沆瀣一气"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 398,
    "char": "恶",
    "correctPronunciation": "wù",
    "wrongPronunciations": [
      "è"
    ],
    "relatedPhrases": [
      "好逸恶劳",
      "深恶痛绝"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 399,
    "char": "敛",
    "correctPronunciation": "liǎn",
    "wrongPronunciations": [
      "jiǎn"
    ],
    "relatedPhrases": [
      "横征暴敛"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 400,
    "char": "怙",
    "correctPronunciation": "hù",
    "wrongPronunciations": [
      "gǔ"
    ],
    "relatedPhrases": [
      "怙恶不悛"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 401,
    "char": "悛",
    "correctPronunciation": "quān",
    "wrongPronunciations": [
      "jùn"
    ],
    "relatedPhrases": [
      "怙恶不悛"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 402,
    "char": "讳",
    "correctPronunciation": "huì",
    "wrongPronunciations": [
      "wěi"
    ],
    "relatedPhrases": [
      "讳莫如深"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 403,
    "char": "蹙",
    "correctPronunciation": "cù",
    "wrongPronunciations": [
      "zù"
    ],
    "relatedPhrases": [
      "疾首蹙额"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 404,
    "char": "矫",
    "correctPronunciation": "jiǎo",
    "wrongPronunciations": [
      "jiāo"
    ],
    "relatedPhrases": [
      "矫揉造作",
      "矫枉过正"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 405,
    "char": "嗟",
    "correctPronunciation": "jiē",
    "wrongPronunciations": [
      "cuō"
    ],
    "relatedPhrases": [
      "嗟来之食"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 406,
    "char": "泾",
    "correctPronunciation": "jīng",
    "wrongPronunciations": [
      "jìng"
    ],
    "relatedPhrases": [
      "泾渭分明"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 407,
    "char": "鹄",
    "correctPronunciation": "hú",
    "wrongPronunciations": [
      "hào"
    ],
    "relatedPhrases": [
      "鸠形鹄面"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 408,
    "char": "揖",
    "correctPronunciation": "yī",
    "wrongPronunciations": [
      "jī"
    ],
    "relatedPhrases": [
      "开门揖盗"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 409,
    "char": "岿",
    "correctPronunciation": "kuī",
    "wrongPronunciations": [
      "guī"
    ],
    "relatedPhrases": [
      "岿然不动"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 410,
    "char": "妪",
    "correctPronunciation": "yù",
    "wrongPronunciations": [
      "ōu"
    ],
    "relatedPhrases": [
      "老妪能解"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 411,
    "char": "栉",
    "correctPronunciation": "zhì",
    "wrongPronunciations": [
      "jié"
    ],
    "relatedPhrases": [
      "鳞次栉比"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 412,
    "char": "觑",
    "correctPronunciation": "qù",
    "wrongPronunciations": [
      "xū"
    ],
    "relatedPhrases": [
      "面面相觑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 413,
    "char": "朝",
    "correctPronunciation": "zhāo",
    "wrongPronunciations": [
      "cháo"
    ],
    "relatedPhrases": [
      "灭此朝食"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 414,
    "char": "沸",
    "correctPronunciation": "fèi",
    "wrongPronunciations": [
      "fú"
    ],
    "relatedPhrases": [
      "民怨沸腾"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 415,
    "char": "杵",
    "correctPronunciation": "chǔ",
    "wrongPronunciations": [
      "wǔ"
    ],
    "relatedPhrases": [
      "磨杵成针"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 416,
    "char": "呕",
    "correctPronunciation": "ǒu",
    "wrongPronunciations": [
      "ōu"
    ],
    "relatedPhrases": [
      "呕心沥血"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 417,
    "char": "杞",
    "correctPronunciation": "qǐ",
    "wrongPronunciations": [
      "jǐ"
    ],
    "relatedPhrases": [
      "杞人忧天"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 418,
    "char": "倨",
    "correctPronunciation": "jù",
    "wrongPronunciations": [
      "jǔ"
    ],
    "relatedPhrases": [
      "前倨后恭"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 419,
    "char": "锲",
    "correctPronunciation": "qiè",
    "wrongPronunciations": [
      "qì"
    ],
    "relatedPhrases": [
      "锲而不舍"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 420,
    "char": "箧",
    "correctPronunciation": "qiè",
    "wrongPronunciations": [
      "jiá"
    ],
    "relatedPhrases": [
      "倾箱倒箧"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 421,
    "char": "黩",
    "correctPronunciation": "dú",
    "wrongPronunciations": [
      "mài"
    ],
    "relatedPhrases": [
      "穷兵黩武"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 422,
    "char": "啮",
    "correctPronunciation": "niè",
    "wrongPronunciations": [
      "chǐ"
    ],
    "relatedPhrases": [
      "穷鼠啮狸"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 423,
    "char": "和",
    "correctPronunciation": "hè",
    "wrongPronunciations": [
      "hé"
    ],
    "relatedPhrases": [
      "曲高和寡",
      "一唱一和"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 424,
    "char": "塞",
    "correctPronunciation": "sài",
    "wrongPronunciations": [
      "sè"
    ],
    "relatedPhrases": [
      "塞翁失马"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 425,
    "char": "缄",
    "correctPronunciation": "jiān",
    "wrongPronunciations": [
      "jiàn"
    ],
    "relatedPhrases": [
      "三缄其口"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 426,
    "char": "少",
    "correctPronunciation": "shào",
    "wrongPronunciations": [
      "shǎo"
    ],
    "relatedPhrases": [
      "少不更事"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 427,
    "char": "矢",
    "correctPronunciation": "shǐ",
    "wrongPronunciations": [
      "shī"
    ],
    "relatedPhrases": [
      "矢口否认",
      "无的放矢"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 428,
    "char": "俑",
    "correctPronunciation": "yǒng",
    "wrongPronunciations": [
      "yōng"
    ],
    "relatedPhrases": [
      "始作俑者"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 429,
    "char": "舐",
    "correctPronunciation": "shì",
    "wrongPronunciations": [
      "tiǎn"
    ],
    "relatedPhrases": [
      "吮痈舐痔"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 430,
    "char": "忾",
    "correctPronunciation": "kài",
    "wrongPronunciations": [
      "qì"
    ],
    "relatedPhrases": [
      "同仇敌忾"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 431,
    "char": "舍",
    "correctPronunciation": "shè",
    "wrongPronunciations": [
      "shě"
    ],
    "relatedPhrases": [
      "退避三舍"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 432,
    "char": "绔",
    "correctPronunciation": "kù",
    "wrongPronunciations": [
      "kuà"
    ],
    "relatedPhrases": [
      "纨绔子弟"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 433,
    "char": "喑",
    "correctPronunciation": "yīn",
    "wrongPronunciations": [
      "àn"
    ],
    "relatedPhrases": [
      "万马齐喑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 434,
    "char": "伥",
    "correctPronunciation": "chāng",
    "wrongPronunciations": [
      "cháng"
    ],
    "relatedPhrases": [
      "为虎作伥"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 435,
    "char": "缪",
    "correctPronunciation": "móu",
    "wrongPronunciations": [
      "miú"
    ],
    "relatedPhrases": [
      "未雨绸缪"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 436,
    "char": "券",
    "correctPronunciation": "quàn",
    "wrongPronunciations": [
      "juàn"
    ],
    "relatedPhrases": [
      "稳操胜券"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 437,
    "char": "毋",
    "correctPronunciation": "wú",
    "wrongPronunciations": [
      "wù"
    ],
    "relatedPhrases": [
      "毋庸置疑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 438,
    "char": "绌",
    "correctPronunciation": "chù",
    "wrongPronunciations": [
      "zhuó"
    ],
    "relatedPhrases": [
      "相形见绌"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 439,
    "char": "旰",
    "correctPronunciation": "gàn",
    "wrongPronunciations": [
      "gān"
    ],
    "relatedPhrases": [
      "宵衣旰食"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 440,
    "char": "戚",
    "correctPronunciation": "qī",
    "wrongPronunciations": [
      "qì"
    ],
    "relatedPhrases": [
      "休戚相关"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 441,
    "char": "栩",
    "correctPronunciation": "xǔ",
    "wrongPronunciations": [
      "yǔ"
    ],
    "relatedPhrases": [
      "栩栩如生"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 442,
    "char": "揠",
    "correctPronunciation": "yà",
    "wrongPronunciations": [
      "yàn"
    ],
    "relatedPhrases": [
      "揠苗助长"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 443,
    "char": "赅",
    "correctPronunciation": "gāi",
    "wrongPronunciations": [
      "hài"
    ],
    "relatedPhrases": [
      "言简意赅"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 444,
    "char": "奄",
    "correctPronunciation": "yǎn",
    "wrongPronunciations": [
      "yān"
    ],
    "relatedPhrases": [
      "奄奄一息"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 445,
    "char": "要",
    "correctPronunciation": "yào",
    "wrongPronunciations": [
      "yāo"
    ],
    "relatedPhrases": [
      "要言不烦"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 446,
    "char": "蹴",
    "correctPronunciation": "cù",
    "wrongPronunciations": [
      "jiù"
    ],
    "relatedPhrases": [
      "一蹴而就"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 447,
    "char": "脉",
    "correctPronunciation": "mài",
    "wrongPronunciations": [
      "mò"
    ],
    "relatedPhrases": [
      "一脉相传"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 448,
    "char": "暴",
    "correctPronunciation": "pù",
    "wrongPronunciations": [
      "bào"
    ],
    "relatedPhrases": [
      "一暴十寒"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 449,
    "char": "呵",
    "correctPronunciation": "hē",
    "wrongPronunciations": [
      "hā"
    ],
    "relatedPhrases": [
      "一气呵成"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 450,
    "char": "貉",
    "correctPronunciation": "hé",
    "wrongPronunciations": [
      "hè"
    ],
    "relatedPhrases": [
      "一丘之貉"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 451,
    "char": "应",
    "correctPronunciation": "yīng",
    "wrongPronunciations": [
      "yìng"
    ],
    "relatedPhrases": [
      "一应俱全"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 452,
    "char": "的",
    "correctPronunciation": "dì",
    "wrongPronunciations": [
      "dí"
    ],
    "relatedPhrases": [
      "一语破的"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 453,
    "char": "壑",
    "correctPronunciation": "hè",
    "wrongPronunciations": [
      "huō"
    ],
    "relatedPhrases": [
      "以邻为壑"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 454,
    "char": "衣",
    "correctPronunciation": "yì",
    "wrongPronunciations": [
      "yī"
    ],
    "relatedPhrases": [
      "衣锦还乡"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 455,
    "char": "吭",
    "correctPronunciation": "háng",
    "wrongPronunciations": [
      "kēng"
    ],
    "relatedPhrases": [
      "引吭高歌"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 456,
    "char": "蝇",
    "correctPronunciation": "yíng",
    "wrongPronunciations": [
      "yīng"
    ],
    "relatedPhrases": [
      "蝇头小利",
      "蝇营狗苟"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 457,
    "char": "绕",
    "correctPronunciation": "rào",
    "wrongPronunciations": [
      "rǎo"
    ],
    "relatedPhrases": [
      "余音绕梁"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 458,
    "char": "贾",
    "correctPronunciation": "gǔ",
    "wrongPronunciations": [
      "jiǎ"
    ],
    "relatedPhrases": [
      "余勇可贾"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 459,
    "char": "俎",
    "correctPronunciation": "zǔ",
    "wrongPronunciations": [
      "qiě"
    ],
    "relatedPhrases": [
      "越俎代庖"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 460,
    "char": "罔",
    "correctPronunciation": "wǎng",
    "wrongPronunciations": [
      "máng"
    ],
    "relatedPhrases": [
      "置若罔闻"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 461,
    "char": "惴",
    "correctPronunciation": "zhuì",
    "wrongPronunciations": [
      "chuǎn"
    ],
    "relatedPhrases": [
      "惴惴不安"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 462,
    "char": "艾",
    "correctPronunciation": "yì",
    "wrongPronunciations": [
      "ài"
    ],
    "relatedPhrases": [
      "自怨自艾"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  },
  {
    "id": 463,
    "char": "捭",
    "correctPronunciation": "bǎi",
    "wrongPronunciations": [
      "bē"
    ],
    "relatedPhrases": [
      "纵横捭阖"
    ],
    "explanation": "",
    "errorReasonType": 4,
    "difficultyLevel": "初级"
  }
];

module.exports = {
  characters
};