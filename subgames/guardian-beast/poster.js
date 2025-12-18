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
    const { beast } = this.data;
    return {
      title: `我的守护神兽海报 - ${beast.name}`,
      path: `/subgames/guardian-beast/poster?beastId=${beast.id}&proverb=${encodeURIComponent(beast.selectedProverb || '')}`
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
        
        // 下载背景图
        wx.cloud.downloadFile({
          fileID: backgroundImageId,
          success: (backgroundRes) => {
            // 下载小程序码
            wx.cloud.downloadFile({
              fileID: qrcodeImageId,
              success: (qrcodeRes) => {
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
                  drawOtherContent();
                };
                backgroundImg.src = backgroundRes.tempFilePath;
                
                // 绘制其他内容
                const drawOtherContent = () => {
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
                  const loadBeastImage = () => {
                    const imageUrl = beast.image;
                    
                    // 检查是否是云文件ID
                    if (imageUrl && imageUrl.startsWith('cloud://')) {
                      // 使用云开发API下载文件
                      wx.cloud.downloadFile({
                        fileID: imageUrl,
                        success: res => {
                          // 下载成功后获取图片信息
                          wx.getImageInfo({
                            src: res.tempFilePath,
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
                              img.src = res.tempFilePath;
                            },
                            fail: err => {
                              console.error('获取云图片信息失败，使用默认图片', err);
                              drawDefaultImage();
                            }
                          });
                        },
                        fail: err => {
                          console.error('下载云图片失败，使用默认图片', err);
                          drawDefaultImage();
                        }
                      });
                    } else {
                      // 非云文件ID，直接使用getImageInfo
                      wx.getImageInfo({
                        src: imageUrl,
                        success: res => {
                          // 绘制增强发光效果 - 圆圈周围
                          const gradient = ctx.createRadialGradient(centerX, centerY, circleRadius, centerX, centerY, circleRadius + 40);
                          gradient.addColorStop(0, 'rgba(160, 144, 117, 0.5)');
                          gradient.addColorStop(1, 'rgba(160, 144, 117, 0)');
                          ctx.fillStyle = gradient;
                          ctx.beginPath();
                          ctx.arc(centerX, centerY, circleRadius + 40, 0, Math.PI * 2);
                          ctx.fill();
                          

                          
                          // 计算图片绘制尺寸，使用圆形裁剪
                          const imgWidth = res.width;
                          const imgHeight = res.height;
                          
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
                          img.src = res.path;
                        },
                        fail: err => {
                          console.error('直接加载神兽图片失败，使用默认图片', err);
                          drawDefaultImage();
                        }
                      });
                    }
                  };
                  
                  // 绘制文字内容
                  const drawTextContent = () => {
                    // 显示文字部分三段：守护能力（最上）、契主特质、专属箴言
                    
                    // 1. 守护能力 - 字体28px，黑色楷体，加粗
                    ctx.font = 'bold 28px KaiTi, serif';
                    ctx.fillStyle = '#000000';
                    ctx.textAlign = 'center';
                    ctx.fillText(`守护能力: ${beast.guardianAbility}`, 300, 630); // 整体下移约150px
                    
                    // 2. 契主特质 - 字体17px，加粗，增大与守护能力的间距到90px
                    ctx.font = 'bold 17px serif';
                    ctx.fillStyle = '#000000';
                    ctx.textAlign = 'center';
                    ctx.fillText(`契主特质: ${beast.ownerTrait}`, 300, 720);
                    
                    // 3. 守护箴言 - 字体17px，加粗
                    ctx.font = 'bold 17px serif';
                    ctx.fillStyle = '#000000';
                    ctx.textAlign = 'center';
                    ctx.fillText(`守护箴言: ${beast.selectedProverb}`, 300, 760);
                    
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
                            that.setData({
                              posterImage: res.tempFilePath,
                              isGenerating: false
                            });
                          },
                          fail: err => {
                            console.error('生成海报失败', err);
                            that.setData({ isGenerating: false });
                          }
                        });
                      }, 500);
                    };
                    qrcodeImg.src = qrcodeRes.tempFilePath;
                  };
                  
                  // 执行图片加载
                  loadBeastImage();
                };
              },
              fail: err => {
                console.error('下载小程序码失败', err);
                that.setData({ isGenerating: false });
              }
            });
          },
          fail: err => {
            console.error('下载背景图失败', err);
            that.setData({ isGenerating: false });
          }
        });
      });
  },

  // 保存海报到相册
  saveToAlbum() {
    if (!this.data.posterImage) return;
    
    wx.saveImageToPhotosAlbum({
      filePath: this.data.posterImage,
      success: () => {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
      },
      fail: err => {
        console.error('保存失败', err);
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    });
  },

  // 分享海报
  sharePoster() {
    if (!this.data.posterImage) return;
    
    // 调用微信分享API
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  // 返回首页
  goBack() {
    wx.navigateTo({
      url: '/subgames/guardian-beast/index'
    });
  }
})