import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import cesium from 'vite-plugin-cesium'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),cesium()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    hot: true,
    open: true,
    port: 8080,
    // 设置反向代理，跨域
    proxy: {
      '/api': {
        // 后台地址
        target: 'http://192.168.0.117:8081/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/geomap': {
        // 后台地址
        target: 'http://127.0.0.1:8082/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/geomap/, '')
      }
    },

  }
})
