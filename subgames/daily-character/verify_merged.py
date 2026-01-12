#!/usr/bin/env python3
"""
验证处理后的文件是否无重复条目
"""

import re
import json

# 读取处理后的文件内容
with open('data-optimized-merged.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取JavaScript数组部分
match = re.search(r'const characters = \[(.*?)\];', content, re.DOTALL)
if not match:
    raise ValueError('无法找到characters数组')

# 解析为JSON对象列表
json_str = '[' + match.group(1) + ']'
characters = json.loads(json_str)

print(f'处理后条目数: {len(characters)}')

# 检测重复条目
seen = set()
duplicates = []

for i, char_item in enumerate(characters, 1):
    key = (char_item['char'], char_item['correctPronunciation'])
    if key in seen:
        duplicates.append({
            'id': char_item['id'],
            'char': char_item['char'],
            'correctPronunciation': char_item['correctPronunciation']
        })
    else:
        seen.add(key)

print(f'重复条目数: {len(duplicates)}')
if duplicates:
    print('重复条目列表:')
    for dup in duplicates:
        print(f'ID: {dup["id"]}, 字: {dup["char"]}, 正确读音: {dup["correctPronunciation"]}')
else:
    print('未发现重复条目')

# 验证ID是否连续
ids = [item['id'] for item in characters]
ids.sort()
if ids == list(range(1, len(characters) + 1)):
    print('ID连续且唯一')
else:
    print('ID不连续或有重复')
    # 找出缺失的ID
    expected_ids = set(range(1, len(characters) + 1))
    actual_ids = set(ids)
    missing_ids = expected_ids - actual_ids
    if missing_ids:
        print(f'缺失的ID: {sorted(missing_ids)}')
    duplicate_ids = [id for id in ids if ids.count(id) > 1]
    if duplicate_ids:
        print(f'重复的ID: {sorted(set(duplicate_ids))}')
