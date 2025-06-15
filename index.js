const express = require('express');
const fs = require('fs');
const path = require('path');

// 加载web.json配置
const config = JSON.parse(fs.readFileSync('web.json', 'utf8'));

const app = express();
const port = config.port || 3000;

// 设置静态文件目录
if (config.static) {
  app.use(express.static(path.join(__dirname, config.static)));
}

// 设置路由
if (config.routes) {
  Object.entries(config.routes).forEach(([route, file]) => {
    app.get(route, (req, res) => {
      res.sendFile(path.join(__dirname, config.templates || '', file));
    });
  });
}

// 加载自定义设置
const settings = require('./settings.js');

// 启动服务器
app.listen(port, () => {
  console.log(settings.startupMessage.replace('${port}', port));
});