/*
 * @Date: 2021-04-20 13:50:20
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-10 21:13:19
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
var setToken = (uni,pass) =>{
  const secret = 'JQREAD';
  const payload = {
    unique: uni,
    password: pass
  }
  let token = jwt.sign(payload, secret,{expiresIn: 60*60});
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
            res.json({
              code: '0',
              msg: '注册成功',
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
router.post('/getClass', (req, res) => {
  let sql = $sql.course.query;
  let { unique } = req.body;
  conn.query(sql, [unique], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  })
});
router.post('/joinClass', (req, res) => {
  let sql = $sql.course.add;
  let sql2 = $sql.course.queryClass;
  let { unique,courseid } = req.body;
  conn.query(sql2, [courseid], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length !== 0) {
      conn.query(sql, [unique,courseid], (err, result) => {
        if (err) {
          console.log(err);
        }
        res.json({
          code: '0',
          msg: '添加成功'
        })
      });
    }
  });
});
router.post('/queryPerson', (req, res) => {
  let sql = $sql.user.query;
  let { unique } = req.body;
  conn.query(sql, [unique], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  })
});
router.post('/updataPerson', (req, res) => {
  let sql = $sql.user.updata;
  console.log(req.body);
  let { name,password,sex,born,addres,telnumber,department,grade,user_class,number } = req.body;
  conn.query(sql, [name,password,sex,born,addres,telnumber,department,grade,user_class,number ], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  })
});

module.exports = router;
