# 实现五行奥秘tab栏同步滚动功能

## 问题分析
当前五行奥秘功能中，当通过图表滑动切换tab时，虽然图表和数据会更新，但如果目标tab不在屏幕上，用户看不到tab的变化，影响用户体验。

## 解决方案
实现`scrollToActiveTab`方法，确保当tab切换时（无论是通过点击还是滑动），当前激活的tab都能滚动到可视区域。

## 实现步骤

1. **实现`scrollToActiveTab`方法**
   - 在`index.js`中添加`scrollToActiveTab`方法
   - 使用`wx.createSelectorQuery`获取当前激活tab的位置信息
   - 计算滚动距离，将激活tab滚动到可视区域
   - 处理边界情况，确保滚动位置合理

2. **确保方法被正确调用**
   - 检查现有的调用位置，确保在tab切换后调用
   - 在`onTabChange`方法末尾添加调用，确保点击tab时也能滚动
   - 确保在图表滑动切换tab后调用

3. **优化滚动效果**
   - 添加平滑滚动效果
   - 处理快速连续切换的情况

## 代码实现
```javascript
/**
 * 滚动当前激活的tab到可视区域
 */
scrollToActiveTab() {
  const query = wx.createSelectorQuery();
  query.select('.tab-item.active').boundingClientRect();
  query.select('.tab-list').boundingClientRect();
  query.select('.tab-container').scrollOffset();
  
  query.exec(res => {
    if (!res || res.length < 3 || !res[0] || !res[1] || !res[2]) {
      return;
    }
    
    const activeTabRect = res[0];
    const tabListRect = res[1];
    const tabContainerScroll = res[2];
    
    // 计算激活tab的中心位置
    const activeTabCenter = activeTabRect.left + activeTabRect.width / 2;
    // 计算容器的中心位置
    const containerCenter = tabListRect.width / 2;
    
    // 计算需要滚动的距离
    // 目标是将激活tab的中心对准容器中心
    const scrollTo = tabContainerScroll.scrollLeft + activeTabCenter - containerCenter;
    
    // 滚动到指定位置，添加平滑滚动效果
    wx.createSelectorQuery().select('.tab-container').scrollIntoView({
      scrollLeft: scrollTo,
      animation: {
        duration: 300,
        timingFunction: 'ease-out'
      }
    });
  });
}
```

## 调用位置
1. 在`onTabChange`方法末尾添加调用
2. 在`onTouchEnd`方法中保持现有的调用

## 预期效果
- 当通过图表滑动切换tab时，上方tab栏会自动滚动，使当前激活的tab显示在可视区域
- 当通过点击tab切换时，也会确保激活的tab在可视区域
- 滚动过程平滑自然，提升用户体验

## 测试方案
1. 打开五行奥秘功能
2. 滑动图表切换到不在屏幕上的tab
3. 观察tab栏是否自动滚动到当前激活的tab
4. 点击屏幕边缘的tab，观察是否正常滚动
5. 快速连续切换tab，观察滚动效果是否正常