<script setup>
import {useGridStore} from "@/stores/grid.js";
import {storeToRefs} from "pinia";
import {ref, watch} from "vue";
import {AgGridVue} from "ag-grid-vue3";
import {debounce} from "lodash";
import axios from "axios";
const gridStore = useGridStore()
const {rowData} = storeToRefs(gridStore)
const newRow = ref("");
const columnDefs = ref([{field: 'todo', editable: true}]);
const defaultColDef = {flex: 1};
let chooseAPI = 0;
const API = ["https://dummyjson.com/c/9990-db19-4e7d-8e27","https://dummyjson.com/c/cf48-7088-4d6a-9750"]
function onAddTodo() {
  gridStore.addTodo({ todo: newRow.value,isPublic: (gridStore.rowData.length%2===0)});
  rowData.value = [...rowData.value];
  newRow.value = "";
}
const queueAPIFetch = debounce(()=>{
  if(rowData.value.length===0)
    populateFromAPI()
},700)
watch(newRow,()=>{
  queueAPIFetch();
})

async function populateFromAPI(){
  try{
    const response = await axios.get(API[chooseAPI])
    chooseAPI=1-chooseAPI
    const data = response.data
    gridStore.$patch((state)=>{
      state.rowData = data.concat(state.rowData)
    })
  }
  catch(error){
    console.error("Failed to fetch data: ",error)
  }
}

</script>

<template>
  <input v-model="newRow" placeholder="Add new Todo">
  <button @click="onAddTodo()">Add Todo</button>
  <div class="ag-theme-alpine" style="height: 400px; width: 600px;">
    <ag-grid-vue
        style="width: 100%; height: 100%"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        rowSelection="multiple"
        :rowData="rowData"
        :defaultColDef="defaultColDef"
    ></ag-grid-vue>
  </div>
</template>

<style scoped>

</style>