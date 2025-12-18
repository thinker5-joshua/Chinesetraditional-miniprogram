# 守护神兽小游戏UI精细调整计划

## 1. 统一所有标题字体大小为45rpx
- **修改文件**: `/subgames/guardian-beast/index.wxss`
- **修改内容**:
  - 将页面主标题(`.main-title`)字体大小从52rpx调整为45rpx
  - 将副标题(`.sub-title`)字体大小从28rpx调整为45rpx
  - 将脊兽列表区标题(`.beasts-list-section .page-title .title-text`)字体大小从52rpx调整为45rpx
  - 将待抽取守护神兽展示区标题(`.pending-section .section-title .title-text`)字体大小从36rpx调整为45rpx
  - 将已抽取的守护神兽展示区标题(`.extracted-beast-section .section-title .title-text`)字体大小从36rpx调整为45rpx
  - 确保所有标题字体大小统一为45rpx

## 2. 已抽取区域添加guardianAbility显示
- **修改文件**: `/subgames/guardian-beast/index.wxml`
- **修改内容**:
  - 在`.beast-info-large`容器中添加`guardianAbility`显示
  - 为`guardianAbility`添加不同的颜色和字体样式
  - 调整布局，确保name、beastName和guardianAbility之间有适当间距

## 3. 优化脊兽卡片样式
- **修改文件**: `/subgames/guardian-beast/index.wxss`
- **修改内容**:
  - 调整脊兽卡片(`.beast-list-item`)样式，确保不超出边框
  - 调整卡片中名称(`.beast-name`)和拼音(`.beast-pinyin`)的颜色
  - 将名称字体大小从48rpx调整为36rpx
  - 增加两个内容间的上下间距

## 4. 增加脊兽列表区与上方区的间距
- **修改文件**: `/subgames/guardian-beast/index.wxss`
- **修改内容**:
  - 调整`.beasts-list-section`的margin-top属性，从40rpx增加到60rpx

## 5. 调整抽取神兽页引导文案样式
- **修改文件**: `/subgames/guardian-beast/draw.wxss`
- **修改内容**:
  - 将引导文案(`.guidance-text`)从居中对齐改为左对齐
  - 为第二段文字(`.guidance-paragraph`)设置不同的字体样式

## 6. 图像性能优化建议
- **压缩图形**: 使用图片压缩工具压缩所有图片资源
- **本地预装载**: 在应用启动时预加载常用图片
- **CDN加速**: 将图片资源上传到CDN，使用CDN加速图片加载
- **懒加载**: 实现图片懒加载，只在需要时加载图片

## 具体修改步骤
1. 首先修改`index.wxss`，统一所有标题字体大小
2. 然后修改`index.wxml`，添加`guardianAbility`显示
3. 接着优化脊兽卡片样式
4. 然后增加脊兽列表区与上方区的间距
5. 接着修改`draw.wxss`，调整引导文案样式
6. 最后优化图像性能

## 预期效果
- 所有标题字体大小统一，视觉效果协调
- 已抽取区域信息完整，布局合理
- 脊兽卡片样式美观，内容易于阅读
- 页面布局更加合理，间距适中
- 引导文案更加醒目，易于阅读
- 图片加载速度提升，用户体验优化