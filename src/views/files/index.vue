<template>
  <div class="app-container">
    <div>
      <!-- <el-input placeholder="请输入内容" style="width:240px;" ></el-input> -->
      <el-select v-model="pageParams.type" style="margin-left: 20px;margin-right: 10px; width:220px;" @change="getList" placeholder="文件类型">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
      <!-- <el-button type="primary" @click="getList" >搜索</el-button> -->
      <el-button type="primary" @click="dialogVisible = true" style="margin-left: 20px;" >上传文件</el-button>
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
        :before-upload="beforeUpload"
        :headers="uploadh"
        :limit="3"
        :data="ftype"
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
<div style="">
  <div class="image" :key="i" v-for="(item,i) in list" @click="fileDialog(item)" >
      <div class="image1" v-if="item.Type==1">
        <img  :src="item.imgurl" style="margin-top:40px;margin-left:55px;height:120px;width:100px;">
        <!-- <span class="text-type" style="">{{item.typename}}</span> -->
        <span class="text-shenglue">{{item.Filename}}</span>
        <span class="textsize">{{item.FileSize}}</span>
      </div>
      <!-- <div v-else-if="item.Type==2" >
        <span class="text-type" style="">文档</span>
      </div> -->
      <div v-else-if="item.Type==3">
        <video width="100%" height="100%" controls>
          <source :src="item.imgurl" type="video/mp4">
          <source src="movie.ogg" type="video/ogg">
          您的浏览器不支持 HTML5 video 标签。
        </video>
        <!-- <span class="text-type" style="">{{item.typename}}</span> -->
        <span class="text-shenglue">{{item.Filename}}</span>
        <span class="textsize">{{item.FileSize}}</span>
      </div>
      <div v-else-if="item.Type==4">
        <audio style="margin-top:0px;height:120px;width:100%;" controls>
          <source :src="item.imgurl" type="audio/ogg">
          <source :src="item.imgurl" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
        </audio>
        <!-- <span class="text-type" style="">{{item.typename}}</span> -->
        <span class="text-shenglue">{{item.Filename}}</span>
        <span class="textsize">{{item.FileSize}}</span>
      </div>
      <div class="image1" v-else style="position: relative;">
        <img  src="./3.png" style="margin-top:40px;margin-left:55px;height:120px;width:100px;">
        <span class="text-type" style="">{{item.typename}}</span>
        <span class="text-shenglue">{{item.Filename}}</span>
      <span class="textsize">{{item.FileSize}}</span>
      </div>
      
  </div>
</div>

<el-dialog
  :title="dealFile.name"
  :visible.sync="filebool"
  width="500px"
 >
<div class="app-container">
    <el-form ref="form" label-position="left" label-width="120px" >
      <el-form-item label="Status">
        <span>unknow</span>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="Size" >
        <span>{{dealFile.size}}</span> 
      </el-form-item>
      <el-divider></el-divider>
      <!-- <el-form-item label="Mimetype" >

      </el-form-item> -->
      
      <el-form-item label="Created At">
        <span>{{dealFile.crateAt}}</span>
      </el-form-item>
      <el-divider></el-divider>
    </el-form>
  </div>

</el-dialog>




<div class="block" style="bottom:50px;position:absolute;left:70%;">
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
  <div style="width:90%;height:320px">
    <el-form ref="form" :model="dealform" label-width="120px"  v-loading="Loading">
      <el-form-item label="MinerId">
        <el-input v-model="dealform.Miner"  :placeholder="dealform.miner" />
        <!-- <el-input v-model="dealform.miner"  /> -->
      </el-form-item>

      <el-form-item label="MinPieceSize">
        <span>{{dealform.MinPieceSize}}</span>
      </el-form-item>
      <el-form-item label="MaxPieceSize">
        <span>{{dealform.MaxPieceSize}}</span>
      </el-form-item>
      <el-form-item label="Expiry">
        <span>{{dealform.Expiry}}</span>
      </el-form-item>
      <el-form-item label="Price">
        <span>{{dealform.Price}}</span>
      </el-form-item>
      <el-form-item label="VerifiedPrice">
        <span>{{dealform.VerifiedPrice}}</span>
      </el-form-item>
    </el-form>
    
  </div>

  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="queryAskDeal">deal</el-button>
    <el-button type="primary" @click="dealAsk1">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { queryAsk,dealAsk,getFtypes,fileDownload } from '@/api/files'
