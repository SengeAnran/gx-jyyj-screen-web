import './assets/main.css'
import "cesium/Build/Cesium/Widgets/widgets.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(createPinia())
app.use(router)

app.mount('#app')
