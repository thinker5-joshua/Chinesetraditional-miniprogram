#!/usr/bin/env python3
"""
修复data-optimized.js文件中的多行字符串语法错误
将包含实际换行符的多行字符串转换为使用\n转义的单行字符串
"""

import os
import re


def fix_multiline_strings(input_file, output_file):
    """
    修复文件中的多行字符串
    
    Args:
        input_file: 输入文件路径
        output_file: 输出文件路径
    """
    try:
        # 读取文件内容
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"读取文件: {input_file}")
        print(f"文件大小: {len(content)} 字符")
        
        # 创建备份文件
        backup_file = input_file + '.backup'
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"创建备份文件: {backup_file}")
        
        # 修复多行字符串
        # 匹配双引号内包含换行符的字符串
        def replace_multiline_string(match):
            """替换匹配到的多行字符串"""
            string_content = match.group(1)
            # 将实际换行符替换为\n
            fixed_content = string_content.replace('\n', '\\n')
            # 移除多余的空白字符（保留单个空格）
            fixed_content = re.sub(r'\s+', ' ', fixed_content).strip()
            return f'"{fixed_content}"'
        
        # 使用正则表达式匹配所有双引号字符串
        # 注意：这个正则可能无法处理所有边缘情况，但对于当前文件应该足够
        pattern = r'"([^"]*)"'
        fixed_content = re.sub(pattern, replace_multiline_string, content, flags=re.DOTALL)
        
        # 写入修复后的文件
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(fixed_content)
        
        print(f"修复完成，输出到: {output_file}")
        print(f"修复后文件大小: {len(fixed_content)} 字符")
        
        # 统计修复的字符串数量
        # 再次读取文件，计算修复前后的差异
        with open(input_file, 'r', encoding='utf-8') as f:
            original_lines = f.readlines()
        
        with open(output_file, 'r', encoding='utf-8') as f:
            fixed_lines = f.readlines()
        
        print(f"原文件行数: {len(original_lines)}")
        print(f"修复后行数: {len(fixed_lines)}")
        
        print("\n修复成功！")
        
    except Exception as e:
        print(f"修复过程中出现错误: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    # 定义文件路径
    input_file = 'data-optimized.js'
    output_file = 'data-optimized.js'
    
    # 检查文件是否存在
    if not os.path.exists(input_file):
        print(f"文件不存在: {input_file}")
    else:
        print("开始修复多行字符串语法错误...")
        fix_multiline_strings(input_file, output_file)
