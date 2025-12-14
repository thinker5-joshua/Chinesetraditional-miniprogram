# 将zhuoqixuan目录迁移到pages目录下的计划

## 1. 迁移前准备
- 确认当前zhuoqixuan目录的结构和内容
- 确认app.json中的相关配置

## 2. 迁移步骤
### 步骤1：物理移动目录
将根目录下的zhuoqixuan目录移动到pages目录下

### 步骤2：更新app.json配置
- 更新pages数组中的路径：将`"zhuoqixuan/index"`修改为`"pages/zhuoqixuan/index"`
- 更新tabBar配置中的路径：将`"pagePath": "zhuoqixuan/index"`修改为`"pagePath": "pages/zhuoqixuan/index"`

## 3. 验证迁移结果
- 检查目录结构是否正确
- 检查app.json配置是否正确
- 确认小程序能够正常运行

## 4. 预期效果
- zhuoqixuan目录将从根目录移动到pages目录下
- 所有相关配置将被正确更新
- 小程序的功能和导航将保持不变

## 5. 风险评估
- 低风险：仅涉及目录移动和配置更新，不修改业务逻辑
- 可回滚：如果出现问题，可以将目录移回根目录并恢复配置

## 6. 文件修改清单
- **移动目录**：`zhuoqixuan/` → `pages/zhuoqixuan/`
- **修改文件**：`app.json`（更新页面路径和tabBar配置）