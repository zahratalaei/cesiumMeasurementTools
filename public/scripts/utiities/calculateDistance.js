import * as Cesium from 'cesium/Cesium'
export function calculateDistance(point1, point2) {
    return Cesium.Cartesian3.distance(point1, point2);
  }
export function getMidPoint(point1,point2){
  return Cesium.Cartesian3.lerp(
    point1,
    point2,
    0.5,
    new Cesium.Cartesian3()
  );
}