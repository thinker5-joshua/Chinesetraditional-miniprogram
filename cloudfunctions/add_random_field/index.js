// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const collection = db.collection('daily_quotes')
const MAX_LIMIT = 100 // 云数据库最大查询限制

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 步骤1: 获取总记录数
    const countResult = await collection.count()
    const total = countResult.total
    console.log(`总共有 ${total} 条格言`)
    
    // 步骤2: 分页查询所有格言
    let allQuotes = []
    let offset = 0
    
    while (offset < total) {
      const result = await collection.skip(offset).limit(MAX_LIMIT).get()
      allQuotes = [...allQuotes, ...result.data]
      offset += MAX_LIMIT
      console.log(`已查询 ${allQuotes.length}/${total} 条格言`)
    }
    
    console.log(`找到 ${allQuotes.length} 条格言`)
    
    // 步骤3: 为每条格言添加randomField字段（分批处理）
    let updatedCount = 0
    const batchSize = 10 // 每批处理10条，避免并发限制
    
    for (let i = 0; i < allQuotes.length; i += batchSize) {
      const batchQuotes = allQuotes.slice(i, i + batchSize)
      const updatePromises = batchQuotes.map(quote => {
        return collection.doc(quote._id).update({
          data: {
            randomField: Math.random() // 生成0-1之间的随机数
          }
        })
      })
      
      // 执行批量更新
      const batchResults = await Promise.all(updatePromises)
      updatedCount += batchResults.length
      console.log(`已更新 ${updatedCount}/${allQuotes.length} 条格言`)
      
      // 短暂延迟，避免触发频率限制
      if (i + batchSize < allQuotes.length) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
    
    console.log(`成功更新 ${updatedCount} 条格言`)
    
    return {
      success: true,
      updatedCount: updatedCount,
      message: `成功为 ${updatedCount} 条格言添加randomField字段`
    }
  } catch (error) {
    console.error('添加randomField字段失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
