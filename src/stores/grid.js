import { defineStore } from 'pinia'
import {ref} from "vue";

export const useGridStore = defineStore('grid', ()=>{
    const rowData = ref([])
    function addTodo(value){
        rowData.value.push(value);
    }
    function isPublic(name){
        if(!exists(name))return false;
        return rowData.value.filter(x => x.isPublic && x.todo === name).length > 0
    }
    function exists(name){
        return rowData.value.filter(x => x.todo === name).length > 0
    }
    return {rowData,addTodo,isPublic,exists}
})