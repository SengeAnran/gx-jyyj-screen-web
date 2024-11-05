/**
 * @desc 阿里云oss图片按比例缩放
 */
export function getOSSImgResize(src, height) {
  const ossFlag = src.includes("oss-cn");
  const h = height ? parseInt(height, 10) : 300;
  return ossFlag
    ? `${src}?x-oss-process=image/resize,h_${h},m_lfit,limit_0`
    : src;
}