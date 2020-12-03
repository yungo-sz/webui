<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      max-height="500px"
    >
    <!--
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      -->
      <el-table-column label="ID" width="500" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Peer.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="City" align="center">
        <template slot-scope="scope">
          {{ scope.row.City||'N/A' }}
        </template>
      </el-table-column>
      <el-table-column label="Country"  align="center">
        <template slot-scope="scope">
          {{ scope.row.Country }}
        </template>
      </el-table-column>
      <el-table-column label="Latitude" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Latitude }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Longitude" align="center">
        <template slot-scope="scope">
          {{ scope.row.Longitude }}
        </template>
      </el-table-column>
      <el-table-column label="Longitude" align="center">
        <template slot-scope="scope">
          {{ scope.row.Longitude }}
        </template>
      </el-table-column>
      <!--
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      -->
    </el-table>

    <div class="block" style="margin-top:10px;float:right;">
    <!-- layout="total, sizes, prev, pager, next, jumper" -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageParams.pageSize"
      :current-page="pageParams.pageNum"
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>

</template>

<script>
import { getList,netpeers } from '@/api/table'
console.log(netpeers)
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
      list: [],
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
      netpeers(this.pageParams).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total=response.data.length
      })
    },
    handleSizeChange(param){
      this.pageParams.pageSize = param
     // this.listLoading = true
     // netpeers(this.pageParams).then(response => {
       // this.list = response.data
       // this.listLoading = false
       // this.total = response.data.length
     // })
    },
    handleCurrentChange(param){
      // alert(param)
      this.pageParams.pageNum = param
      //this.listLoading = true
     // netpeers(this.pageParams).then(response => {
      //  this.list = response.data
      //  this.listLoading = false
        //this.total = response.data.length
     // })
    }
  }
}
</script>
