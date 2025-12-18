## 问题分析
通过对比不同图表绘制方法的实现，我发现了关键问题：
1. **五行图表**和**五方图表**使用**动态尺寸计算**：根据实际Canvas尺寸和容器尺寸计算绘制区域
2. **其他图表**（五色、五脏、五腑等）使用**固定尺寸350**：硬编码的宽高值可能不符合实际Canvas尺寸

这种差异导致其他图表无法正常显示，可能是因为：
- 固定尺寸350与实际Canvas尺寸不匹配
- 绘制内容超出了Canvas可见区域
- 坐标计算基于错误的尺寸

## 修复方案
将所有图表绘制方法统一使用动态尺寸计算，确保每个图表都能根据实际Canvas尺寸和容器尺寸进行绘制。

### 修复步骤
1. **修改所有draw*Canvas方法**：将固定尺寸`width = 350; height = 350;`替换为动态尺寸计算
2. **统一尺寸计算逻辑**：使用与五行图表相同的动态尺寸计算方式
3. **确保一致性**：所有图表方法使用相同的尺寸计算逻辑
4. **验证修复效果**：测试所有图表是否能正常显示

### 替换规则
将每个draw*Canvas方法中的固定尺寸设置：
```javascript
const width = 350;
const height = 350;
```

替换为动态尺寸计算：
```javascript
// 使用实际的canvas尺寸，确保内容不会超出边框
const width = Math.min(canvasInfo.width, frameRect.width * 0.95); // 留5%的边距
const height = Math.min(canvasInfo.height, frameRect.height * 0.95); // 留5%的边距
```

### 涉及方法
- drawWuseCanvas
- drawWuzangCanvas
- drawWufuCanvas
- drawWuweiCanvas
- drawWuyinCanvas
- drawWuguanCanvas
- drawWuqiCanvas
- drawWujiCanvas
- drawWuzhiCanvas
- drawWudeCanvas
- drawWuxingStarsCanvas
- drawTianGanCanvas
- drawDiZhiCanvas
- drawBaguaCanvas

## 预期结果
修复后，所有图表都将使用动态尺寸计算，根据实际Canvas和容器尺寸进行绘制，确保内容完整显示在可视区域内。玩家切换不同标签页时，所有图表都能正常显示。