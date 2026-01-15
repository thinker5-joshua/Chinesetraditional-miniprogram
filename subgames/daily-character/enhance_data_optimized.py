#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
易读错字数据完善脚本（优化版）
使用DeepSeek API一次性获取所有需要的信息，包括错误读音、关联词组、字典解释、错误原因分类和难度等级
"""

import json
import re
import os
import requests
import time
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='enhance_data.log'
)

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
        "max_tokens": 1000,
        "temperature": 0.7
    }
    
    try:
        start_time = time.time()
        response = requests.post(API_URL, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        content = result["choices"][0]["message"]["content"].strip()
        end_time = time.time()
        logging.info(f"API调用成功，耗时: {end_time - start_time:.2f}秒")
        return content
    except requests.RequestException as e:
        logging.error(f"API调用失败: {e}")
        return ""
    except (KeyError, IndexError) as e:
        logging.error(f"API响应解析失败: {e}")
        return ""


def get_character_data(char, correct_pronunciation):
    """
    一次性获取字符的所有相关数据
    """
    prompt = f"""
有此{char}字，读音为{correct_pronunciation}。请按照以下要求提供相关信息，直接返回JSON格式数据，不要包含其他内容：

{{
  "wrongPronunciations": ["错误读音1", "错误读音2", "错误读音3"],  // 通常可能会读错的错误读音，1-3个
  "relatedPhrases": ["关联词组1", "关联词组2", "关联词组3", "关联词组4"],  // 含有此字念此音的关联词组，1-4个
  "explanation": "字典对此字此读音的通常解释",  // 详细的字典解释
  "errorReasonType": 1,  // 常见错误原因分类（1-8）
  "difficultyLevel": "初级"  // 测试难度等级（初级、中级、高级、挑战级）
}}

错误原因分类规则：
1: 形声字误读（如：炽zhì常误读为chì）
2: 多音字误读（如：巷hàng常误读为xiàng）
3: 声母误读（如：塑sù常误读为suò）
4: 韵母误读（如：氛fēn常误读为fèn）
5: 声调误读（如：处chǔ常误读为chù）
6: 形似字误读（如：诣yì常误读为zhǐ）
7: 方言影响误读（如：血xuè常误读为xiě）
8: 其他误读原因

难度等级划分规则：
初级: 常见字，错误读音较少，易于纠正
中级: 较常见字，有一定的错误读音概率
高级: 生僻字或多音字，错误读音较多
挑战级: 非常生僻字，或有特殊读音规则的字
"""
    
    response = call_deepseek_api(prompt)
    return response


def parse_model_response(response):
    """
    解析模型返回的JSON格式数据
    """
    try:
        # 提取JSON部分
        json_match = re.search(r'\{[\s\S]*\}', response)
        if json_match:
            json_str = json_match.group(0)
            data = json.loads(json_str)
            return data
        else:
            # 尝试直接解析
            data = json.loads(response)
            return data
    except json.JSONDecodeError as e:
        logging.error(f"解析模型返回的JSON失败: {e}")
        return None


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
        # 处理控制字符
        json_str = ''.join(char for char in json_str if ord(char) >= 32)
        # 解析JSON
        try:
            return json.loads(json_str)
        except json.JSONDecodeError as e:
            logging.error(f"解析{file_path}失败: {e}")
            # 尝试使用更宽松的解析方式
            try:
                # 使用ast.literal_eval作为备选
                import ast
                # 先将JSON格式转换为Python字面量格式
                py_str = json_str.replace('true', 'True').replace('false', 'False').replace('null', 'None')
                return ast.literal_eval(py_str)
            except Exception as e2:
                logging.error(f"备选解析方式失败: {e2}")
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


def enhance_data(test_mode=True, test_count=5):
    """
    完善数据
    test_mode: 是否为测试模式，仅处理前test_count个字
    test_count: 测试模式下处理的字数
    """
    # 文件路径
    backup_file_path = 'data-optimized-backup.js'
    output_file_path = 'data-optimized-new.js'
    temp_file_path = 'data-optimized-temp.js'
    
    # 检查备份文件是否存在
    if not os.path.exists(backup_file_path):
        logging.error(f"备份文件不存在: {backup_file_path}")
        return
    
    # 读取备份数据
    characters = parse_data_optimized(backup_file_path)
    
    total_chars = len(characters)
    logging.info(f"读取到 {total_chars} 个字")
    
    # 测试模式下只处理前test_count个字
    if test_mode:
        characters = characters[:test_count]
        logging.info(f"测试模式：仅处理前 {test_count} 个字")
    
    # 统计信息
    processed_count = 0
    success_count = 0
    error_count = 0
    
    # 详细记录
    detailed_records = []
    
    # 遍历每个字
    for i, char_data in enumerate(characters):
        char = char_data.get('char')
        correct_pronunciation = char_data.get('correctPronunciation')
        
        if not char or not correct_pronunciation:
            logging.error(f"第{i+1}个字缺少必要信息: {char_data}")
            error_count += 1
            processed_count += 1
            continue
        
        logging.info(f"处理第 {i+1} 个字: {char} ({correct_pronunciation})")
        
        # 构建记录
        record = {
            'id': char_data.get('id'),
            'char': char,
            'correctPronunciation': correct_pronunciation,
            'original_data': {
                'wrongPronunciations': char_data.get('wrongPronunciations', []),
                'relatedPhrases': char_data.get('relatedPhrases', []),
                'explanation': char_data.get('explanation', ''),
                'errorReasonType': char_data.get('errorReasonType', 4),
                'difficultyLevel': char_data.get('difficultyLevel', '初级')
            },
            'prompt': '',
            'model_response': '',
            'parsed_data': None,
            'updated_data': None,
            'status': 'pending'
        }
        
        # 构建prompt
        prompt = f"""
