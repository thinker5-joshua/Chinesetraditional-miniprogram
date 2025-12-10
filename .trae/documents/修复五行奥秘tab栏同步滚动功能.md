# 修复五行奥秘tab栏同步滚动功能

## 问题分析
当前五行奥秘tab栏同步滚动功能在手机上未生效，可能存在以下问题：
- `scrollToActiveTab`方法的实现可能存在问题
- 滚动API使用不正确
- 选择器可能有问题
- 调用时机可能不当
- 可能存在兼容性问题

## 解决方案
1. 检查并修复`scrollToActiveTab`方法的实现
2. 确保滚动API使用正确
3. 验证选择器是否能正确获取元素
4. 调整调用时机
5. 确保在不同设备上都能正常工作

## 实现步骤

1. **检查scrollToActiveTab方法**：
   - 查看之前的实现，确认是否存在问题
   - 检查滚动API的使用是否正确
   - 验证选择器是否能正确获取元素

2. **修改scrollToActiveTab方法**：
   - 使用更可靠的滚动API
   - 确保能正确获取元素位置
   - 添加错误处理
   - 调整滚动逻辑，确保能正确滚动到目标位置

3. **确保方法被正确调用**：
   - 检查onTabChange和onTouchEnd方法中的调用
   - 确保在DOM更新完成后调用
   - 添加调试日志，确认方法被调用

4. **测试功能**：
   - 在不同设备上测试
   - 确保tab切换后能正确滚动
   - 确保两句七言诗一行能正常显示

## 代码实现

### 修复scrollToActiveTab方法
```javascript
/**
 * 滚动当前激活的tab到可视区域
 */
scrollToActiveTab() {
  // 使用更可靠的滚动方法
  wx.createSelectorQuery().select('.tab-item.active').boundingClientRect((rect) => {
    if (rect) {
      wx.createSelectorQuery().select('.tab-container').boundingClientRect((containerRect) => {
        if (containerRect) {
          // 计算需要滚动的距离
          const scrollLeft = rect.left - (containerRect.width / 2) + (rect.width / 2);
          
          // 使用scrollIntoView方法滚动到指定位置
          wx.createSelectorQuery().select('.tab-container').scrollIntoView({
            scrollLeft: scrollLeft,
            animation: {
              duration: 300,
              timingFunction: 'ease-out'
            }
          });
        }
      }).exec();
    }
  }).exec();
}
```

### 确保方法被正确调用
- 在onTabChange方法中确保调用
- 在onTouchEnd方法中确保调用
- 添加调试日志，确认方法被调用

## 预期效果
- tab切换后，当前激活的tab能自动滚动到屏幕中央
- 在手机上能正常生效
- 不影响其他功能
- 滚动效果平滑自然