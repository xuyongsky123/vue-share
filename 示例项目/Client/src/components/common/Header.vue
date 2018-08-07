<template>
  <div class="header">
    <div class="header-inner">
      <TopMenu/>
      <!-- <el-menu
        :sync="false"
        :default-active="activeIndex"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        @select="handleSelect">
        <el-menu-item
          v-for="(item,index) in $t('lang.menu')"
          :key="index"
          :index="item.path"
          :route="item.path">{{ item.name }}</el-menu-item>
      </el-menu> -->
      <div class="user-op">
        <div v-if="!loginInfo">
          <router-link
            class="eff"
            to="/login">{{ $t('lang.login') }}</router-link>
          <router-link to="/register">{{ $t('lang.register') }}</router-link>
        </div>
        <el-dropdown
          v-if="loginInfo"
          trigger="click">
          <span class="el-icon-bell">
            {{ $t('lang.welcome') }}，<strong>{{ loginInfo }}</strong>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/myFollow">XXXXXX</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/myMonitor">XXXXXX</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <a @click="logout">{{ $t('lang.logout') }}</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <div>
          <span
            href="javascript:void(0)"
            @click="changeLangEvent">{{ language }}</span>
        </div> -->
        <div>
          <select
            v-model="$i18n.locale"
            name="select">
            <option
              v-for="(lang,i) in langs"
              :key="i"
              :value="lang">{{ lang }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCookie} from '@/assets/tool'
import TopMenu from '@/components/common/Menu'
export default {
  name: 'Header',
  components: {
    TopMenu
  },
  data () {
    return {
      loginInfo: false, // 当前用户登录状态
      activeIndex: '1',
      language: 'English',
      langs: ['zh-CN', 'en-US', 'ja']
    }
  },
  mounted () {
    /* 页面挂载获取cookie，根据username的cookie控制登录相关页面元素 */
    if (getCookie('username')) {
      this.loginInfo = getCookie('username')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {

    },
    changeLangEvent () {
      this.$confirm('确定切换语言吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.$i18n.locale === 'zh-CN') {
          this.$i18n.locale = 'en-US'// 切换成英文
          this.language = '中文'
        } else {
          this.$i18n.locale = 'zh-CN'// 切换成中文
          this.language = 'English'
        }
      }).catch(() => {
        console.log('catch')
        this.$message({
          type: 'info'
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
  $h:60px;  //header、footer容器高

  .header {
    padding:0 140px;
    background-color: #545c64;
    a {
      text-decoration: none;
    }
    .header-inner {
      display: flex;
      justify-content: space-between;
      /deep/ * {
        font-size: 16px;
      }
      .user-op {
        height: $h;
        line-height: $h;
        & > * {
          display: inline-block;
        }
        a.eff::before , a.eff::after {
          display: inline-block;
          opacity: 0;
          font-weight:bold;
          -webkit-transition: -webkit-transform 0.3s, opacity 0.2s;
          -moz-transition: -moz-transform 0.3s, opacity 0.2s;
          transition: transform 0.3s, opacity 0.2s;
        }
        a.eff:hover::before , a.eff:hover::after , a.eff:focus::before , a.eff:focus::after{
          opacity: 1;
          -webkit-transform: translateX(0px);
          -moz-transform: translateX(0px);
          transform: translateX(0px);
        }
        a.eff::before {
          content:'[';
          margin-right:7px;
          -webkit-transform: translateX(10px);
          -moz-transform: translateX(10px);
          transform: translateX(10px);
        }
        a.eff::after {
          content: ']';
          margin-left: 7px;
          -webkit-transform: translateX(-10px);
          -moz-transform: translateX(-10px);
          transform: translateX(-10px);
        }
        strong {
          font-size: 14px;
        }
        span {
          color:#fff;
          margin-left:20px;
          font-size: 14px;
          cursor: pointer;
        }
        a {
          @extend span;
          &:last-child {
            border:1px solid #E6A23C;
            border-radius: 25px;
            height: 34px;
            line-height: 34px;
            display: inline-block;
            padding:0 25px;
            transition: all 0.3s;
          }
          &:last-child:hover {
            border-color:rgb(255, 208, 75);
          }
          &:active {
            color:rgb(255, 208, 75);
          }
        }
      }
    }
  }
  .el-dropdown-menu__item a {
    color: #909399;
    text-decoration: none;
  }
</style>
