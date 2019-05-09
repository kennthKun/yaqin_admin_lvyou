<template>
  <div>
    <el-button type="success" @click="addTicket">增加新景区</el-button>
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="景区名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="景区等级">
              <span>{{ props.row.level }}</span>
            </el-form-item>
            <el-form-item label="景区分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="景区地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="景点描述"  style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="props.row.introduce" :height="400" />
            </el-form-item>
            <el-form-item label="门票价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="开放时间">
              <span>夏季：{{ props.row.sum_start_time }}</span>
              <span>冬季：{{ props.row.winter_start_time }}</span>
            </el-form-item>
            
            <el-form-item label="关闭时间">
              <span>夏季：{{ props.row.sum_end_time }}</span>
              <span>冬季：{{ props.row.winter_end_time }}</span>
            </el-form-item>
            
            <el-form-item label="景区图片">
              <el-upload class="upload-demo" action="http://yaqin.ckun.vip:8081/file_upload" :file-list="props.row.imageList" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
              <el-dialog title="景区编辑" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="景区名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="景区等级" :label-width="formLabelWidth">
                    <el-input v-model="form.level" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="门票价格" :label-width="formLabelWidth">
                    <el-input v-model="form.price" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="夏季开放时间" :label-width="formLabelWidth">
                    <el-time-select v-model="form.sum_start_time" :picker-options="{start: '00:00',step: '00:15',end: '24:00'}"></el-time-select>
                  </el-form-item>
                  <el-form-item label="夏季结束时间" :label-width="formLabelWidth">
                    <el-time-select v-model="form.sum_end_time" :picker-options="{start: '00:00',step: '00:15',end: '24:00'}"></el-time-select>
                  </el-form-item>
                  <el-form-item label="冬季开放时间" :label-width="formLabelWidth">
                    <el-time-select v-model="form.winter_start_time" :picker-options="{start: '00:00',step: '00:15',end: '24:00'}"></el-time-select>
                  </el-form-item>
                  <el-form-item label="冬季结束时间" :label-width="formLabelWidth">
                    <el-time-select v-model="form.winter_end_time" :picker-options="{start: '00:00',step: '00:15',end: '24:00'}"></el-time-select>
                  </el-form-item>
                  <el-form-item label="景区分类" :label-width="formLabelWidth">
                    <el-select v-model="form.category" placeholder="请选择分类">
                      <el-option label="自然景观" value="自然景观" />
                      <el-option label="人文民俗" value="人文民俗" />
                      <el-option label="漂流" value="漂流" />
                      <el-option label="人文古镇" value="人文古镇" />
                      <el-option label="宗教场所" value="宗教场所" />
                      <el-option label="缆车" value="缆车" />
                      <el-option label="垂直电梯" value="垂直电梯" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="景点地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" auto-complete="off" />
                  </el-form-item>
                  <!--<el-form-item label="景点描述" :label-width="formLabelWidth">
                    <el-input type="textarea"  v-model="form.introduce" auto-complete="off" />
                  </el-form-item>-->
                  <el-form-item label="景点描述" :label-width="formLabelWidth" style="margin-bottom: 30px;">
					          <Tinymce ref="editor" v-model="form.introduce" :height="400" />
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
      <el-table-column label="景区名称" prop="name" />
      <el-table-column label="景区等级" prop="level" />
      <el-table-column label="景区地址" prop="address" />
      <el-table-column label="景区分类" prop="category" />
      <el-table-column label="夏季开放时间" prop="sum_start_time" />
      <el-table-column label="夏季结束时间" prop="sum_end_time" />
       <el-table-column label="冬季开放时间" prop="winter_start_time" />
      <el-table-column label="冬季结束时间" prop="winter_end_time" />
      <el-table-column label="价格" prop="price" />
    </el-table>

    <el-dialog title="景区添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="等级" :label-width="formLabelWidth">
          <el-input v-model="form.level" auto-complete="off" />
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off" />
        </el-form-item>
        <el-form-item label="门票分类" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option label="自然景观" value="自然景观" />
            <el-option label="人文民俗" value="人文民俗" />
            <el-option label="漂流" value="漂流" />
            <el-option label="人文古镇" value="人文古镇" />
            <el-option label="宗教场所" value="宗教场所" />
            <el-option label="缆车" value="缆车" />
            <el-option label="垂直电梯" value="垂直电梯" />
          </el-select>
        </el-form-item>
        <el-form-item label="夏季开放时间" :label-width="formLabelWidth">
          <!--<el-input v-model="form.sum_start_time" auto-complete="off" />-->
           <el-time-select v-model="form.sum_start_time"  :picker-options="{start: '00:00',step: '00:15',end: '24:00'}"></el-time-select>
        </el-form-item>
        <el-form-item label="夏季结束时间" :label-width="formLabelWidth">
          <!--<el-input v-model="form.sum_end_time" auto-complete="off" />-->
          <el-time-select v-model="form.sum_end_time"  :picker-options="{start: '00:00',step: '00:15',end: '24:00'}"></el-time-select>
        </el-form-item>
        <el-form-item label="冬季开放时间" :label-width="formLabelWidth">
          <!--<el-input v-model="form.winter_start_time" auto-complete="off" />-->
          <el-time-select v-model="form.winter_start_time"  :picker-options="{start: '00:00',step: '00:15',end: '24:00'}"></el-time-select>
        </el-form-item>
        <el-form-item label="冬季结束时间" :label-width="formLabelWidth">
          <!--<el-input v-model="form.winter_end_time" auto-complete="off" />-->
          <el-time-select v-model="form.winter_end_time"  :picker-options="{start: '00:00',step: '00:15',end: '24:00'}"></el-time-select>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off" />
        </el-form-item>
        <el-form-item label="景点描述" :label-width="formLabelWidth" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="form.introduce" :height="400" />
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
  data() {
    return {
      fromIndex: 0,
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        name: '',
        level:'',
        address: '',
        category: '',
        sum_start_time:'',
        sum_end_time:'',
        winter_start_time:'',
        winter_end_time:'',
        price: '',
        introduce:'',
      },
      formLabelWidth: '115px',
      tableData5: []
    }
  },
  components: { Tinymce },
  methods: {
  		getlist(){
  			var that = this
   		axios.get('http://yaqin.ckun.vip:3002/scenic_spot_second/api')
			  .then(function(response) {
			  			console.log(response.data.data)
			     that.tableData5 = response.data.data
			  })
			  .catch(function(error) {
			    console.log(error)
			  })
   	},
   	addTicket(){
   		console.log(1234)
   		this.dialogFormVisible = true;
   		this.form = {
        name: '',
        level:'',
        address: '',
        category: '',
        sum_start_time:'',
        sum_end_time:'',
        winter_start_time:'',
        winter_end_time:'',
        price: '',
        introduce:'',
      }
// 		this.form.introduce = ''
   	},
    hand: function(e) {},
    exit: function(o,e) {
      console.log(e)
      this.dialogFormVisible = true
      this.fromIndex = e
      console.log(this.form)
      this.form = this.tableData5[e]
      this.form.introduce = this.tableData5[e].introduce
      console.log(this.form, this.tableData5[e])
    },
    complate: function() {
//    this.tableData5[this.fromIndex] = this.form
			console.log(this.form) 
			var that = this
			var params = new URLSearchParams()
			params.append('data', JSON.stringify(this.form))
			axios.post('http://yaqin.ckun.vip:3002/scenic_spot_second/edit', params)
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
					axios.get('http://yaqin.ckun.vip:3002/scenic_spot_second/delete?id=' + done)
            .then(function(response) {
              if (response.data.code == 0) { that.getlist() }
            })
            .catch(function(error) {
              console.log(error)
            })
        })
        .catch(_ => {})
    },
    create(){
    		console.log(this.form)
    		var data = []
      for (const x in this.form) {
      		if(x == "id"){
      			
      		}else{
      			
      			data.push(this.form[x])
      		}
      }
      console.log(data)
      var that = this
      var params = new URLSearchParams()
      params.append('data', data)
      axios.post('http://yaqin.ckun.vip:3002/scenic_spot_second/add', params)
			  .then(function(response) {
			    console.log(response); if (response.data.code == 0) { that.getlist() }
			    that.dialogFormVisible = false
			  }).catch(function(error) {
			    console.log(error)
			  })
    }
  },
  created() {
      this.getlist()
  }
}
</script>
<style scoped>
	.demo-table-expand .el-form-item {
		width: 70%;
	}
</style>
