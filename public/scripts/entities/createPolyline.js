import { state,viewer } from "../index.js";
import * as Cesium from 'cesium/Cesium'

let polylineEntity = null;
export function createPolyline() {
  if (!state.polyline) {
    // Create a new Entity for the polyline
    state.polyline = new Cesium.Entity({
      polyline: {
        positions: new Cesium.CallbackProperty(function () {
          return [state.startPoint, state.middlePoint].filter(
            (position) => position !== null
          );
        }, false),
         material: Cesium.Color.RED,
        width: 2,
        depthFailMaterial: Cesium.Color.RED,
        // depthTestAgainstTerrain: false,

      },
    });

    // Add the polyline entity to the viewer.entities collection
    viewer.entities.add(state.polyline);
  }
}
export function createLine(p1,p2) {
  if (polylineEntity) {
    viewer.entities.remove(polylineEntity);
}

    // Create a new Entity for the polyline
     polylineEntity = new Cesium.Entity({
      polyline: {
        positions: new Cesium.CallbackProperty(function () {
          return [p1, p2].filter(
            (position) => position !== null
          );
        }, false),
         material: Cesium.Color.RED,
        width: 2,
        depthFailMaterial: Cesium.Color.RED,
        // depthTestAgainstTerrain: false,

      },
    });

    // Add the polyline entity to the viewer.entities collection
    viewer.entities.add(polylineEntity);
  // }
}
  
