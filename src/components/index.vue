<!--
 * @Date: 2021-04-30 14:30:58
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-10 21:22:49
 * @FilePath: \gra-project-sourcetree\src\components\index.vue
-->
<template>
  <el-container>
    <el-header>
      <div class="header">
        <h3>课程管理系统</h3>
        <div class="right">
          <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="centerDialogVisible = true">加入课程</el-button>
          <el-dropdown trigger="click">
            <el-avatar size='medium' :src="circleUrl" ></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" @click.native="showperson">个人信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button"  @click.native="outlogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="main">
        <h4>我的课程</h4>
        <div class="con">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="未结课" name="first">
              <el-table
                :data="tableData"
                max-height="400"
                border
                @row-click='toNoendContent'
                style="width: 100%">
                <el-table-column
                  prop="Course_id"
                  label="课程号"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="Course_name"
                  label="课程名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="Course_teacher"
                  label="上课教师">
                </el-table-column>
                <el-table-column
                  prop="Course_time"
                  label="学时">
                </el-table-column>
                <el-table-column
                  prop="Course_result"
                  label="学分">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已结课" name="second">
              <el-table
                :data="tableData1"
                max-height="400"
                border
                @row-click='toendContent'
                style="width: 100%">
                <el-table-column
                  prop="Course_id"
                  label="课程号"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="Course_name"
                  label="课程名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="Course_teacher"
                  label="上课教师">
                </el-table-column>
                <el-table-column
                  prop="Course_time"
                  label="学时">
                </el-table-column>
                <el-table-column
                  prop="Course_result"
                  label="学分">
                </el-table-column>
                 <el-table-column
                  prop="Grade_result"
                  label="成绩">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <el-dialog
        title="加入课程"
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
        <el-form :model="form"
        :rules="rules" >
          <el-form-item label="请输入课程编号" :label-width="formLabelWidth" prop="courseNum">
            <el-input v-model="form.courseNum" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="join">确 定</el-button>
        </span>
      </el-dialog>
      
      <el-dialog
        title="个人信息"
        :visible.sync="personVisible"
        width="50%"
        center>
        <el-form :model="form1"
        :rules="rules1"
        size="mini" >
          <el-form-item label="学号" :label-width="formLabelWidth" prop="number">
            <el-input disabled v-model="form1.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input show-password v-model="form1.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form1.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-input v-model="form1.sex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth" prop="born">
            <el-input v-model="form1.born" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="住址" :label-width="formLabelWidth" prop="addres">
            <el-input v-model="form1.addres" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="telnumber">
            <el-input v-model="form1.telnumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="系别" :label-width="formLabelWidth" prop="department">
            <el-input v-model="form1.department" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年级" :label-width="formLabelWidth" prop="grade">
            <el-input v-model="form1.grade" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth" prop="user_class">
            <el-input v-model="form1.user_class" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="personVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import { getClass, joinClass, queryPerson,updataPerson } from '../http/api'
export default {
  data () {
    var validatecourse = (rule, value, callback) => {
      let reg= /^[0-9]*$/;
      if (value === '') {
        callback(new Error('请输入课程号'));
      } else if (!reg.test(value)) {
        callback(new Error('课程号为全数字'));
      } else {
        callback();
      }
    }
    return {
        circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        centerDialogVisible: false,
        personVisible: false,
        form1: {
          name: '',
          password: '',
          sex: '',
          born: '',
          addres: '',
          telnumber: '',
          department: '',
          grade: '',
          user_class: '',
          number: '',
        },
        rules1: {

        },
        form: {
          courseNum: ''
        },
        rules: {
          courseNum: [
            { len: 6, message: '输入6位课程号', trigger: 'blur' },
            { validator: validatecourse, trigger: 'blur' }
          ]
        },
        formLabelWidth: '120px',
        activeName: 'first',
        courseid: [],
        tableData: [],
        tableData1: []
    }
  },
  methods: {
    handleClick (tab, event) {
        console.log(tab, event);
    },
    outlogin () {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    save () {
      updataPerson(this.form1).then(res =>{
      }).catch((err)=>{console.log(err)})
    },
    showperson () {
      queryPerson({ unique:this.$store.state.unique }).then(res => {
        console.log(res.data[0]);
        this.form1.number = res.data[0].User_unique;
        this.form1.password = res.data[0].User_password;
        this.form1.name = res.data[0].User_name;
        this.form1.sex = res.data[0].User_sex;
        this.form1.born = res.data[0].User_born;
        this.form1.addres = res.data[0].User_addres;
        this.form1.telnumber = res.data[0].User_tel_number;
        this.form1.department = res.data[0].User_department;
        this.form1.grade = res.data[0].User_grade;
        this.form1.user_class = res.data[0].User_class;
      })
      this.personVisible = true;
    },
    toNoendContent (row) {
      this.$router.push({path:'/content',query: {line: row}})
    },
    toendContent () {

    },
    // 添加课程
    join () {
      if (this.courseid.indexOf(parseInt(this.form.courseNum)) !== -1) {
        this.$message.error('你已添加改课程，请勿重复添加');
        return
      }
      joinClass({unique:this.$store.state.unique,courseid:this.form.courseNum}).then(res => {
        console.log(res);
      });
      getClass({ unique:this.$store.state.unique }).then(res => {
      let end = res.data.filter((val) =>{
        if (val.Grade_isend === 1) {
          return val;
        }
      });
      let Noend = res.data.filter((val) =>{
        if (val.Grade_isend === 0) {
          return val;
        }
      });
      this.tableData = Noend;
      this.tableData1 = end;
      }).catch((err)=>{console.log(err)})
      this.centerDialogVisible = false;
    }
  },
  created () {
    if (!this.$store.state.unique) {
      this.$store.commit('setunique', localStorage.getItem('unique'));
    }
    // 获取课程信息
    getClass({ unique:this.$store.state.unique }).then(res => {
      console.log(res.data);
      let end = res.data.filter((val) =>{
        if (val.Grade_isend === 1) {
          return val;
        }
      });
      let Noend = res.data.filter((val) =>{
        if (val.Grade_isend === 0) {
          return val;
        }
      });
      let courseid = res.data.map(val => {
        return val.Course_id;
      });
      this.courseid = courseid;
      console.log(this.courseid);
      this.tableData = Noend;
      this.tableData1 = end;
    }).catch((err)=>{
      console.log(err);
      if (err.code === -1) {
        this.$confirm('登录已过期，请重新登录','提示',{
          confirmButtonText: '确定',
          showClose: false,
          showCancelButton: false,
          closeOnClickModal: false,
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.replace({ path: '/login' });
        })
      }
      })
  }
}
</script>

<style scoped lang="scss">
.el-container {
  height: 100%;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .con{
    width: 800px;
    height: 100%;
    padding: 30px;
    border: 1px solid black;
  }
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  .header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
.right{
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-avatar {
  cursor: pointer;
}
</style>