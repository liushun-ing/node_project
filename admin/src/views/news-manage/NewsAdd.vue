<template>
  <div>
    <el-page-header :icon="null" title="新闻管理">
      <template #content>
        <span>创建新闻</span>
      </template>
    </el-page-header>
    <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="90px" class="demo-ruleForm"
      status-icon>
      <el-form-item label="title" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="content" prop="content">
        <Editor :content="newsForm.content" @changeContent="changeContent" />
      </el-form-item>
      <el-form-item label="category" prop="category">
        <el-select v-model="newsForm.category" placeholder="请选择类别">
          <el-option label="最新动态" :value="1" />
          <el-option label="典型案例" :value="2" />
          <el-option label="通知公告" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="cover" prop="cover">
        <Upload :avatar="newsForm.cover" @handleChange="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">
          addnews
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
import Editor from '@/components/editor/Editor'
import { useRouter } from 'vue-router';

const newsForm = reactive({
  title: '',
  content: '',
  category: 1,// 1最新动态2典型案例3通知公告
  cover: '',
  file: null,
  isPublish: 0
})
const newsFormRef = ref()
const newsFormRules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  category: [
    { required: true, message: '请选择类别', trigger: 'blur' },
  ],
  cover: [
    { required: true, message: '请上传封面图片', trigger: 'blur' },
  ],
})

const changeContent = (value) => {
  newsForm.content = value
}

const handleChange = (fileRaw) => {
  newsForm.cover = URL.createObjectURL(fileRaw)
  newsForm.file = fileRaw
}

const router = useRouter()
const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      const data = await upload('/adminapi/news/add', newsForm)
      if (data.code === '0') {
        ElMessage.success('添加成功')
        router.push('/news-manage/listnews')
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