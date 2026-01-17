#!/usr/bin/env python3
"""
检查 data-optimized.js 文件中的重复项
基于字（char）和正确读音（correctPronunciation）的组合检查重复项
"""

import json
import re
import os


def parse_data_file(file_path):
    """
    解析 data-optimized.js 文件，提取 characters 数组
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 使用正则表达式提取 characters 数组
        match = re.search(r'const characters = \[(.*?)\];', content, re.DOTALL)
        if not match:
            print("错误：无法找到 characters 数组")
            return []
        
        # 修复 JSON 格式
        json_str = '[' + match.group(1) + ']'
        # 移除注释
        json_str = re.sub(r'//.*?$', '', json_str, flags=re.MULTILINE)
        # 处理多余的逗号
        json_str = re.sub(r',\s*}', '}', json_str)
        json_str = re.sub(r',\s*\]', ']', json_str)
        # 处理单引号
        json_str = json_str.replace("'", '"')
        # 处理控制字符
        json_str = ''.join(char for char in json_str if ord(char) >= 32)
        # 处理乱码字符，替换为空格
        json_str = ''.join(char if ord(char) < 128 or (ord(char) >= 0x4e00 and ord(char) <= 0x9fff) else ' ' for char in json_str)
        
        # 解析 JSON
        characters = json.loads(json_str)
        print(f"成功读取到 {len(characters)} 个汉字数据")
        return characters
    except Exception as e:
        print(f"错误：{e}")
        return []


def check_duplicates(characters):
    """
    检查重复项，基于 char 和 correctPronunciation 的组合
    """
    seen = {}
    duplicates = []
    
    for i, item in enumerate(characters):
        char = item.get('char')
        correct_pronunciation = item.get('correctPronunciation')
        
        if not char or not correct_pronunciation:
            continue
        
        key = (char, correct_pronunciation)
        if key in seen:
            # 找到重复项
            duplicate_info = {
                'current_id': item.get('id'),
                'current_index': i + 1,
                'char': char,
                'correctPronunciation': correct_pronunciation,
                'first_id': seen[key]['id'],
                'first_index': seen[key]['index']
            }
            duplicates.append(duplicate_info)
        else:
            # 记录首次出现的位置
            seen[key] = {
                'id': item.get('id'),
                'index': i + 1
            }
    
    return duplicates


def generate_report(duplicates):
    """
    生成重复项报告
    """
    report = {
        'total_duplicates': len(duplicates),
        'duplicate_items': duplicates
    }
    
    # 保存报告到文件
    with open('duplicate_report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"\n=== 重复项报告 ===")
    print(f"总重复项数: {len(duplicates)}")
    print("\n详细重复项列表:")
    
    if duplicates:
        for i, dup in enumerate(duplicates):
            print(f"\n{ i+1 }. 重复项:")
            print(f"   字: {dup['char']}")
            print(f"   正确读音: {dup['correctPronunciation']}")
            print(f"   首次出现: ID={dup['first_id']} (位置: {dup['first_index']})")
            print(f"   重复出现: ID={dup['current_id']} (位置: {dup['current_index']})")
    else:
        print("   无重复项")
    
    print(f"\n报告已保存至: duplicate_report.json")
    return report


def remove_duplicates(characters):
    """
    删除重复项，保留前面的，删除后面的
    """
    seen = {}
    unique_characters = []
    
    for item in characters:
        char = item.get('char')
        correct_pronunciation = item.get('correctPronunciation')
        
        if not char or not correct_pronunciation:
            unique_characters.append(item)
            continue
        
        key = (char, correct_pronunciation)
        if key not in seen:
            seen[key] = True
            unique_characters.append(item)
    
    return unique_characters


def reorder_ids(characters):
    """
    重新排序 ID 号
    """
    for i, item in enumerate(characters, 1):
        item['id'] = i
    return characters


def write_data_file(file_path, characters):
    """
    将处理后的数据写回文件
    """
    try:
        # 读取原文件内容
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 生成新的 characters 数组字符串
        characters_str = json.dumps(characters, ensure_ascii=False, indent=2)
        
        # 替换原文件中的 characters 数组
        new_content = re.sub(r'const characters = \[(.*?)\];', f'const characters = {characters_str};', content, flags=re.DOTALL)
        
        # 写入文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"\n成功写回数据到: {file_path}")
        print(f"处理后的数据量: {len(characters)} 个汉字")
        return True
    except Exception as e:
        print(f"错误：{e}")
        return False


def main():
    """
    主函数
    """
    file_path = 'data-optimized.js'
    
    # 检查文件是否存在
    if not os.path.exists(file_path):
        print(f"错误：文件不存在: {file_path}")
        return
    
    # 步骤1：读取和解析数据
    characters = parse_data_file(file_path)
    if not characters:
        return
    
    # 步骤2：检查重复项
    duplicates = check_duplicates(characters)
    
    # 步骤3：生成并展示重复项报告
    generate_report(duplicates)
    
    # 步骤4：删除重复项
    if duplicates:
        print("\n=== 删除重复项 ===")
        unique_characters = remove_duplicates(characters)
        print(f"删除前: {len(characters)} 个汉字")
        print(f"删除后: {len(unique_characters)} 个汉字")
        print(f"删除了 {len(characters) - len(unique_characters)} 个重复项")
        
        # 步骤5：重新排序 ID 号
        print("\n=== 重新排序 ID 号 ===")
        reordered_characters = reorder_ids(unique_characters)
        print("ID 号已重新排序")
        
        # 步骤6：写回文件
        write_data_file(file_path, reordered_characters)
        
        # 步骤7：验证最终结果
        print("\n=== 验证最终结果 ===")
        final_characters = parse_data_file(file_path)
        final_duplicates = check_duplicates(final_characters)
        
        if final_duplicates:
            print("警告：仍存在重复项！")
            generate_report(final_duplicates)
        else:
            print("验证通过：无重复项！")
            print(f"最终数据量: {len(final_characters)} 个汉字")
    else:
        print("\n无需删除重复项，文件中无重复内容")


if __name__ == '__main__':
    main()
