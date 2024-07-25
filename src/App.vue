<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
import {useUserStore} from "@/stores/UserState.js";
import {useRoute} from "vue-router";

const lastActivity = ref(Date.now());
const userStore = useUserStore()
const route = useRoute();
function onUserAction(){
  lastActivity.value = Date.now();
}
function checkInactivity(){
  if(Date.now() - lastActivity.value >=5000){
    if(route.path === '/login'){
      return;
    }
    alert("Logged out")
    userStore.loggedIn = false;
    router.push('/login')
  }
}

setInterval(checkInactivity,1000)

</script>

<template>
  <main @mousemove = onUserAction @input="onUserAction">
    <nav>
      <RouterLink to="/login">Go to LogIn</RouterLink>
      <RouterLink to="/">Go to Todo list</RouterLink>
      <RouterLink to="/api">Go to API</RouterLink>
    </nav>
    <RouterView/>
  </main>
</template>

<style scoped>

</style>
