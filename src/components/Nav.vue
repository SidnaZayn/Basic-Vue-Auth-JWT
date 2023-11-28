<template>
  <div class="d-flex justify-content-center p-3">
    <RouterLink to="/" class="btn me-2" type="button" v-if="!store.user">login</RouterLink>
    <RouterLink to="/no-auth" class="btn me-2" type="button">no auth</RouterLink>
    <RouterLink to="/with-auth" class="btn me-2" type="button">with auth</RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const store = useAuthStore();
const route = useRoute();
</script>

<style>
</style>
