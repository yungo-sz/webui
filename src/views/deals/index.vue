<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Addr">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Data Cid" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Proposal Cid" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="Miner" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="Price Per Epoch" width="240" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="Size" width="240" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->

      <el-table-column align="center" prop="created_at" label="CreateTime" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
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
  </div>

</template>

<script>
import { getList } from '@/api/table'

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
      list: null,
      listLoading: true,
      pageParams:{
          pageNum: 1,
          pageSize: 10,
      },
      total:0,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.pageParams).then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
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
    }
  }
}
</script>
