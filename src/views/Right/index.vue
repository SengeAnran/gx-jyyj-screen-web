<template>
  <div class="right">
    <Weather/>
    <IntelligentSolution/>
  </div>
</template>
<script setup>
import Weather from "./Weather.vue";
import IntelligentSolution from "./IntelligentSolution.vue";
</script>


<style lang="scss" scoped>
.right {
  position: absolute;
  top:118px;
  right: 88px;
  width: 360px;
  height: 814px;
  padding: 32px 22px 28px;
  border-radius: 7px;
  border: 2px solid #274C77;
  background: rgba(11, 22, 36, 0.70);
  backdrop-filter: blur(10px);
}
</style>
