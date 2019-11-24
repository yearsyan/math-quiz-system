<template>
  <div id="app">
    <div id="index-header">
      <h3 style="margin-left:15px;font-family:PingFang SC;width:80%">数学练习系统</h3>
      <el-link id="about-link" type="info" @click="goAbout">关于</el-link>
    </div>
    <el-divider></el-divider>
    <div id="view-content">
      <router-view></router-view> 
    </div>
  </div>
</template>
<script>

export default {
  name: 'app',
  methods: {
    goAbout() {
      this.$router.push({
        name: "about"
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#view-content {
  width: 1000px;
  margin: auto;
}

#about-link {
  position: absolute;
  right: 30px;
  top: 25px;
}
</style>
