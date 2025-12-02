// 五行奥秘数据文件
// 包含五行与各种属性的对应关系、生克关系等传统哲学体系

const wuxingData = {
  // 五行基础信息
  wuxing: {
    wood: {
      name: "木",
      pinyin: "mù",
      english: "Wood",
      title: "木",
      description: "象征生长、升发、条达、舒畅的特性。木曰曲直，代表着生命的萌发、成长和舒展。具有向上生长、向外扩展的动力，象征着春天的生机与活力。",
      color: "#2E7D32", // 深绿色
      lightColor: "#81C784",
      season: "春",
      direction: "东",
      planet: "木星",
      number: 3,
      symbol: "🌳",
      properties: ["生发", "舒展", "条达", "舒畅", "生长"],
      sheng: "火",
      ke: "土",
      healthTips: [
        "春季宜早睡早起，多到户外散步，感受春阳之气",
        "饮食宜清淡，多食绿色蔬菜，如菠菜、青菜等",
        "保持心情舒畅，避免情绪抑郁，有助于肝气疏泄",
        "适当进行伸展运动，如太极拳、瑜伽等"
      ],
      cultural: [
        "在古代建筑中，木结构体现了对自然的敬畏和与自然的和谐",
        "中医认为肝属木，主疏泄，调畅气机，与春气相应",
        "在文学艺术中，常以草木喻人，赞美坚韧不拔的品质"
      ]
    },
    fire: {
      name: "火",
      pinyin: "huǒ", 
      english: "Fire",
      title: "火",
      description: "象征温热、向上、光明、变化的特性。火曰炎上，代表着热量、光明和能量。具有温暖、升腾、活跃的特性，象征着夏天的热烈与激情。",
      color: "#D32F2F", // 深红色
      lightColor: "#EF5350",
      season: "夏",
      direction: "南",
      planet: "火星",
      number: 2,
      symbol: "🔥",
      properties: ["温热", "向上", "光明", "变化", "活跃"],
      sheng: "土",
      ke: "金",
      healthTips: [
        "夏季宜晚睡早起，适当午休，顺应夏日阳气盛长",
        "饮食宜清淡易消化，多食红色食物，如西红柿、红枣等",
        "保持心平气和，避免过度兴奋，有助于心神安宁",
        "适度运动，但避免剧烈运动导致出汗过多"
      ],
      cultural: [
        "古代文明中，火是人类文明的象征，代表着光明和进步",
        "在五行哲学中，火主礼，与人的礼仪、文明教化相关",
        "中医认为心属火，主血脉，藏神明，与夏气相应"
      ]
    },
    earth: {
      name: "土",
      pinyin: "tǔ",
      english: "Earth",
      title: "土",
      description: "象征生化、承载、受纳、变化的特性。土爰稼穑，代表着化生万物、承载万物的母性特质。具有稳定、厚德、包容的特性，象征着长夏的丰饶与滋养。",
      color: "#F57C00", // 深橙色
      lightColor: "#FFB74D",
      season: "长夏",
      direction: "中",
      planet: "土星",
      number: 5,
      symbol: "🏔️",
      properties: ["生化", "承载", "受纳", "稳定", "厚德"],
      sheng: "金",
      ke: "水",
      healthTips: [
        "长夏季节要注意饮食调养，避免过食生冷油腻",
        "多食黄色食物，如南瓜、玉米、黄豆等，健脾养胃",
        "保持规律作息，避免过度思虑，有助脾胃健康",
        "适当运动，促进消化吸收，增强体质"
      ],
      cultural: [
        "在中国文化中，土代表中央，具有至高无上的地位",
        "古代农业文明中，土地是生存之本，体现对自然的依赖",
        "中医认为脾属土，主运化，为气血生化之源"
      ]
    },
    metal: {
      name: "金",
      pinyin: "jīn",
      english: "Metal",
      title: "金",
      description: "象征收敛、沉降、清洁、肃杀的特性。金曰从革，代表着坚固、刚性、变革的力量。具有收敛、清洁、杀伐的特性，象征着秋天的收获与肃杀。",
      color: "#7B1FA2", // 深紫色
      lightColor: "#BA68C8",
      season: "秋",
      direction: "西",
      planet: "金星",
      number: 4,
      symbol: "⚔️",
      properties: ["收敛", "沉降", "清洁", "肃杀", "变革"],
      sheng: "水",
      ke: "木",
      healthTips: [
        "秋季宜早睡早起，与鸡俱兴，顺应秋收之气",
        "多食白色食物，如梨、百合、银耳等，润肺养阴",
        "保持情绪平和，避免悲伤过度，有助肺气肃降",
        "适当增加户外运动，增强呼吸系统功能"
      ],
      cultural: [
        "在古代，金代表着财富、权力和地位",
        "五行中金主义，与人的正义感、规则意识相关",
        "中医认为肺属金，主气，司呼吸，与秋气相应"
      ]
    },
    water: {
      name: "水",
      pinyin: "shuǐ",
      english: "Water",
      title: "水",
      description: "象征寒凉、滋润、向下、闭藏的特性。水曰润下，代表着流动、滋养、潜藏的力量。具有滋润、寒凉、向下流动的特性，象征着冬天的沉静与储藏。",
      color: "#1976D2", // 深蓝色
      lightColor: "#64B5F6", 
      season: "冬",
      direction: "北",
      planet: "水星",
      number: 1,
      symbol: "💧",
      properties: ["寒凉", "滋润", "向下", "闭藏", "流动"],
      sheng: "木",
      ke: "火",
      healthTips: [
        "冬季宜早睡晚起，必待日光，顺应冬藏之气",
        "多食黑色食物，如黑芝麻、黑豆、黑木耳等，补肾益精",
        "保持精神内守，避免过度恐懼，有助肾气收藏",
        "适度运动，避免剧烈出汗，保存阳气"
      ],
      cultural: [
        "在中国哲学中，水代表智慧、柔韧和坚持不懈",
        "老子曰：上善若水，水利万物而不争，体现水的品格",
        "中医认为肾属水，主藏精，为先天之本，与冬气相应"
      ]
    }
  },

  // 五行相生关系
  shengRelation: {
    "wood": "火",    // 木生火
    "fire": "土",    // 火生土
    "earth": "金",   // 土生金
    "metal": "水",   // 金生水
    "water": "木"    // 水生木
  },

  // 五行相克关系
  keRelation: {
    "wood": "土",    // 木克土
    "fire": "金",    // 火克金
    "earth": "水",   // 土克水
    "metal": "木",   // 金克木
    "water": "火"    // 水克火
  },

  // 五方与五行对应
  wufang: {
    east: {
      name: "东",
      wuxing: "wood",
      description: "东方甲乙木，象征万物始生，阳气升发。东方为日出之地，代表生机与希望，是春季的方位象征。",
      color: "#2E7D32",
      time: "寅卯时（5-9时）",
      animal: "龙、兔",
      properties: ["生发", "温暖", "向上", "希望", "开始"],
      healthTips: [
        "晨起面向东方，迎接朝阳，有助于阳气生发",
        "春季多做户外活动，感受东方升发之气",
        "居住环境宜朝东开窗，利于采光通风",
        "早晨宜喝温水，促进气血运行"
      ],
      cultural: [
        "东方在古代文化中象征着希望和新生命的开始",
        "传统建筑讲究坐北朝南，但重视东方的朝向设计",
        "风水学中东方为青龙之位，主事业和运势"
      ]
    },
    south: {
      name: "南", 
      wuxing: "fire",
      description: "南方丙丁火，象征炎热旺盛，阳气鼎盛。南方为正阳之地，代表热情与繁荣，是夏季的方位象征。",
      color: "#D32F2F",
      time: "巳午时（9-13时）",
      animal: "蛇、马",
      properties: ["炎热", "热情", "繁荣", "光明", "活力"],
      healthTips: [
        "正午避免烈日暴晒，注意防暑降温",
        "夏季宜居住在朝南的房间，便于通风",
        "中午时段宜静养，避免剧烈运动",
        "多食用清凉解暑的食物，保持水分平衡"
      ],
      cultural: [
        "南方在传统文化中象征着文明繁荣和文化昌盛",
        "古代帝王面南而坐，象征着统治天下",
        "南方为朱雀之位，主名声和威望"
      ]
    },
    center: {
      name: "中",
      wuxing: "earth", 
      description: "中央戊己土，象征生化万物，调和四方。中央为太极之地，代表稳定与包容，是长夏的方位象征。",
      color: "#F57C00",
      time: "辰戌丑未时（7-9时，13-15时，1-3时，19-21时）",
      animal: "狗、龙、牛、羊",
      properties: ["稳定", "包容", "中和", "承载", "调和"],
      healthTips: [
        "保持规律的作息时间，避免过度劳累",
        "饮食均衡，不偏食不挑食，脾胃调和",
        "保持情绪稳定，避免过度思虑",
        "适度运动，增强脾胃运化功能"
      ],
      cultural: [
        "中央在中国文化中具有重要的象征意义，代表着核心地位",
        "古代天圆地方思想中，大地居于中央位置",
        "中央为黄龙之位，主权力和地位"
      ]
    },
    west: {
      name: "西",
      wuxing: "metal",
      description: "西方庚辛金，象征收敛肃杀，阴气始生。西方为日落之地，代表收获与肃杀，是秋季的方位象征。", 
      color: "#7B1FA2",
      time: "申酉时（15-19时）",
      animal: "猴、鸡",
      properties: ["收敛", "肃杀", "收获", "清净", "成熟"],
      healthTips: [
        "秋季宜早睡早起，与鸡俱兴，顺应秋收之气",
        "傍晚适度运动，有助于肺气宣发",
        "保持情绪平和，避免过度悲伤",
        "多食润肺食物，如梨、百合等"
      ],
      cultural: [
        "西方在传统观念中象征着收获和成熟",
        "古代以西为尊，有西方接引之说",
        "西方为白虎之位，主武职和权威"
      ]
    },
    north: {
      name: "北",
      wuxing: "water",
      description: "北方壬癸水，象征寒凉闭藏，阴气鼎盛。北方为寒冷之地，代表沉静与储藏，是冬季的方位象征。",
      color: "#1976D2", 
      time: "亥子时（21-1时，1-3时）",
      animal: "猪、鼠",
      properties: ["寒凉", "闭藏", "沉静", "智慧", "神秘"],
      healthTips: [
        "冬季宜早睡晚起，必待日光，顺应冬藏之气",
        "保持室内温暖，避免受寒着凉",
        "避免过度恐惧，保持心神安宁",
        "适度运动，保存阳气，避免过度出汗"
      ],
      cultural: [
        "北方在文化中象征着智慧和深邃的思想",
        "古代以北为尊，有北辰之说",
        "北方为玄武之位，主长寿和稳固"
      ]
    }
  },

  // 五色与五行对应
  wuse: {
    green: {
      name: "青",
      wuxing: "wood",
      description: "青色属木，象征生机勃发，万物复苏。青色如春叶初生，代表着生命的活力与希望，是春季的代表性色彩。",
      color: "#2E7D32",
      emotion: "舒畅",
      organ: "肝",
      properties: ["生机", "希望", "成长", "清新", "舒展"],
      healthTips: [
        "多观绿色植物，有助于缓解眼部疲劳",
        "春季宜多穿青色衣物，顺应春气生发",
        "饮食中多添加青绿色蔬菜，如菠菜、青椒等",
        "环境布置中加入青色调，有助于情绪舒畅"
      ],
      cultural: [
        "青色在中国传统中象征着生命力和希望",
        "古代青瓷体现了中国人对青色的独特审美",
        "青色代表春天的生机，是四时之首的象征"
      ]
    },
    red: {
      name: "赤",
      wuxing: "fire", 
      description: "赤色属火，象征热情活力，阳气旺盛。赤色如烈火燃烧，代表着热烈与激情，是夏季的代表性色彩。",
      color: "#D32F2F",
      emotion: "喜悦",
      organ: "心",
      properties: ["热情", "活力", "喜庆", "光明", "热烈"],
      healthTips: [
        "适量观红色有助于提振精神，但过度可能激动心神",
        "夏季宜穿红色衣物，有助于血液循环",
        "多食红色食物如红枣、西红柿等养心补血",
        "喜庆场合用红色装饰，增添欢乐气氛"
      ],
      cultural: [
        "赤色在中国文化中象征着喜庆和吉祥",
        "传统婚礼以红色为主色调，象征幸福美满",
        "红色代表夏天的热烈，体现生命的旺盛"
      ]
    },
    yellow: {
      name: "黄",
      wuxing: "earth",
      description: "黄色属土，象征中和厚德，万物化生。黄色如大地厚重，代表着稳定与包容，是长夏的代表性色彩。",
      color: "#F57C00",
      emotion: "思虑",
      organ: "脾",
      properties: ["中和", "厚德", "承载", "稳定", "包容"],
      healthTips: [
        "黄色环境有助于思维集中，适合学习工作",
        "长夏季节多接触黄色，有助于健脾",
        "多食黄色食物如南瓜、玉米等健脾养胃",
        "穿着黄色衣物有助于稳定情绪，增强自信"
      ],
      cultural: [
        "黄色在中国历史上是皇室的专用色彩",
        "黄土高原体现了黄色的地域文化特色",
        "黄色代表中央地位，象征着权力和尊贵"
      ]
    },
    white: {
      name: "白",
      wuxing: "metal",
      description: "白色属金，象征纯洁肃杀，收敛清明。白色如秋霜皎洁，代表着纯洁与肃杀，是秋季的代表性色彩。",
      color: "#7B1FA2",
      emotion: "悲伤",
      organ: "肺",
      properties: ["纯洁", "肃杀", "收敛", "清明", "简约"],
      healthTips: [
        "白色环境有助于静心养性，适合冥想",
        "秋季多接触白色，有助于肺气肃降",
        "多食白色食物如梨、百合等润肺养阴",
        "穿着白色衣物有助于心神宁静，减少焦虑"
      ],
      cultural: [
        "白色在中国传统文化中象征着纯洁和 mourning",
        "白瓷体现了中国陶瓷艺术的极致追求",
        "白色代表秋天的萧瑟，体现自然规律"
      ]
    },
    black: {
      name: "黑",
      wuxing: "water",
      description: "黑色属水，象征深沉神秘，寒凉闭藏。黑色如深海幽深，代表着神秘与储藏，是冬季的代表性色彩。",
      color: "#1976D2",
      emotion: "恐惧", 
      organ: "肾",
      properties: ["深沉", "神秘", "闭藏", "智慧", "庄重"],
      healthTips: [
        "适当接触黑色环境有助于深度思考和专注",
        "冬季多接触黑色，有助于肾精封藏",
        "多食黑色食物如黑豆、黑芝麻等补肾益精",
        "黑色装饰有助于营造安静祥和的休息环境"
      ],
      cultural: [
        "黑色在中国文化中象征着庄重和神秘",
        "古代书法多用黑墨，体现了文人情怀",
        "黑色代表冬天的深邃，象征着智慧的沉淀"
      ]
    }
  },

  // 五味与五行对应
  wuwei: {
    sour: {
      name: "酸",
      wuxing: "wood",
      description: "酸味属木，能收敛固涩，入肝经。酸味如梅子初熟，具有收敛固涩、生津开胃的功效。",
      effect: "收敛固涩，生津开胃",
      disease: "肝木失调",
      properties: ["收敛", "固涩", "生津", "开胃", "入肝经"],
      healthTips: [
        "适量食酸有助于消化，但过量可能导致胃酸过多",
        "春季宜适当食酸，有助于肝气疏泄",
        "食酸后宜漱口，保护牙齿健康",
        "胃酸过多者不宜过多食用酸性食物"
      ],
      cultural: [
        "酸味在中国饮食文化中有着悠久历史",
        "古代醋的制作体现了中国人对酸味的运用",
        "酸味与肝相应，象征着收敛和调节"
      ]
    },
    bitter: {
      name: "苦",
      wuxing: "fire",
      description: "苦味属火，能清热泻火，入心经。苦味如黄连清苦，具有清热泻火、燥湿坚阴的功效。",
      effect: "清热泻火，燥湿坚阴",
      disease: "心火亢盛",
      properties: ["清热", "泻火", "燥湿", "坚阴", "入心经"],
      healthTips: [
        "夏季适量食苦有助于清热解暑",
        "心火旺盛时可适当食苦味食物清心",
        "脾胃虚寒者不宜过多食用苦味食物",
        "苦味食物多用于药用，饮食中适量添加"
      ],
      cultural: [
        "苦味在中国文化中象征着坚韧和毅力",
        "古人云'良药苦口'，体现了对苦味的认知",
        "苦味与心相应，象征着清净和澄明"
      ]
    },
    sweet: {
      name: "甘",
      wuxing: "earth",
      description: "甘味属土，能补益和中，入脾经。甘味如蜂蜜甘甜，具有补益脾胃、缓急止痛的功效。",
      effect: "补益脾胃，缓急止痛",
      disease: "脾胃虚弱",
      properties: ["补益", "和中", "缓急", "止痛", "入脾经"],
      healthTips: [
        "适量食甘能补益脾胃，但过量可能导致湿热",
        "长夏季节适当食甘有助于健脾",
        "糖尿病患者应严格控制糖分摄入",
        "甘味食物易滋生湿气，湿气重者宜少食"
      ],
      cultural: [
        "甘味在中国饮食文化中最为普遍和受欢迎",
        "传统甜食体现了中国人对甘味的喜爱",
        "甘味与脾相应，象征着滋养和生长"
      ]
    },
    pungent: {
      name: "辛",
      wuxing: "metal",
      description: "辛味属金，能发散行气，入肺经。辛味如辣椒辛辣，具有发散解表、行气活血的功效。",
      effect: "发散解表，行气活血",
      disease: "肺气不宣",
      properties: ["发散", "行气", "活血", "解表", "入肺经"],
      healthTips: [
        "感冒初期适量食辛有助于发汗解表",
        "秋季适当食辛有助肺气宣发",
        "阴虚火旺者不宜过多食用辛辣食物",
        "辛辣食物刺激肠胃，胃病患者应适量"
      ],
      cultural: [
        "辛味在中国饮食文化中占有重要地位",
        "川菜、湘菜等体现了中国人对辛味的运用",
        "辛味与肺相应，象征着宣发和通畅"
      ]
    },
    salty: {
      name: "咸",
      wuxing: "water",
      description: "咸味属水，能软坚散结，入肾经。咸味如海盐咸涩，具有软坚散结、泻下通便的功效。",
      effect: "软坚散结，泻下通便",
      disease: "肾水不足",
      properties: ["软坚", "散结", "泻下", "通便", "入肾经"],
      healthTips: [
        "适量食咸能软坚散结，但过量会伤肾",
        "冬季宜适当食咸以补肾，但要控制总量",
        "高血压患者应严格控制盐分摄入",
        "咸味食物易导致水肿，肾病患者应慎食"
      ],
      cultural: [
        "咸味在中国饮食文化中是基础调味",
        "古代制盐技术的发展体现了文明进步",
        "咸味与肾相应，象征着生命和活力"
      ]
    }
  },

  // 五音与五行对应
  wuyin: {
    jue: {
      name: "角",
      wuxing: "wood",
      description: "角音属木，声音清越，如林木生长",
      frequency: "应春季，调肝气",
      emotion: "舒畅条达"
    },
    zhi: {
      name: "徵", 
      wuxing: "fire",
      description: "徵音属火，声音明亮，如火焰升腾",
      frequency: "应夏季，调心气",
      emotion: "欢乐喜庆"
    },
    gong: {
      name: "宫",
      wuxing: "earth", 
      description: "宫音属土，声音浑厚，如大地承载",
      frequency: "应长夏，调脾气",
      emotion: "中正平和"
    },
    shang: {
      name: "商",
      wuxing: "metal",
      description: "商音属金，声音清脆，如金属相击",
      frequency: "应秋季，调肺气",
      emotion: "肃杀收敛"
    },
    yu: {
      name: "羽",
      wuxing: "water", 
      description: "羽音属水，声音深沉，如水流不息",
      frequency: "应冬季，调肾气",
      emotion: "深沉静谧"
    }
  },

  // 五脏与五行对应
  wuzang: {
    liver: {
      name: "肝",
      wuxing: "wood",
      description: "肝属木，主疏泄，藏血，主筋。肝为将军之官，谋虑出焉，具有疏泄气机、调畅情志的重要功能。",
      function: "疏泄气机，调畅情志，藏血，主筋",
      emotion: "怒",
      symptom: "目赤、易怒、胁痛",
      properties: ["疏泄", "藏血", "主筋", "谋虑", "将军之官"],
      healthTips: [
        "保持情绪舒畅，避免过度愤怒，有助肝气条达",
        "春季养肝，多到户外散步，感受春阳之气",
        "多食绿色食物，如青菜、菠菜等养肝",
        "保证充足睡眠，夜间11点前入睡利于肝血修复"
      ],
      cultural: [
        "肝在中医五行理论中代表着谋虑和决策能力",
        "古代将肝比作将军，体现了其重要的生理功能",
        "肝与春季相应，象征着生命力的生发和成长"
      ]
    },
    heart: {
      name: "心",
      wuxing: "fire",
      description: "心属火，主血脉，藏神，主汗。心为君主之官，神明出焉，是全身生命活动的核心。",
      function: "推动血行，温煦全身，藏神，主汗",
      emotion: "喜",
      symptom: "心悸、失眠、面红",
      properties: ["主血脉", "藏神", "主汗", "君主之官", "神明"],
      healthTips: [
        "保持心态平和，避免过度喜悦或激动",
        "夏季养心，适当午休，顺应夏日阳气",
        "多食红色食物如红枣、枸杞等养心",
        "适度运动，但避免剧烈运动损伤心神"
      ],
      cultural: [
        "心在中国传统文化中象征着精神活动和意识",
        "古人认为心是思维情感的器官，有'心之官则思'之说",
        "心与夏季相应，象征着光明和热情"
      ]
    },
    spleen: {
      name: "脾",
      wuxing: "earth",
      description: "脾属土，主运化，统血，主肉。脾为仓廪之官，五味出焉，是消化吸收的核心器官。",
      function: "运化水谷，化生气血，统血，主肉",
      emotion: "思",
      symptom: "腹胀、乏力、便溏",
      properties: ["运化", "统血", "主肉", "仓廪之官", "气血生化之源"],
      healthTips: [
        "规律饮食，避免暴饮暴食损伤脾胃",
        "保持心情舒畅，避免过度思虑伤脾",
        "长夏养脾，多食黄色食物如南瓜、玉米等",
        "适度运动，促进脾胃运化功能"
      ],
      cultural: [
        "脾在五行中代表后天之本，是气血生化之源",
        "古代将脾比作仓廪之官，体现了其储藏转化的功能",
        "脾与长夏相应，象征着生长和转化"
      ]
    },
    lung: {
      name: "肺", 
      wuxing: "metal",
      description: "肺属金，主气，司呼吸，主皮毛。肺为相傅之官，治节出焉，是呼吸系统的核心。",
      function: "主气司呼吸，通调水道，宣降，主皮毛",
      emotion: "悲",
      symptom: "咳嗽、气短、皮燥",
      properties: ["主气", "司呼吸", "主皮毛", "相傅之官", "治节"],
      healthTips: [
        "避免过度悲伤，保持情绪平和有利肺气",
        "秋季养肺，多到户外呼吸新鲜空气",
        "多食白色食物如梨、百合等润肺",
        "适度运动，增强肺功能，但要避免空气污染"
      ],
      cultural: [
        "肺在传统文化中象征着治理和管理能力",
        "古代将肺比作相傅，体现了其辅助治理的功能",
        "肺与秋季相应，象征着收获和肃杀"
      ]
    },
    kidney: {
      name: "肾",
      wuxing: "water",
      description: "肾属水，藏精，主水，主骨。肾为作强之官，伎巧出焉，是先天之本。",
      function: "藏精纳气，主水液代谢，主骨生髓",
      emotion: "恐",
      symptom: "腰痛、畏寒、水肿",
      properties: ["藏精", "主水", "主骨", "作强之官", "先天之本"],
      healthTips: [
        "避免过度恐惧，保持精神内守",
        "冬季养肾，早睡晚起，保存阳气",
        "多食黑色食物如黑豆、黑芝麻等补肾",
        "适度运动但避免剧烈出汗，保存肾精"
      ],
      cultural: [
        "肾在中国传统文化中象征着生命力和生殖能力",
        "古人认为肾藏精，是生命活动的根本",
        "肾与冬季相应，象征着储藏和休养"
      ]
    }
  },

  // 五官与五行对应
  wuguan: {
    eye: {
      name: "目",
      wuxing: "wood",
      description: "目为肝之窍，反映肝脏功能",
      function: "视觉功能，反映肝血盛衰"
    },
    tongue: {
      name: "舌",
      wuxing: "fire",
      description: "舌为心之苗，反映心脏功能", 
      function: "味觉语言，反映心神状态"
    },
    mouth: {
      name: "口",
      wuxing: "earth",
      description: "口为脾之窍，反映脾胃功能",
      function: "进食咀嚼，反映脾胃运化"
    },
    nose: {
      name: "鼻",
      wuxing: "metal", 
      description: "鼻为肺之窍，反映肺脏功能",
      function: "呼吸嗅觉，反映肺气盛衰"
    },
    ear: {
      name: "耳",
      wuxing: "water",
      description: "耳为肾之窍，反映肾脏功能",
      function: "听觉平衡，反映肾精盈亏"
    }
  },

  // 五气与五行对应
  wuqi: {
    wind: {
      name: "风",
      wuxing: "wood",
      description: "风气通于肝，春季主气",
      characteristic: "善行数变，主动摇"
    },
    heat: {
      name: "热",
      wuxing: "fire",
      description: "热气通于心，夏季主气",
      characteristic: "炎上，耗散津液"
    },
    damp: {
      name: "湿",
      wuxing: "earth", 
      description: "湿气通于脾，长夏主气",
      characteristic: "重浊黏滞，阻碍气机"
    },
    dry: {
      name: "燥",
      wuxing: "metal",
      description: "燥气通于肺，秋季主气",
      characteristic: "干涩伤津，收敛肃杀"
    },
    cold: {
      name: "寒",
      wuxing: "water",
      description: "寒气通于肾，冬季主气",
      characteristic: "凝滞收引，损伤阳气"
    }
  },

  // 五季与五行对应
  wuji: {
    spring: {
      name: "春",
      wuxing: "wood", 
      description: "春季属木，万物生发，阳气始生",
      climate: "风和日暖，万物复苏",
      health: "养肝护目，情志舒畅"
    },
    summer: {
      name: "夏",
      wuxing: "fire",
      description: "夏季属火，万物繁茂，阳气鼎盛",
      climate: "炎热多雨，生长旺盛", 
      health: "养心安神，清热防暑"
    },
    longSummer: {
      name: "长夏",
      wuxing: "earth",
      description: "长夏属土，万物化生，阴阳调和",
      climate: "湿热交蒸，化育万物",
      health: "养脾健胃，祛湿防病"
    },
    autumn: {
      name: "秋",
      wuxing: "metal",
      description: "秋季属金，万物收敛，阴气始生",
      climate: "干燥凉爽，收获季节",
      health: "养肺润燥，宁心敛神"
    },
    winter: {
      name: "冬",
      wuxing: "water",
      description: "冬季属水，万物闭藏，阴气鼎盛",
      climate: "寒冷干燥，蛰伏休眠",
      health: "养肾防寒，保精藏神"
    }
  },

  // 五志与五行对应
  wuzhi: {
    anger: {
      name: "怒",
      wuxing: "wood",
      description: "怒伤肝，怒则气上",
      effect: "使气机上逆，伤肝损目"
    },
    joy: {
      name: "喜",
      wuxing: "fire",
      description: "喜伤心，喜则气缓",
      effect: "使气机舒缓，过度伤心神"
    },
    thought: {
      name: "思",
      wuxing: "earth",
      description: "思伤脾，思则气结",
      effect: "使气机郁结，伤脾失运"
    },
    sorrow: {
      name: "悲",
      wuxing: "metal",
      description: "悲伤肺，悲则气消",
      effect: "使气机消耗，过度伤肺气"
    },
    fear: {
      name: "恐",
      wuxing: "water",
      description: "恐伤肾，恐则气下",
      effect: "使气机下陷，伤肾失固"
    }
  },

  // 五德与五行对应
  wude: {
    benevolence: {
      name: "仁",
      wuxing: "wood",
      description: "仁属木，象征生生之德，慈爱悲悯",
      virtue: "爱人利物，生机不息"
    },
    propriety: {
      name: "礼",
      wuxing: "fire",
      description: "礼属火，象征文明之德，秩序和谐",
      virtue: "恭敬谦让，文明有序"
    },
    trustworthiness: {
      name: "信",
      wuxing: "earth",
      description: "信属土，象征诚信之德，厚德载物",
      virtue: "诚实守信，厚重包容"
    },
    righteousness: {
      name: "义",
      wuxing: "metal",
      description: "义属金，象征正义之德，刚正不阿",
      virtue: "公正廉明，刚正果断"
    },
    wisdom: {
      name: "智",
      wuxing: "water",
      description: "智属水，象征智慧之德，深邃玄远",
      virtue: "明辨是非，深沉睿智"
    }
  },

  // 五星与五行对应
  wuxingStars: {
    jupiter: {
      name: "木星",
      wuxing: "wood",
      description: "木星属木，岁星，主春季生发之象",
      period: "十二年一周期",
      influence: "主万物生长，农业丰歉"
    },
    mars: {
      name: "火星",
      wuxing: "fire",
      description: "火星属火，荧惑，主夏季炎热之象",
      period: "约两年一周期", 
      influence: "主战争动乱，旱灾火灾"
    },
    saturn: {
      name: "土星",
      wuxing: "earth",
      description: "土星属土，镇星，主长夏化生之象",
      period: "约二十九年一周期",
      influence: "主社会安定，民生状况"
    },
    venus: {
      name: "金星",
      wuxing: "metal",
      description: "金星属金，太白，主秋季收敛之象",
      period: "约一年一周期",
      influence: "主刑法兵戈，收获收割"
    },
    mercury: {
      name: "水星",
      wuxing: "water", 
      description: "水星属水，辰星，主冬季闭藏之象",
      period: "约八十八天一周期",
      influence: "主智慧谋略，水利灾害"
    }
  }
};

module.exports = wuxingData;