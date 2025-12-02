// 成语消除游戏 - 小程序版本

// 引入外部成语数据
console.log('开始加载成语数据...');
let IDIOMS_DATA, COMMON_IDIOMS, ADVANCED_IDIOMS, COMMON_COUNT, ADVANCED_COUNT;

try {
    const data = require('./test-data.js');
    IDIOMS_DATA = data.IDIOMS_DATA;
    COMMON_IDIOMS = data.COMMON_IDIOMS;
    ADVANCED_IDIOMS = data.ADVANCED_IDIOMS;
    COMMON_COUNT = data.COMMON_COUNT;
    ADVANCED_COUNT = data.ADVANCED_COUNT;
    console.log('成语数据加载成功:', {
        常用成语数量: COMMON_COUNT,
        高深成语数量: ADVANCED_COUNT,
        总数量: data.TOTAL_COUNT
    });
} catch (error) {
    console.error('成语数据加载失败:', error);
    // 使用默认成语数据
    IDIOMS_DATA = ['一举两得', '三心二意', '四面八方', '五光十色', '六神无主'];
    COMMON_IDIOMS = IDIOMS_DATA;
    ADVANCED_IDIOMS = [];
    COMMON_COUNT = IDIOMS_DATA.length;
    ADVANCED_COUNT = 0;
}

