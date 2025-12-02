Page({
  data: {
    openid: '',
    games: [
      {
        id: '64Hexagrams',
        title: '易经六十四卦学习',
        description: '通过配对游戏学习易经六十四卦，了解中国传统哲学思想',
        iconText: '易',
        cssClass: 'yijing-icon'
      },
      {
        id: 'future',
        title: '成语消除',
        description: '选择两个字块组合成四字成语，提升语言表达能力',
        iconText: '语',
        cssClass: 'chengyu-icon'
      },
      {
        id: '28Stars',
        title: '二十八星宿探秘',
        description: '探索中国古代天文学中的二十八宿，了解四大神兽守护的星空奥秘',
        iconText: '星',
        cssClass: 'star-icon'
      },
      {
        id: '72DreamlandPoetryTravel',
        title: '七十二洞天诗意旅行',
        description: '穿越诗词，探索中国最美的72处胜地，感受传统文化的魅力',
        iconText: '诗',
        cssClass: 'poetry-icon'
      },
      {
        id: 'WuxingMysteries',
        title: '五行奥秘',
        description: '探索中国传统哲学中五行的生克关系，了解五行与万物的对应规律',
        iconText: '五',
        cssClass: 'wuxing-icon'
      },
      {
        id: 'VegetableRootSayings',
        title: '菜根潭摘录',
        description: '品味《菜根谭》智慧箴言，学习明代洪应明的处世哲学',
        iconText: '根',
        cssClass: 'root-icon'
      }
    ]
  },
  onLoad() {
    // 移除云函数调用，成语消除游戏不需要用户认证
  },
  
  navigateToGame(e) {
    const gameId = e.currentTarget.dataset.game
    wx.navigateTo({
      url: `/subgames/${gameId}/index`
    })
  }
})