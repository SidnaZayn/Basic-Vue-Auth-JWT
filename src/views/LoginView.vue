<template>
  <main v-if="store.user">Loading...</main>
  <main class="container" id="home" v-else>
    <wc-toast></wc-toast>
    <h5 class="card-title">Login</h5>
    <form @submit.prevent="login(loginForm.username, loginForm.password)">
      <label for="username">Username</label>
      <input
        type="text"
        :class="['form-control', { 'is-invalid': !checkUsername }]"
        placeholder="Username"
        v-model="loginForm.username"
      />
      <label for="password">Password</label>
      <input
        type="password"
        :class="['form-control', { 'is-invalid': !checkPassword }]"
        v-model="loginForm.password"
      />
      <button class="btn mt-3 float-end" type="submit">Login</button>
    </form>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { setLogin } from "../helper/auth";
import apiService from "../app.service";
import { toast } from "wc-toast";

const api = new apiService();
const store = useAuthStore();

const router = useRouter();
const route = useRoute();
let loginForm = ref({
  username: "",
  password: "",
});
const checkUsername = computed(() => {
  return loginForm.value.username;
});

const checkPassword = computed(() => {
  return loginForm.value.password;
});

const login = async (username, password) => {
  if (!username || !password) return false;

  try {
    const response = await api.login({ username, password });
    if (response.success) {
      setLogin(response);
      store.initialize();
      store.getTokenExpDate();
      setInterval(() => {
        store.getCountdown();
      },1000);

      toast("Login success", {
        icon: { type: "custom", content: "🎉" },
        theme: {
          type: "custom",
          style: { background: "#41b883", color: "white" },
        },
      });

      setTimeout(() => {
        router.push({ name: "with-auth" });
      }, 2000);
    }
  } catch (error) {
    toast("❌ Login failed");
    clearForm();
    console.log(error);
  }
};

const clearForm = () => {
  loginForm.value = {
    username: "",
    password: "",
  };
};
</script>
