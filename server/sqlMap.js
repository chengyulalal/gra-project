/*
 * @Date: 2021-04-20 13:40:21
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-15 15:25:59
 * @FilePath: \gra-project-sourcetree\server\sqlMap.js
 */
module.exports = {
    user: {
        // ? 占位符 后面给数据自动填充
        add: 'insert into user(User_unique, User_name, User_password, User_auth) values(?, ?, ?, ?)',
        get: 'select * from user where User_unique=? and User_password=? and User_auth=?',
        query: 'select * from user where User_unique=?',
        updata: 'UPDATE user SET User_name=?,User_password=?,User_sex=?,User_born=?,User_addres=?,User_tel_number=?,User_department=?,User_grade=?,User_class=? WHERE User_unique=?'
    },
    course: {
        query: 'select * from grade join course on grade.Course_id=course.Course_id where grade.User_unique=?',
        add: 'insert into grade(Grade_result, User_unique, Course_id, Grade_isend) values(0, ?, ?,0)',
        queryClass: 'select * from course where Course_id=?',
        addcourse: 'insert into course(Course_id, Course_name, Course_teacher, Course_result, Course_time) values(?, ?, ?, ?, ?)'
    }
   };