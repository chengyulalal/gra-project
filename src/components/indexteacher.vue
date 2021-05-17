<!--
 * @Date: 2021-05-14 21:27:48
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-16 19:31:04
 * @FilePath: \gra-project-sourcetree\src\components\indexteacher.vue
-->
<template>
  <el-container>
    <el-header>
      <div class="header">
        <h3>课程管理系统</h3>
        <div class="right">
          <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="centerDialogVisible = true">发布课程</el-button>
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
        <h3 style="z-index:1000">已发布课程</h3>
        <div class="con">
          <el-table
            :data="tableData"
            style="width: 100%"
            @row-click='toTeacherContent'>
            <el-table-column
              prop="Course_id"
              label="课程号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="Course_name"
              label="课程名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="Course_time"
              label="学时"
              width="200">
            </el-table-column>
            <el-table-column
              prop="Course_result"
              label="学分">
            </el-table-column>
            <el-table-column
              prop="Grade_isend"
              label="是否结课">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-dialog
        title="发布课程"
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
        <el-form :model="form"
        :rules="rules">
          <el-form-item label="课程编号" :label-width="formLabelWidth" prop="courseNum">
            <el-input placeholder='请填写六位数字课程编号' v-model="form.courseNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发布课程名称" :label-width="formLabelWidth" prop="courseName">
            <el-input v-model="form.courseName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="该课学分" :label-width="formLabelWidth" prop="courseResult">
            <el-input v-model="form.courseResult" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="该课所需学时" :label-width="formLabelWidth" prop="courseTime">
            <el-input v-model="form.courseTime" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="issue">确 定</el-button>
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
          <el-form-item label="教工号" :label-width="formLabelWidth" prop="number">
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
            <el-date-picker
              v-model="form1.born"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="住址" :label-width="formLabelWidth" prop="addres">
            <el-input v-model="form1.addres" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="telnumber">
            <el-input v-model="form1.telnumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属系" :label-width="formLabelWidth" prop="department">
            <el-input v-model="form1.department" autocomplete="off"></el-input>
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
import { getClass, addcourse, queryPerson,updataPerson } from '../http/api'
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
          number: '',
        },
        rules1: {

        },
        form: {
          courseNum: '',
          courseName: '',
          courseResult: '',
          courseTime: ''
        },
        rules: {
          courseNum: [
            { len: 6, message: '输入6位课程号', trigger: 'blur' },
            { validator: validatecourse, trigger: 'blur' }
          ]
        },
        formLabelWidth: '120px',
        courseid: [],
        tableData: []
    }
  },
  methods: {
    outlogin () {
      localStorage.removeItem('token');
      this.$router.replace('/login');
    },
    toTeacherContent (row) {
      row.Course_teacher = this.form1.name;
      this.$router.push({path:'/teachercontent',query: {line: row}})
    },
    save () {
      updataPerson(this.form1).then(res =>{
      }).catch((err)=>{console.log(err)})
      this.personVisible = false;
    },
    showperson () {
      this.personVisible = true;
    },
    
    // 发布课程
    issue () {
      if (this.courseid.indexOf(parseInt(this.form.courseNum)) !== -1) {
        this.$message.error('改课程编号已存在，请重新填写');
        this.form.courseNum = '';
        return
      }
      if (this.form.courseNum === '') {
        this.$message.error('请填写课程号');
        return
      }
      this.form.unique = this.$store.state.unique;
      this.form.courseteacher = this.form1.name;
      addcourse(this.form).then(res => {
        console.log(res);
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
      });
      setTimeout(() => {
        getClass({ unique:this.$store.state.unique }).then(res => {
          console.log(res);
          this.tableData = res.data;
        }).catch((err)=>{console.log(err)})
      },100);
      this.centerDialogVisible = false;
    }
  },
  created () {
    if (!this.$store.state.unique) {
      this.$store.commit('setunique', localStorage.getItem('unique'));
    }
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
    // 获取课程信息
    getClass({ unique:this.$store.state.unique }).then(res => {
      console.log(res.data);
      this.tableData = res.data.map(val =>{
        console.log(val);
        if (val.Grade_isend === 0) {
          val.Grade_isend='未结课';
          return val
        } else {
          val.Grade_isend='已结课'
          return val
        }
      })
      console.log(this.tableData);
      let courseid = res.data.map(val => {
        return val.Course_id;
      });
      this.courseid = courseid;
      console.log(this.courseid);
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