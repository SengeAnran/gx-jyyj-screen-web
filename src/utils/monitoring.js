// 埋点信息
export function recordUserInfo(userInfo) {
  if (!window.origin.includes("jqy.zjagri.cn")) { // 正式服才执行后面的
    return;
  }
  const { userId = "", regionCode = "", regionName = "" } = userInfo;
  var el = document.createElement("script");
  el.src = " https://jk.zjagri.cn/monitoring.js";
  el.id = "xcdn_monitoring";
  const option = {
    siteId: "9", //站点编号，联系乡村大脑技术支持提供
    appId: "99197912281514104", //应用编码，联系乡村大脑技术支持提供
    userId, //用户唯一ID，登陆后获取，未登录为空
    //访问来源，ZZD、ZLB、XCDN、PC，三项中的其中一项；ZZD（浙政钉）、ZLB（浙里办）、XCDN（乡村大脑）、PC（电脑端）
    sourceType: "XCDN", //访问来源
    regionCode, //用户所在地区编码
    regionName, //用户所在地区名称（中文）
  };
  el.setAttribute("option", JSON.stringify(option));
  const ref = document.getElementsByTagName("script")[0];
  ref.parentNode.insertBefore(el, ref);
}

export function recordPath(to, from) {
  if (!window.origin.includes("jqy.zjagri.cn")) { // 正式服才执行后面的
    return;
  }
  if (to.path && to.path != from.path && from.path != "/") {
    try {
      //重点：执行monitoring.js暴露出来的hashChange方法
      // eslint-disable-next-line no-undef
      jk && jk.hashChange(to.fullPath);
    } catch (err) {
      console.error("错误：未执行监控统计");
    }
  }
}
