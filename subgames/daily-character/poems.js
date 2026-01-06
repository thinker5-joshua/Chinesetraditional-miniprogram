// 每日一字诗词数据
// 数据结构：
// id: 诗词ID
// charId: 关联的字ID
// char: 关联的汉字
// poemId: 诗词唯一标识
// poemTitle: 诗词名称
// author: 作者
// dynasty: 朝代
// relatedLines: 与该字相关的诗句（只包含该字且是正确读音的句子）

const poems = [
  {
    id: 1,
    charId: 1,
    char: "长",
    poemId: "poem-1",
    poemTitle: "长干行二首·其一",
    author: "李白",
    dynasty: "唐代",
    relatedLines: ["同居长干里，两小无嫌猜"]
  },
  {
    id: 2,
    charId: 1,
    char: "长",
    poemId: "poem-2",
    poemTitle: "登鹳雀楼",
    author: "王之涣",
    dynasty: "唐代",
    relatedLines: ["欲穷千里目，更上一层楼"]
  },
  {
    id: 3,
    charId: 2,
    char: "着",
    poemId: "poem-3",
    poemTitle: "赋得古原草送别",
    author: "白居易",
    dynasty: "唐代",
    relatedLines: ["野火烧不尽，春风吹又生"]
  },
  {
    id: 4,
    charId: 3,
    char: "给",
    poemId: "poem-4",
    poemTitle: "自京赴奉先县咏怀五百字",
    author: "杜甫",
    dynasty: "唐代",
    relatedLines: ["朱门酒肉臭，路有冻死骨"]
  },
  {
    id: 5,
    charId: 4,
    char: "血",
    poemId: "poem-5",
    poemTitle: "过零丁洋",
    author: "文天祥",
    dynasty: "宋代",
    relatedLines: ["人生自古谁无死，留取丹心照汗青"]
  },
  {
    id: 6,
    charId: 5,
    char: "仇",
    poemId: "poem-6",
    poemTitle: "示儿",
    author: "陆游",
    dynasty: "宋代",
    relatedLines: ["王师北定中原日，家祭无忘告乃翁"]
  },
  {
    id: 7,
    charId: 6,
    char: "龟",
    poemId: "poem-7",
    poemTitle: "龟虽寿",
    author: "曹操",
    dynasty: "东汉",
    relatedLines: ["神龟虽寿，犹有竟时"]
  },
  {
    id: 8,
    charId: 7,
    char: "巷",
    poemId: "poem-8",
    poemTitle: "临安春雨初霁",
    author: "陆游",
    dynasty: "宋代",
    relatedLines: ["小楼一夜听春雨，深巷明朝卖杏花"]
  },
  {
    id: 9,
    charId: 8,
    char: "薄",
    poemId: "poem-9",
    poemTitle: "泊秦淮",
    author: "杜牧",
    dynasty: "唐代",
    relatedLines: ["商女不知亡国恨，隔江犹唱后庭花"]
  },
  {
    id: 10,
    charId: 9,
    char: "折",
    poemId: "poem-10",
    poemTitle: "凉州词二首·其一",
    author: "王之涣",
    dynasty: "唐代",
    relatedLines: ["黄河远上白云间，一片孤城万仞山"]
  },
  {
    id: 11,
    charId: 10,
    char: "乘",
    poemId: "poem-11",
    poemTitle: "行路难·其一",
    author: "李白",
    dynasty: "唐代",
    relatedLines: ["乘风破浪会有时，直挂云帆济沧海"]
  }
];

module.exports = {
  poems
};