import { getToken,getExpiryTime,getFileType,getTime,getFileSizeByBit } from '@/utils/auth'

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
      filebool: false,
      fileparam: {
        id:0,
      },
      title : '',
      //imageurl : './2.jpg',
      imageurl : require('./3.png'),
      fileList: undefined,
      list: null,
      listLoading: true,
      Loading: true,
      dialogVisible: false,
      deal:false,
      ftype:{
        ftype:5,
      },
      ask:{
        miner: '',
      },
      dealform:{
        miner:'f023013',
      }, 
      dealFile:{
        name: '',
        size: '',
        crateAt: undefined,
      },
      dealAsk:{
        MemberID:'',
        MinerId:'',
        RootCid:'',
      },
      // dealinfo:{
      //   Miner :'',
      // },
      base_api: process.env.VUE_APP_BASE_API+"yungo/upload",
      options: [],
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
    this.uploadh.token = getToken()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.getList()
      // getList(this.pageParams).then(response => {
      //   this.list = response.data.list
      //   for (let i= 0;i<response.data.list.length;i++){
      //     let ty = response.data.list[i].Filename.split('.')
      //     if (ty.length>1){
      //       this.list[i].typename = ty[ty.length-1]
      //     }
      //   }
      //   this.listLoading = false
      //   this.total = response.data.total
      // })
      getFtypes().then(response => {
        for(let i=0;i<response.data.length;i++){
          let data={value:0,label:''} 
          data.value = response.data[i].Id
          data.label = response.data[i].TypeNameEn
          this.options.push(data)
        }
      })
    },
    beforeUpload(file){
      let strs = file.name.split('.')
      if(strs.length>1){
        this.ftype.ftype = getFileType(strs[strs.length-1])
      }
      if (this.ftype.ftype == 0) {
        this.ftype.ftype = 5
      }
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
      // this.getList(this.pageParams).then(response => {
      //   this.list = response.data.list
      //   this.listLoading = false
      //   this.total = response.data.total
      // })
      this.getList()
    },
    handleCurrentChange(param){
      // alert(param)
      this.pageParams.pageNum = param
      this.listLoading = true
      // getList(this.pageParams).then(response => {
      //   this.list = response.data.list
      //   this.listLoading = false
      //   this.total = response.data.total
      // })
      this.getList()
    },
    getList(){
      // alert(param)
      //dialogVisible1 = true
      this.listLoading = true
      getList(this.pageParams).then(response => {
        this.list = response.data.list
        for (let i= 0;i<response.data.list.length;i++){
          let ty = response.data.list[i].Filename.split('.')
          if (ty.length>1){
            this.list[i].typename = ty[ty.length-1]
          }
          this.list[i].imgurl= process.env.VUE_APP_BASE_API+'yungo/download?id='+this.list[i].Id+"&token="+getToken()

          this.list[i].FileSize = getFileSizeByBit(response.data.list[i].FileSize)
        }
        this.listLoading = false
        this.total = response.data.total
        console.log(this.list)
      })
    },
    handleDeal(param){
      this.deal = true 
      this.Loading=true
      this.ask.miner = param.MinerId
      this.dealAsk.MinerId = param.Miner
      this.dealAsk.RootCid = param.RootCid
      this.dealAsk.MemberID = param.MemberID
      if (this.ask.miner ===''){
        this.ask.miner = 'f023581'
      }
      queryAsk(this.ask).then(response => {
        this.dealform = response.data
        this.dealform.Expiry = getExpiryTime(response.data.Expiry)
        this.Loading=false
        //getTime(oldTime)
        //alert(getExpiryTime(response.data.Expiry))
      }).catch(error => {
        Message.error('not miner')
        this.Loading=false
      })
    },
    queryAskDeal(){
      this.deal = true 
      this.Loading=true
      // this.dealform.MemberID = param.MemberID
      // this.dealform.miner = param.MinerID
      // this.dealform.RootCid = param.RootCid
      this.ask.miner =  this.dealform.Miner
      queryAsk(this.ask).then(response => {
        this.dealform = response.data
        this.dealform.miner = this.dealform.Miner
        this.dealform.Expiry = getExpiryTime(response.data.Expiry)
        this.Loading=false
        //getTime(oldTime)
        //alert(getExpiryTime(response.data.Expiry))
      }).catch(error => {
        Message.error('not miner')
        this.Loading=false
      })
    },
    dealAsk1(){
       this.dealAsk.MinerId = this.dealform.Miner
      // this.dealAsk.RootCid = this.dealform.RootCid
      // this.dealAsk.MemberID = this.dealform.MemberID
      dealAsk(this.dealAsk).then(response => {
        this.Loading=false
        this.deal = false
        //getTime(oldTime)
        //alert(getExpiryTime(response.data.Expiry))
      }).catch(error => {
        Message.error('not miner')
        this.Loading=false
        this.deal = false
      })
    },
    fileDialog(params){
      console.log(params)
      this.title = params.Filename
      let time = new Date(params.CreateTime)
      this.dealFile.crateAt = getTime(time)
      this.dealFile.size = params.FileSize
      this.dealFile.name = params.Filename
      this.fileparam.id = params.Id
      this.imageurl = params.imgurl
      this.filebool = true
    }
    
  }
}
</script>

