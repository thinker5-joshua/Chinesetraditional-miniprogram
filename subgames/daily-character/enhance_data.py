#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
易读错字数据完善脚本
补充data-optimized.js中的错误读音、关联词组、字典解释、错误原因分类和难度等级
"""

import json
import re
import os
import random


# 模拟大模型查询函数
def query_llm(prompt):
    """
    模拟大模型查询
    """
    print(f"查询大模型: {prompt}")
    # 这里应该集成实际的大模型API
    # 由于没有API密钥，返回模拟数据
    return "模拟大模型响应"


def get_wrong_pronunciations(char, correct_pronunciation):
    """
    获取错误读音
    """
    prompt = f"有此{char}字，读音为{correct_pronunciation}，请查询其通常可能会读错的错误读音1到3个。"
    response = query_llm(prompt)
    
    # 模拟错误读音
    # 这里应该解析大模型的响应，提取错误读音
    # 由于是模拟，返回一些可能的错误读音
    wrong_pronunciations = []
    
    # 简单的模拟逻辑
    if char == "龟" and correct_pronunciation == "jūn":
        wrong_pronunciations = ["guī", "qiū"]
    elif char == "巷" and correct_pronunciation == "hàng":
        wrong_pronunciations = ["xiàng"]
    elif char == "薄" and correct_pronunciation == "bò":
        wrong_pronunciations = ["báo", "bó"]
    elif char == "折" and correct_pronunciation == "shé":
        wrong_pronunciations = ["zhé", "zhē"]
    elif char == "乘" and correct_pronunciation == "shèng":
        wrong_pronunciations = ["chéng"]
    else:
        # 随机生成一些可能的错误读音
        # 这里只是为了演示，实际应该使用大模型查询
        wrong_pronunciations = [correct_pronunciation[:-1] + "a", correct_pronunciation[:-1] + "o"]
    
    return wrong_pronunciations


def get_related_phrases(char, correct_pronunciation):
    """
    获取关联词组
    """
    prompt = f"有此{char}字，读音为{correct_pronunciation}，含有此字念此音的关联词组1到4个"
    response = query_llm(prompt)
    
    # 模拟关联词组
    # 这里应该解析大模型的响应，提取关联词组
    # 由于是模拟，返回一些可能的关联词组
    related_phrases = []
    
    # 简单的模拟逻辑
    if char == "龟" and correct_pronunciation == "jūn":
        related_phrases = ["龟裂", "龟手"]
    elif char == "巷" and correct_pronunciation == "hàng":
        related_phrases = ["巷道", "平巷", "矿巷"]
    elif char == "薄" and correct_pronunciation == "bò":
        related_phrases = ["薄荷", "薄荷脑", "薄荷叶"]
    elif char == "折" and correct_pronunciation == "shé":
        related_phrases = ["折本", "树枝折了", "折耗", "折本而归"]
    elif char == "乘" and correct_pronunciation == "shèng":
        related_phrases = ["千乘之国", "万乘之君"]
    else:
        # 随机生成一些可能的关联词组
        # 这里只是为了演示，实际应该使用大模型查询
        related_phrases = [char + "词1", char + "词2", char + "词3"]
    
    return related_phrases


def get_explanation(char, correct_pronunciation):
    """
    获取字典解释
    """
    prompt = f"有此{char}字，读音为{correct_pronunciation}，请给出字典对此字此读音的通常解释"
    response = query_llm(prompt)
    
    # 模拟字典解释
    # 这里应该解析大模型的响应，提取字典解释
    # 由于是模拟，返回一些可能的字典解释
    explanation = ""
    
    # 简单的模拟逻辑
    if char == "龟" and correct_pronunciation == "jūn":
        explanation = "龟（jūn）：同\"皲\"，皮肤因寒冷或干燥而裂开。如：龟裂。"
    elif char == "巷" and correct_pronunciation == "hàng":
        explanation = "巷（hàng）：巷道，采矿或探矿时挖的坑道。如：矿巷。"
    elif char == "薄" and correct_pronunciation == "bò":
        explanation = "薄（bò）：多年生草本植物，茎叶有清凉香气，可入药。如：薄荷。"
    elif char == "折" and correct_pronunciation == "shé":
        explanation = "断（多用于长条形的东西）：树枝～了。桌子腿撞～了。亏损：～本儿。～耗。"
    elif char == "乘" and correct_pronunciation == "shèng":
        explanation = "乘（shèng）：古代称兵车，四马一车为一乘。如：千乘之国。"
    else:
        # 生成一个简单的字典解释
        # 这里只是为了演示，实际应该使用大模型查询
        explanation = f"{char}（{