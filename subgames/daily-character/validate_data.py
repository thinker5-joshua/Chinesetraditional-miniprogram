#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数据验证脚本：验证每日一字数据的完整性
"""

import os
import json
import sys


def validate_json_data(json_file):
    """
    验证 JSON 数据文件的完整性
    
    Args:
        json_file: JSON 文件路径
    
    Returns:
        dict: 验证结果
    """
    try:
        # 读取 JSON 文件
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 验证数据结构
        if not isinstance(data, list):
            return {
                'success': False,
                'message': '数据不是数组格式',
                'details': {}
            }
        
        # 验证字段完整性
        required_fields = ['id', 'char', 'correctPronunciation', 'wrongPronunciations', 
                          'relatedPhrases', 'explanation', 'errorReasonType', 'difficultyLevel']
        
        valid_count = 0
        invalid_count = 0
        invalid_items = []
        field_errors = {}
        difficulty_stats = {}
        error_reason_stats = {}
        
        for i, item in enumerate(data):
            # 检查所有必需字段
            missing_fields = []
            for field in required_fields:
                if field not in item:
                    missing_fields.append(field)
                    if field not in field_errors:
                        field_errors[field] = 0
                    field_errors[field] += 1
            
            if missing_fields:
                invalid_count += 1
                invalid_items.append({
                    'index': i,
                    'id': item.get('id', 'unknown'),
                    'char': item.get('char', 'unknown'),
                    'missing_fields': missing_fields
                })
            else:
                valid_count += 1
                
                # 统计难度等级分布
                difficulty = item.get('difficultyLevel', 'unknown')
                if difficulty not in difficulty_stats:
                    difficulty_stats[difficulty] = 0
                difficulty_stats[difficulty] += 1
                
                # 统计错误原因类型分布
                error_reason = item.get('errorReasonType', 'unknown')
                if error_reason not in error_reason_stats:
                    error_reason_stats[error_reason] = 0
                error_reason_stats[error_reason] += 1
        
        # 验证 ID 唯一性
        ids = [item.get('id') for item in data if 'id' in item]
        unique_ids = set(ids)
        duplicate_ids = len(ids) - len(unique_ids)
        
        # 生成验证报告
        report = {
            'success': invalid_count == 0 and duplicate_ids == 0,
            'total_items': len(data),
            'valid_items': valid_count,
            'invalid_items': invalid_count,
            'duplicate_ids': duplicate_ids,
            'field_errors': field_errors,
            'invalid_items': invalid_items,
            'difficulty_distribution': difficulty_stats,
            'error_reason_distribution': error_reason_stats,
            'message': f'验证完成，共 {len(data)} 条数据，其中 {valid_count} 条有效，{invalid_count} 条无效，{duplicate_ids} 个重复ID'
        }
        
        return report
        
    except Exception as e:
        return {
            'success': False,
            'message': f'验证失败: {str(e)}',
            'details': {}
        }


def validate_data_structure(data):
    """
    验证数据结构的合理性
    
    Args:
        data: 数据数组
    
    Returns:
        dict: 验证结果
    """
    try:
        issues = []
        
        for i, item in enumerate(data):
            # 检查字符串字段长度
            if len(item.get('char', '')) != 1:
                issues.append({
                    'index': i,
                    'id': item.get('id'),
                    'char': item.get('char'),
                    'issue': f'字符长度不是1: {item.get("char", "")}'
                })
            
            # 检查数组字段长度
            if len(item.get('wrongPronunciations', [])) < 1:
                issues.append({
                    'index': i,
                    'id': item.get('id'),
                    'char': item.get('char'),
                    'issue': '错误读音列表为空'
                })
            
            if len(item.get('relatedPhrases', [])) < 1:
                issues.append({
                    'index': i,
                    'id': item.get('id'),
                    'char': item.get('char'),
                    'issue': '关联词组列表为空'
                })
            
            # 检查数字字段范围
            error_reason = item.get('errorReasonType')
            if error_reason not in [1, 2, 3, 4, 5, 6, 7, 8]:
                issues.append({
                    'index': i,
                    'id': item.get('id'),
                    'char': item.get('char'),
                    'issue': f'错误原因类型不在有效范围内: {error_reason}'
                })
            
            # 检查难度等级值
            difficulty = item.get('difficultyLevel')
            valid_difficulties = ['初级', '中级', '高级', '挑战级']
            if difficulty not in valid_difficulties:
                issues.append({
                    'index': i,
                    'id': item.get('id'),
                    'char': item.get('char'),
                    'issue': f'难度等级不在有效范围内: {difficulty}'
                })
        
        return {
            'success': len(issues) == 0,
            'issues': issues,
            'message': f'结构验证完成，发现 {len(issues)} 个问题'
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'结构验证失败: {str(e)}',
            'issues': []
        }


def generate_validation_report(json_file):
    """
    生成完整的验证报告
    
    Args:
        json_file: JSON 文件路径
    """
    print(f"开始验证数据文件: {json_file}")
    print("=" * 70)
    
    # 验证 JSON 数据
    json_report = validate_json_data(json_file)
    
    print(f"JSON 数据验证结果:")
    print(f"  状态: {'成功' if json_report['success'] else '失败'}")
    print(f"  消息: {json_report['message']}")
    print(f"  总数据量: {json_report['total_items']}")
    print(f"  有效数据: {json_report['valid_items']}")
    print(f"  无效数据: {json_report['invalid_items']}")
    print(f"  重复ID: {json_report['duplicate_ids']}")
    
    if json_report['field_errors']:
        print(f"\n字段错误统计:")
        for field, count in json_report['field_errors'].items():
            print(f"  {field}: {count} 次")
    
    if json_report['invalid_items']:
        print(f"\n无效数据示例 (前5个):")
        for item in json_report['invalid_items'][:5]:
            print(f"  索引: {item['index']}, ID: {item['id']}, 字符: {item['char']}")
            print(f"    缺失字段: {', '.join(item['missing_fields'])}")
    
    print(f"\n难度等级分布:")
    for difficulty, count in json_report['difficulty_distribution'].items():
        print(f"  {difficulty}: {count} 条 ({count/json_report['total_items']*100:.1f}%)")
    
    print(f"\n错误原因类型分布:")
    for error_reason, count in json_report['error_reason_distribution'].items():
        print(f"  类型 {error_reason}: {count} 条 ({count/json_report['total_items']*100:.1f}%)")
    
    # 验证数据结构
    if json_report['success']:
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        structure_report = validate_data_structure(data)
        print(f"\n数据结构验证结果:")
        print(f"  状态: {'成功' if structure_report['success'] else '失败'}")
        print(f"  消息: {structure_report['message']}")
        
        if structure_report['issues']:
            print(f"\n结构问题示例 (前5个):")
            for issue in structure_report['issues'][:5]:
                print(f"  索引: {issue['index']}, ID: {issue['id']}, 字符: {issue['char']}")
                print(f"    问题: {issue['issue']}")
    
    print("=" * 70)
    print(f"验证完成！")
    
    return json_report


def main():
    """
    主函数
    """
    # 默认使用导出的数据文件
    default_json_file = os.path.join(os.path.dirname(__file__), 'export_data.json')
    
    # 如果命令行指定了文件路径，则使用指定的文件
    json_file = default_json_file
    if len(sys.argv) > 1:
        json_file = sys.argv[1]
    
    if not os.path.exists(json_file):
        print(f"错误: 文件不存在: {json_file}")
        return 1
    
    try:
        report = generate_validation_report(json_file)
        return 0 if report['success'] else 1
    except Exception as e:
        print(f"验证过程中发生错误: {str(e)}")
        return 1


if __name__ == '__main__':
    exit(main())
