#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
易读错字数据完善脚本
使用DeepSeek API补充data-optimized.js中的错误读音、关联词组、字典解释、错误原因分类和难度等级
"""

import json
import re
import os
import requests
import time


# DeepSeek API配置
API_KEY = "sk-dff3aead60d64901b5ecfe1a62043b00"
API_URL = "https://api.deepseek.com/v1/chat/completions"
MODEL = "deepseek-chat"


def call_deepseek_api(prompt):
    """
    调用DeepSeek API
    """
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    data = {
        "model": MODEL,
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 500,
        "temperature": 0.7
    }
    
    try:
        response = requests.post(API_URL, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        return result["choices"][0]["message"]["content"].strip()
    except requests.RequestException as e:
        print(f"API调用失败: {e}")
        return ""
    except (KeyError, IndexError) as e:
        print(f"API响应解析失败: {e}")
        return ""


def get_wrong_pronunciations(char, correct_pronunciation):
    """
    获取错误读音
    """
    prompt = f"有此{char}字，读音为{correct_pronunciation}，请查询其通常可能会读错的错误读音1到3个，直接返回错误读音列表，每个读音用逗号分隔，不要包含其他内容。"
    response = call_deepseek_api(prompt)
    
    if not response:
        return []
    
    # 解析响应
    wrong_pronunciations = [wp.strip() for wp in response.split(",")]
    # 过滤空值
    wrong_pronunciations = [wp for wp in wrong_pronunciations if wp]
    
    return wrong_pronunciations


def get_related_phrases(char, correct_pronunciation):
    """
    获取关联词组
    """
    prompt = f"有此{char}字，读音为{correct_pronunciation}，含有此字念此音的关联词组1到4个，直接返回关联词组列表，每个词组用逗号分隔，不要包含其他内容。"
    response = call_deepseek_api(prompt)
    
    if not response:
        return []
    
    # 解析响应
    related_phrases = [rp.strip() for rp in response.split(",")]
    # 过滤空值
    related_phrases = [rp for rp in related_phrases if rp]
    
    return related_phrases


def get_explanation(char, correct_pronunciation):
    """
    获取字典解释
    """
    prompt = f"有此{char}字，读音为{correct_pronunciation}，请给出字典对此字此读音的通常解释，直接返回解释内容，不要包含其他内容。"
    response = call_deepseek_api(prompt)
    
    return response


def get_error_reason_and_difficulty(char, correct_pronunciation, wrong_pronunciations):
    """
    获取错误原因分类和难度等级
    """
    wp_str = ",".join(wrong_pronunciations) if wrong_pronunciations else "无"
    prompt = f"有此{char}字，读音为{correct_pronunciation}，常见错误读音有{wp_str}，请判断其常见错误原因分类（1:形声字误读, 2:多音字误读, 3:声母误读, 4:韵母误读, 5:声调误读, 6:形似字误读, 7:方言影响误读, 8:其他误读原因）和测试难度等级（初级、中级、高级、挑战级），直接返回分类数字和难度等级，用逗号分隔，不要包含其他内容。"
    response = call_deepseek_api(prompt)
    
    if not response:
        return None, None
    
    # 解析响应
    parts = [part.strip() for part in response.split(",")]
    if len(parts) < 2:
        return None, None
    
    error_reason_type = parts[0]
    difficulty_level = parts[1]
    
    # 验证error_reason_type是否为数字
    try:
        error_reason_type = int(error_reason_type)
        if error_reason_type < 1 or error_reason_type > 8:
            error_reason_type = None
    except ValueError:
        error_reason_type = None
    
    # 验证difficulty_level
    valid_levels = ["初级", "中级", "高级", "挑战级"]
    if difficulty_level not in valid_levels:
        difficulty_level = None
    
    return error_reason_type, difficulty_level


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


def enhance_data():
    """
    完善数据
    """
    # 文件路径
    data_optimized_path = 'data-optimized.js'
    
    # 检查文件是否存在
    if not os.path.exists(data_optimized_path):
        print(f"文件不存在: {data_optimized_path}")
        return
    
    # 读取数据
    characters = parse_data_optimized(data_optimized_path)
    
    print(f"读取到 {len(characters)} 个字")
    
    # 统计信息
    total_chars = len(characters)
    updated_wrong_pronunciations = 0
    updated_related_phrases = 0
    updated_explanations = 0
    updated_error_reason_types = 0
    updated_difficulty_levels = 0
    
    # 遍历每个字
    for i, char_data in enumerate(characters):
        char = char_data.get('char')
        correct_pronunciation = char_data.get('correctPronunciation')
        wrong_pronunciations = char_data.get('wrongPronunciations', [])
        related_phrases = char_data.get('relatedPhrases', [])
        explanation = char_data.get('explanation', '')
        error_reason_type = char_data.get('errorReasonType')
        difficulty_level = char_data.get('difficultyLevel')
        
        print(f"\n处理第 {i+1} 个字: {char} ({correct_pronunciation})")
        
        # 补充错误读音
        if len(wrong_pronunciations) < 3:
            new_wrong_pronunciations = get_wrong_pronunciations(char, correct_pronunciation)
            # 添加新的错误读音，最多3个
            for wp in new_wrong_pronunciations:
                if wp not in wrong_pronunciations and len(wrong_pronunciations) < 3:
                    wrong_pronunciations.append(wp)
                    updated_wrong_pronunciations += 1
            char_data['wrongPronunciations'] = wrong_pronunciations
            # 避免API调用过于频繁
            time.sleep(1)
        
        # 补充关联词组
        if len(related_phrases) < 4:
            new_related_phrases = get_related_phrases(char, correct_pronunciation)
            # 添加新的关联词组，最多4个
            for rp in new_related_phrases:
                if rp not in related_phrases and len(related_phrases) < 4:
                    related_phrases.append(rp)
                    updated_related_phrases += 1
            char_data['relatedPhrases'] = related_phrases
            # 避免API调用过于频繁
            time.sleep(1)
        
        # 补充字典解释
        if not explanation:
            new_explanation = get_explanation(char, correct_pronunciation)
            if new_explanation:
                char_data['explanation'] = new_explanation
                updated_explanations += 1
            # 避免API调用过于频繁
            time.sleep(1)
        
        # 补充错误原因分类和难度等级
        if not error_reason_type or not difficulty_level:
            error_reason, difficulty = get_error_reason_and_difficulty(char, correct_pronunciation, wrong_pronunciations)
            if error_reason is not None:
                char_data['errorReasonType'] = error_reason
                updated_error_reason_types += 1
            if difficulty is not None:
                char_data['difficultyLevel'] = difficulty
                updated_difficulty_levels += 1
            # 避免API调用过于频繁
            time.sleep(1)
    
    # 保存更新后的数据
    write_data_optimized(data_optimized_path, characters)
    
    # 打印统计信息
    print("\n数据完善完成！")
    print(f"总字数: {total_chars}")
    print(f"更新错误读音: {updated_wrong_pronunciations}")
    print(f"更新关联词组: {updated_related_phrases}")
    print(f"更新字典解释: {updated_explanations}")
    print(f"更新错误原因分类: {updated_error_reason_types}")
    print(f"更新难度等级: {updated_difficulty_levels}")


if __name__ == '__main__':
    enhance_data()
