/*
 * @Date: 2021-04-20 13:40:06
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-04-21 15:40:52
 * @FilePath: \gra-project-sourcetree\server\index.js
 */
const express = require('express');
const app = express();
const userapi = require('./api/userApi');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use('/api', userapi);
app.listen(port,() => { console.log(`Server is running at http://localhost:3000`) });
