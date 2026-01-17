#!/usr/bin/env python3
"""
查找JSON格式错误的具体位置
"""

import json
import re


def find_json_error(file_path):
    """
    查找JSON格式错误的具体位置
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取characters数组
        match = re.search(r'const characters = \[(.*?)\];', content, re.DOTALL)
        if not match:
            print("无法找到characters数组")
            return
        
        json_str = '[' + match.group(1) + ']'
        # 移除注释
        json_str = re.sub(r'//.*?$', '', json_str, flags=re.MULTILINE)
        # 处理单引号
        json_str = json_str.replace("'", '"')
        # 处理控制字符
        json_str = ''.join(char for char in json_str if ord(char) >= 32)
        
        # 尝试逐步解析
        print(f"总字符数: {len(json_str)}")
        
        # 尝试找到错误位置
        for i in range(1, len(json_str), 1000):
            try:
                # 尝试解析到当前位置
                test_str = json_str[:i]
                # 修复可能的不完整结构
                test_str = test_str.rstrip()
                if test_str.endswith('['):
                    test_str += ']'
                elif test_str.endswith('{'):
                    test_str += '}'
                json.loads(test_str)
                print(f"解析到位置 {i} 成功")
            except Exception as e:
                # 找到错误位置
                print(f"错误位置: {i}")
                print(f"错误信息: {e}")
                # 显示错误位置附近的内容
                start = max(0, i - 200)
                end = min(len(json_str), i + 200)
                print(f"错误位置附近内容:\n{json_str[start:end]}")
                return
        
        print("未找到错误")
        
    except Exception as e:
        print(f"错误: {e}")


if __name__ == '__main__':
    find_json_error('data-optimized.js')
