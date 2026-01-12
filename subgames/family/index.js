// 家族谱系探索页面
const { generateFamilyTree, calculateRelationship } = require('./family-tree-data.js');

// 尝试引入云存储模块，添加错误处理
let cloudStorage = null;
try {
  cloudStorage = require('../../utils/cloudStorage');
} catch (error) {
  console.error('引入云存储模块失败:', error);
  // 提供备用实现
  cloudStorage = {
    getImage: (fileName) => {
      return new Promise((resolve) => {
        // 使用本地默认图片
        const defaultPaths = {
          'wyhd-share-default.png': '/images/qrcode-default.png'
        };
        resolve(defaultPaths[fileName] || '/images/qrcode-default.png');
      });
    }
  };
}

Page({
  data: {
    wyhdShareDefaultUrl: '',
    // 家族树数据
    familyTree: {},
    familyMembers: [],
    connections: [],
    
    // 视图控制
    perspective: 'husband', // 'husband' 或 'wife'
    scale: 1,
    translateX: 0,
    translateY: 0,
    canvasWidth: 2000,
    canvasHeight: 1500,
    
    // 交互状态
    selectedMembers: [],
    showRelationModal: false,
    relationResult: null,
    showHelp: false,
    
    // 触摸拖拽
    touchStartX: 0,
    touchStartY: 0,
    isDragging: false
  },

  onLoad() {
    // 获取分享默认图片URL
    cloudStorage.getImage('wyhd-share-default.png')
      .then(url => {
        this.setData({
          wyhdShareDefaultUrl: url
        });
      })
      .catch(error => {
        console.error('Get share default image error:', error);
      });
    this.initFamilyTree();
  },

  /**
   * 初始化家族树
   */
  initFamilyTree() {
    // 生成家族树数据
    const familyTree = generateFamilyTree();
    const familyMembers = Object.values(familyTree);
    const connections = this.generateConnections(familyMembers);
    
    // 设置显示名称和关系
    const updatedMembers = familyMembers.map(member => {
      const displayName = this.getDisplayName(member);
      const relationFromPerspective = this.getRelationFromPerspective(member);
      
      return {
        ...member,
        displayName,
        relationFromPerspective,
        selected: false
      };
    });
    
    this.setData({
      familyTree,
      familyMembers: updatedMembers,
      connections
    });
  },

  /**
   * 生成连接线
   */
  generateConnections(members) {
    const connections = [];
    let connectionId = 0;
    
    members.forEach(member => {
      // 夫妻关系连线
      if (member.spouseId) {
        const spouse = members.find(m => m.id === member.spouseId);
        if (spouse && member.id < spouse.id) { // 避免重复连线
          connections.push({
            id: `spouse_${connectionId++}`,
            type: 'spouse',
            x1: member.x + 40,
            y1: member.y + 30,
            x2: spouse.x - 40,
            y2: spouse.y + 30
          });
        }
      }
      
      // 亲子关系连线
      if (member.childrenIds && member.childrenIds.length > 0) {
        member.childrenIds.forEach(childId => {
          const child = members.find(m => m.id === childId);
          if (child) {
            const midY = member.y + 60;
            const childY = child.y - 10;
            
            // 垂直线到中间层
            connections.push({
              id: `parent_vertical_${connectionId++}`,
              type: 'parent',
              x1: member.x + 40,
              y1: member.y + 60,
              x2: member.x + 40,
              y2: midY
            });
            
            // 水平线到孩子上方
            connections.push({
              id: `parent_horizontal_${connectionId++}`,
              type: 'parent',
              x1: member.x + 40,
              y1: midY,
              x2: child.x + 40,
              y2: midY
            });
            
            // 垂直线到孩子
            connections.push({
              id: `parent_child_${connectionId++}`,
              type: 'parent',
              x1: child.x + 40,
              y1: midY,
              x2: child.x + 40,
              y2: child.y - 10
            });
          }
        });
      }
    });
    
    // 计算连线的具体位置和角度
    return connections.map(conn => {
      const width = Math.abs(conn.x2 - conn.x1);
      const height = Math.abs(conn.y2 - conn.y1);
      const angle = Math.atan2(conn.y2 - conn.y1, conn.x2 - conn.x1) * 180 / Math.PI;
      
      return {
        ...conn,
        width: width || 2,
        height: height || 2,
        angle: angle
      };
    });
  },

  /**
   * 获取显示名称
   */
  getDisplayName(member) {
    if (member.id === 'root_husband' || member.id === 'root_wife') {
      return member.gender === 'male' ? '夫' : '妻';
    }
    return member.name;
  },

  /**
   * 根据视角获取关系称呼
   */
  getRelationFromPerspective(member) {
    if (member.id === 'root_husband') {
      return this.data.perspective === 'husband' ? '本人' : '丈夫';
    }
    if (member.id === 'root_wife') {
      return this.data.perspective === 'wife' ? '本人' : '妻子';
    }
    
    // 计算相对于根成员的关系
    const rootId = this.data.perspective === 'husband' ? 'root_husband' : 'root_wife';
    const relation = calculateRelationship(rootId, member.id, this.data.familyTree, this.data.perspective);
    
    return relation ? relation.person1ToPerson2 : '亲属';
  },

  /**
   * 切换视角
   */
  switchPerspective(e) {
    const perspective = e.currentTarget.dataset.perspective;
    this.setData({ perspective });
    
    // 重新更新所有成员的显示
    const updatedMembers = this.data.familyMembers.map(member => {
      const relationFromPerspective = this.getRelationFromPerspective(member);
      return {
        ...member,
        relationFromPerspective
      };
    });
    
    this.setData({ familyMembers: updatedMembers });
  },

  /**
   * 选择家族成员
   */
  selectMember(e) {
    const memberId = e.currentTarget.dataset.memberId;
    const member = this.data.familyMembers.find(m => m.id === memberId);
    
    if (!member) return;
    
    const selectedMembers = [...this.data.selectedMembers];
    const existingIndex = selectedMembers.findIndex(m => m.id === memberId);
    
    if (existingIndex !== -1) {
      // 如果已选择，则取消选择
      selectedMembers.splice(existingIndex, 1);
    } else {
      // 添加到选择列表
      selectedMembers.push(member);
      
      // 如果选择了两个成员，显示关系
      if (selectedMembers.length === 2) {
        this.showRelationship(selectedMembers[0], selectedMembers[1]);
        return;
      }
    }
    
    // 更新选择状态
    const updatedMembers = this.data.familyMembers.map(m => ({
      ...m,
      selected: selectedMembers.some(sm => sm.id === m.id)
    }));
    
    this.setData({
      selectedMembers,
      familyMembers: updatedMembers
    });
  },

  /**
   * 显示关系
   */
  showRelationship(member1, member2) {
    const relationResult = calculateRelationship(
      member1.id, 
      member2.id, 
      this.data.familyTree, 
      this.data.perspective
    );
    
    this.setData({
      selectedMembers: [member1, member2],
      relationResult,
      showRelationModal: true
    });
  },

  /**
   * 关闭关系弹窗
   */
  closeRelationModal() {
    this.setData({
      showRelationModal: false,
      selectedMembers: [],
      relationResult: null
    });
    
    // 清除选择状态
    const updatedMembers = this.data.familyMembers.map(m => ({
      ...m,
      selected: false
    }));
    
    this.setData({ familyMembers: updatedMembers });
  },

  /**
   * 清除选择
   */
  clearSelection() {
    this.closeRelationModal();
  },

  /**
   * 缩放控制
   */
  zoomIn() {
    const newScale = Math.min(this.data.scale * 1.2, 3);
    this.setData({ scale: newScale });
  },

  zoomOut() {
    const newScale = Math.max(this.data.scale * 0.8, 0.3);
    this.setData({ scale: newScale });
  },

  resetView() {
    this.setData({
      scale: 1,
      translateX: 0,
      translateY: 0
    });
  },

  /**
   * 触摸开始
   */
  onCanvasTouchStart(e) {
    const touch = e.touches[0];
    this.setData({
      touchStartX: touch.clientX,
      touchStartY: touch.clientY,
      isDragging: true
    });
  },

  /**
   * 触摸移动
   */
  onCanvasTouchMove(e) {
    if (!this.data.isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - this.data.touchStartX;
    const deltaY = touch.clientY - this.data.touchStartY;
    
    this.setData({
      translateX: this.data.translateX + deltaX,
      translateY: this.data.translateY + deltaY,
      touchStartX: touch.clientX,
      touchStartY: touch.clientY
    });
  },

  /**
   * 触摸结束
   */
  onCanvasTouchEnd() {
    this.setData({ isDragging: false });
  },

  /**
   * 切换帮助显示
   */
  toggleHelp() {
    this.setData({
      showHelp: !this.data.showHelp
    });
  },

  // 分享给朋友
  onShareAppMessage() {
    return {
      title: '家族谱系探索',
      path: '/subgames/family/index',
      imageUrl: this.data.wyhdShareDefaultUrl
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '家族谱系探索',
      query: '',
      imageUrl: '/images/wyhd-share-default.png'
    };
  }
});