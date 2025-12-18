### 五行奥秘Canvas升级与图表优化计划

**优化目标**：
1. 将五行奥秘中的所有canvas升级为Canvas 2D API，提升性能和同层渲染支持
2. 修复图表在部分手机上显示超出边框的问题

**修改内容**：

1. **修改WXML文件**：
   - 将所有canvas元素的`canvas-id`属性替换为`type="2d"`和`id`属性
   - 确保每个canvas元素都有唯一的id

2. **更新JS绘制逻辑**：
   - 使用`wx.createSelectorQuery()`获取canvas元素
   - 通过`canvas.getContext('2d')`获取2D上下文
   - 添加设备像素比(dpr)处理，确保高清显示
   - 调整canvas尺寸设置，避免超出边框
   - 更新所有Canvas API调用为2D API格式

3. **修复图表超出边框问题**：
   - 重新计算画布和绘制区域的尺寸关系
   - 确保绘制内容在画布范围内
   - 优化不同设备上的适配逻辑
   - 检查并调整各图表类型的绘制边界

**具体修改点**：

1. **文件**：`subgames/WuxingMysteries/pages/main/index.wxml`
   - 修改所有canvas元素的属性

2. **文件**：`subgames/WuxingMysteries/pages/main/index.js`
   - 修改`drawCurrentTabCanvas`方法
   - 更新所有`draw*Canvas`方法
   - 修改`draw*Chart`方法中的绘制逻辑
   - 添加dpr处理
   - 优化画布尺寸计算

3. **文件**：其他五行奥秘相关的WXML和JS文件
   - 检查并升级所有canvas使用

**实现方式**：
1. 分批修改，先修改主页面的canvas，再修改其他页面
2. 保持原有绘制效果不变
3. 确保所有图表类型都能正常显示
4. 测试不同设备上的显示效果

**预期效果**：
- 提升图表绘制性能
- 支持同层渲染
- 消除控制台警告
- 修复图表超出边框问题
- 确保在不同设备上都能正常显示
- 保持原有功能和视觉效果不变