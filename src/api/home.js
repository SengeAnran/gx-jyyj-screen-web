import service from '../utils/request';
const pathStr = ''
export function savePath(data) {
  return service({
    url: pathStr + "/mountain/save",
    method: "post",
    data,
  })
}
export function findClosestRoutePoints(data) {
  return service({
    url: pathStr + "/mountain/find",
    method: "post",
    data,
  })
}
