
export function clearAllEntities(viewer,state){
    viewer.entities.removeAll();
    state.startPoint = null;
    state.endPoint = null;
    state.polyline = null;
    state.middlePoint = null;
    state.distance = null;
    state.highlightedPolyline = null;
    state.highlightDiv.style.display = "none";
    state.selectedPoints = [];
    state.selectedPointIDs = [];
    console.log("state:", state)
  }