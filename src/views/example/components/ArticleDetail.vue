<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          Publush
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <!--<Warning />-->
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                Title
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="Author:" class="postInfo-container-item">
                    <el-select v-model="postForm.author"  filterable default-first-option remote placeholder="Search user">
                      <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="120px" label="Publush Time:" class="postInfo-container-item">
                    <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time" />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="90px" label="Importance:" class="postInfo-container-item">
                    <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="margin-top:8px;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>
        
        <el-form-item style="margin-bottom: 30px;" label="轮播图上传：">
          <el-upload class="upload-demo" action="http://yaqin.ckun.vip:8081/file_upload" :file-list="postForm.longimageList" :on-success="fileListChange" :on-remove="fileremove" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
	import axios from 'axios'
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  display_time: undefined, // 时间
  importance: 0,
  imageList:[],
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      type:0,
      imageUrl:"",
      longimageList:[],
      shortimagelist:[],
      userListOptions: ["ckun","xiaolei","yaqin"],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  computed: {
  		
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    },
    displayTime: {
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
  		
  		
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      console.log(this.$route.params)
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
  		fileListChange(file,fileList) {
//      this.imageUrl = URL.createObjectURL(file.raw);
         console.log(file)
         this.shortimagelist.push(file.res[0].path)
         console.log(this.shortimagelist)
    },
    fileremove(file, fileList){
    		console.log(file.url)
    		console.log(fileList)
//  		this.
    },
    fetchData(id) {
    		console.log(23456)
    		var that = this
    		axios.get('http://yaqin.ckun.vip:3002/specialty/details?id='+id)
			  .then(function(response) {
			  			console.log(response)
			  			for(let x in response.data.data){
			  				let arr = response.data.data[x].imageList.split(",")
			  				let longarr = [];
			  				for(let y of arr){
			  					if(y){
			  						longarr.push({url:"http://yaqin.ckun.vip/"+y})
			  					}
			  				}
			  				response.data.data[x].imageList = arr
			  				response.data.data[x].longimageList = longarr
			  			}
			  			console.log(response.data.data[0])
			  			that.postForm = response.data.data[0];
			  			that.postForm.importance = parseInt(response.data.data[0].importance)
			  			that.shortimagelist = that.postForm.imageList
			  			that.setTagsViewTitle()
			  })
			  .catch(function(error) {
			    console.log(error)
			  })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    submitForm() {
      console.log(this.postForm)
      this.postForm.type = this.type
      var params = new URLSearchParams()
      var that = this
      console.log(this.$route)
  			if(this.$route.name == "SpecialtyArticleList"||this.$route.name == "SpecialtyEditArticle"){
  				this.postForm.type = 0
  			}else if(this.$route.name == "DeliciousCreateArticle" ||this.$route.name == "DeliciousEditArticle"){
  				this.postForm.type = 1
  			}else if(this.$route.name=="StrategyCreateArticle" ||this.$route.name=="StrategyEditArticle"){
  				this.postForm.type = 2
  			}
  			console.log(this.postForm)
  			console.log(this.shortimagelist)
			this.postForm.imageList = this.shortimagelist
      params.append('data', JSON.stringify(this.postForm))
      axios.post('http://yaqin.ckun.vip:3002/specialty/add', params)
			  .then(function(response) {
			    console.log(response); 
			    if (response.data.code == 0) {
				    that.loading = true
	          that.$notify({
	            title: '成功',
	            message: '发布文章成功',
	            type: 'success',
	            duration: 2000
	          })
	          that.loading = false
			    }else {
		        console.log('error submit!!')
		        return false
		      }	
			  }).catch(function(error) {
			    console.log(error)
			  })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
