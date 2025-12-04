Page({
  data: {
    elementInfo: {},
    relatedElements: [],
    tabType: ''
  },

  onLoad(options) {
    const { element, tabType } = options;
    

    
    // 解码参数
    const decodedElement = decodeURIComponent(element || '');
    const decodedTabType = decodeURIComponent(tabType || '');
    
    // 参数验证
    if (!decodedElement || !decodedTabType) {

      wx.showToast({
        title: '页面参数错误',
        icon: 'none',
        duration: 1500
      });
      
      // 延迟返回，避免和onLoad冲突
      setTimeout(() => {
        this.goBack();
      }, 1500);
      return;
    }
    

    this.setData({
      tabType: decodedTabType
    });
    
    // 获取详情数据

    this.generateDetailData(decodedElement, decodedTabType);
  },

  // 生成详情数据
  generateDetailData(elementName, tabType) {
    try {
      // 加载数据文件
      const wuxingData = require('../../data.js');
      

      
      let elementData = {};
      let foundElement = null;
      
      // 优化的数据查找逻辑 - 使用数组查找代替循环遍历
      switch(tabType) {
        case 'wuxing':
          // 使用Object.values和find方法优化查找
          const wuxingElements = Object.values(wuxingData.wuxing);
          foundElement = wuxingElements.find(element => element.name === elementName);
          
          if (foundElement) {
            elementData = Object.assign({}, foundElement);
            elementData.element = elementName;

          } else {

          }
          break;
          
        case 'wufang':
          const wufangElements = Object.values(wuxingData.wufang);
          foundElement = wufangElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
            }

          }
          break;
          
        case 'wuse':
          const wuseElements = Object.values(wuxingData.wuse);
          foundElement = wuseElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
            }

          }
          break;
          
        case 'wuzang':
          const wuzangElements = Object.values(wuxingData.wuzang);
          foundElement = wuzangElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
            }

          }
          break;
          
        case 'wuwei':
          const wuweiElements = Object.values(wuxingData.wuwei);
          foundElement = wuweiElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
            }

          }
          break;
      }
      
      // 设置元素信息

      
      // 确保至少有基本数据
      if (!elementData.element) {

        // 设置默认数据避免页面空白
        elementData = {
          element: elementName,
          title: elementName,
          description: '数据加载失败，请重试',
          symbol: '⚠️'
        };
      }
      
      this.setData({
        elementInfo: elementData
      }, () => {

      });
      
      // 生成相关元素 - 避免在数据错误时继续处理
      if (elementData.element && elementData.element !== elementName) {
        this.generateRelatedElements(elementData, tabType);
      }
      
    } catch (error) {

      // 设置错误状态
      this.setData({
        elementInfo: {
          element: elementName,
          title: elementName,
          description: '数据加载失败，请重试',
          symbol: '⚠️'
        }
      });
    }
  },

  // 生成相关元素
  generateRelatedElements(elementData, tabType) {
    let relatedElements = [];
    
    if (tabType === 'wuxing') {
      // 五行相关元素
      const relatedNames = {
        '木': ['火', '土', '金', '水'],
        '火': ['土', '金', '水', '木'],
        '土': ['金', '水', '木', '火'],
        '金': ['水', '木', '火', '土'],
        '水': ['木', '火', '土', '金']
      };
      
      relatedElements = (relatedNames[elementData.element] || []).map(name => ({
        name: name,
        symbol: this.getElementSymbol(name)
      }));
    } else if (tabType === 'wufang') {
      // 五方相关元素
      const directions = ['东', '南', '中', '西', '北'];
      relatedElements = directions
        .filter(dir => dir !== elementData.element)
        .map(dir => ({
          name: dir,
          symbol: this.getElementSymbol(dir)
        }));
    } else if (tabType === 'wuse') {
      // 五色相关元素
      const colors = ['青', '赤', '黄', '白', '黑'];
      relatedElements = colors
        .filter(color => color !== elementData.element)
        .map(color => ({
          name: color,
          symbol: this.getElementSymbol(color)
        }));
    } else if (tabType === 'wuzang') {
      // 五脏相关元素
      const organs = ['肝', '心', '脾', '肺', '肾'];
      relatedElements = organs
        .filter(organ => organ !== elementData.element)
        .map(organ => ({
          name: organ,
          symbol: this.getElementSymbol(organ)
        }));
    } else if (tabType === 'wuwei') {
      // 五味相关元素
      const flavors = ['酸', '苦', '甘', '辛', '咸'];
      relatedElements = flavors
        .filter(flavor => flavor !== elementData.element)
        .map(flavor => ({
          name: flavor,
          symbol: this.getElementSymbol(flavor)
        }));
    }
    
    this.setData({ relatedElements });
  },
  
  // 获取元素符号
  getElementSymbol(elementName) {
    const symbols = {
      '木': '🌳', '火': '🔥', '土': '🏔️', '金': '⚔️', '水': '💧',
      '东': '🌅', '南': '☀️', '中': '⭕', '西': '🌅', '北': '❄️',
      '青': '🟢', '赤': '🔴', '黄': '🟡', '白': '⚪', '黑': '⚫',
      '肝': '💚', '心': '❤️', '脾': '💛', '肺': '⚪', '肾': '🔵',
      '酸': '🍋', '苦': '🌶️', '甘': '🍯', '辛': '🌶️', '咸': '🧂'
    };
    return symbols[elementName] || '✨';
  },

  // 返回上一页
  goBack() {
    const pages = getCurrentPages();
    
    // 检查页面栈
    if (pages.length > 1) {
      wx.navigateBack({
        fail: (error) => {

          // 如果返回失败，尝试跳转到主页面
          wx.reLaunch({
            url: '/subgames/WuxingMysteries/pages/main/index'
          });
        }
      });
    } else {
      // 如果页面栈只有当前页面，则直接跳转到主页面
      wx.reLaunch({
        url: '/subgames/WuxingMysteries/pages/main/index'
      });
    }
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 阻止点击事件冒泡到遮罩层
  },

  // 点击相关元素
  onRelatedElementTap(e) {
    const { element } = e.currentTarget.dataset;
    
    // 验证参数
    if (!element || !this.data.tabType) {

      return;
    }
    
    const targetUrl = `/subgames/WuxingMysteries/pages/detail/detail?element=${encodeURIComponent(element)}&tabType=${encodeURIComponent(this.data.tabType)}`;
    
    wx.navigateTo({
      url: targetUrl,
      fail: (error) => {

        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 1500
        });
      }
    });
  },

  // 分享给朋友
  onShareAppMessage() {
    const { elementInfo, tabType } = this.data;
    return {
      title: `${elementInfo.title || elementInfo.element} - 五行奥秘`,
      path: `/subgames/WuxingMysteries/pages/detail/detail?element=${encodeURIComponent(elementInfo.element)}&tabType=${encodeURIComponent(tabType)}`
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    const { elementInfo, tabType } = this.data;
    return {
      title: `${elementInfo.title || elementInfo.element} - 五行奥秘`,
      query: `element=${encodeURIComponent(elementInfo.element)}&tabType=${encodeURIComponent(tabType)}`
    };
  }
});