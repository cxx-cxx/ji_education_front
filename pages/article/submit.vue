<template>
  <div style="width: 100%;background-color: #eee;font-size: 14px;padding: 20px 0;">
    <div style="display: flex;width: 980px;margin: 0 auto;background-color: #FFFFFF;border-radius: 5px;">
      <div style="flex: 1;border-right: 1px solid #cccccc;overflow: hidden;">
        
          <h1 style="text-align: center;font-size: 20px">文章标题</h1>


    <el-form label-width="120px">

        
        
      <el-input v-model="article.title" style="margin: 10px" placeholder="标题不可为空"/>


        <!-- 课程讲师 TODO -->
        <!-- 课程讲师 -->
        <h1 style="text-align: center;font-size: 20px">文章封面</h1>    
    <el-upload
    style="text-align: center;"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="'http://localhost:8222/eduoss/fileoss'"
                class="avatar-uploader">
                <img :src="article.cover" width="400px" height="200px">
    </el-upload>

        <h1 style="text-align: center;font-size: 20px">文章正文</h1>
        <!-- 课程简介 TODO -->
        <!-- 课程简介-->
        
            <div style="border: 1px solid #ccc;margin: 10px">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="article.text"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
    </div>
    

        <!-- 课程封面 TODO -->
        <!-- 课程封面-->
 


        <div style="text-align: center;">
            <el-button type="success" icon="el-icon-edit" @click="addArticle()">提交</el-button>
        </div>
        </el-form>
        

        

        

      </div>
      
    </div>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import articlejs from "@/api/article"
export default {
     components: { Editor, Toolbar },
    layout: 'sign',
    data() {
        return {
            editor: null,
            html: '<p>hello</p>',
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
            saveBtnDisabled:false,
            courseInfo:{
                title: '',
                subjectId: '',//二级分类id
                subjectParentId:'',//一级分类id
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: 'https://jmu-edu.oss-cn-beijing.aliyuncs.com/2022/02/22/1.jpg',
                price: 0,
                isExchange:0
            },
            article:{
              title:'',
              text:'',
              cover:'https://jmu-edu.oss-cn-beijing.aliyuncs.com/2022/02/22/1.jpg'
            },
            courseId:'',
            BASE_API: process.env.BASE_API, // 接口API地址
            teacherList:[],//封装所有的讲师
            subjectOneList:[],//一级分类
            subjectTwoList:[]//二级分类
        };
      },
      mounted() {
      },
      methods: {
         onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
      },
        addArticle(){
          articlejs.addArticle(this.article)
            .then(response => {
              if(response.data.success){
                  this.$message({
                      type: 'success',
                      message: '已提交,请等待审核通过',
                      offset: 100
                  });
                  
                  setTimeout(function(){
                     window.location.href="/article"
                    },2000)
              }
              else{
                this.$message({
                      type: 'warning',
                      message: response.data.message
                    })
              }
            })
        },
        handleAvatarSuccess(res, file) {
            this.article.cover = res.data.url
        },
        //上传之前调用的方法
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
      },
      


}
</script>

<style>
.icon-active:hover{
    color: #585858;
  }
  .item img {
    width: 100%;
    height: auto;
    transform: scale(1);
    transition: transform 1s ease 0s;
  }

  .item:hover img{
    transform: scale(1.1);
  }
  .face-pic:hover img{
    transform:rotate(360deg);
    -ms-transform:rotate(360deg); /* Internet Explorer */
    -moz-transform:rotate(360deg); /* Firefox */
    -webkit-transform:rotate(360deg); /* Safari 和 Chrome */
    -o-transform:rotate(360deg); /* Opera */
    transition: transform 0.6s ease 0s;
  }
  .el-calendar-day{
    
    height: 30px!important;
    text-align: center!important;
  }
</style>