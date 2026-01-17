#!/usr/bin/env python3
"""
简单的重复项检查脚本
使用更宽松的解析方法
"""

import re
import os


def extract_characters(file_path):
    """
    提取 characters 数组中的所有条目
    """
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # 使用正则表达式提取每个条目
        # 匹配 { ... } 格式的条目
        pattern = r'\{[^\}]*\}'
        matches = re.findall(pattern, content, re.DOTALL)
        
        characters = []
        
        for i, match in enumerate(matches):
            # 提取 char 和 correctPronunciation
            char_match = re.search(r'"char"\s*:\s*"([^"]+)"', match)
            pronunciation_match = re.search(r'"correctPronunciation"\s*:\s*"([^"]+)"', match)
            id_match = re.search(r'"id"\s*:\s*(\d+)', match)
            
            if char_match and pronunciation_match:
                char = char_match.group(1)
                pronunciation = pronunciation_match.group(1)
                char_id = id_match.group(1) if id_match else i+1
                
                characters.append({
                    'id': int(char_id),
                    'char': char,
                    'correctPronunciation': pronunciation
                })
        
        print(f"成功提取到 {len(characters)} 个汉字条目")
        return characters
        
    except Exception as e:
        print(f"错误: {e}")
        return []


def check_duplicates(characters):
    """
    检查重复项
    """
    seen = {}
    duplicates = []
    
    for i, item in enumerate(characters):
        char = item.get('char')
        pronunciation = item.get('correctPronunciation')
        char_id = item.get('id')
        
        if not char or not pronunciation:
            continue
        
        key = (char, pronunciation)
        if key in seen:
            # 找到重复项
            duplicate_info = {
                'current_id': char_id,
                'current_index': i + 1,
                'char': char,
                'correctPronunciation': pronunciation,
                'first_id': seen[key]['id'],
                'first_index': seen[key]['index']
            }
            duplicates.append(duplicate_info)
        else:
            # 记录首次出现的位置
            seen[key] = {
                'id': char_id,
                'index': i + 1
            }
    
    return duplicates


def display_duplicates(duplicates):
    """
    显示重复项
    """
    print(f"\n=== 重复项报告 ===")
    print(f"总重复项数: {len(duplicates)}")
    
    if duplicates:
        print("\n详细重复项列表:")
        for i, dup in enumerate(duplicates):
            print(f"\n{i+1}. 重复项:")
            print(f"   字: {dup['char']}")
            print(f"   正确读音: {dup['correctPronunciation']}")
            print(f"   首次出现: ID={dup['first_id']} (位置: {dup['first_index']})")
            print(f"   重复出现: ID={dup['current_id']} (位置: {dup['current_index']})")
    else:
        print("\n无重复项")


def main():
    """
    主函数
    """
    file_path = 'data-optimized.js'
    
    if not os.path.exists(file_path):
        print(f"文件不存在: {file_path}")
        return
    
    # 提取条目
    characters = extract_characters(file_path)
    if not characters:
        return
    
    # 检查重复项
    duplicates = check_duplicates(characters)
    
    # 显示重复项
    display_duplicates(duplicates)


if __name__ == '__main__':
    main()
