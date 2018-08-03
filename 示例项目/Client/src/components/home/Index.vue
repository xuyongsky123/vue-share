<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-main>
      <el-carousel
        :interval="5000"
        class="carousel-one">
        <el-carousel-item
          v-for="(item,index) in topData"
          :key="index">
          <h1>{{ item.title }}</h1>
          <p>{{ item.content }}</p>
        </el-carousel-item>
      </el-carousel>
      <el-carousel
        :interval="3000"
        class="carousel-two"
        type="card"
        height="300px">
        <el-carousel-item
          v-for="item in 6"
          :key="item">
          <p style="padding:24px;">我是小卡片{{ item }}，内容由你而定～</p>
        </el-carousel-item>
      </el-carousel>
    </el-main>
    <el-footer>
      <Footer/>
    </el-footer>
  </el-container>
</template>
<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
export default {
  name: 'Index',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      topData: [
        {
          title: '我是抬头标题哦～',
          content: '我只是一个一个骨架哦，具体什么内容需要你来告诉我哦～'
        },
        {
          title: '我是一首歌哦～',
          content: '我是一只小小鸟～'
        },
        {
          title: '我是一首诗哦～',
          content: '人生得意须尽欢，莫使金樽空对月～'
        }
      ]
    }
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
  $w:1280px;  //定宽宽度
  $mb:50px; //轮播下边距

  .el-main {
    padding:0;
    .el-carousel {
      margin-bottom:$mb;
    }
    .carousel-one {
      background: url(../../../static/home/4.jpg) no-repeat top center;
      h1 {
        position: absolute;
        top:100px;
        left:100px;
        z-index: 10001;
        color: #fff;
      }
      p {
        @extend h1;
        top: 150px;
      }
      /deep/ .el-carousel__container {
        height: 500px;
        .el-carousel__item:nth-child(2n) {
          background-color: rgba(14,145,122,.2);
        }
        .el-carousel__item:nth-child(2n+1) {
          background-color: rgba(145,14,14,.2);
        }
      }
    }
    .carousel-two {
      width:$w;
      margin:0 auto $mb;
      /deep/ .el-carousel__container {
        .el-carousel__item:nth-child(2n) {
          background-color: rgba(17,14,145,.2);
        }
        .el-carousel__item:nth-child(2n+1) {
          background-color: rgba(145,14,145,.2);
        }
      }
    }
  }
</style>
