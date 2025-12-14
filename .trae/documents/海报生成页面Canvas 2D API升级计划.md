### 海报生成页面Canvas 2D API升级计划

**优化目标**：将海报生成页面的旧版Canvas API升级为Canvas 2D API，以获得更好的性能和同层渲染支持。

**优化内容**：

1. **修改WXML中的Canvas元素**
   - 移除`canvas-id`属性
   - 添加`type="2d"`属性
   - 添加`id`属性用于选择器查询

2. **修改JS中的绘制逻辑**
   - 使用`wx.createSelectorQuery()`获取canvas元素
   - 通过`canvas.getContext('2d')`获取2D上下文
   - 将旧版Canvas API方法替换为新的Canvas 2D API方法
   - 更新`wx.canvasToTempFilePath`的调用方式

3. **保持现有功能不变**
   - 保持所有绘制效果和逻辑不变
   - 确保生成的海报样式与之前一致

**具体修改点**：

1. **poster.wxml**
   - 修改canvas元素的属性

2. **poster.js**
   - 修改`generatePoster`方法中的上下文获取方式
   - 修改绘制完成后的图片生成逻辑
   - 更新所有Canvas API调用为新的2D API格式

**预期效果**：
- 海报生成性能提升
- 支持同层渲染
- 消除控制台警告
- 保持现有功能和样式不变

**实现方式**：
- 仅修改WXML和JS文件，无需修改CSS样式
- 按照微信官方文档的最佳实践进行升级
- 确保代码的可维护性和兼容性