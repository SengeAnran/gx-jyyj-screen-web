<template>
  <div class="weather">
    <div class="location-time">
      <div class="location">
        <span class="location-name">北京</span>
        <el-cascader v-model="value" :popper-append-to-body="false" :options="options" placeholder="切换城市" @change="handleChange" />
      </div>
      <div class="time">2024-10-24</div>
    </div>
    <div class="weather-detail">
      <div class="detail-top">
        <div class="img-number">
          <img src="./img/Vector.svg" alt="">
          <div class="number">23℃</div>
        </div>
        <div class="status-number">
          <div>多云</div>
          <div>18-26℃</div>
        </div>
      </div>
      <div class="detail-bottom">
        <div class="bottom-left">湿度：52%</div>
        <div class="bottom-right">风向:东北风 3级</div>
      </div>
      <div class="pm">
        <div class="pm-button">PM:26</div>
        <div class="pm-button">空气质量：优</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

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
}]
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
