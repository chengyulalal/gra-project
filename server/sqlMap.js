/*
 * @Date: 2021-04-20 13:40:21
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-22 15:45:18
 * @FilePath: \gra-project-sourcetree\server\sqlMap.js
 */
module.exports = {
    user: {
        add: 'insert into user(User_unique, User_name, User_password, User_auth) values(?, ?, ?, ?)',
        get: 'select * from user where User_unique=? and User_password=? and User_auth=?',
        query: 'select * from user where User_unique=?',
        updata: 'UPDATE user SET User_name=?,User_password=?,User_sex=?,User_born=?,User_addres=?,User_tel_number=?,User_department=?,User_grade=?,User_class=? WHERE User_unique=?'
    },
    course: {
        query: 'select * from grade join course on grade.Course_id=course.Course_id where grade.User_unique=?',
        query2: 'select * from grade join course on grade.Course_id=course.Course_id where course.Course_id=? and grade.User_unique=?',
        add: 'insert into grade(Grade_result, User_unique, Course_id, Grade_isend) values(0, ?, ?,0)',
        queryClass: 'select * from course where Course_id=?',
        addcourse: 'insert into course(Course_id, Course_name, Course_teacher, Course_result, Course_time) values(?, ?, ?, ?, ?)',
        getstudent: 'select * from grade join user on grade.User_unique=user.User_unique where grade.Course_id=? and grade.User_unique!=?',
        queryisend: 'select Grade_isend from grade where Course_id=?'
    },
    grade: {
        updata: 'UPDATE grade SET Grade_result=?,Grade_isend=1 WHERE User_unique=? and Course_id=?',
        outcourse: 'delete from grade where Course_id=? and User_unique=?'
    }
   };