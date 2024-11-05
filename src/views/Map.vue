<template>
  <div id="cesiumContainer" class="map">
  </div>
  <div class="btn-list">
    <div class="btn-list-item"  v-for="(item, index) in btnList" @click="handAble(item)" :key="index">
      <div class="btn-item-img">
        <img :src="item.iconUrl" alt="">
      </div>
      <div class="btn-text">{{item.text}}</div>
    </div>
  </div>
</template>
<script setup>
import * as Cesium from "cesium";
import { onMounted, ref, watch } from 'vue'
import { useMapStore } from '@/stores/map.js';
const  cesiumContainer= document.querySelector("#cesiumContainer");
const   mapStore = useMapStore();
watch(mapStore.mapScale, (val) => {
  cesiumContainer.style.transform = `scale(${val.scaleX}, ${val.scaleY})`;
})
onMounted(() => {
  initCesium();
})
const startMark = ref(false);
const markNumber = ref(0);
const btnList = ref([
  {
    iconUrl:  new URL(`./img/icon_01.svg`, import.meta.url).href,
    text: '标记'
  },
  {
    iconUrl:  new URL(`./img/icon_02.svg`, import.meta.url).href,
    text: '复位'
  },
  {
    iconUrl:  new URL(`./img/icon_03.svg`, import.meta.url).href,
    text: '路径规划'
  },
  // {
  //   iconUrl:  new URL(`./img/icon_04.svg`, import.meta.url).href,
  //   text: '放大比例'
  // },
  // {
  //   iconUrl:  new URL(`./img/icon_05.svg`, import.meta.url).href,
  //   text: '缩小比例'
  // },
]);
let viewer, ponitList=[];
const cartesian3List = [
  {
    "x": -270.07710759874567,
    "y": -528.7860061953734,
    "z": 2042.896370645783
  },
  {
    "x": -215.52100042896728,
    "y": -700.2145756192167,
    "z": 2039.8889548128868
  },
  {
    "x": -55.78746613337243,
    "y": -822.6328099240342,
    "z": 2039.7771283099587
  },
  {
    "x": 132.75065620969588,
    "y": -1058.8564346205098,
    "z": 2047.5463154171084
  },
  {
    "x": 106.9717781538433,
    "y": -1120.8945034797994,
    "z": 2056.875343300554
  },
  {
    "x": 215.26697180749096,
    "y": -1276.9240906692344,
    "z": 2108.1009718398627
  },
  {
    "x": 267.63086009037784,
    "y": -1567.2640129322137,
    "z": 2166.917331627128
  },
  {
    "x": 264.57102287965574,
    "y": -1629.9484307346897,
    "z": 2187.9015807192172
  },
  {
    "x": 238.04817535937454,
    "y": -1651.7072581362693,
    "z": 2199.419786614971
  },
  {
    "x": 273.650934140753,
    "y": -1676.0552605784744,
    "z": 2201.1510159712625
  }
];
async function  initCesium() {

  // 密钥
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
  });
  // 视图场景设置：隐藏地球
  viewer.scene.sun.show = false; //在Cesium1.6(不确定)之后的版本会显示太阳和月亮，不关闭会影响展示
  viewer.scene.moon.show = false;
  viewer.scene.skyBox.show = false;//关闭天空盒，否则会显示天空颜色
  viewer.scene.undergroundMode = true; //重要，开启地下模式，设置基色透明，这样就看不见黑色地球了
  // viewer.scene.underGlobe.show = true;
  // viewer.scene.underGlobe.baseColor = new Cesium.Color(0, 0, 0, 0);
  viewer.scene.globe.show = false; //不显示地球，这条和地球透明度选一个就可以
  viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0);
  viewer.scene.backgroundcolor = new Cesium.Color(0, 0, 0, 0);

  viewer._cesiumWidget._creditContainer.style.display = "none";
  // 开启深度检测
  viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.scene.debugShowFramesPerSecond = true;
  //  加载3Dtile数据
  try {
    const tileset = await Cesium.Cesium3DTileset.fromUrl("/geomap/tileset.json");
    viewer.scene.primitives.add(tileset);
    // viewer.zoomTo(tileset);
    resetView();
    // // 设置载入数据显示高度
    // const cartographic = Cesium.Cartographic.fromCartesian(
    //   tileset.boundingSphere.center,
    // );
    // const surface = Cesium.Cartesian3.fromRadians(
    //   cartographic.longitude,
    //   cartographic.latitude,
    //   0.0,
    // );
    // const offset = Cesium.Cartesian3.fromRadians(
    //   cartographic.longitude,
    //   cartographic.latitude,
    //   30, // 显示高度30
    // );
    // const translation = Cesium.Cartesian3.subtract(
    //   offset,
    //   surface,
    //   new Cesium.Cartesian3(),
    // );
    //
    // // modelMatrix 该3D瓦片集的模型矩阵。
    // tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
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
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  // 设置左键点击事件
  handler.setInputAction(function (event) {
    // 获取 pick 拾取对象位置
    var position = viewer.scene.pickPosition(event.position);
    console.log("获取到的坐标：", position);
    if (startMark.value) {
      if (markNumber.value === 0) {
        addPoint( {
          "x": -270.07710759874567,
          "y": -528.7860061953734,
          "z": 2042.896370645783
        });
        markNumber.value = 1;
      } else if (markNumber.value === 1) {
        addPoint({
          "x": 273.650934140753,
          "y": -1676.0552605784744,
          "z": 2201.1510159712625
        });
        markNumber.value = 2;
        startMark.value = false;
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


  // addLine();
  // Promise.all([...ponitList]).then(
  //   function (pins) {
  //     // viewer.zoomTo(pins);
  //   },
  // );

  /**
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

   */

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
}

/**
 * 复位
 */
function resetView() {
  //  设置照相机视口
  viewer.camera.setView({
    // destination: { "x": 1457.6517381888157, "y": -4392.558063021175, "z": 5275.5617493716745 },
    // orientation: {
    //   heading: 5.992310365676957, // 方向
    //   pitch: -1.4688832878206757, // 视角
    //   roll: 6.233906033558268,   // 倾斜角度
    // }
    destination: { "x": 1088.918662278305, "y": -3056.2641844789578, "z": 4262.43020502417 },
    orientation: {
      heading: 5.992310365676957, // 方向
      pitch: -1.4688832878206757, // 视角
      roll: 6.233906033558268,   // 倾斜角度
    }
  })
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
 *  画线
 */
function addLine() {
  const positions = cartesian3List.map(i => new Cesium.Cartesian3(i.x, i.y, i.z));
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
  });
}

// 放大
function zoomIn() {
  // viewer 为 Viewer 对象
  let position = viewer.camera.position;
  let cameraHeight = viewer.scene.globe.ellipsoid.cartesianToCartographic(position).height;
  // 每次缩小 20 倍，参数可改
  let moveRate = cameraHeight / 20.0;
  viewer.camera.moveForward(moveRate);
}
//缩小
function zoomOut() {
  // viewer 为 Viewer 对象
  let position = viewer.camera.position;
  let cameraHeight = viewer.scene.globe.ellipsoid.cartesianToCartographic(position).height;
  // 每次缩小 20 倍，参数可改
  let moveRate = cameraHeight / 20.0;
  viewer.camera.moveBackward(moveRate);
}
//  功能
function handAble(item) {
  console.log(item);
  switch (item.text) {
    case '标记': startMark.value = true; markNumber.value = 0; break;
    case '复位': resetView(); break;
    case '路径规划': addLine(); break;
    case '放大比例': zoomIn(); break;
    case '缩小比例': zoomOut(); break;
  }
}
</script>



<style lang="scss" scoped>
.map {
  //position: relative;
  //z-index: -1 !important;
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
.btn-list {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  .btn-list-item {
    cursor: pointer;
    margin: 0  30px;
    text-align: center;
    .btn-item-img {
      width: 93px;
      height: 93px;
      img {
        width: 100%;
        height: 100%;
      }
      margin-bottom: 8px;
    }
    .btn-text {
      color: #FFF;
      font-family: "PingFang SC";
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 137.5% */
    }
  }
}
</style>
