import { createLabel } from "../../entities/createLabel.js";
import { createPolyline } from "../../entities/createPolyline.js";
import { calculateDistance, getMidPoint } from "../../utiities/calculateDistance.js";
import { getPosition } from "../../utiities/getPosition.js";
import { state } from "../../index.js";
import * as Cesium from 'cesium/Cesium';
// import { viewerInstance as viewer} from '../../../CesiumMainO.mjs';
import { viewer as viewerInstance } from "../../index.js";
let labelEntity = null;
let movingPoint = null;

export function handleMouseMove(movement) {
  const viewer = viewerInstance;
  if(!state.endPoint){
    state.middlePoint = getPosition(movement.endPosition);
  }

  // Add hover highlighting
  const pickedObject = viewer.scene.pick(movement.endPosition);
  if (Cesium.defined(pickedObject)) {
    movingPoint = getPosition(movement.endPosition);
   
    if (movingPoint) {
      // Position the highlight div over the point and show it
      state.highlightDiv.style.left = `${movement.endPosition.x-3}px`;
      state.highlightDiv.style.top = `${movement.endPosition.y-3}px`;
      
      state.highlightDiv.style.display = "block";
    }
  } else {
    // Hide the highlight div
    state.highlightDiv.style.display = "none";
  }

  // Check if middlePoint is not null before setting polyline.positions
  if (!state.middlePoint , state.polyline) {
    // createPolyline()
    
    state.polyline.positions = new Cesium.CallbackProperty(()=>{
      return [state.startPoint, state.middlePoint]
    }, false);
  }

  // Perform distance calculation if both start and middle points are defined
  if (state.startPoint && state.middlePoint) {
      state.distance = calculateDistance(state.startPoint,state.middlePoint)

    // Calculate the midPoint between start and middle points
    const midPoint = getMidPoint(state.startPoint,state.middlePoint)
    
    //create labelEntity
    labelEntity = createLabel(midPoint)
    
    if (!state.polyline.labelEntity) {
      // Add the label entity to the viewer entities if it doesn't exist


      viewer.entities.add(labelEntity);
      state.polyline.labelEntity = labelEntity;
    } else {
      // Update the label entity position and text if it exists
      state.polyline.labelEntity.position = midPoint;
      state.polyline.labelEntity.label.text =
      state.distance.toFixed(1) + " m";
    }
  }
}