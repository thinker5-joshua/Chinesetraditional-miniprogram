// 每日一字列表页面

Page({
  /**
   * 页面的初始数据
   */
  data: {
    allCharacters: [],
    characterList: [],
    listFilter: 'default', // default, all, favorites
    loading: true,
    difficultySettings: {
      beginner: true,
      intermediate: true,
      advanced: true,
      challenge: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 读取难度设置
    const savedDifficulties = wx.getStorageSync('dailyCharacterDifficulties');
    if (savedDifficulties && typeof savedDifficulties === 'object') {
      this.setData({
        difficultySettings: {
          beginner: savedDifficulties.difficultyBeginner !== undefined ? savedDifficulties.difficultyBeginner : true,
          intermediate: savedDifficulties.difficultyIntermediate !== undefined ? savedDifficulties.difficultyIntermediate : true,
          advanced: savedDifficulties.difficultyAdvanced !== undefined ? savedDifficulties.difficultyAdvanced : true,
          challenge: savedDifficulties.difficultyChallenge !== undefined ? savedDifficulties.difficultyChallenge : true
        }
      });
    }

    // 加载汉字数据
    this.loadCharacters();
  },

  /**
   * 加载汉字数据
   */
  loadCharacters() {
    try {
      const characters = require('../../data-optimized.js').characters;
      
      this.setData({
        allCharacters: characters,
        loading: false
      });
      
      // 默认显示默认难度的列表
      this.updateCharacterList();
    } catch (error) {
      this.setData({
        loading: false
      });
    }
  },

  /**
   * 更新字列表数据
   */
  updateCharacterList() {
    const { allCharacters, listFilter, difficultySettings } = this.data;
    let filteredList = [];
    
    switch (listFilter) {
      case 'default':
        // 按照难度设置筛选
        filteredList = allCharacters.filter(char => {
          switch(char.difficultyLevel) {
            case '初级':
              return difficultySettings.beginner;
            case '中级':
              return difficultySettings.intermediate;
            case '高级':
              return difficultySettings.advanced;
            case '挑战级':
              return difficultySettings.challenge;
            default:
              return false;
          }
        });
        break;
        
      case 'all':
        // 显示所有汉字
        filteredList = allCharacters;
        break;
        
      case 'favorites':
        // 显示收藏的汉字
        const favorites = wx.getStorageSync('dailyCharacterFavorites') || [];
        filteredList = allCharacters.filter(char => favorites.includes(char.id));
        break;
    }
    
    this.setData({
      characterList: filteredList
    });
  },

  /**
   * 切换筛选条件
   */
  changeListFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      listFilter: filter
    });
    this.updateCharacterList();
  },

  /**
   * 返回首页
   */
  goBack() {
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时更新列表，确保收藏状态同步
    this.updateCharacterList();
  }
});