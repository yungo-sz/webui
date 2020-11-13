<template>
  <div class="app-container">
    <div>
      <el-input placeholder="请输入内容" style="width:240px;" ></el-input>
       <el-select v-model="value" style="margin-left: 10px;margin-right: 10px; width:120px;" placeholder="文件类型">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      <el-button type="primary" @click="dialogVisible1 = true" >搜索</el-button>
      <el-button type="primary" @click="dialogVisible = true" >上传文件</el-button>
       <el-dialog
    title="请选择文件"
    :visible.sync="dialogVisible"
    width="30%">
    <el-upload
        class="upload-demo"
        :action="base_api"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :headers="uploadh"
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
</el-upload>
 <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span> -->

</el-dialog>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top:10px;"
    >
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          {{ scope.row.Id }}
        </template>
      </el-table-column>
      <el-table-column label="FileName" >
        <template slot-scope="scope">
          {{ scope.row.Filename }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="IpfsAddr" align="center" :show-overflow-tooltip='true'> -->
      <el-table-column label="FileSize" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FileSize }}0</span>
        </template>
      </el-table-column>
      <el-table-column label="DealId" align="center">
        <template slot-scope="scope">
          {{ scope.row.DealId }}
        </template>
      </el-table-column>
      <el-table-column label="MinerId" align="center">
        <template slot-scope="scope">
          {{ scope.row.MinerId }}
        </template>
      </el-table-column>
      <el-table-column label="Price" align="center">
        <template slot-scope="scope">
          {{ scope.row.Price }}
        </template>
      </el-table-column>
      <el-table-column label="RootCid" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          {{ scope.row.RootCid }}
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="created_at" label="CreateTime" >
        <template slot-scope="scope">
          <!-- <i class="el-icon-time" /> -->
          <span>{{ scope.row.CreateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleDeal(scope.row)">deal</el-button>
      </template>
    </el-table-column>
    </el-table>

  <div class="block" style="margin-top:10px;float:right;">
    <!-- layout="total, sizes, prev, pager, next, jumper" -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  
  <el-dialog
  title="Storage Deals"
  :visible.sync="deal"
  width="30%"
  >
  <div>
    <el-form ref="form" :model="dealform" label-width="80px">
      <el-form-item label="miner">
        <el-input v-model="dealform.miner"  placeholder="minerid" />
      </el-form-item>

      <el-form-item label="MemberID">
        <el-input v-model="dealform.MemberID"  placeholder="lzj" :disabled="true" />
      </el-form-item>
     
      <el-form-item label="RootCid">
        <el-input v-model="dealform.RootCid"  placeholder="lzj" :disabled="true"/>
      </el-form-item>
    </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deal = false">取 消</el-button>
    <el-button type="primary" @click="deal = false">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import { getList } from '@/api/table'
import { queryAsk } from '@/api/files/'
import { getToken } from '@/utils/auth'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      uploadh:{
        token:''
      },
      fileList: undefined,
      list: null,
      listLoading: true,
      dialogVisible: false,
      deal:false,
      dealform:{
        // MemberID:'',
        // MinerId:'',
        // RootCid:'',
        miner:'',
      }, 
      base_api: process.env.VUE_APP_BASE_API+"yungo/upload",
      options: [{
          value: '选项1',
          label: '图片'
        }, {
          value: '选项2',
          label: '文本'
        }, {
          value: '选项3',
          label: '其它'
        },],
      value: '',
      pageParams:{
          pageNum: 1,
          pageSize: 10,
      },
      total:0,
    }
  },
  created() {
    this.fetchData()
    this.uploadh.token=getToken()
  },
  methods: {
    fetchData() {
      this.listLoading = true
    
      getList(this.pageParams).then(response => {
        this.list = response.data.list
        this.listLoading = false
        this.total = response.data.total
      })
    },
    renderTime(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    handleSizeChange(param){
      this.pageParams.pageSize = param
      this.listLoading = true
      getList(this.pageParams).then(response => {
        this.list = response.data.list
        this.listLoading = false
        this.total = response.data.total
      })
    },
    handleCurrentChange(param){
      // alert(param)
      this.pageParams.pageNum = param
      this.listLoading = true
      getList(this.pageParams).then(response => {
        this.list = response.data.list
        this.listLoading = false
        this.total = response.data.total
      })
    },
    handleDeal(param){
      console.log(param)
      this.deal = true 
      this.dealform.MemberID = param.MemberID
      this.dealform.MinerId = 'f023581'
      this.dealform.miner = 'f023581'
      this.dealform.RootCid = param.RootCid
      queryAsk(this.dealform).then(response => {
        // this.list = response.data.list
        // this.listLoading = false
        // this.total = response.data.total
        let v = response.data
        console.log(v)
      })
    }
  }
}
</script>

<style>

</style>