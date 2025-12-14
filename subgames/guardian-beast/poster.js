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
   * 用户点击右上角分享
   */
  onShareAppMessage() {

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
        
        // 设置Canvas尺寸
        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);
        
        // 1. 绘制背景
        ctx.fillStyle = '#f5f1e9';
        ctx.fillRect(0, 0, 600, 900);
        
        // 2. 绘制装饰边框
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 4;
        ctx.strokeRect(30, 30, 540, 840);
        
        // 3. 绘制标题
        ctx.font = '40px sans-serif';
        ctx.fillStyle = '#8B4513';
        ctx.textAlign = 'center';
        ctx.fillText('你的专属守护神兽', 300, 100);
        
        // 4. 绘制神兽形象
        const circleRadius = 150; // 圆形背景半径
        const centerX = 300;
        const centerY = 300;
        
        // 先绘制一个圆形背景
        ctx.beginPath();
        ctx.arc(300, 300, 160, 0, 2 * Math.PI);
        ctx.fillStyle = '#e8dfd2';
        ctx.fill();
        
        // 绘制默认图片（如果云图片加载失败）
        const drawDefaultImage = () => {
          // 绘制一个默认的圆形背景和文字
          ctx.beginPath();
          ctx.arc(300, 300, 130, 0, 2 * Math.PI);
          ctx.fillStyle = '#8B4513';
          ctx.fill();
          
          ctx.font = '60px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(beast.name.charAt(0), 300, 320);
          
          // 继续绘制其他内容
          drawOtherContent();
        };
        
        // 绘制其他内容
        const drawOtherContent = () => {
          // 5. 绘制神兽名称和拼音
          ctx.font = '36px sans-serif';
          ctx.fillStyle = '#8B4513';
          ctx.textAlign = 'center';
          ctx.fillText(beast.name, 300, 500);
          
          ctx.font = '24px sans-serif';
          ctx.fillStyle = '#666666';
          ctx.fillText(beast.pinyin, 300, 530);
          
          // 6. 绘制排位
          ctx.font = '22px sans-serif';
          ctx.fillStyle = '#8B4513';
          ctx.fillText(beast.rank, 300, 560);
          
          // 7. 绘制专属箴言
          ctx.font = '28px sans-serif';
          ctx.fillStyle = '#333333';
          ctx.textAlign = 'center';
          ctx.fillText('专属箴言', 300, 600);
          
          ctx.font = '24px sans-serif';
          ctx.fillStyle = '#666666';
          ctx.fillText(beast.selectedProverb, 300, 640);
          
          // 8. 绘制契主特质
          ctx.font = '28px sans-serif';
          ctx.fillStyle = '#333333';
          ctx.fillText('契主特质', 300, 680);
          
          ctx.font = '20px sans-serif';
          ctx.fillStyle = '#666666';
          ctx.fillText(beast.ownerTrait, 300, 720);
          
          // 9. 绘制小程序二维码占位符
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(450, 750, 100, 100);
          ctx.strokeStyle = '#8B4513';
          ctx.lineWidth = 2;
          ctx.strokeRect(450, 750, 100, 100);
          
          // 10. 绘制小程序名称
          ctx.font = '18px sans-serif';
          ctx.fillStyle = '#8B4513';
          ctx.fillText('传统文化益智互动群落', 250, 820);
          
          ctx.font = '16px sans-serif';
          ctx.fillStyle = '#666666';
          ctx.fillText('扫码抽取你的守护神兽', 250, 850);
          
          // 11. 绘制底部装饰线
          ctx.strokeStyle = '#8B4513';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(50, 880);
          ctx.lineTo(550, 880);
          ctx.stroke();
          
          // 绘制完成后转换为图片
          setTimeout(() => {
            wx.canvasToTempFilePath({
              canvas: canvas,
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
                    // 计算图片绘制尺寸，确保在圆形背景内按比例显示
                    const imgWidth = imgRes.width;
                    const imgHeight = imgRes.height;
                    
                    // 计算图片缩放比例，确保图片完全在圆形内
                    const scale = Math.min(circleRadius * 2 / imgWidth, circleRadius * 2 / imgHeight);
                    const drawWidth = imgWidth * scale;
                    const drawHeight = imgHeight * scale;
                    
                    // 计算绘制位置，使图片居中
                    const drawX = centerX - drawWidth / 2;
                    const drawY = centerY - drawHeight / 2;
                    
                    // 创建图片对象
                    const img = canvas.createImage();
                    img.onload = () => {
                      // 绘制图片，确保在圆形背景内
                      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                      drawOtherContent();
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
                // 计算图片绘制尺寸，确保在圆形背景内按比例显示
                const imgWidth = res.width;
                const imgHeight = res.height;
                
                // 计算图片缩放比例，确保图片完全在圆形内
                const scale = Math.min(circleRadius * 2 / imgWidth, circleRadius * 2 / imgHeight);
                const drawWidth = imgWidth * scale;
                const drawHeight = imgHeight * scale;
                
                // 计算绘制位置，使图片居中
                const drawX = centerX - drawWidth / 2;
                const drawY = centerY - drawHeight / 2;
                
                // 创建图片对象
                const img = canvas.createImage();
                img.onload = () => {
                  // 绘制图片，确保在圆形背景内
                  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                  drawOtherContent();
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
        
        // 执行图片加载
        loadBeastImage();
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
  }
})