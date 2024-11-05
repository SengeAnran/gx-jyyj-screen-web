
// 居中铺满

export function centerFull({ width: pageWidth, height: pageHeight }) {
  const screenWidth = window.innerWidth; // 获取窗口实际宽度
  const screenHeight = window.innerHeight; // 获取窗口实际高度
  document.body.style.width = `${pageWidth}px`; // 设置body宽带
  document.body.style.height = `${pageHeight}px`; // 设置body高度
  const ratioX = screenWidth / pageWidth; // 宽度比例
  const ratioY = screenHeight / pageHeight; // 高度比例

  document.body.style.transform = `scale(${ratioX}, ${ratioY})`; // 将页面缩放成屏幕大小， scale（x,y）定义 2D 缩放转换。
  window.globalScale && window.globalScale.setScale(ratioX, ratioY); // 当window存在globalScale属性，则执行window.globalScale.setScale(ratioX, ratioY)
  return {scaleX: ratioX, scaleY: ratioY}
}

// 等比例铺满
export function equalRatioFull({ width: pageWidth, height: pageHeight }) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  document.body.style.width = `${pageWidth}px`;
  document.body.style.height = `${pageHeight}px`;
  const ratioX = screenWidth / pageWidth;
  const ratioY = screenHeight / pageHeight;
  const scale = Math.min(ratioX, ratioY); //获得缩放比例比值最小的比例
  let offsetX = 0;
  let offsetY = 0;
  if (ratioX < ratioY) {
    offsetY = (screenHeight / ratioX - pageHeight) / 2;
  } else {
    offsetX = (screenWidth / ratioY - pageWidth) / 2;
  }
  document.body.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
}

// 无样式
export function none() {
  // document.body.style.width = `${pageWidth}px`;
  // document.body.style.height = `${pageHeight}px`;
}
