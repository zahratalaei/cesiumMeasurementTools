import * as Cesium from 'cesium/Cesium'
import { state } from "../index.js";
export function createLabel(midPoint) {
    // Add a label entity to the polyline
    const label = new Cesium.Entity({
      position: midPoint,
      label: {
        text: state.distance.toFixed(2) + " meters",
        font: "14px sans-serif",
        fillColor: Cesium.Color.BLACK,
        // outlineColor: Cesium.Color.BLACK,
        // outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, -20),
        // showBackground: true,
        // backgroundColor: Cesium.Color.BLACK,
        // disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
    });
    return label;
  }