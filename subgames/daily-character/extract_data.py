#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
易读错字数据提取脚本
从易读错字.txt文件中提取字、正确读音、错误读音、相关词组和原始文本
"""

import re
import json
import os


def extract_data_from_file(file_path):
    """
    从文件中提取易读错字数据
    """
    data = []
    # 暂时不使用seen_chars进行去重
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for line_num, line in enumerate(lines, 1):
        line = line.strip()
        if not line:
            continue
        
        # 跳过图片标记行
        if '图片' in line:
            continue
        
        # 处理格式5: 成语格式
        # 例如：爱憎zēng（zèng）分明
        match5 = re.search(r'([\u4e00-\u9fa5]*)([\u4e00-\u9fa5])([a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]+)\s*[（(]([a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]+)[）)]\s*([\u4e00-\u9fa5]*)', line)
        if match5:
            prefix = match5.group(1).strip() if match5.group(1) else ''
            char = match5.group(2).strip()
            correct_pronunciation = match5.group(3).strip()
            wrong_pronunciation = match5.group(4).strip()
            suffix = match5.group(5).strip() if match5.group(5) else ''
            
            # 构建完整成语
            full_phrase = f"{prefix}{char}{suffix}" if prefix or suffix else char
            
            if char:
                data.append({
                    "char": char,
                    "correctPronunciation": correct_pronunciation,
                    "wrongPronunciation": wrong_pronunciation,
                    "relatedPhrases": [full_phrase],
                    "originalText": line
                })
            continue
    
    return data


def main():
    """
    主函数
    """
    file_path = '易读错字.txt'
    output_file = 'extracted_data.json'
    
    if not os.path.exists(file_path):
        print(f"文件不存在: {file_path}")
        return
    
    print(f"开始从 {file_path} 提取成语格式数据...")
    data = extract_data_from_file(file_path)
    
    print(f"提取完成，共提取 {len(data)} 条成语格式数据")
    
    # 读取现有数据
    existing_data = []
    if os.path.exists(output_file):
        with open(output_file, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
        print(f"读取到 {len(existing_data)} 条现有数据")
    
    # 合并数据（暂时不考虑去重）
    combined_data = existing_data + data
    print(f"合并后共有 {len(combined_data)} 条数据")
    
    # 保存数据到JSON文件
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(combined_data, f, ensure_ascii=False, indent=2)
    
    print(f"数据已保存到 {output_file}")


if __name__ == '__main__':
    main()
