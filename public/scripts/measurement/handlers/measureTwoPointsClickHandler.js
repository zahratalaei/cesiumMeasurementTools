import * as Cesium from "cesium/Cesium";
import { getPosition } from "../../utiities/getPosition.js";
import { handleMouseMove } from "./handleMouseOver.js";
import {
  createPolyline,
  createHighlightedPolyline,
  updateLine,
} from "../../entities/createPolyline.js";
import { createLabel } from "../../entities/createLabel.js";
import { addMark } from "../../entities/addMark.js";
import {
  calculateDistance,
  getMidPoint,
} from "../../utiities/calculateDistance.js";
import { clearAllEntities } from "../../entities/clearAllEntities.js";
import { generateUniqueID } from "../../utiities/generateUniqueID.js";
import { viewer as viewerInstance } from "../../index.js";
// import { initializeHandlers } from "../../../measurement.js";
import { state } from "../../index.js";
let mouseMoveHandler = null;
let measurementComplete = false;
let id = null;


export function handleClick(click) {
  const viewer = viewerInstance;
  console.log(viewer);
  const handler  = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  
  viewer.selectedEntity = undefined;
  
  if (!measurementComplete) {
    if (!state.startPoint) {
      state.startPoint = getPosition(click.position);
      createPolyline();
      console.log("state.startPoint:", state.startPoint)
      id = generateUniqueID(state.startPoint);
      addMark(state.startPoint, id);
      mouseMoveHandler = handler.setInputAction((movement)=> handleMouseMove(movement), Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    } else if (!state.endPoint) {
      state.endPoint = getPosition(click.position);
      if (state.startPoint && state.endPoint) {
        if (state.polyline) {
          state.polyline.polyline.positions = [
            state.startPoint,
            state.endPoint,
          ];
        }
        state.distance = calculateDistance(state.startPoint, state.endPoint);
        console.log("state.endPoint:", state.endPoint)
        id = generateUniqueID(state.endPoint);
        
        addMark(state.endPoint, id);
        
        // Calculate the midpoint between start and middle points
        const midPoint = getMidPoint(state.startPoint, state.endPoint);
        // create label
        const label = createLabel(midPoint);
        viewer.entities.add(label);
        // Mark the measurement as complete
        measurementComplete = true;
        // Remove the mouse move handler after setting measurementComplete to true
        handler.removeInputAction(
          Cesium.ScreenSpaceEventType.MOUSE_MOVE,
          mouseMoveHandler
        );
      }
    }
  } else {
    // Remove the polyline entities and cleanup
    clearAllEntities(viewer, state);
    mouseMoveHandler = null;
    measurementComplete = false; // Reset the flag to allow new measurements
  }
}
