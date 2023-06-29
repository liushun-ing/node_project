<template>
  <el-header>
    <div class="left">
      <el-icon @click="changeSideBar">
        <Menu />
      </el-icon>
      <span style="margin-left: 10px;">企业门户管理系统</span>
    </div>
    <div class="right">
      <span style="margin-right: 10px;">欢迎 {{ store.state.userInfo.username }} 回来</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="24" color="white">
            <User />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleToUser">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { useStore } from 'vuex';
import { Menu, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const changeSideBar = () => {
  store.commit("changeCollapsed")
}

const handleToUser = () => {
  router.push('/center')
}

const handleLogout = () => {
  localStorage.removeItem('token')
  store.commit('clearUserInfo')
  router.push('/login')
}
</script>

<style scoped lang="scss">
.el-header {
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left,
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.el-dropdown-link {
  cursor: pointer;
}
</style>