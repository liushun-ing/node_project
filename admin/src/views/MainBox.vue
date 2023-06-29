<template>
  <el-container>
    <side-menu-vue />
    <el-container direction="vertical">
      <top-header-vue />
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import TopHeaderVue from '@/components/mainbox/TopHeader.vue';
import SideMenuVue from '@/components/mainbox/SideMenu.vue';
</script>

<style scoped lang="scss">
.el-main {
  overflow: scroll;
  height: calc(100vh - 60px);
}
</style>