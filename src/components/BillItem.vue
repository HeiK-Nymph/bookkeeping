<template>
  <div class="item">
    <div :class="item_header">
      {{item.date}}
    </div>
    <div class="item_foot">
      <div class="foot_left">
        {{item.mono}}
      </div>
      <div class="foot_right">
        <div :class="tipCss">
          {{ tip }}
        </div>
        <div class="money">
          {{item.money}}元
        </div>
        <div class="del">
          <el-button circle type="danger" style="font-size:25px" @click="handleDel(item._id)">×</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
  defineOptions({
    name:'BillItem'
  })
  import { computed } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useFormsStore } from '@/stores/forms';

  import axios from 'axios';

  const {fetchDocuments} = useFormsStore()
  const props = defineProps(['item'])
  const item_header = computed(() => {
    if (props.item.kind === "1"){
      return ['item_header1']
    }else{
      return ['item_header2']
    }
  })
  const tip = computed(() => {
    if (props.item.kind === "1"){
      return "支出"
    }else{
      return "收入"
    }
  })
  const tipCss = computed(() => {
    if (props.item.kind === "1"){
      return ['tip1']
    }else{
      return ['tip2']
    }
  })
  async function handleDel(id:string){
    try{
      await axios.post('http://192.168.1.2:3000/del', {id})
      fetchDocuments()
    }catch(error){
      console.error(error)
      ElMessage.error('删除失败，请重试')
    }
  }
</script>

<style scoped>
  .item{
    border: 1px solid red;
    border-radius: 5px;
  }
  .item_header1{
    background-color: hotpink;
    color:darkred;
    padding: 10px;
  }
  .item_header2{
    background-color: greenyellow;
    color:darkred;
    padding: 10px;
  }
  .item_foot{
    padding:20px;
    display: flex;
  }
  .foot_left{
      width:50%
  }
  .foot_right{
    display: flex;
    width:50%;
    justify-content: space-between;
  }
  .tip1{
    border-radius: 5px;
    background-color: orange;
    padding: 1px 8px;
    color: white;
    display: flex;
    align-items: center;
  }
  .tip2{
    border-radius: 5px;
    background-color: green;
    padding: 1px 8px;
    color: white;
    display: flex;
    align-items: center;
  }
  .del{
    visibility: hidden;
    font-weight: bold;
    cursor: pointer;
    font-size: 20px;

  }
  .item_foot:hover .del{
    visibility: visible;
  }
</style>
