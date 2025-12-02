// 五脏页面逻辑
const wuxingData = require('../../data.js');

Page({
  data: {
    // 数据集合
    wuxingData: wuxingData,
    wuzangInfo: wuxingData.wuzang,
    
    // 选中的元素
    selectedOrgan: 'liver',
    
    // 当前描述
    currentDescription: '肝属木：将军之官，谋虑出焉',
    
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
    this.drawWuzangDiagram();
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
      this.drawWuzangDiagram();
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
      this.drawWuzangDiagram();
    }, 200);
    
    this.setData({ animationTimer: timer });
  },

  /**
   * 绘制五脏关联图
   */
  drawWuzangDiagram() {
    const ctx = wx.createCanvasContext('wuzangCanvas', this);
    const centerX = this.data.canvasWidth;
    const centerY = this.data.canvasHeight;
    const radius = Math.min(centerX, centerY) * 0.7;
    
    ctx.clearRect(0, 0, this.data.canvasWidth * 2, this.data.canvasHeight * 2);
    
    // 五脏位置
    const positions = this.calculateWuxingPositions(centerX, centerY, radius);
    const wuzangKeys = ['liver', 'heart', 'spleen', 'lung', 'kidney'];
    
    // 绘制人体轮廓示意
    this.drawBodyOutline(ctx, centerX, centerY, radius);
    
    // 绘制五脏节点
    wuzangKeys.forEach((key, index) => {
      const pos = positions[Object.keys(wuxingData.wuxing)[index]];
      const wuzang = wuxingData.wuzang[key];
      const wuxing = wuxingData.wuxing[wuzang.wuxing];
      const isSelected = this.data.selectedOrgan === key;
      
      this.drawWuzangNode(ctx, pos.x, pos.y, wuzang, wuxing, isSelected);
    });
    
    ctx.draw();
  },

  /**
   * 计算五脏位置
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
   * 绘制五脏节点
   */
  drawWuzangNode(ctx, x, y, wuzang, wuxing, isSelected) {
    const width = 70;
    const height = 50;
    const scale = isSelected ? 1.1 + Math.sin(this.data.pulseAnimation) * 0.05 : 1;
    
    // 背景矩形（替换不支持的ellipse）
    ctx.setFillStyle(wuxing.color);
    ctx.fillRect(x - width/2 * scale, y - height/2 * scale, width * scale, height * scale);
    
    // 边框
    ctx.setStrokeStyle(isSelected ? '#FFD700' : wuxing.color);
    ctx.setLineWidth(isSelected ? 3 : 2);
    ctx.strokeRect(x - width/2 * scale, y - height/2 * scale, width * scale, height * scale);
    
    // 文字
    ctx.setFillStyle('#ffffff');
    ctx.setFontSize(20 * scale);
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText(wuzang.name, x, y);
  },

  /**
   * 绘制人体轮廓
   */
  drawBodyOutline(ctx, centerX, centerY, radius) {
    ctx.setStrokeStyle('rgba(255, 215, 0, 0.2)');
    ctx.setLineWidth(1);
    
    // 简化的人体轮廓
    const bodyHeight = radius * 1.5;
    const bodyWidth = radius * 0.8;
    
    // 头部
    ctx.beginPath();
    ctx.arc(centerX, centerY - bodyHeight/2 + 30, 25, 0, 2 * Math.PI);
    ctx.stroke();
    
    // 身体
    ctx.strokeRect(centerX - bodyWidth/2, centerY - bodyHeight/2 + 55, bodyWidth, bodyHeight - 55);
    
    // 手臂
    ctx.beginPath();
    ctx.moveTo(centerX - bodyWidth/2, centerY - bodyHeight/2 + 80);
    ctx.lineTo(centerX - bodyWidth/2 - 20, centerY);
    ctx.moveTo(centerX + bodyWidth/2, centerY - bodyHeight/2 + 80);
    ctx.lineTo(centerX + bodyWidth/2 + 20, centerY);
    ctx.stroke();
    
    // 腿
    ctx.beginPath();
    ctx.moveTo(centerX - 20, centerY + bodyHeight/2 - 20);
    ctx.lineTo(centerX - 20, centerY + bodyHeight/2 + 20);
    ctx.moveTo(centerX + 20, centerY + bodyHeight/2 - 20);
    ctx.lineTo(centerX + 20, centerY + bodyHeight/2 + 20);
    ctx.stroke();
  },

  /**
   * 选择脏腑
   */
  selectOrgan(e) {
    const organ = e.currentTarget.dataset.organ;
    this.setData({ selectedOrgan: organ });
    this.updateCurrentDescription();
    this.drawWuzangDiagram();
  },

  /**
   * 更新当前描述
   */
  updateCurrentDescription() {
    const { selectedOrgan } = this.data;
    const organ = wuxingData.wuzang[selectedOrgan];
    const description = `${organ.name}属${wuxingData.wuxing[organ.wuxing].name}：${organ.description}`;
    
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
      title: '五脏五行 - 探索中国传统哲学',
      path: '/miniprogram/subgames/WuxingMysteries/pages/wuzang/index',
      imageUrl: '' // 可以添加分享图片
    };
  }
});