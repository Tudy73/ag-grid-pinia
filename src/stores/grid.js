import { defineStore } from 'pinia'
import {ref} from "vue";

export const useGridStore = defineStore('grid', ()=>{
    const rowData = ref([])
    function addTodo(value){
        rowData.value.push(value);
    }
    return {rowData,addTodo}
})