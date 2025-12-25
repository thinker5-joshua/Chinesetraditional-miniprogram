// 引入完整的六十四卦数据
const hexagramsData = require('../../hexagrams-data.js').hexagramsData;

Page({
    data: {
        leftCards: [],
        rightCards: [],
        selectedCards: [],
        matchedHexagrams: [],
        progressText: "0/3",
        progressWidth: "0%",
        successCount: 0,
        selectedDisplay: "未选择",
        showSuccessModal: false,
        currentHexagrams: [],
        remainingHexagrams: [],
        matchedPairs: [] // 存储已匹配的卦对，用于颜色区分
    },

    onLoad() {
        this.initGame();
    },

    // 初始化游戏
    initGame() {
        // 从64卦中随机选择4个卦象
        const shuffledHexagrams = [...hexagramsData].sort(() => Math.random() - 0.5);
        const gameHexagrams = shuffledHexagrams.slice(0, 4);
        
        const currentHexagrams = gameHexagrams;
        const remainingHexagrams = [...gameHexagrams];
        
        // 为右侧创建打乱顺序的卦名
        const nameHexagrams = [...currentHexagrams].sort(() => Math.random() - 0.5);
        
        this.setData({
            leftCards: currentHexagrams,
            rightCards: nameHexagrams,
            selectedCards: [],
            matchedHexagrams: [],
            currentHexagrams: currentHexagrams,
            remainingHexagrams: remainingHexagrams,
            matchedPairs: [], // 清空已匹配的卦对
            progressText: "0/4",
            progressWidth: "0%",
            successCount: 0,
            selectedDisplay: "未选择"
        });
        

    },

    // 选择卡片
    selectCard(e) {
        const card = e.currentTarget.dataset.card;
        const side = e.currentTarget.dataset.side;
        
        // 如果已经选中了两个，不允许再选
        if (this.data.selectedCards.length >= 2) {
            return;
        }

        // 检查是否已经选中了这个卡片
        const isSelected = this.data.selectedCards.some(selected => 
            selected.id === card.id && selected.side === side
        );
        
        if (isSelected) {
            // 取消选中
            const newSelectedCards = this.data.selectedCards.filter(selected => 
                !(selected.id === card.id && selected.side === side)
            );
            this.updateCardStates(newSelectedCards);
            this.setData({
                selectedCards: newSelectedCards,
                selectedDisplay: this.updateSelectedDisplay(newSelectedCards)
            });
            return;
        }

        // 如果已经选中了一个，检查类型是否不同
        if (this.data.selectedCards.length === 1) {
            const selectedCard = this.data.selectedCards[0];
            if (selectedCard.side === side) {
                // 类型相同，不能匹配
                wx.showToast({
                    title: '请选择一个卦象和一个卦名进行匹配',
                    icon: 'none',
                    duration: 2000
                });
                return;
            }
        }

        // 添加选中状态
        const newSelectedCards = [...this.data.selectedCards, { ...card, side }];
        this.updateCardStates(newSelectedCards);
        this.setData({
            selectedCards: newSelectedCards,
            selectedDisplay: this.updateSelectedDisplay(newSelectedCards)
        });

        // 如果选中了两个，检查是否匹配
        if (newSelectedCards.length === 2) {
            setTimeout(() => {
                this.checkMatch(newSelectedCards);
            }, 300);
        }
    },

    // 更新卡片选中状态
    updateCardStates(selectedCards) {
        const leftCards = this.data.leftCards.map(card => {
            const matchedPair = this.data.matchedPairs.find(pair => pair.id === card.id);
            return {
                ...card,
                selected: selectedCards.some(selected => selected.id === card.id && selected.side === 'left'),
                matched: !!matchedPair,
                matchColor: matchedPair ? matchedPair.color : null
            };
        });
        
        const rightCards = this.data.rightCards.map(card => {
            const matchedPair = this.data.matchedPairs.find(pair => pair.id === card.id);
            return {
                ...card,
                selected: selectedCards.some(selected => selected.id === card.id && selected.side === 'right'),
                matched: !!matchedPair,
                matchColor: matchedPair ? matchedPair.color : null
            };
        });
        
        this.setData({
            leftCards,
            rightCards
        });
    },

    // 更新选中显示
    updateSelectedDisplay(selectedCards) {
        if (selectedCards.length === 0) {
            return "未选择";
        } else {
            const selectedTexts = selectedCards.map(item => {
                return item.side === 'left' ? '卦象' : item.name;
            });
            return selectedTexts.join('、');
        }
    },

    // 检查匹配
    checkMatch(selectedCards) {
        const [first, second] = selectedCards;
        
        if (first.id === second.id) {
            // 匹配成功
            wx.showToast({
                title: '匹配成功！',
                icon: 'success',
                duration: 1500
            });

            // 为匹配的卦对分配颜色
            const colors = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63']; // 绿色、蓝色、橙色、粉色
            const newMatchedPair = {
                id: first.id,
                color: colors[this.data.successCount] // 按匹配顺序分配颜色
            };
            
            // 添加到已匹配列表
            const newMatchedPairs = [...this.data.matchedPairs, newMatchedPair];
            
            // 从剩余卦象中移除
            const newRemainingHexagrams = this.data.remainingHexagrams.filter(
                hexagram => hexagram.id !== first.id
            );
            
            // 增加匹配计数
            const newSuccessCount = this.data.successCount + 1;
            const newMatchedHexagrams = [...this.data.matchedHexagrams, hexagramsData.find(h => h.id === first.id)];
            
            // 立即更新进度条（在弹详情之前）
            const progressWidth = (newSuccessCount / 4) * 100;

            
            this.setData({
                successCount: newSuccessCount,
                progressText: `${newSuccessCount}/4`,
                progressWidth: `${progressWidth}%`,
                remainingHexagrams: newRemainingHexagrams,
                matchedHexagrams: newMatchedHexagrams,
                matchedPairs: newMatchedPairs, // 更新匹配的卦对
                selectedCards: [],
                selectedDisplay: "未选择"
            });
            
            // 清除选中状态并更新匹配状态
            this.updateCardStates([]);

            // 匹配成功后不显示卦详情页，直接更新进度

            // 检查游戏是否结束
            if (newRemainingHexagrams.length === 0) {
                setTimeout(() => {
                    this.setData({
                        showSuccessModal: true
                    });
                }, 1500);
            }
        } else {
            // 匹配失败
            wx.showToast({
                title: '匹配失败，请再试一次',
                icon: 'none',
                duration: 1500
            });

            // 延迟后清除选中状态
            setTimeout(() => {
                this.setData({
                    selectedCards: [],
                    selectedDisplay: "未选择"
                });
                this.updateCardStates([]);
            }, 500);
        }
    },

    // 显示卦象详情 - 跳转到详情页
    showHexagramDetail(e) {
        let hexagram;
        if (e.currentTarget) {
            // 从事件中获取
            hexagram = e.currentTarget.dataset.hexagram;
        } else {
            // 直接传入的卦象对象
            hexagram = e;
        }
        
        // 跳转到详情页
        wx.navigateTo({
            url: `/subgames/64Hexagrams/pages/hexagram-detail/hexagram-detail?hexagramId=${hexagram.id}`
        });
    },

    // 去学卦
    goToLearnHexagrams() {
        wx.navigateTo({
            url: '/subgames/64Hexagrams/index'
        });
    },

    // 再玩一次
    playAgain() {
        this.setData({
            showSuccessModal: false
        });
        this.initGame();
    },

    // 返回首页
    goBack() {
        wx.navigateBack();
    },

    // 分享给朋友
    onShareAppMessage() {
        return {
            title: '易经六十四卦配对游戏',
            path: '/subgames/64Hexagrams/pages/matching/matching',
            imageUrl: '/images/wyhd-share-default.png'
        };
    },

    // 分享到朋友圈
    onShareTimeline() {
        return {
            title: '易经六十四卦配对游戏',
            query: '',
            imageUrl: '/images/wyhd-share-default.png'
        };
    }
});