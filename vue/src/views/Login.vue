
<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" @submit="login">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required=""  v-model="user.email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" required=""  v-model="user.password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
        <div class="flex items-center">
          <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-inset focus:ring-indigo-600" v-model="user.remember_me" />
          <label for="remember_me" class="ml-2 block text-sm font-medium leading-6 text-gray-900">Remember me</label>
      </div>
      <div v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</div>
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      {{ ' ' }}
        <router-link :to="{name:'Register'}" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</router-link>
    </p>
  </div>
</template>
<script setup>
  import {LockClosedIcon} from "@heroicons/vue/16/solid/index.js";
  import store from "../store/index.js";
  import {useRouter} from "vue-router";
  import {ref} from "vue";
  const router = useRouter();
  let errorMsg = ref('');
  const user ={
    email: "",
    password: "",
    remember_me: false

  }
  function login(e){
    e.preventDefault();
    store.dispatch("login", user)
      .then(()=>{
        router.push({name:"Dashboard"});
    }).catch(err=>{
      errorMsg.value = err.response.data.message;
    });
  }
</script>
