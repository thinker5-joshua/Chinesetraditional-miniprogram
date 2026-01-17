// 每日一字入口页面

// 尝试引入云存储模块，添加错误处理
let cloudStorage = null;
try {
  cloudStorage = require('../../utils/cloudStorage');
} catch (error) {
  console.error('引入云存储模块失败:', error);
  // 提供备用实现
  cloudStorage = {
    getImage: (fileName) => {
      return new Promise((resolve) => {
        // 使用本地默认图片
        const defaultPaths = {
          'wyhd-share-default.png': '/images/qrcode-default.png'
        };
        resolve(defaultPaths[fileName] || '/images/qrcode-default.png');
      });
    }
  };
}

// 引入云数据服务模块
let cloudDataService = null;
try {
  cloudDataService = require('./cloudDataService.js').default;
} catch (error) {
  console.error('引入云数据服务模块失败:', error);
  // 提供备用实现
  cloudDataService = {
    preloadData: () => Promise.resolve([]),
    getRandomCharacter: () => Promise.resolve(null),
    getAllCharacters: () => Promise.resolve([])
  };
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    todayCharacter: null,
    loading: true,
    isFlipped: false,
    isFavorite: false,
    // 使用四个独立变量管理难度选择状态
    difficultyBeginner: true,    // 初级难度，0未选中，1选中
    difficultyIntermediate: true, // 中级难度，0未选中，1选中
    difficultyAdvanced: true,     // 高级难度，0未选中，1选中
    difficultyChallenge: true,    // 挑战级难度，0未选中，1选中
    allCharacters: [],
    filteredCharacters: [],
    currentCharacterIndex: 0,
    // 设置窗口相关变量
    settingVisible: false,        // 设置窗口显示状态
    // 临时存储设置中的难度选择
    tempDifficulties: {
      beginner: true,
      intermediate: true,
      advanced: true,
      challenge: true
    },
    // 测试难度选择，默认为均衡
    testDifficulty: '均衡',       // 可选值：'容易', '均衡', '挑战'
    testDifficultyOptions: ['容易', '均衡', '挑战']
  },

  // 触摸事件相关的临时变量（不放入data中，避免异步更新问题）
  touchStartX: 0,
  touchStartY: 0,
  touchMoveX: 0,
  touchMoveY: 0,
  isTouchLocked: false, // 触摸锁定状态，用于防止页面滚动
  touchLockThreshold: 30, // 触摸锁定阈值，单位px

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 禁止页面滚动
    wx.setPageStyle({
      style: {
        overflow: 'hidden',
        height: '100vh'
      }
    });
    
    // 读取上次选择的难度模式
    const savedDifficulties = wx.getStorageSync('dailyCharacterDifficulties');
    
    // 初始状态：默认四个难度都选中
    let difficultyBeginner = true;
    let difficultyIntermediate = true;
    let difficultyAdvanced = true;
    let difficultyChallenge = true;
    
    if (savedDifficulties && typeof savedDifficulties === 'object') {
      // 如果是新的对象格式，直接使用
      if (savedDifficulties.difficultyBeginner !== undefined) {
        difficultyBeginner = savedDifficulties.difficultyBeginner || true;
        difficultyIntermediate = savedDifficulties.difficultyIntermediate || true;
        difficultyAdvanced = savedDifficulties.difficultyAdvanced || true;
        difficultyChallenge = savedDifficulties.difficultyChallenge || true;
      } 
      // 如果是旧的数组格式，转换为新格式
      else if (Array.isArray(savedDifficulties)) {
        difficultyBeginner = savedDifficulties.includes('初级');
        difficultyIntermediate = savedDifficulties.includes('中级');
        difficultyAdvanced = savedDifficulties.includes('高级');
        difficultyChallenge = savedDifficulties.includes('挑战级');
        
        // 保存为新格式
        wx.setStorageSync('dailyCharacterDifficulties', {
          difficultyBeginner,
          difficultyIntermediate,
          difficultyAdvanced,
          difficultyChallenge
        });
      }
    } else {
      // 无本地存储，使用默认值
      // 保存默认值到本地存储
      wx.setStorageSync('dailyCharacterDifficulties', {
        difficultyBeginner,
        difficultyIntermediate,
        difficultyAdvanced,
        difficultyChallenge
      });
    }
    
    // 读取测试难度设置
    const savedTestDifficulty = wx.getStorageSync('dailyCharacterTestDifficulty');
    const testDifficulty = savedTestDifficulty || '均衡';
    
    // 设置初始状态
    this.setData({
      difficultyBeginner,
      difficultyIntermediate,
      difficultyAdvanced,
      difficultyChallenge,
      // 初始化临时难度为当前难度
      tempDifficulties: {
        beginner: difficultyBeginner,
        intermediate: difficultyIntermediate,
        advanced: difficultyAdvanced,
        challenge: difficultyChallenge
      },
      testDifficulty
    });
    
    // 异步加载数据
    await this.loadCharacters();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 仅在需要时更新UI
    if (this.data.allCharacters.length > 0) {
      this.filterCharacters();
    }
  },

  /**
   * 加载汉字数据
   */
  async loadCharacters() {
    try {
      this.setData({ loading: true });
      
      // 从云数据库预加载数据
      const characters = await cloudDataService.preloadData();
      
      this.setData({
        allCharacters: characters,
        filteredCharacters: characters,
        loading: false
      });
      
      this.loadRandomCharacter();
    } catch (error) {
      console.error('加载数据失败:', error);
      
      // 加载失败时使用本地备用数据
      try {
        const characters = require('./data-optimized.js').characters;
        this.setData({
          allCharacters: characters,
          filteredCharacters: characters,
          loading: false
        });
        this.loadRandomCharacter();
      } catch (localError) {
        console.error('加载本地备用数据失败:', localError);
        this.setData({ loading: false });
        wx.showToast({
          title: '加载数据失败，请重试',
          icon: 'none'
        });
      }
    }
  },

  /**
   * 加载随机汉字
   */
  loadRandomCharacter() {
    const { filteredCharacters } = this.data;
    if (filteredCharacters.length === 0) {
      wx.showToast({
        title: '暂无符合条件的汉字',
        icon: 'none'
      });
      return;
    }
    
    // 随机选择一个汉字
    const randomIndex = Math.floor(Math.random() * filteredCharacters.length);
    const character = filteredCharacters[randomIndex];
    
    // 检查是否已收藏
    const favorites = wx.getStorageSync('dailyCharacterFavorites') || [];
    const isFavorite = favorites.includes(character.id);
    

    
    // 处理错误读音显示
    const wrongPronunciationsText = character.wrongPronunciations ? character.wrongPronunciations.join('、') : '暂无数据';
    
    // 处理错误原因分类显示
    const errorReasonText = this.getErrorReasonText(character.errorReasonType);
    
    this.setData({
      todayCharacter: character,
      isFavorite: isFavorite,
      currentCharacterIndex: randomIndex,
      wrongPronunciationsText: wrongPronunciationsText,
      errorReasonText: errorReasonText, // 预先计算好的错误原因文本
      loading: false
    });
  },

  /**
   * 切换卡片正反面
   */
  toggleCardFlip() {
    this.setData({
      isFlipped: !this.data.isFlipped
    });
  },

  /**
   * 保存字卡
   */
  saveCard() {
    const { todayCharacter } = this.data;
    
    if (!todayCharacter) {
      wx.showToast({
        title: '请先加载一个汉字',
        icon: 'none'
      });
      return;
    }

    // 显示加载提示
    wx.showLoading({
      title: '生成卡片中...',
      mask: true
    });

    // 获取canvas上下文
    const query = wx.createSelectorQuery();
    query.select('#character-canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0]) {
          wx.hideLoading();
          wx.showToast({
            title: '获取画布失败',
            icon: 'none'
          });
          return;
        }
        
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // 设置canvas尺寸
        const width = 750;
        const height = 1334;
        canvas.width = width;
        canvas.height = height;

        // 绘制背景
        ctx.fillStyle = '#f8f6f0';
        ctx.fillRect(0, 0, width, height);

        // 绘制边框
        ctx.strokeStyle = '#e8e4d8';
        ctx.lineWidth = 20;
        ctx.strokeRect(10, 10, width - 20, height - 20);

        // 绘制标题
        ctx.fillStyle = '#8B4513';
        ctx.font = '52px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('每日一字', width / 2, 140);

        // 绘制分隔线
        ctx.strokeStyle = '#d2b48c';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(50, 180);
        ctx.lineTo(width - 50, 180);
        ctx.stroke();

        // 绘制正面内容（上半部分）
        const frontTop = 220;
        const frontHeight = 400;
        
        // 绘制汉字
        ctx.fillStyle = '#8B4513';
        ctx.font = '160px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(todayCharacter.char, width / 2, frontTop + 150);
        
        // 绘制正确读音
        ctx.fillStyle = '#28a745';
        ctx.font = '60px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(todayCharacter.correctPronunciation, width / 2, frontTop + 250);
        
        // 绘制相关词组
        if (todayCharacter.relatedPhrases && todayCharacter.relatedPhrases.length > 0) {
          ctx.fillStyle = '#666';
          ctx.font = '32px sans-serif';
          ctx.textAlign = 'center';
          
          const phrasesText = todayCharacter.relatedPhrases.join('、');
          const lineHeight = 40;
          const maxWidth = 650;
          let startY = frontTop + 310;
          let currentLine = '';

          // 自动换行绘制词组
          for (let i = 0; i < phrasesText.length; i++) {
            const testLine = currentLine + phrasesText[i];
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && i > 0) {
              ctx.fillText(currentLine, width / 2, startY);
              startY += lineHeight;
              currentLine = phrasesText[i];
            } else {
              currentLine = testLine;
            }
          }
          ctx.fillText(currentLine, width / 2, startY);
        }

        // 绘制分隔线
        ctx.strokeStyle = '#d2b48c';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(50, frontTop + frontHeight);
        ctx.lineTo(width - 50, frontTop + frontHeight);
        ctx.stroke();

        // 绘制背面内容（下半部分）
        const backTop = frontTop + frontHeight + 40;
        
        // 绘制详细解析
        ctx.fillStyle = '#333';
        ctx.font = '32px sans-serif';
        ctx.textAlign = 'left';
        
        const explanation = todayCharacter.explanation || '暂无解析';
        const lineHeight = 40;
        const maxWidth = 650;
        let startY = backTop + 80;
        let currentLine = '';

        // 自动换行绘制解析
        for (let i = 0; i < explanation.length; i++) {
          const testLine = currentLine + explanation[i];
          const metrics = ctx.measureText(testLine);
          
          if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(currentLine, (width - maxWidth) / 2, startY);
            startY += lineHeight;
            currentLine = explanation[i];
          } else {
            currentLine = testLine;
          }
        }
        ctx.fillText(currentLine, (width - maxWidth) / 2, startY);
        startY += lineHeight * 2;

        // 绘制错误读音
        ctx.fillStyle = '#8B4513';
        ctx.font = '34px sans-serif';
        ctx.textAlign = 'left';
        const wrongPronunciationsLabel = '常见错误读音：';
        ctx.fillText(wrongPronunciationsLabel, (width - maxWidth) / 2, startY);
        
        const wrongPronunciations = todayCharacter.wrongPronunciations || [];
        const wrongPronunciationsText = wrongPronunciations.join('、') || '暂无错误读音';
        ctx.fillStyle = '#ff6b6b';
        ctx.font = '32px sans-serif';
        const labelWidth = ctx.measureText(wrongPronunciationsLabel).width;
        ctx.fillText(wrongPronunciationsText, (width - maxWidth) / 2 + labelWidth + 10, startY);
        startY += lineHeight * 2;

        // 绘制错误原因
        ctx.fillStyle = '#8B4513';
        ctx.font = '34px sans-serif';
        ctx.textAlign = 'left';
        const errorReasonLabel = '错误原因：';
        ctx.fillText(errorReasonLabel, (width - maxWidth) / 2, startY);
        
        const errorReasonText = this.getErrorReasonText(todayCharacter.errorReasonType) || '暂无错误原因';
        ctx.fillStyle = '#333';
        ctx.font = '32px sans-serif';
        const errorReasonLabelWidth = ctx.measureText(errorReasonLabel).width;
        ctx.fillText(errorReasonText, (width - maxWidth) / 2 + errorReasonLabelWidth + 10, startY);

        // 绘制底部装饰
        const bottomGradient = ctx.createLinearGradient(0, height - 200, 0, height);
        bottomGradient.addColorStop(0, 'rgba(210, 180, 140, 0.2)');
        bottomGradient.addColorStop(1, 'rgba(210, 180, 140, 0.4)');
        ctx.fillStyle = bottomGradient;
        ctx.fillRect(0, height - 200, width, 200);

        // 绘制小程序码
        const qrcodeSize = 120;
        const qrcodeX = 50;
        const qrcodeY = height - 170;

        // 加载并绘制小程序码
        const img = canvas.createImage();
        
        // 绘制提示文字的函数
        const drawQrCodeText = () => {
          try {
            // 绘制小程序文字
            ctx.fillStyle = '#666666';
            ctx.font = '28px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('文益互动', qrcodeX + qrcodeSize + 20, qrcodeY + 50);
            ctx.fillText('长按识别二维码', qrcodeX + qrcodeSize + 20, qrcodeY + 90);
          } catch (e) {
            // 绘制失败不影响后续保存
          }
        };

        // 保存图片到临时文件的函数，无论图片加载成功与否都调用
        const saveCanvasToImage = () => {
          // 保存图片到临时文件
          wx.canvasToTempFilePath({
            canvas: canvas,
            success: (res) => {
              wx.hideLoading();
              
              // 保存图片到相册
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: () => {
                  wx.showToast({
                    title: '卡片已保存到相册',
                    icon: 'success',
                    duration: 2000
                  });
                },
                fail: (err) => {
                  wx.hideLoading();
                  wx.showToast({
                    title: '保存失败，请重试',
                    icon: 'none'
                  });
                  // 处理用户拒绝授权的情况
                  if (err.errMsg.indexOf('auth deny') > -1 || err.errMsg.indexOf('auth denied') > -1) {
                    wx.showModal({
                      title: '授权提示',
                      content: '需要您授权保存图片到相册',
                      success: (modalRes) => {
                        if (modalRes.confirm) {
                          wx.openSetting();
                        }
                      }
                    });
                  }
                }
              });
            },
            fail: (err) => {
              wx.hideLoading();
              wx.showToast({
                title: '图片生成失败',
                icon: 'none'
              });
            }
          });
        };
        
        img.onload = () => {
          try {
            ctx.drawImage(img, qrcodeX, qrcodeY, qrcodeSize, qrcodeSize);
          } catch (e) {
            // 绘制失败不影响后续保存
          }
          
          // 绘制提示文字
          drawQrCodeText();
          
          // 保存图片
          saveCanvasToImage();
        };
        
        // 添加图片加载失败处理
        img.onerror = () => {
          // 图片加载失败，绘制提示文字，然后保存图片
          drawQrCodeText();
          saveCanvasToImage();
        };
        
        // 从云存储获取小程序码图片（带缓存）
        cloudStorage.getImage('wyhd-minipro.png')
          .then(qrcodeUrl => {
            img.src = qrcodeUrl;
          })
          .catch(error => {
            // 云存储获取失败，使用本地默认图片
            const defaultQrcodePath = '/images/qrcode-default.png';
            img.src = defaultQrcodePath;
          });
      });
  },

  /**
   * 切换收藏状态
   */
  toggleFavorite() {
    const { todayCharacter, isFavorite } = this.data;
    let favorites = wx.getStorageSync('dailyCharacterFavorites') || [];
    
    if (isFavorite) {
      // 取消收藏
      favorites = favorites.filter(id => id !== todayCharacter.id);
    } else {
      // 添加收藏
      favorites.push(todayCharacter.id);
    }
    
    wx.setStorageSync('dailyCharacterFavorites', favorites);
    
    this.setData({
      isFavorite: !isFavorite
    });
    
    wx.showToast({
      title: isFavorite ? '取消收藏成功' : '收藏成功',
      icon: 'success'
    });
  },

  /**
   * 跳转到测试页面
   */
  navigateToTest() {
    wx.navigateTo({
      url: '/subgames/daily-character/pages/test/index'
    });
  },

  /**
   * 显示易读错字列表
   */
  showCharacterList() {
    wx.navigateTo({
      url: '/subgames/daily-character/pages/list/list'
    });
  },

  /**
   * 打开设置窗口
   */
  openSettings() {
    // 打开设置窗口前，将当前难度设置同步到临时变量
    this.setData({
      settingVisible: true,
      tempDifficulties: {
        beginner: this.data.difficultyBeginner,
        intermediate: this.data.difficultyIntermediate,
        advanced: this.data.difficultyAdvanced,
        challenge: this.data.difficultyChallenge
      }
    });
  },

  /**
   * 关闭设置窗口（不保存）
   */
  closeSettings() {
    this.setData({
      settingVisible: false
    });
  },

  /**
   * 保存设置
   */
  saveSettings() {
    // 获取临时难度设置
    const { tempDifficulties, testDifficulty } = this.data;
    
    // 检查是否至少选择了一个难度
    const hasSelectedDifficulty = Object.values(tempDifficulties).some(value => value === true);
    if (!hasSelectedDifficulty) {
      wx.showToast({
        title: '难度选择配置必须至少选择一个选项',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 更新实际难度设置
    const difficultyBeginner = tempDifficulties.beginner;
    const difficultyIntermediate = tempDifficulties.intermediate;
    const difficultyAdvanced = tempDifficulties.advanced;
    const difficultyChallenge = tempDifficulties.challenge;
    
    // 保存到本地存储
    wx.setStorageSync('dailyCharacterDifficulties', {
      difficultyBeginner,
      difficultyIntermediate,
      difficultyAdvanced,
      difficultyChallenge
    });
    
    // 保存测试难度到本地存储
    wx.setStorageSync('dailyCharacterTestDifficulty', testDifficulty);
    
    // 更新数据
    this.setData({
      difficultyBeginner,
      difficultyIntermediate,
      difficultyAdvanced,
      difficultyChallenge,
      settingVisible: false
    });
    
    // 重新过滤汉字
    this.filterCharacters();
    
    // 显示保存成功提示
    wx.showToast({
      title: '设置已保存',
      icon: 'success',
      duration: 1500
    });
  },

  /**
   * 切换设置中的难度选择（临时）
   */
  toggleTempDifficulty(e) {
    const { level } = e.currentTarget.dataset;
    let updateData = {};
    
    switch(level) {
      case '初级':
        updateData['tempDifficulties.beginner'] = !this.data.tempDifficulties.beginner;
        break;
      case '中级':
        updateData['tempDifficulties.intermediate'] = !this.data.tempDifficulties.intermediate;
        break;
      case '高级':
        updateData['tempDifficulties.advanced'] = !this.data.tempDifficulties.advanced;
        break;
      case '挑战级':
        updateData['tempDifficulties.challenge'] = !this.data.tempDifficulties.challenge;
        break;
      default:
        console.error('未知的难度等级:', level);
        return;
    }
    
    this.setData(updateData);
  },

  /**
   * 选择测试难度
   */
  selectTestDifficulty(e) {
    const { difficulty } = e.currentTarget.dataset;
    this.setData({
      testDifficulty: difficulty
    });
  },

  /**
   * 显示上一个汉字
   */
  showPreviousCharacter() {
    const { filteredCharacters, currentCharacterIndex } = this.data;
    if (filteredCharacters.length === 0) return;
    
    let newIndex = currentCharacterIndex - 1;
    if (newIndex < 0) {
      newIndex = filteredCharacters.length - 1;
    }
    
    this.loadCharacterByIndex(newIndex);
  },

  /**
   * 显示下一个汉字
   */
  showNextCharacter() {
    const { filteredCharacters, currentCharacterIndex } = this.data;
    if (filteredCharacters.length === 0) return;
    
    let newIndex = currentCharacterIndex + 1;
    if (newIndex >= filteredCharacters.length) {
      newIndex = 0;
    }
    
    this.loadCharacterByIndex(newIndex);
  },

  /**
   * 根据索引加载汉字
   */
  loadCharacterByIndex(index) {
    const { filteredCharacters } = this.data;
    const character = filteredCharacters[index];
    
    // 检查是否已收藏
    const favorites = wx.getStorageSync('dailyCharacterFavorites') || [];
    const isFavorite = favorites.includes(character.id);
    
    // 处理错误读音显示
    const wrongPronunciationsText = character.wrongPronunciations ? character.wrongPronunciations.join('、') : '暂无数据';
    
    // 处理错误原因分类显示
    const errorReasonText = this.getErrorReasonText(character.errorReasonType);
    
    this.setData({
      todayCharacter: character,
      isFavorite: isFavorite,
      currentCharacterIndex: index,
      wrongPronunciationsText: wrongPronunciationsText,
      errorReasonText: errorReasonText, // 预先计算好的错误原因文本
      isFlipped: false
    });
  },



  /**
   * 根据难度过滤汉字
   */
  filterCharacters() {
    const { allCharacters, difficultyBeginner, difficultyIntermediate, difficultyAdvanced, difficultyChallenge } = this.data;
    
    // 空值检查
    if (!allCharacters || !Array.isArray(allCharacters)) {
      return;
    }
    
    // 过滤汉字，根据四个独立变量的值
    const filteredCharacters = allCharacters.filter(char => {
      switch(char.difficultyLevel) {
        case '初级':
          return difficultyBeginner;
        case '中级':
          return difficultyIntermediate;
        case '高级':
          return difficultyAdvanced;
        case '挑战级':
          return difficultyChallenge;
        default:
          return false;
      }
    });
    
    this.setData({
      filteredCharacters: filteredCharacters
    });
    
    this.loadRandomCharacter();
  },

  /**
   * 获取错误原因文本
   */
  getErrorReasonText(type) {
    const errorReasonMap = {
      1: '形声字误读',
      2: '多音字误读',
      3: '声母误读',
      4: '韵母误读',
      5: '声调误读',
      6: '形似字误读',
      7: '方言影响误读',
      8: '其他误读原因'
    };
    
    // 确保type是数字类型
    const numType = Number(type) || 0;
    
    // 获取对应的文本
    const text = errorReasonMap[numType] || '未知类型';
    
    // 确保返回字符串类型
    const result = String(text);
    
    return result;
  },

  /**
   * 生成分享图片
   */
  generateShareImage(callback) {
    const { todayCharacter } = this.data;
    
    if (!todayCharacter) {
      callback('');
      return;
    }

    // 检查是否有缓存的分享图片
    const cacheKey = `share_image_${todayCharacter.id}`;
    try {
      const cachedImage = wx.getStorageSync(cacheKey);
      if (cachedImage) {
        // 检查缓存文件是否存在
        const fs = wx.getFileSystemManager();
        fs.accessSync(cachedImage);
        callback(cachedImage);
        return;
      }
    } catch (error) {
      // 缓存不存在或已过期，重新生成
    }

    // 获取canvas上下文
    const query = wx.createSelectorQuery();
    query.select('#character-canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0]) {
          callback('');
          return;
        }
        
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // 设置canvas尺寸
        const width = 750;
        const height = 750;
        canvas.width = width;
        canvas.height = height;

        // 绘制背景
        ctx.fillStyle = '#f8f6f0';
        ctx.fillRect(0, 0, width, height);

        // 绘制边框
        ctx.strokeStyle = '#e8e4d8';
        ctx.lineWidth = 20;
        ctx.strokeRect(10, 10, width - 20, height - 20);

        // 绘制标题
        ctx.fillStyle = '#8B4513';
        ctx.font = '52px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('每日一字', width / 2, 140);

        // 绘制分隔线
        ctx.strokeStyle = '#d2b48c';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(50, 180);
        ctx.lineTo(width - 50, 180);
        ctx.stroke();

        // 绘制汉字
        ctx.fillStyle = '#8B4513';
        ctx.font = '180px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(todayCharacter.char, width / 2, 320);
        
        // 绘制正确读音
        ctx.fillStyle = '#28a745';
        ctx.font = '60px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(todayCharacter.correctPronunciation, width / 2, 400);
        
        // 绘制相关词组
        if (todayCharacter.relatedPhrases && todayCharacter.relatedPhrases.length > 0) {
          ctx.fillStyle = '#666';
          ctx.font = '32px sans-serif';
          ctx.textAlign = 'center';
          
          const phrasesText = todayCharacter.relatedPhrases.join('、');
          const lineHeight = 40;
          const maxWidth = 650;
          let startY = 470;
          let currentLine = '';

          // 自动换行绘制词组
          for (let i = 0; i < phrasesText.length; i++) {
            const testLine = currentLine + phrasesText[i];
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && i > 0) {
              ctx.fillText(currentLine, width / 2, startY);
              startY += lineHeight;
              currentLine = phrasesText[i];
            } else {
              currentLine = testLine;
            }
          }
          ctx.fillText(currentLine, width / 2, startY);
        }

        // 绘制底部装饰
        const bottomGradient = ctx.createLinearGradient(0, height - 200, 0, height);
        bottomGradient.addColorStop(0, 'rgba(210, 180, 140, 0.2)');
        bottomGradient.addColorStop(1, 'rgba(210, 180, 140, 0.4)');
        ctx.fillStyle = bottomGradient;
        ctx.fillRect(0, height - 200, width, 200);

        // 绘制小程序码
        const qrcodeSize = 120;
        const qrcodeX = 50;
        const qrcodeY = height - 170;

        // 绘制提示文字的函数
        const drawQrCodeText = () => {
          try {
            // 绘制小程序文字
            ctx.fillStyle = '#666666';
            ctx.font = '28px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('文益互动', qrcodeX + qrcodeSize + 20, qrcodeY + 50);
            ctx.fillText('长按识别二维码', qrcodeX + qrcodeSize + 20, qrcodeY + 90);
          } catch (e) {
            // 绘制失败不影响后续保存
          }
        };

        // 保存图片到临时文件的函数，无论图片加载成功与否都调用
        const saveCanvasToImage = () => {
          // 保存图片到临时文件
          wx.canvasToTempFilePath({
            canvas: canvas,
            success: (res) => {
              // 缓存生成的分享图片（7天有效期）
              try {
                const fs = wx.getFileSystemManager();
                const cachePath = `${wx.env.USER_DATA_PATH}/share_${todayCharacter.id}_${Date.now()}.png`;
                fs.copyFileSync(res.tempFilePath, cachePath);
                
                // 保存缓存路径到本地存储，并设置7天过期时间
                const cacheData = {
                  path: cachePath,
                  expire: Date.now() + 7 * 24 * 60 * 60 * 1000
                };
                wx.setStorageSync(cacheKey, cachePath);
              } catch (error) {
                // 缓存失败不影响分享
              }
              
              callback(res.tempFilePath);
            },
            fail: (err) => {
              callback('');
            }
          });
        };
        
        // 从云存储获取小程序码图片（带缓存）
        cloudStorage.getImage('wyhd-minipro.png')
          .then(qrcodeUrl => {
            const img = canvas.createImage();
            
            img.onload = () => {
              try {
                ctx.drawImage(img, qrcodeX, qrcodeY, qrcodeSize, qrcodeSize);
              } catch (e) {
                // 绘制失败不影响后续保存
              }
              
              // 绘制提示文字
              drawQrCodeText();
              
              // 保存图片
              saveCanvasToImage();
            };
            
            // 添加图片加载失败处理
            img.onerror = () => {
              // 图片加载失败，绘制提示文字，然后保存图片
              drawQrCodeText();
              saveCanvasToImage();
            };
            
            img.src = qrcodeUrl;
          })
          .catch(error => {
            // 云存储获取失败，直接绘制提示文字并保存图片
            drawQrCodeText();
            saveCanvasToImage();
          });
      });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return new Promise((resolve) => {
      // 生成分享图片
      this.generateShareImage((imageUrl) => {
        resolve({
          title: `每日一字 - ${this.data.todayCharacter?.char || '汉字学习'}`,
          path: '/subgames/daily-character/index',
          imageUrl: imageUrl
        });
      });
    });
  },

  /**
   * 用户点击分享到朋友圈
   */
  onShareTimeline() {
    return new Promise((resolve) => {
      // 生成分享图片
      this.generateShareImage((imageUrl) => {
        resolve({
          title: `每日一字 - ${this.data.todayCharacter?.char || '汉字学习'}`,
          query: 'from=timeline',
          imageUrl: imageUrl
        });
      });
    });
  },

  // 触摸开始事件
  onTouchStart(e) {
    // 重置触摸锁定状态
    this.isTouchLocked = false;
    
    // 使用临时变量存储触摸开始位置
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    
    // 检测触摸起始位置，如果在页面右边缘（右侧20px以内），保留右滑退出功能
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    this.isEdgeTouch = (windowWidth - this.touchStartX) < 20;
  },

  // 触摸移动事件
  onTouchMove(e) {
    // 使用临时变量存储触摸移动位置
    this.touchMoveX = e.touches[0].clientX;
    this.touchMoveY = e.touches[0].clientY;
    
    // 计算滑动距离
    const deltaX = this.touchMoveX - this.touchStartX;
    const deltaY = this.touchMoveY - this.touchStartY;
    
    // 如果是边缘触摸，保留默认行为（右滑退出）
    if (this.isEdgeTouch) {
      return;
    }
    
    // 如果还没有锁定，检查是否超过阈值
    if (!this.isTouchLocked) {
      // 如果水平滑动距离超过阈值，锁定触摸事件
      if (Math.abs(deltaX) > this.touchLockThreshold) {
        this.isTouchLocked = true;
      }
    }
    
    // 阻止所有垂直滚动，只允许水平滑动
    e.preventDefault();
  },

  // 触摸结束事件
  onTouchEnd() {
    // 使用临时变量计算触摸距离
    const deltaX = this.touchMoveX - this.touchStartX;
    const deltaY = this.touchMoveY - this.touchStartY;
    
    // 如果是边缘触摸，不处理字卡切换
    if (!this.isEdgeTouch) {
      // 增加滑动检测的阈值，只有明显的滑动动作才会触发翻页
      // 水平移动距离需要大于100px，且水平移动距离大于垂直移动距离的2倍
      // 这样可以确保只有真正的滑动才会触发翻页，避免点击时的轻微移动被误识别
      if (Math.abs(deltaX) > 100 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
        if (deltaX > 0) {
          // 向右滑动，显示上一个汉字
          this.showPreviousCharacter();
        } else {
          // 向左滑动，显示下一个汉字
          this.showNextCharacter();
        }
      }
    }
    
    // 重置触摸事件相关的临时变量，避免影响下一次触摸事件
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchMoveX = 0;
    this.touchMoveY = 0;
    this.isTouchLocked = false;
    this.isEdgeTouch = false;
  }
});