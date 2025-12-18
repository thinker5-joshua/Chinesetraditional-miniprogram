## 问题分析
通过代码搜索发现，虽然之前已经修复了`setFillStyle`、`setStrokeStyle`等旧Canvas API方法，但代码中仍然存在大量使用`setLineDash`方法的情况。这是导致除五行图表外其他图表无法显示的根本原因。

## 修复方案
将所有旧的`setLineDash`方法调用替换为新的Canvas 2D API语法：

### 替换规则
- 旧语法：`ctx.setLineDash([5, 5])`
- 新语法：`ctx.lineDash = [5, 5]`
- 重置虚线：`ctx.setLineDash([])` → `ctx.lineDash = []`

### 涉及文件
- `/subgames/WuxingMysteries/pages/main/index.js`：所有draw*Chart方法中的setLineDash调用

### 修复步骤
1. 检查所有包含`setLineDash`的行
2. 将每个`setLineDash`调用替换为新的属性赋值语法
3. 验证修复后的代码符合Canvas 2D API规范
4. 测试所有图表是否能正常显示

## 预期结果
修复后，所有图表（五方、五脏、五色等）都能正常绘制和显示，不再出现Canvas API错误。