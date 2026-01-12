# 合并易读错字数据到data-optimized.js

## 任务目标
将extracted_data.json中的数据按照规则合并到data-optimized.js中，处理重复项并记录相关信息。

## 数据格式分析

### extracted_data.json
- 数组格式，每个元素包含：
  - char: 汉字
  - correctPronunciation: 正确读音
  - wrongPronunciation: 错误读音（字符串）
  - relatedPhrases: 相关词组（数组）
  - originalText: 原始文本

### data-optimized.js
- JavaScript模块，characters数组包含：
  - id: 字ID（数字）
  - char: 汉字
  - correctPronunciation: 正确读音
  - wrongPronunciations: 错误读音列表（数组）
  - relatedPhrases: 关联词组（数组）
  - explanation: 字典解释
  - errorReasonType: 常见错误原因分类
  - difficultyLevel: 测试难度等级

## 实现方案

### 步骤1: 创建合并脚本
创建Python脚本`merge_data.py`，实现以下功能：
- 读取extracted_data.json文件
- 解析data-optimized.js文件，提取characters数组
- 遍历extracted_data.json中的每条数据
- 按照char和correctPronunciation检查重复项
- 处理重复项和新增项
- 记录重复情况
- 统计总字数
- 将更新后的数据写回data-optimized.js

### 步骤2: 执行合并操作
- 运行脚本，执行数据合并
- 检查输出日志，确认合并结果

### 步骤3: 验证合并结果
- 查看更新后的data-optimized.js文件
- 确认数据格式正确
- 验证重复项处理是否符合要求

## 关键处理逻辑

1. **重复项检查**：同时比较char和correctPronunciation，两者都相同才视为重复
2. **新增项处理**：
   - 为新增项分配新的id
   - 设置默认的errorReasonType和difficultyLevel
   - explanation保持为空
3. **重复项更新**：
   - 如果wrongPronunciation不为空且是新内容，将其添加到wrongPronunciations数组
   - 如果relatedPhrases中有新内容，添加到relatedPhrases数组
4. **数据验证**：确保数据格式正确，避免重复添加相同内容

## 预期输出
- 更新后的data-optimized.js文件
- 合并结果统计信息，包括：
  - 新增字数
  - 重复字数
  - 总字数
  - 重复字列表

## 技术要点
- Python文件读写和JSON解析
- JavaScript文件解析和生成
- 数据去重和合并逻辑
- 日志记录和统计分析