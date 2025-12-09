// 更新洞天数据脚本
// 将21个推荐地点替换对应的现有洞天数据

const fs = require('fs');
const path = require('path');

// 读取现有洞天数据
const cavesData = require('./caves_data.js');

// 洞天替换映射，key为现有洞天ID，value为新地点数据
const caveReplaceMap = {
  10: {
    name: "灵隐寺",
    location: "浙江省杭州市",
    description: "灵隐寺是杭州著名古刹，历史悠久，始建于东晋咸和元年（326年），由印度僧人慧理创建，是中国佛教禅宗名刹之一，文人墨客多有题咏。",
    map_image: "assets/images/lingyin寺.jpg",
    latitude: 30.2347,
    longitude: 120.1072
  },
  21: {
    name: "寒山寺",
    location: "江苏省苏州市",
    description: "寒山寺是苏州著名古刹，始建于南朝萧梁代天监年间（公元502～519年），因唐代诗人张继《枫桥夜泊》诗'月落乌啼霜满天，江枫渔火对愁眠。姑苏城外寒山寺，夜半钟声到客船'而闻名。",
    map_image: "assets/images/hanshan寺.jpg",
    latitude: 31.3278,
    longitude: 120.5772
  },
  30: {
    name: "采石矶",
    location: "安徽省马鞍山市",
    description: "采石矶是长江著名矶头，位于安徽省马鞍山市西南的翠螺山麓，与南京燕子矶、岳阳城陵矶并称为'长江三大名矶'。李白多次登临，有李白衣冠冢。",
    map_image: "assets/images/caishiji.jpg",
    latitude: 31.6178,
    longitude: 118.4989
  },
  33: {
    name: "太湖",
    location: "江苏省苏州市",
    description: "太湖是中国五大淡水湖之一，位于长江三角洲的南缘，横跨江、浙两省，北临无锡，南濒湖州，西依宜兴，东近苏州。历史悠久，文人墨客多有题咏。",
    map_image: "assets/images/taihu.jpg",
    latitude: 31.3000,
    longitude: 120.2000
  },
  35: {
    name: "乌衣巷",
    location: "江苏省南京市",
    description: "乌衣巷是南京著名古巷，位于秦淮河上文德桥旁的南岸，是中国历史最悠久最著名的古巷之一。因唐代诗人刘禹锡《乌衣巷》诗'朱雀桥边野草花，乌衣巷口夕阳斜。旧时王谢堂前燕，飞入寻常百姓家'而闻名。",
    map_image: "assets/images/wuyixiang.jpg",
    latitude: 32.0373,
    longitude: 118.7947
  },
  37: {
    name: "曲阜孔庙",
    location: "山东省曲阜市",
    description: "曲阜孔庙是中国最大的孔庙，位于山东省曲阜市中心，是祭祀中国古代著名思想家和教育家孔子的祠庙。始建于鲁哀公十七年（公元前478年），历代增修扩建，与相邻的孔府、城北的孔林合称'三孔'。",
    map_image: "assets/images/qufukongmiao.jpg",
    latitude: 35.6586,
    longitude: 116.9836
  },
  39: {
    name: "杜甫草堂",
    location: "四川省成都市",
    description: "杜甫草堂是唐代大诗人杜甫的故居，位于四川省成都市青羊区青华路37号，是中国文学史上的圣地。杜甫在此居住近四年，创作诗歌240余首。",
    map_image: "assets/images/dufucao.jpg",
    latitude: 30.6595,
    longitude: 104.0405
  },
  40: {
    name: "乐山大佛",
    location: "四川省乐山市",
    description: "乐山大佛是世界最大的石刻弥勒佛坐像，位于四川省乐山市南岷江东岸凌云寺侧，濒大渡河、青衣江和岷江三江汇流处。开凿于唐代开元元年（713年），完成于贞元十九年（803年），历时约90年。",
    map_image: "assets/images/leshandafo.jpg",
    latitude: 29.5432,
    longitude: 103.7732
  },
  42: {
    name: "三仙山",
    location: "山东省蓬莱市",
    description: "三仙山是中国古代神话传说中的仙山，位于山东省蓬莱市海滨路9号，是集旅游观光与休闲度假于一体的综合性景区。传说为秦始皇东巡求仙访药之地，有'海上仙山'之称。",
    map_image: "assets/images/sanxianshan.jpg",
    latitude: 37.8050,
    longitude: 120.7539
  },
  43: {
    name: "阳关",
    location: "甘肃省敦煌市",
    description: "阳关是古代丝绸之路的重要关隘，位于甘肃省敦煌市西南的古董滩附近。始建于汉武帝元鼎年间（公元前116年-公元前111年），是中国古代陆路对外交通咽喉之地，是丝绸之路南路必经的关隘。",
    map_image: "assets/images/yangguan.jpg",
    latitude: 39.7500,
    longitude: 94.0333
  },
  44: {
    name: "玉门关",
    location: "甘肃省敦煌市",
    description: "玉门关是古代丝绸之路的重要关隘，位于甘肃省敦煌市西北的小方盘城。始建于汉武帝开通西域道路、设置河西四郡之时，因西域输入玉石时取道于此而得名。",
    map_image: "assets/images/yumenguan.jpg",
    latitude: 40.2000,
    longitude: 93.8000
  },
  45: {
    name: "凉州",
    location: "甘肃省武威市",
    description: "凉州是古代丝绸之路上的重要城市，位于甘肃省武威市。历史悠久，汉武帝时期设武威郡，为河西四郡之一。唐代诗人王翰《凉州词》'葡萄美酒夜光杯，欲饮琵琶马上催。醉卧沙场君莫笑，古来征战几人回'而闻名。",
    map_image: "assets/images/liangzhou.jpg",
    latitude: 37.9333,
    longitude: 102.6000
  },
  62: {
    name: "河西走廊",
    location: "甘肃省",
    description: "河西走廊是古代丝绸之路的重要通道，位于甘肃省西北部，祁连山以北，合黎山以南，乌鞘岭以西，甘肃新疆边界以东，长约1000公里，宽数公里至近200公里不等，为西北—东南走向的狭长平地，形如走廊，因位于黄河以西，故称河西走廊。",
    map_image: "assets/images/hexizoulang.jpg",
    latitude: 38.0000,
    longitude: 103.0000
  },
  64: {
    name: "岳麓山",
    location: "湖南省长沙市",
    description: "岳麓山是长沙著名名山，位于湖南省长沙市岳麓区，是南岳衡山72峰的最后一峰，海拔300.8米，是中国四大赏枫胜地之一。山上有岳麓书院、爱晚亭等景点，文人墨客多有题咏。",
    map_image: "assets/images/yuelushan.jpg",
    latitude: 28.1750,
    longitude: 112.9333
  },
  65: {
    name: "金山寺",
    location: "江苏省镇江市",
    description: "金山寺是镇江著名古刹，位于江苏省镇江市润州区金山路62号，始建于东晋明帝时，是中国佛教禅宗名刹之一。金山寺布局依山就势，使山与寺融为一体，有'寺裹山'之称。",
    map_image: "assets/images/jinshansi.jpg",
    latitude: 32.2236,
    longitude: 119.4344
  },
  66: {
    name: "鸡鸣寺",
    location: "江苏省南京市",
    description: "鸡鸣寺是南京著名古刹，位于江苏省南京市玄武区鸡鸣寺路1号，始建于西晋永康元年（300年），是南京最古老的梵刹之一，自古有'南朝第一寺'之称。",
    map_image: "assets/images/jimingsi.jpg",
    latitude: 32.0595,
    longitude: 118.7986
  },
  68: {
    name: "净慈寺",
    location: "浙江省杭州市",
    description: "净慈寺是杭州著名古刹，位于浙江省杭州市西湖区南山路56号，始建于五代后周显德元年（954年），是西湖四大古刹之一。寺内有著名的南屏晚钟，为西湖十景之一。",
    map_image: "assets/images/jingcisi.jpg",
    latitude: 30.2308,
    longitude: 120.1450
  },
  69: {
    name: "都江堰",
    location: "四川省成都市都江堰市",
    description: "都江堰是世界文化遗产，中国古代著名水利工程，位于四川省成都市都江堰市城西，坐落在成都平原西部的岷江上，始建于秦昭王末年（约公元前256年-公元前251年），由分水鱼嘴、飞沙堰、宝瓶口等部分组成，两千多年来一直发挥着防洪灌溉的作用。",
    map_image: "assets/images/dujiangyan.jpg",
    latitude: 31.0000,
    longitude: 103.6000
  },
  70: {
    name: "绍兴鉴湖",
    location: "浙江省绍兴市",
    description: "绍兴鉴湖是绍兴著名湖泊，位于浙江省绍兴市越城区，是中国东南地区最古老的水利工程之一，始建于东汉永和五年（140年），由会稽太守马臻主持修建。鉴湖水质优良，是绍兴黄酒的主要酿造用水。",
    map_image: "assets/images/shaoxingjianhu.jpg",
    latitude: 30.0000,
    longitude: 120.5500
  },
  71: {
    name: "奉节白帝城",
    location: "重庆市奉节县",
    description: "奉节白帝城是长江三峡起点，位于重庆市奉节县白帝镇白帝村1号，地处瞿塘峡口长江北岸，白帝山上，东望夔门，南与白盐山隔江相望，西临奉节县城，北倚鸡公山，地处长江三峡西端入口。历史悠久，李白多次登临，有'诗城'之称。",
    map_image: "assets/images/baidicheng.jpg",
    latitude: 31.0333,
    longitude: 109.5000
  },
  72: {
    name: "泉州开元寺",
    location: "福建省泉州市",
    description: "泉州开元寺是福建著名古刹，位于福建省泉州市鲤城区西街176号，始建于唐垂拱二年（686年），是福建省内规模最大的佛教寺院。寺内有东西双塔、大雄宝殿等建筑，是中国东南沿海重要的文物古迹，也是泉州海上丝绸之路的重要史迹。",
    map_image: "assets/images/quanzhoukaiyuansi.jpg",
    latitude: 24.9000,
    longitude: 118.5833
  }
};

// 更新洞天数据
const updatedCaves = cavesData.caves.map(cave => {
  // 如果当前洞天ID在替换映射中，则更新为新地点数据
  if (caveReplaceMap[cave.id]) {
    return {
      ...cave,
      ...caveReplaceMap[cave.id]
    };
  }
  // 否则保持原有数据不变
  return cave;
});

// 保存更新后的洞天数据
const outputPath = path.join(__dirname, 'caves_data.js');
const content = `module.exports = {
  "caves": ${JSON.stringify(updatedCaves, null, 2)}
};`;

fs.writeFileSync(outputPath, content, 'utf8');

console.log('洞天数据更新完成！');
console.log(`共更新了 ${Object.keys(caveReplaceMap).length} 个洞天`);
