// 五色页面逻辑
const wuxingData = require('../../data.js');

Page({
  data: {
    // 数据集合
    wuxingData: wuxingData,
    wuseInfo: wuxingData.wuse,
    
    // 选中的元素
    selectedColor: 'green',
    
    // 当前描述
    currentDescription: '青色属木：东方之色，万物生长之色',
    
    // Canvas相关
    canvasWidth: 325,
    canvasHeight: 325,
    
    // 动画相关
    animationTimer: null,
    pulseAnimation: 0
  },

  onLoad() {
    this.initPage();
  },

  onShow() {
    // 页面显示时重新绘制并重启动画
    this.drawWuseDiagram();
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
      this.drawWuseDiagram();
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
      this.drawWuseDiagram();
    }, 200);
    
    this.setData({ animationTimer: timer });
  },

  /**
   * 绘制五色关联图
   */
  drawWuseDiagram() {
    const ctx = wx.createCanvasContext('wuseCanvas', this);
    const centerX = this.data.canvasWidth;
    const centerY = this.data.canvasHeight;
    const radius = Math.min(centerX, centerY) * 0.7;
    
    ctx.clearRect(0, 0, this.data.canvasWidth * 2, this.data.canvasHeight * 2);
    
    // 五色位置
    const positions = this.calculateWuxingPositions(centerX, centerY, radius);
    const wuseKeys = ['green', 'red', 'yellow', 'white', 'black'];
    
    // 绘制色彩渐变背景
    wuseKeys.forEach((key, index) => {
      const pos = positions[Object.keys(wuxingData.wuxing)[index]];
      const wuse = wuxingData.wuse[key];
      
      // 绘制色彩光晕
      ctx.setFillStyle(this.addAlpha(wuse.color, 0.2));
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 40, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // 绘制连接线
    ctx.setStrokeStyle('rgba(255, 215, 0, 0.1)');
    ctx.setLineWidth(1);
    for (let i = 0; i < 5; i++) {
      const currentPos = positions[Object.keys(wuxingData.wuxing)[i]];
      const nextPos = positions[Object.keys(wuxingData.wuxing)[(i + 1) % 5]];
      
      ctx.beginPath();
      ctx.moveTo(currentPos.x, currentPos.y);
      ctx.lineTo(nextPos.x, nextPos.y);
      ctx.stroke();
    }
    
    // 绘制五色节点
    wuseKeys.forEach((key, index) => {
      const pos = positions[Object.keys(wuxingData.wuxing)[index]];
      const wuse = wuxingData.wuse[key];
      const wuxing = wuxingData.wuxing[wuse.wuxing];
      const isSelected = this.data.selectedColor === key;
      
      this.drawWuseNode(ctx, pos.x, pos.y, wuse, wuxing, isSelected);
    });
    
    ctx.draw();
  },

  /**
   * 计算五色位置
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
   * 为颜色添加透明度
   */
  addAlpha(hexColor, alpha) {
    // 将透明度转换为十六进制
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return hexColor + alphaHex;
  },

  /**
   * 获取对比色
   */
  getContrastColor(hexColor) {
    // 简单的对比色计算
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  },

  /**
   * 绘制五色节点
   */
  drawWuseNode(ctx, x, y, wuse, wuxing, isSelected) {
    const radius = 40;
    const scale = isSelected ? 1.1 + Math.sin(this.data.pulseAnimation) * 0.05 : 1;
    
    // 色彩圆
    ctx.setFillStyle(wuse.color);
    ctx.beginPath();
    ctx.arc(x, y, radius * scale, 0, 2 * Math.PI);
    ctx.fill();
    
    // 边框
    ctx.setStrokeStyle(isSelected ? '#FFD700' : wuxing.color);
    ctx.setLineWidth(isSelected ? 4 : 3);
    ctx.stroke();
    
    // 文字
    ctx.setFillStyle(this.getContrastColor(wuse.color));
    ctx.setFontSize(24 * scale);
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText(wuse.name, x, y);
  },

  /**
   * 选择颜色
   */
  selectColor(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({ selectedColor: color });
    this.updateCurrentDescription();
    this.drawWuseDiagram();
  },

  /**
   * 更新当前描述
   */
  updateCurrentDescription() {
    const { selectedColor } = this.data;
    const color = wuxingData.wuse[selectedColor];
    const description = `${color.name}色属${wuxingData.wuxing[color.wuxing].name}：${color.description}`;
    
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
      title: '五色五行 - 探索中国传统哲学',
      path: '/miniprogram/subgames/WuxingMysteries/pages/wuse/index',
      imageUrl: '' // 可以添加分享图片
    };
  }
});