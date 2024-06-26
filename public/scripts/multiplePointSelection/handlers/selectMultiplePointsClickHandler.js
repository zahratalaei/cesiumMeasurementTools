import { addMark } from "../../entities/addMark.js";
import { state } from "../../index.js";
import {viewer as viewerInstance } from '../../index.js';

import { getPosition } from "../../utiities/getPosition.js";
import { generateUniqueID } from "../../utiities/generateUniqueID.js";

export function handleMultiPointClick(click) {

  const viewer= viewerInstance;
  const clickedPoint = getPosition(click.position);
  console.log("clickedPoint:", clickedPoint)
  
  if (!clickedPoint) {
    return; // Ignore clicks on empty space
  }

  let uniqueID = generateUniqueID(clickedPoint);
  console.log("uniqueID:", uniqueID)
 
  if (state.selectedPointIDs.includes(uniqueID)) {
    console.log("selectedPoint");
    // If the point is already selected, de-select it
    const deselectedPointIndex = state.selectedPoints.findIndex(
      (point) => point.id === uniqueID
    );


    if (deselectedPointIndex !== -1) {
        console.log(state.selectedPoints);
      viewer.entities.remove(state.selectedPoints[deselectedPointIndex].markerEntity);
      state.selectedPoints.splice(deselectedPointIndex, 1);
      console.log("state.selectedPoints:", state.selectedPoints)

      // Remove the point's unique ID from the selectedPointIDs array
      state.selectedPointIDs = state.selectedPointIDs.filter((id) => id !== uniqueID);
      const deselectedPoint = viewer.entities.getById(uniqueID);
    if (deselectedPoint) {
      viewer.entities.remove(deselectedPoint);
    }
      
    }
  } else {
    console.log("newPoint");
    // If the point is not selected, add it to the selectedPointIDs array
    state.selectedPointIDs.push(uniqueID);
    console.log("state.selectedPointIDs:", state.selectedPointIDs)

    // Add marker to the selected point
    const markerEntity = addMark(clickedPoint,uniqueID)
viewer.selectedEntity = undefined;
    state.selectedPoints.push({
      id: uniqueID,
      position: clickedPoint,
      markerEntity: markerEntity,
    });
    console.log("state.selectedPoints:", state.selectedPoints)
  }
}
