<template>
  <div>
    <el-page-header :icon="null" title="用户管理">
      <template #content>
        <span>添加用户</span>
      </template>
    </el-page-header>
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
      <el-form-item label="avatar" prop="avatar">
        <Upload :avatar="userForm.avatar" @handleChange="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">
          addUser
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import upload from '@/util/upload';
import { ElMessage } from 'element-plus';
import Upload from '@/components/upload/Upload'
import { useRouter } from 'vue-router';

const userForm = reactive({
  username: '',
  password: '',
  gender: 0,
  role: 2,
  introduction: '',
  avatar: '',
  file: null
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
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' },
  ],
})

const handleChange = (fileRaw) => {
  userForm.avatar = URL.createObjectURL(fileRaw)
  userForm.file = fileRaw
}

const router = useRouter()
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const data = await upload('/adminapi/user/add', userForm)
      if (data.code === '0') {
        ElMessage.success('添加成功')
        router.push('/user-manage/listuser')
      } else {
        ElMessage.error('添加失败')
      }
    }
  })
}
</script>

<style scoped lang="scss">
.demo-ruleForm {
  margin-top: 50px;
}
</style>