/*
 * @Date: 2021-04-20 13:40:21
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-04-23 14:25:26
 * @FilePath: \gra-project-sourcetree\server\sqlMap.js
 */
module.exports = {
    user: {
    // ? 占位符 后面给数据自动填充
    add: 'insert into user(User_unique, User_name, User_password, User_auth) values(?, ?, ?, ?)',
    get: 'select * from user where User_unique=? and User_password=? and User_auth=?',
    query: 'select * from user where User_unique=?'
    },
   };