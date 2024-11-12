<template>
  <div class="page">

<!--    <Map/>-->
    <div class="bgBox"></div>
    <div class="mask"></div>
    <div class="title">应急救灾指挥系统</div>
    <Left/>
    <Right/>
  </div>
</template>

<script setup>

import Map from '@/views/Map.vue'
import Left from './Left/index.vue'
import Right from './Right/index.vue'
</script>
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
  .title {
    position: absolute;
    top: 43px;
    left: 50%;
    transform: translateX( -50%);
    color: #FFF;
    font-family: "MF LiHei (Noncommercial)";
    font-size: 46px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .name {
    font-size: 24px;
  }
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: url(../assets/img/bg.png) no-repeat 100% 100%;
    pointer-events: none;
  }
}
</style>
