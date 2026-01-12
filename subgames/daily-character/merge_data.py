#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
易读错字数据合并脚本
将extracted_data.json中的数据合并到data-optimized.js中
"""

import json
import re
import os


def read_extracted_data(file_path):
    """
    读取extracted_data.json文件
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def parse_data_optimized(file_path):
    """
    解析data-optimized.js文件，提取characters数组
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 使用正则表达式提取characters数组
    match = re.search(r'const characters = \[(.*?)\];', content, re.DOTALL)
    if match:
        # 修复JSON格式，确保字符串使用双引号
        json_str = '[' + match.group(1) + ']'
        # 移除注释
        json_str = re.sub(r'//.*?$', '', json_str, flags=re.MULTILINE)
        # 处理多余的逗号
        json_str = re.sub(r',\s*}', '}', json_str)
        json_str = re.sub(r',\s*\]', ']', json_str)
        # 处理单引号
        json_str = json_str.replace("'", '"')
        # 解析JSON
        try:
            return json.loads(json_str)
        except json.JSONDecodeError as e:
            print(f"解析data-optimized.js失败: {e}")
            return []
    return []


def write_data_optimized(file_path, characters):
    """
    将更新后的characters数组写回data-optimized.js文件
    """
    # 读取原文件内容
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 生成新的characters数组字符串
    characters_str = json.dumps(characters, ensure_ascii=False, indent=2)
    
    # 替换原文件中的characters数组
    new_content = re.sub(r'const characters = \[(.*?)\];', f'const characters = {characters_str};', content, flags=re.DOTALL)
    
    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)


def merge_data():
    """
    合并数据
    """
    # 文件路径
    extracted_data_path = 'extracted_data.json'
    data_optimized_path = 'data-optimized.js'
    
    # 检查文件是否存在
    if not os.path.exists(extracted_data_path):
        print(f"文件不存在: {extracted_data_path}")
        return
    
    if not os.path.exists(data_optimized_path):
        print(f"文件不存在: {data_optimized_path}")
        return
    
    # 读取数据
    extracted_data = read_extracted_data(extracted_data_path)
    existing_data = parse_data_optimized(data_optimized_path)
    
    print(f"读取到 {len(extracted_data)} 条新数据")
    print(f"读取到 {len(existing_data)} 条现有数据")
    
    # 构建现有数据的索引，用于快速查找重复项
    existing_index = {}
    for item in existing_data:
        key = (item.get('char'), item.get('correctPronunciation'))
        existing_index[key] = item
    
    # 统计信息
    new_count = 0
    duplicate_count = 0
    updated_count = 0
    duplicates = []
    
    # 遍历新数据
    for item in extracted_data:
        char = item.get('char')
        correct_pronunciation = item.get('correctPronunciation')
        wrong_pronunciation = item.get('wrongPronunciation')
        related_phrases = item.get('relatedPhrases', [])
        
        if not char or not correct_pronunciation:
            continue
        
        # 检查重复项
        key = (char, correct_pronunciation)
        if key in existing_index:
            # 重复项处理
            duplicate_count += 1
            duplicates.append(key)
            
            # 获取现有项
            existing_item = existing_index[key]
            
            # 更新错误读音
            if wrong_pronunciation and wrong_pronunciation not in existing_item.get('wrongPronunciations', []):
                existing_item.setdefault('wrongPronunciations', []).append(wrong_pronunciation)
                updated_count += 1
            
            # 更新相关词组
            for phrase in related_phrases:
                if phrase and phrase not in existing_item.get('relatedPhrases', []):
                    existing_item.setdefault('relatedPhrases', []).append(phrase)
                    updated_count += 1
        else:
            # 新增项处理
            new_count += 1
            
            # 分配新的id
            new_id = max([item.get('id', 0) for item in existing_data]) + 1 if existing_data else 1
            
            # 创建新项
            new_item = {
                'id': new_id,
                'char': char,
                'correctPronunciation': correct_pronunciation,
                'wrongPronunciations': [wrong_pronunciation] if wrong_pronunciation else [],
                'relatedPhrases': related_phrases,
                'explanation': '',  # 保持为空
                'errorReasonType': 4,  # 默认值
                'difficultyLevel': '初级'  # 默认值
            }
            
            # 添加到现有数据
            existing_data.append(new_item)
            existing_index[key] = new_item
    
    # 保存更新后的数据
    write_data_optimized(data_optimized_path, existing_data)
    
    # 打印统计信息
    print(f"合并完成！")
    print(f"新增字数: {new_count}")
    print(f"重复字数: {duplicate_count}")
    print(f"更新字数: {updated_count}")
    print(f"总字数: {len(existing_data)}")
    
    # 打印重复项
    if duplicates:
        print("\n重复的字（按char和correctPronunciation）:")
        for i, (char, pronunciation) in enumerate(duplicates[:20]):  # 只打印前20个
            print(f"{i+1}. {char} - {pronunciation}")
        if len(duplicates) > 20:
            print(f"... 还有 {len(duplicates) - 20} 个重复项")


if __name__ == '__main__':
    merge_data()
