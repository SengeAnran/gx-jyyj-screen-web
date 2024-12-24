
<template>
<div class="location-tool" :style="props.location">

  <div class="content-box">
    <div class="title">定位工具</div>
    <div class="input-item">
      <div class="mini-title">经纬度定位</div>
      <div class="input-item-line">
        <div class="text">经度</div>
        <el-input v-model="form.latitude"/>
        <el-button type="primary" @click="$emit('getLatLon')" >
          <template #icon>
            <img src="./location_get.svg" alt="">
          </template>
          识取点
        </el-button>
      </div>
      <div class="input-item-line">
        <div class="text">维度</div>
        <el-input v-model="form.longitude"/>
        <el-button type="primary" @click="toLocation" >
          <template #icon>
            <img src="./location.svg" alt="">
          </template>
          定位
        </el-button>
      </div>
    </div>
<!--    <div class="input-item">-->
<!--      <div class="mini-title">地区名定位</div>-->
<!--      <div class="input-item-line">-->
<!--        <div class="text">位置</div>-->
<!--        <el-input v-model="form.locationName"/>-->
<!--        <el-button type="primary" >-->
<!--          <template #icon>-->
<!--            <img src="./location.svg" alt="">-->
<!--          </template>-->
<!--          定位-->
<!--        </el-button>-->
<!--      </div>-->
<!--    </div>-->

  </div>
  <div class="line"></div>
</div>
</template>
<script setup>
import { defineProps, reactive } from 'vue'
const props = defineProps({
  location: {
    type: Object,
  }
})
const form = reactive({
  latitude: '',
  longitude: '',
  locationName: '',
})

/**
 * 设置经纬度
 * @param location
 */
const setLatLon = (location) => {
  form.latitude = location.latitude;
  form.longitude = location.longitude;

}

const emits = defineEmits(['toLocation'])
function toLocation() {
  if (form.latitude && form.longitude) {
    emits('toLocation', {latitude: form.latitude, longitude: form.longitude})
  }
}
defineExpose({
  setLatLon,
})
</script>


<style scoped lang="scss">
.location-tool {
  height: auto;
  position: absolute;
  .content-box {
    color: #FFF;
    position: absolute;
    left: 47px;
    bottom: 54px;
    width: 356px;
    //height: 300px;
    height: 212px;
    border-radius: 6px;
    border: 1px solid #264B75;
    background: rgba(11, 22, 36, 0.50);
    .title {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      padding: 0 21px;
      background: linear-gradient(90deg, rgba(0, 170, 255, 0.10) -2.79%, rgba(0, 141, 255, 0.01) 100%), linear-gradient(270deg, #00020F 0%, #001726 102.79%);
    }
    .input-item {
      padding: 13px 21px;
      .mini-title {
        font-size: 16px;
        margin-bottom: 13px;
      }
      .input-item-line {
        white-space: nowrap;
        display: flex;
        align-items: center;
        margin-bottom: 9px;
        .text {
          margin-right: 14px;

        }
        .el-input {
          width: 164px;
          height: 30px;
          color: white;
          --el-input-border-color: rgba(64, 158, 255, 1);
          ::v-deep .el-input__wrapper {
            background: none;
            .el-input__inner {
              color: white;
            }
          }
        }
        .el-button {
          width: 98px;
          margin-left: 8px;
        }
      }
    }
  }
  .line {
    position: relative;
    z-index: 1;
    width: 56.164px;
    height: 85.334px;
    background: url("./location_line.svg") left top no-repeat;
    background-size: 100% 100%;
  }
}
</style>
