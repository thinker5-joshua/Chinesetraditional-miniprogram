Page({
  data: {
    gameId: '',
    gameName: '',
    starsList: [
      { id: 1, name: '角宿', desc: '东方青龙角，春分点标志' },
      { id: 2, name: '亢宿', desc: '青龙颈项，主管农业' },
      { id: 3, name: '氐宿', desc: '青龙胸腹，象征根基' },
      { id: 4, name: '房宿', desc: '青龙心房，代表居所' },
      { id: 5, name: '心宿', desc: '青龙心脏，帝王之星' },
      { id: 6, name: '尾宿', desc: '青龙尾巴，代表结束' },
      { id: 7, name: '箕宿', desc: '青龙尾部，风神之象' }
    ],
    currentHexagram: {
      name: '乾卦',
      desc: '天行健，君子以自强不息。代表创造、刚健、进取。'
    },
    currentPoem: {
      title: '春晓',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      author: '孟浩然'
    },
    hexagrams: [
      { name: '乾卦', desc: '天行健，君子以自强不息。代表创造、刚健、进取。' },
      { name: '坤卦', desc: '地势坤，君子以厚德载物。代表柔顺、包容、承载。' },
      { name: '屯卦', desc: '云雷屯，君子以经纶。代表创始、艰难、积累。' },
      { name: '蒙卦', desc: '山下出泉，蒙。君子以果行育德。代表启蒙、教育、成长。' }
    ],
    poems: [
      { 
        title: '春晓', 
        content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。', 
        author: '孟浩然' 
      },
      { 
        title: '静夜思', 
        content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。', 
        author: '李白' 
      },
      { 
        title: '登鹳雀楼', 
        content: '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。', 
        author: '王之涣' 
      }
    ],
    currentHexagramIndex: 0,
    currentPoemIndex: 0
  },

  onLoad(options) {
    const gameId = options.id || 'stars'
    const gameNames = {
      'stars': '二十八星宿',
      'hexagrams': '六十四卦',
      'dreamland': '七十二梦境诗游记',
      'future': '未来游戏',
      'vegetable': '菜根谭',
      'family': '家谱探索'
    }
    
    this.setData({
      gameId: gameId,
      gameName: gameNames[gameId] || '传统文化游戏'
    })
    
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: this.data.gameName
    })
  },

  goBack() {
    wx.navigateBack()
  },

  nextHexagram() {
    const nextIndex = (this.data.currentHexagramIndex + 1) % this.data.hexagrams.length
    this.setData({
      currentHexagram: this.data.hexagrams[nextIndex],
      currentHexagramIndex: nextIndex
    })
  },

  nextPoem() {
    const nextIndex = (this.data.currentPoemIndex + 1) % this.data.poems.length
    this.setData({
      currentPoem: this.data.poems[nextIndex],
      currentPoemIndex: nextIndex
    })
  }
})