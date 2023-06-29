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
        <el-table-column prop="introduction" label="introduction" />
        <el-table-column prop="editTime" label="editTime" width="180">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="operations" width="140">
          <template #default="scope">
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
  </div>
</template>

<script setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue'
import formatTime from '@/util/formatTime'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const tableData = ref([])

onMounted(() => {
  getProductList()
})

const getProductList = async () => {
  const res = await axios.get('/adminapi/product/list')
  if (res.data.code === '0') {
    tableData.value = res.data.data
  } else {
    ElMessage.error('获取列表失败')
  }
}

const confirmDelete = async (user) => {
  const res = await axios.delete(`/adminapi/product/list/${user._id}`)
  if (res.data.code === '0') {
    ElMessage.success('删除成功')
    getProductList()
  } else {
    ElMessage.error('删除失败')
  }
}
const router = useRouter()
const handleEdit = async (product) => {
  router.push(`/product-manage/editproduct/${product._id}`)
}
</script>

<style scoped lang="scss">
.el-table {
  margin-top: 20px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>