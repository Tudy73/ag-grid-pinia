<script setup>
import {ref} from 'vue';
import {AgGridVue} from "ag-grid-vue3";
import {useGridStore} from "@/stores/grid.js"
import {storeToRefs} from "pinia";

const gridStore = useGridStore()
const {rowData} = storeToRefs(gridStore)
const newRow = ref("");
const columnDefs = ref([{field: 'todo', editable: true}]);
const defaultColDef = {flex: 1};
function onAddTodo() {
  gridStore.addTodo({ todo: newRow.value });
  rowData.value = [...rowData.value];
  newRow.value = "";
}
async function populateFromAPI(){
  try{
    const response = await fetch("https://dummyjson.com/c/9990-db19-4e7d-8e27")
    const data = await response.json()
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
  <main>
    <input v-model="newRow" placeholder="Add new Todo">
    <button @click="onAddTodo()">Add Todo</button>
    <button @click="populateFromAPI()">Get from API</button>
    <div class="ag-theme-alpine" style="height: 400px; width: 600px;">
      <ag-grid-vue
          style="width: 100%; height: 100%"
          class="ag-theme-alpine"
          :columnDefs="columnDefs"
          :rowData="rowData"
          :defaultColDef="defaultColDef"
      ></ag-grid-vue>
    </div>
  </main>
</template>


<style scoped>
</style>
