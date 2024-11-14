<template>
  <div class="weather">
    <div class="location-time">
      <div class="location">
        <span class="location-name">{{city}}</span>
<!--        <el-cascader v-model="value" :popper-append-to-body="false" :options="options" placeholder="切换城市" @change="handleChange" />-->
      </div>
      <div class="time">{{date}}</div>
    </div>
    <div class="weather-detail">
      <div class="detail-top">
        <div class="img-number">
          <img :src="state.weatherDetail.imgUrl" alt="">
          <div class="number">{{state.weatherDetail.temperature}}℃</div>
        </div>
        <div class="status-number">
          <div>{{state.weatherDetail.weather}}</div>
<!--          <div>18-26℃</div>-->
        </div>
      </div>
      <div class="detail-bottom">
        <div class="bottom-left">湿度：{{state.weatherDetail.humidity}}%</div>
        <div class="bottom-right">风向: {{state.weatherDetail.windDirection}}风 {{state.weatherDetail.windPower}}级</div>
      </div>
<!--      <div class="pm">-->
<!--        <div class="pm-button">PM:26</div>-->
<!--        <div class="pm-button">空气质量：优</div>-->
<!--      </div>-->
    </div>
    <div id="container"></div>
  </div>
</template>
<script setup>
  import  {weatherToImg} from './constant'
  import moment from 'moment';
import { ref, reactive, onMounted, watch,nextTick } from 'vue'
import AMapLoader from "@amap/amap-jsapi-loader";
let map = null;
const date = ref('');
const city = ref('北京');
const state = reactive({
  city: '北京',// 城市
  weatherDetail: {

  }
})
onMounted(() => {
  getCityName();
  date.value = moment().format('YYYY-MM-DD');
  window._AMapSecurityConfig = {
    securityJsCode: "d62398e7a727ad9cdc91e870bb9b7792", // 「你申请的安全密钥」
  };
  AMapLoader.load({
    key: "b0db333ab8745a42ece941961c735115", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Weather"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map('container');
      getWeatherInfo();
    })
})
  watch(city, () =>  {
    nextTick(() => getWeatherInfo() )
    }, {
    immediate: true,
  })
function getCityName() {
  console.log(' getCityName'); // 输出城市
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('position',position);
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then(response => response.json())
        .then(data => {
          city.value = data.address.state;
          console.log(' 输出城市',data); // 输出城市
        })
        .catch(error => console.error(error));
    }, function(error) {
      console.error(error);
    });
  } else {
    console.log("Geolocation API not supported in this browser.");
  }
}
function getWeatherInfo() {
  console.log('getWeatherInfo')
  if (!map) return;
  map.plugin(['AMap.Weather'], function() {
    //构造 Weather 类
    var amapWeather = new AMap.Weather();
    //查询实时天气信息，cityName 见 http://restapi.amap.com/v3/config/district?level=city&sublevel=0&extensions=all&output=xml&key=d9fba2f3196b6a4419358693a2b0d9a9
    amapWeather.getLive(city.value,function (err, data) {
      console.log('询实时天气信息', data);
      state.weatherDetail = {...data, imgUrl: weatherToImg['阵雨']};
    });
  });
}
const value = ref('')
const handleChange = (value) => {
  console.log(value)
}
const options =  [
  {
  value: 'zhinan',
  label: '指南',
  children: [{
    value: 'shejiyuanze',
    label: '设计原则',
    children: [{
      value: 'yizhi',
      label: '一致'
    }, {
      value: 'fankui',
      label: '反馈'
    }, {
      value: 'xiaolv',
      label: '效率'
    }, {
      value: 'kekong',
      label: '可控'
    }]
  }, {
    value: 'daohang',
    label: '导航',
    children: [{
      value: 'cexiangdaohang',
      label: '侧向导航'
    }, {
      value: 'dingbudaohang',
      label: '顶部导航'
    }]
  }]
}];
</script>
<style scoped lang="scss">
.location-time {
  display: flex;
  justify-content: space-between;
  .location {
    display: flex;
    align-items: end;
    overflow-y: auto;
    position: relative;
    .location-name {
      color: var(--Text-Primary, #F8FDFF);
      font-family: "PingFang SC";
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-right: 4px;
    }
    ::v-deep .el-cascader {
      width: 115px;
    }
    ::v-deep .el-input {
      --el-input-border: 0;
      --el-input-focus-border: 0;
    }
    ::v-deep .el-input__inner {
      //--el-menu-active-color: white;
      color: white;
      border: 0;
    }
    ::v-deep .el-input__inner::placeholder {
      color: #fff;
      text-align:center;
    }
    ::v-deep .el-input__wrapper {
      background: none;
      border: none;
    }

  }
  .time {
    color: #FFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
  }
}
.weather-detail {
  margin-top: 42px;
  .detail-top {
    display: flex;
    align-items: end;
    margin-bottom: 27px;
    .img-number {
      display: flex;
      align-items: center;
      margin-right: 62px;
      img {
        width: 72px;
        height: 54px;
        margin-right: 13px;
      }
      .number {
        color: var(--Text-Primary, #F8FDFF);
        font-family: "DIN Next LT Pro";
        font-size: 36px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
    .status-number {
      color: #FFF;
      font-family: "PingFang SC";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
    }
  }
  .detail-bottom {
    display: flex;
    color: #FFF;
    font-family: "PingFang SC";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
    .bottom-left {
      margin-right: 32px;
    }
  }
  .pm {
    margin-top: 20px;
    display: flex;
    .pm-button {
      width: 142.235px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #FFF;
      border-radius: 4px;
      border: 1px solid #409EFF;
      background: #409EFF;

      /* 文字/P1.3-Reg */
      font-family: "PingFang SC";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      &:first-child {
        color: #409EFF;
        background: none;
        margin-right: 27px;
      }
    }
  }
}
</style>
