<script setup>

import router from "@/router/index.js";
import {ref} from "vue";
const todo = ref('')
function goToTodo(){
  router.push(`/todo/${todo.value}`)
}

</script>

<template>
  <input v-model="todo">
  <button @click="goToTodo">Navigate To Todo</button>
</template>

<style scoped>

</style>