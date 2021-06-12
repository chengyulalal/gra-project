<!--
 * @Date: 2021-05-10 12:59:30
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-06-08 13:46:40
 * @FilePath: \gra-project-sourcetree\src\components\content.vue
-->
<template>
  <el-container>
    <el-header>
      <div class="header">
        <el-tooltip class="item" effect="dark" content="返回首页" placement="right">
          <div class="headertitle" @click="gotoindex">课程管理系统</div>
        </el-tooltip>
        <div class="right">
          <el-button style="margin-right:10px" type="danger" size="small" icon="el-icon-thumb" @click="outClass">退出课程</el-button>
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
        <div :class="[row.Grade_isend === 1 ? 'courseNameShowend':'courseNameShow']">
          <div class="title">
            <template v-if="row.Grade_isend === 1">
              <div class="fontclass">{{row.Course_name}}(已结课)</div>
            </template>
            <template v-else>
              <div class="fontclass">{{row.Course_name}}</div>
            </template>
            <template v-if="row.Grade_isend === 1">
              <h2>成绩:{{row.Grade_result}}</h2>
            </template>
            <h4>课程号:{{row.Course_id}}</h4>
          </div>
          <div class="teacher">
            上课教师:{{row.Course_teacher}}
          </div>
        </div>
        <div class="func">
          <el-tabs :tab-position="tabPosition"
          style="height: 100%;"
          @tab-click='show'>
            <el-tab-pane label="资料">
              <div class="allcontent">
                <template v-for="(file, index) in files_list">
                   <el-popconfirm
                    title="是否需要下载该文件?"
                    @confirm="download(file.file_path,file.file_name)"
                    cancel-button-text='预览'
                    @cancel="viewfile(file.file_path)"
                    :key="index"
                  >
                    <template slot="reference">
                      <i class="el-icon-s-order fontsize"></i><br>
                      <div class="filesize">
                        <span class="fontmini">{{ file.file_name }}</span>
                      </div>
                    </template>
                  </el-popconfirm>
                </template>
              </div>
            </el-tab-pane>
            <el-tab-pane label="作业">
              <div class="allcontent">
                <template v-for="(file, index) in jobfiles_list">
                   <el-popconfirm
                    title="是否需要下载该文件?"
                    @confirm="download(file.file_path,file.file_name)"
                    cancel-button-text='预览'
                    @cancel="viewfile(file.file_path)"
                    :key="index"
                  >
                    <template slot="reference">
                      <i class="el-icon-s-order fontsize"></i><br>
                      <div class="filesize">
                        <span class="fontmini">{{ file.file_name }}</span>
                      </div>
                    </template>
                  </el-popconfirm>
                </template>
              </div>
            </el-tab-pane>
            <el-tab-pane label="测试">
              <div class="allcontent">
                <template v-for="(file, index) in testfiles_list">
                   <el-popconfirm
                    title="是否需要下载该文件?"
                    @confirm="download(file.file_path,file.file_name)"
                    cancel-button-text='预览'
                    @cancel="viewfile(file.file_path)"
                    :key="index"
                  >
                    <template slot="reference">
                      <i class="el-icon-s-order fontsize"></i><br>
                      <div class="filesize">
                        <span class="fontmini">{{ file.file_name }}</span>
                      </div>
                    </template>
                  </el-popconfirm>
                </template>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-main>
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
import { queryPerson,updataPerson,list,download,outclass } from '../http/api'
import uploadFile from './uploadFile.vue'
export default {
  data () {
    return {
      row: {},
      path: './public/',
      circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      personVisible: false,
      formLabelWidth: '120px',
      tabPosition: 'left',
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
      files_list:[],
      testfiles_list: [],
      jobfiles_list: []
    }
  },
  components: {
    uploadFile
  },
  computed: {
    folderpath () {
      return this.path+'folder/'
    },
    jobpath () {
      return this.path+'job/'
    },
    testpath () {
      return this.path+'test/'
    },
  },
  methods: {
    viewfile (filepath) {
      var realfilepath = filepath.substring(6); //删除前面的public
      var index= realfilepath.lastIndexOf(".");
      var ext = realfilepath.substr(index+1);
      if ( ext === 'png'||ext === 'pdf'||ext === 'gif' ) {
        window.open('http://localhost:3000/'+realfilepath);
        return
      }
      var url = 'http://fileview.ngrok2.xiaomiqiu.cn/'+realfilepath; //要预览文件的访问地址
      window.open('https://view.xdocin.com/xdoc?_xdoc='+url);
    },
    outClass () {
      this.$alert('此操作将退出该课程, 是否继续？', {
          center: true,
          type: 'warning',
      }).then(() => {
          outclass({ Course_id:this.row.Course_id,unique:this.$store.state.unique}).then(res => {
          console.log(res);
          this.$message({
          type: 'warning',
          message: '成功退出该课程!'
          });
          this.$router.replace({path: '/index'});
        }).catch(err => {
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
      }).catch((err) =>{console.log(err)})
    },
    gotoindex () {
      this.$router.replace('/index');
    },
    show (val) {
      if (val.index === '1') {
        list({path:this.jobpath,Course_id:this.row.Course_id}).then(res => {
          this.jobfiles_list=res.data.data;
        }).catch(err => {console.log(err)})
      } else if (val.index === '2') {
        list({path:this.testpath,Course_id:this.row.Course_id}).then(res => {
          this.testfiles_list=res.data.data;
        }).catch(err => {console.log(err)})
      } else if (val.index === '0') {
        list({path:this.folderpath,Course_id:this.row.Course_id}).then(res => {
          this.files_list=res.data.data;
        }).catch(err => {console.log(err)})
      }
    },
    download (filepath,filename) {
      download({path:filepath}).then(res => {
        const blob = new Blob([res.data]);
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      }).catch((err)=>{console.log(err)})
    },
    outlogin () {
      localStorage.removeItem('token');
      console.log(history.length);
      this.$router.replace('/login');
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
    this.row = JSON.parse(this.$route.query.line);
    list({path:this.folderpath,Course_id:this.row.Course_id}).then(res => {
      console.log(res.data.data);
      this.files_list=res.data.data;
    }).catch(err => {console.log(err)})
    console.log(this.row);
  }
}
</script>

<style scoped lang="scss">
.headertitle{
  font-size: 25px;
  text-align: center;
  cursor: pointer;
}
.allcontent{
  width: 800px;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
}
.filesize{
  width: 100px;
  height: 100px;
  margin: 0 10px 10px 10px;
}
.fontmini{
  font-size: 5px;
}
.fontsize {
  font-size: 35px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  
}
.button {
  padding: 0;
  float: right;
}
.right{
  width: 260px;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.el-tab-pane{
  margin-left: 30px;
}
>>>.el-tabs__item {
  font-size: 20px !important;
  margin: 10px;
}
.func{
  width: 900px;
  height: 100%;
  margin-top: 30px;
  display: flex;
  align-self:center;
}
.title{
  z-index: 100;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.teacher{
  z-index: 100;
  font-size: 20px;
  width: 250px;
  height: 50px;
  color: #E9EEF3;
  font-family:'Times New Roman', Times, serif;
  display: flex;
  align-self: flex-end;
}
h4{
  margin-top: 30px;
  margin-left: 30px;
  color: #E9EEF3;
  font-family:'Times New Roman', Times, serif;
}
h2{
  margin-left: 30px;
  color: #E9EEF3;
  font-family:'Times New Roman', Times, serif;
}
.fontclass{
  margin-top: 30px;
  margin-left: 30px;
  font-size: 40px;
  color: #E9EEF3;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
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
  .courseNameShow {
  width: 1000px;
  height: 100%;
  border: 1px solid white;
  border-radius: 5px;
  background: url('/static/img/course.jpg') no-repeat;
	background-size: cover;
  display: flex;
  justify-content: space-between;
  opacity:0.8
  }
}
.courseNameShowend {
  width: 1000px;
  height: 100%;
  border: 1px solid white;
  border-radius: 5px;
  background: url('/static/img/courseend.jpg') no-repeat;
	background-size: cover;
  display: flex;
  justify-content: space-between;
  opacity:0.8
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  .header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
  }
}
.el-avatar {
  cursor: pointer;
}
</style>