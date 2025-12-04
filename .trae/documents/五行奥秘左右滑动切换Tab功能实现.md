## 五行奥秘左右滑动切换Tab功能实现

### 功能需求
在五行奥秘的图表区域支持左右滑动切换到当前的左右Tab页，方便用户操作。

### 实现思路
1. 在图表显示容器上添加触摸事件监听器
2. 跟踪触摸开始和结束位置
3. 计算滑动距离和方向
4. 根据滑动方向切换到对应的Tab页
5. 设置合适的滑动阈值避免误操作

### 实现步骤

#### 1. 修改HTML结构，添加触摸事件监听器
- 在`chart-display-container`元素上添加`bindtouchstart`、`bindtouchmove`和`bindtouchend`事件监听器

#### 2. 更新JavaScript，添加触摸事件处理逻辑
- 添加触摸事件相关的数据字段到data中（startX, startY, moveX, moveY）
- 实现`onTouchStart`、`onTouchMove`和`onTouchEnd`函数
- 实现基于滑动方向的Tab切换逻辑

#### 3. 实现Tab切换逻辑
- 根据当前Tab索引和滑动方向计算新的Tab索引
- 调用现有的`onTabChange`函数切换Tab
- 确保Tab循环切换（第一页左滑到最后一页，最后一页右滑到第一页）

#### 4. 添加滑动阈值和方向判断
- 设置合理的滑动阈值（例如50px）
- 判断滑动方向（左滑或右滑）
- 只有在水平滑动距离大于垂直滑动距离且超过阈值时才触发Tab切换

### 关键代码实现

#### WXML修改
```html
<!-- 图表显示容器 -->
<view class="chart-display-container"
      bindtouchstart="onTouchStart"
      bindtouchmove="onTouchMove"
      bindtouchend="onTouchEnd">
  <!-- 五行图表 -->
  <!-- ... 现有图表代码 ... -->
</view>
```

#### JavaScript修改
```javascript
// 在data中添加触摸事件相关字段
data: {
  // ... 现有数据 ...
  // 触摸事件相关
  startX: 0,
  startY: 0,
  moveX: 0,
  moveY: 0
},

// 触摸开始事件
onTouchStart(e) {
  this.setData({
    startX: e.touches[0].clientX,
    startY: e.touches[0].clientY
  });
},

// 触摸移动事件
onTouchMove(e) {
  this.setData({
    moveX: e.touches[0].clientX,
    moveY: e.touches[0].clientY
  });
},

// 触摸结束事件
onTouchEnd() {
  const { startX, moveX, activeTabs, currentTab } = this.data;
  const deltaX = moveX - startX;
  const deltaY = this.data.moveY - this.data.startY;
  
  // 设定滑动阈值，大于50px且水平滑动距离大于垂直滑动距离才触发Tab切换
  if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
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
}
```

### 预期效果
- 用户在图表区域左右滑动时，会切换到对应的左/右Tab页
- 滑动切换Tab时，会调用现有的Tab切换逻辑，包括更新图表和知识内容
- 滑动阈值设置合理，避免误操作
- 支持Tab循环切换

### 测试要点
- 测试左右滑动是否能正确切换Tab
- 测试滑动阈值是否合适
- 测试在不同设备上的表现
- 测试是否会与上下滚动冲突

### 技术要点
- 使用微信小程序的触摸事件系统
- 合理的阈值设置和方向判断
- 复用现有的Tab切换逻辑
- 确保在各种设备上都能正常工作