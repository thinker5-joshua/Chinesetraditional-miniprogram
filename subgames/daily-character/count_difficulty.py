#!/usr/bin/env python3
"""
统计数据文件中不同难度级别的汉字数量
"""

import re
import os


def parse_data_file(file_path):
    """
    解析 data-optimized.js 文件，提取 characters 数组
    """
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # 使用正则表达式提取每个条目
        pattern = r'\{[^\}]*\}'
        matches = re.findall(pattern, content, re.DOTALL)
        
        characters = []
        
        for match in matches:
            # 提取难度级别
            difficulty_match = re.search(r'"difficultyLevel"\s*:\s*"([^"]+)"', match)
            if difficulty_match:
                difficulty = difficulty_match.group(1)
                characters.append(difficulty)
        
        print(f"成功提取到 {len(characters)} 个汉字的难度级别")
        return characters
        
    except Exception as e:
        print(f"错误: {e}")
        return []


def count_difficulty_levels(difficulty_list):
    """
    统计不同难度级别的数量
    """
    counts = {}
    
    for difficulty in difficulty_list:
        if difficulty in counts:
            counts[difficulty] += 1
        else:
            counts[difficulty] = 1
    
    return counts


def generate_report(counts):
    """
    生成难度级别统计报告
    """
    print("\n=== 难度级别统计报告 ===")
    
    # 定义难度级别顺序
    level_order = ['初级', '中级', '高级', '挑战级']
    total = 0
    
    for level in level_order:
        count = counts.get(level, 0)
        total += count
        print(f"{level}: {count} 个")
    
    # 显示其他可能的级别
    other_levels = [level for level in counts if level not in level_order]
    for level in other_levels:
        count = counts[level]
        total += count
        print(f"其他({level}): {count} 个")
    
    print(f"\n总计: {total} 个汉字")
    print("=====================")


def main():
    """
    主函数
    """
    file_path = 'data-optimized.js'
    
    if not os.path.exists(file_path):
        print(f"错误：文件不存在: {file_path}")
        return
    
    # 解析文件
    difficulty_list = parse_data_file(file_path)
    
    if not difficulty_list:
        print("错误：无法提取难度级别数据")
        return
    
    # 统计难度级别
    counts = count_difficulty_levels(difficulty_list)
    
    # 生成报告
    generate_report(counts)


if __name__ == '__main__':
    main()
