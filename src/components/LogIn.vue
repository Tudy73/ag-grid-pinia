<script setup>
import {ref} from "vue";
import {useUserStore} from "@/stores/UserState.js";
import router from "@/router/index.js";

const userName = ref('');
const password = ref('');

function onLogIn(){
  if(userName.value === "admin" && password.value === "admin"){
    const UserStore = useUserStore()
    UserStore.loggedIn=true;
    router.push('/')
  }
  else{
    alert("wrong username and/or password")
  }
}
</script>

<template>
<form>
  <label for="uname">Username</label>
  <input id="uname" v-model="userName"/>
  <br>
  <label for="pass">Password</label>
  <input id="pass" v-model="password"/>
  <br>
  <button @click.prevent="onLogIn">Log In</button>
</form>
</template>
