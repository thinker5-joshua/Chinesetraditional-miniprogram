# 将data-diff.js数据添加到云数据库方案

## 方案概述
将`data-diff.js`中的91条汉字数据添加到云数据库中，确保新数据的`charId`从云数据库最大ID（463）开始递增，并添加必要的时间戳字段。

## 实施步骤

### 1. 准备工作
- 已确认云数据库中最大的`charId`为463
- 已确认`data-diff.js`中有91条有效数据
- 已创建备份文件`data-diff-backup.js`

### 2. 数据处理流程
1. **读取数据**：
   - 从`data-diff.js`读取91条汉字数据
   - 从`daily_characters_export.json`读取云数据库数据

2. **数据转换**：
   - 为每条新数据分配递增的`charId`（从464开始）
   - 添加`createdAt`和`updatedAt`时间戳字段
   - 确保数据结构与云数据库一致

3. **合并数据**：
   - 将转换后的数据合并到云数据库数据中
   - 生成新的云数据库文件

4. **验证结果**：
   - 检查新数据的`charId`是否正确递增
   - 检查数据量是否正确（462 + 91 = 553）
   - 检查是否有重复数据

### 3. 技术实现
1. **创建转换脚本**：`add_data_to_cloud.js`
2. **验证脚本**：`verify_merged_data.js`
3. **备份机制**：生成`daily_characters_export.json.backup`备份文件

### 4. 数据结构映射
| data-diff.js字段 | 云数据库字段 | 备注 |
|----------------|-------------|------|
| id | - | 不使用，改用charId |
| char | char | 保持不变 |
| correctPronunciation | correctPronunciation | 保持不变 |
| wrongPronunciations | wrongPronunciations | 保持不变 |
| relatedPhrases | relatedPhrases | 保持不变 |
| explanation | explanation | 保持不变 |
| errorReasonType | errorReasonType | 保持不变 |
| difficultyLevel | difficultyLevel | 保持不变 |
| - | charId | 从464开始递增 |
| - | createdAt | 当前时间戳 |
| - | updatedAt | 当前时间戳 |

### 5. 预期结果
- 云数据库数据量从462条增加到553条
- 新数据的`charId`范围：464-554
- 所有新数据都包含完整的时间戳字段
- 没有重复数据

### 6. 执行命令
```bash
# 运行转换脚本
node add_data_to_cloud.js

# 验证合并结果
node verify_merged_data.js
```

## 风险与应对
- **数据重复**：脚本会自动检查重复数据，避免重复添加
- **数据格式错误**：验证脚本会检查所有数据结构
- **文件损坏**：执行前会创建备份文件

## 后续工作
- 确认合并结果后，可以考虑将新数据导入到实际的云数据库中
- 更新相关文档，记录数据添加情况