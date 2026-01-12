// 尝试引入云存储模块，添加错误处理
let cloudStorage = null;
try {
  cloudStorage = require('../../utils/cloudStorage');
} catch (error) {
  console.error('引入云存储模块失败:', error);
  // 提供备用实现
  cloudStorage = {
    getImage: (fileName) => {
      return new Promise((resolve) => {
        // 使用本地默认图片
        const defaultPaths = {
          'official-account-qr.png': '/images/official-account-qr.png',
          'wyhd-share-default.png': '/images/qrcode-default.png'
        };
        resolve(defaultPaths[fileName] || '/images/qrcode-default.png');
      });
    }
  };
}

Page({
  data: {
    officialAccountQrUrl: '',
    wyhdShareDefaultUrl: ''
  },
  onLoad() {
    // 获取公众号二维码URL
    cloudStorage.getImage('official-account-qr.png')
      .then(url => {
        this.setData({
          officialAccountQrUrl: url
        });
      })
      .catch(error => {
        console.error('Get official account QR code error:', error);
      });

    // 获取分享默认图片URL
    cloudStorage.getImage('wyhd-share-default.png')
      .then(url => {
        this.setData({
          wyhdShareDefaultUrl: url
        });
      })
      .catch(error => {
        console.error('Get share default image error:', error);
      });
  },
  
  onShareAppMessage() {
    return {
      title: '文益互动 - 传统文化益智互动群落',
      path: '/pages/index/index',
      imageUrl: this.data.wyhdShareDefaultUrl
    };
  },
  
  onShareTimeline() {
    return {
      title: '文益互动 - 传统文化益智互动群落',
      query: '',
      imageUrl: this.data.wyhdShareDefaultUrl
    };
  },
  
  // 公众号组件加载成功
  onOfficialAccountLoad(e) {
    console.log('公众号组件加载成功:', e);
  },
  
  // 公众号组件加载失败
  onOfficialAccountError(e) {
    console.error('公众号组件加载失败:', e);
  },
  
  // 关注公众号按钮点击事件
  onWechatBtnTap() {
    wx.showActionSheet({
      itemList: ['复制公众号名称', '查看关注教程'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 复制公众号名称到剪贴板
          wx.setClipboardData({
            data: '传统文化益智互动群落',
            success: () => {
              wx.showToast({
                title: '公众号名称已复制',
                icon: 'success'
              });
            }
          });
        } else if (res.tapIndex === 1) {
          // 显示关注教程
          wx.showModal({
            title: '关注教程',
            content: '1. 打开微信\n2. 点击右上角+号\n3. 选择"添加朋友"\n4. 选择"公众号"\n5. 粘贴或输入"传统文化益智互动群落"\n6. 点击关注',
            showCancel: false,
            confirmText: '我知道了',
            confirmColor: '#8B4513'
          });
        }
      }
    });
  }
});