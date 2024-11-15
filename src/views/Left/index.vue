<template>
  <div class="left">
    <div class="able-list">
      <div class="able-list-item" v-for="(item, index) in ableList" :key="index">
        <div class="top-img"><img :src="item.iconUrl" alt=""></div>
        <div class="bottom-text">{{item.text}}</div>
      </div>
    </div>
    <div class="search">
      <input type="text" v-model="searchValue" placeholder="搜索">
      <div class="search-btn">
        <img src="./img/Search.svg" alt="">
      </div>
    </div>
    <div class="min-title">
      路径更新信息
    </div>
    <div class="thing-list">
      <div class="thing-list-item" v-for="(item, index) in thingList" :key="index">
        <div class="thing-top">
<!--          <div class="name">{{item.name}}</div>-->
          <div class="time">时间：{{item.time}}</div>
        </div>
        <div class="thing-bottom">
          <div class="thing-text-line">起点经维度：（{{item.startLocation.longitude.toFixed(2)}}，{{item.startLocation.latitude.toFixed(2)}}）</div>
          <div class="thing-text-line">终点经维度：（{{item.endLocation.longitude.toFixed(2)}}，{{item.endLocation.latitude.toFixed(2)}}）</div>
          <div class="thing-text-line">路线最小宽度：{{item.width}}</div>
<!--          <div class="thing-text-line">报警设备：{{item.alarmEquipment}}</div>-->
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useMapStore } from '@/stores/map.js';
const  mapStore = useMapStore();

const thingList = computed( () => {
 return mapStore.thingList
})
const ableList = ref([
  {
    iconUrl:  new URL(`./img/icon_01.svg`, import.meta.url).href,
    text: '避难场所'
  },
  {
    iconUrl:  new URL(`./img/icon_02.svg`, import.meta.url).href,
    text: '救援队伍'
  },
  {
    iconUrl:  new URL(`./img/icon_03.svg`, import.meta.url).href,
    text: '医疗资源'
  },
  {
    iconUrl:  new URL(`./img/icon_04.svg`, import.meta.url).href,
    text: '物资装备'
  },
  {
    iconUrl:  new URL(`./img/icon_05.svg`, import.meta.url).href,
    text: '应急机构'
  },
  {
    iconUrl:  new URL(`./img/icon_06.svg`, import.meta.url).href,
    text: '应急专家'
  },
  {
    iconUrl:  new URL(`./img/icon_07.svg`, import.meta.url).href,
    text: '运输保障'
  },
  {
    iconUrl:  new URL(`./img/icon_08.svg`, import.meta.url).href,
    text: '通信保障'
  },
]);
// const thingList = ref([
//   {
//     name: '1.发现空地',
//     time: '2024-10-29 15:31',
//     location: '192.145',
//     area: '75平米',
//     slope: '75平米',
//     alarmEquipment: '75平米',
//   },
//   {
//     name: '1.发现空地',
//     time: '2024-10-29 15:31',
//     location: '192.145',
//     area: '75平米',
//     slope: '75平米',
//     alarmEquipment: '75平米',
//   },
// ])
const searchValue=  ref('');
</script>


<style lang="scss" scoped>

.left {
  position: absolute;
  top:118px;
  left: 88px;
  padding: 32px 24px 19px;
  width: 360px;
  height: 814px;
  border-radius: 7px;
  border: 2px solid #274C77;
  background: rgba(11, 22, 36, 0.70);
  backdrop-filter: blur(10px);
}
.able-list {
  display: flex;
  flex-wrap: wrap;
  .able-list-item {
    width: 25%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top-img {
      width: 60px;
      height: 60px;
      margin-bottom: 6px;
    }
    .bottom-text {
      color: #FFF;
      font-family: "PingFang SC";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
    }
  }
}
.search {
  width: 100%;
  display: flex;
  padding: 13px 18px 13px 19px;
  justify-content: space-between;
  align-items: center;
  //gap: 224px;
  border-radius: 100px;
  border: 1px solid #203C48;
  margin-bottom: 32px;
  input {
    background: none;

    height: 22px;
    border: none;
    color: #FFF;
    font-family: "PingFang SC";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
    outline: none;
  }
  input::-webkit-input-placeholder{  // 针对 谷歌 内核
    color:white;
  }
  input:-moz-placeholder{   // 火狐
    color:white;
  }
  input:-ms-input-placeholder{  // 微软ie
    color:white;
  }
  .search-btn {
    width: 19px;
    height: 19px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.min-title {
  color: var(--Text-Primary, #F8FDFF);
  font-family: "PingFang SC";
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 23px ;
}
.thing-list {
  .thing-list-item {
    width: 312px;
    height: 159px;
    margin-bottom: 16px;
    padding: 14px 18px;
    flex-shrink: 0;
    border-radius: 12px;
    background: linear-gradient(90deg, #1A3251 0%, rgba(26, 50, 81, 0.02) 96.15%);
    .thing-top {
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(58, 114, 133, 0.32);
      .name {
        color: var(--Text-Secondary, #DCF6FF);
        font-family: "PingFang SC";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .time {
        color: #4186A4;
        font-family: "PingFang SC";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 157.143% */
      }
    }
    .thing-bottom {
      margin-top: 12px;
      .thing-text-line {
        color: var(--Text-Secondary, #DCF6FF);
        font-family: "PingFang SC";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

      }
    }
  }
}
</style>
