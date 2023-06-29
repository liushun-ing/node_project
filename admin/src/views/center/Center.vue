<template>
  <div>
    <el-page-header :icon="null" title="企业门户管理系统">
      <template #content>
        <span>个人中心</span>
      </template>
    </el-page-header>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="user-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ store.state.userInfo.username }}</h3>
          <h5>{{ store.state.userInfo.role === 1 ? '管理员' : '编辑' }}</h5>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div>
              <span>个人信息</span>
            </div>
          </template>
          <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="90px" class="demo-ruleForm"
            status-icon>
            <el-form-item label="username" prop="username">
              <el-input v-model="userForm.username" />
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
            <el-form-item label="avatar" prop="avatar">
              <Upload :avatar="userForm.avatar" @handleChange="handleChange" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">
                update
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import upload from '@/util/upload';
import { ElMessage } from 'element-plus';
import Upload from '@/components/upload/Upload'

const store = useStore()
const avatarUrl = computed(() => {
  return store.state.userInfo.avatar ? `http://localhost:3000${store.state.userInfo.avatar}` : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
})

const { username, gender, introduction, avatar } = store.state.userInfo
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null
})
const userFormRef = ref()
const userFormRules = reactive({
  username: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入简介', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' },
  ],
})

const handleChange = (fileRaw) => {
  userForm.avatar = URL.createObjectURL(fileRaw)
  userForm.file = fileRaw
}

const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const data = await upload('/adminapi/user/upload', userForm)
      if (data.code === '0') {
        store.commit('changeUserInfo', data.data)
        ElMessage.success('更新成功')
      } else {
        ElMessage.error('更新失败')
      }
    }
  })
}
</script>

<style scoped lang="scss">
.el-row {
  margin-top: 20px;

  .user-card {
    text-align: center;
  }
}
</style>