## 修复菜根谭子游戏分享功能

### 问题分析
菜根谭摘录页面的分享功能无法正常使用，原因是：
1. 直接调用了微信小程序的分享API（wx.shareAppMessage和wx.shareTimeline），这些API需要通过页面的生命周期函数触发
2. 缺少onShareAppMessage生命周期函数，这是微信小程序分享给朋友必须的
3. 缺少onShareTimeline生命周期函数，这是微信小程序分享到朋友圈必须的

### 解决方案
1. **修改shareQuote函数**：
   - 移除直接调用wx.shareAppMessage和wx.shareTimeline的代码
   - 改为设置分享类型标志并显示分享菜单

2. **添加onShareAppMessage生命周期函数**：
   - 实现分享给朋友的逻辑
   - 设置分享标题、路径和图片
   - 使用当前显示的名言内容作为分享内容

3. **添加onShareTimeline生命周期函数**（可选，根据微信小程序版本支持情况）：
   - 实现分享到朋友圈的逻辑
   - 设置分享标题、查询参数和图片
   - 使用当前显示的名言内容作为分享内容

### 文件修改
- **subgames/VegetableRootSayings/index.js**：
  - 更新shareQuote函数
  - 添加onShareAppMessage生命周期函数
  - 添加onShareTimeline生命周期函数

### 预期效果
- 点击分享按钮后，显示分享选择弹窗
- 选择"分享给朋友"后，触发微信分享面板，显示正确的分享内容
- 选择"分享到朋友圈"后，触发微信分享到朋友圈面板，显示正确的分享内容
- 生成分享图片功能保持不变

### 技术要点
- 微信小程序分享必须通过页面的onShareAppMessage和onShareTimeline生命周期函数实现
- 分享内容需要动态获取当前显示的名言
- 分享图片需要使用本地临时文件或网络图片
- 分享菜单需要通过wx.showShareMenu方法显示