// 五行主页逻辑
const wuxingData = require('../../data.js');

// 云存储文件配置
const cloudFiles = {
  'official-account-qr.png': 'cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/main/official-account-qr.png',
  'wyhd-share-default.png': 'cloud://cloud1-4g76v9gbd3112c01.636c-cloud1-4g76v9gbd3112c01-1391701420/main/wyhd-share-default.png'
};

// 本地图片备选路径
const localFiles = {
  'official-account-qr.png': '/images/official-account-qr.png',
  'wyhd-share-default.png': '/images/wyhd-share-default.png'
};

// 获取云存储图片（带缓存机制）
function getCloudImage(fileName) {
  return new Promise((resolve, reject) => {
    try {
      // 检查文件名是否在配置中
      if (!cloudFiles[fileName]) {
        // 如果配置中没有，尝试返回本地图片
        if (localFiles[fileName]) {
          resolve(localFiles[fileName]);
        } else {
          reject(new Error(`File ${fileName} not configured in cloudFiles`));
        }
        return;
      }
      
      const fileID = cloudFiles[fileName];
      
      // 直接使用云存储文件ID（小程序图片组件支持直接使用cloud://路径）
      resolve(fileID);
    } catch (error) {
      console.error('获取云存储图片失败:', error);
      // 发生错误，使用本地图片作为备选
      if (localFiles[fileName]) {
        resolve(localFiles[fileName]);
      } else {
        reject(error);
      }
    }
  });
}

