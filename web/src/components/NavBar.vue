<template>
  <div class="el-menu-demo">
    <el-menu :default-active="route.fullPath" router mode="horizontal">
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/news">新闻中心</el-menu-item>
      <el-menu-item index="/product">产品与服务</el-menu-item>
      <el-menu-item @click="navToLogin">登录</el-menu-item>
    </el-menu>
    <div class="right">企业门户官网</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()

const navToLogin = () => {
  window.location = 'http://localhost:8080'
}
</script>

<style scoped lang="scss">
.el-menu-demo {
  position: sticky;
  top: 0;
  z-index: 999;
}
.right {
  position: fixed;
  top: 0;
  right: 20px;
  height: 60px;
  line-height: 60px;
  width: 100px;
  text-align: center;
}
</style>