有此{char}字，读音为{correct_pronunciation}。请按照以下要求提供相关信息，直接返回JSON格式数据，不要包含其他内容：

{{
  "wrongPronunciations": ["错误读音1", "错误读音2", "错误读音3"],  // 通常可能会读错的错误读音，1-3个
  "relatedPhrases": ["关联词组1", "关联词组2", "关联词组3", "关联词组4"],  // 含有此字念此音的关联词组，1-4个
  "explanation": "字典对此字此读音的通常解释",  // 详细的字典解释
  "errorReasonType": 1,  // 常见错误原因分类（1-8）
  "difficultyLevel": "初级"  // 测试难度等级（初级、中级、高级、挑战级）
}}

错误原因分类规则：
1: 形声字误读（如：炽zhì常误读为chì）
2: 多音字误读（如：巷hàng常误读为xiàng）
3: 声母误读（如：塑sù常误读为suò）
4: 韵母误读（如：氛fēn常误读为fèn）
5: 声调误读（如：处chǔ常误读为chù）
6: 形似字误读（如：诣yì常误读为zhǐ）
7: 方言影响误读（如：血xuè常误读为xiě）
8: 其他误读原因

难度等级划分规则：
初级: 常见字，错误读音较少，易于纠正
中级: 较常见字，有一定的错误读音概率
高级: 生僻字或多音字，错误读音较多
挑战级: 非常生僻字，或有特殊读音规则的字
"""
        
        record['prompt'] = prompt
        
        # 调用API获取数据
        model_response = call_deepseek_api(prompt)
        record['model_response'] = model_response
        
        # 解析响应
        parsed_data = parse_model_response(model_response)
        record['parsed_data'] = parsed_data
        
        if parsed_data:
            # 增量更新错误读音
            original_wrong = char_data.get('wrongPronunciations', [])
            new_wrong = parsed_data.get('wrongPronunciations', [])
            
            # 去重并保持顺序，最多3个
            merged_wrong = original_wrong.copy()
            for wrong in new_wrong:
                if wrong not in merged_wrong and len(merged_wrong) < 3:
                    merged_wrong.append(wrong)
            char_data['wrongPronunciations'] = merged_wrong
            
            # 增量更新关联词组
            original_phrases = char_data.get('relatedPhrases', [])
            new_phrases = parsed_data.get('relatedPhrases', [])
            
            # 去重并保持顺序，最多4个
            merged_phrases = original_phrases.copy()
            for phrase in new_phrases:
                if phrase not in merged_phrases and len(merged_phrases) < 4:
                    merged_phrases.append(phrase)
            char_data['relatedPhrases'] = merged_phrases
            
            # 覆盖更新其他字段
            if 'explanation' in parsed_data:
                char_data['explanation'] = parsed_data['explanation']
            if 'errorReasonType' in parsed_data:
                char_data['errorReasonType'] = parsed_data['errorReasonType']
            if 'difficultyLevel' in parsed_data:
                char_data['difficultyLevel'] = parsed_data['difficultyLevel']
            
            # 记录更新后的数据
            record['updated_data'] = {
                'wrongPronunciations': char_data.get('wrongPronunciations', []),
                'relatedPhrases': char_data.get('relatedPhrases', []),
                'explanation': char_data.get('explanation', ''),
                'errorReasonType': char_data.get('errorReasonType', 4),
                'difficultyLevel': char_data.get('difficultyLevel', '初级')
            }
            
            record['status'] = 'success'
            success_count += 1
            logging.info(f"成功更新字: {char} ({correct_pronunciation})")
        else:
            record['status'] = 'error'
            error_count += 1
            logging.error(f"更新字失败: {char} ({correct_pronunciation})")
        
        detailed_records.append(record)
        processed_count += 1
        
        # 实时写入文件
        try:
            # 先读取备份文件内容，作为新文件的基础
            with open(backup_file_path, 'r', encoding='utf-8') as f:
                backup_content = f.read()
            
            # 生成新的characters数组字符串
            characters_str = json.dumps(characters, ensure_ascii=False, indent=2)
            
            # 替换备份文件中的characters数组，生成新文件内容
            new_content = re.sub(r'const characters = \[(.*?)\];', f'const characters = {characters_str};', backup_content, flags=re.DOTALL)
            
            # 写入临时文件
            with open(temp_file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            # 重命名为最终文件
            if os.path.exists(output_file_path):
                os.remove(output_file_path)
            os.rename(temp_file_path, output_file_path)
            
            logging.info(f"已实时保存更新后的数据到: {output_file_path}")
        except Exception as e:
            logging.error(f"写入文件失败: {e}")
        
        # 每十个字进度汇报
        if processed_count % 10 == 0:
            progress_report = f"\n=== 进度汇报 ===\n"
            progress_report += f"已处理: {processed_count}/{len(characters)} 字\n"
            progress_report += f"成功: {success_count} 字\n"
            progress_report += f"失败: {error_count} 字\n"
            progress_report += f"当前处理: {char} ({correct_pronunciation})\n"
            progress_report += "================\n"
            
            print(progress_report)
            logging.info(progress_report)
        
        # 避免API调用过于频繁
        time.sleep(1)
    
    # 最终进度汇报
    final_report = f"\n=== 最终报告 ===\n"
    final_report += f"总字数: {total_chars}\n"
    final_report += f"处理字数: {processed_count}\n"
    final_report += f"成功: {success_count}\n"
    final_report += f"失败: {error_count}\n"
    final_report += "================\n"
    
    print(final_report)
    logging.info(final_report)
    
    # 生成详细报告
    report = {
        'total_chars': total_chars,
        'processed_count': processed_count,
        'success_count': success_count,
        'error_count': error_count,
        'test_mode': test_mode,
        'detailed_records': detailed_records
    }
    
    # 保存报告
    with open('enhance_data_report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    logging.info(f"数据完善完成！")
    logging.info(f"处理字数: {processed_count}")
    logging.info(f"成功: {success_count}")
    logging.info(f"失败: {error_count}")
    
    return report


if __name__ == '__main__':
    # 完整模式：处理所有字
    report = enhance_data(test_mode=False)
    
    # 打印简要结果
    print(f"处理完成！")
    print(f"处理字数: {report.get('processed_count', 0)}")
    print(f"成功: {report.get('success_count', 0)}")
    print(f"失败: {report.get('error_count', 0)}")
    print(f"详细报告已保存至: enhance_data_report.json")
