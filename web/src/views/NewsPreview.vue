<template>
  <div>
    <el-row>
      <el-col :span="17" :offset="1">
        <div>
          <h1>{{ news.title }}</h1>
          <div>{{ formatTime.getTime(news.editTime) }}</div>
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <div v-html="news.content"></div>
        </div>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span style="font-size: 16px; font-weight: bold;">最近新闻</span>
            </div>
          </template>
          <div v-for="news in topNewsList" :key="news._id" style="margin-bottom: 20px;"
            @click="handleChangeNews(news._id)">
            <span>{{ news.title }}</span>
            <div class="bottom">
              <time class="time">{{ formatTime.getTime(news.editTime) }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watchEffect } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';
import formatTime from '@/util/formatTime'
import { StarFilled } from '@element-plus/icons-vue'

const news = ref({})
const topNewsList = ref([])
const route = useRoute()
watchEffect(async () => {
  if (!route.params.id) return
  const res = await axios.get(`/webapi/news/list/${route.params.id}`)
  const res1 = await axios.get(`/webapi/news/toplist?limit=4`)
  if (res.data.code === '0') {
    news.value = res.data.data[0]
  } else {
    ElMessage.error('获取新闻详情失败')
  }
  if (res1.data.code === '0') {
    topNewsList.value = res1.data.data
  } else {
    ElMessage.error('获取新闻详情失败')
  }
})
onBeforeUnmount(() => {
  stop()
})
const router = useRouter()
const handleChangeNews = (id) => {
  router.replace(`/news/${id}`)
}
</script>

<style scoped lang="scss">
.el-row {
  margin-top: 30px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  font-size: 13px;
  color: #999;
}
</style>