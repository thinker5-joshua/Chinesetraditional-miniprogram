# 守护神兽图片映射方案

## 问题描述
11个脊兽的图形已上传到微信云开发环境，目录为：`tradengage`，但命名是随机生成的，没有规律。

## 解决方案
采用标准化命名方案，将云存储中的图片文件重命名为与脊兽ID对应的名称，程序直接通过ID访问图片。

## 标准化命名规则
云存储图片路径格式：`cloud://tradengage/guardian-beast/{beastId}.png`

## 脊兽ID与图片对应表

| 脊兽ID | 脊兽名称 | 标准化文件名 | 备注 |
|--------|----------|--------------|------|
| xianren | 骑凤仙人 | cloud://tradengage/guardian-beast/xianren.png | 领队 |
| dragon | 龙 | cloud://tradengage/guardian-beast/dragon.png | 第一名 |
| phoenix | 凤 | cloud://tradengage/guardian-beast/phoenix.png | 第二名 |
| lion | 狮子 | cloud://tradengage/guardian-beast/lion.png | 第三名 |
| tianma | 天马 | cloud://tradengage/guardian-beast/tianma.png | 第四名 |
| haima | 海马 | cloud://tradengage/guardian-beast/haima.png | 第五名 |
| suanmi | 狻猊 | cloud://tradengage/guardian-beast/suanmi.png | 第六名 |
| xiayu | 狎鱼 | cloud://tradengage/guardian-beast/xiayu.png | 第七名 |
| xiezhi | 獬豸 | cloud://tradengage/guardian-beast/xiezhi.png | 第八名 |
| douniu | 斗牛 | cloud://tradengage/guardian-beast/douniu.png | 第九名 |
| hangshi | 行什 | cloud://tradengage/guardian-beast/hangshi.png | 第十名 |

## 实施步骤
1. 登录微信云开发控制台
2. 进入存储管理
3. 找到 `tradengage` 目录下的11个图片文件
4. 根据上述对应表，将每个图片文件重命名为对应的标准化文件名
5. 确保所有图片文件都在 `tradengage/guardian-beast/` 目录下

## 程序访问方式
程序中已配置为直接通过脊兽ID访问图片，例如：
```javascript
// 获取骑凤仙人图片
const xianrenImage = `cloud://tradengage/guardian-beast/xianren.png`;
```

## 优势
1. **简单直接**：无需复杂的云函数映射
2. **易于维护**：新增或修改脊兽时，只需按照规则命名图片即可
3. **性能高效**：直接访问图片，无需额外计算
4. **清晰明了**：文件名与脊兽ID一一对应，便于开发和调试

## 注意事项
1. 确保图片格式为PNG
2. 确保文件名拼写与脊兽ID完全一致（区分大小写）
3. 确保所有图片都已正确上传到指定目录
4. 如遇访问问题，检查云存储权限设置