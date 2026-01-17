// 每日一字列表页面
const cloudDataService = require('../../cloudDataService').default;

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
    },
    // 分页相关属性
    currentPage: 1,
    pageSize: 10, // 每页显示10条
    totalPages: 1,
    totalItems: 0,
    paginationData: [], // 当前页的数据
    showPagination: false // 是否显示分页控件
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
  async loadCharacters() {
    const maxRetries = 3;
    let retryCount = 0;
    
    const loadWithRetry = async () => {
      try {
        console.log(`开始加载列表数据... (尝试 ${retryCount + 1}/${maxRetries})`);
        
        // 使用云数据服务的全量数据
        const characters = await cloudDataService.getAllCharacters();
        
        console.log('列表数据加载成功，共', characters.length, '条');
        
        // 数据量验证
        if (characters.length < 400) {
          console.warn(`列表数据量较少：仅 ${characters.length} 条，可能不是全量数据`);
        } else {
          console.log(`列表数据量充足：共 ${characters.length} 条，符合全量数据要求`);
        }
        
        // 数据结构验证
        if (characters.length > 0) {
          const sampleItem = characters[0];
          const requiredFields = ['id', 'char', 'correctPronunciation', 'wrongPronunciations', 'relatedPhrases', 'explanation'];
          const hasRequiredFields = requiredFields.every(field => field in sampleItem);
          
          if (!hasRequiredFields) {
            console.error('数据结构不完整，缺少必要字段');
            
            // 尝试重新加载
            if (retryCount < maxRetries - 1) {
              retryCount++;
              console.log(`数据结构错误，${2000}ms 后重试...`);
              setTimeout(() => {
                loadWithRetry();
              }, 2000);
              return;
            }
          } else {
            console.log('数据结构验证通过');
          }
        }
        
        this.setData({
          allCharacters: characters,
          loading: false,
          loadStatus: 'success',
          loadMessage: `成功加载 ${characters.length} 条数据`,
          lastLoadTime: new Date().toLocaleString()
        });
        
        // 默认显示默认难度的列表
        this.updateCharacterList();
        
      } catch (error) {
        console.error('列表数据加载失败:', error);
        
        // 错误重试
        if (retryCount < maxRetries - 1) {
          retryCount++;
          console.log(`加载失败，${3000}ms 后重试... (${retryCount}/${maxRetries - 1})`);
          
          this.setData({
            loading: true,
            loadStatus: 'retrying',
            loadMessage: `加载失败，正在重试... (${retryCount}/${maxRetries - 1})`,
            lastRetryTime: new Date().toLocaleString()
          });
          
          setTimeout(() => {
            loadWithRetry();
          }, 3000);
        } else {
          // 重试失败
          console.error('多次尝试后加载失败，显示错误状态');
          this.setData({
            loading: false,
            loadStatus: 'error',
            loadMessage: '数据加载失败，请检查网络连接后重试',
            errorMessage: error.message,
            lastErrorTime: new Date().toLocaleString()
          });
        }
      }
    };
    
    // 开始加载
    this.setData({
      loading: true,
      loadStatus: 'loading',
      loadMessage: '正在加载数据...',
      lastLoadStartTime: new Date().toLocaleString()
    });
    
    loadWithRetry();
  },

  /**
   * 更新字列表数据
   */
  updateCharacterList() {
    const { allCharacters, listFilter, difficultySettings, pageSize } = this.data;
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
    
    // 计算分页信息
    const totalItems = filteredList.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentPage = 1; // 重置到第一页
    
    // 更新分页数据
    this.setData({
      characterList: filteredList,
      totalItems: totalItems,
      totalPages: totalPages,
      currentPage: currentPage,
      showPagination: totalItems > pageSize
    });
    
    // 更新当前页数据
    this.updatePaginationData();
  },

  /**
   * 更新分页数据
   */
  updatePaginationData() {
    const { characterList, currentPage, pageSize } = this.data;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginationData = characterList.slice(startIndex, endIndex);
    
    this.setData({
      paginationData: paginationData
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
   * 跳转到指定页
   */
  goToPage(page) {
    const { totalPages } = this.data;
    
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    
    this.setData({
      currentPage: page
    });
    
    this.updatePaginationData();
  },

  /**
   * 通过输入跳转到指定页
   */
  goToPageByInput(e) {
    const page = parseInt(e.detail.value);
    if (!isNaN(page)) {
      this.goToPage(page);
    }
  },

  /**
   * 上一页
   */
  prevPage() {
    const { currentPage } = this.data;
    if (currentPage > 1) {
      this.goToPage(currentPage - 1);
    }
  },

  /**
   * 下一页
   */
  nextPage() {
    const { currentPage, totalPages } = this.data;
    if (currentPage < totalPages) {
      this.goToPage(currentPage + 1);
    }
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