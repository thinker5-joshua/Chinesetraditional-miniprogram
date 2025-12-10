# 修复五行奥秘tab区滚动问题

## 问题分析

当前五行奥秘tab区滚动实现存在问题：
1. 使用CSS `transform: translateX(-{{tabScrollLeft}}px)` 实现tab区滚动
2. 导致整个页面被左移，而不是只在tab容器内滚动
3. 当tab区超出屏幕时，整个页面都会左移，影响整体操作逻辑

## 解决方案

将tab区滚动改为容器内横向滚动，使用原生滚动机制而非transform移动整个tab列表：
1. 移除tabList的transform样式
2. 让tab容器本身支持横向滚动
3. 当切换到某个tab时，使用scrollIntoView API将该tab滚动到可视区域

## 实现步骤

### 1. 修改WXML文件

移除tabList的transform样式，恢复正常布局：

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

### 2. 修改CSS样式

确保tab容器支持横向滚动，而不影响整个页面：

```css
/* Tab标签区域 */
.tab-container {
  flex-shrink: 0;
  background: #fff;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-x: auto; /* 允许横向滚动 */
  position: relative;
}

.tab-list {
  display: flex;
  padding: 0;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
```

### 3. 修改JS文件

使用scrollIntoView API实现tab滚动，移除tabScrollLeft变量和相关逻辑：

```javascript
// 移除data中的tabScrollLeft变量

// 修改scrollToActiveTab方法，使用scrollIntoView实现滚动
scrollToActiveTab() {
  // 使用setTimeout确保DOM已更新
  setTimeout(() => {
    const query = wx.createSelectorQuery().in(this);
    query.select('.tab-item.active').node(res => {
      if (res.node) {
        // 使用scrollIntoView将当前激活的tab滚动到可视区域
        res.node.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    }).exec();
  }, 100);
}
```

### 4. 清理不必要的代码

- 移除data中的tabScrollLeft变量
- 清理相关的transform样式绑定
- 确保scrollToActiveTab方法只使用scrollIntoView实现滚动

## 预期效果

1. tab区超出屏幕时，只会在tab容器内横向滚动，不会影响整个页面
2. 切换tab时，当前激活的tab会平滑滚动到可视区域中央
3. 整个页面布局保持稳定，不会被左移
4. 操作逻辑更符合用户预期，提升用户体验