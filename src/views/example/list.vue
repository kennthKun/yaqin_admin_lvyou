<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="Title">
        <template slot-scope="{row}">
          <router-link :to="'/example/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>
			<el-table-column class-name="status-col" label="Actions" width="120">
        <template slot-scope="{row}">
           <!--<el-button type="danger" size="small" icon="el-icon-edit" @click="delete(row.id)">Delete</el-button>-->
           <el-button type="danger" size="small" icon="el-icon-delete" @click="deletebtn(row.id)"></el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
<!--
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />-->
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import axios from 'axios'
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "ArticleList",
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
  		getList() {
  			console.log(this.$route.name)
  			var type
  			if(this.$route.name == "SpecialtyArticleList"){
  				type = 0
  			}else if(this.$route.name == "DeliciousArticleList"){
  				type = 1
  			}else if(this.$route.name == "StrategyArticleList"){
  				type = 2
  			}
  			var that = this;
  			this.listLoading = true;
   		axios.get('http://yaqin.ckun.vip:3002/specialty/api?type='+type)
			  .then(function(response) {
			  			console.log(response)
			  			that.list = response.data.data;
		        that.total = response.data.data.length;
		        that.listLoading = false;
			  })
			  .catch(function(error) {
			    console.log(error)
			  })
   	},
   	deletebtn(id){
   		console.log(id)
   		var that = this
   		axios.get('http://yaqin.ckun.vip:3002/specialty/delete?id='+id)
			  .then(function(response) {
			  			console.log(response)
			  			that.getList();
			  })
			  .catch(function(error) {
			    console.log(error)
			  })
   	}
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
