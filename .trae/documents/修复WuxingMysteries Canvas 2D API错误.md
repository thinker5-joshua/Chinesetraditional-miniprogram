**修复计划：**

1. **移除对 canvas.style 的直接设置**

   * 小程序中 Canvas 2D 的尺寸应通过 WXML 中的 style 属性控制

   * 删除所有 `canvas.style.width` 和 `canvas.style.height` 设置

2. **替换废弃的 wx.getSystemInfoSync()**

   * 使用 `wx.getWindowInfo()` 获取设备像素比

   * 新API：`wx.getWindowInfo().pixelRatio`

3. **加强错误处理**

   * 确保 `canvasInfo.node` 存在才进行后续操作

   * 添加更严格的空值检查

4. **统一修复所有 draw\*Canvas 方法**

   * 修复 drawWuxingCanvas

   * 修复 drawWufangCanvas

   * 修复 drawWuseCanvas

   * 修复 drawWuzangCanvas

   * 修复 drawWufuCanvas

   * 修复 drawWuweiCanvas

   * 修复 drawWuyinCanvas

   * 修复 drawWuguanCanvas

   * 修复 drawWuqiCanvas

   * 修复 drawWujiCanvas

   * 修复 drawWuzhiCanvas

   * 修复 drawWudeCanvas

   * 修复 drawWuxingStarsCanvas

   * 修复 drawTianGanCanvas

   * 修复 drawDiZhiCanvas

   * 修复 drawBaguaCanvas

**修复后的核心代码示例：**

```javascript
// 获取设备像素比，用于高清显示
const pixelRatio = wx.getWindowInfo().pixelRatio || 1;

// 使用实际的canvas尺寸，确保内容不会超出边框
const width = Math.min(canvasInfo.width, frameRect.width * 0.95); // 留5%的边距
const height = Math.min(canvasInfo.height, frameRect.height * 0.95); // 留5%的边距

// 设置Canvas的实际宽高（考虑dpr）
canvas.width = width * pixelRatio;
canvas.height = height * pixelRatio;

// 移除 canvas.style.width 和 canvas.style.height 设置
// 缩放上下文以适应dpr
ctx.scale(pixelRatio, pixelRatio);
```

