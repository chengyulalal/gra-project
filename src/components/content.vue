<!--
 * @Date: 2021-05-10 12:59:30
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-11 19:32:47
 * @FilePath: \gra-project-sourcetree\src\components\content.vue
-->
<template>
  <el-container>
    <el-header>
      <div class="header">
        <h3>课程管理系统</h3>
        <el-dropdown trigger="click">
          <el-avatar size='medium' :src="circleUrl" ></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" @click.native="showperson">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button"  @click.native="outlogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>Main</el-main>
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
  </el-container>
</template>

<script>
import { queryPerson,updataPerson } from '../http/api'
export default {
  data () {
    return {
      row: {},
      circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      personVisible: false,
      formLabelWidth: '120px',
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
    }
  },
  methods: {
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
  },
  created () {
    if (!this.$store.state.unique) {
      this.$store.commit('setunique', localStorage.getItem('unique'));
    }
    this.row = this.$route.query.line;
    console.log(this.row);
  }
}
</script>

<style lang="scss">
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
.el-avatar {
  cursor: pointer;
}
</style>