<template>
  <div>
    <el-button type="success" @click="addTicket">增加新导游</el-button>
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="导游名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="导游电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="导游地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="导游描述" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="props.row.introduce" :height="400" />
            </el-form-item>
            <el-form-item label="导游图片">
              <el-upload class="upload-demo" action="http://yaqin.ckun.vip:8081/file_upload" :file-list="props.row.longimageList" :on-success="fileListChange" list-type="picture">
              </el-upload>
            </el-form-item>
            <el-form-item label="操作">
              <el-button type="primary" @click="exit(props.row.id,props.$index)">编辑</el-button>
              <!-- 删除操作 -->
              <el-button type="danger" @click="handleClose(props.row.id)">删除</el-button>

              <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <span>该操作将删除此条信息且不可恢复，确认删除？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
              <!-- 删除结束 -->
              <el-dialog title="导游编辑" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="导游名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="导游电话" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="价格" :label-width="formLabelWidth">
                    <el-input v-model="form.price" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="所属地区" :label-width="formLabelWidth">
			              <el-select v-model="form.areaid" placeholder="请选择地区">
			                <el-option v-for='item in area' :label="item.name" :value="item.id" />
			              </el-select>
			            </el-form-item>
                  <el-form-item label="导游地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="导游描述" :label-width="formLabelWidth" style="margin-bottom: 30px;">
                    <Tinymce ref="editor" v-model="form.introduce" :height="400" />
                  </el-form-item>
								<el-form-item label="导游图片">
			              <el-upload class="upload-demo" action="http://yaqin.ckun.vip:8081/file_upload" :file-list="form.longimageList" :on-success="fileListChange" list-type="picture">
			                <el-button size="small" type="primary">点击上传</el-button>
			                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			              </el-upload>
			            </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="complate">确 定</el-button>
                </div>
              </el-dialog>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="导游名称" prop="name" />
      <el-table-column label="导游电话" prop="phone" />
      <el-table-column label="导游地址" prop="address" />
      <el-table-column label="价格" prop="price" />
      <!--<el-table-column label="导游图片" >
      		<template slot-scope="scope">
	          <img :src="'http://yaqin.ckun.vip/'"+"scope.row.imageList[0]"/>
	      </template>
      </el-table-column>-->
      
    </el-table>

    <el-dialog title="导游添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="导游名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="导游电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off" />
        </el-form-item>
        <el-form-item label="所属地区" :label-width="formLabelWidth">
          <el-select v-model="form.areaid" placeholder="请选择地区">
            <el-option v-for='item in area' :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="导游地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off" />
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off" />
        </el-form-item>
        <el-form-item label="导游描述" :label-width="formLabelWidth" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="form.introduce" :height="400" />
        </el-form-item>
        <el-form-item label="导游图片">
          <el-upload class="upload-demo" action="http://yaqin.ckun.vip:8081/file_upload" :file-list="form.longimageList" :on-success="fileListChange" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <!--  -->
</template>

<style>
	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	.el-dialog{width: 65%;}
	.el-form-item--medium .el-form-item__content{width: 60%;}
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 100% !important;
	}
</style>

<script>
import axios from 'axios'
import Tinymce from '@/components/Tinymce'
import { constants } from 'crypto'
export default {
  components: { Tinymce },
  data() {
    return {
      fromIndex: 0,
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        name: '',
        address: '',
        areaid:'',
        phone:'',
        price: '',
        introduce: '',
      },
      area:[],
      shortimagelist:[],
      formLabelWidth: '115px',
      tableData5: []
    }
  },
  created() {
    this.getlist()
    this.getjingqu()
  },
  methods: {
  		getjingqu(){
  			var that = this
  			axios.get('http://yaqin.ckun.vip:3002/scenic_spot_second/api')
			  .then(function(response) {
			  			
						that.area = response.data.data		
						console.log(that.area)
			  })
			  .catch(function(error) {
			    console.log(error)
			  })
  		},
  		getlist() {
  			var that = this
   		axios.get('http://yaqin.ckun.vip:3002/guides/api')
			  .then(function(response) {
			  			for(let x in response.data.data){
			  				let arr = response.data.data[x].imageList?response.data.data[x].imageList.split(","):[];
			  				let longarr = [];
			  				for(let y of arr){
			  					if(y){
			  						longarr.push({url:"http://yaqin.ckun.vip/"+y})
			  					}
			  				}
			  				response.data.data[x].imageList = arr
			  				response.data.data[x].longimageList = longarr
			  			}
			  			console.log(response.data.data)
			     that.tableData5 = response.data.data
			     
			  })
			  .catch(function(error) {
			    console.log(error)
			  })
   	},
   	 fileListChange(file,fileList) {
//      this.imageUrl = URL.createObjectURL(file.raw);
           console.log(file)
           console.log(this.shortimagelist)
           this.shortimagelist = this.form.imageList?this.form.imageList:[]
           this.shortimagelist.push(file.res[0].path)
           console.log(this.shortimagelist)
      },
   	addTicket() {
   		console.log(1234)
   		this.dialogFormVisible = true
   		this.form = {
        name: '',
        address: '',
        areaid:'',
        phone:'',
        price: '',
        introduce: '',
      }
      // 		this.form.introduce = ''
   	},
    hand: function(e) {},
    exit: function(o, e) {
      console.log(e)
      this.dialogFormVisible = true
      this.fromIndex = e
      console.log(this.form)
      this.form = this.tableData5[e]
      this.form.imageList = this.form.imageList?this.form.imageList:[];
      this.form.introduce = this.tableData5[e].introduce
      console.log(this.form)
    },
    complate: function() {
      //    this.tableData5[this.fromIndex] = this.form
      console.log(this.form)
      var that = this
      this.form.imageList = this.shortimagelist
      console.log(this.form)
      var params = new URLSearchParams()
      params.append('data', JSON.stringify(this.form))
      axios.post('http://yaqin.ckun.vip:3002/guides/add', params)
			  .then(function(response) {
			    console.log(response); if (response.data.code == 0) { that.getlist() }
			    that.dialogFormVisible = false
			  }).catch(function(error) {
			    console.log(error)
			  })
      this.dialogFormVisible = false
    },
    handleClose(done) {
      //    this.fromIndex = done
      var that = this
      this.$confirm('确认删除？')
        .then(_ => {
          //        this.tableData5.splice(this.fromIndex, 1)
          axios.get('http://yaqin.ckun.vip:3002/guides/delete?id=' + done)
            .then(function(response) {
              if (response.data.code == 0) { that.getlist() }
            })
            .catch(function(error) {
              console.log(error)
            })
        })
        .catch(_ => {})
    },
    create() {
    		console.log(this.form)
    		this.form.imageList = this.shortimagelist
      var that = this
      var params = new URLSearchParams()
      params.append('data', JSON.stringify(this.form))
      axios.post('http://yaqin.ckun.vip:3002/guides/add', params)
			  .then(function(response) {
			    console.log(response); if (response.data.code == 0) { that.getlist() }
			    that.dialogFormVisible = false
			  }).catch(function(error) {
			    console.log(error)
			  })
    }
  }
}
</script>
<style scoped>
	.demo-table-expand .el-form-item {
		width: 70%;
	}
</style>
