// 每日一字汉字数据 - 难读字版
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
        "char": "岙",
        "correctPronunciation": "ào",
        "wrongPronunciations": [
            "qiáo",
            "yù"
        ],
        "relatedPhrases": [
            "崔家岙",
            "山岙",
            "岙口",
            "岙里"
        ],
        "explanation": "岙（ào）：浙江、福建等沿海一带称山间平地（多用于地名）。如崔家岙（浙江省地名）。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 2,
        "char": "酂",
        "correctPronunciation": "cuó",
        "wrongPronunciations": [
            "zàn",
            "cuò",
            "zuō"
        ],
        "relatedPhrases": [
            "酂阳",
            "酂城",
            "酂侯"
        ],
        "explanation": "酂（cuó）：地名，在湖北省老河口市，如酂阳。也读zàn，古县名，在今河南省永城市西南。",
        "errorReasonType": 2,
        "difficultyLevel": "高级"
    },
    {
        "id": 3,
        "char": "埔",
        "correctPronunciation": "bù",
        "wrongPronunciations": [
            "pǔ",
            "fǔ",
            "bū"
        ],
        "relatedPhrases": [
            "大埔",
            "黄埔",
            "埔头"
        ],
        "explanation": "埔（bù）：地名，在广东省梅州市，如大埔。也读pǔ，用于“黄埔”（在广东省广州市）。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 4,
        "char": "柘",
        "correctPronunciation": "zhè",
        "wrongPronunciations": [
            "tuò",
            "zhé",
            "zhà"
        ],
        "relatedPhrases": [
            "柘城",
            "柘树",
            "柘木",
            "柘黄"
        ],
        "explanation": "柘（zhè）：1. 落叶灌木或小乔木，树皮灰褐色，有长刺，叶子卵形，果实球形，红色，可以吃，木材坚硬密实，是贵重的木料。2. 地名，在河南省，如柘城。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 5,
        "char": "訾",
        "correctPronunciation": "zī",
        "wrongPronunciations": [
            "zǐ",
            "cǐ"
        ],
        "relatedPhrases": [
            "訾家",
            "訾议",
            "訾毁",
            "訾算"
        ],
        "explanation": "訾（zī）：1. 姓。2. 古同“赀”，计算。也读zǐ，说人坏话，诋毁：訾议。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 6,
        "char": "馗",
        "correctPronunciation": "kuí",
        "wrongPronunciations": [
            "jiǔ",
            "qiú",
            "guǐ"
        ],
        "relatedPhrases": [
            "钟馗",
            "馗道",
            "馗厨"
        ],
        "explanation": "馗（kuí）：1. 四通八达的大道。2. 用于人名，如钟馗（传说中能打鬼驱除邪祟的神）。",
        "errorReasonType": 6,
        "difficultyLevel": "中级"
    },
    {
        "id": 7,
        "char": "珲",
        "correctPronunciation": "hún",
        "wrongPronunciations": [
            "huī",
            "hūn",
            "huǐ"
        ],
        "relatedPhrases": [
            "珲春",
            "瑷珲",
            "珲河"
        ],
        "explanation": "珲（hún）：用于地名，如珲春（在吉林省）。也读huī，瑷珲（地名，在黑龙江省，今作爱辉）。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 8,
        "char": "疃",
        "correctPronunciation": "tuǎn",
        "wrongPronunciations": [
            "tóng",
            "zhuàng",
            "tuán"
        ],
        "relatedPhrases": [
            "百家疃",
            "疃里",
            "疃堡",
            "庄疃"
        ],
        "explanation": "疃（tuǎn）：村庄；屯（多用于地名）。如百家疃（北京市地名）。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 10,
        "char": "蚌",
        "correctPronunciation": "bèng",
        "wrongPronunciations": [
            "bàng",
            "péng",
            "bàn"
        ],
        "relatedPhrases": [
            "蚌埠",
            "蚌山",
            "蚌港"
        ],
        "explanation": "蚌（bèng）：用于地名，如蚌埠（在安徽省）。也读bàng，软体动物，有两个椭圆形介壳，可以开闭。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 11,
        "char": "埠",
        "correctPronunciation": "bù",
        "wrongPronunciations": [
            "fù",
            "pù",
            "bū"
        ],
        "relatedPhrases": [
            "蚌埠",
            "商埠",
            "埠头",
            "本埠"
        ],
        "explanation": "埠（bù）：1. 码头，多指有码头的城镇：商埠。2. 旧指与外国通商的城市：开埠。如蚌埠（安徽省地名）。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 13,
        "char": "郯",
        "correctPronunciation": "tán",
        "wrongPronunciations": [
            "yán",
            "dàn",
            "zhàn"
        ],
        "relatedPhrases": [
            "郯城",
            "郯国",
            "郯子"
        ],
        "explanation": "郯（tán）：1. 古国名，在今山东省郯城县一带。2. 地名，在山东省，如郯城。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 14,
        "char": "鄄",
        "correctPronunciation": "juàn",
        "wrongPronunciations": [
            "yān",
            "juān",
            "quān"
        ],
        "relatedPhrases": [
            "鄄城",
            "鄄邑",
            "鄄地"
        ],
        "explanation": "鄄（juàn）：地名，在山东省菏泽市，如鄄城。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 15,
        "char": "宕",
        "correctPronunciation": "dàng",
        "wrongPronunciations": [
            "tán",
            "dāng",
            "tuò"
        ],
        "relatedPhrases": [
            "宕昌",
            "宕渠",
            "跌宕",
            "延宕"
        ],
        "explanation": "宕（dàng）：1. 拖延：延宕。2. 放纵，不受拘束：跌宕。3. 地名，在甘肃省，如宕昌。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 16,
        "char": "渑",
        "correctPronunciation": "miǎn",
        "wrongPronunciations": [
            "shéng",
            "mǐn",
            "miàn"
        ],
        "relatedPhrases": [
            "渑池",
            "渑水",
            "渑淄"
        ],
        "explanation": "渑（miǎn）：用于地名，如渑池（在河南省）。也读shéng，古水名，在今山东省临淄市一带。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 17,
        "char": "荥",
        "correctPronunciation": "xíng",
        "wrongPronunciations": [
            "yíng",
            "xìng",
            "róng"
        ],
        "relatedPhrases": [
            "荥阳",
            "荥泽",
            "荥河"
        ],
        "explanation": "荥（xíng）：用于地名，如荥阳（在河南省郑州市）。也读yíng，荥经（在四川省雅安市）。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 18,
        "char": "汜",
        "correctPronunciation": "sì",
        "wrongPronunciations": [
            "fàn",
            "fú"
        ],
        "relatedPhrases": [
            "汜水",
            "汜河",
            "汜南"
        ],
        "explanation": "汜（sì）：1. 水名，在河南省郑州市，东流入贾鲁河。2. 不流通的小沟渠。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 19,
        "char": "鄱",
        "correctPronunciation": "pó",
        "wrongPronunciations": [
            "bó",
            "pān",
            "fán"
        ],
        "relatedPhrases": [
            "鄱阳湖",
            "鄱阳",
            "鄱阳县"
        ],
        "explanation": "鄱（pó）：用于地名，如鄱阳湖（在江西省）、鄱阳县（在江西省上饶市）。",
        "errorReasonType": 6,
        "difficultyLevel": "中级"
    },
    {
        "id": 22,
        "char": "褒",
        "correctPronunciation": "bāo",
        "wrongPronunciations": [
            "bǎo",
            "bào",
            "bā"
        ],
        "relatedPhrases": [
            "褒斜道",
            "褒姒",
            "褒奖",
            "褒扬"
        ],
        "explanation": "褒（bāo）：1. 赞扬，夸奖：褒奖。2. 地名，如褒斜道（在陕西省）。3. 姓。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 23,
        "char": "亳",
        "correctPronunciation": "bó",
        "wrongPronunciations": [
            "háo",
            "bǎo"
        ],
        "relatedPhrases": [
            "亳州",
            "亳都",
            "亳县",
            "亳州古城"
        ],
        "explanation": "亳（bó）：地名，在安徽省亳州市，是中国历史文化名城，商朝早期都城。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 24,
        "char": "郴",
        "correctPronunciation": "chēn",
        "wrongPronunciations": [
            "bīn",
            "shān",
            "chén"
        ],
        "relatedPhrases": [
            "郴州",
            "郴江",
            "郴山",
            "郴州市"
        ],
        "explanation": "郴（chēn）：地名，在湖南省郴州市，因郴江而得名。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 25,
        "char": "舂",
        "correctPronunciation": "chōng",
        "wrongPronunciations": [
            "chūn",
            "cōng",
            "chǒng"
        ],
        "relatedPhrases": [
            "舂陵",
            "舂米",
            "舂杵",
            "舂臼"
        ],
        "explanation": "舂（chōng）：把东西放在石臼或乳钵里捣掉皮壳或捣碎：舂米。地名，如舂陵（在湖南省宁远县）。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 26,
        "char": "澶",
        "correctPronunciation": "chán",
        "wrongPronunciations": [
            "dàn",
            "zhàn",
            "tán"
        ],
        "relatedPhrases": [
            "澶渊",
            "澶州",
            "澶渊之盟",
            "澶水"
        ],
        "explanation": "澶（chán）：1. 古湖名，在今河南省濮阳市西。2. 地名，如澶州（古州名，在今河南省濮阳市）。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 27,
        "char": "爨",
        "correctPronunciation": "cuàn",
        "wrongPronunciations": [
            "cuān",
            "cuán",
            "cù"
        ],
        "relatedPhrases": [
            "爨底下",
            "爨宝子碑",
            "爨龙颜碑",
            "爨乡"
        ],
        "explanation": "爨（cuàn）：1. 烧火做饭：分居各爨。2. 灶：执爨。3. 地名，如爨底下（在北京西郊门头沟区）。4. 姓。",
        "errorReasonType": 6,
        "difficultyLevel": "挑战级"
    },
    {
        "id": 28,
        "char": "仃",
        "correctPronunciation": "dīng",
        "wrongPronunciations": [
            "tīng",
            "dǐng",
            "dìng"
        ],
        "relatedPhrases": [
            "伶仃洋",
            "孤苦伶仃",
            "仃伶",
            "仃立"
        ],
        "explanation": "仃（dīng）：孤独，没有依靠：伶仃。地名，如伶仃洋（在广东省珠江口外）。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 29,
        "char": "沌",
        "correctPronunciation": "zhuàn",
        "wrongPronunciations": [
            "dùn",
            "tún",
            "zhuǎn"
        ],
        "relatedPhrases": [
            "沌口",
            "沌阳",
            "混沌",
            "浑沌"
        ],
        "explanation": "沌（zhuàn）：用于地名，如沌口（在湖北省武汉市）、沌阳（在湖北省武汉市）。也读dùn，混沌（hùn dùn）。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 30,
        "char": "汾",
        "correctPronunciation": "fén",
        "wrongPronunciations": [
            "fēn",
            "fěn",
            "fèn"
        ],
        "relatedPhrases": [
            "汾河",
            "汾阳",
            "汾酒",
            "汾州"
        ],
        "explanation": "汾（fén）：水名，汾河（在山西省），是黄河的第二大支流。地名，如汾阳（在山西省）。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 31,
        "char": "涪",
        "correctPronunciation": "fú",
        "wrongPronunciations": [
            "péi",
            "fǔ",
            "bèi"
        ],
        "relatedPhrases": [
            "涪陵",
            "涪江",
            "涪城",
            "涪州"
        ],
        "explanation": "涪（fú）：水名，涪江（在四川省），是嘉陵江的支流。地名，如涪陵（在重庆市）。",
        "errorReasonType": 6,
        "difficultyLevel": "中级"
    },
    {
        "id": 32,
        "char": "阜",
        "correctPronunciation": "fù",
        "wrongPronunciations": [
            "bù",
            "fǔ",
            "pù"
        ],
        "relatedPhrases": [
            "阜阳",
            "阜宁",
            "阜南",
            "阜盛"
        ],
        "explanation": "阜（fù）：1. 土山：高阜。2. （物资）多：物阜民丰。3. 地名，如阜阳（在安徽省）、阜宁（在江苏省）。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 33,
        "char": "邗",
        "correctPronunciation": "hán",
        "wrongPronunciations": [
            "gān",
            "hàn",
            "hé"
        ],
        "relatedPhrases": [
            "邗江",
            "邗沟",
            "邗城",
            "邗国"
        ],
        "explanation": "邗（hán）：1. 古国名，在今江苏省扬州市一带。2. 地名，如邗江（在江苏省扬州市）。3. 邗沟（中国古代运河，是大运河的最早一段）。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 34,
        "char": "黟",
        "correctPronunciation": "yī",
        "wrongPronunciations": [
            "xī",
            "wū",
            "yǐ"
        ],
        "relatedPhrases": [
            "黟县",
            "黟山",
            "黟然",
            "黟黑"
        ],
        "explanation": "黟（yī）：1. 黑木。2. 黑，黑色：黟然黑者为星星。3. 地名，如黟县（在安徽省黄山市）、黟山（黄山的古称）。",
        "errorReasonType": 6,
        "difficultyLevel": "挑战级"
    },
    {
        "id": 35,
        "char": "蓟",
        "correctPronunciation": "jì",
        "wrongPronunciations": [
            "jī",
            "qí",
            "jiè"
        ],
        "relatedPhrases": [
            "蓟县",
            "蓟州",
            "蓟城",
            "蓟门"
        ],
        "explanation": "蓟（jì）：1. 多年生草本植物，花紫色，可入药。2. 地名，如蓟县（在天津市）、蓟州（古州名，在今河北省北部）。3. 古地名，在北京西南，曾是燕国都城。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 36,
        "char": "葭",
        "correctPronunciation": "jiā",
        "wrongPronunciations": [
            "xiá",
            "jiǎ",
            "jià"
        ],
        "relatedPhrases": [
            "葭萌关",
            "蒹葭",
            "葭莩",
            "葭思"
        ],
        "explanation": "葭（jiā）：1. 初生的芦苇：蒹葭。2. 地名，如葭萌关（在四川省广元市）。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 37,
        "char": "犍",
        "correctPronunciation": "qián",
        "wrongPronunciations": [
            "jiān",
            "gān",
            "jiàn"
        ],
        "relatedPhrases": [
            "犍为",
            "犍牛",
            "犍子",
            "犍陀罗"
        ],
        "explanation": "犍（qián）：用于地名，如犍为（在四川省乐山市）。也读jiān，指阉割过的公牛。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 39,
        "char": "崀",
        "correctPronunciation": "làng",
        "wrongPronunciations": [
            "liáng",
            "lǎng",
            "lāng"
        ],
        "relatedPhrases": [
            "崀山",
            "崀山丹霞",
            "崀山风景区",
            "崀山世界遗产"
        ],
        "explanation": "崀（làng）：地名，如崀山（在湖南省邵阳市新宁县，是世界自然遗产）。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 40,
        "char": "泸",
        "correctPronunciation": "lú",
        "wrongPronunciations": [
            "lǔ",
            "lù",
            "lū"
        ],
        "relatedPhrases": [
            "泸州",
            "泸定桥",
            "泸县",
            "泸水"
        ],
        "explanation": "泸（lú）：1. 水名，泸水（金沙江在中国四川省宜宾市以上、四川省和云南省交界处的一段）。2. 地名，如泸州（在四川省）、泸定桥（在四川省甘孜藏族自治州）。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 44,
        "char": "臧",
        "correctPronunciation": "zāng",
        "wrongPronunciations": [
            "cáng",
            "zàng"
        ],
        "relatedPhrases": [
            "臧姓",
            "臧否",
            "臧氏",
            "臧克家"
        ],
        "explanation": "臧（zāng）：1. 善，好：臧否（pǐ）（褒贬，评论，说好说坏）。2. 姓，如臧克家（中国现代诗人）。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 45,
        "char": "查",
        "correctPronunciation": "zhā",
        "wrongPronunciations": [
            "chá",
            "zā",
            "zhǎ"
        ],
        "relatedPhrases": [
            "查姓",
            "查良镛",
            "查济",
            "查干湖"
        ],
        "explanation": "查（zhā）：1. 姓，如查良镛（金庸，中国著名武侠小说家）。2. 同“楂”。3. 古同“槎”，水中浮木。也读chá，检查，调查。",
        "errorReasonType": 2,
        "difficultyLevel": "初级"
    },
    {
        "id": 46,
        "char": "尉",
        "correctPronunciation": "yù",
        "wrongPronunciations": [
            "wèi"
        ],
        "relatedPhrases": [
            "尉迟",
            "尉迟恭",
            "尉迟琳嘉"
        ],
        "explanation": "尉（yù）：用于复姓尉迟，如唐朝名将尉迟恭。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 47,
        "char": "万",
        "correctPronunciation": "mò",
        "wrongPronunciations": [
            "wàn"
        ],
        "relatedPhrases": [
            "万俟",
            "万俟卨",
            "万俟姓"
        ],
        "explanation": "万（mò）：用于复姓万俟，如南宋奸臣万俟卨。",
        "errorReasonType": 2,
        "difficultyLevel": "高级"
    },
    {
        "id": 48,
        "char": "俟",
        "correctPronunciation": "qí",
        "wrongPronunciations": [
            "sì",
            "sī"
        ],
        "relatedPhrases": [
            "万俟",
            "万俟卨",
            "万俟姓"
        ],
        "explanation": "俟（qí）：用于复姓万俟，如南宋奸臣万俟卨。",
        "errorReasonType": 2,
        "difficultyLevel": "高级"
    },
    {
        "id": 49,
        "char": "澹",
        "correctPronunciation": "tán",
        "wrongPronunciations": [
            "dàn",
            "zhān"
        ],
        "relatedPhrases": [
            "澹台",
            "澹台灭明",
            "澹台姓"
        ],
        "explanation": "澹（tán）：用于复姓澹台，如孔子弟子澹台灭明。",
        "errorReasonType": 2,
        "difficultyLevel": "高级"
    },
    {
        "id": 50,
        "char": "甫",
        "correctPronunciation": "fǔ",
        "wrongPronunciations": [
            "pǔ",
            "bǎo"
        ],
        "relatedPhrases": [
            "皇甫",
            "皇甫谧",
            "皇甫姓"
        ],
        "explanation": "甫（fǔ）：用于复姓皇甫，如西晋医学家皇甫谧。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 51,
        "char": "令",
        "correctPronunciation": "líng",
        "wrongPronunciations": [
            "lìng"
        ],
        "relatedPhrases": [
            "令狐",
            "令狐冲",
            "令狐姓"
        ],
        "explanation": "令（líng）：用于复姓令狐，如唐朝文学家令狐楚、金庸小说《笑傲江湖》中的令狐冲。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 52,
        "char": "长",
        "correctPronunciation": "zhǎng",
        "wrongPronunciations": [
            "cháng"
        ],
        "relatedPhrases": [
            "长孙",
            "长孙无忌",
            "长孙皇后"
        ],
        "explanation": "长（zhǎng）：用于复姓长孙，如唐朝名臣长孙无忌。",
        "errorReasonType": 2,
        "difficultyLevel": "中级"
    },
    {
        "id": 53,
        "char": "葛",
        "correctPronunciation": "gě",
        "wrongPronunciations": [
            "gé",
            "gē"
        ],
        "relatedPhrases": [
            "诸葛",
            "诸葛亮",
            "诸葛姓"
        ],
        "explanation": "葛（gě）：用于复姓诸葛，如三国时期诸葛亮。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 56,
        "char": "龘",
        "correctPronunciation": "dá",
        "wrongPronunciations": [
            "tà",
            "dā",
            "zhā"
        ],
        "relatedPhrases": [
            "龘龙",
            "龘龘",
            "龘行"
        ],
        "explanation": "龘（dá）：形容龙腾飞的样子，是目前收录在《康熙字典》中笔画最多的汉字之一，共48画。",
        "errorReasonType": 6,
        "difficultyLevel": "挑战级"
    },
    {
        "id": 57,
        "char": "靐",
        "correctPronunciation": "bìng",
        "wrongPronunciations": [
            "pīng",
            "bèng",
            "léi"
        ],
        "relatedPhrases": [
            "靐雳",
            "靐靐",
            "靐响"
        ],
        "explanation": "靐（bìng）：雷声。引申为很大的声响，如“靐靐”（雷声）。",
        "errorReasonType": 6,
        "difficultyLevel": "挑战级"
    },
    {
        "id": 58,
        "char": "齉",
        "correctPronunciation": "nàng",
        "wrongPronunciations": [
            "nāng",
            "nǎng",
            "láng"
        ],
        "relatedPhrases": [
            "齉鼻子",
            "齉齉",
            "鼻塞齉"
        ],
        "explanation": "齉（nàng）：鼻子不通气，发音不清：齉鼻子。是现代汉语中笔画较多的汉字之一，共36画。",
        "errorReasonType": 6,
        "difficultyLevel": "挑战级"
    },
    {
        "id": 59,
        "char": "龖",
        "correctPronunciation": "dá",
        "wrongPronunciations": [
            "tà",
            "dā",
            "zhā"
        ],
        "relatedPhrases": [
            "龖龙",
            "龖龘",
            "龖行"
        ],
        "explanation": "龖（dá）：1. 双龙：“龖之赫，霆之砉。”2. 龙腾飞的样子。",
        "errorReasonType": 6,
        "difficultyLevel": "挑战级"
    },
    {
        "id": 60,
        "char": "麤",
        "correctPronunciation": "cū",
        "wrongPronunciations": [
            "chū",
            "cù",
            "zū"
        ],
        "relatedPhrases": [
            "麤犷",
            "麤鲁",
            "麤糙",
            "麤笨"
        ],
        "explanation": "麤（cū）：同“粗”，指不细致，草率。是“粗”的异体字，由三个“鹿”字组成。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 61,
        "char": "鱻",
        "correctPronunciation": "xiān",
        "wrongPronunciations": [
            "yú",
            "xiǎn",
            "quán"
        ],
        "relatedPhrases": [
            "鱻鱼",
            "鱻味",
            "鱻腥"
        ],
        "explanation": "鱻（xiān）：同“鲜”，指新鲜，鲜美。是“鲜”的异体字，由三个“鱼”字组成。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 62,
        "char": "羴",
        "correctPronunciation": "shān",
        "wrongPronunciations": [
            "yáng",
            "shàn",
            "sān"
        ],
        "relatedPhrases": [
            "羴味",
            "羴羴",
            "羴香"
        ],
        "explanation": "羴（shān）：同“膻”，指羊肉的气味。是“膻”的异体字，由三个“羊”字组成。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 63,
        "char": "犇",
        "correctPronunciation": "bēn",
        "wrongPronunciations": [
            "bèn",
            "pēn",
            "mēn"
        ],
        "relatedPhrases": [
            "犇跑",
            "犇腾",
            "犇涌",
            "犇犇"
        ],
        "explanation": "犇（bēn）：同“奔”，指奔跑，疾走。是“奔”的异体字，由三个“牛”字组成。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 64,
        "char": "驫",
        "correctPronunciation": "biāo",
        "wrongPronunciations": [
            "piāo",
            "biào"
        ],
        "relatedPhrases": [
            "驫马",
            "驫驰",
            "驫驫"
        ],
        "explanation": "驫（biāo）：同“飙”，指暴风，疾风。是“飙”的异体字，由三个“马”字组成。",
        "errorReasonType": 6,
        "difficultyLevel": "挑战级"
    },
    {
        "id": 65,
        "char": "垚",
        "correctPronunciation": "yáo",
        "wrongPronunciations": [
            "yǎo",
            "tāo",
            "yào"
        ],
        "relatedPhrases": [
            "垚土",
            "垚垚",
            "垚山"
        ],
        "explanation": "垚（yáo）：同“尧”，多用于人名。是“尧”的异体字，由三个“土”字组成。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 66,
        "char": "淼",
        "correctPronunciation": "miǎo",
        "wrongPronunciations": [
            "liǎo",
            "mào",
            "miào"
        ],
        "relatedPhrases": [
            "淼淼",
            "浩淼",
            "淼渺",
            "淼漫"
        ],
        "explanation": "淼（miǎo）：同“渺”，形容水大的样子。是“渺”的异体字，由三个“水”字组成。",
        "errorReasonType": 6,
        "difficultyLevel": "中级"
    },
    {
        "id": 67,
        "char": "森",
        "correctPronunciation": "sēn",
        "wrongPronunciations": [
            "shēn",
            "sān"
        ],
        "relatedPhrases": [
            "森林",
            "阴森森",
            "森然",
            "森郁"
        ],
        "explanation": "森（sēn）：1. 树木多：森林。2. 繁密，众多：森罗万象。3. 阴暗，幽暗：阴森森。由三个“木”字组成。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 68,
        "char": "焱",
        "correctPronunciation": "yàn",
        "wrongPronunciations": [
            "yán",
            "sān"
        ],
        "relatedPhrases": [
            "焱焱",
            "焱飞",
            "焱焰",
            "焱悠"
        ],
        "explanation": "焱（yàn）：火花，火焰。由三个“火”字组成。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 69,
        "char": "磊",
        "correctPronunciation": "lěi",
        "wrongPronunciations": [
            "lèi",
            "lēi"
        ],
        "relatedPhrases": [
            "光明磊落",
            "光明正大",
            "磊落",
            "光明磊落"
        ],
        "explanation": "磊（lěi）：1. 光明正大，胸怀坦白：光明磊落。2. 石头多：怪石磊磊。由三个“石”字组成。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 70,
        "char": "晶",
        "correctPronunciation": "jīng",
        "wrongPronunciations": [
            "jìng",
            "jǐng"
        ],
        "relatedPhrases": [
            "晶莹",
            "水晶",
            "晶体",
            "结晶"
        ],
        "explanation": "晶（jīng）：1. 光亮，明亮：晶莹。2. 晶体：水晶。3. 指水晶：茶晶。由三个“日”字组成。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 71,
        "char": "众",
        "correctPronunciation": "zhòng",
        "wrongPronunciations": [
            "zhōng",
            "zhǒng"
        ],
        "relatedPhrases": [
            "众多",
            "群众",
            "观众",
            "众人"
        ],
        "explanation": "众（zhòng）：1. 许多（与“寡”相对）：众多。2. 许多人：群众。由三个“人”字组成。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 72,
        "char": "品",
        "correctPronunciation": "pǐn",
        "wrongPronunciations": [
            "pīn",
            "píng"
        ],
        "relatedPhrases": [
            "品质",
            "品种",
            "品尝",
            "品味"
        ],
        "explanation": "品（pǐn）：1. 物件：物品。2. 等级，种类：品种。3. 性质：品质。由三个“口”字组成。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 73,
        "char": "矗",
        "correctPronunciation": "chù",
        "wrongPronunciations": [
            "zhù",
            "chū"
        ],
        "relatedPhrases": [
            "矗立",
            "矗矗",
            "矗然",
            "矗入云霄"
        ],
        "explanation": "矗（chù）：直立，高耸：矗立。由三个“直”字组成。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 74,
        "char": "鑫",
        "correctPronunciation": "xīn",
        "wrongPronunciations": [
            "xīng",
            "xìn"
        ],
        "relatedPhrases": [
            "鑫鑫",
            "金鑫",
            "鑫源",
            "鑫盛"
        ],
        "explanation": "鑫（xīn）：财富兴盛（多用于人名或字号）。由三个“金”字组成。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 76,
        "char": "赑",
        "correctPronunciation": "bì",
        "wrongPronunciations": [
            "bēi",
            "bèi"
        ],
        "relatedPhrases": [
            "赑屃",
            "赑屃驮碑",
            "赑屃负重"
        ],
        "explanation": "赑（bì）：用于‘赑屃’，传说中的一种动物，像龟，是龙生九子之一，力大无穷，能驮石碑。",
        "errorReasonType": 6,
        "difficultyLevel": "挑战级"
    },
    {
        "id": 77,
        "char": "屃",
        "correctPronunciation": "xì",
        "wrongPronunciations": [
            "xǐ",
            "xī"
        ],
        "relatedPhrases": [
            "赑屃",
            "赑屃驮碑",
            "赑屃负重"
        ],
        "explanation": "屃（xì）：用于‘赑屃’，传说中的一种动物，像龟，是龙生九子之一，力大无穷，能驮石碑。",
        "errorReasonType": 6,
        "difficultyLevel": "挑战级"
    },
    {
        "id": 78,
        "char": "饕",
        "correctPronunciation": "tāo",
        "wrongPronunciations": [
            "táo"
        ],
        "relatedPhrases": [
            "饕餮",
            "饕餮大餐",
            "饕餮盛宴"
        ],
        "explanation": "饕（tāo）：用于‘饕餮’，传说中的一种凶恶贪食的野兽，古代青铜器上常用它的头部形状做装饰。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 79,
        "char": "餮",
        "correctPronunciation": "tiè",
        "wrongPronunciations": [
            "tiě",
            "tì"
        ],
        "relatedPhrases": [
            "饕餮",
            "饕餮大餐",
            "饕餮盛宴"
        ],
        "explanation": "餮（tiè）：用于‘饕餮’，传说中的一种凶恶贪食的野兽，古代青铜器上常用它的头部形状做装饰。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 80,
        "char": "耄",
        "correctPronunciation": "mào",
        "wrongPronunciations": [
            "máo"
        ],
        "relatedPhrases": [
            "耄耋",
            "耄耋之年",
            "耄耋老人"
        ],
        "explanation": "耄（mào）：指八九十岁的年纪：耄耋之年。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 81,
        "char": "耋",
        "correctPronunciation": "dié",
        "wrongPronunciations": [
            "zhì",
            "tián",
            "dí"
        ],
        "relatedPhrases": [
            "耄耋",
            "耄耋之年",
            "耄耋老人"
        ],
        "explanation": "耋（dié）：指七八十岁的年纪：耄耋之年。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 82,
        "char": "颐",
        "correctPronunciation": "yí",
        "wrongPronunciations": [
            "yì",
            "yǐ"
        ],
        "relatedPhrases": [
            "期颐",
            "期颐之年",
            "颐养天年"
        ],
        "explanation": "颐（yí）：1. 保养：颐养。2. 用于‘期颐’，指人一百岁。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 83,
        "char": "荏",
        "correctPronunciation": "rěn",
        "wrongPronunciations": [
            "rèn",
            "rén"
        ],
        "relatedPhrases": [
            "荏苒",
            "光阴荏苒",
            "时光荏苒"
        ],
        "explanation": "荏（rěn）：1. 一年生草本植物，叶子卵形，茎方形，花白色或淡紫色，种子通称‘苏子’，可榨油。2. 用于‘荏苒’，时间渐渐过去。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 84,
        "char": "蹉",
        "correctPronunciation": "cuō",
        "wrongPronunciations": [
            "cuò"
        ],
        "relatedPhrases": [
            "蹉跎",
            "蹉跎岁月",
            "岁月蹉跎"
        ],
        "explanation": "蹉（cuō）：用于‘蹉跎’，虚度光阴，任由时光流逝而无所作为。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 85,
        "char": "跎",
        "correctPronunciation": "tuó",
        "wrongPronunciations": [
            "tā"
        ],
        "relatedPhrases": [
            "蹉跎",
            "蹉跎岁月",
            "岁月蹉跎"
        ],
        "explanation": "跎（tuó）：用于‘蹉跎’，虚度光阴，任由时光流逝而无所作为。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 86,
        "char": "旖",
        "correctPronunciation": "yǐ",
        "wrongPronunciations": [
            "qí"
        ],
        "relatedPhrases": [
            "旖旎",
            "风光旖旎",
            "旖旎风光"
        ],
        "explanation": "旖（yǐ）：用于‘旖旎’，柔和美丽（多形容风光）。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 87,
        "char": "旎",
        "correctPronunciation": "nǐ",
        "wrongPronunciations": [
            "lǐ",
            "ní"
        ],
        "relatedPhrases": [
            "旖旎",
            "风光旖旎",
            "旖旎风光"
        ],
        "explanation": "旎（nǐ）：用于‘旖旎’，柔和美丽（多形容风光）。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 88,
        "char": "逶",
        "correctPronunciation": "wēi",
        "wrongPronunciations": [
            "wěi"
        ],
        "relatedPhrases": [
            "逶迤",
            "逶迤起伏",
            "山脉逶迤"
        ],
        "explanation": "逶（wēi）：用于‘逶迤’，形容道路、山脉、河流等弯弯曲曲，延续不绝的样子。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 89,
        "char": "迤",
        "correctPronunciation": "yí",
        "wrongPronunciations": [
            "tuō",
            "yǐ"
        ],
        "relatedPhrases": [
            "逶迤",
            "逶迤起伏",
            "山脉逶迤"
        ],
        "explanation": "迤（yí）：用于‘逶迤’，形容道路、山脉、河流等弯弯曲曲，延续不绝的样子。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 90,
        "char": "缈",
        "correctPronunciation": "miǎo",
        "wrongPronunciations": [
            "miáo"
        ],
        "relatedPhrases": [
            "缥缈",
            "虚无缥缈",
            "缥缈仙境"
        ],
        "explanation": "缈（miǎo）：用于‘缥缈’，形容隐隐约约，若有若无。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 91,
        "char": "胧",
        "correctPronunciation": "lóng",
        "wrongPronunciations": [
            "lǒng",
            "long"
        ],
        "relatedPhrases": [
            "朦胧",
            "朦胧月色",
            "睡意朦胧"
        ],
        "explanation": "胧（lóng）：用于‘朦胧’，1. 月光不明。2. 不清楚，模糊。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 94,
        "char": "邋",
        "correctPronunciation": "lā",
        "wrongPronunciations": [
            "lè",
            "lǎ"
        ],
        "relatedPhrases": [
            "邋遢",
            "邋遢鬼",
            "衣冠邋遢"
        ],
        "explanation": "邋（lā）：用于‘邋遢’，不整洁，不利落：邋遢的人。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 95,
        "char": "遢",
        "correctPronunciation": "tā",
        "wrongPronunciations": [
            "tà"
        ],
        "relatedPhrases": [
            "邋遢",
            "邋遢鬼",
            "衣冠邋遢"
        ],
        "explanation": "遢（tā）：用于‘邋遢’，不整洁，不利落：邋遢的人。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 96,
        "char": "尴",
        "correctPronunciation": "gān",
        "wrongPronunciations": [
            "jiān"
        ],
        "relatedPhrases": [
            "尴尬",
            "尴尬局面",
            "尴尬境地"
        ],
        "explanation": "尴（gān）：用于‘尴尬’，1. 处于两难境地，无法摆脱。2. （神色、态度）不自然。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 97,
        "char": "尬",
        "correctPronunciation": "gà",
        "wrongPronunciations": [
            "gā",
            "jiè"
        ],
        "relatedPhrases": [
            "尴尬",
            "尴尬局面",
            "尴尬境地"
        ],
        "explanation": "尬（gà）：用于‘尴尬’，1. 处于两难境地，无法摆脱。2. （神色、态度）不自然。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 98,
        "char": "妊",
        "correctPronunciation": "rèn",
        "wrongPronunciations": [
            "rén",
            "rěn"
        ],
        "relatedPhrases": [
            "妊娠",
            "妊娠期",
            "妊娠反应"
        ],
        "explanation": "妊（rèn）：怀孕：妊娠。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 100,
        "char": "憩",
        "correctPronunciation": "qì",
        "wrongPronunciations": [
            "qī",
            "qí",
            "xì"
        ],
        "relatedPhrases": [
            "休憩",
            "休憩片刻",
            "短暂休憩"
        ],
        "explanation": "憩（qì）：休息：休憩。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 104,
        "char": "桎",
        "correctPronunciation": "zhì",
        "wrongPronunciations": [
            "zhì"
        ],
        "relatedPhrases": [
            "桎梏",
            "打破桎梏",
            "思想桎梏"
        ],
        "explanation": "桎（zhì）：脚镣：桎梏。",
        "errorReasonType": 6,
        "difficultyLevel": "高级"
    },
    {
        "id": 107,
        "char": "怂",
        "correctPronunciation": "sǒng",
        "wrongPronunciations": [
            "cóng",
            "zǒng"
        ],
        "relatedPhrases": [
            "怂恿",
            "怂恿别人",
            "受怂恿"
        ],
        "explanation": "怂（sǒng）：用于‘怂恿’，鼓动别人去做（某事）。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 108,
        "char": "箴",
        "correctPronunciation": "zhēn",
        "wrongPronunciations": [
            "jiān",
            "zhěn"
        ],
        "relatedPhrases": [
            "箴言",
            "箴言警句",
            "人生箴言"
        ],
        "explanation": "箴（zhēn）：1. 劝告，劝诫：箴言（劝诫的话）。2. 古代一种文体，以告诫规劝为主。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    },
    {
        "id": 110,
        "char": "跷",
        "correctPronunciation": "qiāo",
        "wrongPronunciations": [
            "qiào",
            "jiāo"
        ],
        "relatedPhrases": [
            "蹊跷",
            "蹊跷事",
            "感到蹊跷"
        ],
        "explanation": "跷（qiāo）：1. 抬起（腿）：跷腿。2. 用于‘蹊跷’，奇怪，可疑。",
        "errorReasonType": 3,
        "difficultyLevel": "初级"
    },
    {
        "id": 111,
        "char": "倪",
        "correctPronunciation": "ní",
        "wrongPronunciations": [
            "nǐ",
            "yí",
            "lǐ"
        ],
        "relatedPhrases": [
            "端倪",
            "初露端倪",
            "看出端倪"
        ],
        "explanation": "倪（ní）：1. 边际：端倪（事情的眉目，头绪）。2. 小孩。3. 姓。",
        "errorReasonType": 3,
        "difficultyLevel": "中级"
    }
];

module.exports = characters;