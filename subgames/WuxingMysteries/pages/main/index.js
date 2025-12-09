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
        id: 'wufu',
        title: '五腑',
        icon: '🫀',
        color: '#FF5722'
      },
      {
        id: 'wuwei',
        title: '五味',
        icon: '🍃',
        color: '#6F4E37'
      },
      {
        id: 'wuyin',
        title: '五音',
        icon: '🎵',
        color: '#4CAF50'
      },
      {
        id: 'wuguan',
        title: '五官',
        icon: '👁️',
        color: '#FF9800'
      },
      {
        id: 'wuqi',
        title: '五气',
        icon: '💨',
        color: '#2196F3'
      },
      {
        id: 'wuji',
        title: '五季',
        icon: '🌸',
        color: '#E91E63'
      },
      {
        id: 'wuzhi',
        title: '五志',
        icon: '😀',
        color: '#9C27B0'
      },
      {
        id: 'wude',
        title: '五德',
        icon: '🌟',
        color: '#FFEB3B'
      },
      {
        id: 'wuxingStars',
        title: '五星',
        icon: '✨',
        color: '#03A9F4'
      },
      {
        id: 'tianGan',
        title: '天干',
        icon: '📜',
        color: '#607D8B'
      },
      {
        id: 'diZhi',
        title: '地支',
        icon: '🐉',
        color: '#8D6E63'
      },
      {
        id: 'bagua',
        title: '八卦',
        icon: '☯️',
        color: '#455A64'
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
    wufuElements: [],
    wuweiElements: [],
    wuyinElements: [],
    wuguanElements: [],
    wuqiElements: [],
    wujiElements: [],
    wuzhiElements: [],
    wudeElements: [],
    wuxingStarsElements: [],
    tianGanElements: [],
    diZhiElements: [],
    baguaElements: [],
    
    // 触摸事件相关
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    
    // Canvas绘制状态标记，避免重复绘制
    isCanvasDrawn: {
      wuxing: false,
      wufang: false,
      wuse: false,
      wuzang: false,
      wufu: false,
      wuwei: false,
      wuyin: false,
      wuguan: false,
      wuqi: false,
      wuji: false,
      wuzhi: false,
      wude: false,
      wuxingStars: false,
      tianGan: false,
      diZhi: false,
      bagua: false
    }
  },

  onLoad() {
    this.loadWuxingData();
  },

  onShow() {
    // 页面显示时重新绘制图表，确保从详情页面返回后图表正常显示
    if (!this.data.isCanvasDrawn[this.data.currentTab]) {
      setTimeout(() => {
        this.drawCurrentTabCanvas();
      }, 100);
    }
  },

  onReady() {
    // 确保页面和数据都已准备好再绘制
    if (!this.data.isCanvasDrawn[this.data.currentTab]) {
      setTimeout(() => {
        this.drawCurrentTabCanvas();
      }, 300);
    }
  },

  /**
   * 加载五行数据
   */
  loadWuxingData() {
    try {
      const wuxingData = require('../../data.js');
      
      // 重置canvas绘制状态，确保数据更新后能重新绘制
      const resetCanvasState = {
        wuxing: false,
        wufang: false,
        wuse: false,
        wuzang: false,
        wufu: false,
        wuwei: false,
        wuyin: false,
        wuguan: false,
        wuqi: false,
        wuji: false,
        wuzhi: false,
        wude: false,
        wuxingStars: false,
        tianGan: false,
        diZhi: false,
        bagua: false
      };
      
      this.setData({
        wuxingData: wuxingData,
        isCanvasDrawn: resetCanvasState
      }, () => {
        // 数据加载完成后绘制图表
        this.drawCurrentTabCanvas();
      });
    } catch (err) {
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

    const currentTab = this.data.currentTab;
    
    switch(currentTab) {
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
      case 'wufu':
        this.drawWufuCanvas();
        break;
      case 'wuwei':
        this.drawWuweiCanvas();
        break;
      case 'wuyin':
        this.drawWuyinCanvas();
        break;
      case 'wuguan':
        this.drawWuguanCanvas();
        break;
      case 'wuqi':
        this.drawWuqiCanvas();
        break;
      case 'wuji':
        this.drawWujiCanvas();
        break;
      case 'wuzhi':
        this.drawWuzhiCanvas();
        break;
      case 'wude':
        this.drawWudeCanvas();
        break;
      case 'wuxingStars':
        this.drawWuxingStarsCanvas();
        break;
      case 'tianGan':
        this.drawTianGanCanvas();
        break;
      case 'diZhi':
        this.drawDiZhiCanvas();
        break;
      case 'bagua':
        this.drawBaguaCanvas();
        break;
    }
    
    // 绘制完成后更新状态，标记为已绘制
    this.setData({
      [`isCanvasDrawn.${currentTab}`]: true
    });
  },

  /**
   * 清除所有Canvas
   */
  clearAllCanvas() {
    const canvasIds = ['wuxingCanvas', 'wufangCanvas', 'wuseCanvas', 'wuzangCanvas', 'wufuCanvas', 'wuweiCanvas', 'wuyinCanvas', 'wuguanCanvas', 'wuqiCanvas', 'wujiCanvas', 'wuzhiCanvas', 'wudeCanvas', 'wuxingStarsCanvas', 'tianGanCanvas', 'diZhiCanvas', 'baguaCanvas'];
    
    canvasIds.forEach(canvasId => {
      try {
        const ctx = wx.createCanvasContext(canvasId);
        ctx.clearRect(0, 0, 350, 350); // 清除整个画布区域
        ctx.draw(true); // 使用true参数立即绘制，确保清除操作生效
      } catch (error) {

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
      'wufu': '了解五腑与五行的关系',
      'wuwei': '探索味道与五行的奥秘',
      'wuyin': '探索五音与五行的对应关系',
      'wuguan': '了解五官与五行的关系',
      'wuqi': '探索五气与五行的对应关系',
      'wuji': '了解五季与五行的关系',
      'wuzhi': '探索五志与五行的对应关系',
      'wude': '了解五德与五行的关系',
      'wuxingStars': '探索五星与五行的对应关系',
      'tianGan': '了解天干与五行的对应关系',
      'diZhi': '了解地支与五行的关系',
      'bagua': '探索八卦与五行的对应关系'
    };

    // 重置所有canvas绘制状态
    const resetCanvasState = {
      wuxing: false,
      wufang: false,
      wuse: false,
      wuzang: false,
      wufu: false,
      wuwei: false,
      wuyin: false,
      wuguan: false,
      wuqi: false,
      wuji: false,
      wuzhi: false,
      wude: false,
      wuxingStars: false,
      tianGan: false,
      diZhi: false,
      bagua: false
    };

    this.setData({
      currentTab: tabId,
      currentSubtitle: subtitleMap[tabId] || '探索中国传统哲学的宇宙观',
      selectedElement: null,
      selectedDirection: null,
      selectedColor: null,
      selectedOrgan: null,
      isCanvasDrawn: resetCanvasState
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
   * 触摸开始事件
   */
  onTouchStart(e) {
    this.setData({
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    });
  },

  /**
   * 触摸移动事件
   */
  onTouchMove(e) {
    this.setData({
      moveX: e.touches[0].clientX,
      moveY: e.touches[0].clientY
    });
  },

  /**
   * 触摸结束事件
   */
  onTouchEnd() {
    const { startX, moveX, startY, moveY, activeTabs, currentTab } = this.data;
    const deltaX = moveX - startX;
    const deltaY = moveY - startY;
    
    // 增加滑动检测的阈值，只有明显的滑动动作才会触发Tab切换
    // 水平移动距离需要大于100px，且水平移动距离大于垂直移动距离的2倍
    // 这样可以确保只有真正的滑动才会触发切换，避免点击元素按钮时的轻微移动被误识别
    if (Math.abs(deltaX) > 100 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
      // 获取当前Tab索引
      const currentIndex = activeTabs.findIndex(tab => tab.id === currentTab);
      
      // 计算新的Tab索引
      let newIndex;
      if (deltaX > 0) {
        // 向右滑动，切换到上一个Tab
        newIndex = (currentIndex - 1 + activeTabs.length) % activeTabs.length;
      } else {
        // 向左滑动，切换到下一个Tab
        newIndex = (currentIndex + 1) % activeTabs.length;
      }
      
      // 获取新的Tab ID
      const newTabId = activeTabs[newIndex].id;
      
      // 构造模拟事件对象，调用现有的onTabChange函数
      const mockEvent = {
        currentTarget: {
          dataset: {
            tab: newTabId
          }
        }
      };
      
      this.onTabChange(mockEvent);
    }
  },

  /**
   * 分享功能
   */
  onShareAppMessage() {
    return {
      title: '五行奥秘 - 探索中国传统哲学的宇宙观',
      path: '/subgames/WuxingMysteries/pages/main/index'
    };
  },

  onShareTimeline() {
    return {
      title: '五行奥秘 - 探索中国传统哲学',
      query: ''
    };
  },

  /**
   * 绘制五腑图表
   */
  drawWufuCanvas() {
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
      const ctx = wx.createCanvasContext('wufuCanvas');
      this.drawWufuChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },

  /**
   * 绘制五腑图表 - 五行对应版
   */
  drawWufuChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const organs = [
      { name: '胆', element: '木', color: '#4CAF50' },
      { name: '小肠', element: '火', color: '#F44336' },
      { name: '胃', element: '土', color: '#FF9800' },
      { name: '大肠', element: '金', color: '#FFD700' },
      { name: '膀胱', element: '水', color: '#2196F3' }
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
    
    // 绘制五腑圆形（向外移动三分之一直径）- 放在线段之后确保覆盖
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
      
      // 腑名称 - 五行属性格式
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
    
    // 生成五腑按钮位置数据（转换为相对于frame的坐标）
    const wufuElementsData = organs.map((organ, index) => {
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
      wufuElements: wufuElementsData
    });
  },

  /**
   * 绘制天干图表
   */
  drawTianGanCanvas() {
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
      const ctx = wx.createCanvasContext('tianGanCanvas');
      this.drawTianGanChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },

  /**
   * 绘制天干图表 - 五行对应版
   */
  drawTianGanChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const tianGans = [
      { name: '甲', element: '木', color: '#4CAF50' },
      { name: '乙', element: '木', color: '#81C784' },
      { name: '丙', element: '火', color: '#F44336' },
      { name: '丁', element: '火', color: '#EF5350' },
      { name: '戊', element: '土', color: '#FF9800' },
      { name: '己', element: '土', color: '#FFB74D' },
      { name: '庚', element: '金', color: '#FFD700' },
      { name: '辛', element: '金', color: '#FFEB3B' },
      { name: '壬', element: '水', color: '#2196F3' },
      { name: '癸', element: '水', color: '#64B5F6' }
    ];
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制外圈天干圆形
    tianGans.forEach((tianGan, index) => {
      const angle = (index * 36 - 90) * Math.PI / 180; // 36度间隔
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      // 圆形背景
      ctx.setFillStyle(tianGan.color);
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, 2 * Math.PI);
      ctx.fill();
      
      // 边框
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 天干名称
      ctx.setFillStyle('#fff');
      ctx.setFontSize(22);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(tianGan.name, x, y - 15);
      
      // 横杠
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(2);
      ctx.beginPath();
      ctx.moveTo(x - 18, y);
      ctx.lineTo(x + 18, y);
      ctx.stroke();
      
      // 五行属性
      ctx.setFontSize(14);
      ctx.fillText(tianGan.element, x, y + 15);
    });
    
    // 绘制中心"天干"文字
    ctx.setFillStyle('#333');
    ctx.setFontSize(32);
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText('天干', centerX, centerY);
    
    // 计算Canvas在frame中的偏移量
    const canvasOffsetX = (frameRect.width - width) / 2;
    const canvasOffsetY = (frameRect.height - height) / 2;
    
    // 生成天干按钮位置数据（转换为相对于frame的坐标）
    const tianGanElementsData = tianGans.map((tianGan, index) => {
      const angle = (index * 36 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: tianGan.name,
        element: tianGan.element,
        style: `left: ${canvasOffsetX + x - 35}px; top: ${canvasOffsetY + y - 35}px; width: 70px; height: 70px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      tianGanElements: tianGanElementsData
    });
  },

  /**
   * 绘制地支图表
   */
  drawDiZhiCanvas() {
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
      const ctx = wx.createCanvasContext('diZhiCanvas');
      this.drawDiZhiChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },

  /**
   * 绘制地支图表 - 五行对应版
   */
  drawDiZhiChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const diZhis = [
      { name: '子', element: '水', color: '#2196F3' },
      { name: '丑', element: '土', color: '#FFB74D' },
      { name: '寅', element: '木', color: '#4CAF50' },
      { name: '卯', element: '木', color: '#81C784' },
      { name: '辰', element: '土', color: '#FF9800' },
      { name: '巳', element: '火', color: '#EF5350' },
      { name: '午', element: '火', color: '#F44336' },
      { name: '未', element: '土', color: '#FFB74D' },
      { name: '申', element: '金', color: '#FFD700' },
      { name: '酉', element: '金', color: '#FFEB3B' },
      { name: '戌', element: '土', color: '#FF9800' },
      { name: '亥', element: '水', color: '#64B5F6' }
    ];
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制外圈地支圆形
    diZhis.forEach((diZhi, index) => {
      const angle = (index * 30 - 90) * Math.PI / 180; // 30度间隔
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      // 圆形背景
      ctx.setFillStyle(diZhi.color);
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, 2 * Math.PI);
      ctx.fill();
      
      // 边框
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 地支名称
      ctx.setFillStyle('#fff');
      ctx.setFontSize(20);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(diZhi.name, x, y - 15);
      
      // 横杠
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(2);
      ctx.beginPath();
      ctx.moveTo(x - 16, y);
      ctx.lineTo(x + 16, y);
      ctx.stroke();
      
      // 五行属性
      ctx.setFontSize(14);
      ctx.fillText(diZhi.element, x, y + 15);
    });
    
    // 绘制中心"地支"文字
    ctx.setFillStyle('#333');
    ctx.setFontSize(32);
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText('地支', centerX, centerY);
    
    // 计算Canvas在frame中的偏移量
    const canvasOffsetX = (frameRect.width - width) / 2;
    const canvasOffsetY = (frameRect.height - height) / 2;
    
    // 生成地支按钮位置数据（转换为相对于frame的坐标）
    const diZhiElementsData = diZhis.map((diZhi, index) => {
      const angle = (index * 30 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: diZhi.name,
        element: diZhi.element,
        style: `left: ${canvasOffsetX + x - 35}px; top: ${canvasOffsetY + y - 35}px; width: 70px; height: 70px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      diZhiElements: diZhiElementsData
    });
  },

  /**
   * 绘制八卦图表
   */
  drawBaguaCanvas() {
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
      const ctx = wx.createCanvasContext('baguaCanvas');
      this.drawBaguaChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },

  /**
   * 绘制八卦图表 - 五行对应版
   */
  drawBaguaChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const baguas = [
      { name: '乾', trigram: '☰', element: '金', color: '#FFD700', direction: '西北' },
      { name: '坤', trigram: '☷', element: '土', color: '#FFB74D', direction: '西南' },
      { name: '震', trigram: '☳', element: '木', color: '#4CAF50', direction: '东' },
      { name: '巽', trigram: '☴', element: '木', color: '#81C784', direction: '东南' },
      { name: '坎', trigram: '☵', element: '水', color: '#2196F3', direction: '北' },
      { name: '离', trigram: '☲', element: '火', color: '#F44336', direction: '南' },
      { name: '艮', trigram: '☶', element: '土', color: '#FF9800', direction: '东北' },
      { name: '兑', trigram: '☱', element: '金', color: '#FFEB3B', direction: '西' }
    ];
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制外圈八卦圆形
    baguas.forEach((bagua, index) => {
      const angle = (index * 45 - 90) * Math.PI / 180; // 45度间隔
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      // 圆形背景
      ctx.setFillStyle(bagua.color);
      ctx.beginPath();
      ctx.arc(x, y, 32, 0, 2 * Math.PI);
      ctx.fill();
      
      // 边框
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(3);
      ctx.beginPath();
      ctx.arc(x, y, 32, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 八卦名称
      ctx.setFillStyle('#fff');
      ctx.setFontSize(22);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(bagua.name, x, y - 15);
      
      // 横杠
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(2);
      ctx.beginPath();
      ctx.moveTo(x - 18, y);
      ctx.lineTo(x + 18, y);
      ctx.stroke();
      
      // 五行属性
      ctx.setFontSize(14);
      ctx.fillText(bagua.element, x, y + 15);
    });
    
    // 绘制中心"八卦"文字
    ctx.setFillStyle('#333');
    ctx.setFontSize(32);
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText('八卦', centerX, centerY);
    
    // 计算Canvas在frame中的偏移量
    const canvasOffsetX = (frameRect.width - width) / 2;
    const canvasOffsetY = (frameRect.height - height) / 2;
    
    // 生成八卦按钮位置数据（转换为相对于frame的坐标）
    const baguaElementsData = baguas.map((bagua, index) => {
      const angle = (index * 45 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: bagua.name,
        trigram: bagua.trigram,
        element: bagua.element,
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      baguaElements: baguaElementsData
    });
  },

  /**
   * 绘制太极图
   */
  drawTaiChi(ctx, x, y, radius) {
    // 绘制太极图左半部分（白色）
    ctx.beginPath();
    ctx.arc(x, y, radius, 0.5 * Math.PI, 1.5 * Math.PI, false);
    ctx.arc(x + radius / 2, y, radius / 2, 1.5 * Math.PI, 0.5 * Math.PI, false);
    ctx.arc(x - radius / 2, y, radius / 2, 0.5 * Math.PI, 1.5 * Math.PI, true);
    ctx.closePath();
    ctx.setFillStyle('#ffffff');
    ctx.fill();
    
    // 绘制太极图右半部分（黑色）
    ctx.beginPath();
    ctx.arc(x, y, radius, 0.5 * Math.PI, 1.5 * Math.PI, true);
    ctx.arc(x - radius / 2, y, radius / 2, 1.5 * Math.PI, 0.5 * Math.PI, true);
    ctx.arc(x + radius / 2, y, radius / 2, 0.5 * Math.PI, 1.5 * Math.PI, false);
    ctx.closePath();
    ctx.setFillStyle('#333333');
    ctx.fill();
    
    // 绘制太极图中的两个小圆
    ctx.beginPath();
    ctx.arc(x - radius / 2, y, radius / 5, 0, 2 * Math.PI);
    ctx.setFillStyle('#333333');
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x + radius / 2, y, radius / 5, 0, 2 * Math.PI);
    ctx.setFillStyle('#ffffff');
    ctx.fill();
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
  },
  
  /**
   * 绘制五音图表
   */
  drawWuyinCanvas() {
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
      const ctx = wx.createCanvasContext('wuyinCanvas');
      this.drawWuyinChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },
  
  /**
   * 绘制五音图表 - 五行对应版
   */
  drawWuyinChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const sounds = ['角', '徵', '宫', '商', '羽'];
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
    
    // 绘制五音圆形（向外移动三分之一直径）- 放在线段之后确保覆盖
    sounds.forEach((sound, index) => {
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
      
      // 音名 - 五行属性格式
      ctx.setFillStyle('#fff');
      ctx.setFontSize(26);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(sound, x, y - 15);
      
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
    
    // 生成五音按钮位置数据（转换为相对于frame的坐标）
    const wuyinElementsData = sounds.map((sound, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: sound,
        element: elements[index],
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      wuyinElements: wuyinElementsData
    });
  },
  
  /**
   * 绘制五官图表
   */
  drawWuguanCanvas() {
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
      const ctx = wx.createCanvasContext('wuguanCanvas');
      this.drawWuguanChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },
  
  /**
   * 绘制五官图表 - 五行对应版
   */
  drawWuguanChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const senses = ['目', '舌', '口', '鼻', '耳'];
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
    
    // 绘制五官圆形（向外移动三分之一直径）- 放在线段之后确保覆盖
    senses.forEach((sense, index) => {
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
      
      // 官名 - 五行属性格式
      ctx.setFillStyle('#fff');
      ctx.setFontSize(26);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(sense, x, y - 15);
      
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
    
    // 生成五官按钮位置数据（转换为相对于frame的坐标）
    const wuguanElementsData = senses.map((sense, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: sense,
        element: elements[index],
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      wuguanElements: wuguanElementsData
    });
  },
  
  /**
   * 绘制五气图表
   */
  drawWuqiCanvas() {
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
      const ctx = wx.createCanvasContext('wuqiCanvas');
      this.drawWuqiChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },
  
  /**
   * 绘制五气图表 - 五行对应版
   */
  drawWuqiChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const qi = ['风', '热', '湿', '燥', '寒'];
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
    
    // 绘制五气圆形（向外移动三分之一直径）- 放在线段之后确保覆盖
    qi.forEach((qiItem, index) => {
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
      
      // 气名 - 五行属性格式
      ctx.setFillStyle('#fff');
      ctx.setFontSize(26);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(qiItem, x, y - 15);
      
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
    
    // 生成五气按钮位置数据（转换为相对于frame的坐标）
    const wuqiElementsData = qi.map((qiItem, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: qiItem,
        element: elements[index],
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      wuqiElements: wuqiElementsData
    });
  },
  
  /**
   * 绘制五季图表
   */
  drawWujiCanvas() {
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
      const ctx = wx.createCanvasContext('wujiCanvas');
      this.drawWujiChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },
  
  /**
   * 绘制五季图表 - 五行对应版
   */
  drawWujiChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const seasons = ['春', '夏', '长夏', '秋', '冬'];
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
    
    // 绘制五季圆形（向外移动三分之一直径）- 放在线段之后确保覆盖
    seasons.forEach((season, index) => {
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
      
      // 季名 - 五行属性格式
      ctx.setFillStyle('#fff');
      ctx.setFontSize(26);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(season, x, y - 15);
      
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
    
    // 生成五季按钮位置数据（转换为相对于frame的坐标）
    const wujiElementsData = seasons.map((season, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: season,
        element: elements[index],
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      wujiElements: wujiElementsData
    });
  },
  
  /**
   * 绘制五志图表
   */
  drawWuzhiCanvas() {
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
      const ctx = wx.createCanvasContext('wuzhiCanvas');
      this.drawWuzhiChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },
  
  /**
   * 绘制五志图表 - 五行对应版
   */
  drawWuzhiChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const emotions = ['怒', '喜', '思', '忧', '恐'];
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
    
    // 绘制五志圆形（向外移动三分之一直径）- 放在线段之后确保覆盖
    emotions.forEach((emotion, index) => {
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
      
      // 志名 - 五行属性格式
      ctx.setFillStyle('#fff');
      ctx.setFontSize(26);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(emotion, x, y - 15);
      
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
    
    // 生成五志按钮位置数据（转换为相对于frame的坐标）
    const wuzhiElementsData = emotions.map((emotion, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: emotion,
        element: elements[index],
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      wuzhiElements: wuzhiElementsData
    });
  },
  
  /**
   * 绘制五德图表
   */
  drawWudeCanvas() {
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
      const ctx = wx.createCanvasContext('wudeCanvas');
      this.drawWudeChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },
  
  /**
   * 绘制五德图表 - 五行对应版
   */
  drawWudeChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const virtues = ['仁', '礼', '信', '义', '智'];
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
    
    // 绘制五德圆形（向外移动三分之一直径）- 放在线段之后确保覆盖
    virtues.forEach((virtue, index) => {
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
      
      // 德名 - 五行属性格式
      ctx.setFillStyle('#fff');
      ctx.setFontSize(26);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(virtue, x, y - 15);
      
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
    
    // 生成五德按钮位置数据（转换为相对于frame的坐标）
    const wudeElementsData = virtues.map((virtue, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: virtue,
        element: elements[index],
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      wudeElements: wudeElementsData
    });
  },
  
  /**
   * 绘制五星图表
   */
  drawWuxingStarsCanvas() {
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
      const ctx = wx.createCanvasContext('wuxingStarsCanvas');
      this.drawWuxingStarsChart(ctx, width, height, frameRect);
      ctx.draw(true); // 使用true参数，确保立即绘制并覆盖之前的内容
    });
  },
  
  /**
   * 绘制五星图表 - 五行对应版
   */
  drawWuxingStarsChart(ctx, width, height, frameRect) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const stars = ['木星', '火星', '土星', '金星', '水星'];
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
    
    // 绘制五星圆形（向外移动三分之一直径）- 放在线段之后确保覆盖
    stars.forEach((star, index) => {
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
      
      // 星名 - 五行属性格式
      ctx.setFillStyle('#fff');
      ctx.setFontSize(18);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(star, x, y - 15);
      
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
    
    // 生成五星按钮位置数据（转换为相对于frame的坐标）
    const wuxingStarsElementsData = stars.map((star, index) => {
      const angle = (index * 72 - 90) * Math.PI / 180;
      const x = centerX + (radius + 15) * Math.cos(angle);
      const y = centerY + (radius + 15) * Math.sin(angle) + 10;
      
      return {
        name: star,
        element: elements[index],
        style: `left: ${canvasOffsetX + x - 40}px; top: ${canvasOffsetY + y - 40}px; width: 80px; height: 80px; background: rgba(255,255,255,0); border: 3px solid rgba(255,255,255,0);`
      };
    });
    
    this.setData({
      wuxingStarsElements: wuxingStarsElementsData
    });
  }
});