import { addMark } from "../../entities/addMark.js";
import { viewer,state } from "../../index.js";
import { getPosition } from "../../utiities/getPosition.js";
import { generateUniqueID } from "../../utiities/generateUniqueID.js";

export function handleMultiPointClick(click) {
  const clickedPoint = getPosition(click.position);
  
  if (!clickedPoint) {
    return; // Ignore clicks on empty space
  }

  let uniqueID = generateUniqueID(clickedPoint);

  if (state.selectedPointIDs.includes(uniqueID)) {
    
    // If the point is already selected, de-select it
    const deselectedPointIndex = state.selectedPoints.findIndex(
      (point) => point.id === uniqueID
    );

    if (deselectedPointIndex !== -1) {
        console.log(state.selectedPoints);
      viewer.entities.remove(state.selectedPoints[deselectedPointIndex].markerEntity);
      state.selectedPoints.splice(deselectedPointIndex, 1);

      // Remove the point's unique ID from the selectedPointIDs array
      state.selectedPointIDs = state.selectedPointIDs.filter((id) => id !== uniqueID);
      const deselectedPoint = viewer.entities.getById(uniqueID);
    if (deselectedPoint) {
      viewer.entities.remove(deselectedPoint);
    }
      
    }
  } else {
    // If the point is not selected, add it to the selectedPointIDs array
    state.selectedPointIDs.push(uniqueID);

    // Add marker to the selected point
    const markerEntity = addMark(clickedPoint,uniqueID)
viewer.selectedEntity = undefined;
    state.selectedPoints.push({
      id: uniqueID,
      position: clickedPoint,
      markerEntity: markerEntity,
    });
  }
}
