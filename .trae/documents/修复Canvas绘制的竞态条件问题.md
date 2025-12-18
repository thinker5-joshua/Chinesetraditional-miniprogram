## 问题分析
通过深入分析，我发现了导致除五行图外其他图表无法显示的根本原因：**竞态条件**

### 问题机制
1. 当用户切换标签时，`onTabChange`方法会调用`drawCurrentTabCanvas()`
2. `drawCurrentTabCanvas()`方法执行顺序：
   - 第250行：`this.clearAllCanvas();` - 清除所有Canvas（异步操作）
   - 第254行开始：根据currentTab调用对应的draw*Canvas方法（异步操作）
3. **关键问题**：`clearAllCanvas()`使用**异步**的`wx.createSelectorQuery()`，会遍历所有16个Canvas ID
4. 这导致**竞态条件**：
   - `draw*Canvas()`方法绘制完成后，`clearAllCanvas()`的异步操作才执行
   - 特别是当前标签的Canvas，会被`clearAllCanvas()`清除，导致刚刚绘制的内容被擦除

### 为什么只有五行图能显示？
- 页面首次加载时，currentTab是"wuxing"，直接调用`drawWuxingCanvas()`
- 此时还没有调用过`clearAllCanvas()`，所以绘制的内容不会被清除
- 但切换到其他标签时，会先调用`clearAllCanvas()`，导致绘制内容被后续清除

## 修复方案
修改`drawCurrentTabCanvas()`方法，**移除**`clearAllCanvas()`调用，改为在每个`draw*Chart`方法开始时清除自己的画布。

### 修复步骤
1. **修改drawCurrentTabCanvas方法**：移除`this.clearAllCanvas()`调用
2. **在每个draw*Chart方法中添加清除逻辑**：在每个绘制方法开始时，使用`ctx.clearRect(0, 0, width, height)`清除自己的画布
3. **确保绘制完整性**：避免异步操作导致的绘制被清除问题

### 预期效果
修复后，所有图表（五方、五脏、五色等）都能正常显示，不会被异步的清除操作影响。

### 技术说明
- 移除全局的异步清除操作，改为每个绘制方法内的同步清除
- 避免竞态条件导致的绘制内容被清除
- 确保每个图表绘制前只清除自己的画布，不影响其他图表
- 保持绘制操作的完整性和可靠性