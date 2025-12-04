// 引入完整的六十四卦数据
const hexagramsData = require('../../hexagrams-data.js').hexagramsData;

Page({
    data: {
        hexagram: null,
        relatedHexagrams: {
            mutual: null, // 互卦
            comprehensive: null, // 综卦
            opposite: null // 错卦
        }
    },

    onLoad(options) {
        const hexagramId = parseInt(options.hexagramId);
        const hexagram = hexagramsData.find(h => h.id === hexagramId);
        
        if (hexagram) {
            // 获取相关卦信息
            const relatedHexagrams = this.getRelatedHexagrams(hexagram);
            
            this.setData({
                hexagram: hexagram,
                relatedHexagrams: relatedHexagrams
            });
        } else {
            // 如果找不到卦象，显示提示信息
            this.setData({
                hexagram: {
                    name: '未找到卦象',
                    pinyin: 'Hexagram not found',
                    symbol: '?',
                    id: hexagramId,
                    alias: '未找到卦象',
                    upperTrigram: '',
                    lowerTrigram: '',
                    characteristics: '',
                    level: '',
                    xiangYue: '',
                    description: '请返回列表重新选择',
                    hexagramText: '数据加载失败',
                    yaoTexts: ['数据加载失败']
                },
                relatedHexagrams: {
                    mutual: { id: 0, name: '未知', symbol: '?', alias: '未知' },
                    comprehensive: { id: 0, name: '未知', symbol: '?', alias: '未知' },
                    opposite: { id: 0, name: '未知', symbol: '?', alias: '未知' }
                }
            });
        }
    },
    
    // 获取相关卦信息
    getRelatedHexagrams(hexagram) {
        // 互卦：根据mutualHexagram字段获取
        const mutualHexagram = hexagramsData.find(h => h.id === hexagram.mutualHexagram) || {
            id: 0, name: '未知', symbol: '?', alias: '未知'
        };
        
        // 综卦：根据reverseHexagram字段获取
        const comprehensiveHexagram = hexagramsData.find(h => h.id === hexagram.reverseHexagram) || {
            id: 0, name: '未知', symbol: '?', alias: '未知'
        };
        
        // 错卦：根据oppositeHexagram字段获取
        const oppositeHexagram = hexagramsData.find(h => h.id === hexagram.oppositeHexagram) || {
            id: 0, name: '未知', symbol: '?', alias: '未知'
        };
        
        return {
            mutual: mutualHexagram,
            comprehensive: comprehensiveHexagram,
            opposite: oppositeHexagram
        };
    },
    
    // 跳转到相关卦的详情页
    goToHexagramDetail(e) {
        const hexagramId = parseInt(e.currentTarget.dataset.hexagramId);
        wx.navigateTo({
            url: `/subgames/64Hexagrams/pages/hexagram-detail/hexagram-detail?hexagramId=${hexagramId}`
        });
    },

    // 返回列表
    goBackToList() {
        wx.navigateBack();
    },

    /**
     * 用户点击右上角分享给朋友
     */
    onShareAppMessage(options) {
        return {
            title: `${this.data.hexagram.name} - 易经六十四卦学习`,
            path: `/subgames/64Hexagrams/pages/hexagram-detail/hexagram-detail?hexagramId=${this.data.hexagram.id}`
        };
    },

    /**
     * 用户点击右上角分享到朋友圈
     */
    onShareTimeline() {
        return {
            title: `${this.data.hexagram.name} - 易经六十四卦学习`,
            query: `hexagramId=${this.data.hexagram.id}`
        };
    }
});