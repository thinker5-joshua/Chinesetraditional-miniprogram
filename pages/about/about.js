Page({
  data: {
    
  },
  onLoad() {
    
  },
  
  onShareAppMessage() {
    return {
      title: '文益互动 - 传统文化益智互动群落',
      path: '/pages/index/index',
      imageUrl: '/images/wyhd-share-default.png'
    };
  },
  
  onShareTimeline() {
    return {
      title: '文益互动 - 传统文化益智互动群落',
      query: '',
      imageUrl: '/images/wyhd-share-default.png'
    };
  }
});