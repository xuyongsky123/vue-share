<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  }
}
</script>
<style lang="scss">
  * {
    margin:0;
    padding:0;
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      .el-header , .el-footer {
        padding:0;
      }
    }
  }
  body {
    min-width:1280px;
  }
</style>
