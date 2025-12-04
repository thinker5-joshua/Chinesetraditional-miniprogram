// 引入完整的六十四卦数据
const hexagramsData = require('../../hexagrams-data.js').hexagramsData;

Page({
    data: {
        // 查看模式：'random' 随机翻阅, 'group' 分组查看
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
        
        // 触摸事件相关
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0
    },

    onLoad() {
        this.initializeGroups();
        if (this.data.viewMode === 'random') {
            this.initializeRandomHexagrams();
            this.switchToFirstRandomHexagram();
        } else {
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
        this.setData({
            viewMode: 'random'
        }, () => {
            this.initializeRandomHexagrams();
            this.switchToFirstRandomHexagram();
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
        this.setData({
            currentRandomIndex: currentRandomIndex,
            currentRandomHexagram: hexagramsData[hexagramIndex]
        });
    },

    // 下一个卦象（按乱序序列）
    nextRandomHexagram() {
        let { currentRandomIndex, randomHexagramOrder } = this.data;
        currentRandomIndex = (currentRandomIndex + 1) % randomHexagramOrder.length;
        const hexagramIndex = randomHexagramOrder[currentRandomIndex];
        this.setData({
            currentRandomIndex: currentRandomIndex,
            currentRandomHexagram: hexagramsData[hexagramIndex]
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
        this.setData({
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY
        });
    },

    // 触摸移动事件
    onTouchMove(e) {
        this.setData({
            moveX: e.touches[0].clientX,
            moveY: e.touches[0].clientY
        });
    },

    // 触摸结束事件
    onTouchEnd() {
        const { startX, moveX } = this.data;
        const deltaX = moveX - startX;
        
        // 设定滑动阈值，大于50px才触发翻页
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // 向右滑动，显示上一个卦象
                this.previousRandomHexagram();
            } else {
                // 向左滑动，显示下一个卦象
                this.nextRandomHexagram();
            }
        }
    },

    // 返回64卦配对
    goBack() {
        wx.navigateBack();
    }
});