<template>
  <div class="home">
    <h1>
      记账本
    </h1>
    <div class="jump">
      <RouterLink to="/edit" class="bto">去添加一笔新账</RouterLink>
    </div>
    <hr>
    <BillItem class="bill_item" v-for="item in forms" :key="item._id" :item="item"/>
  </div>
</template>

<script setup lang='ts'>
  defineOptions({
    name:'HomeView'
  })
  import BillItem from '@/components/BillItem.vue';
  import { RouterLink } from 'vue-router';
  import { useFormsStore } from '@/stores/forms';
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  const {forms} = storeToRefs(useFormsStore())
  const {fetchDocuments} = useFormsStore()
  onMounted(() => {
    fetchDocuments()
    console.log('测试1')
  })
</script>

<style scoped>
  .home{
    margin-top: 30px;
    width:50%;
    margin-left: auto;
    margin-right: auto;
  }
  .bill_item{
    margin-top: 20px;
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
</style>
