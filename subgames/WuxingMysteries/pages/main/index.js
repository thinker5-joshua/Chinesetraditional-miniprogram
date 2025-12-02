// 五行奥秘主页面
Page({
  data: {
    // 当前选中的Tab
    currentTab: 'wuxing',
    
    // 当前副标题
    currentSubtitle: '探索中国传统哲学的宇宙观',
    
    // Tab标签列表（只显示已激活的）
    activeTabs: [
      {
        id: 'wuxing',
        title: '五行',
        icon: '⚡',
        color: '#2E7D32'
      },
      {
        id: 'wufang',
        title: '五方',
        icon: '🧭',
        color: '#1976D2'
      },
      {
        id: 'wuse',
        title: '五色',
        icon: '🎨',
        color: '#D32F2F'
      },
      {
        id: 'wuzang',
        title: '五脏',
        icon: '❤️',
        color: '#7B1FA2'
      },
      {
        id: 'wuwei',
        title: '五味',
        icon: '🍃',
        color: '#6F4E37'
      }
    ],
    
    // 五行数据 - 为子页面提供数据
    wuxingData: null,
    
    // 选中状态
    selectedElement: null,
    selectedDirection: null,
    selectedColor: null,
    selectedOrgan: null,
    
    // 元素按钮数据
    wuxingElements: [],
    wufangElements: [],
    wuseElements: [],
    wuzangElements: [],
    wuweiElements: []
  },

  onLoad() {
    this.loadWuxingData();
  },

  onShow() {
    // 页面显示时重新绘制图表，确保从详情页面返回后图表正常显示
    setTimeout(() => {
      this.drawCurrentTabCanvas();
    }, 100);
  },

  onReady() {
    // 确保页面和数据都已准备好再绘制
    setTimeout(() => {
      this.drawCurrentTabCanvas();
    }, 300);
  },

  /**
   * 加载五行数据
   */
  loadWuxingData() {
    try {
      const wuxingData = require('../../data.js');
      
      this.setData({
        wuxingData: wuxingData
      }, () => {
        // 数据加载完成后绘制图表
        this.drawCurrentTabCanvas();
      });
    } catch (err) {
      console.error('数据文件加载失败:', err);
      wx.showToast({
        title: '数据加载失败',
        icon: 'none',
        duration: 2000
      });
    }
  },

  /**
   * 绘制当前Tab的图表
   */
  drawCurrentTabCanvas() {
    // 基本检查
    if (!this || !this.data) {
      return;
    }
    
    if (!this.data.wuxingData) {
      return;
    }
    
    if (!this.data.currentTab) {
      return;
    }

    // 先清除所有Canvas，防止切换标签时图表叠加
    this.clearAllCanvas();

    switch(this.data.currentTab) {
      case 'wuxing':
        this.drawWuxingCanvas();
        break;
      case 'wufang':
        this.drawWufangCanvas();
        break;
      case 'wuse':
        this.drawWuseCanvas();
        break;
      case 'wuzang':
        this.drawWuzangCanvas();
        break;
      case 'wuwei':
        this.drawWuweiCanvas();
        break;
    }
  },

  /**
   * 清除所有Canvas
   */
  clearAllCanvas() {
    const canvasIds = ['wuxingCanvas', 'wufangCanvas', 'wuseCanvas', 'wuzangCanvas', 'wuweiCanvas'];
    
    canvasIds.forEach(canvasId => {
      try {
        const ctx = wx.createCanvasContext(canvasId);
        ctx.clearRect(0, 0, 350, 350); // 清除整个画布区域
        ctx.draw(true); // 使用true参数立即绘制，确保清除操作生效
      } catch (error) {
        console.warn(`清除Canvas ${canvasId} 失败:`, error);
      }
    });
  },

  /**
   * Tab切换
   */
  onTabChange(e) {
    const tabId = e.currentTarget.dataset.tab;
    
    const subtitleMap = {
      'wuxing': '探索五行相生相克的奥秘',
      'wufang': '了解方位与五行的对应关系',
      'wuse': '探索色彩与五行的深层联系',
      'wuzang': '了解脏腑与五行的关系',
      'wuwei': '探索味道与五行的奥秘'
    };

    this.setData({
      currentTab: tabId,
      currentSubtitle: subtitleMap[tabId] || '探索中国传统哲学的宇宙观',
      selectedElement: null,
      selectedDirection: null,
      selectedColor: null,
      selectedOrgan: null
    }, () => {
      // Tab切换后绘制对应图表，增加延迟确保DOM更新完成
      setTimeout(() => {
        this.drawCurrentTabCanvas();
      }, 200);
    });
  },

  // 元素按钮点击事件
  onElementTap(e) {
    const { element, tab } = e.currentTarget.dataset;
    

    
    // 验证参数有效性
    if (!element || !tab) {
      console.error('缺少必要参数:', { element, tab });
      wx.showToast({
        title: '参数错误',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    
    // 构建目标URL
    const targetUrl = `/subgames/WuxingMysteries/pages/detail/detail?element=${encodeURIComponent(element)}&tabType=${encodeURIComponent(tab)}`;
    

    
    // 跳转到详情页面
    wx.navigateTo({
      url: targetUrl,
      success: () => {

      },
      fail: (error) => {
        console.error('导航失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 1500
        });
      }
    });
  },





  /**
   * 绘制五行图表
   */
  drawWuxingCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select('.mystical-canvas').boundingClientRect();
    query.select('.mystical-frame').boundingClientRect();
    query.exec((res) => {
      if (!res || res.length < 2) {
        return;
      }
      
      const canvasRect = res[0];
      const frameRect = res[1];
      
      if (!canvasRect || !frameRect) {
        return;
      }
      
      // 700rpx = 350px (在大部分设备上，750rpx = 375px屏幕宽度)
      const width = 350; // 700rpx转换的像素值
      const height = 350; // 700rpx转换的像素值
      
      const ctx = wx.createCanvasContext('wuxingCanvas');
      this.drawWuxingChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },

  /**
   * 绘制五方图表
   */
  drawWufangCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select('.mystical-canvas').boundingClientRect();
    query.select('.mystical-frame').boundingClientRect();
    query.exec((res) => {
      if (!res || res.length < 2) {
        return;
      }
      
      const frameRect = res[1];
      if (!frameRect) {
        return;
      }
      
      const width = 350; // 700rpx转换的像素值
      const height = 350; // 700rpx转换的像素值
      const ctx = wx.createCanvasContext('wufangCanvas');
      this.drawWufangChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },

  /**
   * 绘制五色图表
   */
  drawWuseCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select('.mystical-canvas').boundingClientRect();
    query.select('.mystical-frame').boundingClientRect();
    query.exec((res) => {
      if (!res || res.length < 2) {
        return;
      }
      
      const frameRect = res[1];
      if (!frameRect) {
        return;
      }
      
      const width = 350; // 700rpx转换的像素值
      const height = 350; // 700rpx转换的像素值
      const ctx = wx.createCanvasContext('wuseCanvas');
      this.drawWuseChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },

  /**
   * 绘制五脏图表
   */
  drawWuzangCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select('.mystical-canvas').boundingClientRect();
    query.select('.mystical-frame').boundingClientRect();
    query.exec((res) => {
      if (!res || res.length < 2) {
        return;
      }
      
      const frameRect = res[1];
      if (!frameRect) {
        return;
      }
      
      const width = 350; // 700rpx转换的像素值
      const height = 350; // 700rpx转换的像素值
      const ctx = wx.createCanvasContext('wuzangCanvas');
      this.drawWuzangChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },

  /**
   * 选择五行元素
   */
  selectElement(e) {
    const element = e.currentTarget.dataset.element;
    this.setData({ selectedElement: element });
  },

  /**
   * 选择方向
   */
  selectDirection(e) {
    const direction = e.currentTarget.dataset.direction;
    this.setData({ selectedDirection: direction });
  },

  /**
   * 选择颜色
   */
  selectColor(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({ selectedColor: color });
  },

  /**
   * 选择脏腑
   */
  selectOrgan(e) {
    const organ = e.currentTarget.dataset.organ;
    this.setData({ selectedOrgan: organ });
  },

  /**
   * 绘制五行图表 - 玄学风格
   */
  drawWuxingChart(ctx, width, height, frameRect) {
    const centerX = width / 2 - 5; // 向左偏移5像素
    const centerY = height / 2 + 20; // 向下偏移20像素
    const radius = Math.min(width, height) * 0.32;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    const elements = ['木', '火', '土', '金', '水'];
    const colors = ['#4CAF50', '#F44336', '#FF9800', '#FFD700', '#2196F3'];
    
    // 绘制相生关系线（实线）和标注
    ctx.setStrokeStyle('#4CAF50');
    ctx.setLineWidth(3);
    for (let i = 0; i < 5; i++) {
      const startAngle = (i * 72 - 90) * Math.PI / 180;
      const endAngle = ((i + 1) * 72 - 90) * Math.PI / 180;
      
      // 相生线：从圆的外方连接（向外移动三分之一直径）
      const startX = centerX + (radius + 20 + 15) * Math.cos(startAngle);
      const startY = centerY + (radius + 20 + 15) * Math.sin(startAngle);
      const endX = centerX + (radius + 20 + 15) * Math.cos(endAngle);
      const endY = centerY + (radius + 20 + 15) * Math.sin(endAngle);
      
      // 计算"生"标注位置（线段中间二分之一处）
      const labelX = startX + (endX - startX) * 1/2;
      const labelY = startY + (endY - startY) * 1/2;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // 绘制箭头（在线段的三分之二处）
      const arrowSize = 15;
      // 计算线段的三分之二处位置
      const arrowX = startX + (endX - startX) * 2/3;
      const arrowY = startY + (endY - startY) * 2/3;
      const arrowAngle = Math.atan2(endY - startY, endX - startX);
      
      // 重新设置线宽确保箭头清晰
      ctx.setLineWidth(3);
      ctx.beginPath();
      // 绘制完整的箭头形状
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6));
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6));
      ctx.stroke();
      
      // 绘制"生"字标注 - 用圆框背景（线段的三分之一处）
      ctx.setFillStyle(colors[i]); // 使用对应元素的颜色
      ctx.beginPath();
      ctx.arc(labelX, labelY, 16, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.setFillStyle('#fff');
      ctx.setFontSize(12);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText('生', labelX, labelY);
    }
    
    // 绘制相克关系线（虚线）和标注
    ctx.setStrokeStyle('#F44336');
    ctx.setLineWidth(2);
    for (let i = 0; i < 5; i++) {
      const startAngle = (i * 72 - 90) * Math.PI / 180;
      const endAngle = ((i + 2) * 72 - 90) * Math.PI / 180;
      
      // 从圆的内侧连接（向外移动三分之一直径）
      const startX = centerX + (radius * 0.8 + 15) * Math.cos(startAngle);
      const startY = centerY + (radius * 0.8 + 15) * Math.sin(startAngle);
      const endX = centerX + (radius * 0.8 + 15) * Math.cos(endAngle);
      const endY = centerY + (radius * 0.8 + 15) * Math.sin(endAngle);
      
      // 计算"克"标注位置（线段中间二分之一处）
      const keLabelX = startX + (endX - startX) * 1/2;
      const keLabelY = startY + (endY - startY) * 1/2;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.setLineDash([5, 5]);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // 绘制箭头（在线段的三分之二处）
      const arrowSize = 15;
      // 计算线段的三分之二处位置
      const arrowX = startX + (endX - startX) * 2/3;
      const arrowY = startY + (endY - startY) * 2/3;
      const arrowAngle = Math.atan2(endY - startY, endX - startX);
      
      // 重新设置线宽确保箭头清晰
      ctx.setLineWidth(3);
      ctx.beginPath();
      // 绘制完整的箭头形状
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6));
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6));
      ctx.stroke();
      
      // 绘制"克"字标注 - 用圆框背景（线段的八分之三处）
      ctx.setFillStyle('#555555');
      ctx.beginPath();
      ctx.arc(keLabelX, keLabelY, 16, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.setFillStyle('#fff');
      ctx.setFontSize(12);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText('克', keLabelX, keLabelY);
    }
    
    // 绘制五行圆形（向外移动三分之一直径）
    elements.forEach((element, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle);
      
      // 圆形背景 - 统一尺寸为35px
      ctx.setFillStyle(colors[index]);
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, 2 * Math.PI);
      ctx.fill();
      
      // 白色边框
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 元素名称
      ctx.setFillStyle('#fff');
      ctx.setFontSize(24);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(element, x, y);
    });
    

    
    // 计算Canvas在frame中的偏移量
    const canvasOffsetX = (frameRect.width - width) / 2;
    const canvasOffsetY = (frameRect.height - height) / 2;
    
    // 生成元素按钮位置数据（转换为相对于frame的坐标）
    const wuxingElementsData = elements.map((element, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle);
      
      return {
        name: element,
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      wuxingElements: wuxingElementsData
    });
  },

  /**
   * 绘制五方图表 - 五行对应版
   */
  drawWufangChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const positions = [
      { name: '东', element: '木', x: centerX - 120, y: centerY, color: '#4CAF50' },
      { name: '南', element: '火', x: centerX, y: centerY - 120, color: '#F44336' },
      { name: '中', element: '土', x: centerX, y: centerY, color: '#FF9800' },
      { name: '西', element: '金', x: centerX + 120, y: centerY, color: '#FFD700' },
      { name: '北', element: '水', x: centerX, y: centerY + 120, color: '#2196F3' }
    ];
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制连接线
    positions.forEach((pos, index) => {
      if (index !== 2) { // 中心位置不绘制连接线
        ctx.setStrokeStyle('#e0e0e0');
        ctx.setLineWidth(3);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }
    });
    
    // 绘制五方位
    positions.forEach((pos) => {
      // 圆形背景
      ctx.setFillStyle(pos.color);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 40, 0, 2 * Math.PI);
      ctx.fill();
      
      // 白色边框
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 40, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 方位名称 - 五行属性格式
      ctx.setFillStyle('#fff');
      ctx.setFontSize(28);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(pos.name, pos.x, pos.y - 15);
      
      // 横杠
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(2);
      ctx.beginPath();
      ctx.moveTo(pos.x - 18, pos.y);
      ctx.lineTo(pos.x + 18, pos.y);
      ctx.stroke();
      
      // 五行属性
      ctx.setFontSize(20);
      ctx.fillText(pos.element, pos.x, pos.y + 15);
    });
    
    // 计算Canvas在frame中的偏移量
    const canvasOffsetX = (frameRect.width - width) / 2;
    const canvasOffsetY = (frameRect.height - height) / 2;
    
    // 生成五方按钮位置数据（转换为相对于frame的坐标）
    const wufangElementsData = positions.map(pos => ({
      name: pos.name,
      element: pos.element,
      style: `left: ${canvasOffsetX + pos.x - 40}px; top: ${canvasOffsetY + pos.y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
    }));
    
    this.setData({
      wufangElements: wufangElementsData
    });
  },

  /**
   * 绘制五色图表 - 简洁版
   */
  drawWuseChart(ctx, width, height, frameRect) {
    const colors = ['#4CAF50', '#F44336', '#FFEB3B', '#FFFFFF', '#212121'];
    const names = ['青', '赤', '黄', '白', '黑'];
    const elements = ['木', '火', '土', '金', '水'];
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    

    
    // 绘制相生关系线（实线）和标注
    ctx.setStrokeStyle('#4CAF50');
    ctx.setLineWidth(3);
    for (let i = 0; i < 5; i++) {
      const startAngle = (i * 72 - 90) * Math.PI / 180;
      const endAngle = ((i + 1) * 72 - 90) * Math.PI / 180;
      
      // 相生线：从圆的外方连接（向外移动三分之一直径）
      const startX = centerX + (radius + 20 + 15) * Math.cos(startAngle);
      const startY = centerY + (radius + 20 + 15) * Math.sin(startAngle);
      const endX = centerX + (radius + 20 + 15) * Math.cos(endAngle);
      const endY = centerY + (radius + 20 + 15) * Math.sin(endAngle);
      
      // 计算"生"标注位置（线段中间二分之一处）
      const labelX = startX + (endX - startX) * 1/2;
      const labelY = startY + (endY - startY) * 1/2;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // 绘制箭头（在线段的三分之二处）
      const arrowSize = 15;
      const arrowX = startX + (endX - startX) * 2/3;
      const arrowY = startY + (endY - startY) * 2/3;
      const arrowAngle = Math.atan2(endY - startY, endX - startX);
      
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6));
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6));
      ctx.stroke();
      
      // 绘制"生"字标注 - 白色到黑色间用深色背景
      const isWhiteToBlack = (colors[i] === '#FFFFFF' && colors[(i + 1) % 5] === '#212121') ||
                         (colors[i] === '#212121' && colors[(i + 1) % 5] === '#FFFFFF');
      ctx.setFillStyle(isWhiteToBlack ? '#666666' : colors[i]);
      ctx.beginPath();
      ctx.arc(labelX, labelY, 16, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.setFillStyle('#fff');
      ctx.setFontSize(12);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText('生', labelX, labelY);
    }
    
    // 绘制相克关系线（虚线）和标注
    ctx.setStrokeStyle('#F44336');
    ctx.setLineWidth(2);
    for (let i = 0; i < 5; i++) {
      const startAngle = (i * 72 - 90) * Math.PI / 180;
      const endAngle = ((i + 2) * 72 - 90) * Math.PI / 180;
      
      // 从圆的内侧连接（向外移动三分之一直径）
      const startX = centerX + (radius * 0.8 + 15) * Math.cos(startAngle);
      const startY = centerY + (radius * 0.8 + 15) * Math.sin(startAngle);
      const endX = centerX + (radius * 0.8 + 15) * Math.cos(endAngle);
      const endY = centerY + (radius * 0.8 + 15) * Math.sin(endAngle);
      
      // 计算"克"标注位置（线段中间二分之一处）
      const keLabelX = startX + (endX - startX) * 1/2;
      const keLabelY = startY + (endY - startY) * 1/2;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.setLineDash([5, 5]);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // 绘制箭头（在线段的三分之二处）
      const arrowSize = 15;
      const arrowX = startX + (endX - startX) * 2/3;
      const arrowY = startY + (endY - startY) * 2/3;
      const arrowAngle = Math.atan2(endY - startY, endX - startX);
      
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6));
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6));
      ctx.stroke();
      
      // 绘制"克"字标注
      ctx.setFillStyle('#555555');
      ctx.beginPath();
      ctx.arc(keLabelX, keLabelY, 16, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.setFillStyle('#fff');
      ctx.setFontSize(12);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText('克', keLabelX, keLabelY);
    }
    
    // 绘制五色圆形（向外移动三分之一直径）- 放在线段之后确保覆盖
    names.forEach((name, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      // 圆形背景
      ctx.setFillStyle(colors[index]);
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, 2 * Math.PI);
      ctx.fill();
      
      // 边框（深色边框）
      ctx.setStrokeStyle(colors[index] === '#FFEB3B' ? '#F57F17' : '#333');
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 颜色名称 - 五行属性格式
      ctx.setFillStyle(colors[index] === '#FFEB3B' || colors[index] === '#FFFFFF' ? '#333' : '#fff');
      ctx.setFontSize(26);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(name, x, y - 15);
      
      // 横杠
      ctx.setStrokeStyle(colors[index] === '#FFEB3B' || colors[index] === '#FFFFFF' ? '#333' : '#fff');
      ctx.setLineWidth(2);
      ctx.beginPath();
      ctx.moveTo(x - 15, y);
      ctx.lineTo(x + 15, y);
      ctx.stroke();
      
      // 五行属性
      ctx.setFontSize(20);
      ctx.fillText(elements[index], x, y + 15);
    });
    
    // 计算Canvas在frame中的偏移量
    const canvasOffsetX = (frameRect.width - width) / 2;
    const canvasOffsetY = (frameRect.height - height) / 2;
    
    // 生成五色按钮位置数据（转换为相对于frame的坐标）
    const wuseElementsData = names.map((name, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      const textColor = colors[index] === '#FFEB3B' || colors[index] === '#FFFFFF' ? '#333' : '#fff';
      return {
        name: name,
        element: elements[index],
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`,
        textColor: textColor
      };
    });
    
    this.setData({
      wuseElements: wuseElementsData
    });
  },

  /**
   * 绘制五脏图表 - 五行对应版
   */
  drawWuzangChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const organs = [
      { name: '肝', element: '木', color: '#4CAF50' },
      { name: '心', element: '火', color: '#F44336' },
      { name: '脾', element: '土', color: '#FF9800' },
      { name: '肺', element: '金', color: '#FFD700' },
      { name: '肾', element: '水', color: '#2196F3' }
    ];
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    

    
    // 绘制相生关系线（实线）和标注
    ctx.setStrokeStyle('#4CAF50');
    ctx.setLineWidth(3);
    for (let i = 0; i < 5; i++) {
      const startAngle = (i * 72 - 90) * Math.PI / 180;
      const endAngle = ((i + 1) * 72 - 90) * Math.PI / 180;
      
      // 相生线：从圆的外方连接（向外移动三分之一直径）
      const startX = centerX + (radius + 20 + 15) * Math.cos(startAngle);
      const startY = centerY + (radius + 20 + 15) * Math.sin(startAngle);
      const endX = centerX + (radius + 20 + 15) * Math.cos(endAngle);
      const endY = centerY + (radius + 20 + 15) * Math.sin(endAngle);
      
      // 计算"生"标注位置（线段中间二分之一处）
      const labelX = startX + (endX - startX) * 1/2;
      const labelY = startY + (endY - startY) * 1/2;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // 绘制箭头（在线段的三分之二处）
      const arrowSize = 15;
      const arrowX = startX + (endX - startX) * 2/3;
      const arrowY = startY + (endY - startY) * 2/3;
      const arrowAngle = Math.atan2(endY - startY, endX - startX);
      
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6));
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6));
      ctx.stroke();
      
      // 绘制"生"字标注
      ctx.setFillStyle(organs[i].color);
      ctx.beginPath();
      ctx.arc(labelX, labelY, 16, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.setFillStyle('#fff');
      ctx.setFontSize(12);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText('生', labelX, labelY);
    }
    
    // 绘制相克关系线（虚线）和标注
    ctx.setStrokeStyle('#F44336');
    ctx.setLineWidth(2);
    for (let i = 0; i < 5; i++) {
      const startAngle = (i * 72 - 90) * Math.PI / 180;
      const endAngle = ((i + 2) * 72 - 90) * Math.PI / 180;
      
      // 从圆的内侧连接（向外移动三分之一直径）
      const startX = centerX + (radius * 0.8 + 15) * Math.cos(startAngle);
      const startY = centerY + (radius * 0.8 + 15) * Math.sin(startAngle);
      const endX = centerX + (radius * 0.8 + 15) * Math.cos(endAngle);
      const endY = centerY + (radius * 0.8 + 15) * Math.sin(endAngle);
      
      // 计算"克"标注位置（线段中间二分之一处）
      const keLabelX = startX + (endX - startX) * 1/2;
      const keLabelY = startY + (endY - startY) * 1/2;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.setLineDash([5, 5]);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // 绘制箭头（在线段的三分之二处）
      const arrowSize = 15;
      const arrowX = startX + (endX - startX) * 2/3;
      const arrowY = startY + (endY - startY) * 2/3;
      const arrowAngle = Math.atan2(endY - startY, endX - startX);
      
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6));
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6));
      ctx.stroke();
      
      // 绘制"克"字标注
      ctx.setFillStyle('#555555');
      ctx.beginPath();
      ctx.arc(keLabelX, keLabelY, 16, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.setFillStyle('#fff');
      ctx.setFontSize(12);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText('克', keLabelX, keLabelY);
    }
    
    // 绘制五脏圆形（向外移动三分之一直径）- 放在线段之后确保覆盖
    organs.forEach((organ, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      // 圆形背景
      ctx.setFillStyle(organ.color);
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, 2 * Math.PI);
      ctx.fill();
      
      // 白色边框
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 脏腑名称 - 五行属性格式
      ctx.setFillStyle('#fff');
      ctx.setFontSize(26);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(organ.name, x, y - 15);
      
      // 横杠
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(2);
      ctx.beginPath();
      ctx.moveTo(x - 15, y);
      ctx.lineTo(x + 15, y);
      ctx.stroke();
      
      // 五行属性
      ctx.setFontSize(20);
      ctx.fillText(organ.element, x, y + 15);
    });
    
    // 计算Canvas在frame中的偏移量
    const canvasOffsetX = (frameRect.width - width) / 2;
    const canvasOffsetY = (frameRect.height - height) / 2;
    
    // 生成五脏按钮位置数据（转换为相对于frame的坐标）
    const wuzangElementsData = organs.map((organ, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: organ.name,
        element: organ.element,
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      wuzangElements: wuzangElementsData
    });
  },

  /**
   * Canvas触摸事件
   */


  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack();
  },

  /**
   * 分享功能
   */
  onShareAppMessage() {
    return {
      title: '五行奥秘 - 探索中国传统哲学的宇宙观',
      path: '/subgames/WuxingMysteries/pages/main/index',
      imageUrl: '' // 可以添加分享图片
    };
  },

  onShareTimeline() {
    return {
      title: '五行奥秘 - 探索中国传统哲学',
      query: '',
      imageUrl: '' // 可以添加分享图片
    };
  },

  /**
   * 绘制五味图表
   */
  drawWuweiCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select('.mystical-canvas').boundingClientRect();
    query.select('.mystical-frame').boundingClientRect();
    query.exec((res) => {
      if (!res || res.length < 2) {
        return;
      }
      
      const frameRect = res[1];
      if (!frameRect) {
        return;
      }
      
      const width = 350; // 700rpx转换的像素值
      const height = 350; // 700rpx转换的像素值
      const ctx = wx.createCanvasContext('wuweiCanvas');
      this.drawWuweiChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },

  /**
   * 绘制五味图表 - 五行对应版
   */
  drawWuweiChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const flavors = ['酸', '苦', '甘', '辛', '咸'];
    const elements = ['木', '火', '土', '金', '水'];
    const colors = ['#4CAF50', '#F44336', '#FF9800', '#FFD700', '#2196F3'];
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制相生关系线（实线）和标注
    ctx.setStrokeStyle('#4CAF50');
    ctx.setLineWidth(3);
    for (let i = 0; i < 5; i++) {
      const startAngle = (i * 72 - 90) * Math.PI / 180;
      const endAngle = ((i + 1) * 72 - 90) * Math.PI / 180;
      
      // 相生线：从圆的外方连接（向外移动三分之一直径）
      const startX = centerX + (radius + 20 + 15) * Math.cos(startAngle);
      const startY = centerY + (radius + 20 + 15) * Math.sin(startAngle);
      const endX = centerX + (radius + 20 + 15) * Math.cos(endAngle);
      const endY = centerY + (radius + 20 + 15) * Math.sin(endAngle);
      
      // 计算"生"标注位置（线段中间二分之一处）
      const labelX = startX + (endX - startX) * 1/2;
      const labelY = startY + (endY - startY) * 1/2;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // 绘制箭头（在线段的三分之二处）
      const arrowSize = 15;
      const arrowX = startX + (endX - startX) * 2/3;
      const arrowY = startY + (endY - startY) * 2/3;
      const arrowAngle = Math.atan2(endY - startY, endX - startX);
      
      // 重新设置线宽确保箭头清晰
      ctx.setLineWidth(3);
      ctx.beginPath();
      // 绘制完整的箭头形状
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6));
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6));
      ctx.stroke();
      
      // 绘制"生"字标注 - 用圆框背景（线段的三分之一处）
      ctx.setFillStyle(colors[i]); // 使用对应元素的颜色
      ctx.beginPath();
      ctx.arc(labelX, labelY, 16, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.setFillStyle('#fff');
      ctx.setFontSize(12);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText('生', labelX, labelY);
    }
    
    // 绘制相克关系线（虚线）和标注
    ctx.setStrokeStyle('#F44336');
    ctx.setLineWidth(2);
    for (let i = 0; i < 5; i++) {
      const startAngle = (i * 72 - 90) * Math.PI / 180;
      const endAngle = ((i + 2) * 72 - 90) * Math.PI / 180;
      
      // 从圆的内侧连接（向外移动三分之一直径）
      const startX = centerX + (radius * 0.8 + 15) * Math.cos(startAngle);
      const startY = centerY + (radius * 0.8 + 15) * Math.sin(startAngle);
      const endX = centerX + (radius * 0.8 + 15) * Math.cos(endAngle);
      const endY = centerY + (radius * 0.8 + 15) * Math.sin(endAngle);
      
      // 计算"克"标注位置（线段中间二分之一处）
      const keLabelX = startX + (endX - startX) * 1/2;
      const keLabelY = startY + (endY - startY) * 1/2;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.setLineDash([5, 5]);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // 绘制箭头（在线段的三分之二处）
      const arrowSize = 15;
      const arrowX = startX + (endX - startX) * 2/3;
      const arrowY = startY + (endY - startY) * 2/3;
      const arrowAngle = Math.atan2(endY - startY, endX - startX);
      
      // 重新设置线宽确保箭头清晰
      ctx.setLineWidth(3);
      ctx.beginPath();
      // 绘制完整的箭头形状
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6));
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6), 
                 arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6));
      ctx.stroke();
      
      // 绘制"克"字标注 - 用圆框背景（线段的八分之三处）
      ctx.setFillStyle('#555555');
      ctx.beginPath();
      ctx.arc(keLabelX, keLabelY, 16, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.setFillStyle('#fff');
      ctx.setFontSize(12);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText('克', keLabelX, keLabelY);
    }
    
    // 绘制五味圆形（向外移动三分之一直径）- 放在线段之后确保覆盖
    flavors.forEach((flavor, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      // 圆形背景
      ctx.setFillStyle(colors[index]);
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, 2 * Math.PI);
      ctx.fill();
      
      // 白色边框
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 味名 - 五行属性格式
      ctx.setFillStyle('#fff');
      ctx.setFontSize(26);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(flavor, x, y - 15);
      
      // 横杠
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(2);
      ctx.beginPath();
      ctx.moveTo(x - 15, y);
      ctx.lineTo(x + 15, y);
      ctx.stroke();
      
      // 五行属性
      ctx.setFontSize(20);
      ctx.fillText(elements[index], x, y + 15);
    });
    
    // 计算Canvas在frame中的偏移量
    const canvasOffsetX = (frameRect.width - width) / 2;
    const canvasOffsetY = (frameRect.height - height) / 2;
    
    // 生成五味按钮位置数据（转换为相对于frame的坐标）
    const wuweiElementsData = flavors.map((flavor, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: flavor,
        element: elements[index],
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      wuweiElements: wuweiElementsData
    });
  }
});