<template>
	<div style="padding: 30px;box-sizing: border-box;">
		<template>
			<el-table :data="tableData5" style="width: 100%">
				<el-table-column label="用户帐号" prop="username" align="center" />
				<el-table-column label="用户名称" prop="name" align="center" />
				<el-table-column label="用户电话" prop="phone" align="center" />
				<el-table-column label="用户头像" prop="price" align="center">
					<template slot-scope="scope">
						<img style="width: 50px;height: 50px;border-radius: 50%;border: 5px solid #f3f3f3;" :src="'http://yaqin.ckun.vip/'+scope.row.photo" />
					</template>
				</el-table-column>

			</el-table>
		</template>
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
	
	.el-dialog {
		width: 65%;
	}
	
	.el-form-item--medium .el-form-item__content {
		width: 60%;
	}
	
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 100% !important;
	}
</style>

<script>
	import axios from 'axios'
	export default {
		components: {},
		data() {
			return {
				tableData5: [],
			}
		},
		created() {
			this.getlist()
		},
		methods: {
			getlist() {
				var that = this
				axios.get('http://yaqin.ckun.vip:3002/user/api')
					.then(function(response) {
						console.log(response.data.data)
						that.tableData5 = response.data.data

					})
					.catch(function(error) {
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