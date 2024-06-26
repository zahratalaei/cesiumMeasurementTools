import * as Cesium from 'cesium/Cesium'
import { state } from '../index.js';
import { viewer as viewerInstance } from '../index.js';
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
    viewerInstance.entities.add(state.polyline);
  }
}
export function createLine(p1,p2) {
// const viewer = viewerInstance;
  if (polylineEntity) {
    viewerInstance.entities.remove(polylineEntity);
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
    viewerInstance.entities.add(polylineEntity);
  // }
}
  
