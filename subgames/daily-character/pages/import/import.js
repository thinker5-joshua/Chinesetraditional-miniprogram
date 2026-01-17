// 数据导入测试页面逻辑

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isImporting: false,
    importResult: null,
    logs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.addLog('页面加载完成');
    this.checkCloudEnv();
  },

  /**
   * 检查云开发环境
   */
  checkCloudEnv: function() {
    if (wx.cloud) {
      this.addLog('云开发环境已初始化');
    } else {
      this.addLog('云开发环境未初始化');
      wx.showToast({
        title: '云开发环境未初始化',
        icon: 'none'
      });
    }
  },

  /**
   * 开始导入数据
   */
  importData: function() {
    const that = this;
    
    wx.showModal({
      title: '导入确认',
      content: '确定要开始导入数据吗？这将把462条每日一字数据导入到云数据库。',
      success: function(res) {
        if (res.confirm) {
          that.setData({
            isImporting: true,
            importResult: null
          });
          
          that.addLog('开始执行数据导入');
          
          // 调用云函数
          wx.cloud.callFunction({
            name: 'import_to_cloud',
            data: {},
            success: function(res) {
              that.addLog('云函数调用成功');
              that.handleImportResult(res.result);
            },
            fail: function(error) {
              that.addLog('云函数调用失败: ' + error.message);
              that.setData({
                isImporting: false,
                importResult: {
                  success: false,
                  message: '云函数调用失败: ' + error.message
                }
              });
              
              wx.showToast({
                title: '导入失败',
                icon: 'none'
              });
            }
          });
        }
      }
    });
  },

  /**
   * 处理导入结果
   */
  handleImportResult: function(result) {
    this.addLog('导入结果: ' + JSON.stringify(result));
    
    this.setData({
      isImporting: false,
      importResult: result
    });
    
    if (result.success) {
      wx.showToast({
        title: '导入成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '导入失败',
        icon: 'none'
      });
    }
  },

  /**
   * 检查数据
   */
  checkData: function() {
    const that = this;
    
    this.addLog('开始检查云数据库数据');
    
    // 调用云函数检查数据
    wx.cloud.callFunction({
      name: 'import_to_cloud',
      data: {
        action: 'check'
      },
      success: function(res) {
        that.addLog('数据检查完成');
        that.handleCheckResult(res.result);
      },
      fail: function(error) {
        that.addLog('数据检查失败: ' + error.message);
        
        wx.showToast({
          title: '检查失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 处理数据检查结果
   */
  handleCheckResult: function(result) {
    if (result.success) {
      wx.showModal({
        title: '数据检查结果',
        content: `云数据库中共有 ${result.count} 条数据`,
        showCancel: false
      });
    } else {
      wx.showToast({
        title: '检查失败: ' + result.message,
        icon: 'none'
      });
    }
  },

  /**
   * 添加操作日志
   */
  addLog: function(content) {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    const newLog = {
      time: time,
      content: content
    };
    
    const logs = this.data.logs;
    logs.push(newLog);
    
    // 限制日志数量
    if (logs.length > 50) {
      logs.shift();
    }
    
    this.setData({
      logs: logs
    });
  }
});
