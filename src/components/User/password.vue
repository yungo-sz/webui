<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="140px">
      <el-form-item label="Old password">
        <el-input v-model="form.name"  placeholder="Old password" />
      </el-form-item>
      <el-form-item label="New password" >
        <el-input v-model="form.name" placeholder="New password" />
      </el-form-item>
       <el-form-item label="Confirm password" >
        <el-input v-model="form.name" placeholder="Confirm password" />
      </el-form-item>
    
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Password",
  data() {
    return {
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
</style>

