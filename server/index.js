/*
 * @Date: 2021-04-20 13:40:06
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-10 15:10:22
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
    let result = jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err);
        if(err.name == 'TokenExpiredError'){
          //token过期
          return res.status(403).send({ code: -1, msg: 'token过期' });
        }else if(err.name == 'JsonWebTokenError'){
          //无效的token
          return res.status(403).send({ code: -1, msg: '无效的token' });
        }
      }else{
        next();
      }
    })
  } else {
    next();
  }
});
app.use('/api', userapi);
app.listen(port,() => { console.log(`Server is running at http://localhost:3000`) });
