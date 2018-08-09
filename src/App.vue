<template>
  <div id="app">
    <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="/ai">
        <template slot="title">AI接口</template>
        <el-menu-item index="/ai/ocr">OCR</el-menu-item>
      </el-submenu>
      <el-menu-item index=""><a href="http://moonrailgun.com" target="_blank">我的博客</a></el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: this.$route.path || '/'
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Helvetica Neue, Helvetica ,PingFang SC ,Hiragino Sans GB ,Microsoft YaHei ,SimSun ,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
