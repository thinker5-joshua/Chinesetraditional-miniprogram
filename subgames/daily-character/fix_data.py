#!/usr/bin/env python3
"""
修复data-optimized.js文件
1. 重新生成连续唯一的ID
2. 检查并报告重复的(char, correctPronunciation)组合
"""

import re
import json

def fix_data_file(input_file, output_file, report_file):
    """
    修复data-optimized.js文件
    
    Args:
        input_file: 输入文件路径
        output_file: 输出文件路径
        report_file: 重复条目报告文件路径
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
    
    # 重新分配ID
    for i, char_item in enumerate(characters, 1):
        char_item['id'] = i
    
    # 检测重复条目
    seen = {}
    duplicates = []
    
    for i, char_item in enumerate(characters, 1):
        key = (char_item['char'], char_item['correctPronunciation'])
        if key in seen:
            duplicates.append({
                'id': i,
                'char': char_item['char'],
                'correctPronunciation': char_item['correctPronunciation'],
                'first_id': seen[key]
            })
        else:
            seen[key] = i
    
    # 生成修复后的文件内容
    # 保留文件头部注释
    header_match = re.search(r'(// 每日一字汉字数据 - 优化版.*?const characters = )', content, re.DOTALL)
    if header_match:
        header = header_match.group(1)
    else:
        header = 'const characters = '
    
    # 生成新的数组内容
    new_array = json.dumps(characters, ensure_ascii=False, indent=2)
    new_content = header + new_array + ';'
    
    # 保存修复后的文件
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    # 生成重复条目报告
    report = {
        'total_items': len(characters),
        'duplicate_count': len(duplicates),
        'duplicates': duplicates
    }
    
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"修复完成！")
    print(f"总条目数: {len(characters)}")
    print(f"重复条目数: {len(duplicates)}")
    print(f"修复后的文件已保存至: {output_file}")
    print(f"重复条目报告已保存至: {report_file}")

if __name__ == "__main__":
    input_file = 'data-optimized.js'
    output_file = 'data-optimized-fixed.js'
    report_file = 'duplicate_report.json'
    
    fix_data_file(input_file, output_file, report_file)