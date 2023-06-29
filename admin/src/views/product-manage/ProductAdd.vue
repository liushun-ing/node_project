<template>
  <div>
    <el-page-header :icon="null" title="产品管理">
      <template #content>
        <span>新建产品</span>
      </template>
    </el-page-header>
    <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="90px" class="demo-ruleForm"
      status-icon>
      <el-form-item label="title" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>
      <el-form-item label="introduction" prop="introduction">
        <el-input placehold="请输入简介" v-model="productForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="detail" prop="detail">
        <el-input placehold="请输入详细描述" v-model="productForm.detail" type="textarea" />
      </el-form-item>
      <el-form-item label="cover" prop="cover">
        <Upload :avatar="productForm.cover" @handleChange="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">
          addproduct
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

const productForm = reactive({
  title: '',
  introduction: '',
  detail: '',
  cover: '',
  file: null,
})
const productFormRef = ref()
const productFormRules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入产品简介', trigger: 'blur' },
  ],
  detail: [
    { required: true, message: '请输入详细描述', trigger: 'blur' },
  ],
  cover: [
    { required: true, message: '请上传图片', trigger: 'blur' },
  ],
})

const handleChange = (fileRaw) => {
  productForm.cover = URL.createObjectURL(fileRaw)
  productForm.file = fileRaw
}

const router = useRouter()
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      const data = await upload('/adminapi/product/add', productForm)
      if (data.code === '0') {
        ElMessage.success('添加成功')
        router.push('/product-manage/listproduct')
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