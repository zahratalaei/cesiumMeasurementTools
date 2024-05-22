import * as Cesium from 'cesium/Cesium'
import { scene, state } from "../index.js";
export function getPosition(position) {
	const pickedObject = scene.pick(position,1,1);
	if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
		if (pickedObject.id && state.selectedPointIDs.includes(pickedObject.id.id)) {
			return pickedObject.id.position._value; // Notice the change here
		}
		const point = scene.pickPosition(position);
		if (Cesium.defined(point)) {
			const cartographic = Cesium.Cartographic.fromCartesian(point);
			const lng = Cesium.Math.toDegrees(cartographic.longitude);
			const lat = Cesium.Math.toDegrees(cartographic.latitude);
			const height = cartographic.height;
			const pointToCartesian = Cesium.Cartesian3.fromDegrees(lng, lat, height);
			return pointToCartesian;
		}
	}
	return null;
}
