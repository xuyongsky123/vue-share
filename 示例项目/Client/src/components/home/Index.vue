<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-main>
      <h1>组件插值：</h1>
      <h3>基本用法：</h3>
      <p>I Accept xxx <a href="/term">Terms of Service Agreement</a></p>
      <p>按之前了解的我们会这样</p>
      <p>{{ $t('lang.link.term') }}<a href="/term">{{ $t('lang.link.tos') }}</a></p>
      <p>注意：非常麻烦，如动态配置添加a标记，那么由于v-html=“$t('lang.link.term')”本地化，可能会导致XSS漏洞。</p>
      <p>使用i18n函数组件可以避免这种情况。例如:</p>
      <p>
        <i18n
          path="lang.link.term"
          tag="label"
          for="tos">
          <a
            :href="url"
            target="_blank">{{ $t('lang.link.tos') }}</a>
        </i18n>
      </p>
      <p>将i18n功能组件的子组件内插到路径支柱的区域设置消息中。如上面的例子</p>
      <h3>高级用法：</h3>
      <i18n
        path="lang.notice.info"
        tag="p">
        <span place="limit">{{ changeLimit }}</span>
        <a
          :href="changeUrl"
          place="action">{{ $t('lang.notice.change') }}</a>
      </i18n>
      <p>如果还想在命名格式中插入文本内容，可以在i18n组件上定义places属性。例如:</p>
      <i18n
        :places="{ limit: refundLimit }"
        path="lang.notice.info"
        tag="p">
        <a
          :href="refundUrl"
          place="action">{{ $t('lang.notice.refund') }}</a>
      </i18n>

      <h1>v-t 可以用于变量的引用，类似于$t：</h1>
      <h3>v-t指令：</h3>
      <p v-t="{ path: path, args: { name: nickName } }"/>
      <p v-t="{ path: 'lang.xxx', locale: 'ja-JP', args: { name: '嘿嘿' } }"/>
      <p v-t="{ path: 'lang.xxx', locale: 'ja-JP', args: { name: nickName } }"/>

      <h1>可传入变量：</h1>
      <h3>命名传入参数：</h3>
      <p>{{ $t('lang.xxx',{name:'你勇哥'}) }}</p>
      <h3>列表传入参数：</h3>
      <p>{{ $t('lang.yyy',['数组元素0','数组元素1','数组元素2']) }}</p>
      <p>{{ $t('lang.yyy',{0:'对象元素0',1:'对象元素1',2:'对象元素2'}) }}</p>

      <h1>复数格式：</h1>
      <h3>使用分隔符 |：</h3>
      <p>{{ $tc('lang.aaa',0) }}</p>
      <p>{{ $tc('lang.aaa',1) }}</p>
      <p>{{ $tc('lang.aaa',2,{count:2}) }}</p>
      <p>{{ $tc('lang.aaa',20,{count:20}) }}</p>

      <h1>时间格式：</h1>
      <p>{{ $d(new Date(), 'short') }}</p>
      <p>{{ $d(new Date(), 'long') }}</p>
      <p>{{ $d(new Date(), 'lang.time', 'short') }}</p>
      <p>{{ $d(new Date(), 'long', 'ja-JP') }}</p>

      <h1>金额符号：</h1>
      <p>{{ $n(100, 'currency') }}</p>
      <p>{{ $n(100, 'currency', 'ja-JP') }}</p>
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
      path: 'lang.xxx',
      url: 'http://...',

      changeUrl: '/change',
      refundUrl: '/refund',
      changeLimit: 15,
      refundLimit: 30
    }
  },
  computed: {
    nickName () {
      return '勇哥哥'
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
    * {
      padding:10px 30px;
    }
    h3 {
      padding-left: 60px;
    }
    p {
      padding-left: 90px;
    }
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
