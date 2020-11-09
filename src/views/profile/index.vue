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
      <div class="head-left"></div>
      <div class="head-right"></div>
  </div>
  <div v-for="o in 3" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
  <el-button style="float: right; padding: 24px 0" type="text">操作按钮</el-button>
  </el-card>

<el-tabs type="border-card" class="right-card">
  <el-tab-pane label="ChartCard">
    <chart-card title="传递的参数"  :dysncParams="dysncParamsText">
    </chart-card>
  </el-tab-pane>
  <el-tab-pane label="Wallet List">
    <wallets title="传递的参数"  :dysncParams="dysncParamsText">
    </wallets>
  </el-tab-pane>
  <el-tab-pane label="Storage Settings">配置管理</el-tab-pane>
  <el-tab-pane label="Edit Profile">角色管理</el-tab-pane>
  <el-tab-pane label="Change Password">修改密码</el-tab-pane>
</el-tabs>

  </div>
  
</template>

<script>
import ChartCard from '@/components/ChartCard'
import Wallets from '@/components/Wallets'
export default {
  components:{
    ChartCard,
    Wallets,
  },
  data() {
    return {
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
    background-color:#5900ff;
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

