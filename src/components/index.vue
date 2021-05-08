<!--
 * @Date: 2021-04-30 14:30:58
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-08 13:07:37
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
              <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
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
        width="30%"
        center>
        <el-form :model="form">
          <el-form-item label="请输入课程编号" :label-width="formLabelWidth">
            <el-input v-model="form.courseNum" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import { getClass } from '../http/api'
export default {
  data () {
      return {
          circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          centerDialogVisible: false,
          form: {
            courseNum: ''
          },
          formLabelWidth: '120px',
          activeName: 'first',
          tableData: [],
          tableData1: []
      }
  },
  methods: {
    handleClick (tab, event) {
        console.log(tab, event);
    }
  },
  created () {
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
      console.log(end);
      this.tableData = Noend;
      this.tableData1 = end;
    }).catch((err)=>{console.log(err)})
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