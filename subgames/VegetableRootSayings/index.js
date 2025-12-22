// 菜根谭摘录页面 - 优化版本，适配小程序操作习惯
const data = require('./data.js');

Page({
  data: {
    quotes: [],
    randomSequence: [],
    currentIndex: 0,
    currentQuote: null,
    isOriginalVisible: false,
    showOriginalDetail: false,
    isLoading: true
  },

  onLoad() {
    this.initApp();
  },



  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    // 显示随机名言
    this.showRandomQuote();
    
    // 停止下拉刷新
    wx.stopPullDownRefresh();
    
    wx.showToast({
      title: '已刷新',
      icon: 'none',
      duration: 800
    });
  },

  /**
   * 生成随机序列
   */
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  /**
   * 初始化应用
   */
  initApp() {
    // 加载名言数据
    const quotes = data.quotes;
    // 生成随机序列
    const randomSequence = this.shuffleArray(Array.from({ length: quotes.length }, (_, i) => i));
    this.setData({
      quotes: quotes,
      randomSequence: randomSequence
    });
    
    // 显示随机名言
    this.showRandomQuote();
    
    // 显示分享菜单，允许分享给朋友和分享到朋友圈
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    
    // 减少加载时间，提升用户体验
    setTimeout(() => {
      this.setData({ isLoading: false });
    }, 600);
  },

  /**
   * 显示随机名言
   */
  showRandomQuote() {
    const randomSequence = this.data.randomSequence;
    if (!randomSequence || randomSequence.length === 0) return;
    
    const randomPosition = Math.floor(Math.random() * randomSequence.length);
    this.showQuote(randomPosition);
  },

  /**
   * 显示指定索引的名言（基于随机序列）
   */
  showQuote(sequenceIndex) {
    const quotes = this.data.quotes;
    const randomSequence = this.data.randomSequence;
    if (!quotes || !randomSequence || sequenceIndex < 0 || sequenceIndex >= randomSequence.length) return;
    
    const quoteIndex = randomSequence[sequenceIndex];
    const currentQuote = quotes[quoteIndex];
    this.setData({
      currentIndex: sequenceIndex,
      currentQuote: currentQuote,
      isOriginalVisible: false,
      showOriginalDetail: false
    });
  },

  /**
   * 显示上一句名言（基于随机序列）
   */
  showPreviousQuote() {
    const randomSequence = this.data.randomSequence;
    let newIndex = this.data.currentIndex - 1;
    if (newIndex < 0) {
      newIndex = randomSequence.length - 1;
    }
    this.showQuote(newIndex);
  },

  /**
   * 显示下一句名言（基于随机序列）
   */
  showNextQuote() {
    const randomSequence = this.data.randomSequence;
    let newIndex = this.data.currentIndex + 1;
    if (newIndex >= randomSequence.length) {
      newIndex = 0;
    }
    this.showQuote(newIndex);
  },

  /**
   * 显示原文详情页
   */
  showOriginalDetail() {
    this.setData({
      showOriginalDetail: true
    });
  },

  /**
   * 隐藏原文详情页
   */
  hideOriginalDetail() {
    this.setData({
      showOriginalDetail: false
    });
  },



  /**
   * 保存卡片到相册
   */
  saveCard() {
    const quote = this.data.currentQuote;
    if (!quote) return;
    
    // 直接生成并保存卡片
    this.generateShareImage(true);
  },

  /**
   * 分享名言 - 现在直接通过按钮的open-type="share"属性触发
   * 这个函数保留用于生成分享图片的备用入口
   */
  shareQuote() {
    const quote = this.data.currentQuote;
    if (!quote) return;
    
    // 显示分享选择弹窗
    wx.showActionSheet({
      itemList: ['生成分享图片'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 生成分享图片
          this.generateShareImage(false);
        }
      }
    });
  },

  /**
   * 生成分享图片
   */
  generateShareImage(showDirectSave = false) {
    const quote = this.data.currentQuote;
    if (!quote) return;
    
    wx.showLoading({
      title: '生成图片中...',
    });
    
    // 小程序码File ID - 与神兽海报使用相同的小程序图
    const qrcodeImageId = 'cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/main/wyhd-minipro.png';
    
    // 下载小程序码
    wx.cloud.downloadFile({
      fileID: qrcodeImageId,
      success: (res) => {
        const qrcodePath = res.tempFilePath;
        
        // 使用Canvas API 2D
        const query = wx.createSelectorQuery();
        query.select('#shareCanvas')
          .fields({ node: true, size: true })
          .exec((res) => {
            const canvas = res[0].node;
            const ctx = canvas.getContext('2d');
            
            // 设置画布尺寸，处理设备像素比
            const dpr = wx.getSystemInfoSync().pixelRatio;
            canvas.width = 750 * dpr;
            canvas.height = 1334 * dpr;
            ctx.scale(dpr, dpr);
            
            const canvasWidth = 750;
            const canvasHeight = 1334;
            
            // 绘制渐变背景
            const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
            gradient.addColorStop(0, '#f8f0e3');
            gradient.addColorStop(1, '#e6d9c6');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            
            // 绘制装饰边框
            ctx.strokeStyle = '#d4af37';
            ctx.lineWidth = 8;
            ctx.strokeRect(20, 20, canvasWidth - 40, canvasHeight - 40);
            
            // 绘制装饰花纹（简单的四角花纹）
            ctx.fillStyle = '#d4af37';
            ctx.globalAlpha = 0.3;
            // 左上角花纹
            ctx.beginPath();
            ctx.arc(60, 60, 20, 0, 2 * Math.PI);
            ctx.fill();
            // 右上角花纹
            ctx.beginPath();
            ctx.arc(canvasWidth - 60, 60, 20, 0, 2 * Math.PI);
            ctx.fill();
            // 左下角花纹
            ctx.beginPath();
            ctx.arc(60, canvasHeight - 60, 20, 0, 2 * Math.PI);
            ctx.fill();
            // 右下角花纹
            ctx.beginPath();
            ctx.arc(canvasWidth - 60, canvasHeight - 60, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.globalAlpha = 1;
            
            // 绘制标题
            ctx.fillStyle = '#8b4513';
            ctx.font = '52px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('菜根谭智慧', canvasWidth / 2, 140); // 加大间距
            
            // 绘制主题（使用醒目的颜色）
            ctx.fillStyle = '#d4af37';
            ctx.font = '38px sans-serif';
            ctx.fillText(quote.theme, canvasWidth / 2, 230); // 加大间距
            
            // 绘制名言内容（自动换行，首行退两格）
            ctx.fillStyle = '#333333';
            ctx.font = '42px sans-serif';
            ctx.textAlign = 'left';
            
            const content = quote.quote;
            const lineHeight = 70;
            const maxWidth = 650;
            let startY = 320; // 加大间距
            let currentLine = '';
            
            // 为名言内容添加首行缩进（两个全角空格）
            const formattedContent = '　　' + content;
            
            for (let i = 0; i < formattedContent.length; i++) {
              const testLine = currentLine + formattedContent[i];
              const metrics = ctx.measureText(testLine);
              
              if (metrics.width > maxWidth && i > 0) {
                ctx.fillText(currentLine, (canvasWidth - maxWidth) / 2, startY);
                startY += lineHeight;
                currentLine = formattedContent[i];
              } else {
                currentLine = testLine;
              }
            }
            
            ctx.fillText(currentLine, (canvasWidth - maxWidth) / 2, startY);
            startY += lineHeight * 2;
            
            // 绘制出处（去掉重复的《菜根潭》）
            ctx.fillStyle = '#8b4513';
            ctx.font = '34px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(`——${quote.source}`, canvasWidth - 60, startY);
            
            // 绘制底部装饰（优化样式）
            const bottomGradient = ctx.createLinearGradient(0, canvasHeight - 150, 0, canvasHeight);
            bottomGradient.addColorStop(0, 'rgba(212, 175, 55, 0.2)');
            bottomGradient.addColorStop(1, 'rgba(212, 175, 55, 0.4)');
            ctx.fillStyle = bottomGradient;
            ctx.fillRect(0, canvasHeight - 150, canvasWidth, 150);
            
            // 绘制小程序码 - 放置在下部左侧，大小75*75px，接近卡片最底部
            const qrcodeSize = 75;
            const qrcodeX = 50;
            const qrcodeY = canvasHeight - 125;
            
            // 加载并绘制小程序码
            const img = canvas.createImage();
            img.onload = () => {
              ctx.drawImage(img, qrcodeX, qrcodeY, qrcodeSize, qrcodeSize);
              
              // 绘制小程序文字 - 文字和图像分左右排列，文字用灰色，字体大小16px
              ctx.fillStyle = '#666666';
              ctx.font = '16px sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('文益互动', qrcodeX + qrcodeSize + 15, qrcodeY + 30);
              ctx.fillText('长按识别二维码', qrcodeX + qrcodeSize + 15, qrcodeY + 55);
              
              // 保存图片到临时文件
              wx.canvasToTempFilePath({
                canvas: canvas,
                success: (res) => {
                  wx.hideLoading();
                  
                  if (showDirectSave) {
                    // 直接保存到相册
                    this.saveImageToAlbum(res.tempFilePath, true);
                  } else {
                    // 显示图片预览并提供保存选项
                    wx.showModal({
                      title: '分享图片已生成',
                      content: '是否保存图片到相册？',
                      success: (modalRes) => {
                        if (modalRes.confirm) {
                          // 保存图片到相册
                          this.saveImageToAlbum(res.tempFilePath);
                        }
                      }
                    });
                  }
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
            img.src = qrcodePath;
          });
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({
          title: '小程序码下载失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 保存图片到相册
   */
  saveImageToAlbum(filePath, showDirectTip = false) {
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success: () => {
        if (showDirectTip) {
          wx.showToast({
            title: '摘录卡片已保存到相册，请到相册查看分享',
            icon: 'success',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '图片已保存到相册',
            icon: 'success'
          });
        }
      },
      fail: (err) => {
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
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          });
        }
      }
    });
  },



  /**
   * 复制名言
   */
  copyQuote() {
    const quote = this.data.currentQuote;
    if (!quote) return;
    
    const copyContent = `${quote.theme}\n\n${quote.quote}\n\n——《菜根谭》${quote.source}`;
    
    wx.setClipboardData({
      data: copyContent,
      success: () => {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'none',
          duration: 1500
        });
      },
      fail: () => {
        wx.showToast({
          title: '复制失败',
          icon: 'none'
        });
      }
    });
  },



  /**
   * 微信分享给朋友
   */
  onShareAppMessage() {
    const quote = this.data.currentQuote;
    if (!quote) {
      return {
        title: '菜根谭智慧',
        path: '/subgames/VegetableRootSayings/index'
      };
    }
    
    return {
      title: `菜根谭智慧：${quote.theme} - ${quote.quote.substring(0, 15)}${quote.quote.length > 15 ? '...' : ''}`,
      path: '/subgames/VegetableRootSayings/index'
    };
  },

  /**
   * 微信分享到朋友圈
   */
  onShareTimeline() {
    const quote = this.data.currentQuote;
    if (!quote) {
      return {
        title: '菜根谭智慧',
        query: ''
      };
    }
    
    return {
      title: `菜根谭智慧：${quote.theme} - ${quote.quote.substring(0, 15)}${quote.quote.length > 15 ? '...' : ''}`,
      query: ''
    };
  }
});