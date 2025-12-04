// 引入完整的六十四卦数据
const hexagramsData = require('../../hexagrams-data.js').hexagramsData;

Page({
    data: {
        // 查看模式：'random' 随机翻阅, 'group' 分组查看, 'sixYaoChange' 六爻变
        viewMode: 'random',
        
        // 分组相关
        groupMode: 'sequence', // 'sequence' 顺序, 'palace' 八宫
        currentPage: 0,
        totalGroups: 8,
        currentHexagrams: [],
        currentGroupTitle: '',
        currentGroupSubtitle: '',
        sequenceGroups: [],
        palaceGroups: [],
        
        // 随机翻阅相关
        currentRandomIndex: 0,
        currentRandomHexagram: null,
        // 用于随机翻阅的卦象顺序数组
        randomHexagramOrder: [],
        
        // 六爻变相关
        currentSixYaoIndex: 0, // 当前六爻变模式下的卦象索引
        currentSixYaoHexagram: null, // 当前显示的卦象
        sixYaoStates: [0, 0, 0, 0, 0, 0], // 六爻阴阳状态数组（0:阴，1:阳，从下往上）
        sixYaoButtons: [], // 六爻按钮配置数组
        // 六爻配置信息
        sixYaoConfig: [
            { yinText: '初六', yangText: '初九', index: 0 },
            { yinText: '六二', yangText: '九二', index: 1 },
            { yinText: '六三', yangText: '九三', index: 2 },
            { yinText: '六四', yangText: '九四', index: 3 },
            { yinText: '六五', yangText: '九五', index: 4 },
            { yinText: '上六', yangText: '上九', index: 5 }
        ]
    },
    
    // 触摸事件相关的临时变量（不放入data中，避免异步更新问题）
    touchStartX: 0,
    touchStartY: 0,
    touchMoveX: 0,
    touchMoveY: 0,

    onLoad() {
        this.initializeGroups();
        this.initializeRandomHexagrams();
        
        // 初始化随机翻阅的第一个卦象
        const firstRandomHexagramIndex = this.data.randomHexagramOrder[this.data.currentRandomIndex];
        const firstRandomHexagram = hexagramsData[firstRandomHexagramIndex];
        
        // 初始化六爻变的第一个卦象
        const firstSixYaoHexagramIndex = this.data.randomHexagramOrder[this.data.currentSixYaoIndex];
        const firstSixYaoHexagram = hexagramsData[firstSixYaoHexagramIndex];
        const yaoStates = this.extractYaoStatesFromSymbol(firstSixYaoHexagram.symbol);
        
        this.setData({
            currentRandomHexagram: firstRandomHexagram,
            currentSixYaoHexagram: firstSixYaoHexagram,
            sixYaoStates: yaoStates,
            sixYaoButtons: this.generateSixYaoButtons(yaoStates)
        });
        
        // 如果初始模式是分组查看，更新当前分组
        if (this.data.viewMode === 'group') {
            this.updateCurrentGroup();
        }
    },

    // 初始化分组
    initializeGroups() {
        // 顺序分组 - 按《周易》原序，每组8个
        const sequenceGroups = [];
        for (let i = 0; i < 8; i++) {
            sequenceGroups.push({
                title: `第${i + 1}组`,
                subtitle: '按《周易》原序分组',
                hexagrams: hexagramsData.slice(i * 8, (i + 1) * 8)
            });
        }

        // 八宫分组 - 按八宫体系（根据标准八宫卦排序）
        const palaceGroups = [
            {
                title: '乾宫',
                subtitle: '乾为天父，统领八卦',
                hexagrams: [1, 44, 33, 12, 20, 23, 35, 14] // 乾(1)、姤(44)、遁(33)、否(12)、观(20)、剥(23)、晋(35)、大有(14)
            },
            {
                title: '坎宫',
                subtitle: '坎为水母，润泽万物',
                hexagrams: [29, 60, 3, 63, 49, 55, 36, 7] // 坎(29)、节(60)、屯(3)、既济(63)、革(49)、丰(55)、明夷(36)、师(7)
            },
            {
                title: '艮宫',
                subtitle: '艮为山止，稳重如山',
                hexagrams: [52, 22, 26, 41, 38, 10, 61, 53] // 艮(52)、贲(22)、大畜(26)、损(41)、睽(38)、履(10)、中孚(61)、渐(53)
            },
            {
                title: '震宫',
                subtitle: '震为雷动，奋发图强',
                hexagrams: [51, 16, 40, 32, 46, 48, 28, 17] // 震(51)、豫(16)、解(40)、恒(32)、升(46)、井(48)、大过(28)、随(17)
            },
            {
                title: '巽宫',
                subtitle: '巽为风行，无孔不入',
                hexagrams: [57, 9, 37, 42, 25, 21, 27, 18] // 巽(57)、小畜(9)、家人(37)、益(42)、无妄(25)、噬嗑(21)、颐(27)、蛊(18)
            },
            {
                title: '离宫',
                subtitle: '离为火明，照亮前程',
                hexagrams: [30, 56, 50, 64, 4, 59, 6, 13] // 离(30)、旅(56)、鼎(50)、未济(64)、蒙(4)、涣(59)、讼(6)、同人(13)
            },
            {
                title: '坤宫',
                subtitle: '坤为地母，厚德载物',
                hexagrams: [2, 24, 19, 11, 34, 43, 5, 8] // 坤(2)、复(24)、临(19)、泰(11)、大壮(34)、夬(43)、需(5)、比(8)
            },
            {
                title: '兑宫',
                subtitle: '兑为泽悦，和气生财',
                hexagrams: [58, 47, 45, 31, 39, 15, 62, 54] // 兑(58)、困(47)、萃(45)、咸(31)、蹇(39)、谦(15)、小过(62)、归妹(54)
            }
        ];

        this.setData({
            sequenceGroups: sequenceGroups,
            palaceGroups: palaceGroups.map(group => ({
                ...group,
                hexagrams: group.hexagrams.map(id => hexagramsData.find(h => h.id === id))
            }))
        });
    },

    // 初始化随机卦象顺序
    initializeRandomHexagrams() {
        // 创建一个随机顺序的索引数组
        const order = Array.from({ length: hexagramsData.length }, (_, i) => i);
        // 打乱顺序
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        this.setData({
            randomHexagramOrder: order
        });
    },

    // 更新当前组显示
    updateCurrentGroup() {
        const { groupMode, currentPage, sequenceGroups, palaceGroups } = this.data;
        const groups = groupMode === 'sequence' ? sequenceGroups : palaceGroups;
        const currentGroup = groups[currentPage];
        
        let groupTitle, groupSubtitle;
        if (groupMode === 'sequence') {
            groupTitle = `第${currentPage + 1}组 (第${currentPage * 8 + 1}-${(currentPage + 1) * 8}卦)`;
            groupSubtitle = '按《周易》原序分组';
        } else {
            groupTitle = currentGroup.title;
            groupSubtitle = currentGroup.subtitle;
        }

        this.setData({
            currentHexagrams: currentGroup.hexagrams,
            currentGroupTitle: groupTitle,
            currentGroupSubtitle: groupSubtitle,
            totalGroups: groups.length
        });
    },

    // 切换到随机翻阅模式
    switchToRandom() {
        let currentIndex;
        
        // 根据当前模式获取当前卦象索引
        if (this.data.viewMode === 'sixYaoChange') {
            // 从六爻变模式切换过来，使用六爻变的索引
            currentIndex = this.data.currentSixYaoIndex;
        } else {
            // 从其他模式切换过来，使用随机模式的索引
            currentIndex = this.data.currentRandomIndex;
        }
        
        // 仅在随机顺序数组为空时初始化
        if (this.data.randomHexagramOrder.length === 0) {
            this.initializeRandomHexagrams();
        }
        
        // 获取当前卦象
        const hexagramIndex = this.data.randomHexagramOrder[currentIndex];
        const hexagram = hexagramsData[hexagramIndex];
        
        this.setData({
            viewMode: 'random',
            currentRandomIndex: currentIndex,
            currentRandomHexagram: hexagram,
            // 同步更新六爻变的当前索引
            currentSixYaoIndex: currentIndex
        });
    },

    // 切换到分组查看模式
    switchToGroup() {
        this.setData({
            viewMode: 'group'
        }, () => {
            this.updateCurrentGroup();
        });
    },

    // 切换到顺序模式
    switchToSequence() {
        this.setData({
            groupMode: 'sequence',
            currentPage: 0
        }, () => {
            this.updateCurrentGroup();
        });
    },

    // 切换到八宫模式
    switchToPalace() {
        this.setData({
            groupMode: 'palace',
            currentPage: 0
        }, () => {
            this.updateCurrentGroup();
        });
    },

    // 上一组
    previousGroup() {
        if (this.data.currentPage > 0) {
            this.setData({
                currentPage: this.data.currentPage - 1
            }, () => {
                this.updateCurrentGroup();
            });
        }
    },

    // 下一组
    nextGroup() {
        if (this.data.currentPage < this.data.totalGroups - 1) {
            this.setData({
                currentPage: this.data.currentPage + 1
            }, () => {
                this.updateCurrentGroup();
            });
        }
    },

    // 切换到第一个随机卦象
    switchToFirstRandomHexagram() {
        const { randomHexagramOrder } = this.data;
        const firstIndex = randomHexagramOrder[0];
        this.setData({
            currentRandomIndex: 0,
            currentRandomHexagram: hexagramsData[firstIndex]
        });
    },

    // 上一个卦象（按乱序序列）
    previousRandomHexagram() {
        let { currentRandomIndex, randomHexagramOrder } = this.data;
        currentRandomIndex = (currentRandomIndex - 1 + randomHexagramOrder.length) % randomHexagramOrder.length;
        const hexagramIndex = randomHexagramOrder[currentRandomIndex];
        const hexagram = hexagramsData[hexagramIndex];
        
        this.setData({
            currentRandomIndex: currentRandomIndex,
            currentRandomHexagram: hexagram,
            // 同步更新六爻变的当前索引
            currentSixYaoIndex: currentRandomIndex
        });
    },
    
    // 下一个卦象（按乱序序列）
    nextRandomHexagram() {
        let { currentRandomIndex, randomHexagramOrder } = this.data;
        currentRandomIndex = (currentRandomIndex + 1) % randomHexagramOrder.length;
        const hexagramIndex = randomHexagramOrder[currentRandomIndex];
        const hexagram = hexagramsData[hexagramIndex];
        
        this.setData({
            currentRandomIndex: currentRandomIndex,
            currentRandomHexagram: hexagram,
            // 同步更新六爻变的当前索引
            currentSixYaoIndex: currentRandomIndex
        });
    },

    // 进入卦详情页
    goToHexagramDetail(e) {
        let hexagram;
        if (e.currentTarget) {
            // 从事件中获取
            hexagram = e.currentTarget.dataset.hexagram;
        } else {
            // 直接传入的卦象对象
            hexagram = e;
        }
        wx.navigateTo({
            url: `/subgames/64Hexagrams/pages/hexagram-detail/hexagram-detail?hexagramId=${hexagram.id}`
        });
    },

    // 触摸开始事件
    onTouchStart(e) {
        // 使用临时变量存储触摸开始位置
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    },

    // 触摸移动事件
    onTouchMove(e) {
        // 使用临时变量存储触摸移动位置
        this.touchMoveX = e.touches[0].clientX;
        this.touchMoveY = e.touches[0].clientY;
    },

    // 触摸结束事件
    onTouchEnd() {
        // 使用临时变量计算触摸距离
        const deltaX = this.touchMoveX - this.touchStartX;
        const deltaY = this.touchMoveY - this.touchStartY;
        const { viewMode } = this.data;
        
        // 增加滑动检测的阈值，只有明显的滑动动作才会触发翻页
        // 水平移动距离需要大于100px，且水平移动距离大于垂直移动距离的2倍
        // 这样可以确保只有真正的滑动才会触发翻页，避免点击时的轻微移动被误识别
        if (Math.abs(deltaX) > 100 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
            if (viewMode === 'sixYaoChange') {
                // 六爻变模式
                if (deltaX > 0) {
                    // 向右滑动，显示上一个卦象
                    this.previousSixYaoHexagram();
                } else {
                    // 向左滑动，显示下一个卦象
                    this.nextSixYaoHexagram();
                }
            } else if (viewMode === 'random') {
                // 随机翻阅模式
                if (deltaX > 0) {
                    // 向右滑动，显示上一个卦象
                    this.previousRandomHexagram();
                } else {
                    // 向左滑动，显示下一个卦象
                    this.nextRandomHexagram();
                }
            }
        }
        
        // 重置触摸事件相关的临时变量，避免影响下一次触摸事件
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchMoveX = 0;
        this.touchMoveY = 0;
    },

    // 生成六爻按钮配置
    generateSixYaoButtons(yaoStates) {
        return this.data.sixYaoConfig.map((config, index) => {
            const isYang = yaoStates[index] === 1;
            return {
                index: index,
                text: isYang ? config.yangText : config.yinText,
                symbol: isYang ? '⚊' : '⚋'
            };
        });
    },

    // 从卦象符号提取六爻状态
    extractYaoStatesFromSymbol(symbol) {
        // 预生成卦象符号到六爻状态的映射
        if (!this.yaoStatesMap) {
            this.yaoStatesMap = {};
            
            // 定义八卦的三爻状态（从下往上）
            const trigramStates = {
                '乾': [1, 1, 1],
                '坤': [0, 0, 0],
                '震': [1, 0, 0],
                '巽': [0, 1, 1],
                '坎': [0, 1, 0],
                '离': [1, 0, 1],
                '艮': [0, 0, 1],
                '兑': [1, 1, 0]
            };
            
            // 生成每个卦象的六爻状态
            // 六爻状态从下往上排列，索引0是最下面一爻
            const hexagramYaoStates = hexagramsData.map(hexagram => {
                const lowerTrigram = trigramStates[hexagram.lowerTrigram]; // 下卦
                const upperTrigram = trigramStates[hexagram.upperTrigram]; // 上卦
                return [...lowerTrigram, ...upperTrigram]; // 合并下卦和上卦，下卦在前（索引0-2），上卦在后（索引3-5）
            });
            
            // 生成映射表
            for (let i = 0; i < hexagramsData.length; i++) {
                const hexagram = hexagramsData[i];
                this.yaoStatesMap[hexagram.symbol] = hexagramYaoStates[i];
            }
        }
        
        // 返回对应的六爻状态，默认返回全阴
        return this.yaoStatesMap[symbol] || [0, 0, 0, 0, 0, 0];
    },

    // 根据六爻状态找到对应的卦象
    findHexagramByYaoStates(yaoStates) {
        // 遍历hexagramsData，找到匹配的卦象
        return hexagramsData.find(hexagram => {
            const states = this.extractYaoStatesFromSymbol(hexagram.symbol);
            return states.toString() === yaoStates.toString();
        });
    },

    // 切换到六爻变模式
    switchToSixYaoChange() {
        let currentIndex;
        
        // 根据当前模式获取当前卦象索引
        if (this.data.viewMode === 'random') {
            // 从随机模式切换过来，使用随机模式的索引
            currentIndex = this.data.currentRandomIndex;
        } else {
            // 从其他模式切换过来，使用六爻变的当前索引
            currentIndex = this.data.currentSixYaoIndex;
        }
        
        // 如果randomHexagramOrder为空，先初始化
        if (this.data.randomHexagramOrder.length === 0) {
            this.initializeRandomHexagrams();
        }
        
        // 使用已有的随机顺序数组
        const hexagramIndex = this.data.randomHexagramOrder[currentIndex];
        const hexagram = hexagramsData[hexagramIndex];
        const yaoStates = this.extractYaoStatesFromSymbol(hexagram.symbol);
        
        this.setData({
            viewMode: 'sixYaoChange',
            currentSixYaoIndex: currentIndex,
            currentSixYaoHexagram: hexagram,
            sixYaoStates: yaoStates,
            sixYaoButtons: this.generateSixYaoButtons(yaoStates),
            // 同步更新随机模式的当前索引
            currentRandomIndex: currentIndex
        });
    },
    
    // 上一个卦象（六爻变模式）
    previousSixYaoHexagram() {
        let { currentSixYaoIndex, randomHexagramOrder } = this.data;
        currentSixYaoIndex = (currentSixYaoIndex - 1 + randomHexagramOrder.length) % randomHexagramOrder.length;
        const hexagramIndex = randomHexagramOrder[currentSixYaoIndex];
        const hexagram = hexagramsData[hexagramIndex];
        const yaoStates = this.extractYaoStatesFromSymbol(hexagram.symbol);
        
        this.setData({
            currentSixYaoIndex: currentSixYaoIndex,
            currentSixYaoHexagram: hexagram,
            sixYaoStates: yaoStates,
            sixYaoButtons: this.generateSixYaoButtons(yaoStates),
            // 同步更新随机模式的当前索引
            currentRandomIndex: currentSixYaoIndex
        });
    },
    
    // 下一个卦象（六爻变模式）
    nextSixYaoHexagram() {
        let { currentSixYaoIndex, randomHexagramOrder } = this.data;
        currentSixYaoIndex = (currentSixYaoIndex + 1) % randomHexagramOrder.length;
        const hexagramIndex = randomHexagramOrder[currentSixYaoIndex];
        const hexagram = hexagramsData[hexagramIndex];
        const yaoStates = this.extractYaoStatesFromSymbol(hexagram.symbol);
        
        this.setData({
            currentSixYaoIndex: currentSixYaoIndex,
            currentSixYaoHexagram: hexagram,
            sixYaoStates: yaoStates,
            sixYaoButtons: this.generateSixYaoButtons(yaoStates),
            // 同步更新随机模式的当前索引
            currentRandomIndex: currentSixYaoIndex
        });
    },

    // 六爻按钮点击事件
    onYaoButtonTap(e) {
        const index = e.currentTarget.dataset.index;
        const newYaoStates = [...this.data.sixYaoStates];
        newYaoStates[index] = newYaoStates[index] === 0 ? 1 : 0; // 切换阴阳状态
        
        // 根据新的六爻状态找到对应的卦象
        const hexagram = this.findHexagramByYaoStates(newYaoStates);
        
        this.setData({
            sixYaoStates: newYaoStates,
            currentSixYaoHexagram: hexagram,
            sixYaoButtons: this.generateSixYaoButtons(newYaoStates)
        });
    },

    // 返回64卦配对
    goBack() {
        wx.navigateBack();
    },

    /**
     * 用户点击右上角分享给朋友
     */
    onShareAppMessage(options) {
        return {
            title: '易经六十四卦学习 - 探索中国传统哲学智慧',
            path: '/subgames/64Hexagrams/pages/hexagram-list/hexagram-list'
        };
    },

    /**
     * 用户点击右上角分享到朋友圈
     */
    onShareTimeline() {
        return {
            title: '易经六十四卦学习 - 探索中国传统哲学智慧',
            query: ''
        };
    }
});