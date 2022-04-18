<template>
  <div style="width: 100%;background-color: #eee;font-size: 14px;padding: 20px 0;">
    <div style="display: flex;width: 980px;margin: 0 auto;background-color: #FFFFFF;border-radius: 5px;">
      <div >
        <div class="mt50 commentHtml" style="width: 800px;margin-left:50px">
      <div>
        <!-- <section class="tac pt10" style="padding-top:0px">
              <h6 class="comm-btn c-btn-2">交流</h6>
        </section> -->
        <section class="lh-bj-list pr mt20 replyhtml">
          <ul>
            <li class="unBr">
              <aside class="noter-pic">
                <!-- <img
                  width="50"
                  height="50"
                  class="picImg"
                  src="~/assets/img/avatarboy.gif"
                /> -->
              </aside>
              <div class="of">
                <section >
                  
                    <!-- <textarea
                      name=""
                      v-model="comment.content"
                      placeholder="输入您要评论的文字"
                      id="commentContent"
                      
                    ></textarea> -->
                    <el-input
                      type="textarea"
                      placeholder="此刻你想和大家分享什么"
                      v-model="communicate.content"
                      maxlength="100"
                      show-word-limit
                    >
                    </el-input>
                  
                  <p class="of mt5 tar pl10 pr10">
                    <span class="fl"
                      ><tt
                        class="c-red commentContentmeg"
                      ></tt
                    ></span>
                    <input
                      type="button"
                      @click="addCommunicate()"
                      value="发布"
                      class="lh-reply-btn"
                    />
                     <!-- <el-button type="success" round size="mini">发布</el-button> -->
                  </p>
                </section>
              </div>
            </li>
          </ul>
        </section>
        <section class="">
          <section class="question-list lh-bj-list pr">
            <ul class="pr10">
              <li v-for="(communicate, index) in data.items" v-bind:key="index">
              <el-card class="box-card" style="height:150px;border-radius: 10px">    
                
                <aside class="noter-pic1">
                  <img
                    width="50"
                    height="50"
                    class="picImg"
                    :src="communicate.avatar"
                
                  />
                </aside>
                <div class="of">
                  <span class="fl" style="position:absolute;left:150px;top:34px">
                      
                    <font class="fsize14 c-blue"> {{ communicate.nickname }}</font>
                    </span
                  >
                </div>
                <div class="noter-txt mt5" style="position:absolute;left:150px;top:55px;margin-right:15px">
                  <p >{{ communicate.content }}</p>
                </div>
                <section v-if="communicate.thumbUp===false">
                <div style="white-space: nowrap;display: flex;color: #cccccc;line-height: 40px;position:absolute;top:120px">
              <span class="icon-active" ><i class="el-icon-star-off" @click="thumbUp(communicate.id)"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;赞 {{communicate.thumb}}</span>
            </div>
                </section>
                <section v-else>
                  <div style="white-space: nowrap;display: flex;color: #000000;line-height: 40px;position:absolute;top:120px">
              <span class="icon-active" ><i class="el-icon-star-on" @click="thumbUp(communicate.id)"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已赞 {{communicate.thumb}}</span>
            </div>
                </section>
                <div class="of mt5" style="position:absolute;top:130px;left:640px">
                  <span class="fr"
                    ><font class="fsize12 c-999 ml5">{{
                      communicate.gmtCreate
                    }}</font></span
                  >
                </div>
              </el-card>
              </li>
            </ul>
          </section>
        </section>
        <!-- 公共分页 开始 -->
        <div class="paging">
          <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
          <a
            :class="{ undisable: !data.hasPrevious }"
            href="#"
            title="首页"
            @click.prevent="gotoPage(1)"
            >首</a
          >
          <a
            :class="{ undisable: !data.hasPrevious }"
            href="#"
            title="前一页"
            @click.prevent="gotoPage(data.current - 1)"
            >&lt;</a
          >
          <a
            v-for="page in data.pages"
            :key="page"
            :class="{
              current: data.current == page,
              undisable: data.current == page,
            }"
            :title="'第' + page + '页'"
            href="#"
            @click.prevent="gotoPage(page)"
            >{{ page }}</a
          >
          <a
            :class="{ undisable: !data.hasNext }"
            href="#"
            title="后一页"
            @click.prevent="gotoPage(data.current + 1)"
            >&gt;</a
          >
          <a
            :class="{ undisable: !data.hasNext }"
            href="#"
            title="末页"
            @click.prevent="gotoPage(data.pages)"
            >末</a
          >
          <div class="clear" />
        </div>
        <!-- 公共分页 结束 -->
      </div>
    </div>

        

        <!-- <div style="margin: 30px 0;text-align: center;overflow: auto;">
          <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
        </div> -->

      </div>
      <!-- <div style="width: 365px;">
        

        <div style="height: 340px;margin: 30px 20px;border: 1px solid #cccccc;border-radius: 5PX;">
          <el-calendar v-model="value">
          </el-calendar>
        </div>

      </div> -->
    </div>
  </div>
</template>

<script>
import communicate from"@/api/communicate"
export default {
    data() {
        return {
           value: new Date(),
           data:{},
           page: 1,
           limit: 10,
           currentPage: 4,
           activeName: 'second',
           communicate:{
             
           }
        };
      },
      created(){
          this.initCommunicate()
      },
      mounted() {
      },
      
      methods: {
        gotoPage(page){
          communicate.getPageList(page,this.limit)
            .then(response => {
              this.data=response.data.data
            })
        },
        initCommunicate() {
          communicate.getPageList(this.page, this.limit)
            .then((response) => {
            this.data = response.data.data;
            })
        },
        addCommunicate(){
          communicate.addCommunicate(this.communicate)
            .then(response => {
              if(response.data.success){
                this.communicate.content="";
                this.initCommunicate()
              }
              else{
                this.$message({
                    type: 'warning',
                    message: response.data.message
                  })
                this.communicate.content="";
                this.initCommunicate()
              }
            })
        },
        thumbUp(id){
          console.log("111"+id)
          communicate.thumbUp(id)
            .then(response => {
              if(response.data.success){
                this.initCommunicate()
              }
              else{
                this.$message({
                    type: 'warning',
                    message: response.data.message
                  })
              }
            })
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