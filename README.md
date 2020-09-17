# MyTools

这是一个自有API的仓库

存放了一些个人用的工具与接口, 欢迎fork

基于 [next.js](https://nextjs.org/)

后端依赖于 [Vercel](https://vercel.com/) 的免费 `serverless function` 服务部署, 无需付出额外的成本。

## 环境变量

- MONGO_URL: mongo连接地址
- BAIDU_AI_ID: 百度AI appId
- BAIDU_AI_AK: 百度AI appKey
- BAIDU_AI_SK: 百度AI secretKey

你需要手动在Vercel中配置这些环境变量以使其中的功能能正常运行.

## 自部署

使用Vercel部署

直接导入: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https://github.com/moonrailgun/moonrailgunAPI)

创建自己的备份: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/moonrailgun/moonrailgunAPI)

## 使用数据库

使用你自己的的MongoDB或者使用**完全免费**的MongoDB集群: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 本地开发指令

安装依赖:
```
yarn
```

开发:
```bash
yarn dev
```

构建:
```bash
yarn build
yarn start
```
