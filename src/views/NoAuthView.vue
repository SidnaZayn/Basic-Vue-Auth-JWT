<template>
  <div class="about text-center">
    <h1>Cheat Sheet Page</h1>
    <div class="d-block" v-if="store.isAdmin">
      <ul>
        <span>ADMIN</span>
        <li>username: admin</li>
        <li>password: admin112233</li>
        <span>USER</span>
        <li>username: user</li>
        <li>password: user112233</li>
      </ul>
    </div>
    <div class="d-block" v-else>
      <h3>Admin Only</h3>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth.store";

const store = useAuthStore();
</script>
