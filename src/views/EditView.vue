<template>
  <div class="edit">
    <h1>
      添加记录
    </h1>
    <div class="jump">
      <RouterLink to="/" class="bto">返回首页</RouterLink>
    </div>
    <hr>
    <el-form @submit.prevent="handleAdd">
      <el-form-item>
        <span class="tips">事项</span>
        <el-input v-model="form.mono" name="mono" clearable size="large"/>
      </el-form-item>
      <el-form-item class="form_item">
        <span class="tips">发生时间</span>
        <div>
          <el-date-picker v-model="form.date" type="date" placeholder="请选择时间" value-format="YYYY-MM-DD" size="large"/>
        </div>
      </el-form-item>
      <el-form-item>
        <span class="tips">类型</span>
        <el-select v-model="form.kind" placeholder="请选择">
          <el-option label="支出" value="1"/>
          <el-option label="收入" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item class="form_item">
        <span class="tips">金额</span>
        <div>
          <el-input-number v-model="form.money" name="money" size="large" :controls="false" style="width:100%" class="left-align-input-number"/>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="width: 100%;">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
  defineOptions({
    name:'EditView'
  })
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';

  const router = useRouter()

  interface FormData{
    mono:string;
    date:string;
    kind:string;
    money?:number;
  }
  const form = ref<FormData>({
    mono:"",
    date:"",
    kind:"1",
    money:undefined,
  })
  async function handleAdd(){
    if (form.value.mono === "" || form.value.date === "" || form.value.money === undefined){
      ElMessage.warning('信息不完整')
      return
    }
    try{
      await axios.post('http://192.168.1.2:3000/add', form.value)
      router.push('/')
    }catch(error){
      console.error(error)
      ElMessage.error('添加失败，请重试')
    }
  }
</script>

<style scoped>
  .edit{
    margin-top: 30px;
    width:50%;
    margin-left: auto;
    margin-right: auto;
  }
  .jump{
    display: flex;
    justify-content: flex-end;
  }
  .bto{
    background-color: skyblue;
    text-decoration: none;
    color: white;
    border-radius: 5px;
    padding:2px 5px;
  }
  .tips{
    font-size: 20px;
  }
  .form_item :deep(.el-form-item__content){
    display: block;
  }
  :deep(.left-align-input-number .el-input__inner) {
    text-align: left !important;
  }
</style>
