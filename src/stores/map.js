import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('counter', () => {
  const scale = reactive({
    scaleX: '',
    scaleY: '',
  })

  function setScale(value) {
    scale.scaleX = value.scaleX;
    scale.scaleY = value.scaleY;
  }
  const mapScale = computed(() => {
    return {
      scaleX: 1/scale.scaleX,
      scaleY: 1/scale.scaleY,
    }
  })
  return { scale,mapScale, setScale }
})
