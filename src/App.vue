<script setup>
import { RouterLink, RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
import { useAuthStore } from "./stores/auth.store";
import { computed, onMounted, ref } from "vue";

const store = useAuthStore();
</script>

<template>
  <header>
    <Nav></Nav>
  </header>
  <div class="d-block text-center">
    <span class="text-danger" v-if="store.tokenExpDate">
      Token expired in:
      {{ store.countdownVal.minutes }} Minutes, {{ store.countdownVal.seconds }} Seconds
    </span>
  </div>
  <div class="card">
    <div class="card-body">
      <RouterView />
    </div>
  </div>
</template>

<style></style>
