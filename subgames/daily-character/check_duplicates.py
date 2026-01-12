#!/usr/bin/env python3
"""
检查data-optimized.js文件中是否存在重复的(char, correctPronunciation)组合
"""

import re
import json

# 读取文件内容
with open('data-optimized-merged.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取JavaScript数组部分
match = re.search(r'const characters = \[(.*?)\];', content, re.DOTALL)
if not match:
    raise ValueError('无法找到characters数组')

# 解析为JSON对象列表
json_str = '[' + match.group(1) + ']'
characters = json.loads(json_str)

# 检测重复条目
seen = {}
duplicates = []

for i, char_item in enumerate(characters, 1):
    key = (char_item['char'], char_item['correctPronunciation'])
    if key in seen:
        duplicates.append({
            'id': char_item['id'],
            'char': char_item['char'],
            'correctPronunciation': char_item['correctPronunciation'],
            'first_id': seen[key]
        })
    else:
        seen[key] = char_item['id']

# 输出结果
print(f'总条目数: {len(characters)}')
print(f'重复条目数: {len(duplicates)}')
if duplicates:
    print('重复条目列表:')
    for dup in duplicates:
        print(f'ID: {dup["id"]}, 字: {dup["char"]}, 正确读音: {dup["correctPronunciation"]}, 首次出现ID: {dup["first_id"]}')
else:
    print('未发现重复条目')
