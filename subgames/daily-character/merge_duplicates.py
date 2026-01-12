#!/usr/bin/env python3
"""
处理data-optimized.js文件重复条目
1. 合并重复条目的wrongPronunciations和relatedPhrases
2. 删除重复条目
3. 重新生成ID
"""

import re
import json

def merge_duplicates(input_file, output_file):
    """
    处理重复条目并重新生成ID
    
    Args:
        input_file: 输入文件路径
        output_file: 输出文件路径
    """
    # 读取文件内容
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取JavaScript数组部分
    match = re.search(r'const characters = \[(.*?)\];', content, re.DOTALL)
    if not match:
        raise ValueError("无法找到characters数组")
    
    # 解析为JSON对象列表
    json_str = '[' + match.group(1) + ']'
    characters = json.loads(json_str)
    
    print(f"原始条目数: {len(characters)}")
    
    # 按(char, correctPronunciation)分组
    grouped = {}
    for char_item in characters:
        key = (char_item['char'], char_item['correctPronunciation'])
        if key not in grouped:
            grouped[key] = []
        grouped[key].append(char_item)
    
    # 合并每组中的条目
    merged_characters = []
    for key, items in grouped.items():
        if len(items) == 1:
            # 无重复，直接添加
            merged_characters.append(items[0])
        else:
            # 有重复，合并内容
            base_item = items[0].copy()
            
            # 初始化集合用于去重
            wrong_pronunciations = set(base_item.get('wrongPronunciations', []))
            related_phrases = set(base_item.get('relatedPhrases', []))
            
            # 从其他条目中提取新内容
            for item in items[1:]:
                # 合并错误读音
                for wp in item.get('wrongPronunciations', []):
                    wrong_pronunciations.add(wp)
                # 合并关联词组
                for rp in item.get('relatedPhrases', []):
                    related_phrases.add(rp)
            
            # 更新基础条目
            base_item['wrongPronunciations'] = list(wrong_pronunciations)
            base_item['relatedPhrases'] = list(related_phrases)
            
            merged_characters.append(base_item)
            print(f"合并条目: {key[0]} ({key[1]}), 原条目数: {len(items)}")
    
    # 重新生成ID
    for i, char_item in enumerate(merged_characters, 1):
        char_item['id'] = i
    
    # 生成新的文件内容
    # 保留文件头部注释
    header_match = re.search(r'(// 每日一字汉字数据 - 优化版.*?const characters = )', content, re.DOTALL)
    if header_match:
        header = header_match.group(1)
    else:
        header = 'const characters = '
    
    # 生成新的数组内容
    new_array = json.dumps(merged_characters, ensure_ascii=False, indent=2)
    new_content = header + new_array + ';'
    
    # 保存处理后的文件
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"处理后条目数: {len(merged_characters)}")
    print(f"删除的重复条目数: {len(characters) - len(merged_characters)}")
    print(f"处理后的文件已保存至: {output_file}")

if __name__ == "__main__":
    input_file = 'data-optimized.js'
    output_file = 'data-optimized-merged.js'
    
    merge_duplicates(input_file, output_file)
