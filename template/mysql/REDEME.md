## 项目指南

1. 先登录`mysql`程序,创建utf-8数据库:
```
CREATE DATABASE dataname DEFAULT CHARACTER SET utf8 COLLATE utf8_general_
ci;
```
2. 进入`src/conf/secretKeys.js`,设置mysql连接密码.
3. 执行重置表命令: `npm run sync:force`
4. `npm run dev`

## 已有功能

* 用户注册/登录/获取用户信息
* 文件上传功能
