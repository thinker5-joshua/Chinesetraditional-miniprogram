# 实现五行奥秘tab区同步滚动

## 问题分析

当用户在图表区左右滑动切换tab时，如果目标tab不在屏幕上，就看不到tab的变化。需要实现上方tab区的同步滚动，确保当前激活的tab始终显示在可视区域。

## 实现方案

1. **添加tab列表标识**：给tab列表添加id，方便后续获取其位置信息
2. **获取激活tab位置**：在tab切换时，获取当前激活tab的位置信息
3. **实现tab区滚动**：使用小程序API将tab区滚动到对应位置，确保激活tab可见

## 实现步骤

### 1. 修改WXML文件

在tab列表容器上添加id属性，方便后续获取元素位置：

```wxml
<view class="tab-container">
  <view class="tab-list" id="tabList">
    <view 
      class="tab-item {{currentTab === item.id ? 'active' : ''}}"
      wx:for="{{activeTabs}}" 
      wx:key="id"
      bindtap="onTabChange"
      data-tab="{{item.id}}"
    >
      <text class="tab-title">{{item.title}}</text>
    </view>
  </view>
</view>
```

### 2. 修改JS文件

在`onTabChange`函数中添加tab滚动逻辑：

```javascript
onTabChange(e) {
  // 现有tab切换逻辑...
  
  // 添加tab滚动逻辑
  this.setData({
    currentTab: tabId,
    // 其他数据更新...
  }, () => {
    // 绘制图表...
    
    // 滚动当前激活的tab到可视区域
    setTimeout(() => {
      this.scrollToActiveTab();
    }, 100);
  });
},

// 滚动当前激活的tab到可视区域
scrollToActiveTab() {
  const query = wx.createSelectorQuery().in(this);
  
  // 获取tab列表容器的位置
  query.select('#tabList').boundingClientRect();
  // 获取当前激活tab的位置
  query.select('.tab-item.active').boundingClientRect();
  
  query.exec((res) => {
    if (res && res.length === 2) {
      const tabListRect = res[0];
      const activeTabRect = res[1];
      
      if (tabListRect && activeTabRect) {
        // 计算需要滚动的距离
        const scrollLeft = activeTabRect.left - tabListRect.left + tabListRect.scrollLeft - (tabListRect.width - activeTabRect.width) / 2;
        
        // 使用scroll-view的scroll-left属性或通过CSS transform实现滚动
        this.setData({
          tabScrollLeft: scrollLeft
        });
      }
    }
  });
}
```

### 3. 修改WXSS文件

确保tab列表容器支持横向滚动：

```css
.tab-container {
  overflow-x: auto;
  white-space: nowrap;
  /* 添加其他样式... */
}

.tab-list {
  display: flex;
  /* 添加其他样式... */
}
```

### 4. 在data中添加滚动位置变量

```javascript
Page({
  data: {
    // 现有数据...
    tabScrollLeft: 0 // 新增tab滚动位置变量
  },
  // 现有方法...
});
```

### 5. 绑定滚动位置到tab列表

```wxml
<view class="tab-container">
  <view 
    class="tab-list" 
    id="tabList"
    style="transform: translateX(-{{tabScrollLeft}}px); transition: transform 0.3s ease;"
  >
    <!-- tab items... -->
  </view>
</view>
```

## 预期效果

当用户在图表区左右滑动切换tab时，上方tab区会自动滚动，确保当前激活的tab始终显示在可视区域，提升用户体验。
