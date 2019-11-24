<template>
  <div class="about-root">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">练习</el-breadcrumb-item>
      <el-breadcrumb-item>关于</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>关于</h2>  
    <div class="about-content">
      <p>本项目是weNEU(since 2018)与UUIA项目的衍生的非盈利项目,出于方便学生刷题之便利开发.本题库来自于<a href="http://mathe.neu.edu.cn">东北大学大数学学习系统</a>,如有侵权请告知</p>
      <p>本题库面向用户为东北大学学生开发,但欢迎任何人使用</p>
    </div>
    <h2>项目技术</h2>
    <div class="about-content">
      <ul>
        <li>静态资源部署于阿里云OSS,并使用CDN分发</li>
        <li>后端服务部署于阿里云轻量服务器,使用阿里云全站CDN进行加速与防护</li>
        <li>前端使用Vue-cli开发并使用了ElementUI框架,前端对后端的请求使用axios完成</li>
        <li>后端服务器使用SpringBoot开发并使用Nginx反向代理,数据存储于Mysql</li>
      </ul>
    </div>
    <h2>用户条款</h2>
    <div class="about-content">
      <p>出于开发者对美好生活之向往,构建富强民主文明和谐的社会主义现代化国际,特编写此协议以规范开发者与用户之权利与责任.</p>
      <ol>
        <li>用户不应出于任何目的对题库任何服务进行攻击,包括但不限于DDOS,CC攻击,SSH爆破.</li>
        <li>用户不应对项目相关开发者/开发组进行恶意诋毁与人身攻击</li>
        <li>开发者不会以任何名义收集用户公民信息,学生信息,用户位置</li>
        <li>开发者除记录IP地址,请求记录等基本日志外,不会保存任何设备信息包括但不限于JS指纹、IMEI、MAC地址</li>
        <li>本题库部署与中华人民共和国境内,遵守中华人民共和国法律.如公安部门要求配合调查,本站开发者、所有人将无条件配合.</li>
        <li>用户应自觉遵守所在国家相关法律规定.不应利用本站进行的违法活动</li>
        <li>本站允许第三方开发者利用本站接口开发自己的应用、网站,但对于用于日活超过1000的项目,其项目负责人应告知本站</li>
        <li>本站开发者不会利用用户的计算资源、网络资源从事任何非法活动</li>
      </ol>
    </div>
    <h2>联系方式</h2>
    <div class="about-content">
      <p>(+852)57001701 仅限短信</p>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      backHome() {
        this.$router.push({
          name: "choose"
        });
      }
    },
    data() {
      return {
      }
    }
  };
</script>


<style>
.about-content {
  margin: 10px;
}

p {
  font-family: "Hiragino Sans GB"
}
</style>
