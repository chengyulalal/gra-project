<!--
 * @Date: 2021-05-10 12:59:30
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-15 17:43:37
 * @FilePath: \gra-project-sourcetree\src\components\uploadFile.vue
-->
<template>
	<div>
		<el-upload :action="'none'" :auto-upload="false" drag ref='upload'  :on-change="onChange" :on-remove="onRemove" multiple show-file-list>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
			<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
		<el-button icon="el-icon-upload" type="primary" style="margin-top: 20px;" @click="submitUpload">上传</el-button>
		<el-button icon="el-icon-upload" type="primary" style="margin-top: 20px;" @click="submitUpload">上传</el-button>
		<el-button icon="el-icon-upload" type="primary" style="margin-top: 20px;" @click="submitUpload">上传</el-button>
	</div>
</template>

<script>
	import {uploadFile} from '../http/api'
	export default {
		props: {
			//设置文件保存的路径，作为参数传递进来
			path: String
		},
		data() {
			return {
				//文件列表
				fileList: [],
			}
		},
		methods: {
			//文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
			onChange(file,filelist){
				//file.raw 才是真实的 file 对象
				this.fileList.push(file.raw)
			},
			//文件列表移除文件时的钩子
			onRemove(file, fileList){
				//file.raw 才是真实的 file 对象
				this.fileList.splice(this.fileList.indexOf(file.raw),1)
			},
			//上传文件
			submitUpload() {
				let formData = new FormData();
				// 向 formData 对象中添加文件
				this.fileList.forEach(file => {
					formData.append('file', file);
				})
				//设置文件保存路径
				console.log(this.path);
				formData.append('path', this.path);
				uploadFile(formData)
					.then(res => {
						console.log(res)
					}).catch(e => {
						console.log(e)
					})
			},
		},
		mounted() {
		},
	}
</script>

<style scoped>

</style>
