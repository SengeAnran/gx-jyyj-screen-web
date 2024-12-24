<template>
  <div class="map" >
    <div id="cesiumContainer" >
    </div>
    <div class="btn-list-box">
<!--      <div  class="btns">-->
<!--        &lt;!&ndash;        <div v-if="secondNavStart > 0" class="left-btn"></div>&ndash;&gt;-->
<!--        <div class="left-btn" @click="toSecondaryLeft"></div>-->
<!--        <div class="right-btn" @click="toSecondaryRight"></div>-->
<!--      </div>-->
      <div class="btn-list">
        <div class="btn-list-item"  v-for="(item, index) in routes" :key="index" :style="posStyle(index)">
          <div class="text" @click="handAble(item)">{{item.text}}</div>
          <location-tool
            v-if="item.name === 'locationTool' && item.childShow"
            ref="locationToolCom"
            :location="item.childPosition"
            @getLatLon="getLatLon"
            @toLocation="toLocation"
          />
          <able-list
            v-if="item.childAbleList && item.childAbleList.length > 0 && item.childShow"
            :able-list="item.childAbleList"
            @useAble="useAble"
          />
        </div>
      </div>
      <div class="left-btn" @click="toSecondaryLeft"></div>
      <div class="right-btn" @click="toSecondaryRight"></div>

    </div>
  </div>

</template>
<script setup>
import * as Cesium from "cesium";
import moment from 'moment';
import { onMounted, ref, watch, onUnmounted } from 'vue'
import { savePath, findClosestRoutePoints } from '@/api/home.js';
import { useMapStore } from '@/stores/map.js';
import { ElMessage, ElMessageBox } from 'element-plus'
import LocationTool from '@/views/components/LocationTool.vue'
import AbleList from '@/views/components/AbleList.vue'
let cesiumContainer, intervalTimer,_tileset;
const  mapStore = useMapStore();
onMounted(() => {
  initCesium();
  cesiumContainer= document.querySelector("#cesiumContainer");
  setMapScale();
  console.log(locationToolCom.value)
})
watch(mapStore.scale, (val) => {
  if(val.scaleX && val.scaleY && cesiumContainer) {
    setMapScale();
  }
},{
  immediate: true,
  deep: true,
})

/**
 * 设置cesium缩放，应对页面的缩放
 */
function setMapScale() {
  // console.log(mapStore.scale,cesiumContainer);
  cesiumContainer.style.transform = `scale(${1/mapStore.scale.scaleX}, ${1/mapStore.scale.scaleY})`;
}
const locationToolCom = ref(null); // locationToolCom 组件
const startMark = ref(false);
const markNumber = ref(0); // 标点数
const markMaxNumber = ref(0); // 标点数
const routes = ref([
  {
    // iconUrl:  new URL(`./img/icon_01.svg`, import.meta.url).href,
    text: '标记',
    childShow: false,
    childAbleList: [
      {
        name: '直线测量',
        iconUrl: new URL(`./img/able/icon_bj_01.svg`, import.meta.url).href,
        active: false,
      },
      {
        name: '折线测量',
        iconUrl: new URL(`./img/able/icon_bj_02.svg`, import.meta.url).href,
        active: false,
      },
      {
        name: '高度测量',
        iconUrl: new URL(`./img/able/icon_bj_03.svg`, import.meta.url).href,
        active: false,
      },
      {
        name: '面积测量',
        iconUrl: new URL(`./img/able/icon_bj_04.svg`, import.meta.url).href,
        active: false,
      },
      {
        name: '体积测量',
        iconUrl: new URL(`./img/able/icon_bj_05.svg`, import.meta.url).href,
        active: false,
      },
      {
        name: '体积测量',
        iconUrl: new URL(`./img/able/icon_bj_06.svg`, import.meta.url).href,
        active: false,
      },
      {
        name: '体积测量',
        iconUrl: new URL(`./img/able/icon_bj_07.svg`, import.meta.url).href,
        active: false,
      },
    ]
  },
  {
    text: '测量工具',
    childShow: false,
    childAbleList: [
      {
        name: '直线测量',
        iconUrl: new URL(`./img/able/icon_cl_01.svg`, import.meta.url).href,
        active: false,
      },
      {
        name: '折线测量',
        iconUrl: new URL(`./img/able/icon_cl_02.svg`, import.meta.url).href,
        active: false,
      },
      {
        name: '高度测量',
        iconUrl: new URL(`./img/able/icon_cl_03.svg`, import.meta.url).href,
        active: false,
      },
      {
        name: '面积测量',
        iconUrl: new URL(`./img/able/icon_cl_04.svg`, import.meta.url).href,
        active: false,
      },
      {
        name: '体积测量',
        iconUrl: new URL(`./img/able/icon_cl_05.svg`, import.meta.url).href,
        active: false,
      },
    ]
  },
  {
    text: '路径规划',
    childAbleList: [
      {
        name: '路线飞行',
        iconUrl: new URL(`./img/able/icon_lj_01.svg`, import.meta.url).href,
        active: false,
      },
      {
        name: '录制路线',
        iconUrl: new URL(`./img/able/icon_lj_02.svg`, import.meta.url).href,
        active: false,
      },
    ]
  },
  {
    name: 'locationTool',
    text: '定位工具',
    childShow: false,
    childPosition: {
      left: '50%',
      bottom: 50 + 'px',
    }
  },

  {
    text: '信息接收'
  },
  {
    text: '系统设置'
  },

  {
    text: '复位'
  },
  {
    text: '清空标记'
  },
  // {
  //   // iconUrl:  new URL(`./img/icon_04.svg`, import.meta.url).href,
  //   text: '开始取点'
  // },
  // {
  //   // iconUrl:  new URL(`./img/icon_05.svg`, import.meta.url).href,
  //   text: '结束取点'
  // },
]);
let viewer, ponitList=[],linePoint = [], canSavePoint = false, clickPoint = []
let cartesian3List = [];