Page({
    data: {
        wordBlocks: [],
        selectedWords: [],
        selectedWordsDisplay: '',
        completedCount: 0,
        totalCount: 5,
        progressWidth: '0%',
        currentStars: 0,
        finalStars: '★★★★★',
        showSuccessModal: false,
        showMatchToast: false,
        showMismatchToast: false,
        currentIdioms: [],
        
        // 六级挑战系统
        currentLevel: 1,
        levelName: '入门级',
        totalLevels: 6,
        completedLevels: 0,
        levelStars: [0, 0, 0, 0, 0, 0],
        showLevelUpModal: false
    },

    onLoad() {
        console.log('成语消除页面加载开始...');
        try {
            this.loadProgress();
            this.initGame();
            console.log('成语消除页面加载完成');
        } catch (error) {
            console.error('成语消除页面加载失败:', error);
            wx.showToast({
                title: '加载失败，请重试',
                icon: 'none'
            });
        }
    },

    // 初始化游戏
    initGame() {
        console.log('开始初始化游戏...');
        try {
            const levelConfig = this.getLevelConfig(this.data.currentLevel);
            console.log('关卡配置:', levelConfig);
            
            const selectedIdioms = this.generateLevelIdioms(levelConfig);
            console.log('选中的成语:', selectedIdioms);
            
            const wordBlocks = [];

            // 将每个成语拆分为两组两字
            selectedIdioms.forEach((idiom, idiomIndex) => {
                wordBlocks.push({
                    id: wordBlocks.length,
                    text: idiom.substring(0, 2),
                    originalIdiom: idiom,
                    idiomIndex: idiomIndex,
                    selected: false,
                    matched: false,
                    source: idiom.source || 'common'
                });
                wordBlocks.push({
                    id: wordBlocks.length,
                    text: idiom.substring(2, 4),
                    originalIdiom: idiom,
                    idiomIndex: idiomIndex,
                    selected: false,
                    matched: false,
                    source: idiom.source || 'common'
                });
            });

            // 打乱字块顺序
            const shuffledBlocks = wordBlocks.sort(() => Math.random() - 0.5);

            this.setData({
                wordBlocks: shuffledBlocks,
                selectedWords: [],
                selectedWordsDisplay: '',
                completedCount: 0,
                totalCount: levelConfig.totalCount,
                progressWidth: '0%',
                currentStars: 0,
                showSuccessModal: false,
                currentIdioms: selectedIdioms,
                levelName: levelConfig.levelName
            });
            
            console.log('游戏初始化完成，字块数量:', shuffledBlocks.length);
        } catch (error) {
            console.error('游戏初始化失败:', error);
        }
    },

    // 获取关卡配置
    getLevelConfig(level) {
        const levelConfigs = [
            {
                level: 1,
                levelName: '入门级',
                commonCount: 5,
                advancedCount: 0,
                totalCount: 5,
                description: '熟悉基础成语'
            },
            {
                level: 2,
                levelName: '进阶级',
                commonCount: 4,
                advancedCount: 1,
                totalCount: 5,
                description: '开始接触高深成语'
            },
            {
                level: 3,
                levelName: '熟练级',
                commonCount: 3,
                advancedCount: 2,
                totalCount: 5,
                description: '高深成语增多'
            },
            {
                level: 4,
                levelName: '精通级',
                commonCount: 2,
                advancedCount: 3,
                totalCount: 5,
                description: '高深成语为主'
            },
            {
                level: 5,
                levelName: '大师级',
                commonCount: 1,
                advancedCount: 4,
                totalCount: 5,
                description: '以高深成语为主'
            },
            {
                level: 6,
                levelName: '宗师级',
                commonCount: 0,
                advancedCount: 5,
                totalCount: 5,
                description: '全部高深成语'
            }
        ];
        
        return levelConfigs[level - 1] || levelConfigs[0];
    },

    // 生成关卡成语
    generateLevelIdioms(levelConfig) {
        console.log('生成关卡成语，配置:', levelConfig);
        const totalNeeded = levelConfig.totalCount;
        const selectedIdioms = [];
        
        // 确保有足够的成语
        if (COMMON_IDIOMS.length >= totalNeeded) {
            const used = new Set();
            while (selectedIdioms.length < totalNeeded) {
                const randomIndex = Math.floor(Math.random() * COMMON_IDIOMS.length);
                const idiom = COMMON_IDIOMS[randomIndex];
                if (!used.has(idiom)) {
                    used.add(idiom);
                    selectedIdioms.push(idiom);
                }
            }
        } else {
            // 如果不够，使用所有可用的成语
            selectedIdioms.push(...COMMON_IDIOMS);
        }
        
        console.log('生成的成语:', selectedIdioms);
        return selectedIdioms;
    },

    // 选择字块
    selectWord(e) {
        const index = e.currentTarget.dataset.index;
        const wordBlock = this.data.wordBlocks[index];

        // 如果已经选中，取消选择
        if (wordBlock.selected) {
            this.deselectWord(index);
            return;
        }

        // 如果已经选中了2个，不允许再选
        if (this.data.selectedWords.length >= 2) {
            wx.showToast({
                title: '最多只能选择2组字块',
                icon: 'none',
                duration: 1500
            });
            return;
        }

        // 选中新字块
        const newWordBlocks = [...this.data.wordBlocks];
        newWordBlocks[index].selected = true;
        const newSelectedWords = [...this.data.selectedWords, { ...wordBlock, arrayIndex: index }];

        this.setData({
            wordBlocks: newWordBlocks,
            selectedWords: newSelectedWords,
            selectedWordsDisplay: newSelectedWords.map(item => item.text).join(' + ')
        });

        // 如果选中了2个，检查匹配
        if (newSelectedWords.length === 2) {
            setTimeout(() => {
                this.checkMatch();
            }, 300);
        }
    },

    // 取消选择字块
    deselectWord(index) {
        const newWordBlocks = [...this.data.wordBlocks];
        newWordBlocks[index].selected = false;
        const newSelectedWords = this.data.selectedWords.filter(item => item.arrayIndex !== parseInt(index));

        this.setData({
            wordBlocks: newWordBlocks,
            selectedWords: newSelectedWords,
            selectedWordsDisplay: newSelectedWords.map(item => item.text).join(' + ')
        });
    },

    // 检查匹配
    checkMatch() {
        const selectedWords = this.data.selectedWords;
        
        // 组合选中的两组两字
        const combinedIdiom = selectedWords.map(item => item.text).join('');
        const reversedCombined = selectedWords[1].text + selectedWords[0].text;
        
        let matched = false;
        let matchedIdiomIndex = -1;

        // 检查正序和逆序
        for (let i = 0; i < this.data.currentIdioms.length; i++) {
            const idiom = this.data.currentIdioms[i];
            if (combinedIdiom === idiom || reversedCombined === idiom) {
                matched = true;
                matchedIdiomIndex = i;
                break;
            }
        }

        if (matched) {
            // 匹配成功
            this.handleMatchSuccess(selectedWords, matchedIdiomIndex);
        } else {
            // 匹配失败
            this.handleMatchFailure();
        }
    },

    // 处理匹配成功
    handleMatchSuccess(selectedWords, idiomIndex) {
        const newWordBlocks = [...this.data.wordBlocks];
        const newCompletedCount = this.data.completedCount + 1;
        const newProgressWidth = (newCompletedCount / this.data.totalCount) * 100;

        // 标记已匹配的字块
        selectedWords.forEach(item => {
            newWordBlocks[item.arrayIndex].matched = true;
            newWordBlocks[item.arrayIndex].selected = false;
        });

        // 计算星级
        const newStars = this.calculateStars(newCompletedCount, this.data.totalCount);

        this.setData({
            wordBlocks: newWordBlocks,
            selectedWords: [],
            selectedWordsDisplay: '',
            completedCount: newCompletedCount,
            progressWidth: `${newProgressWidth}%`,
            currentStars: newStars,
            showMatchToast: true
        });

        // 显示成功提示
        setTimeout(() => {
            this.setData({ showMatchToast: false });
        }, 1500);

        // 检查游戏是否结束
        if (newCompletedCount >= this.data.totalCount) {
            setTimeout(() => {
                this.endGame();
            }, 1000);
        }
    },

    // 处理匹配失败
    handleMatchFailure() {
        const newWordBlocks = [...this.data.wordBlocks];
        
        // 清除选中状态
        this.data.selectedWords.forEach(item => {
            newWordBlocks[item.arrayIndex].selected = false;
        });

        this.setData({
            wordBlocks: newWordBlocks,
            selectedWords: [],
            selectedWordsDisplay: '',
            showMismatchToast: true
        });

        // 显示失败提示
        setTimeout(() => {
            this.setData({ showMismatchToast: false });
        }, 1500);
    },

    // 计算星级
    calculateStars(completed, total) {
        // 这里简化星级计算，可以基于尝试次数等来优化
        if (completed === total) {
            return 5; // 完成所有成语给5星
        } else if (completed >= total * 0.8) {
            return 4;
        } else if (completed >= total * 0.6) {
            return 3;
        } else if (completed >= total * 0.4) {
            return 2;
        } else {
            return 1;
        }
    },

    // 游戏结束
    endGame() {
        const finalStars = '★'.repeat(this.data.currentStars) + '☆'.repeat(5 - this.data.currentStars);
        const currentLevel = this.data.currentLevel;
        
        // 更新当前关卡星级
        const newLevelStars = [...this.data.levelStars];
        newLevelStars[currentLevel - 1] = this.data.currentStars;
        
        this.setData({
            showSuccessModal: true,
            finalStars: finalStars,
            levelStars: newLevelStars
        });
        
        // 保存进度到本地存储
        this.saveProgress();
    },

    // 保存游戏进度
    saveProgress() {
        const progressData = {
            currentLevel: this.data.currentLevel,
            completedLevels: this.data.completedLevels,
            levelStars: this.data.levelStars
        };
        
        try {
            wx.setStorageSync('idiomGameProgress', progressData);
        } catch (error) {
            console.error('保存进度失败:', error);
        }
    },

    // 加载游戏进度
    loadProgress() {
        try {
            const progressData = wx.getStorageSync('idiomGameProgress');
            if (progressData) {
                this.setData({
                    currentLevel: progressData.currentLevel || 1,
                    completedLevels: progressData.completedLevels || 0,
                    levelStars: progressData.levelStars || [0, 0, 0, 0, 0, 0]
                });
            }
        } catch (error) {
            console.error('加载进度失败:', error);
        }
    },

    // 再玩一次
    playAgain() {
        this.setData({
            showSuccessModal: false,
            showLevelUpModal: false
        });
        this.initGame();
    },

    // 进入下一关
    nextLevel() {
        const nextLevelNum = this.data.currentLevel + 1;
        
        if (nextLevelNum <= this.data.totalLevels) {
            this.setData({
                currentLevel: nextLevelNum,
                showLevelUpModal: false,
                showSuccessModal: false
            });
            
            this.initGame();
            this.saveProgress();
        } else {
            // 全部通关
            this.setData({
                showLevelUpModal: true
            });
        }
    },

    // 重玩当前关
    retryLevel() {
        this.setData({
            showSuccessModal: false,
            showLevelUpModal: false
        });
        this.initGame();
    },

    // 返回关卡选择
    backToLevelSelect() {
        // 这里可以返回到关卡选择界面
        console.log('返回关卡选择');
    }
});