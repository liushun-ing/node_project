<template>
  <div>
    <el-card>
      <el-page-header :icon="null" title="用户管理">
        <template #content>
          <span>用户列表</span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="username" width="180" />
        <el-table-column label="avatar" width="180">
          <template #default="scope">
            <el-avatar v-if="scope.row.avatar" :size="50" :src="'http://localhost:3000' + scope.row.avatar" />
            <el-avatar v-else src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </template>
        </el-table-column>
        <el-table-column prop="introduction" label="introduction" width="180" />
        <el-table-column label="gender" width="180">
          <template #default="scope">
            <el-tag v-if="scope.row.gender === 0" type="info">保密</el-tag>
            <el-tag v-else-if="scope.row.gender === 1">男</el-tag>
            <el-tag v-else-if="scope.row.gender" type="error">女</el-tag>
            <el-tag v-else type="warning">未知</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="role">
          <template #default="scope">
            <el-tag v-if="scope.row.role === 1" type="success" effect="dark">管理员</el-tag>
            <el-tag v-else-if="scope.row.role === 2" type="danger" effect="dark">编辑</el-tag>
            <el-tag v-else type="warning" effect="dark">未知</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="operations" width="140">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
            <el-popconfirm title="Are you sure to delete this?" @confirm="confirmDelete(scope.row)">
              <template #reference>
                <el-button size="small" type="danger">Delete</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="编辑" width="50%" :before-close="handleClose">
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="90px" class="demo-ruleForm"
        status-icon>
        <el-form-item label="username" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="userForm.password" type="password" />
        </el-form-item>
        <el-form-item label="role" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="管理员" :value="1" />
            <el-option label="编辑" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="gender" prop="gender">
          <el-select v-model="userForm.gender" placeholder="请选择性别">
            <el-option label="保密" :value="0" />
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="introduction" prop="introduction">
          <el-input placehold="请输入简介" v-model="userForm.introduction" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirmEdit">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref, onMounted, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

const tableData = ref([])

onMounted(() => {
  getUserList()
})

const getUserList = async () => {
  const res = await axios.get('/adminapi/user/list')
  if (res.data.code === '0') {
    tableData.value = res.data.data
  } else {
    ElMessage.error('获取列表失败')
  }
}

const confirmDelete = async (user) => {
  const res = await axios.delete(`/adminapi/user/list/${user._id}`)
  if (res.data.code === '0') {
    ElMessage.success('删除成功')
    getUserList()
  } else {
    ElMessage.error('删除失败')
  }
}

const userForm = reactive({
  _id: '',
  username: '',
  gender: 0,
  role: 2,
  introduction: '',
  password: ''
})
const userFormRef = ref()
const userFormRules = reactive({
  username: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入简介', trigger: 'blur' },
  ],
})
const dialogVisible = ref(false)
const handleEdit = async (user) => {
  dialogVisible.value = true
  const res = await axios.get(`/adminapi/user/list/${user._id}`)
  if (res.data.code === '0') {
    Object.assign(userForm, { ...res.data.data[0] })
  } else {
    ElMessage.error('获取个人信息失败')
  }
  // for (const key in userForm) {
  //   userForm[key] = user[key]
  // }
}
const handleConfirmEdit = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await axios.put(`/adminapi/user/list/${userForm._id}`, userForm)
      if (res.data.code === '0') {
        dialogVisible.value = false
        ElMessage.success('保存成功')
        getUserList()
      } else {
        ElMessage.error('保存失败，网络异常或信息未改变')
      }
    }
  })
}
const handleClose = (done) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
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