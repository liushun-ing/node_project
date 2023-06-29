<template>
  <div>
    <el-page-header :icon="null" title="企业门户管理系统">
      <template #content>
        <span>首页</span>
      </template>
    </el-page-header>
    <el-card>
      <el-row>
        <el-col :span="4"><el-avatar :size="100" :src="avatarUrl" /></el-col>
        <el-col :span="20" style="line-height: 100px;">
          <h3>欢迎回来 {{ store.state.userInfo.username }}, {{ welcomeText }} </h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <template #header>
        <div>
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel v-if="productList.length > 0" :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in productList" :key="item._id">
          <div :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
            backgroundSize: '100% 100%'
          }">
            <h3 text="2xl" justify="center">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios';

const store = useStore()
const avatarUrl = computed(() => {
  return store.state.userInfo.avatar ? `http://localhost:3000${store.state.userInfo.avatar}` : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
})

const welcomeText = computed(() => {
  return new Date().getHours() < 12 ? '要开心每一天!' : '喝杯咖啡提提神吧!'
})

onMounted(() => {
  getProductList()
})
const productList = ref([])
const getProductList = async () => {
  const res = await axios.get('/adminapi/product/list')
  if (res.data.code === '0') {
    productList.value = res.data.data
  } else {
    ElMessage.error('获取产品列表失败')
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 20px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>