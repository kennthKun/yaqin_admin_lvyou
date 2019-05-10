<template>
  <div>
    <el-button type="success" @click="dialogFormVisible2 = true">增加新司机</el-button>
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="租车名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属地区">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="租车 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="营业时间">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="租车分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="租车地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="租车描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="租车环境">
              <el-upload
                class="upload-demo"
                action="http://yaqin.ckun.vip:8081/file_upload"
                :file-list="props.row.imageList"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="操作">
              <el-button type="primary" @click="exit(props.$index)">编辑</el-button>
              <!-- 删除操作 -->
              <el-button type="danger" @click="handleClose(props.$index)">删除</el-button>

              <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
              >
                <span>该操作将删除此条信息且不可恢复，确认删除？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
              <!-- 删除结束 -->
              <el-dialog title="商品编辑" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="租车名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="所属地区" :label-width="formLabelWidth">
                    <el-select v-model="form.shop" placeholder="请选择地区">
                      <el-option label="北京" value="shanghai" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="营业时间" :label-width="formLabelWidth">
                    <el-input v-model="form.shopId" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="租车分类" :label-width="formLabelWidth">
                    <el-select v-model="form.category" placeholder="请选择分类">
                      <el-option label="商务性租车" value="商务性租车" />
                      <el-option label="度假性租车" value="度假性租车" />
                      <el-option label="长住性租车" value="长住性租车" />
                      <el-option label="会议性租车" value="会议性租车" />
                      <el-option label="观光性租车" value="观光性租车" />
                      <el-option label="小型租车" value="小型租车" />
                      <el-option label="中型租车" value="中型租车" />
                      <el-option label="大型租车" value="大型租车" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="租车地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="租车描述" :label-width="formLabelWidth">
                    <el-input v-model="form.desc" auto-complete="off" />
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
      <el-table-column label="商品 ID" prop="id" />
      <el-table-column label="商品名称" prop="name" />
      <el-table-column label="描述" prop="desc" />
      <el-table-column label="价格" prop="price" />
      <el-table-column label="电话" prop="phone" />
    </el-table>
    <!-- 增加 -->
    <el-dialog title="商品编辑" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="租车名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="所属地区" :label-width="formLabelWidth">
          <el-select v-model="form.shop" placeholder="请选择地区">
            <el-option label="北京" value="shanghai" />
          </el-select>
        </el-form-item>
        <el-form-item label="营业时间" :label-width="formLabelWidth">
          <el-input v-model="form.shopId" auto-complete="off" />
        </el-form-item>
        <el-form-item label="租车分类" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option label="全部租车" value="全部租车" />
            <el-option label="自然景观" value="自然景观" />
            <el-option label="人文民俗" value="人文民俗" />
            <el-option label="漂流" value="漂流" />
            <el-option label="人文古镇" value="人文古镇" />
            <el-option label="宗教场所" value="宗教场所" />
            <el-option label="缆车" value="缆车" />
            <el-option label="垂直电梯" value="垂直电梯" />
          </el-select>
        </el-form-item>
        <el-form-item label="租车地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off" />
        </el-form-item>
        <el-form-item label="租车描述" :label-width="formLabelWidth">
          <el-input v-model="form.desc" auto-complete="off" />
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off" />
        </el-form-item>

        <el-form-item label="租车电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off" />
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
import { constants } from 'crypto'
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
      tableData5: [
        {
          id: '0',
          name: '故宫租车',
          category: '租车',
          desc: '故宫自2019年春节起，实行除夕当日闭馆',
          address: '北京市东城区景山前街4号',
          shop: '北京',
          shopId: '10333',
          price: 45,
          phone: 13126929429,
          imageList: [
            {
              name: '123',
              url:
                'https://imgsa.baidu.com/exp/w=500/sign=8ee2dc99afc379317d688629dbc5b784/4d086e061d950a7bf41a505b0ad162d9f2d3c906.jpg'
            },
            {
              name: '123',
              url:
                'https://z1.muscache.cn/im/pictures/4ff69ceb-db3b-4656-951d-f12e8ac3221c.jpg?aki_policy=large'
            }
          ]
        }

      ]
    }
  },
  created() {
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
    handleClose(done) {
      this.fromIndex = done
      this.$confirm('确认关闭？')
        .then(_ => {
          this.tableData5.splice(this.fromIndex, 1)
        })
        .catch(_ => {})
    },

    getlist() {
      var that = this
      axios.get('http://localhost:3002/drivers/api')
        .then(function(response) {
          that.tableData5 = response.data.data
          console.log(that.tableData5)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    create2() {
      this.form.id =
        parseInt(this.tableData5[this.tableData5.length - 1].id) + 1
      this.tableData5.push(this.form)
      this.dialogFormVisible2 = false
      this.form = {
        id: '',
        name: '',
        category: '',
        shopId: '',
        address: '',
        shop: '',
        price: '',
        shopId: '',
        phone: ''
      }
    }
  }
}
</script>
<style scoped>
.demo-table-expand .el-form-item {
  width: 70%;
}
</style>
