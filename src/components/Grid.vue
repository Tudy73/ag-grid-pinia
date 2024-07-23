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
  gridStore.addTodo({ todo: newRow.value });
  rowData.value = [...rowData.value];
  newRow.value = "";
}
const queueAPIFetch = debounce(()=>{
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
      state.rowData = data
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
        :rowData="rowData"
        :defaultColDef="defaultColDef"
    ></ag-grid-vue>
  </div>
</template>

<style scoped>

</style>