# 实现五行奥秘UI优化和图表改进

## 1. 修改Tab标签样式
### 文件：`/subgames/WuxingMysteries/pages/main/index.wxss`
- **实现屏幕内滚动**：
  - 将 `.tab-list` 设置为 `overflow-x: auto`
  - 添加 `white-space: nowrap` 确保标签不换行
  - 设置 `scrollbar-width: none` 隐藏滚动条
- **加大字体**：
  - 将 `.tab-title` 的 `font-size` 从 28rpx 调整为 32rpx
  - 可能需要调整 `.tab-item` 的 padding 以适应更大的字体

## 2. 修改天干图表
### 文件：`/subgames/WuxingMysteries/pages/main/index.js`
- **添加五行标注**：
  - 在 `drawTianGanChart` 函数中，在绘制天干名称后添加五行小字标注
  - 使用 `ctx.setFontSize(16)` 设置小字大小
  - 将五行标注绘制在天干名称下方

## 3. 修改地支图表
### 文件：`/subgames/WuxingMysteries/pages/main/index.js`
- **添加五行标注**：
  - 在 `drawDiZhiChart` 函数中，在绘制地支名称后添加五行小字标注
  - 使用 `ctx.setFontSize(16)` 设置小字大小
  - 将五行标注绘制在地支名称下方

## 4. 修改八卦图表
### 文件：`/subgames/WuxingMysteries/pages/main/index.js`
- **移除卦象符号**：
  - 在 `drawBaguaChart` 函数中，删除绘制卦象的代码行（第1785-1786行）
- **移除中间太极图**：
  - 删除调用 `drawTaiChi` 函数的代码行（第1790行）
- **添加五行标注**：
  - 在绘制八卦名称后添加五行小字标注
  - 使用 `ctx.setFontSize(16)` 设置小字大小
  - 将五行标注绘制在八卦名称下方

## 5. 测试和优化
- 测试Tab标签滚动效果
- 检查字体大小是否合适
- 验证图表中的五行标注是否清晰可见
- 确保八卦图表中不再显示卦象和太极图

## 6. 预期效果
- Tab标签在屏幕内滚动，不会超出屏幕范围
- Tab标签文字更大，更易阅读
- 天干、地支图表中显示对应的五行属性
- 八卦图表只显示名称和五行属性，没有卦象和太极图

这个计划将按照用户的要求逐步实现，确保每个修改都能达到预期效果，同时保持代码的可维护性和可读性。