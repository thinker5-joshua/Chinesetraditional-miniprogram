// 引入完整的六十四卦数据
const hexagramsData = require('../../hexagrams-data.js').hexagramsData;

Page({
    data: {
        hexagram: null
    },

    onLoad(options) {
        const hexagramId = parseInt(options.hexagramId);
        const hexagram = hexagramsData.find(h => h.id === hexagramId);
        
        console.log('hexagramId:', hexagramId);
        console.log('hexagram:', hexagram);
        console.log('hexagramsData length:', hexagramsData.length);
        
        if (hexagram) {
            this.setData({
                hexagram: hexagram
            });
        } else {
            // 如果找不到卦象，显示提示信息
            this.setData({
                hexagram: {
                    name: '未找到卦象',
                    pinyin: 'Hexagram not found',
                    symbol: '?',
                    id: hexagramId,
                    hexagramText: '请返回列表重新选择',
                    yaoTexts: ['数据加载失败']
                }
            });
        }
    },

    // 返回列表
    goBackToList() {
        wx.navigateBack();
    }
});