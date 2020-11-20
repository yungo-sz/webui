<template>
  <!-- <div slot="header" class="clearfix">
    <el-card class="box-card">
        <div class="head"></div>
    </el-card>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div> -->
  <div>
<el-card class="box-card">

  <div slot="header" class="clearfix">
      <div class="head-left">
        <img :src="imageurl" style="height:80px;width:80px;">
      </div>
      <div class="head-right">
        <div style="margin-top:10px;">
        <span>lzj</span>
        <br>
        <br>
        <span>469230190@qq.com</span>
        </div>
      </div>
  </div>
  <div>
    <div style="width:30%;float:left;">
      <span style="color:gray;">phone</span>
    </div>
    <div style="width:50%;float:left;">
      <span style="width:50px">19142755309</span>
    </div>
    <br>
    <div style="width:30%;margin-top:18px;m;float:left;">
      <span style="color:gray;">addres</span>
    </div>
    <div style="width:50%;margin-top:18px;float:left;">
      <span style="width:50px">深圳市龙华区民治街道</span>
    </div>
    <br>
  </div>
  <el-button style="float: right; padding: 24px 0" type="text">操作按钮</el-button>
  </el-card>

<el-tabs type="border-card" class="right-card">
  
  <el-tab-pane label="Wallet List">
    <wallets title="传递的参数"  :dysncParams="dysncParamsText">
    </wallets>
  </el-tab-pane>
  <el-tab-pane label="Storage Settings">配置管理</el-tab-pane>
  <el-tab-pane label="Edit Profile">
    <user title="传递的参数"  :dysncParams="dysncParamsText">
    </user>
  </el-tab-pane>
  <el-tab-pane label="Change Password">
    <password title="传递的参数"  :dysncParams="dysncParamsText">
    </password>
  </el-tab-pane>
  <el-tab-pane label="ChartCard">
    <chart-card title="传递的参数"  :dysncParams="dysncParamsText">
    </chart-card>
  </el-tab-pane>
</el-tabs>

  </div>
  
</template>

<script>
import ChartCard from '@/components/ChartCard'
import Wallets from '@/components/Wallets/wallets'
import User from '@/components/User'
import Password from '@/components/User/password'
export default {
  components:{
    ChartCard,
    Wallets,
    User,
    Password,
  },
  data() {
    return {
      imageurl: './2.jpg',
      dysncParamsText:'动态参数',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
 .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .head-left{
    width: 80px;
    height: 80px;
    float: left;
    background-color:#FF0000;
  }
   .head-right{
    width: 240px;
    height: 80px;
    float: right;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top: 40px;
    margin-left: 38px;
    width: 380px;
    float: left;
  }
  .right-card{
    width: 70%;
    float: left;
    margin-top: 24px;
    margin-left: 30px;
    height: 600px;
  }
</style>