async function  initCesium() {
  // //
  // // 密钥
  const defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ODYwNDg3MS1lMGMwLTRkOTYtODU5Mi0yY2JhZWNmOGZjMWQiLCJpZCI6MjUxNTA1LCJpYXQiOjE3MzAyMDgzNzV9.otZgCDTr2OCqwHMh4YPvA9rwNq_Doc_UuTuElzTmyi8`;
  // 设置
  Cesium.Ion.defaultAccessToken = defaultAccessToken;
  // let viewer = new Cesium.Viewer("cesiumContainer");
  // 创建视图
  viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false, //是否显示点击要素之后显示的信息
    fullscreenButton: false, //是否显示全屏按钮
    vrButton: false,
    geocoder: false, //是否显示地名查找控件
    homeButton: false,  //是否显示Home按钮
    sceneModePicker: false, //是否显示投影方式控件
    selectionIndicator: false,
    timeline: false, //是否显示时间线控件
    navigationHelpButton: false, //是否显示帮助信息控件
    navigationInstructionsInitiallyVisible: false,
    animation: false, //是否显示动画控件
    baseLayerPicker: false,//是否显示图层选择控件
    terrainProvider: await Cesium.createWorldTerrainAsync(),
    // imageryProvider:esri,//自定义图层
    // imageryProvider: new SingleTileImageryProvider({
    //   url:
    //     "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
    // }),
  });
  // // 视图场景设置：隐藏地球
  // viewer.scene.sun.show = false; //在Cesium1.6(不确定)之后的版本会显示太阳和月亮,不关闭会影响展示
  // viewer.scene.moon.show = false;
  // viewer.scene.skyBox.show = false;//关闭天空盒,否则会显示天空颜色
  // viewer.scene.undergroundMode = true; //重要,开启地下模式,设置基色透明,这样就看不见黑色地球了
  // // viewer.scene.underGlobe.show = true;
  // // viewer.scene.underGlobe.baseColor = new Cesium.Color(0, 0, 0, 0);
  // viewer.scene.globe.show = false; //不显示地球,这条和地球透明度选一个就可以
  // viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0);
  // viewer.scene.backgroundcolor = new Cesium.Color(0, 0, 0, 0);
  //
  viewer._cesiumWidget._creditContainer.style.display = "none";
  // 开启深度检测
  viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.scene.debugShowFramesPerSecond = true;
  //  加载3Dtile数据
  try {
    const tileset = await Cesium.Cesium3DTileset.fromUrl("/geomap/tileset.json");
    _tileset = tileset;
    viewer.scene.primitives.add(tileset);
    viewer.zoomTo(tileset);
    // resetView();
    // // // 设置载入数据显示高度
    const cartographic = Cesium.Cartographic.fromCartesian(
      tileset.boundingSphere.center,
    );
    const surface = Cesium.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      0.0,
    );
    const offset = Cesium.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      -30, // 显示高度30
    );
    const translation = Cesium.Cartesian3.subtract(
      offset,
      surface,
      new Cesium.Cartesian3(),
    );
    // modelMatrix 该3D瓦片集的模型矩阵。
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

    //  当3d数据加载完之后 优化性能参数
    // 瓦片加载事件。
    tileset.tilesLoaded.addEventListener(function () {
      console.log('一个瓦片被加载了。');
      // 按需加载和卸载数据
      tileset.maximumMemoryUsage = 1024 * 1024 * 1024; // 设置3D Tiles的最大内存使用量
      tileset.maximumScreenSpaceError = 2; // 设置3D Tiles的屏幕空间误差
      // 其他操作
      // ...
    });

  } catch (e) {
    console.log(e)
  }
  //  拾取点位
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  // 设置左键点击事件
  handler.setInputAction(function (event) {
    // 获取 pick 拾取对象位置
    const position = viewer.scene.pickPosition(event.position);
    if(canSavePoint) {
      linePoint.push({...position});
    }
    // 标点
    if (startMark.value && markMaxNumber.value === 2) {
      clickPoint.push({...position});
      if (markNumber.value === 0) {
        addPoint( {...position});
        markNumber.value = 1;
      } else if (markNumber.value === 1) {
        addPoint( {...position});
        markNumber.value = 2;
        startMark.value = false;
      }
    }
    // console.log("获取到的坐标：", position);
    // 拾取点位
    if (startMark.value && markMaxNumber.value === 1) {
      const {latitude, longitude} = worldCoordinateToPoint(position);
      // console.log("获取到的坐标：",latitude,longitude, locationToolCom.value);
      // 因为在v-fo人之内，locationToolCom.value为数组
      locationToolCom.value[0].setLatLon({latitude,longitude});
      startMark.value = false;
      markMaxNumber.value = 0;
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

/*
  // addLine();
  // Promise.all([...ponitList]).then(
  //   function (pins) {
  //     // viewer.zoomTo(pins);
  //   },
  // );


   position viewer.camera.position
   {
   "x": 1457.6517381888157,
   "y": -4392.558063021175,
   "z": 5275.5617493716745
   }
   lon -71.64179424496777  Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(viewer.camera.position).longitude)
   lat 48.93114426906623   Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(viewer.camera.position).latitude)
   heading 5.992310365676957  viewer.camera.heading
   pitch -1.4688832878206757  viewer.camera.pitch
   roll 6.233906033558268  viewer.camera.roll



  // // 定义目标位置和视角
  // var targetPosition = Cesium.Cartesian3.fromDegrees(
  //   102.54677295684814,
  //   24.92044687271119,
  //   3500
  // );
  // var heading = Cesium.Math.toRadians(90.0);
  // // var pitch = Cesium.Math.toRadians(-90.0);
  // var roll = Cesium.Math.toRadians(0.0);
  //
  // // 相机飞到目标点
  // viewer.camera.flyTo({
  //   destination: targetPosition,
  //   orientation: {
  //     // heading: heading,
  //     pitch: -90,
  //     // roll: roll
  //   },
  //   duration: 2 // 飞行动画时长
  // });
  */
}
/**
 * 复位
 */
function resetView() {
  viewer.zoomTo(_tileset);
  // //  设置照相机视口
  // viewer.camera.setView({
  //   // destination: { "x": 1457.6517381888157, "y": -4392.558063021175, "z": 5275.5617493716745 },
  //   // orientation: {
  //   //   heading: 5.992310365676957, // 方向
  //   //   pitch: -1.4688832878206757, // 视角
  //   //   roll: 6.233906033558268,   // 倾斜角度
  //   // }
  //   destination: { "x": 1088.918662278305, "y": -3056.2641844789578, "z": 4262.43020502417 },
  //   orientation: {
  //     heading: 5.992310365676957, // 方向
  //     pitch: -1.4688832878206757, // 视角
  //     roll: 6.233906033558268,   // 倾斜角度
  //   }
  // })
}
/**
 *  打点
 * @param position {x: ?,y: ?, z: ?}
 */
function addPoint(position) {
  const pinBuilder = new Cesium.PinBuilder();
  const pin = viewer.entities.add({
    // position: Cesium.Cartesian3.fromDegrees( 101.54677295684814, 24.92044687271119 ),
    position: Cesium.Cartesian3.fromElements(position.x, position.y, position.z),
    billboard: {
      image: pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
  });
  //  将所打的点 推入点数组
  ponitList.push(pin)
  //Since some of the pins are created asynchronously, wait for them all to load before zooming/
}
/**
 *  删除所有标记
 *
 **/
function removeAllPonit() {
  clickPoint = [];
  cartesian3List = [];
  viewer.entities.removeAll();  // 删除地图上绘制的所有的点
}
/**
 * 路径规划
 * */
function pathPlanning() {
  if (clickPoint.length !== 2) {
    ElMessage({
      type: 'warning',
      message: `请标记起始坐标两个位置`,
    })
    return
  }
  const data = {
    startPoint: clickPoint[0],
    endPoint: clickPoint[1],
  }
  ElMessage({
    type: 'success',
    message: `正在规划中`,
  })
  findClosestRoutePoints(data).then(res => {
    cartesian3List = res;
    addLine();
  })
}
// 添加事件列表数据
function addThingListData() {
  const startPoint = cartesian3List[0];
  const endPoint = cartesian3List[cartesian3List.length -1];
  const listData = [{
    // name: '1.发现空地',
    time: moment().format('YYYY-MM-DD HH:mm:ss'),
    startLocation: worldCoordinateToPoint(Cesium.Cartesian3.fromElements(startPoint.x, startPoint.y, startPoint.z)),
    endLocation: worldCoordinateToPoint(Cesium.Cartesian3.fromElements(endPoint.x, endPoint.y, endPoint.z)),
    // area: '75平米',
    // slope: '75平米',
    width: startPoint.minWidth,
  }]
  // console.log(listData)
  mapStore.setThingList(listData)
}
/**
 *  画线
 */
function addLine() {
  // clickPoint = [];
  let index = 0;
  intervalTimer = window.setInterval(() => {
    if (index === (cartesian3List.length -1)) {
      window.clearInterval(intervalTimer);
      addThingListData();
      return
    }
    const positions = [new Cesium.Cartesian3(cartesian3List[index].x, cartesian3List[index].y, cartesian3List[index].z), new Cesium.Cartesian3(cartesian3List[index+1].x, cartesian3List[index+1].y, cartesian3List[index+1].z)];
    mapLine(positions);
    index += 1;
  }, 500);
}
onUnmounted(() => {
  window.clearInterval(intervalTimer);
});
// 画线
function mapLine(positions) {
  // console.log(positions);
  // 画线
  viewer.entities.add({
    polyline: {
      // positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35,-130,26]),
      positions: positions,
      width: 5,
      arcType: Cesium.ArcType.NONE, //多段线段必须遵循的线类型。
      material: new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.YELLOW,
      }),
      depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.YELLOW, // 指定在多段线低于地形时用于绘制多段线的材质的特性。
      }),
    },
  })

}
// 放大
function zoomIn() {
  // viewer 为 Viewer 对象
  let position = viewer.camera.position;
  let cameraHeight = viewer.scene.globe.ellipsoid.cartesianToCartographic(position).height;
  // 每次缩小 20 倍,参数可改
  let moveRate = cameraHeight / 20.0;
  viewer.camera.moveForward(moveRate);
}
//缩小
function zoomOut() {
  // viewer 为 Viewer 对象
  let position = viewer.camera.position;
  let cameraHeight = viewer.scene.globe.ellipsoid.cartesianToCartographic(position).height;
  // 每次缩小 20 倍,参数可改
  let moveRate = cameraHeight / 20.0;
  viewer.camera.moveBackward(moveRate);
}
// 开始取点
function startSavePoint() {
  canSavePoint = true;
  linePoint = [];
}
// 结束取点
function endSavePoint() {
  canSavePoint = false;
  ElMessageBox.prompt('请输入路线名称', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(({ value }) => {
    const data = {
      points: linePoint,
      pathOrder: value,
    }
    savePath(data).then(() => {
      ElMessage({
        type: 'success',
        message: `提交成功`,
      })
      linePoint = [];
    })
  }).catch(() => {
    linePoint = [];
    ElMessage({
      type: 'info',
      message: '取消输入',
    })
  });

}
//
/**
 * 标记
 * @param number 标记点位数量
 */
function startPoint(number) {
  startMark.value = true;
  markNumber.value = 0;
  markMaxNumber.value = number;
}
//世界坐标转换经纬度和高度
function worldCoordinateToPoint(worldCoordinate) {
  // 获取经纬度
  const ellipsoid = viewer.scene.globe.ellipsoid;
  var cartographic = ellipsoid.cartesianToCartographic(worldCoordinate);
  var longitude = Cesium.Math.toDegrees(cartographic.longitude);
  var latitude = Cesium.Math.toDegrees(cartographic.latitude);
  var height = cartographic.height;

  // console.log('经度: ' + longitude + ', 纬度: ' + latitude + ', 高度: ' + height);
  return {
    longitude,
    latitude,
    height,
  }

}
//  一级功能分发
function handAble(item) {
  // console.log(item);
  switch (item.text) {
    // case '标记': startPoint(2); break;
    case '标记': item.childShow = !item.childShow; break;
    case '复位': resetView(); break;
    // case '路径规划': pathPlanning(); break;
    case '路径规划': item.childShow = !item.childShow; break;
    case '放大比例': zoomIn(); break;
    case '缩小比例': zoomOut(); break;
    case '清空标记': removeAllPonit(); break;
    case '测量工具': item.childShow = !item.childShow; break;
    case '定位工具': item.childShow = !item.childShow; break;
    case '开始取点': startSavePoint(); break;
    case '结束取点': endSavePoint(); break;
  }
}
/**
 * 使用二级功能
 * 功能：做功能分发
 */
function useAble(item) {
  console.log('选中功能', item);
  switch (item.name) {
    case '直线测量': break;
  }
}
const firstIndex = ref(0)
const _showCount = 4; //  显示数量
// 位置
function posStyle(i) {
  const len = routes.value.length;
  const newIndex = (len + i - firstIndex.value) % len;
  let value, pos;
  if ( newIndex < _showCount) {
    value = newIndex * (120 + 10) + 10;
    pos ={left: `${value}px`};
  } else if ( newIndex === _showCount) { // n+ 1个
    value = newIndex * (120 + 10) + 10;
    pos ={left: `${value}px`, opacity: 0};
  } else if ( newIndex === len) { // 最后一个
    pos ={left: `-130px`, opacity: 0};
  } else {
    pos ={left: `-260px`, opacity: 0};
  }
  return pos;
}
// 左点击
function toSecondaryRight() {
  firstIndex.value = (firstIndex.value + 1)%routes.value.length;
  console.log(firstIndex.value);
  // secondNavStart.value = Math.max(0, secondNavStart.value - 1);
}
// 右点击
function toSecondaryLeft() {
  firstIndex.value = (routes.value.length + firstIndex.value - 1)%routes.value.length;
  console.log(firstIndex.value);
  // const max = Math.max(routes.value.length - 6, 0);
  // secondNavStart.value = Math.min(max,secondNavStart.value + 1);
}

/**
 * 定位工具
 */

/**
 * 获取经纬度
 */
function getLatLon() {
  startPoint(1);
}
/**
 * 定位
 */
function toLocation(position) {
  const { longitude, latitude } = position;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(longitude,latitude, 5000),
    duration: 2.0, // 动画持续时间
    endTransform: Cesium.Matrix4.IDENTITY, // 可选，结束姿态矩阵
  })
  const _position = Cesium.Cartesian3.fromDegrees(longitude,latitude, 3000);
  console.log(_position.x, {..._position})
  addPoint({..._position});
}


</script>



<style lang="scss" scoped>
.map {
  //position: relative;
  //z-index: -1 !important;
  width: 100%;
  height: 100%;
}
html,body,#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
::v-deep .cesium-performanceDisplay {
  display: none;
}
.btn-list-box {
  width: 530px;
  height: 56px;
  z-index: 1;
  position: absolute;
  bottom: 62px;
  left: 50%;
  transform: translateX(-47%);
  //overflow-y: visible;
  .btns {
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 5px;
    //transform: translateY(-50%);

    .left-btn,.right-btn {
      //top: -20px;
      position: absolute;
      width: 44px;
      height: 44px;
      cursor: pointer;
    }
    .left-btn {
      left: -30px;
      background: url("./img/left_btn.svg") left top no-repeat;
      background-size: 100% 100%;
    }
    .right-btn {
      right: -30px;
      background: url("./img/right_btn.svg") left top no-repeat;
      background-size: 100% 100%;
    }
  }

  .btn-list {
    position: relative;
    width: 100%;
    height: 100%;
    //width: 812px;
    //height: 56px;
    //overflow-x: clip;
    //display: flex;
    .btn-list-item {
      position: absolute;
      top: 0;
      width: 120px;
      height: 56px;
      //transition: left 0.5s;
      //margin: 0 10px;

      background: url("./img/btn.svg") left top no-repeat;
      background-size: 100% 100%;

      .text {
        display: inline-block;
        height: 100%;
        width: 100%;
        color: #00A3FF;
        cursor: pointer;
        text-align: center;
        font-family: "PingFang SC";
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 56px;

      }
      .text:hover {
        color: #FFF;
      }


    }
  }
  .left-btn,.right-btn {
    //top: -20px;
    position: absolute;
    width: 44px;
    height: 44px;
    cursor: pointer;
  }
  .left-btn {
    left: -30px;
    top: 6px;
    background: url("./img/left_btn.svg") left top no-repeat;
    background-size: 100% 100%;
  }
  .right-btn {
    right: -30px;
    top: 6px;
    background: url("./img/right_btn.svg") left top no-repeat;
    background-size: 100% 100%;
  }

}
</style>
