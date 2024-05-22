import { viewer } from "../index.js";
import * as Cesium from 'cesium/Cesium'

//Add mark to the selected point
export function addMark(position, id) {
    viewer.entities.add({
        id:id,
        position: position,
        point: {
            pixelSize: 7,
            color: Cesium.Color.YELLOW,
            // outlineColor: Cesium.Color.BLACK,
            //outlineWidth: 2,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
    });
}
