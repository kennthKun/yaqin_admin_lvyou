<template>
  <div>
    <el-button type="success" @click="dialogFormVisible2 = true">增加新导游</el-button>
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="导游名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属地区">
              <span>{{ props.row.scenic_spot }}</span>
            </el-form-item>
            <el-form-item label="导游 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="导游分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <!--<el-form-item label="导游地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>-->
            <el-form-item label="导游描述">
              <span>{{ props.row.introduce }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="导游环境">
              <el-upload class="upload-demo" action="http://yaqin.ckun.vip:8081/file_upload" :file-list="props.row.imageList" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="操作">
              <el-button type="primary" @click="exit(props.row.id)">编辑</el-button>
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
              <el-dialog title="编辑" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="导游名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="所属地区" :label-width="formLabelWidth">
                    <el-select v-model="form.scenic_spot" placeholder="请选择地区">
                      <el-option label="北京" value="shanghai" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="导游分类" :label-width="formLabelWidth">
                    <el-select v-model="form.category" placeholder="请选择分类">
                      <el-option label="商务性导游" value="商务性导游" />
                      <el-option label="度假性导游" value="度假性导游" />
                      <el-option label="长住性导游" value="长住性导游" />
                      <el-option label="会议性导游" value="会议性导游" />
                      <el-option label="观光性导游" value="观光性导游" />
                      <el-option label="小型导游" value="小型导游" />
                      <el-option label="中型导游" value="中型导游" />
                      <el-option label="大型导游" value="大型导游" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="导游描述" :label-width="formLabelWidth">
                    <el-input v-model="form.introduce" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="价格" :label-width="formLabelWidth">
                    <el-input v-model="form.price" auto-complete="off" />
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
      <el-table-column label="ID" prop="id" />
      <el-table-column label="导游名称" prop="name" />
      <el-table-column label="描述" prop="introduce" />
      <el-table-column label="价格" prop="price" />
      <el-table-column label="电话" prop="phone" />
    </el-table>
    <!-- 增加 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="导游名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="导游电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off" />
        </el-form-item>
        <el-form-item label="导游描述" :label-width="formLabelWidth">
          <el-input v-model="form.introduce" auto-complete="off" />
        </el-form-item>
        <el-form-item label="所属地区" :label-width="formLabelWidth">
          <el-select v-model="form.scenic_spot" placeholder="请选择地区">
            <el-option label="北京" value="北京" />
          </el-select>
        </el-form-item>
        <el-form-item label="导游分类" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option label="全部导游" value="全部导游" />
            <el-option label="自然景观" value="自然景观" />
            <el-option label="人文民俗" value="人文民俗" />
            <el-option label="漂流" value="漂流" />
            <el-option label="人文古镇" value="人文古镇" />
            <el-option label="宗教场所" value="宗教场所" />
            <el-option label="缆车" value="缆车" />
            <el-option label="垂直电梯" value="垂直电梯" />
          </el-select>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="create2">确 定</el-button>
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

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>

<script>
import axios from 'axios'
//	import { constants } from "crypto";
export default {
  data() {
    return {
      fromIndex: 0,
      dialogFormVisible: false,
      dialogVisible: false,
      dialogFormVisible2: false,
      form: {
        name: '',
        phone: '',
        introduce: '',
        scenic_spot: '',
        category: '',
        price: ''
      },
      formLabelWidth: '75px',
      tableData5: []
    }
  },
  created() {
    console.log(1111)
    this.getlist()
  },
  methods: {
    hand: function(e) {},
    exit: function(e) {
      console.log(e)
      this.dialogFormVisible = true
      this.fromIndex = e
      console.log(this.form)
      this.form = this.tableData5[e]
      console.log(this.form, this.tableData5[e])
    },
    complate: function() {
      this.tableData5[this.fromIndex] = this.form
      this.dialogFormVisible = false
    },
    getlist() {
      var that = this
      axios.get('http://yaqin.ckun.vip:3002/guides/api')
        .then(function(response) {
          console.log(that.tableData5)
          that.tableData5 = response.data.data
          console.log(that.tableData5)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    handleClose(done) {
      console.log(done)
      var that = this
      this.$confirm('确认删除？')
        .then(_ => {
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
    create2() {
      var data = []
      for (const x in this.form) {
        data.push(this.form[x])
      }
      var that = this
      var params = new URLSearchParams()
      params.append('data', data)
      axios.post('http://yaqin.ckun.vip:3002/addTourGuide', params)
			  .then(function(response) {
			    console.log(response); if (response.data.code == 0) { that.getlist() }
			    that.dialogFormVisible2 = false
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
