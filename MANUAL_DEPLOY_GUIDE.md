# 云函数手动部署与数据导入指南

## 1. 环境准备

### 1.1 确保已安装微信开发者工具
- 下载地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
- 安装最新版本

### 1.2 确保已开通云开发服务
- 在微信开发者工具中，点击「云开发」按钮
- 按照提示开通云开发服务
- 记录云开发环境ID

## 2. 云函数部署

### 2.1 打开项目
- 启动微信开发者工具
- 点击「导入项目」
- 选择项目根目录：`/Users/joshua/Documents/GitHub/Chinesetraditional-miniprogram`
- 填写AppID：`wx4a01b43f997284bc`（从project.config.json中获取）
- 点击「导入」

### 2.2 部署云函数
- 在左侧导航栏中，右键点击 `cloudfunctions` 目录
- 选择「同步云函数列表」
- 等待同步完成
- 右键点击 `cloudfunctions/import_to_cloud` 目录
- 选择「上传并部署：云端安装依赖」
- 等待部署完成（可能需要2-5分钟）

### 2.3 验证部署结果
- 部署完成后，点击顶部导航栏的「云开发」按钮
- 在云开发控制台中，点击「云函数」标签页
- 可以看到 `import_to_cloud` 函数已部署，状态为「已部署」

## 3. 数据导入

### 3.1 调用检查功能
- 在云开发控制台中，点击 `import_to_cloud` 函数名称
- 切换到「测试」标签页
- 在「测试参数」输入框中填写：
  ```json
  {
    "action": "check"
  }
  ```
- 点击「运行测试」按钮
- 等待测试完成，查看「测试结果」
- 记录当前数据条数（预期为463条）

### 3.2 调用导入功能
- 保持在函数详情页的「测试」标签页
- 清空「测试参数」输入框（或使用默认空对象 `{}`）
- 点击「运行测试」按钮
- 等待测试完成（可能需要1-2分钟）
- 查看「测试结果」，确认：
  - `success` 字段为 `true`
  - `imported` 字段为 `91`
  - `failed` 字段为 `0`

### 3.3 验证导入结果
- 重复「调用检查功能」的步骤
- 填写测试参数：
  ```json
  {
    "action": "check"
  }
  ```
- 点击「运行测试」按钮
- 查看「测试结果」中的 `count` 字段
- 预期结果：`count: 554`（463 + 91）

## 4. 数据验证

### 4.1 检查数据完整性
- 在云开发控制台中，点击「数据库」标签页
- 选择 `daily_characters` 集合
- 点击「查询」按钮
- 在查询条件中输入：
  ```json
  {
    "id": {
      "$gte": 464
    }
  }
  ```
- 点击「确定」按钮
- 可以看到所有新增的91条数据

### 4.2 随机验证数据
- 随机选择几条数据进行查看
- 检查字段是否完整：id、char、correctPronunciation、wrongPronunciations、relatedPhrases、explanation、errorReasonType、difficultyLevel
- 检查数据内容是否符合预期

## 5. 常见问题及解决方案

### 5.1 部署失败
- **原因**：依赖安装失败、网络问题、权限问题
- **解决方案**：
  - 检查网络连接
  - 确保微信开发者工具已登录
  - 重新尝试部署
  - 检查云函数目录结构是否正确

### 5.2 导入失败
- **原因**：数据格式错误、字段缺失、权限问题
- **解决方案**：
  - 检查 `export_data.json` 文件格式
  - 确保所有必需字段都存在
  - 检查云函数的权限配置
  - 查看云函数日志排查问题

### 5.3 数据重复
- **原因**：已存在相同id的记录
- **解决方案**：
  - 云函数会自动更新已存在的记录
  - 可以通过查看云函数日志确认处理情况

### 5.4 测试超时
- **原因**：导入数据量较大，处理时间长
- **解决方案**：
  - 云函数后台仍在执行，可查看云函数日志确认结果
  - 稍后再次调用检查功能确认数据条数

## 6. 查看云函数日志

### 6.1 打开日志列表
- 在云开发控制台中，点击「云函数」标签页
- 点击 `import_to_cloud` 函数名称
- 切换到「日志」标签页

### 6.2 筛选日志
- 可以按时间范围筛选日志
- 可以按请求ID筛选日志
- 可以查看详细的执行日志

### 6.3 日志示例
```
开始导入数据，共 91 条
批次大小: 50
处理批次: 1-50
批次 1-50 处理完成
处理批次: 51-91
批次 51-91 处理完成
数据导入完成
成功: 91
失败: 0
```

## 7. 数据文件说明

### 7.1 数据文件路径
- 本地数据文件：`/Users/joshua/Documents/GitHub/Chinesetraditional-miniprogram/cloudfunctions/import_to_cloud/export_data.json`
- 数据条数：91条
- 文件大小：37.73 KB

### 7.2 数据结构
```json
{
  "id": 464,
  "char": "岙",
  "correctPronunciation": "ào",
  "wrongPronunciations": ["qiáo", "yù"],
  "relatedPhrases": ["崔家岙", "山岙", "岙口", "岙里"],
  "explanation": "岙（ào）：浙江、福建等沿海一带称山间平地（多用于地名）。如崔家岙（浙江省地名）。",
  "errorReasonType": 6,
  "difficultyLevel": "高级"
}
```

### 7.3 字段说明
- `id`：唯一标识符，从464开始
- `char`：汉字
- `correctPronunciation`：正确读音
- `wrongPronunciations`：常见错误读音数组
- `relatedPhrases`：相关词组数组
- `explanation`：详细解释
- `errorReasonType`：错误原因类型
- `difficultyLevel`：难度等级

## 8. 后续操作

### 8.1 清理临时文件（可选）
部署完成后，可以删除临时生成的测试脚本：
```bash
rm /Users/joshua/Documents/GitHub/Chinesetraditional-miniprogram/test_cloud_function.js
rm /Users/joshua/Documents/GitHub/Chinesetraditional-miniprogram/subgames/daily-character/transform_data.js
```

### 8.2 定期备份数据
建议定期备份云数据库中的数据，以便在需要时恢复。

---

**注意事项**：
- 确保云开发环境已开通
- 确保云函数有足够的权限访问数据库
- 导入过程中不要关闭微信开发者工具
- 如遇到问题，请查看云函数日志进行排查
- 导入完成后，建议再次验证数据完整性