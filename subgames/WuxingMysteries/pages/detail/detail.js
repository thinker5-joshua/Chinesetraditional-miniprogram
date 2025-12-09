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

  // 五行关系数据
  wuxingRelationships: {
    // 相生关系：A生B
    sheng: {
      '木': '火',
      '火': '土',
      '土': '金',
      '金': '水',
      '水': '木'
    },
    // 相克关系：A克B
    ke: {
      '木': '土',
      '火': '金',
      '土': '水',
      '金': '木',
      '水': '火'
    }
  },

  // 五行元素对应的其他元素映射
  elementTypeMap: {
    // 五方
    wufang: {
      '木': '东',
      '火': '南',
      '土': '中',
      '金': '西',
      '水': '北'
    },
    // 五色
    wuse: {
      '木': '青',
      '火': '赤',
      '土': '黄',
      '金': '白',
      '水': '黑'
    },
    // 五脏
    wuzang: {
      '木': '肝',
      '火': '心',
      '土': '脾',
      '金': '肺',
      '水': '肾'
    },
    // 五腑
    wufu: {
      '木': '胆',
      '火': '小肠',
      '土': '胃',
      '金': '大肠',
      '水': '膀胱'
    },
    // 五味
    wuwei: {
      '木': '酸',
      '火': '苦',
      '土': '甘',
      '金': '辛',
      '水': '咸'
    },
    // 五音
    wuyin: {
      '木': '角',
      '火': '徵',
      '土': '宫',
      '金': '商',
      '水': '羽'
    },
    // 五官
    wuguan: {
      '木': '目',
      '火': '舌',
      '土': '口',
      '金': '鼻',
      '水': '耳'
    },
    // 五气
    wuqi: {
      '木': '风',
      '火': '热',
      '土': '湿',
      '金': '燥',
      '水': '寒'
    },
    // 五季
    wuji: {
      '木': '春',
      '火': '夏',
      '土': '长夏',
      '金': '秋',
      '水': '冬'
    },
    // 五志
    wuzhi: {
      '木': '怒',
      '火': '喜',
      '土': '思',
      '金': '忧',
      '水': '恐'
    },
    // 五德
    wude: {
      '木': '仁',
      '火': '礼',
      '土': '信',
      '金': '义',
      '水': '智'
    },
    // 五星
    wuxingStars: {
      '木': '木星',
      '火': '火星',
      '土': '土星',
      '金': '金星',
      '水': '水星'
    },
    // 天干
    tianGan: {
      '木': '甲',
      '火': '丙',
      '土': '戊',
      '金': '庚',
      '水': '壬'
    },
    // 地支
    diZhi: {
      '木': '寅',
      '火': '午',
      '土': '辰',
      '金': '申',
      '水': '子'
    },
    // 八卦
    bagua: {
      '木': '震',
      '火': '离',
      '土': '坤',
      '金': '乾',
      '水': '坎'
    }
  },

  // 生成详情数据
  generateDetailData(elementName, tabType) {
    try {
      // 加载数据文件
      const wuxingData = require('../../data.js');
      
      let elementData = {};
      let foundElement = null;
      
      // 优化的数据查找逻辑 - 使用Object.values和find方法优化查找
      switch(tabType) {
        case 'wuxing':
          // 使用Object.values和find方法优化查找
          const wuxingElements = Object.values(wuxingData.wuxing);
          foundElement = wuxingElements.find(element => element.name === elementName);
          
          if (foundElement) {
            elementData = Object.assign({}, foundElement);
            elementData.element = elementName;
            elementData.wuxing = elementName; // 设置五行属性为中文
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
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
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
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
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
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
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
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
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
          
        case 'wuyin':
          const wuyinElements = Object.values(wuxingData.wuyin);
          foundElement = wuyinElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
          
        case 'wuguan':
          const wuguanElements = Object.values(wuxingData.wuguan);
          foundElement = wuguanElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
          
        case 'wuqi':
          const wuqiElements = Object.values(wuxingData.wuqi);
          foundElement = wuqiElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
          
        case 'wuji':
          const wujiElements = Object.values(wuxingData.wuji);
          foundElement = wujiElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
          
        case 'wuzhi':
          const wuzhiElements = Object.values(wuxingData.wuzhi);
          foundElement = wuzhiElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
          
        case 'wude':
          const wudeElements = Object.values(wuxingData.wude);
          foundElement = wudeElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
          
        case 'wuxingStars':
          const wuxingStarsElements = Object.values(wuxingData.wuxingStars);
          foundElement = wuxingStarsElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
          
        case 'wufu':
          const wufuElements = Object.values(wuxingData.wufu);
          foundElement = wufuElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
          
        case 'tianGan':
          const tianGanElements = Object.values(wuxingData.tianGan);
          foundElement = tianGanElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
          
        case 'diZhi':
          const diZhiElements = Object.values(wuxingData.diZhi);
          foundElement = diZhiElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
          
        case 'bagua':
          const baguaElements = Object.values(wuxingData.bagua);
          foundElement = baguaElements.find(element => element.name === elementName);
          
          if (foundElement) {
            const wuxingElement = wuxingData.wuxing[foundElement.wuxing];
            if (wuxingElement) {
              elementData = Object.assign({}, wuxingElement, foundElement);
              elementData.element = elementName;
              // 确保wuxing属性是中文
              elementData.wuxing = wuxingElement.name;
            } else {
              elementData = Object.assign({}, foundElement);
              elementData.element = elementName;
              elementData.wuxing = foundElement.wuxing;
            }
          } else {
            // 设置默认数据
            elementData = {
              element: elementName,
              title: elementName,
              description: '数据加载失败，请重试',
              symbol: '⚠️'
            };
          }
          break;
      }
      
      // 生成完整的五行关系","}}}
      if (elementData.wuxing || tabType === 'wuxing') {
        const relationships = this.generateWuxingRelationships(elementData, tabType);
        elementData.wuxingRelationships = relationships;
      }
      
      this.setData({
        elementInfo: elementData
      });
      
      // 生成相关元素
      this.generateRelatedElements(elementData, tabType);
      
    } catch (error) {
      console.error('Error generating detail data:', error);
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

  // 生成五行关系
  generateWuxingRelationships(elementData, tabType) {
    let relationships = {
      sheng: '',
      ke: ''
    };
    
    // 五行相生相克关系 - 使用中文直接定义
    const wuxingSheng = {
      '木': '火',
      '火': '土',
      '土': '金',
      '金': '水',
      '水': '木'
    };
    
    const wuxingKe = {
      '木': '土',
      '火': '金',
      '土': '水',
      '金': '木',
      '水': '火'
    };
    
    // 获取当前五行元素
    let currentWuxing = '';
    if (tabType === 'wuxing') {
      currentWuxing = elementData.element;
    } else {
      currentWuxing = elementData.wuxing;
    }
    
    if (!currentWuxing) {
      relationships.sheng = '暂无关系数据';
      relationships.ke = '暂无关系数据';
      return relationships;
    }
    
    // 获取相生关系的前一个元素
    function getPreviousWuxing(element, relationMap) {
      const elements = ['木', '火', '土', '金', '水'];
      const index = elements.indexOf(element);
      if (index === -1) return null;
      const previousIndex = (index - 1 + elements.length) % elements.length;
      return elements[previousIndex];
    }
    
    // 获取克当前元素的元素（谁克当前元素）
    function getWhoKeElement(element) {
      const keMap = {
        '木': '金',  // 金克木
        '火': '水',  // 水克火
        '土': '木',  // 木克土
        '金': '火',  // 火克金
        '水': '土'   // 土克水
      };
      return keMap[element];
    }
    
    // 获取相生相克关系
    const shengPrev = getPreviousWuxing(currentWuxing, wuxingSheng);
    const shengNext = wuxingSheng[currentWuxing];
    const keTarget = wuxingKe[currentWuxing];        // 当前元素克的元素
    const keWho = getWhoKeElement(currentWuxing);  // 谁克当前元素
    
    if (tabType === 'wuxing') {
      // 五行tab：显示五行元素，分两行
      if (shengPrev && shengNext) {
        relationships.shengLine1 = `${shengPrev}生${currentWuxing}`;
        relationships.shengLine2 = `${currentWuxing}生${shengNext}`;
      } else {
        relationships.shengLine1 = '暂无相生关系数据';
        relationships.shengLine2 = '';
      }
      
      if (keTarget && keWho) {
        relationships.keLine1 = `${keWho}克${currentWuxing}`;
        relationships.keLine2 = `${currentWuxing}克${keTarget}`;
      } else {
        relationships.keLine1 = '暂无相克关系数据';
        relationships.keLine2 = '';
      }
    } else {
      // 其他tab：显示对应元素，分两行
      const currentElementName = elementData.element;
      
      const shengPrevElement = this.elementTypeMap[tabType][shengPrev];
      const shengNextElement = this.elementTypeMap[tabType][shengNext];
      const keTargetElement = this.elementTypeMap[tabType][keTarget];
      const keWhoElement = this.elementTypeMap[tabType][keWho];
      
      if (shengPrevElement && shengNextElement && currentElementName) {
        relationships.shengLine1 = `${shengPrevElement}（${shengPrev}）生${currentElementName}（${currentWuxing}）`;
        relationships.shengLine2 = `${currentElementName}（${currentWuxing}）生${shengNextElement}（${shengNext}）`;
      } else {
        relationships.shengLine1 = '暂无相生关系数据';
        relationships.shengLine2 = '';
      }
      
      if (keTargetElement && keWhoElement && currentElementName) {
        relationships.keLine1 = `${keWhoElement}（${keWho}）克${currentElementName}（${currentWuxing}）`;
        relationships.keLine2 = `${currentElementName}（${currentWuxing}）克${keTargetElement}（${keTarget}）`;
      } else {
        relationships.keLine1 = '暂无相克关系数据';
        relationships.keLine2 = '';
      }
    }
    
    return relationships;
  },

  // 获取前一个元素（用于相生相克关系）
  getPreviousElement(currentElement, relationshipMap) {
    const keys = Object.keys(relationshipMap);
    const index = keys.indexOf(currentElement);
    const previousIndex = (index - 1 + keys.length) % keys.length;
    return keys[previousIndex];
  },

  // 生成相关元素
  generateRelatedElements(elementData, tabType) {
    let relatedElements = [];
    const elementName = elementData.element;
    
    // 根据不同tab类型生成相关元素
    switch(tabType) {
      case 'wuxing':
        // 五行相关元素
        const wuxingElements = ['木', '火', '土', '金', '水'];
        relatedElements = wuxingElements
          .filter(wuxing => wuxing !== elementName)
          .map(name => ({
            name: name,
            symbol: this.getElementSymbol(name)
          }));
        break;
        
      case 'wufang':
        // 五方相关元素
        const directions = ['东', '南', '中', '西', '北'];
        relatedElements = directions
          .filter(dir => dir !== elementName)
          .map(dir => ({
            name: dir,
            symbol: this.getElementSymbol(dir)
          }));
        break;
        
      case 'wuse':
        // 五色相关元素
        const colors = ['青', '赤', '黄', '白', '黑'];
        relatedElements = colors
          .filter(color => color !== elementName)
          .map(color => ({
            name: color,
            symbol: this.getElementSymbol(color)
          }));
        break;
        
      case 'wuzang':
        // 五脏相关元素
        const organs = ['肝', '心', '脾', '肺', '肾'];
        relatedElements = organs
          .filter(organ => organ !== elementName)
          .map(organ => ({
            name: organ,
            symbol: this.getElementSymbol(organ)
          }));
        break;
        
      case 'wuwei':
        // 五味相关元素
        const flavors = ['酸', '苦', '甘', '辛', '咸'];
        relatedElements = flavors
          .filter(flavor => flavor !== elementName)
          .map(flavor => ({
            name: flavor,
            symbol: this.getElementSymbol(flavor)
          }));
        break;
        
      case 'wuyin':
        // 五音相关元素
        const sounds = ['角', '徵', '宫', '商', '羽'];
        relatedElements = sounds
          .filter(sound => sound !== elementName)
          .map(sound => ({
            name: sound,
            symbol: this.getElementSymbol(sound)
          }));
        break;
        
      case 'wuguan':
        // 五官相关元素
        const senses = ['目', '舌', '口', '鼻', '耳'];
        relatedElements = senses
          .filter(sense => sense !== elementName)
          .map(sense => ({
            name: sense,
            symbol: this.getElementSymbol(sense)
          }));
        break;
        
      case 'wuqi':
        // 五气相关元素
        const qi = ['风', '热', '湿', '燥', '寒'];
        relatedElements = qi
          .filter(qiItem => qiItem !== elementName)
          .map(qiItem => ({
            name: qiItem,
            symbol: this.getElementSymbol(qiItem)
          }));
        break;
        
      case 'wuji':
        // 五季相关元素
        const seasons = ['春', '夏', '长夏', '秋', '冬'];
        relatedElements = seasons
          .filter(season => season !== elementName)
          .map(season => ({
            name: season,
            symbol: this.getElementSymbol(season)
          }));
        break;
        
      case 'wuzhi':
        // 五志相关元素
        const emotions = ['怒', '喜', '思', '忧', '恐'];
        relatedElements = emotions
          .filter(emotion => emotion !== elementName)
          .map(emotion => ({
            name: emotion,
            symbol: this.getElementSymbol(emotion)
          }));
        break;
        
      case 'wude':
        // 五德相关元素
        const virtues = ['仁', '礼', '信', '义', '智'];
        relatedElements = virtues
          .filter(virtue => virtue !== elementName)
          .map(virtue => ({
            name: virtue,
            symbol: this.getElementSymbol(virtue)
          }));
        break;
        
      case 'wuxingStars':
        // 五星相关元素
        const stars = ['木星', '火星', '土星', '金星', '水星'];
        relatedElements = stars
          .filter(star => star !== elementName)
          .map(star => ({
            name: star,
            symbol: this.getElementSymbol(star)
          }));
        break;
        
      case 'wufu':
        // 五腑相关元素
        const bowels = ['胆', '胃', '小肠', '大肠', '膀胱'];
        relatedElements = bowels
          .filter(bowel => bowel !== elementName)
          .map(bowel => ({
            name: bowel,
            symbol: this.getElementSymbol(bowel)
          }));
        break;
        
      case 'tianGan':
        // 天干相关元素
        const tianGans = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        relatedElements = tianGans
          .filter(tianGan => tianGan !== elementName)
          .map(tianGan => ({
            name: tianGan,
            symbol: this.getElementSymbol(tianGan)
          }));
        break;
        
      case 'diZhi':
        // 地支相关元素
        const diZhis = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        relatedElements = diZhis
          .filter(diZhi => diZhi !== elementName)
          .map(diZhi => ({
            name: diZhi,
            symbol: this.getElementSymbol(diZhi)
          }));
        break;
        
      case 'bagua':
        // 八卦相关元素
        const baguas = ['乾', '坤', '震', '巽', '坎', '离', '艮', '兑'];
        relatedElements = baguas
          .filter(bagua => bagua !== elementName)
          .map(bagua => ({
            name: bagua,
            symbol: this.getElementSymbol(bagua)
          }));
        break;
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
      '胆': '🫀', '胃': '🫀', '小肠': '🫀', '大肠': '🫀', '膀胱': '🫀',
      '酸': '🍋', '苦': '🌶️', '甘': '🍯', '辛': '🌶️', '咸': '🧂',
      '角': '🎵', '徵': '🎵', '宫': '🎵', '商': '🎵', '羽': '🎵',
      '目': '👁️', '舌': '👅', '口': '👄', '鼻': '👃', '耳': '👂',
      '风': '💨', '热': '🌡️', '湿': '💧', '燥': '🔥', '寒': '❄️',
      '春': '🌸', '夏': '☀️', '长夏': '🌾', '秋': '🍂', '冬': '❄️',
      '怒': '😠', '喜': '😄', '思': '🤔', '忧': '😟', '恐': '😨',
      '仁': '🤝', '礼': '🙏', '信': '✋', '义': '⚖️', '智': '💡',
      '木星': '🪐', '火星': '🔴', '土星': '🟤', '金星': '🌟', '水星': '🌊',
      '甲': '📜', '乙': '📜', '丙': '📜', '丁': '📜', '戊': '📜',
      '己': '📜', '庚': '📜', '辛': '📜', '壬': '📜', '癸': '📜',
      '子': '🐁', '丑': '🐂', '寅': '🐅', '卯': '🐇', '辰': '🐉',
      '巳': '🐍', '午': '🐎', '未': '🐑', '申': '🐒', '酉': '🐔',
      '戌': '🐕', '亥': '🐖',
      '乾': '☰', '坤': '☷', '震': '☳', '巽': '☴', '坎': '☵',
      '离': '☲', '艮': '☶', '兑': '☱'
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