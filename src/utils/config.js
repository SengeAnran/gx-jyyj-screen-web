const proConfig = {
  apiHost: "/api/screen",
  routerBase: "/screen",
  isLogin: true,
};

const devConfig = {
  apiHost: "/api",
  routerBase: "/",
  isLogin: false,
};

const config = process.env.VUE_APP_ENV === "production" ? proConfig : devConfig;

export default config;