<template>
  <div class="container">
    <div class="news-header" :style="{
      backgroundImage: `url(${require('@/assets/newsbg.jpg')})`
    }">
    </div>
    <h1>新闻资讯</h1>
    <div class="tip">为您推荐公司及行业的前沿资讯, 让您随时了解行业动态!</div>
    <div class="search">
      <el-popover placement="bottom" :show-arrow="false" title="检索结果" width="50%" :visible="searchVisible">
        <template #reference>
          <el-input v-model="inputKey" :prefix-icon="Search" placeholder="请输入新闻关键字" size="large" clearable
            @input="searchVisible = true" @blur="searchVisible = false" />
        </template>
        <div v-if="searchNewsList.length === 0">
          <el-empty description="暂无新闻" :image-size="40"></el-empty>
        </div>
        <div v-else>
          <div v-for="item in searchNewsList" class="search-item" @click="handleChangePage(item._id)">{{ item.title }}
          </div>
        </div>
      </el-popover>
    </div>
    <div class="top-news">
      <el-row :gutter="20">
        <el-col v-for="item in topNewsList" :span="6" :key="item._id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(item._id)">
            <div class="image" :style="{
              backgroundImage: `url(http://localhost:3000${item.cover})`
            }"></div>
            <div style="padding: 14px">
              <div class="top-head">
                <span>{{ item.title }}</span>
                <el-tag v-if="item.category === 1" type="success">最新动态</el-tag>
                <el-tag v-else-if="item.category === 2">典型案例</el-tag>
                <el-tag v-else-if="item.category === 3" type="warning">通知公告</el-tag>
                <el-tag v-else type="info">未知</el-tag>
              </div>
              <div class="bottom">
                <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="category-news">
      <el-tabs v-model="whichTab">
        <el-tab-pane label="最新动态" :name="1">
          <el-row :gutter="20">
            <el-col :span="18">
              <div v-for="item in tabNewsList[1]" :key="item._id" style="padding: 10px;">
                <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(item._id)">
                  <div class="image" :style="{
                    backgroundImage: `url(http://localhost:3000${item.cover})`
                  }"></div>
                  <div style="padding: 14px; float: left;">
                    <span>{{ item.title }}</span>
                    <div class="bottom">
                      <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="6">
              <el-timeline>
                <el-timeline-item v-for="news in tabNewsList[1]" :key="news._id"
                  :timestamp="formatTime.getTime(news.editTime)">
                  {{ news.title }}
                </el-timeline-item>
              </el-timeline>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="典型案例" :name="2">
          <el-row :gutter="20">
            <el-col :span="18">
              <div v-for="item in tabNewsList[2]" :key="item._id" style="padding: 10px;">
                <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(item._id)">
                  <div class="image" :style="{
                    backgroundImage: `url(http://localhost:3000${item.cover})`
                  }"></div>
                  <div style="padding: 14px; float: left;">
                    <span>{{ item.title }}</span>
                    <div class="bottom">
                      <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="6">
              <el-timeline>
                <el-timeline-item v-for="news in tabNewsList[2]" :key="news._id"
                  :timestamp="formatTime.getTime(news.editTime)">
                  {{ news.title }}
                </el-timeline-item>
              </el-timeline>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="通知公告" :name="3">
          <el-row :gutter="20">
            <el-col :span="18">
              <div v-for="item in tabNewsList[3]" :key="item._id" style="padding: 10px;">
                <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(item._id)">
                  <div class="image" :style="{
                    backgroundImage: `url(http://localhost:3000${item.cover})`
                  }"></div>
                  <div style="padding: 14px; float: left;">
                    <span>{{ item.title }}</span>
                    <div class="bottom">
                      <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="6">
              <el-timeline>
                <el-timeline-item v-for="news in tabNewsList[3]" :key="news._id"
                  :timestamp="formatTime.getTime(news.editTime)">
                  {{ news.title }}
                </el-timeline-item>
              </el-timeline>
            </el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>
    </div>
    <el-backtop :right="100" :bottom="100" :visibility-height="100" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';
import formatTime from '@/util/formatTime'
import _ from 'lodash'
import { useRouter } from 'vue-router';

const inputKey = ref('')
const searchVisible = ref(false)

onMounted(() => {
  getNewsList()
})
const newsList = ref([])
const getNewsList = async () => {
  const res = await axios.get('/webapi/news/list')
  if (res.data.code === '0') {
    newsList.value = res.data.data
  } else {
    ElMessage.error('获取新闻列表失败')
  }
}

const searchNewsList = computed(() => {
  return newsList.value.filter((item) => {
    return inputKey.value && item.title.includes(inputKey.value)
  })
})

const topNewsList = computed(() => {
  return newsList.value.slice(0, 4)
})

const whichTab = ref(1)
const tabNewsList = computed(() => {
  return _.groupBy(newsList.value, item => item.category)
})

const router = useRouter()
const handleChangePage = (_id) => {
  router.push(`/news/${_id}`)
}
</script>

<style scoped lang="scss">
.container {
  position: relative;

  .news-header {
    width: 100%;
    height: 300px;
    background-size: cover;
  }

  h1 {
    position: absolute;
    top: 20px;
    left: 50%;
    color: white;
    transform: translate(-50%, 0);
    height: 120px;
    font-size: 60px;
  }

  .tip {
    position: absolute;
    top: 140px;
    left: 0;
    width: 100%;
    text-align: center;
    color: white;
    height: 80px;
    font-size: 30px;
    font-family: 'Courier New', Courier, monospace;
  }

  .search {
    position: absolute;
    top: 220px;
    width: 100%;
    text-align: center;

    .el-input {
      width: 40%;
    }
  }

  .top-news {
    margin: 20px;

    .image {
      width: 100%;
      height: 150px;
      background-size: 100% 100%;
    }

    .top-head {
      display: flex;
      align-items: center;

      span {
        margin-right: 5px;
      }
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .time {
      font-size: 13px;
      color: #999;
    }
  }

  .category-news {
    margin: 20px;

    .image {
      width: 150px;
      height: 100px;
      background-size: 100% 100%;
      float: left;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .time {
      font-size: 13px;
      color: #999;
    }
  }
}

.search-item {
  height: 36px;
  line-height: 36px;
  border-radius: 10px;

  &:hover {
    color: #409EFF;
    background-color: #ecf5ff;
    cursor: pointer;
  }
}
</style>