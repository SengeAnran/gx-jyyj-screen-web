import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const scale = reactive({
    scaleX: '',
    scaleY: '',
  })
  const thingList = ref([]);
  function setScale(value) {
    scale.scaleX = value.scaleX;
    scale.scaleY = value.scaleY;
  }
  function setThingList(value) {
    thingList.value = value;
  }
  const mapScale = computed(() => {
    return {
      scaleX: 1/scale.scaleX,
      scaleY: 1/scale.scaleY,
    }
  })
  return { scale,mapScale,thingList,setThingList,  setScale }
})
