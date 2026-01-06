// 引入完整的六十四卦数据
const hexagramsData = require('./hexagrams-data.js').hexagramsData;
const cloudStorage = require('../../../utils/cloudStorage');

Page({
  data: {
    // 查看模式：'random' 随机翻阅, 'group' 分组查看, 'sixYaoChange' 六爻变
    viewMode: 'random',
    

    
    // 随机翻阅相关
    currentRandomIndex: 0,
    currentRandomHexagram: null,
    // 用于随机翻阅的卦象顺序数组
    randomHexagramOrder: [],
    
    // 六爻变相关
    currentSixYaoIndex: 0, // 当前六爻变模式下的卦象索引
    currentSixYaoHexagram: null, // 当前显示的卦象
    sixYaoStates: [0, 0, 0, 0, 0, 0], // 六爻阴阳状态数组（0:阴，1:阳，从下往上）
    sixYaoButtons: [], // 六爻按钮配置数组
    // 六爻配置信息
    sixYaoConfig: [
      { yinText: '初六', yangText: '初九', index: 0 },
      { yinText: '六二', yangText: '九二', index: 1 },
      { yinText: '六三', yangText: '九三', index: 2 },
      { yinText: '六四', yangText: '九四', index: 3 },
      { yinText: '六五', yangText: '九五', index: 4 },
      { yinText: '上六', yangText: '上九', index: 5 }
    ]
  },
  
  // 触摸事件相关的临时变量（不放入data中，避免异步更新问题）
  touchStartX: 0,
  touchStartY: 0,
  touchMoveX: 0,
  touchMoveY: 0,

  onLoad() {
    this.initializeRandomHexagrams();
    
    // 初始化随机翻阅的第一个卦象
    const firstRandomHexagramIndex = this.data.randomHexagramOrder[this.data.currentRandomIndex];
    const firstRandomHexagram = hexagramsData[firstRandomHexagramIndex];
    
    // 初始化六爻变的第一个卦象
    const firstSixYaoHexagramIndex = this.data.randomHexagramOrder[this.data.currentSixYaoIndex];
    const firstSixYaoHexagram = hexagramsData[firstSixYaoHexagramIndex];
    const yaoStates = this.extractYaoStatesFromSymbol(firstSixYaoHexagram.symbol);
    
    this.setData({
      currentRandomHexagram: firstRandomHexagram,
      currentSixYaoHexagram: firstSixYaoHexagram,
      sixYaoStates: yaoStates,
      sixYaoButtons: this.generateSixYaoButtons(yaoStates)
    });
  },



  // 初始化随机卦象顺序
  initializeRandomHexagrams() {
    // 创建一个随机顺序的索引数组
    const order = Array.from({ length: hexagramsData.length }, (_, i) => i);
    // 打乱顺序
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    this.setData({
      randomHexagramOrder: order
    });
  },



  // 切换到随机翻阅模式
  switchToRandom() {
    let currentIndex;
    
    // 根据当前模式获取当前卦象索引
    if (this.data.viewMode === 'sixYaoChange') {
      // 从六爻变模式切换过来，使用六爻变的索引
      currentIndex = this.data.currentSixYaoIndex;
    } else {
      // 从其他模式切换过来，使用随机模式的索引
      currentIndex = this.data.currentRandomIndex;
    }
    
    // 仅在随机顺序数组为空时初始化
    if (this.data.randomHexagramOrder.length === 0) {
      this.initializeRandomHexagrams();
    }
    
    // 获取当前卦象
    const hexagramIndex = this.data.randomHexagramOrder[currentIndex];
    const hexagram = hexagramsData[hexagramIndex];
    
    this.setData({
      viewMode: 'random',
      currentRandomIndex: currentIndex,
      currentRandomHexagram: hexagram,
      // 同步更新六爻变的当前索引
      currentSixYaoIndex: currentIndex
    });
  },



  // 切换到第一个随机卦象
  switchToFirstRandomHexagram() {
    const { randomHexagramOrder } = this.data;
    const firstIndex = randomHexagramOrder[0];
    this.setData({
      currentRandomIndex: 0,
      currentRandomHexagram: hexagramsData[firstIndex]
    });
  },

  // 上一个卦象（按乱序序列）
  previousRandomHexagram() {
    let { currentRandomIndex, randomHexagramOrder } = this.data;
    currentRandomIndex = (currentRandomIndex - 1 + randomHexagramOrder.length) % randomHexagramOrder.length;
    const hexagramIndex = randomHexagramOrder[currentRandomIndex];
    const hexagram = hexagramsData[hexagramIndex];
    
    this.setData({
      currentRandomIndex: currentRandomIndex,
      currentRandomHexagram: hexagram,
      // 同步更新六爻变的当前索引
      currentSixYaoIndex: currentRandomIndex
    });
  },
  
  // 下一个卦象（按乱序序列）
  nextRandomHexagram() {
    let { currentRandomIndex, randomHexagramOrder } = this.data;
    currentRandomIndex = (currentRandomIndex + 1) % randomHexagramOrder.length;
    const hexagramIndex = randomHexagramOrder[currentRandomIndex];
    const hexagram = hexagramsData[hexagramIndex];
    
    this.setData({
      currentRandomIndex: currentRandomIndex,
      currentRandomHexagram: hexagram,
      // 同步更新六爻变的当前索引
      currentSixYaoIndex: currentRandomIndex
    });
  },

  // 进入卦详情页
  goToHexagramDetail(e) {
    let hexagram;
    if (e.currentTarget) {
      // 从事件中获取
      hexagram = e.currentTarget.dataset.hexagram;
    } else {
      // 直接传入的卦象对象
      hexagram = e;
    }
    wx.navigateTo({
      url: `/subgames/64Hexagrams/pages/hexagram-detail/hexagram-detail?hexagramId=${hexagram.id}`
    });
  },

  // 触摸开始事件
  onTouchStart(e) {
    // 使用临时变量存储触摸开始位置
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  },

  // 触摸移动事件
  onTouchMove(e) {
    // 使用临时变量存储触摸移动位置
    this.touchMoveX = e.touches[0].clientX;
    this.touchMoveY = e.touches[0].clientY;
  },

  // 触摸结束事件
  onTouchEnd() {
    // 使用临时变量计算触摸距离
    const deltaX = this.touchMoveX - this.touchStartX;
    const deltaY = this.touchMoveY - this.touchStartY;
    const { viewMode } = this.data;
    
    // 增加滑动检测的阈值，只有明显的滑动动作才会触发翻页
    // 水平移动距离需要大于100px，且水平移动距离大于垂直移动距离的2倍
    // 这样可以确保只有真正的滑动才会触发翻页，避免点击时的轻微移动被误识别
    if (Math.abs(deltaX) > 100 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
      if (viewMode === 'sixYaoChange') {
        // 六爻变模式
        if (deltaX > 0) {
          // 向右滑动，显示上一个卦象
          this.previousSixYaoHexagram();
        } else {
          // 向左滑动，显示下一个卦象
          this.nextSixYaoHexagram();
        }
      } else if (viewMode === 'random') {
        // 随机翻阅模式
        if (deltaX > 0) {
          // 向右滑动，显示上一个卦象
          this.previousRandomHexagram();
        } else {
          // 向左滑动，显示下一个卦象
          this.nextRandomHexagram();
        }
      }
    }
    
    // 重置触摸事件相关的临时变量，避免影响下一次触摸事件
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchMoveX = 0;
    this.touchMoveY = 0;
  },

  // 生成六爻按钮配置
  generateSixYaoButtons(yaoStates) {
    return this.data.sixYaoConfig.map((config, index) => {
      const isYang = yaoStates[index] === 1;
      return {
        index: index,
        text: isYang ? config.yangText : config.yinText,
        symbol: isYang ? '⚊' : '⚋'
      };
    });
  },

  // 从卦象符号提取六爻状态
  extractYaoStatesFromSymbol(symbol) {
    // 预生成卦象符号到六爻状态的映射
    if (!this.yaoStatesMap) {
      this.yaoStatesMap = {};
      
      // 定义八卦的三爻状态（从下往上）
      const trigramStates = {
        '乾': [1, 1, 1],
        '坤': [0, 0, 0],
        '震': [1, 0, 0],
        '巽': [0, 1, 1],
        '坎': [0, 1, 0],
        '离': [1, 0, 1],
        '艮': [0, 0, 1],
        '兑': [1, 1, 0]
      };
      
      // 生成每个卦象的六爻状态
      // 六爻状态从下往上排列，索引0是最下面一爻
      const hexagramYaoStates = hexagramsData.map(hexagram => {
        const lowerTrigram = trigramStates[hexagram.lowerTrigram]; // 下卦
        const upperTrigram = trigramStates[hexagram.upperTrigram]; // 上卦
        return [...lowerTrigram, ...upperTrigram]; // 合并下卦和上卦，下卦在前（索引0-2），上卦在后（索引3-5）
      });
      
      // 生成映射表
      for (let i = 0; i < hexagramsData.length; i++) {
        const hexagram = hexagramsData[i];
        this.yaoStatesMap[hexagram.symbol] = hexagramYaoStates[i];
      }
    }
    
    // 返回对应的六爻状态，默认返回全阴
    return this.yaoStatesMap[symbol] || [0, 0, 0, 0, 0, 0];
  },

  // 根据六爻状态找到对应的卦象
  findHexagramByYaoStates(yaoStates) {
    // 遍历hexagramsData，找到匹配的卦象
    return hexagramsData.find(hexagram => {
      const states = this.extractYaoStatesFromSymbol(hexagram.symbol);
      return states.toString() === yaoStates.toString();
    });
  },

  // 切换到六爻变模式
  switchToSixYaoChange() {
    let currentIndex;
    
    // 根据当前模式获取当前卦象索引
    if (this.data.viewMode === 'random') {
      // 从随机模式切换过来，使用随机模式的索引
      currentIndex = this.data.currentRandomIndex;
    } else {
      // 从其他模式切换过来，使用六爻变的当前索引
      currentIndex = this.data.currentSixYaoIndex;
    }
    
    // 如果randomHexagramOrder为空，先初始化
    if (this.data.randomHexagramOrder.length === 0) {
      this.initializeRandomHexagrams();
    }
    
    // 使用已有的随机顺序数组
    const hexagramIndex = this.data.randomHexagramOrder[currentIndex];
    const hexagram = hexagramsData[hexagramIndex];
    const yaoStates = this.extractYaoStatesFromSymbol(hexagram.symbol);
    
    this.setData({
      viewMode: 'sixYaoChange',
      currentSixYaoIndex: currentIndex,
      currentSixYaoHexagram: hexagram,
      sixYaoStates: yaoStates,
      sixYaoButtons: this.generateSixYaoButtons(yaoStates),
      // 同步更新随机模式的当前索引
      currentRandomIndex: currentIndex
    });
  },
  
  // 上一个卦象（六爻变模式）
  previousSixYaoHexagram() {
    let { currentSixYaoIndex, randomHexagramOrder } = this.data;
    currentSixYaoIndex = (currentSixYaoIndex - 1 + randomHexagramOrder.length) % randomHexagramOrder.length;
    const hexagramIndex = randomHexagramOrder[currentSixYaoIndex];
    const hexagram = hexagramsData[hexagramIndex];
    const yaoStates = this.extractYaoStatesFromSymbol(hexagram.symbol);
    
    this.setData({
      currentSixYaoIndex: currentSixYaoIndex,
      currentSixYaoHexagram: hexagram,
      sixYaoStates: yaoStates,
      sixYaoButtons: this.generateSixYaoButtons(yaoStates),
      // 同步更新随机模式的当前索引
      currentRandomIndex: currentSixYaoIndex
    });
  },
  
  // 下一个卦象（六爻变模式）
  nextSixYaoHexagram() {
    let { currentSixYaoIndex, randomHexagramOrder } = this.data;
    currentSixYaoIndex = (currentSixYaoIndex + 1) % randomHexagramOrder.length;
    const hexagramIndex = randomHexagramOrder[currentSixYaoIndex];
    const hexagram = hexagramsData[hexagramIndex];
    const yaoStates = this.extractYaoStatesFromSymbol(hexagram.symbol);
    
    this.setData({
      currentSixYaoIndex: currentSixYaoIndex,
      currentSixYaoHexagram: hexagram,
      sixYaoStates: yaoStates,
      sixYaoButtons: this.generateSixYaoButtons(yaoStates),
      // 同步更新随机模式的当前索引
      currentRandomIndex: currentSixYaoIndex
    });
  },

  // 六爻按钮点击事件
  onYaoButtonTap(e) {
    const index = e.currentTarget.dataset.index;
    const newYaoStates = [...this.data.sixYaoStates];
    newYaoStates[index] = newYaoStates[index] === 0 ? 1 : 0; // 切换阴阳状态
    
    // 根据新的六爻状态找到对应的卦象
    const hexagram = this.findHexagramByYaoStates(newYaoStates);
    
    this.setData({
      sixYaoStates: newYaoStates,
      currentSixYaoHexagram: hexagram,
      sixYaoButtons: this.generateSixYaoButtons(newYaoStates)
    });
  },

  // 去配对游戏
  goToMatchingGame() {
    wx.navigateTo({
      url: '/subgames/64Hexagrams/pages/matching/matching'
    });
  },
  
  // 去分组看页面
  goToGroupView() {
    wx.navigateTo({
      url: '/subgames/64Hexagrams/pages/group-view/group-view'
    });
  },

  // 存卡片功能
  saveHexagramCard() {
    // 获取当前显示的卦象
    let currentHexagram;
    if (this.data.viewMode === 'random') {
      currentHexagram = this.data.currentRandomHexagram;
    } else if (this.data.viewMode === 'sixYaoChange') {
      currentHexagram = this.data.currentSixYaoHexagram;
    } else {
      // 分组模式下，不支持保存卡片
      wx.showToast({
        title: '分组模式下暂不支持保存卡片',
        icon: 'none'
      });
      return;
    }

    if (!currentHexagram) {
      wx.showToast({
        title: '请先选择一个卦象',
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
    query.select('#hexagram-canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // 设置canvas尺寸
        const width = 750;
        const height = 1334;
        canvas.width = width;
        canvas.height = height;

        // 绘制背景
        ctx.fillStyle = '#f5f1e9';
        ctx.fillRect(0, 0, width, height);

        // 绘制边框
        ctx.strokeStyle = '#b8a57e';
        ctx.lineWidth = 20;
        ctx.strokeRect(10, 10, width - 20, height - 20);

        // 绘制标题
        ctx.fillStyle = '#8b4513';
        ctx.font = '52px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('易经六十四卦', width / 2, 140);

        // 绘制卦象序号 - 调整到右上角，字体更小
        ctx.fillStyle = '#d4af37';
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`第${currentHexagram.id}卦`, width - 50, 120);

        // 计算分区边界，将画布分为左右两个区
        const midX = width / 2;
        
        // 左区绘制卦象符号 - 左区占一半宽度，内容居中对齐
        ctx.fillStyle = '#2c3e50';
        ctx.font = '120px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(currentHexagram.symbol, midX / 2, 280);

        // 右区绘制卦名和拼音 - 右区占一半宽度，内容居中对齐
        
        // 先绘制卦名（右区上半部分）
        ctx.fillStyle = '#8b4513';
        ctx.font = '48px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(currentHexagram.name, midX + (midX / 2), 260);
        
        // 绘制拼音（右区下半部分，卦名下方）
        ctx.fillStyle = '#6d4c41';
        ctx.font = '32px sans-serif';
        ctx.fillText(currentHexagram.pinyin, midX + (midX / 2), 310);

        // 绘制别名和上下卦 - 调整到一行
        ctx.fillStyle = '#8b4513';
        ctx.font = '36px sans-serif';
        
        // 先绘制卦别名
        ctx.fillText(currentHexagram.alias, width / 2 - 100, 420);
        
        // 绘制上下卦
        ctx.fillStyle = '#6d4c41';
        ctx.font = '32px sans-serif';
        ctx.fillText(`上${currentHexagram.upperTrigram}下${currentHexagram.lowerTrigram}`, width / 2 + 120, 420);

        // 绘制卦辞
        ctx.fillStyle = '#333333';
        ctx.font = '36px sans-serif';
        ctx.textAlign = 'left';

        const hexagramText = currentHexagram.hexagramText;
        const lineHeight = 50;
        const maxWidth = 650;
        let startY = 500;
        let currentLine = '';

        // 自动换行绘制卦辞
        for (let i = 0; i < hexagramText.length; i++) {
          const testLine = currentLine + hexagramText[i];
          const metrics = ctx.measureText(testLine);
          
          if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(currentLine, (width - maxWidth) / 2, startY);
            startY += lineHeight;
            currentLine = hexagramText[i];
          } else {
            currentLine = testLine;
          }
        }
        ctx.fillText(currentLine, (width - maxWidth) / 2, startY);
        startY += lineHeight * 2;

        // 检查并绘制爻辞
        if (currentHexagram.yaoTexts && Array.isArray(currentHexagram.yaoTexts) && currentHexagram.yaoTexts.length > 0) {
          ctx.fillStyle = '#8b4513';
          ctx.font = '38px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('爻辞', width / 2, startY);
          startY += lineHeight;

          ctx.fillStyle = '#333333';
          ctx.font = '28px sans-serif';
          ctx.textAlign = 'left';

          // 遍历爻辞并绘制
          for (let i = 0; i < currentHexagram.yaoTexts.length; i++) {
            const yaoText = currentHexagram.yaoTexts[i];
            
            // 自动换行绘制爻辞
            let yaoCurrentLine = '';
            for (let j = 0; j < yaoText.length; j++) {
              const testLine = yaoCurrentLine + yaoText[j];
              const metrics = ctx.measureText(testLine);
              
              if (metrics.width > maxWidth && j > 0) {
                ctx.fillText(yaoCurrentLine, (width - maxWidth) / 2, startY);
                startY += lineHeight;
                yaoCurrentLine = yaoText[j];
              } else {
                yaoCurrentLine = testLine;
              }
            }
            ctx.fillText(yaoCurrentLine, (width - maxWidth) / 2, startY);
            startY += lineHeight;
          }
        }

        // 绘制底部装饰
        const bottomGradient = ctx.createLinearGradient(0, height - 200, 0, height);
        bottomGradient.addColorStop(0, 'rgba(212, 175, 55, 0.2)');
        bottomGradient.addColorStop(1, 'rgba(212, 175, 55, 0.4)');
        ctx.fillStyle = bottomGradient;
        ctx.fillRect(0, height - 200, width, 200);

        // 绘制小程序码
        const qrcodeSize = 120;
        const qrcodeX = 50;
        const qrcodeY = height - 170;

        // 加载并绘制小程序码
        const img = canvas.createImage();
        
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
            
            // 绘制小程序文字
            ctx.fillStyle = '#666666';
            ctx.font = '28px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('文益互动', qrcodeX + qrcodeSize + 20, qrcodeY + 50);
            ctx.fillText('长按识别二维码', qrcodeX + qrcodeSize + 20, qrcodeY + 90);
          } catch (e) {
            // 绘制失败不影响后续保存
          }
          
          // 保存图片
          saveCanvasToImage();
        };
        
        // 添加图片加载失败处理
        img.onerror = () => {
          // 图片加载失败，跳过小程序码绘制，直接保存图片
          saveCanvasToImage();
        };
        
        // 云存储图片路径
        const cloudImagePath = 'cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/main/wyhd-minipro.png';
        // 本地缓存key
        const imageCacheKey = 'wxapp_qrcode_image';
        
        // 检查本地是否有缓存的图片
        wx.getStorage({
          key: imageCacheKey,
          success: (res) => {
            // 有缓存，直接使用本地缓存文件
            img.src = res.data;
          },
          fail: () => {
            // 无缓存，从云存储下载图片
            wx.cloud.downloadFile({
              fileID: cloudImagePath,
              success: (res) => {
                // 下载成功，缓存到本地
                wx.setStorage({
                  key: imageCacheKey,
                  data: res.tempFilePath
                });
                img.src = res.tempFilePath;
              },
              fail: () => {
                // 下载失败，使用云存储默认图片作为备选
                cloudStorage.getImage('wyhd-share-default.png')
                  .then(url => {
                    img.src = url;
                  })
                  .catch(error => {
                    console.error('Get backup image error:', error);
                    // 如果云存储也获取失败，保持空白或使用其他备选方案
                  });
              }
            });
          }
        });
      });
  },

  /**
   * 用户点击右上角分享给朋友
   */
  onShareAppMessage(options) {
    return {
      title: '易经六十四卦学习 - 探索中国传统哲学智慧',
      path: '/subgames/64Hexagrams/index'
    };
  },

  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: '易经六十四卦学习 - 探索中国传统哲学智慧',
      query: ''
    };
  }
});