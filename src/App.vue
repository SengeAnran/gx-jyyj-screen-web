<script setup>
import FitScreen from "./components/FitScreen.vue";
import("./scss/common.scss");
import { RouterView } from 'vue-router'

</script>


<template>
  <div class="app">
    <FitScreen  />
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app {
  height: 100%;

}
</style>
