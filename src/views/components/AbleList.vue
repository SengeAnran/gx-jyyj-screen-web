
<template>
  <div class="able-list" :style="props.location">
    <div
      class="able-list-item"
      :title="item.name"
      v-for="(item, index) in ableList"
      :key="index + item.name"
      @click="$emit('useAble', item)"
    >
      <img :src="item.iconUrl" alt="">
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  ableList: Array,
  location: {
    type: Object,
  }
})
</script>


<style scoped lang="scss">
.able-list {
  position: absolute;
  left: 50%;
  bottom: 66px;
  transform: translateX(-50%);
  height: 40px;
  padding: 5px 11px;
  border-radius: 6px;
  border: 1px solid #0E88D4;
  //background: linear-gradient(0deg, #043D88 0%, #091E2D 45.79%, #132550 92.5%);
  background: #183D8B;
  display: flex;
  align-items: center;
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 8px;
    height: 8px;
    background: #183D8B;
    border: 1px solid #0E88D4;
    border-top: none;
    border-right: none;
    left: 50%;
    transform: translateX(-50%) rotate(-45deg);
    bottom: -5px;
  }
  .able-list-item {
    margin: 0 21px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

}
</style>
