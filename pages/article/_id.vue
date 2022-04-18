<template>
<div>
 
   
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <!-- header start -->
		<!-- header end -->
		<!-- breadcrumb start -->
		<div class="breadcrumb-area pt-240 pb-125" style="background-image:url(https://jmu-edu.oss-cn-beijing.aliyuncs.com/hero-bg-01.jpg);padding-top: 240px;padding-bottom: 125px" data-overlay="5">
		    <div class="container">
		        <div class="breadcrumb-text text-center z-index">
		            <h2>{{article.title}}</h2>
		        </div>
		    </div>
		</div>
		<!-- breadcrumb end -->
        <!-- grow area start -->
        <div class="grow-area pt-120 pb-90" style="text-align: center">
            <div class="container">
                <!-- <div class="section-title text-center mb-75">
                    <h2>文章标题</h2>
                </div> -->
                <div class="row">
                    <div >
                        <div class="grow-text">
                            
                            <div class="single-grow" style="text-align: center">
                                <h3>{{article.title}}</h3>
                                <p class="destination_details-content" v-html="article.text">
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="col-md-6">
                        <div class="grow-img">
                            <img src="assets/img/banner/grow.jpg" alt="">
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <div class="mt50 commentHtml">
      <div>
        <h6 class="c-c-content c-infor-title" id="i-art-comment">
          <span class="commentTitle">文章评论</span>
        </h6>
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
                <section class="n-reply-wrap">
                  <fieldset>
                    <textarea
                      name=""
                      v-model="comment.content"
                      placeholder="输入您要
评论的文字"
                      id="commentContent"
                    ></textarea>
                  </fieldset>
                  <p class="of mt5 tar pl10 pr10">
                    <span class="fl"
                      ><tt
                        class="c-red commentContentmeg"
                        style="display: none"
                      ></tt
                    ></span>
                    <input
                      type="button"
                      @click="addComment()"
                      value="回复"
                      class="lh-reply-btn"
                    />
                  </p>
                </section>
              </div>
            </li>
          </ul>
        </section>
        <section class="">
          <section class="question-list lh-bj-list pr">
            <ul class="pr10">
              <li v-for="(comment, index) in data.items" v-bind:key="index">
                
                <aside class="noter-pic">
                  <img
                    width="50"
                    height="50"
                    class="picImg"
                    :src="comment.avatar"
                  />
                </aside>
                <div class="of">
                  <span class="fl">
                    <font class="fsize12 c-blue"> {{ comment.nickname }}</font>
                    <font class="fsize12 c-999 ml5">评论：</font></span
                  >
                </div>
                <div class="noter-txt mt5">
                  <p>{{ comment.content }}</p>
                </div>
                <div class="of mt5">
                  <span class="fr"
                    ><font class="fsize12 c-999 ml5">{{
                      comment.gmtCreate
                    }}</font></span
                  >
                </div>
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
</div>
    
        
    
</template>

<script>
import articleApi from "@/api/article"
import comment from "@/api/commonedu";
export default {
    layout: 'hello',
    asyncData({ params, error }) {
        return { articleId: params.id };
    },
    data(){
        return {
            page: 1,
            limit: 4,
            total: 10,
            data:{},
            article:{},
            comment: {
            },
        }
    },
    created(){
        this.initArticle()
        this.initComment()
    },
    methods:{
        initArticle(){
            articleApi.getArticle(this.articleId)
                .then(response => {
                    this.article=response.data.data.article
                })
        },
        initComment() {
            comment
                .getPageList(this.page, this.limit, this.articleId)
                .then((response) => {
                    this.data = response.data.data;
                });
        },
        addComment() {
            this.comment.courseId = this.articleId;
            comment.addComment(this.comment).then((response) => {
                if (response.data.success) {
                this.comment.content = "";
                this.initComment();
                }
                else{
                this.$message({
                        type: 'error',
                        message: response.data.message
                    })
                }
            });
    },
    gotoPage(page) {
      comment.getPageList(page, this.limit, this.articleId).then((response) => {
        this.data = response.data.data;
      });
    },

    }



}
</script>

<style>
.destination_details-content {
	display: inline-block;
	width: 100%;
	margin-top: 35px;
}
.destination_details-content p {
	color: #777;
	font-size: 17px;
	line-height: 28px;
	font-weight: 300;
}
.destination_details-content p:last-of-type {
	color: #444;
	font-weight: 400;
	margin-top: 15px;
}
.destination-details-section .popular-destination2-block .lSSlideOuter .lSPager.lSGallery li::before {
	background-image: none;
}
.breadcrumb-area {
    background-position: center center;
    background-size: cover;
}
.breadcrumb-text > h2 {
    text-align: center;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    margin: 0;
    text-transform: capitalize;
}
.single-grow > h3 {
    font-size: 30px;
    margin-bottom: 15px;
    margin-top: 40px;
}
.single-grow {
    padding-right: 40px;
}
.grow-img {
    padding-left: 40px;
}
.grow-img > img {
    width: 100%;
}
.row {
	margin-right: -15px;
	margin-left: -15px
}
.container {width:900px}
</style>