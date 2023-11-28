<template>
  <wc-toast></wc-toast>
  <div class="about mx-auto text-center">
    <div class="mb-3">
      <h1>This is with auth page</h1>
    </div>
    <div class="mb-3">
      <button @click="req()" class="btn">trigger request</button>
    </div>
  </div>
</template>

<script setup>
import apiService from "../app.service";
import { toast } from "wc-toast";

const api = new apiService();

const req = () => {
  api.getTesting().then((res) => {
    toast("request success");
  })
}
</script>

<style></style>
