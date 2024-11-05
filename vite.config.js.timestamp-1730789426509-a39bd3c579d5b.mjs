// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/zsy/%E5%AD%A6%E4%B9%A0/cesium/gx-jyyj-screen-web/node_modules/.pnpm/vite@5.4.10_@types+node@22.8.5_sass@1.80.5/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/zsy/%E5%AD%A6%E4%B9%A0/cesium/gx-jyyj-screen-web/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.10_@types+node@22.8.5_sass@1.80.5__vue@3.5.12/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import cesium from "file:///D:/zsy/%E5%AD%A6%E4%B9%A0/cesium/gx-jyyj-screen-web/node_modules/.pnpm/vite-plugin-cesium@1.2.23_cesium@1.122.0_rollup@4.24.3_vite@5.4.10_@types+node@22.8.5_sass@1.80.5_/node_modules/vite-plugin-cesium/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/zsy/%E5%AD%A6%E4%B9%A0/cesium/gx-jyyj-screen-web/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    cesium()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    hot: true,
    open: true,
    port: 8080,
    // 设置反向代理，跨域
    proxy: {
      "/api1": {
        // 后台地址
        target: "http://127.0.0.1:8990/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, "")
      },
      "/geomap": {
        // 后台地址
        target: "http://127.0.0.1:8082/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/geomap/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx6c3lcXFxcXHU1QjY2XHU0RTYwXFxcXGNlc2l1bVxcXFxneC1qeXlqLXNjcmVlbi13ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHpzeVxcXFxcdTVCNjZcdTRFNjBcXFxcY2VzaXVtXFxcXGd4LWp5eWotc2NyZWVuLXdlYlxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovenN5LyVFNSVBRCVBNiVFNCVCOSVBMC9jZXNpdW0vZ3gtanl5ai1zY3JlZW4td2ViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuaW1wb3J0IGNlc2l1bSBmcm9tICd2aXRlLXBsdWdpbi1jZXNpdW0nXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxjZXNpdW0oKVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3Q6IHRydWUsXG4gICAgb3BlbjogdHJ1ZSxcbiAgICBwb3J0OiA4MDgwLFxuICAgIC8vIFx1OEJCRVx1N0Y2RVx1NTNDRFx1NTQxMVx1NEVFM1x1NzQwNlx1RkYwQ1x1OERFOFx1NTdERlxuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaTEnOiB7XG4gICAgICAgIC8vIFx1NTQwRVx1NTNGMFx1NTczMFx1NTc0MFxuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTI3LjAuMC4xOjg5OTAvJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaTEvLCAnJylcbiAgICAgIH0sXG4gICAgICAnL2dlb21hcCc6IHtcbiAgICAgICAgLy8gXHU1NDBFXHU1M0YwXHU1NzMwXHU1NzQwXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMjcuMC4wLjE6ODA4Mi8nLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvZ2VvbWFwLywgJycpXG4gICAgICB9XG4gICAgfSxcblxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVCxTQUFTLGVBQWUsV0FBVztBQUV4VixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFFaEIsT0FBTyxZQUFZO0FBTG9LLElBQU0sMkNBQTJDO0FBT3hPLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUFFLE9BQU87QUFBQSxFQUNmO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFFTixPQUFPO0FBQUEsTUFDTCxTQUFTO0FBQUE7QUFBQSxRQUVQLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsVUFBUSxLQUFLLFFBQVEsV0FBVyxFQUFFO0FBQUEsTUFDN0M7QUFBQSxNQUNBLFdBQVc7QUFBQTtBQUFBLFFBRVQsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxVQUFRLEtBQUssUUFBUSxhQUFhLEVBQUU7QUFBQSxNQUMvQztBQUFBLElBQ0Y7QUFBQSxFQUVGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