Page({
  data: {
    wyhdShareDefaultUrl: '',
    // 数据集合
    wuxingData: wuxingData,
    wuxingInfo: wuxingData.wuxing,
    
    // 选中的元素
    selectedWuxing: 'wood',
    
    // 当前描述
    currentDescription: '木：生长、开发、条达舒畅',
    
    // Canvas相关
    canvasWidth: 325,
    canvasHeight: 325,
    
    // 动画相关
    animationTimer: null,
    pulseAnimation: 0
  },

  onLoad() {
    this.initPage();
    
    // 获取分享默认图片URL
    getCloudImage('wyhd-share-default.png')
      .then(url => {
        this.setData({
          wyhdShareDefaultUrl: url
        });
      })
      .catch(error => {
        console.error('Get share default image error:', error);
      });
  },

  onShow() {
    // 页面显示时重新绘制并重启动画
    this.drawWuxingDiagram();
    // 如果动画定时器不存在，重新启动动画
    if (!this.data.animationTimer) {
      this.startPulseAnimation();
    }
  },

  onHide() {
    // 页面隐藏时暂停动画，节省性能
    if (this.data.animationTimer) {
      clearInterval(this.data.animationTimer);
      this.setData({ animationTimer: null });
    }
  },

  onUnload() {
    // 清理定时器，防止内存泄漏
    if (this.data.animationTimer) {
      clearInterval(this.data.animationTimer);
      this.setData({ animationTimer: null });
    }
  },

  /**
   * 初始化页面
   */
  initPage() {
    // 设置Canvas尺寸
    const canvasWidth = 325;
    const canvasHeight = 325;
    
    this.setData({
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight
    });
    
    // 延迟加载，提升用户体验
    setTimeout(() => {
      this.updateCurrentDescription();
      this.drawWuxingDiagram();
      this.startPulseAnimation();
    }, 500);
  },

  /**
   * 开始脉冲动画
   */
  startPulseAnimation() {
    // 减少动画频率，从50ms改为200ms，降低性能消耗
    const timer = setInterval(() => {
      const newPulse = (this.data.pulseAnimation + 0.1) % (Math.PI * 2);
      this.setData({ pulseAnimation: newPulse });
      this.drawWuxingDiagram();
    }, 200);
    
    this.setData({ animationTimer: timer });
  },

  /**
   * 绘制五行生克图
   */
  drawWuxingDiagram() {
    const ctx = wx.createCanvasContext('wuxingCanvas', this);
    const centerX = this.data.canvasWidth;
    const centerY = this.data.canvasHeight;
    const radius = Math.min(centerX, centerY) * 0.7;
    
    // 清空画布
    ctx.clearRect(0, 0, this.data.canvasWidth * 2, this.data.canvasHeight * 2);
    
    // 绘制背景圆环
    ctx.setStrokeStyle('rgba(255, 215, 0, 0.1)');
    ctx.setLineWidth(1);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 20, 0, 2 * Math.PI);
    ctx.stroke();
    
    // 五行位置
    const positions = this.calculateWuxingPositions(centerX, centerY, radius);
    const wuxingKeys = ['wood', 'fire', 'earth', 'metal', 'water'];
    
    // 绘制相生关系线
    ctx.setStrokeStyle('rgba(76, 175, 80, 0.6)');
    ctx.setLineWidth(2);
    wuxingKeys.forEach(key => {
      const targetKey = wuxingData.shengRelation[key];
      const fromPos = positions[key];
      const toPos = positions[targetKey];
      
      this.drawArrow(ctx, fromPos.x, fromPos.y, toPos.x, toPos.y, '#4CAF50');
    });
    
    // 绘制相克关系线
    ctx.setStrokeStyle('rgba(244, 67, 54, 0.6)');
    wuxingKeys.forEach(key => {
      const targetKey = wuxingData.keRelation[key];
      const fromPos = positions[key];
      const toPos = positions[targetKey];
      
      // 计算相克线的起点（稍微向外偏移）
      const offset = 15;
      const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
      const startX = fromPos.x + Math.cos(angle) * offset;
      const startY = fromPos.y + Math.sin(angle) * offset;
      
      this.drawArrow(ctx, startX, startY, toPos.x - Math.cos(angle) * offset, 
                   toPos.y - Math.sin(angle) * offset, '#F44336', true);
    });
    
    // 绘制五行节点
    wuxingKeys.forEach(key => {
      const pos = positions[key];
      const wuxing = wuxingData.wuxing[key];
      const isSelected = this.data.selectedWuxing === key;
      const scale = isSelected ? 1.1 + Math.sin(this.data.pulseAnimation) * 0.05 : 1;
      
      this.drawWuxingNode(ctx, pos.x, pos.y, wuxing, scale, isSelected);
    });
    
    ctx.draw();
  },

  /**
   * 计算五行位置
   */
  calculateWuxingPositions(centerX, centerY, radius) {
    const positions = {};
    const angleStep = (2 * Math.PI) / 5;
    const startAngle = -Math.PI / 2; // 从顶部开始
    
    const keys = ['wood', 'fire', 'earth', 'metal', 'water'];
    keys.forEach((key, index) => {
      const angle = startAngle + angleStep * index;
      positions[key] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      };
    });
    
    return positions;
  },

  /**
   * 绘制箭头
   */
  drawArrow(ctx, fromX, fromY, toX, toY, color, isDashed = false) {
    const headlen = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.setStrokeStyle(color);
    ctx.setLineWidth(isDashed ? 1 : 2);
    
    if (isDashed) {
      ctx.setLineDash([5, 5]);
    } else {
      ctx.setLineDash([]);
    }
    
    // 绘制线
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // 绘制箭头
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), 
               toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), 
               toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
    
    ctx.setLineDash([]);
  },

  /**
   * 绘制五行节点
   */
  drawWuxingNode(ctx, x, y, wuxing, scale = 1, isSelected = false) {
    const radius = 45 * scale;
    
    // 外圈光晕
    if (isSelected) {
      ctx.setFillStyle(this.addAlpha(wuxing.color, 0.2));
      ctx.beginPath();
      ctx.arc(x, y, radius + 20, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // 主圆
    ctx.setFillStyle(wuxing.color);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // 边框
    ctx.setStrokeStyle(isSelected ? '#FFD700' : wuxing.color);
    ctx.setLineWidth(isSelected ? 3 : 2);
    ctx.stroke();
    
    // 文字
    ctx.setFillStyle('#ffffff');
    ctx.setFontSize(28 * scale);
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText(wuxing.name, x, y - 10);
    
    ctx.setFontSize(18 * scale);
    ctx.fillText(wuxing.pinyin, x, y + 15);
  },

  /**
   * 为颜色添加透明度
   */
  addAlpha(hexColor, alpha) {
    // 将透明度转换为十六进制
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return hexColor + alphaHex;
  },

  /**
   * 选择五行
   */
  selectWuxing(e) {
    const wuxing = e.currentTarget.dataset.wuxing;
    this.setData({ selectedWuxing: wuxing });
    this.updateCurrentDescription();
    this.drawWuxingDiagram();
  },

  /**
   * 更新当前描述
   */
  updateCurrentDescription() {
    const { selectedWuxing } = this.data;
    const wuxing = wuxingData.wuxing[selectedWuxing];
    const description = `${wuxing.name}（${wuxing.pinyin}）：${wuxing.description}`;
    
    this.setData({ currentDescription: description });
  },

  /**
   * Canvas触摸事件
   */
  onCanvasTouchStart() {
    // 可以在这里添加触摸交互逻辑
  },

  onCanvasTouchMove() {
    // 可以在这里添加触摸移动逻辑
  },

  onCanvasTouchEnd() {
    // 可以在这里添加触摸结束逻辑
  },

  /**
   * 返回主页
   */
  goBack() {
    wx.navigateBack();
  },

  /**
   * 分享功能
   */
  onShareAppMessage() {
    return {
      title: '五行奥秘 - 探索中国传统哲学',
      path: '/miniprogram/subgames/WuxingMysteries/pages/wuxing/index',
      imageUrl: this.data.wyhdShareDefaultUrl || '/images/wyhd-share-default.png'
    };
  }
});