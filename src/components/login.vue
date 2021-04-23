<!--
 * @Date: 2021-04-09 16:15:02
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-04-23 15:49:12
 * @FilePath: \gra-project-sourcetree\src\components\login.vue
-->
<template>
  <div class="login">
    <h1>登录</h1>
    <el-form :model="ruleForm" 
    status-icon 
    :rules="rules" 
    ref="ruleForm" 
    label-position='left' 
    label-width="100px" 
    class="demo-ruleForm" 
    hide-required-asterisk>
      <el-form-item label="学号/教工号" prop="unipue">
        <el-input type="text" v-model="ruleForm.unipue" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="Pass">
        <el-input type="password" v-model="ruleForm.Pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户">
        <el-radio-group v-model="ruleForm.user">
          <el-radio label="教师"></el-radio>
          <el-radio label="学生"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="btn">
        <el-button class="btn1" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="Gotoregister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUser } from '../http/api'
 export default {
  name:'login',
  data() {
    var validatePass = (rule, value, callback) => {
      let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!reg.test(value)) {
        callback(new Error('密码必须是由4-20位字母+数字组合'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        unipue: '',
        Pass: '',
        user:'学生'
      },
      rules: {
        unipue: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { len: 12, message: '输入账号错误', trigger: 'blur' }
        ],
        Pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUser({ unique:this.ruleForm.unipue, password:this.ruleForm.Pass, auth:this.ruleForm.user }).then(res => {
            if (res.data.msg === '操作失败') {
              alert('密码或权限错误,请重新输入');
              this.ruleForm.Pass = '';
            } else {
              alert('登录成功')
              localStorage.setItem('token',res.data[0].user_token);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    Gotoregister () {
      this.$router.push({ path: '/register' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.login{
  padding: 20px;
  width: 500px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border: 1px solid #cce6dd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  background-color:rgba(204, 230, 221, 0.8)
}
.btn{
  position: relative;
  right: 50px;
  .btn1{
    margin-right: 20px;
  }
}
</style>
