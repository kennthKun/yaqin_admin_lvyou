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
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="导游 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="营业时间">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="导游分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="导游地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="导游描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.price}}</span>
            </el-form-item>
             <el-form-item label="电话">
              <span>{{ props.row.phone}}</span>
            </el-form-item>
            <el-form-item label="导游环境">
              <el-upload
                class="upload-demo"
                action="http://yaqin.ckun.vip:8081/file_upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
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
                  <el-form-item label="导游名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="所属地区" :label-width="formLabelWidth">
                    <el-select v-model="form.shop" placeholder="请选择地区">
                      <el-option label="北京" value="shanghai"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="营业时间" :label-width="formLabelWidth">
                    <el-input v-model="form.shopId" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="导游分类" :label-width="formLabelWidth">
                    <el-select v-model="form.category" placeholder="请选择分类">
                      <el-option label="商务性导游" value="商务性导游"></el-option>
                      <el-option label="度假性导游" value="度假性导游"></el-option>
                      <el-option label="长住性导游" value="长住性导游"></el-option>
                      <el-option label="会议性导游" value="会议性导游"></el-option>
                      <el-option label="观光性导游" value="观光性导游"></el-option>
                      <el-option label="小型导游" value="小型导游"></el-option>
                      <el-option label="中型导游" value="中型导游"></el-option>
                      <el-option label="大型导游" value="大型导游"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="导游地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="导游描述" :label-width="formLabelWidth">
                    <el-input v-model="form.desc" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="价格" :label-width="formLabelWidth">
                    <el-input v-model="form.price" auto-complete="off"></el-input>
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
      <el-table-column label="商品 ID" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
    </el-table>
<!-- 增加 -->
    <el-dialog title="商品编辑" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="导游名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属地区" :label-width="formLabelWidth">
          <el-select v-model="form.shop" placeholder="请选择地区">
            <el-option label="北京" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业时间" :label-width="formLabelWidth">
          <el-input v-model="form.shopId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导游分类" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option label="全部导游" value="全部导游"></el-option>
            <el-option label="自然景观" value="自然景观"></el-option>
            <el-option label="人文民俗" value="人文民俗"></el-option>
            <el-option label="漂流" value="漂流"></el-option>
            <el-option label="人文古镇" value="人文古镇"></el-option>
            <el-option label="宗教场所" value="宗教场所"></el-option>
            <el-option label="缆车" value="缆车"></el-option>
            <el-option label="垂直电梯" value="垂直电梯"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="导游地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导游描述" :label-width="formLabelWidth">
          <el-input v-model="form.desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="导游电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
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
import { constants } from "crypto";
export default {
  data() {
    return {
      fromIndex: 0,
      dialogFormVisible: false,
      dialogVisible: false,
      dialogFormVisible2: false,
      form: {
        id: "",
        name: "",
        category: "",
        shopId: "",
        address: "",
        shop: "",
        price: "",
        shopId: "",
        phone:"",
        imageList: ""
      },
      formLabelWidth: "75px",
      tableData5: [
        {
          id: "0",
          name: "故宫导游",
          category: "导游导游",
          desc: "故宫自2019年春节起，实行除夕当日闭馆",
          address: "北京市东城区景山前街4号",
          shop: "北京",
          shopId: "10333",
          price: 45,
          phone:13126929429,
          imageList: [

            {
              name:"123",
              url:"https://imgsa.baidu.com/exp/w=500/sign=8ee2dc99afc379317d688629dbc5b784/4d086e061d950a7bf41a505b0ad162d9f2d3c906.jpg",

            },
            {
              name:"123",
              url:"https://z1.muscache.cn/im/pictures/4ff69ceb-db3b-4656-951d-f12e8ac3221c.jpg?aki_policy=large"
            }
          ]
        },
        {
          id: "2",
          name: "颐和园导游",
          category: "导游导游",
          desc: "故宫自2019年春节起，实行除夕当日闭馆",
          address: "北京市东城区景山前街4号",
          shop: "北京",
          shopId: "10333", phone:13126929429,
          price: 45,
          imageList: [

            {
              name:"123",
              url:"https://imgsa.baidu.com/exp/w=500/sign=8ee2dc99afc379317d688629dbc5b784/4d086e061d950a7bf41a505b0ad162d9f2d3c906.jpg",

            },
            {
              name:"123",
              url:"https://z1.muscache.cn/im/pictures/4ff69ceb-db3b-4656-951d-f12e8ac3221c.jpg?aki_policy=large"
            }
          ]
        },
        {
          id: "3",
          name: "天安门导游",
          category: "导游导游",
          desc: "故宫自2019年春节起，实行除夕当日闭馆",
          address: "北京市东城区景山前街4号",
          shop: "北京",
          shopId: "10333", phone:13126929429,
          price: 45,
          imageList: [
            {
              name:"123",
              url:"https://imgsa.baidu.com/exp/w=500/sign=8ee2dc99afc379317d688629dbc5b784/4d086e061d950a7bf41a505b0ad162d9f2d3c906.jpg",

            },
            {
              name:"123",
              url:"https://z1.muscache.cn/im/pictures/4ff69ceb-db3b-4656-951d-f12e8ac3221c.jpg?aki_policy=large"
            }
          ]
        },
        {
          id: "4",
          name: "天坛导游",
          category: "导游导游",
          desc: "故宫自2019年春节起，实行除夕当日闭馆",
          address: "北京市东城区景山前街4号",
          shop: "北京", phone:13126929429,
          shopId: "10333",
          price: 45,
          imageList: [

            {
              name:"123",
              url:"https://imgsa.baidu.com/exp/w=500/sign=8ee2dc99afc379317d688629dbc5b784/4d086e061d950a7bf41a505b0ad162d9f2d3c906.jpg",

            },
            {
              name:"123",
              url:"https://z1.muscache.cn/im/pictures/4ff69ceb-db3b-4656-951d-f12e8ac3221c.jpg?aki_policy=large"
            }
          ]
        }
      ]
    };
  },
  methods: {
    hand: function(e) {},
    exit: function(e) {
      console.log(e);
      this.dialogFormVisible = true;
      this.fromIndex = e;
      console.log(this.form);
      this.form = this.tableData5[e];
      console.log(this.form, this.tableData5[e]);
    },
    complate: function() {
      this.tableData5[this.fromIndex] = this.form;
      this.dialogFormVisible = false;
    },
    handleClose(done) {
      this.fromIndex = done;
      this.$confirm("确认关闭？")
        .then(_ => {
          this.tableData5.splice(this.fromIndex, 1);
        })
        .catch(_ => {});
    },
    create() {
      this.form.id =
        parseInt(this.tableData5[this.tableData5.length - 1].id) + 1;
      this.tableData5.push(this.form);
      this.dialogFormVisible = false;
      this.form = {
        id: "",
        name: "",
        category: "",
        shopId: "",
        address: "",
        shop: "",
        price: "",
        shopId: "",
        phone:""
      };
    },
    create2() {
      this.form.id =
        parseInt(this.tableData5[this.tableData5.length - 1].id) + 1;
      this.tableData5.push(this.form);
      this.dialogFormVisible2 = false;
      this.form = {
        id: "",
        name: "",
        category: "",
        shopId: "",
        address: "",
        shop: "",
        price: "",
        shopId: "",
        phone:""
      };
    }
  }
};
</script>
<style scoped>
.demo-table-expand .el-form-item {
  width: 70%;
}
</style>
