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
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          {{ scope.row.Miner }}
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
      <el-table-column label="Operation" width="250" align="center">
      <template slot-scope="scope">
      <el-button
          size="mini"
          @click="getMiner(scope.$index, scope.row)">详情</el-button>
        <el-button
          size="mini"
          @click="minerAsk(scope.$index, scope.row)">询价</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="addMiner(scope.$index, scope.row)">收藏</el-button>
      </template>
    </el-table-column>
      <!--
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      -->
      <!--
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
      :page-sizes="[10, 20, 50]"
      :page-size="pageParams.pageSize"
      :current-page="pageParams.pageNum"
      layout="sizes, prev, pager, next,jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>

</template>

<script>
import { getList,netminers,minerinfo,queryAsk } from '@/api/table'


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
      total:103,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      try {
        let res = await netminers(this.pageParams)
        this.list = res.data.list
        this.listLoading = false
        this.total = res.data.total
      }catch(e){
      }finally{
      }
      
    },
    async handleSizeChange(param){

      try{
      this.pageParams.pageSize = param
      this.listLoading = true
      let res = await netminers(this.pageParams)
      this.list = res.data.list
      this.listLoading = false
      this.total = res.data.total
      }catch(e){   
      }finally{
      }
    },
    async handleCurrentChange(param){

      try{
          this.pageParams.pageNum = param
          this.listLoading = true
          let res = await netminers(this.pageParams)
          this.list = res.data.list
          this.listLoading = false
          this.total = res.data.total
      }catch(e){
      }
      
    },
    minerAsk(index,row){
    console.log(row)
     queryAsk({miner:row.Miner}).then(res=>{
        this.$alert(`<div>Price: ${res.data.Price}</div>
                    <div>VerifiedPrice: ${res.data.VerifiedPrice}</div>
                    <div>MaxPieceSize: ${res.data.MaxPieceSize}</div>
                    <div>MinPieceSize: ${res.data.MinPieceSize}</div>
                    <div>Expiry: ${res.data.Expiry}</div>`, 
        `query miner ${row.Miner}`,
        {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true
        });

     })

    },
    addMiner(index,row){
    console.log(row)
    this.$confirm('收藏为受信任的矿工?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
               
        });
    },
    getMiner(index,row){
    console.log(row)
     minerinfo({miner:row.Miner}).then(res=>{
      console.log(res);
      this.$alert(`<div>QualityAdjPower: ${res.data.MinerPower.MinerPower.QualityAdjPower}</div>
                  <div>RawBytePower: ${res.data.MinerPower.MinerPower.RawBytePower}</div>`, 
        `power of miner ${row.Miner}`,
        {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true
        });

    })
    }
  }
}
</script>
