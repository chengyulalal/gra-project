<!--
 * @Date: 2021-04-19 13:28:02
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-19 16:24:58
 * @FilePath: \gra-project-sourcetree\src\components\register.vue
-->
<template>
  <div class="register">
    <el-form :model="ruleForm" 
      status-icon 
      :rules="rules"
      size='mini' 
      ref="ruleForm" 
      label-position='left' 
      label-width="100px" 
      class="demo-ruleForm" 
      hide-required-asterisk>
      <el-form-item label="姓名" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学号/教工号" prop="unique">
        <el-input type="text" v-model="ruleForm.unique" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="Pass">
        <el-input type="password" v-model="ruleForm.Pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="您的身份">
        <el-radio-group v-model="ruleForm.user">
          <el-radio label="教师"></el-radio>
          <el-radio label="学生"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="btn">
        <el-button size='medium' class="btn1" type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button size='medium' class="" type="info" @click="back">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>           
</template>

<script>
import { addUser } from '../http/api'
export default {
  name:'register',
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
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.Pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      ruleForm: {
        unique: '',
        name: '',
        Pass: '',
        checkPass: '',
        user:'学生'
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '姓名格式错误', trigger: 'blur' }
        ],
        unique: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { len: 12, message: '请输入12位学号或教工号', trigger: 'blur' }
        ],
        Pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    back () {
      this.$router.replace({ path: '/login' });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUser(this.ruleForm).then(res => {
            if (res.data.msg === '用户已注册') {
              alert('用户已注册');
              this.resetForm(formName);
            } else {
              this.$store.commit('setunique', this.ruleForm.unique);
              localStorage.setItem('unique', this.ruleForm.unique);
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              localStorage.setItem('token',res.data.user_token);
              if (this.ruleForm.user === '学生') {
                this.$router.replace({ path: '/index' })
              } else {
                this.$router.replace({ path: '/indexteacher' })
              }
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  },
}
</script>

<style lang='scss' scoped>
.register{
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