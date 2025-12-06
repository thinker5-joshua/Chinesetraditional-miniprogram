// 星宿配对游戏页面
const { starsData, fourBeastsRhyme } = require('../../stars-data.js');

Page({
  // 添加定时器ID数组，用于保存所有定时器ID
  matchTimers: [],
  data: {
    // 显示的星宿（从每个方位随机选择1宿，总共4宿）
    displayStars: [],
    // 所有星宿数据
    allStars: [],
    
    // 右侧四圣兽（增加口诀信息）
    fourBeasts: [
      { 
        name: '东方青龙', 
        icon: '🐉', 
        color: '#2ecc71', 
        key: 'east',
        rhyme: fourBeastsRhyme.east
      },
      { 
        name: '南方朱雀', 
        icon: '🦅', 
        color: '#e74c3c', 
        key: 'south',
        rhyme: fourBeastsRhyme.south
      },
      { 
        name: '西方白虎', 
        icon: '🐅', 
        color: '#f39c12', 
        key: 'west',
        rhyme: fourBeastsRhyme.west
      },
      { 
        name: '北方玄武', 
        icon: '🐢', 
        color: '#3498db', 
        key: 'north',
        rhyme: fourBeastsRhyme.north
      }
    ],
    
    // 游戏状态
    selectedBeast: null,
    selectedStar: null,
    matchedPairs: [],
    currentMatch: null,
    
    // 星宿口诀
    rhymes: fourBeastsRhyme
  },

  onLoad() {
    this.initGame();
  },

  /**
   * Fisher-Yates 洗牌算法，更可靠的随机排序
   */
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  /**
   * 初始化配对游戏
   */
  initGame() {
    const selectedStars = [];
    
    // 从每个方位随机选择1个星宿
    Object.keys(starsData).forEach(direction => {
      const starsInDirection = starsData[direction];
      const randomIndex = Math.floor(Math.random() * starsInDirection.length);
      const selectedStar = starsInDirection[randomIndex];
      
      selectedStars.push({
        ...selectedStar,
        originalDirection: direction,
        id: `${direction}-${randomIndex}`,
        status: 'normal'
      });
    });

    // 打乱顺序增加游戏性
    const shuffledStars = this.shuffleArray(selectedStars);

    this.setData({
      displayStars: shuffledStars,
      selectedBeast: null,
      selectedStar: null,
      matchedPairs: [],
      currentMatch: null
    });
  },

  /**
   * 选择圣兽
   */
  selectBeast(e) {
    const beast = e.currentTarget.dataset.beast;
    const previousSelectedStar = this.data.selectedStar; // 保存之前选择的星宿
    
    // 重置之前的选择状态，但保持已配对成功的星宿状态不变
    const updatedStars = this.data.displayStars.map(s => {
      if (s.status === 'matched') {
        return s; // 已配对的星宿保持原状态
      }
      return {
        ...s,
        status: 'normal' // 未配对的星宿重置为normal
      };
    });

    this.setData({
      displayStars: updatedStars,
      selectedBeast: beast,
      selectedStar: null
    }, () => {
      // 如果之前已经选择了星宿，检查配对
      if (previousSelectedStar) {
        // 设置selectedStar用于checkMatch
        this.setData({
          selectedStar: previousSelectedStar
        }, () => {
          this.checkMatch();
        });
      }
    });
  },

  /**
   * 选择星宿
   */
  selectStar(e) {
    const star = e.currentTarget.dataset.star;
    
    // 检查星宿是否已经配对
    if (star.status === 'matched') {
      return; // 已配对的星宿不响应点击
    }
    
    // 清除之前的选择状态，但保持已配对成功的星宿状态不变
    const updatedStars = this.data.displayStars.map(s => {
      if (s.status === 'matched') {
        return s; // 已配对的星宿保持原状态
      }
      return {
        ...s,
        status: s.id === star.id ? 'selected' : 'normal'
      };
    });

    this.setData({
      displayStars: updatedStars,
      selectedStar: star
    }, () => {
      // 在setData回调中检查配对，确保selectedStar已更新
      if (this.data.selectedBeast) {
        this.checkMatch();
      }
    });
  },

  /**
   * 检查配对
   */
  checkMatch() {
    const { selectedBeast, selectedStar, displayStars } = this.data;
    
    if (!selectedBeast || !selectedStar) return;

    const isMatch = selectedStar.originalDirection === selectedBeast.key;
    
    if (isMatch) {
      // 配对成功
      const currentMatch = {
        beast: selectedBeast,
        star: selectedStar,
        success: true,
        id: Date.now() // 用于唯一标识
      };

      // 从显示列表中移除已配对的星宿
      const updatedStars = displayStars.filter(star => star.id !== selectedStar.id);
      
      // 新配对添加到已配对列表的顶部
      const updatedMatchedPairs = [currentMatch, ...this.data.matchedPairs];
      
      this.setData({
        displayStars: updatedStars,
        matchedPairs: updatedMatchedPairs,
        currentMatch,
        selectedBeast: null,
        selectedStar: null
      });

      // 检查是否全部完成（4个星宿都配对成功）
      if (updatedMatchedPairs.length === 4) {
        this.showSuccess();
      } else {
        wx.showToast({
          title: '配对成功！',
          icon: 'success'
        });
      }

      // 2秒后清除当前配对
      const timerId1 = setTimeout(() => {
        this.setData({
          currentMatch: null
        });
      }, 2000);
      this.matchTimers.push(timerId1);
      
    } else {
      // 配对失败
      const currentMatch = {
        beast: selectedBeast,
        star: selectedStar,
        success: false
      };

      // 显示错误状态
      const updatedStars = displayStars.map(star => ({
        ...star,
        status: star.id === selectedStar.id ? 'error' : 'normal'
      }));

      this.setData({
        displayStars: updatedStars,
        currentMatch
      });
      
      wx.showToast({
        title: '配对失败，请重试',
        icon: 'error'
      });
      
      // 2秒后重置选择
      const timerId2 = setTimeout(() => {
        const resetStars = this.data.displayStars.map(star => {
          if (star.status === 'matched') {
            return star; // 已配对的星宿保持原状态
          }
          return {
            ...star,
            status: 'normal' // 其他星宿重置为normal
          };
        });
        
        this.setData({
          displayStars: resetStars,
          selectedBeast: null,
          selectedStar: null,
          currentMatch: null
        });
      }, 2000);
      this.matchTimers.push(timerId2);
    }
  },

  /**
   * 显示成功页面
   */
  showSuccess() {
    wx.showModal({
      title: '恭喜完成！',
      content: '您已成功完成所有星宿配对！',
      showCancel: false,
      confirmText: '返回主页',
      success: () => {
        // 获取页面栈
        const pages = getCurrentPages();
        if (pages.length > 1) {
          // 正常返回上一页
          wx.navigateBack();
        } else {
          // 从分享进入，跳转到模块首页
          wx.redirectTo({
            url: '/subgames/28Stars/index'
          });
        }
      }
    });
  },



  /**
   * 重新开始游戏
   */
  restartGame() {
    this.initGame();
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
        url: '/subgames/28Stars/index'
      });
    }
  },

  /**
   * 用户点击右上角分享给朋友
   */
  onShareAppMessage(options) {
    return {
      title: '星宿配对互动',
      path: '/subgames/28Stars/pages/star-matching/star-matching'
    };
  },

  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: '星宿配对互动',
      query: ''
    };
  },

  /**
   * 页面卸载时清理所有定时器
   */
  onUnload() {
    // 清理所有定时器
    this.matchTimers.forEach(timer => clearTimeout(timer));
    // 清空定时器数组
    this.matchTimers = [];
  }
});