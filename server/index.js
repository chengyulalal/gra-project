/*
 * @Date: 2021-04-20 13:40:06
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-08 11:06:47
 * @FilePath: \gra-project-sourcetree\server\index.js
 */
const express = require('express');
const app = express();
const userapi = require('./api/userApi');
const jwt = require('jsonwebtoken');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(function (req, res, next) {
  console.log(req.url);
  if (req.url != '/api/getUser' && req.url != '/api/addUser') {
    const secret = 'JQREAD';
    let token = req.headers.authorization;
    if (!token) {
      res.status(401).send("token不能为空");
      return
    }
    let result = jwt.verify(token, secret)
    console.log(result);
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
        console.log(result);
        res.send({status: 403, msg: '登录已过期,请重新登录'});
    } else {
        next();
    }
  } else {
    next();
  }
});
app.use('/api', userapi);
app.listen(port,() => { console.log(`Server is running at http://localhost:3000`) });
