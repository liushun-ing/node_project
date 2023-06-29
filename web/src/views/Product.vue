<template>
  <el-carousel height="calc(100vh - 60px)" v-if="loopList.length" direction="vertical">
    <el-carousel-item v-for="item in loopList" :key="item._id">
      <div class="image" :style="{
        backgroundImage: `url(http://localhost:3000${item.cover})`
      }">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <h2>{{ item.title }}</h2>
            </div>
          </template>
          <el-text size="large" type="success">{{ item.title }}</el-text>
          <div class="detail">{{ item.detail }}</div>
          <div style="margin-top: 20px;">
            <time class="time">发布时间：{{ formatTime.getTime(item.editTime) }}</time>
          </div>
        </el-card>
      </div>
    </el-carousel-item>
  </el-carousel>
  <el-empty v-else description="暂无产品"></el-empty>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'
import { ElMessage } from 'element-plus';
import formatTime from '@/util/formatTime'

onMounted(() => {
  getProductList()
})
const loopList = ref([])
const getProductList = async () => {
  const res = await axios.get('/webapi/product/list')
  if (res.data.code === '0') {
    loopList.value = res.data.data
  } else {
    ElMessage.error('获取列表失败')
  }
}
</script>

<style scoped lang="scss">
.image {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}

.box-card {
  width: 50%;
  height: 100%;
  background-color: rgba($color: #ffffff, $alpha: 0.7);

  .detail {
    margin-top: 20px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }
}
</style>