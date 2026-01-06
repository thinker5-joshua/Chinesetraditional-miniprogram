// 测试页面
Page({
  /**
   * 页面的初始数据
   */
  data: {
    testQuestions: [],
    currentQuestionIndex: 0,
    selectedAnswers: [],
    testResult: null,
    testStatus: 'ready', // ready, testing, finished
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.generateTestQuestions();
  },

  /**
   * 生成测试题目
   */
  generateTestQuestions() {
    const characters = require('../../data.js').characters;
    const testQuestions = [];
    
    // 随机选择5个不同的汉字
    const selectedIndices = [];
    while (selectedIndices.length < 5 && selectedIndices.length < characters.length) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      if (!selectedIndices.includes(randomIndex)) {
        selectedIndices.push(randomIndex);
      }
    }
    
    // 为每个选中的汉字生成测试题
    selectedIndices.forEach(index => {
      const character = characters[index];
      // 生成选项：包含1个正确读音和3个错误读音
      const options = [...character.wrongPronunciations];
      options.push(character.correctPronunciation);
      
      // 随机打乱选项顺序
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      
      testQuestions.push({
        character: character.char,
        correctAnswer: character.correctPronunciation,
        options: options,
        userAnswer: null
      });
    });
    
    this.setData({
      testQuestions: testQuestions,
      currentQuestionIndex: 0,
      selectedAnswers: [],
      testResult: null,
      testStatus: 'testing',
      loading: false
    });
  },

  /**
   * 处理用户选择答案
   */
  handleAnswerSelect(e) {
    const selectedAnswer = e.currentTarget.dataset.answer;
    const currentIndex = this.data.currentQuestionIndex;
    
    // 更新当前题目的用户答案
    const testQuestions = [...this.data.testQuestions];
    testQuestions[currentIndex].userAnswer = selectedAnswer;
    
    this.setData({
      testQuestions: testQuestions
    });
    
    // 延迟进入下一题，给用户反馈时间
    setTimeout(() => {
      this.nextQuestion();
    }, 500);
  },

  /**
   * 进入下一题
   */
  nextQuestion() {
    const nextIndex = this.data.currentQuestionIndex + 1;
    if (nextIndex < this.data.testQuestions.length) {
      this.setData({
        currentQuestionIndex: nextIndex
      });
    } else {
      // 测试结束，计算结果
      this.calculateResult();
    }
  },

  /**
   * 计算测试结果
   */
  calculateResult() {
    const testQuestions = this.data.testQuestions;
    let correctCount = 0;
    
    testQuestions.forEach(question => {
      if (question.userAnswer === question.correctAnswer) {
        correctCount++;
      }
    });
    
    // 计算评级
    let grade = '';
    let score = 0;
    
    if (correctCount === 5) {
      grade = '优秀';
      score = 50;
    } else if (correctCount === 4) {
      grade = '良好';
      score = 30;
    } else if (correctCount >= 3) {
      grade = '合格';
      score = 20;
    } else {
      grade = '需继续努力';
      score = 10;
    }
    
    this.setData({
      testResult: {
        correctCount: correctCount,
        totalCount: testQuestions.length,
        grade: grade,
        score: score
      },
      testStatus: 'finished'
    });
  },

  /**
   * 重新开始测试
   */
  restartTest() {
    this.setData({
      loading: true
    });
    
    setTimeout(() => {
      this.generateTestQuestions();
    }, 500);
  },

  /**
   * 返回字卡页面
   */
  backToCard() {
    wx.navigateBack();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '每日一字 - 汉字读音测试',
      path: '/subgames/daily-character/pages/test/index'
    };
  }
});