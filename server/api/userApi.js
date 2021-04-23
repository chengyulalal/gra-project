/*
 * @Date: 2021-04-20 13:50:20
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-04-23 15:34:45
 * @FilePath: \gra-project-sourcetree\server\api\userApi.js
 */
const models = require('../db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sqlMap');
const jwt = require('jsonwebtoken');

var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonwrite = (res, result) => {
if (result.length === 0) {
  res.json({
    code: '1',
    msg: '操作失败',
    });
  } else {
    res.json(result);
  }
};
// router.post('/verifyToken', (req, res) => {
//   let token = req.headers['y-Token'];
//   const secret = 'JQREAD';
//   if (token) {
//     jwt.verify(oldToken, secret, (err, decoded) => {
//       if(err){
//        console.log(err);
//        return
//       }
//       return 
//     });
//   } else {
//     return null
//   }
// });
var setToken = (uni,pass) =>{
  const secret = 'JQREAD';
  const payload = {
    unique: uni,
    password: pass
  }
  let token = jwt.sign(payload, secret);
  return token
}
router.post('/addUser', (req, res) => {
    let sql = $sql.user.add;
    let { unique, name, Pass, user} = req.body;
    if (user === '学生') {
      user = 1;
    } else user = 0;
    conn.query($sql.user.query, [unique], (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length !== 0) {
        res.json({
          code: '1',
          msg: '用户已注册',
        });
      } else {
          conn.query(sql, [unique, name, Pass, user], (err, result) => {
            if (err) {
              console.log(err);
            }
            setToken(unique,Pass);
            res.json({
              code: '1',
              msg: '操作失败',
              user_token: setToken(unique,Pass)
            });
          });
        }
    })
});
router.post('/getUser', (req, res) => {
    let sql = $sql.user.get;
    let { unique,password,auth } = req.body;
    if (auth === '学生') {
      auth = 1;
    } else auth = 0;
    conn.query(sql, [unique,password,auth], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length !== 0) {
      result[0].user_token = setToken(unique,password);
      res.json(result);
    } else 
      jsonwrite(res,result);
    });
});
module.exports = router;