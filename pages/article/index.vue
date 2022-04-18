<template>
  <div style="width: 100%;background-color: #eee;font-size: 14px;padding: 20px 0;">
    <div style="display: flex;width: 980px;margin: 0 auto;background-color: #FFFFFF;border-radius: 5px;">
      <div style="flex: 1;border-right: 1px solid #cccccc;overflow: hidden;">
        

        <div v-for="(item, index) in list" style="overflow: hidden;height: 170px;display: flex;margin: 10px 20px;border-bottom: 1px solid #cccccc;" :key="index" class="item" @click="toDetail(item.id)">
          <div style="margin: 20px 0;width: 200px;" :href="'/article/'+item.id">
            <el-image :src="item.cover"   style="height: 130px;width: 200px;object-fit: cover;cursor: pointer;"></el-image>
          </div>
          <div style="margin: 30px 20px;">
            <div style="font-size: 18px;color: #000000;cursor: pointer;">{{item.title}} </div>
            <div style="white-space: nowrap;display: flex;color: #cccccc;line-height: 40px;">
              <span class="icon-active"><i class="el-icon-user"></i>{{item.memberName}} </span>
              <span class="icon-active" icon="el-icon-link" style="margin-left: 10px;"><i class="el-icon-time"></i>({{item.gmtCreate.substring(0,item.gmtCreate.indexOf(' '))}})</span>
              <span class="icon-active" icon="el-icon-link" style="margin-left: 10px;"><i class="el-icon-chat-round el-icon--right"></i>{{item.commentCount}}次评论</span>
            </div>
            <div style="text-overflow: -o-ellipsis-lastline;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                  word-break: break-all;color: gray;">
                  {{item.text}}
                  
            </div>
          </div>
        </div>

        <div style="margin: 30px 0;text-align: center;overflow: auto;">
          <el-pagination
                background
                @current-change="getList"
                :current-page="page"
                :page-size="limit"
                layout="total,  prev, pager, next, jumper"
                :total="total">
              </el-pagination>
        </div>

      </div>
      <div style="width: 365px;">
        <div style="text-align: center;margin-top: 20px;">
        <el-button type="primary" icon="el-icon-edit" @click="submit()">发表文章</el-button>
        </div>
        <div style="height: 340px;margin: 20px 20px;border: 1px solid #cccccc;border-radius: 5PX;">
          <el-calendar v-model="value">
          </el-calendar>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import article from "@/api/article"
export default {
    data() {
        return {
           value: new Date(),
           list:null,//查询之后接口返回集合
          page:1,//当前页
          limit:10,//每页记录数
          total:0,//总记录数

        };
      },
      created() { //页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getList() 
      },
      mounted() {
        this.getList()
      },
      methods: {
        submit(){
          if(cookie.get('jmu_ucenter')==null){
            this.$message({
                    type: 'warning',
                    message: '请先登录'
                  })
          }
          else{
            window.location.href="/article/submit"
          }
        },
        getList(page=1){
          this.page=page
            article.getPageList(this.page,this.limit)
                .then(response =>{//请求成功
                    //response接口返回的数据
                    this.list = response.data.data.row
                    this.total=response.data.data.total
                }) 
        },
        toDetail(id){
          window.location.href="/article/"+id
        }

      }


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