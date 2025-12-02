// 成语消除游戏 - 小程序版本

// 引入外部成语数据
let COMMON_IDIOMS, ADVANCED_IDIOMS;

try {
    const data = require('./idioms-data.js');
    COMMON_IDIOMS = data.COMMON_IDIOMS;
    ADVANCED_IDIOMS = data.ADVANCED_IDIOMS;

} catch (error) {

    // 使用默认成语数据
    COMMON_IDIOMS = ['一举两得', '三心二意', '四面八方', '五光十色', '六神无主'];
    ADVANCED_IDIOMS = ['曲高和寡', '阳春白雪', '下里巴人', '对牛弹琴', '高山流水'];
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
        currentIdioms: [],
        
        // 六级挑战系统
        currentLevel: 1,
        levelName: '入门级',
        totalLevels: 6,
        
        // 声音效果和成功提示
        lastCompletedIdiom: '',
        showCompletedIdiom: false
    },

    onLoad() {

        this.initGame();
    },

    // 初始化游戏
    initGame() {
        const levelConfig = this.getLevelConfig(this.data.currentLevel);
        const selectedIdioms = this.generateLevelIdioms(levelConfig);
        
        const wordBlocks = [];

        // 将每个成语拆分为两组两字
        selectedIdioms.forEach((idiom, idiomIndex) => {
            const idiomText = typeof idiom === 'object' ? idiom.text : idiom;
            wordBlocks.push({
                id: wordBlocks.length,
                text: idiomText.substring(0, 2),
                originalIdiom: idiomText,
                idiomIndex: idiomIndex,
                selected: false,
                matched: false
            });
            wordBlocks.push({
                id: wordBlocks.length,
                text: idiomText.substring(2, 4),
                originalIdiom: idiomText,
                idiomIndex: idiomIndex,
                selected: false,
                matched: false
            });
        });

        // 打乱字块顺序
        const shuffledBlocks = wordBlocks.sort(function() { 
            return Math.random() - 0.5; 
        });

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
        const commonIdioms = this.generateRandomCommonIdioms(levelConfig.commonCount);
        const advancedIdioms = this.generateRandomAdvancedIdioms(levelConfig.advancedCount);
        
        // 合并成语
        const allIdioms = commonIdioms.concat(advancedIdioms);
        
        // 打乱顺序
        return allIdioms.sort(function() { 
            return Math.random() - 0.5; 
        });
    },

    // 生成随机常用成语
    generateRandomCommonIdioms(count) {

        
        const selectedIdioms = {};
        const result = [];
        let attempts = 0;
        const maxAttempts = count * 10; // 防止死循环
        
        while (result.length < count && result.length < COMMON_IDIOMS.length && attempts < maxAttempts) {
            attempts++;
            const randomIndex = Math.floor(Math.random() * COMMON_IDIOMS.length);
            const idiom = COMMON_IDIOMS[randomIndex];
            if (!selectedIdioms[idiom]) {
                selectedIdioms[idiom] = true;
                result.push(idiom);
            }
        }
        

        return result;
    },

    // 生成随机高深成语
    generateRandomAdvancedIdioms(count) {

        
        const selectedIdioms = {};
        const result = [];
        let attempts = 0;
        const maxAttempts = count * 10; // 防止死循环
        
        while (result.length < count && result.length < ADVANCED_IDIOMS.length && attempts < maxAttempts) {
            attempts++;
            const randomIndex = Math.floor(Math.random() * ADVANCED_IDIOMS.length);
            const idiom = ADVANCED_IDIOMS[randomIndex];
            if (!selectedIdioms[idiom]) {
                selectedIdioms[idiom] = true;
                result.push(idiom);
            }
        }
        

        return result;
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
        const newWordBlocks = this.data.wordBlocks.slice();
        newWordBlocks[index].selected = true;
        const newSelectedWords = this.data.selectedWords.slice();
        newSelectedWords.push(Object.assign({}, wordBlock, { arrayIndex: index }));

        this.setData({
            wordBlocks: newWordBlocks,
            selectedWords: newSelectedWords,
            selectedWordsDisplay: newSelectedWords.map(function(item) { return item.text; }).join(' + ')
        });

        // 如果选中了2个，检查匹配
        if (newSelectedWords.length === 2) {
            setTimeout(function() {
                this.checkMatch();
            }.bind(this), 300);
        }
    },

    // 取消选择字块
    deselectWord(index) {
        const newWordBlocks = this.data.wordBlocks.slice();
        newWordBlocks[index].selected = false;
        const newSelectedWords = this.data.selectedWords.filter(function(item) { 
            return item.arrayIndex !== parseInt(index); 
        });

        this.setData({
            wordBlocks: newWordBlocks,
            selectedWords: newSelectedWords,
            selectedWordsDisplay: newSelectedWords.map(function(item) { return item.text; }).join(' + ')
        });
    },

    // 检查匹配
    checkMatch() {
        const selectedWords = this.data.selectedWords;
        
        // 组合选中的两组两字
        const combinedIdiom = selectedWords.map(function(item) { return item.text; }).join('');
        const reversedCombined = selectedWords[1].text + selectedWords[0].text;
        
        let matched = false;

        // 检查正序和逆序
        for (let i = 0; i < this.data.currentIdioms.length; i++) {
            const idiomData = this.data.currentIdioms[i];
            const idiom = typeof idiomData === 'object' ? idiomData.text : idiomData;
            if (combinedIdiom === idiom || reversedCombined === idiom) {
                matched = true;
                break;
            }
        }

        if (matched) {
            // 匹配成功
            this.handleMatchSuccess(selectedWords);
        } else {
            // 匹配失败
            this.handleMatchFailure();
        }
    },

    // 处理匹配成功
    handleMatchSuccess(selectedWords) {
        const newWordBlocks = this.data.wordBlocks.slice();
        const newCompletedCount = this.data.completedCount + 1;
        const newProgressWidth = (newCompletedCount / this.data.totalCount) * 100;

        // 获取配对成功的成语
        const completedIdiom = selectedWords[0].originalIdiom || 
                           selectedWords.map(item => item.text).join('');

        // 播放成功音效
        this.playSuccessSound();

        // 标记已匹配的字块
        selectedWords.forEach(function(item) {
            newWordBlocks[item.arrayIndex].matched = true;
            newWordBlocks[item.arrayIndex].selected = false;
        });

        this.setData({
            wordBlocks: newWordBlocks,
            selectedWords: [],
            selectedWordsDisplay: '',
            completedCount: newCompletedCount,
            progressWidth: newProgressWidth + '%',
            currentStars: newCompletedCount === this.data.totalCount ? 5 : Math.floor((newCompletedCount / this.data.totalCount) * 5),
            lastCompletedIdiom: completedIdiom,
            showCompletedIdiom: true
        });

        // 3秒后隐藏成功提示
        setTimeout(() => {
            this.setData({
                showCompletedIdiom: false
            });
        }, 3000);

        // 检查游戏是否结束
        if (newCompletedCount >= this.data.totalCount) {
            setTimeout(function() {
                this.endGame();
            }.bind(this), 1000);
        }
    },

    // 处理匹配失败
    handleMatchFailure() {
        const newWordBlocks = this.data.wordBlocks.slice();
        
        // 播放失败音效
        this.playFailureSound();
        
        // 清除选中状态
        this.data.selectedWords.forEach(function(item) {
            newWordBlocks[item.arrayIndex].selected = false;
        });

        this.setData({
            wordBlocks: newWordBlocks,
            selectedWords: [],
            selectedWordsDisplay: ''
        });
    },

    // 游戏结束
    endGame() {
        const finalStars = '★'.repeat(this.data.currentStars) + '☆'.repeat(5 - this.data.currentStars);
        
        this.setData({
            showSuccessModal: true,
            finalStars: finalStars
        });
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
                showSuccessModal: false
            });
            this.initGame();
        } else {
            // 全部通关，重置到第一关
            this.setData({
                currentLevel: 1,
                showSuccessModal: false
            });
            this.initGame();
        }
    },

    // 返回主页
    backToHome() {
        wx.navigateBack();
    },

    // 播放成功音效
    playSuccessSound() {
        // 尝试播放音效
        try {
            const audio = wx.createInnerAudioContext();
            audio.src = '/subgames/future/sounds/success.wav';
            audio.volume = 0.6;
            audio.onPlay(() => {

            });
            audio.onError((res) => {

            });
            audio.play();
        } catch (error) {

        }
    },

    // 播放失败音效
    playFailureSound() {
        // 尝试播放音效
        try {
            const audio = wx.createInnerAudioContext();
            audio.src = '/subgames/future/sounds/failure.wav';
            audio.volume = 0.7;
            audio.onPlay(() => {

            });
            audio.onError((res) => {

            });
            audio.play();
        } catch (error) {

        }
    }
});