<style>
.image{
  margin-top:30px;
  margin-left:30px;
  width:210px;
  height:220px;
  background:rgb(218, 218, 218);
  float:left;
  border-top-left-radius: 8px ;
  border-top-right-radius: 8px ;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
/* .image:hover {
    cursor:pointer;
    transform:scale(1.1) translateZ(0); 
    -webkit-box-shadow: #ccc 0px 10px 10px;
    -moz-box-shadow: #ccc 0px 10px 10px;
    box-shadow: #ccc 0px 10px 10px;
} */
.image1{
  width:210px;
  height:220px;
  background:rgb(218, 218, 218);
  float:left;
  border-top-left-radius: 8px ;
  border-top-right-radius: 8px ;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.image1:hover {
    cursor:pointer;
    transform:scale(1.1) translateZ(0); 
    -webkit-box-shadow: #ccc 0px 10px 10px;
    -moz-box-shadow: #ccc 0px 10px 10px;
    box-shadow: #ccc 0px 10px 10px;
}
.file{
  margin-top:40px;
  margin-left:55px;
  height:120px;
  width:100px;
  background: rgb(218, 218, 218);
  background-image: url('./3.png');
  border-top-left-radius: 6px ;
  border-top-right-radius: 6px ;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.text-shenglue{
	display:block;
	word-break:keep-all;
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
	-o-text-overflow:ellipsis;
	-icab-text-overflow:ellipsis;
	-khtml-text-overflow:ellipsis;
	-moz-text-overflow: ellipsis;
  -webkit-text-overflow:ellipsis;
  max-width:210px;
  margin-top: 10px;
  width: 240px;
  text-align:center;
  color:rgb(89, 89, 109);
}
.textsize{
  display:block;
	word-break:keep-all;
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
	-o-text-overflow:ellipsis;
	-icab-text-overflow:ellipsis;
	-khtml-text-overflow:ellipsis;
	-moz-text-overflow: ellipsis;
  -webkit-text-overflow:ellipsis;
  max-width:210px;
  margin-top: 4px;
  width: 240px;
  text-align:center;
  font-size:10px;
  color:rgb(89, 89, 109);
  transition: all 0.3s;
}
.text-type{
  position: absolute; 
  max-width:210px;   
  top: 95px; 
  left: 0px; 
  text-align:center;
  font-size:20px;
  width: 240px; 
  color: white;
  
}

</style>