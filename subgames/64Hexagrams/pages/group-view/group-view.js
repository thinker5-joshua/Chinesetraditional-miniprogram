// 引入完整的六十四卦数据
const hexagramsData = require('../../hexagrams-data.js').hexagramsData;

Page({
    data: {
        // 分组相关
        groupMode: 'sequence', // 'sequence' 顺序, 'palace' 八宫
        currentPage: 0,
        totalGroups: 8,
        currentHexagrams: [],
        currentGroupTitle: '',
        currentGroupSubtitle: '',
        sequenceGroups: [],
        palaceGroups: []
    },
    
    onLoad() {
        this.initializeGroups();
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

        // 处理八宫分组，确保每个卦象ID都能找到对应的卦象数据
        const processedPalaceGroups = palaceGroups.map(group => {
            // 过滤掉找不到对应卦象的ID
            const validHexagrams = group.hexagrams.map(id => {
                const hexagram = hexagramsData.find(h => h.id === id);
                return hexagram || null;
            }).filter(hexagram => hexagram !== null); // 过滤掉null值
            
            return {
                ...group,
                hexagrams: validHexagrams
            };
        });

        this.setData({
            sequenceGroups: sequenceGroups,
            palaceGroups: processedPalaceGroups
        }, () => {
            // 在setData完成后调用updateCurrentGroup，确保数据已经初始化完成
            this.updateCurrentGroup();
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
            groupTitle = currentGroup ? currentGroup.title : '';
            groupSubtitle = currentGroup ? currentGroup.subtitle : '';
        }

        this.setData({
            currentHexagrams: currentGroup ? currentGroup.hexagrams : [],
            currentGroupTitle: groupTitle,
            currentGroupSubtitle: groupSubtitle,
            totalGroups: groups.length
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
    
    // 返回首页
    goBack() {
        wx.navigateBack();
    }
});