// 海报生成页
const beastsData = require('./beasts');
const imageConfig = require('./imageConfig');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    beast: null, // 守护神兽信息
    posterImage: null, // 生成的海报图片
    isGenerating: false, // 是否正在生成海报
    // 页面数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收传递的神兽ID和箴言
    const beastId = options.beastId;
    const proverb = decodeURIComponent(options.proverb || '');
    this.loadBeastData(beastId, proverb);
    
    // 清理过期缓存
    this.clearExpiredCache();
    
    // 显示分享菜单，允许分享给朋友和分享到朋友圈
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享给朋友
   */
  onShareAppMessage() {
    const { beast, posterImage } = this.data;
    return {
      title: `我的守护神兽海报 - ${beast.name}`,
      path: `/subgames/guardian-beast/poster?beastId=${beast.id}&proverb=${encodeURIComponent(beast.selectedProverb || '')}`,
      imageUrl: posterImage // 使用生成的海报图片作为分享图片
    };
  },
  
  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline() {
    const { beast } = this.data;
    return {
      title: `我的守护神兽海报 - ${beast.name}`,
      query: `beastId=${beast.id}&proverb=${encodeURIComponent(beast.selectedProverb || '')}`
    };
  },

  // 加载神兽数据
  loadBeastData(beastId, proverb) {
    // 从本地JSON文件加载数据
    const beasts = beastsData.beasts;
    const beast = beasts.find(item => item.id === beastId);
    
    if (beast) {
      // 添加选中的箴言
      beast.selectedProverb = proverb;
      this.setData({ beast });
      // 页面加载完成后生成海报
      setTimeout(() => {
        this.generatePoster();
      }, 500);
    } else {
      // 如果没有找到对应神兽，返回上一页
      wx.navigateBack();
    }
  },

  // 生成海报
  generatePoster() {
    if (this.data.isGenerating) return;
    
    this.setData({ isGenerating: true });
    
    const { beast } = this.data;
    const that = this;
    
    // 获取Canvas 2D上下文
    wx.createSelectorQuery()
      .select('#posterCanvas')
      .fields({ node: true, size: true })
      .exec(res => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        // 设置Canvas尺寸，使用600*900的绘制尺寸
        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = 600 * dpr;
        canvas.height = 900 * dpr;
        ctx.scale(dpr, dpr);
        
        // 海报背景图File ID
        const backgroundImageId = 'cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/TradEngage/guardian-beast-posterback.jpg';
        // 小程序码File ID
        const qrcodeImageId = 'cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/main/wyhd-minipro.png';
        
        // 使用async/await处理图片下载，引入缓存机制
        const drawPoster = async () => {
          try {
            // 下载背景图（使用缓存）
            const backgroundPath = await that.downloadImage(backgroundImageId);
            // 下载小程序码（使用缓存）
            const qrcodePath = await that.downloadImage(qrcodeImageId);
            
            // 绘制背景图，铺满整个canvas
            const backgroundImg = canvas.createImage();
            backgroundImg.onload = () => {
              ctx.drawImage(backgroundImg, 0, 0, 600, 900);
              
              // 绘制名称和神兽名称 - 显示在一行，中间隔间距，不要分隔符
              ctx.font = 'bold 52px sans-serif';
              ctx.fillStyle = '#000000';
              ctx.textAlign = 'center';
              ctx.textShadow = '0 0 10rpx rgba(255, 255, 255, 0.5)';
              
              // 计算名称和神兽名称的位置，使其显示在同一行
              const name = beast.name;
              const beastName = beast.beastName;
              
              if (beastName) {
                // 名称和神兽名称显示在同一行，中间仅2个空格作为间距
                ctx.fillText(`${name}  ${beastName}`, 300, 100);
              } else {
                ctx.fillText(name, 300, 100);
              }
              
              // 绘制其他内容
              const drawOtherContent = (qrcodePath) => {
                    // 绘制神兽形象 - 圆形裁剪，放在画布中央，直径420px
                    const centerX = 300;
                    const centerY = 370; // 将图像整体向上30px（原来的400px - 30px）
                    const beastImageWidth = 420;
                    const beastImageHeight = 420;
                    const circleRadius = 210; // 半径210px，直径420px
                    
                    // 绘制默认图片
                    const drawDefaultImage = () => {
                      // 绘制增强发光效果 - 圆圈周围
                      const gradient = ctx.createRadialGradient(centerX, centerY, circleRadius, centerX, centerY, circleRadius + 40);
                      gradient.addColorStop(0, 'rgba(160, 144, 117, 0.5)');
                      gradient.addColorStop(1, 'rgba(160, 144, 117, 0)');
                      ctx.fillStyle = gradient;
                      ctx.beginPath();
                      ctx.arc(centerX, centerY, circleRadius + 40, 0, Math.PI * 2);
                      ctx.fill();
                      
                      // 绘制一个默认的背景和文字
                      ctx.beginPath();
                      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
                      ctx.clip();
                      ctx.fillStyle = '#8B4513';
                      ctx.fillRect(centerX - circleRadius, centerY - circleRadius, circleRadius * 2, circleRadius * 2);
                      ctx.restore();
                      
                      ctx.font = '60px sans-serif';
                      ctx.fillStyle = '#ffffff';
                      ctx.textAlign = 'center';
                      ctx.fillText(beast.name.charAt(0), centerX, centerY + 20);
                      
                      // 继续绘制文字内容
                      drawTextContent();
                    };
                    
                    // 处理神兽图片加载
                    const loadBeastImage = async () => {
                      const imageUrl = beast.image;
                      let imagePath = null;
                      
                      try {
                        // 检查是否是云文件ID
                        if (imageUrl && imageUrl.startsWith('cloud://')) {
                          // 使用缓存机制下载文件
                          imagePath = await that.downloadImage(imageUrl);
                        } else {
                          // 非云文件ID，直接使用
                          imagePath = imageUrl;
                        }
                        
                        // 获取图片信息
                        wx.getImageInfo({
                          src: imagePath,
                          success: imgRes => {
                            // 绘制增强发光效果 - 圆圈周围
                            const gradient = ctx.createRadialGradient(centerX, centerY, circleRadius, centerX, centerY, circleRadius + 40);
                            gradient.addColorStop(0, 'rgba(160, 144, 117, 0.5)');
                            gradient.addColorStop(1, 'rgba(160, 144, 117, 0)');
                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(centerX, centerY, circleRadius + 40, 0, Math.PI * 2);
                            ctx.fill();
                            
                            // 计算图片绘制尺寸，使用圆形裁剪
                            const imgWidth = imgRes.width;
                            const imgHeight = imgRes.height;
                            
                            // 计算图片缩放比例，确保图片适合圆形区域
                            const scale = Math.min(beastImageWidth / imgWidth, beastImageHeight / imgHeight);
                            const drawWidth = imgWidth * scale;
                            const drawHeight = imgHeight * scale;
                            
                            // 计算绘制位置，使图片居中
                            const drawX = centerX - drawWidth / 2;
                            const drawY = centerY - drawHeight / 2;
                            
                            // 创建图片对象
                            const img = canvas.createImage();
                            img.onload = () => {
                              // 圆形裁剪
                              ctx.save();
                              ctx.beginPath();
                              ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
                              ctx.clip();
                              
                              // 绘制图片
                              ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                              ctx.restore();
                              
                              // 继续绘制文字内容
                              drawTextContent();
                            };
                            img.onerror = () => {
                              drawDefaultImage();
                            };
                            img.src = imagePath;
                          },
                          fail: err => {
                            console.error('获取图片信息失败，使用默认图片', err);
                            drawDefaultImage();
                          }
                        });
                      } catch (err) {
                        console.error('加载神兽图片失败，使用默认图片', err);
                        drawDefaultImage();
                      }
                    };
                    
                    // 绘制文字内容
                    // 辅助函数：文本自动换行
                    const wrapText = (text, maxWidth) => {
                      const words = text.split('');
                      const lines = [];
                      let currentLine = '';
                      
                      for (let i = 0; i < words.length; i++) {
                        const testLine = currentLine + words[i];
                        const metrics = ctx.measureText(testLine);
                        const testWidth = metrics.width;
                        
                        if (testWidth > maxWidth && i > 0) {
                          lines.push(currentLine);
                          currentLine = words[i];
                        } else {
                          currentLine = testLine;
                        }
                      }
                      
                      lines.push(currentLine);
                      return lines;
                    };
                    
                    // 辅助函数：绘制多行文本
                    const drawMultiLineText = (text, x, y, maxWidth, lineHeight) => {
                      const lines = wrapText(text, maxWidth);
                      
                      for (let i = 0; i < lines.length; i++) {
                        ctx.fillText(lines[i], x, y + i * lineHeight);
                      }
                      
                      return y + lines.length * lineHeight;
                    };
                    
                    const drawTextContent = () => {
                      // 显示文字部分三段：守护能力（最上）、契主特质、专属箴言
                      const maxWidth = 500; // 最大文本宽度，留边距
                      
                      // 1. 守护能力 - 字体28px，黑色楷体，加粗
                      ctx.font = 'bold 28px KaiTi, sans-serif';
                      ctx.fillStyle = '#000000';
                      ctx.textAlign = 'center';
                      drawMultiLineText(`守护能力: ${beast.guardianAbility}`, 300, 630, maxWidth, 35);
                      
                      // 2. 契主特质 - 字体17px，加粗，增大与守护能力的间距到90px
                      ctx.font = 'bold 17px sans-serif';
                      ctx.fillStyle = '#000000';
                      ctx.textAlign = 'center';
                      drawMultiLineText(`契主特质: ${beast.ownerTrait}`, 300, 720, maxWidth, 22);
                      
                      // 3. 守护箴言 - 字体17px，加粗
                      ctx.font = 'bold 17px sans-serif';
                      ctx.fillStyle = '#000000';
                      ctx.textAlign = 'center';
                      drawMultiLineText(`守护箴言: ${beast.selectedProverb}`, 300, 760, maxWidth, 22);
                      
                      // 绘制小程序码和名称
                      const qrcodeImg = canvas.createImage();
                      qrcodeImg.onload = () => {
                        // 绘制小程序码 - 放置在下部左侧，大小75*75px，接近卡片最底部
                        const qrcodeSize = 75;
                        ctx.drawImage(qrcodeImg, 150, 815, qrcodeSize, qrcodeSize);
                         
                        // 绘制小程序文字 - 文字和图像分左右排列，文字用灰色，字体大小16px
                        ctx.font = '16px sans-serif';
                        ctx.fillStyle = '#888888';
                        ctx.textAlign = 'left';
                        ctx.fillText('传统文化益智互动群落', 245, 850);
                         
                        ctx.font = '16px sans-serif';
                        ctx.fillStyle = '#888888';
                        ctx.textAlign = 'left';
                        ctx.fillText('扫码抽取你的守护神兽', 245, 880);
                         
                        // 绘制完成后转换为图片，确保导出完整画布
                        setTimeout(() => {
                          wx.canvasToTempFilePath({
                            canvas: canvas,
                            destWidth: 600, // 导出完整绘制宽度
                            destHeight: 900, // 导出完整绘制高度
                            success: res => {
                              // 添加图片压缩功能
                              wx.compressImage({
                                src: res.tempFilePath,
                                quality: 80, // 压缩质量设置为80%
                                success: compressRes => {
                                  that.setData({
                                    posterImage: compressRes.tempFilePath,
                                    isGenerating: false
                                  });
                                },
                                fail: err => {
                                  console.error('压缩海报失败，使用原始图片', err);
                                  // 压缩失败时使用原始图片
                                  that.setData({
                                    posterImage: res.tempFilePath,
                                    isGenerating: false
                                  });
                                }
                              });
                            },
                            fail: err => {
                              console.error('生成海报失败', err);
                              that.setData({ isGenerating: false });
                            }
                          });
                        }, 500);
                      };
                      qrcodeImg.src = qrcodePath;
                    };
                    
                    // 执行图片加载
                    loadBeastImage();
                  };
                  
                  // 调用绘制其他内容函数
                  drawOtherContent(qrcodePath);
                };
                
                backgroundImg.src = backgroundPath;
          } catch (err) {
            console.error('生成海报失败', err);
            that.setData({ isGenerating: false });
          }
        };
          
          // 调用绘制海报函数
          drawPoster();
      });
  },

  // 保存海报到相册
  saveToAlbum() {
    if (!this.data.posterImage) return;
    
    // 检查是否有保存相册的权限
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.writePhotosAlbum']) {
          // 已经授权，可以直接调用保存API
          this.doSaveToAlbum();
        } else {
          // 未授权，需要请求授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              // 授权成功，调用保存API
              this.doSaveToAlbum();
            },
            fail: (err) => {
              console.error('授权失败', err);
              if (err.errMsg.includes('auth deny')) {
                // 用户拒绝授权，引导用户手动打开设置
                wx.showModal({
                  title: '授权提示',
                  content: '需要你的相册权限才能保存海报，请在设置中允许访问相册',
                  confirmText: '去设置',
                  cancelText: '取消',
                  success: (modalRes) => {
                    if (modalRes.confirm) {
                      // 打开设置页面
                      wx.openSetting({
                        success: (settingRes) => {
                          if (settingRes.authSetting['scope.writePhotosAlbum']) {
                            // 用户在设置中允许了权限，再次调用保存API
                            this.doSaveToAlbum();
                          }
                        }
                      });
                    }
                  }
                });
              } else {
                // 其他授权错误
                wx.showToast({
                  title: '授权失败',
                  icon: 'none'
                });
              }
            }
          });
        }
      },
      fail: (err) => {
        console.error('获取设置失败', err);
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 实际执行保存到相册的操作
  doSaveToAlbum() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.posterImage,
      success: () => {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('保存到相册失败', err);
        let errorMsg = '保存失败';
        
        // 根据不同错误类型显示不同提示
        if (err.errMsg.includes('auth deny')) {
          errorMsg = '请先授权相册权限';
        } else if (err.errMsg.includes('invalid file type')) {
          errorMsg = '图片格式错误';
        } else if (err.errMsg.includes('file not found')) {
          errorMsg = '图片不存在';
        }
        
        wx.showToast({
          title: errorMsg,
          icon: 'none'
        });
      }
    });
  },

  // 分享海报 - 现在直接通过按钮的open-type="share"属性触发
  // 此函数保留用于向后兼容，不再被主动调用
  sharePoster() {
    // 直接触发分享功能
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },



  // 缓存相关工具函数
  
  // 计算字符串的简单哈希值，用于生成缓存文件名
  getHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  },
  
  // 从缓存获取图片路径
  getImageFromCache(fileID) {
    try {
      const cacheIndex = wx.getStorageSync('guardianBeastCacheIndex') || {};
      const cacheInfo = cacheIndex[fileID];
      
      if (cacheInfo) {
        const { localPath, expireTime } = cacheInfo;
        const now = Date.now();
        
        // 检查缓存是否过期（7天过期）
        if (now < expireTime) {
          // 检查文件是否存在
          const fs = wx.getFileSystemManager();
          try {
            fs.accessSync(localPath);
            return localPath;
          } catch (e) {
            // 文件不存在，删除缓存索引
            delete cacheIndex[fileID];
            wx.setStorageSync('guardianBeastCacheIndex', cacheIndex);
            return null;
          }
        } else {
          // 缓存过期，删除缓存索引和文件
          delete cacheIndex[fileID];
          wx.setStorageSync('guardianBeastCacheIndex', cacheIndex);
          try {
            const fs = wx.getFileSystemManager();
            fs.unlinkSync(localPath);
          } catch (e) {
            // 文件不存在，忽略
          }
          return null;
        }
      }
      return null;
    } catch (e) {
      console.error('获取缓存图片失败', e);
      return null;
    }
  },
  
  // 将图片保存到缓存
  saveImageToCache(fileID, tempFilePath) {
    try {
      const hash = this.getHash(fileID);
      const localPath = `${wx.env.USER_DATA_PATH}/guardian-beast-${hash}.jpg`;
      
      // 复制文件到本地缓存目录
      const fs = wx.getFileSystemManager();
      fs.copyFileSync(tempFilePath, localPath);
      
      // 更新缓存索引
      const cacheIndex = wx.getStorageSync('guardianBeastCacheIndex') || {};
      const expireTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天过期
      cacheIndex[fileID] = {
        localPath,
        expireTime,
        lastUsed: Date.now()
      };
      wx.setStorageSync('guardianBeastCacheIndex', cacheIndex);
      
      return localPath;
    } catch (e) {
      console.error('保存图片到缓存失败', e);
      return null;
    }
  },
  
  // 下载图片（结合缓存机制）
  downloadImage(fileID) {
    return new Promise((resolve, reject) => {
      // 先检查缓存
      const cachedPath = this.getImageFromCache(fileID);
      if (cachedPath) {
        console.log('使用缓存图片:', fileID);
        resolve(cachedPath);
        return;
      }
      
      // 缓存不存在，下载图片
      console.log('下载图片:', fileID);
      wx.cloud.downloadFile({
        fileID,
        success: (res) => {
          // 保存到缓存
          const localPath = this.saveImageToCache(fileID, res.tempFilePath);
          resolve(localPath || res.tempFilePath);
        },
        fail: (err) => {
          console.error('下载图片失败', err);
          reject(err);
        }
      });
    });
  },
  
  // 清理过期缓存
  clearExpiredCache() {
    try {
      const cacheIndex = wx.getStorageSync('guardianBeastCacheIndex') || {};
      const now = Date.now();
      const fs = wx.getFileSystemManager();
      let deletedCount = 0;
      
      // 遍历缓存索引，删除过期缓存
      for (const fileID in cacheIndex) {
        const { localPath, expireTime } = cacheIndex[fileID];
        if (now > expireTime) {
          // 删除文件
          try {
            fs.unlinkSync(localPath);
            deletedCount++;
          } catch (e) {
            // 文件不存在，忽略
          }
          // 删除缓存索引
          delete cacheIndex[fileID];
        }
      }
      
      // 更新缓存索引
      wx.setStorageSync('guardianBeastCacheIndex', cacheIndex);
      
      if (deletedCount > 0) {
        console.log(`清理了 ${deletedCount} 个过期缓存`);
      }
    } catch (e) {
      console.error('清理过期缓存失败', e);
    }
  },
  
  // 返回首页
  goBack() {
    wx.redirectTo({
      url: '/subgames/guardian-beast/index'
    });
  }
})