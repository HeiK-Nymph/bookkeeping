import { ref } from "vue";
import { defineStore } from "pinia";
import {getDocuments} from '@/api'

interface FormItem{
  _id:string;
  mono:string;
  date:string;
  kind:string;
  money:number
}

export const useFormsStore = defineStore('forms', () => {
  const forms = ref<FormItem[]>([

  ])
  async function fetchDocuments(){
    try{
      const response = await getDocuments()
      forms.value = response.data.map((item:FormItem) => ({
        _id:item._id,
        mono:item.mono,
        date:item.date,
        kind:item.kind,
        money:item.money
      }))
      console.log('获取数据成功')
      console.log(forms.value)
    }catch(error){
      console.error('获取数据失败', error)
    }
  }
  return {forms, fetchDocuments}
})
