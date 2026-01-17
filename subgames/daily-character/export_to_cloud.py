#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数据导出脚本：将 data-optimized.js 导出为 JSON 格式
用于云数据库导入
"""

import os
import re
import json


def export_to_json(input_file, output_file):
    """
    从 data-optimized.js 文件中提取数据并导出为 JSON 格式
    
    Args:
        input_file: 输入文件路径
        output_file: 输出 JSON 文件路径
    
    Returns:
        int: 导出的数据条数
    """
    try:
        # 读取文件内容
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取 characters 数组
        # 使用正则表达式匹配 characters 数组部分
        match = re.search(r'const characters = \[(.*?)\];', content, re.DOTALL)
        
        if not match:
            raise ValueError("未找到 characters 数组")
        
        # 提取数组内容
        array_content = match.group(1)
        
        # 修复 JSON 格式（处理可能的语法问题）
        # 移除多余的逗号
        array_content = re.sub(r',\s*([}\]])', r' \1', array_content)
        
        # 添加方括号使其成为有效的 JSON 数组
        json_content = f"[{array_content}]"
        
        # 解析 JSON
        characters = json.loads(json_content)
        
        # 验证数据结构
        if not isinstance(characters, list):
            raise ValueError("解析后的数据不是数组")
        
        # 检查数据字段
        required_fields = ['id', 'char', 'correctPronunciation', 'wrongPronunciations', 
                          'relatedPhrases', 'explanation', 'errorReasonType', 'difficultyLevel']
        
        for i, char_data in enumerate(characters):
            for field in required_fields:
                if field not in char_data:
                    print(f"警告: 第 {i+1} 个数据缺少字段: {field}")
        
        # 保存为 JSON 文件
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(characters, f, ensure_ascii=False, indent=2)
        
        print(f"✓ 数据导出成功！")
        print(f"✓ 导出文件: {output_file}")
        print(f"✓ 导出数据条数: {len(characters)}")
        
        return len(characters)
        
    except Exception as e:
        print(f"✗ 导出失败: {str(e)}")
        raise


def main():
    """
    主函数
    """
    # 文件路径
    input_file = os.path.join(os.path.dirname(__file__), 'data-optimized.js')
    output_file = os.path.join(os.path.dirname(__file__), 'export_data.json')
    
    print("开始导出数据...")
    print(f"输入文件: {input_file}")
    print(f"输出文件: {output_file}")
    print("=" * 50)
    
    try:
        count = export_to_json(input_file, output_file)
        print("=" * 50)
        print(f"✓ 导出完成，共 {count} 条数据")
        return 0
    except Exception as e:
        print(f"✗ 导出过程中发生错误: {str(e)}")
        return 1


if __name__ == '__main__':
    exit(main())
