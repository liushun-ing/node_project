<template>
  <div>
    <el-card>
      <el-page-header :icon="null" title="新闻管理">
        <template #content>
          <span>新闻列表</span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="title" />
        <el-table-column label="cover" width="120">
          <template #default="scope">
            <el-avatar v-if="scope.row.cover" :size="50" :src="'http://localhost:3000' + scope.row.cover" />
            <el-avatar v-else src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </template>
        </el-table-column>
        <el-table-column label="category" width="120">
          <template #default="scope">
            <el-tag v-if="scope.row.category === 1" type="success">最新动态</el-tag>
            <el-tag v-else-if="scope.row.category === 2">典型案例</el-tag>
            <el-tag v-else-if="scope.row.category === 3" type="warning">通知公告</el-tag>
            <el-tag v-else type="info">未知</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="editTime" label="editTime" width="180">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="isPublish" width="100">
          <template #default="scope">
            <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
              @change="changePublish(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="operations" width="140">
          <template #default="scope">
            <el-button size="small" circle :icon="Star" type="success" @click="handlePreview(scope.row)" />
            <el-button size="small" circle :icon="Edit" @click="handleEdit(scope.row)" />
            <el-popconfirm title="Are you sure to delete this?" @confirm="confirmDelete(scope.row)">
              <template #reference>
                <el-button size="small" circle :icon="Delete" type="danger" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="previewVisible" title="预览新闻" width="50%">
      <div>
        <h2>{{ previewData.title }}</h2>
        <div style="font-size: 12px;color: gray;">{{ formatTime.getTime(previewData.editTime) }}</div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="previewData.content" class="html-content"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref, onMounted, reactive } from 'vue'
import formatTime from '@/util/formatTime'
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const tableData = ref([])

onMounted(() => {
  getNewsList()
})

const getNewsList = async () => {
  const res = await axios.get('/adminapi/news/list')
  if (res.data.code === '0') {
    tableData.value = res.data.data
  } else {
    ElMessage.error('获取列表失败')
  }
}

const changePublish = async (news) => {
  const res = await axios.put('/adminapi/news/publish', {
    _id: news._id,
    isPublish: news.isPublish
  })
  if (res.data.code !== '0') {
    ElMessage.error('改变发布状态失败')
    tableData.value.find(item => item._id === news._id).isPublish === !news.isPublish
  }
}

const previewData = ref({})
const previewVisible = ref(false)
const handlePreview = (news) => {
  previewData.value = news
  previewVisible.value = true
}

const confirmDelete = async (user) => {
  const res = await axios.delete(`/adminapi/news/list/${user._id}`)
  if (res.data.code === '0') {
    ElMessage.success('删除成功')
    getNewsList()
  } else {
    ElMessage.error('删除失败')
  }
}
const router = useRouter()
const handleEdit = async (news) => {
  router.push(`/news-manage/editnews/${news._id}`)
}
</script>

<style scoped lang="scss">
.el-table {
  margin-top: 20px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

::v-deep .html-content {
  img {
    max-width: 100%;
  }
}
</style>