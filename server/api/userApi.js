/*
 * @Date: 2021-04-20 13:50:20
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-22 19:58:15
 * @FilePath: \gra-project-sourcetree\server\api\userApi.js
 */
const models = require('../db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sqlMap');
const jwt = require('jsonwebtoken');
const multiparty = require("multiparty");
const fs = require('fs');

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

function formatReq(code, msg, data) {
	return {
		code: code,
		data: data,
		message: msg
	}
};

function readAllfile(currentDirPath, courseid, callback) {
  var list = []
	fs.readdir(currentDirPath, function(err, files) {
		if (err) {
      console.log(err);
			callback()
		} else {
			for (let i = 0; i < files.length; i++) {
        const path = require('path');
        if (files[i].substring(0,6) === courseid+'') {
          var filePath = path.join(currentDirPath, files[i]);
          var stat = fs.statSync(filePath);
          if (stat.isFile()) {
            //添加文件信息
            list.push({
              file_name: files[i],
              file_stat: stat,
              file_path: filePath.replace(/\\/g, "/"),
              is_file: true	//是否为文件
            });
          }
        }
			}
			callback(list)
		}
	});
}

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
  let sql3 = $sql.course.queryisend
  let { unique,courseid } = req.body;
  conn.query(sql2, [courseid], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length !== 0) {
      conn.query(sql3, [courseid], (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result[0].Grade_isend === 0) {
          conn.query(sql, [unique,courseid], (err, result) => {
            if (err) {
              console.log(err);
            }
            res.json({
              code: '0',
              msg: '添加成功'
            })
          });
        } else {
          res.json({
            code: '1',
            msg: '添加失败，该课程已结课'
          })
        }
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
router.post('/uploadFile', (req, res) => {
	//利用multiparty中间件获取文件数据
	let uploadDir = './' //这个不用改，因为并不是保存在这个目录下，这只是作为中间目录，待会要重命名文件到指定目录的

	let form = new multiparty.Form()

	form.uploadDir = uploadDir
	form.keepExtensions = true; //是否保留后缀
	form.parse(req, function(err, fields, files) { //其中fields表示你提交的表单数据对象，files表示你提交的文件对象
		console.log("上传文件", fields)
		console.log("files", files)
		//这里是save_path 就是前端传回来的 path 字段，这个字段会被 multiparty 中间件解析到 fields 里面 ，这里的 fields 相当于 req.body 的意思
		let save_path = fields.path
		if (err) {
			console.log(err)
			res.send(formatReq(0, "上传失败"))
		} else {
			let file_list = []
			if (!files.file) res.send(formatReq(0, "没上传文件"))
			else {
				//所有文件重命名，（因为不重名的话是随机文件名）
				files.file.forEach(file => {
					/*
					 * file.path 文件路径
					 * save_path+originalFilename   指定上传的路径 + 原来的名字
					 */
					fs.rename(file.path, save_path +'_'+ file.originalFilename, function(err) {
						if (err) {
							console.log("重命名失败")
						} else {
							console.log("重命名成功")
						}
					});
				})
				if (err) {
					console.log(err)
					res.send(formatReq(0, "上传失败"))
				} else {
					//返回所有上传的文件信息
					res.send(formatReq(1, "上传成功"))
				}
			}

		}
	})
 
})
router.post('/list', (req, res) => {
  console.log("courseid", req.body.Course_id);
	readAllfile(req.body.path, req.body.Course_id, file_list => {
		res.send(formatReq(1, "获取成功", file_list))
		res.end()
	})
})

router.post('/download',(req,res) => {
  res.download(req.body.path);
})

router.post('/addcourse', (req, res) => {
  let sql = $sql.course.addcourse;
  let sql1 = $sql.course.add;
  console.log(req.body);
  let { unique,courseNum,courseName,courseResult,courseTime,courseteacher } = req.body;
  conn.query(sql, [courseNum,courseName,courseteacher,courseResult,courseTime], (err) => {
    if (err) {
      console.log(err);
    }
    conn.query(sql1, [unique,courseNum], (err) => {
      if (err) {
        console.log(err);
      }
      res.send(formatReq(1, "添加成功"))
    })
  });
});

router.post('/getStudent', (req, res) => {
  let sql = $sql.course.getstudent;
  console.log("courseid", req.body.Course_id);
  let {Course_id,unique} = req.body;
	conn.query(sql, [Course_id,unique], (err,result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
})

router.post('/updataGrade', (req, res) => {
  let sql = $sql.grade.updata;
  console.log(req.body);
  for (let i = 0; i < req.body.length; i++) {
    let {Grade_result,User_unique,Course_id} = req.body[i];
    conn.query(sql, [Grade_result,User_unique,Course_id], (err,result) => {
    if (err) {
      console.log(err);
    }
    });
  }
  res.send(formatReq(1, "添加成功"));
})

router.post('/teacherReload', (req, res) => {
  let sql = $sql.course.query2;
  console.log(req.body);
  conn.query(sql, [req.body.Course_id,req.body.unique], (err,result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
})

router.post('/outclass', (req, res) => {
  let sql = $sql.grade.outcourse;
  console.log(req.body);
  conn.query(sql, [req.body.Course_id,req.body.unique], (err,result) => {
    if (err) {
      console.log(err);
    }
    res.send(formatReq(1, "删除成功"));
  });
})

router.post('/onefile', (req, res) => {
  res.setHeader('Content-type', 'application/octet-stream');
  var fileStream = fs.createReadStream('./public/folder/100012_2021届毕业生推荐表-杨澄宇.doc');
  fileStream.on('data', function (data) {
      res.write(data, 'binary');
  });
  fileStream.on('end', function () {
      res.end();
  });
})

module.exports = router;
