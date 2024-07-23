<script setup>
import {useGridStore} from "@/stores/grid.js";

const gridStore = useGridStore()
async function populateFromAPI(){
  try{
    const response = await fetch("https://dummyjson.com/c/9990-db19-4e7d-8e27")
    const data = await response.json()
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
  <button @click="populateFromAPI()">Fetch from API</button>
</template>

<style scoped>

</style>