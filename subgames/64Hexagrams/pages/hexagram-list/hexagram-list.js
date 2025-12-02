// 引入完整的六十四卦数据
const hexagramsData = require('../../hexagrams-data.js').hexagramsData;

Page({
    data: {
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
        this.updateCurrentGroup();
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
                hexagrams: [0, 43, 32, 11, 19, 22, 34, 13] // 乾(1)、姤(44)、遁(33)、否(12)、观(20)、剥(23)、晋(35)、大有(14)
            },
            {
                title: '坎宫',
                subtitle: '坎为水母，润泽万物',
                hexagrams: [28, 59, 2, 62, 48, 54, 35, 6] // 坎(29)、节(60)、屯(3)、既济(63)、革(49)、丰(55)、明夷(36)、师(7)
            },
            {
                title: '艮宫',
                subtitle: '艮为山止，稳重如山',
                hexagrams: [51, 21, 25, 40, 37, 9, 60, 52] // 艮(52)、贲(22)、大畜(26)、损(41)、睽(38)、履(10)、中孚(61)、渐(53)
            },
            {
                title: '震宫',
                subtitle: '震为雷动，奋发图强',
                hexagrams: [50, 15, 39, 31, 45, 47, 27, 16] // 震(51)、豫(16)、解(40)、恒(32)、升(46)、井(48)、大过(28)、随(17)
            },
            {
                title: '巽宫',
                subtitle: '巽为风行，无孔不入',
                hexagrams: [56, 8, 36, 41, 24, 20, 26, 17] // 巽(57)、小畜(9)、家人(37)、益(42)、无妄(25)、噬嗑(21)、颐(27)、蛊(18)
            },
            {
                title: '离宫',
                subtitle: '离为火明，照亮前程',
                hexagrams: [29, 55, 49, 63, 3, 58, 5, 12] // 离(30)、旅(56)、鼎(50)、未济(64)、蒙(4)、涣(59)、讼(6)、同人(13)
            },
            {
                title: '坤宫',
                subtitle: '坤为地母，厚德载物',
                hexagrams: [1, 23, 18, 10, 33, 42, 4, 7] // 坤(2)、复(24)、临(19)、泰(11)、大壮(34)、夬(43)、需(5)、比(8)
            },
            {
                title: '兑宫',
                subtitle: '兑为泽悦，和气生财',
                hexagrams: [57, 46, 44, 30, 38, 14, 61, 53] // 兑(58)、困(47)、萃(45)、咸(31)、蹇(39)、谦(15)、小过(62)、归妹(54)
            }
        ];

        this.setData({
            sequenceGroups: sequenceGroups,
            palaceGroups: palaceGroups.map(group => ({
                ...group,
                hexagrams: group.hexagrams.map(index => hexagramsData[index])
            }))
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
        const hexagram = e.currentTarget.dataset.hexagram;
        wx.navigateTo({
            url: `/subgames/64Hexagrams/pages/hexagram-detail/hexagram-detail?hexagramId=${hexagram.id}`
        });
    },

    // 返回64卦配对
    goBack() {
        wx.navigateBack();
    }
});