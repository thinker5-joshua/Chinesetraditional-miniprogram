// 五方页面逻辑
const wuxingData = require('../../data.js');

Page({
  data: {
    // 数据集合
    wuxingData: wuxingData,
    wufangInfo: wuxingData.wufang,
    
    // 选中的元素
    selectedDirection: 'east',
    
    // 当前描述
    currentDescription: '东方属木：万物生发之地，日出之所',
    
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
    this.drawWufangDiagram();
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
      this.drawWufangDiagram();
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
      this.drawWufangDiagram();
    }, 200);
    
    this.setData({ animationTimer: timer });
  },

  /**
   * 绘制五方关联图
   */
  drawWufangDiagram() {
    const ctx = wx.createCanvasContext('wufangCanvas', this);
    const centerX = this.data.canvasWidth;
    const centerY = this.data.canvasHeight;
    const radius = Math.min(centerX, centerY) * 0.7;
    
    ctx.clearRect(0, 0, this.data.canvasWidth * 2, this.data.canvasHeight * 2);
    
    // 五方位置
    const positions = this.calculateWufangPositions(centerX, centerY, radius);
    const wufangKeys = ['east', 'south', 'center', 'west', 'north'];
    
    // 绘制连接线（表示方位关系）
    ctx.setStrokeStyle('rgba(255, 215, 0, 0.2)');
    ctx.setLineWidth(1);
    wufangKeys.forEach(key => {
      const pos = positions[key];
      
      // 连接到中心
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    });
    
    // 绘制中心节点
    this.drawCenterNode(ctx, centerX, centerY);
    
    // 绘制五方节点
    wufangKeys.forEach(key => {
      const pos = positions[key];
      const wufang = wuxingData.wufang[key];
      const wuxing = wuxingData.wuxing[wufang.wuxing];
      const isSelected = this.data.selectedDirection === key;
      
      this.drawWufangNode(ctx, pos.x, pos.y, wufang, wuxing, isSelected);
    });
    
    ctx.draw();
  },

  /**
   * 计算五方位置
   */
  calculateWufangPositions(centerX, centerY, radius) {
    const positions = {};
    
    positions.east = { x: centerX + radius, y: centerY };
    positions.south = { x: centerX, y: centerY + radius };
    positions.center = { x: centerX, y: centerY };
    positions.west = { x: centerX - radius, y: centerY };
    positions.north = { x: centerX, y: centerY - radius };
    
    return positions;
  },

  /**
   * 绘制中心节点
   */
  drawCenterNode(ctx, x, y) {
    const radius = 30;
    
    // 太极图案
    ctx.setFillStyle('#ffffff');
    ctx.beginPath();
    ctx.arc(x, y - radius/2, radius/2, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.setFillStyle('#000000');
    ctx.beginPath();
    ctx.arc(x, y + radius/2, radius/2, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.setFillStyle('#ffffff');
    ctx.beginPath();
    ctx.arc(x, y + radius/2, radius/6, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.setFillStyle('#000000');
    ctx.beginPath();
    ctx.arc(x, y - radius/2, radius/6, 0, 2 * Math.PI);
    ctx.fill();
    
    // 外圈
    ctx.setStrokeStyle('#FFD700');
    ctx.setLineWidth(2);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  },

  /**
   * 绘制五方节点
   */
  drawWufangNode(ctx, x, y, wufang, wuxing, isSelected) {
    const width = 80;
    const height = 60;
    const scale = isSelected ? 1.1 + Math.sin(this.data.pulseAnimation) * 0.05 : 1;
    
    // 背景矩形
    ctx.setFillStyle(wuxing.color);
    ctx.fillRect(x - width/2 * scale, y - height/2 * scale, width * scale, height * scale);
    
    // 边框
    ctx.setStrokeStyle(isSelected ? '#FFD700' : wuxing.color);
    ctx.setLineWidth(isSelected ? 3 : 2);
    ctx.strokeRect(x - width/2 * scale, y - height/2 * scale, width * scale, height * scale);
    
    // 文字
    ctx.setFillStyle('#ffffff');
    ctx.setFontSize(24 * scale);
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText(wufang.name, x, y - 10 * scale);
    
    ctx.setFontSize(18 * scale);
    ctx.fillText(wuxing.name, x, y + 12 * scale);
  },

  /**
   * 选择方位
   */
  selectDirection(e) {
    const direction = e.currentTarget.dataset.direction;
    this.setData({ selectedDirection: direction });
    this.updateCurrentDescription();
    this.drawWufangDiagram();
  },

  /**
   * 更新当前描述
   */
  updateCurrentDescription() {
    const { selectedDirection } = this.data;
    const direction = wuxingData.wufang[selectedDirection];
    const description = `${direction.name}方属${wuxingData.wuxing[direction.wuxing].name}：${direction.description}`;
    
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
    // 获取页面栈
    const pages = getCurrentPages();
    if (pages.length > 1) {
      // 正常返回上一页
      wx.navigateBack();
    } else {
      // 从分享进入，跳转到模块首页
      wx.redirectTo({
        url: '/subgames/WuxingMysteries/index'
      });
    }
  },

  /**
   * 分享功能
   */
  onShareAppMessage() {
    return {
      title: '五方五行 - 探索中国传统哲学',
      path: '/miniprogram/subgames/WuxingMysteries/pages/wufang/index',
      imageUrl: '/images/wyhd-share-default.png'
    };
  }
});