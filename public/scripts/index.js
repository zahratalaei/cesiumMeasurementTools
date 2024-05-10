import * as Cesium from 'cesium/Cesium'
import { ceisumSetup } from "./cesiumSetup.js";
import { handleClick } from "./measurement/handlers/measureTwoPointsClickHandler.js";
import { handleMouseMove } from "./measurement/handlers/handleMouseOver.js";
import { handleClickCurve } from "./drawCurve/handlers/handleClickCurve.js";
import { clearAllEneities } from "./entities/clearAllEntities.js";
import { createHighlightDiv } from "./entities/createHighlightDiv.js";
import { updateButtonStyle } from "./entities/updateStyles.js";
import { measureMultiplePairsClickHandler, handleMouseMoveMultiPairs } from "./multiplePointsMeasurement/handlers/measureMultiplePairsClickHandler.js";
import { heightMeasurementClickHandler } from "./heightMeasurement/handlers/heightMeasurementClickHandler.js";
//initialization of the viewer
export const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain({
    requestVertexNormals: true,
    requestWaterMask: true,
    selectionIndicator: false,
    terrain: Cesium.Terrain.fromWorldTerrain(),
    infoBox:false
  }),
});
export const scene = viewer.scene;
// remove Cesium ion logo
viewer.cesiumWidget._creditContainer.style.display = 'none';
ceisumSetup();

const moveHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
export const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
let handleMultiPointClick = null;
let activeMode = null;

export const state = {
  startPoint: null,
  endPoint: null,
  polyline: null,
  middlePoint: null,
  distance: null,
  highlightedPolyline: null,
  highlightDiv : createHighlightDiv(),
  selectedPoints : [], // Array to store selected points
  selectedPointIDs :[], // Array to store unique IDs of selected points
  polylineEntity: null, // Add this line
  // line:null,
};

viewer.container.appendChild(state.highlightDiv);
// Function to handle the measurement mode
function enableMeasurementMode() {
  // Update the boolean flag for measurement mode
  activeMode = 1;
  // clear All entities
  clearAllEneities(viewer,state);

  handler.setInputAction(handleClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  moveHandler.setInputAction(handleMouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  updateButtonStyle('measurementButton', '#242526','#FFFFFF');
  updateButtonStyle('multiPointButton', '','');
  updateButtonStyle('CurveButton', '','');
  updateButtonStyle('MultiPointMeasurmentButton', '','');
  }

function disableMeasurementMode() {
   // Update the boolean flag for measurement mode
   activeMode = null;

  handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  moveHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);


  updateButtonStyle('measurementButton', '','');
  
  // clear All entities
  clearAllEneities(viewer,state);

}


// Function to handle the multi-point selection mode (initially empty)
async function enableMultiPointSelectionMode() {
  // Update the boolean flag for multi-point selection mode
  activeMode = 2;
  // Dynamic import of handleClickMultiplePoint
  const { handleMultiPointClick: multiPointClickHandler } = await import("./multiplePointSelection/handlers/selectMultiplePointsClickHandler.js");
  handleMultiPointClick = multiPointClickHandler; 
  // clear All entities
  clearAllEneities(viewer,state);

  handler.setInputAction(handleMultiPointClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  updateButtonStyle('multiPointButton', '#242526','#FFFFFF');
  updateButtonStyle('measurementButton', '','');
  updateButtonStyle('CurveButton', '','');
  updateButtonStyle('MultiPointMeasurmentButton', '','');
}

// Function to disable multi-point selection mode
function disableMultiPointSelectionMode() {
  // Update the boolean flag for multi-point selection mode
  activeMode = null;
  // clear All entities
  clearAllEneities(viewer,state);

  //Disable multi-point selection mode if it was previously active
  handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  handleMultiPointClick = null;
  updateButtonStyle('multiPointButton', '');
}

// Function to handle the multi-point selection mode (initially empty)
async function enableMultiPointMeasurmentMode() {
  // clear All entities
  clearAllEneities(viewer,state);
  // Update the boolean flag for multi-point selection mode
  activeMode = 3;
  
  handler.setInputAction(handleMouseMoveMultiPairs, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  handler.setInputAction(measureMultiplePairsClickHandler, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  updateButtonStyle('multiPointButton', '','');
  updateButtonStyle('measurementButton', '','');
  updateButtonStyle('CurveButton', '','');
  updateButtonStyle('MultiPointMeasurmentButton', '#242526','#FFFFFF');
}

// Function to disable multi-point selection mode
function disableMultiPointMeasurmentMode() {
  // Update the boolean flag for multi-point selection mode
  activeMode = null;
  // clear All entities
  clearAllEneities(viewer,state);

  //Disable multi-point selection mode if it was previously active
  handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  
  updateButtonStyle('MultiPointMeasurmentButton', '');
}

// Function to handle the draw curve mode
function enableDrawCurveMode() {
  // Update the boolean flag for measurement mode
  activeMode = 4;
  // clear All entities
  clearAllEneities(viewer,state);

  handler.setInputAction(handleClickCurve, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  //moveHandler.setInputAction(handleMouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  updateButtonStyle('CurveButton', '#242526','#FFFFFF');
  updateButtonStyle('measurementButton', '','');
  updateButtonStyle('multiPointButton', '','');
  updateButtonStyle('MultiPointMeasurmentButton', '','');
}

function disableDrawCurveMode() {
   // Update the boolean flag for draw curve  mode
   activeMode = null;

  handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  //moveHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);


  updateButtonStyle('CurveButton', '','');
  
  // clear All entities
  clearAllEneities(viewer,state);
}

//disable all modes
function disableAllModes() {
  disableMeasurementMode();
  disableMultiPointSelectionMode();
  disableDrawCurveMode();
  disableMultiPointMeasurmentMode();
}
// Function to handle the heigh measurement mode
function enableHeightMeasurementMode() {
  // Update the boolean flag for measurement mode
  activeMode = 5;
  // clear All entities
  clearAllEneities(viewer,state);

  handler.setInputAction(heightMeasurementClickHandler, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  //moveHandler.setInputAction(handleMouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


  updateButtonStyle('HeightButton', '#242526','#FFFFFF');
  updateButtonStyle('CurveButton', '','');
  updateButtonStyle('measurementButton', '','');
  updateButtonStyle('multiPointButton', '','');
  updateButtonStyle('MultiPointMeasurmentButton', '','');
}

function disableHeightMeasurementMode() {
   // Update the boolean flag for draw curve  mode
   activeMode = null;

  handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  //moveHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);


  updateButtonStyle('HeightButton', '','');
  
  // clear All entities
  clearAllEneities(viewer,state);
}


// Event listener for the measurement button
document.getElementById("measurementButton").addEventListener("click", function () {
  if (activeMode !==1) {
    disableAllModes();
    // Switching to measurement mode
    enableMeasurementMode();
    // disableMultiPointSelectionMode();
  } else {
    // If clicked again, remove the mode
     disableMeasurementMode();
  }
});

// Event listener for the multi-point selection button (initially empty)
document.getElementById("multiPointButton").addEventListener("click", async function () {
  if (activeMode !==2) {
    disableAllModes();
    // Switching to multi-point mode
    enableMultiPointSelectionMode();
    // disableMeasurementMode();
  } else {
    // If clicked again, remove the mode
    disableMultiPointSelectionMode();

  }
});
// Event listener for the multi-point selection button (initially empty)
document.getElementById("MultiPointMeasurmentButton").addEventListener("click", async function () {
  if (activeMode !==3) {
    disableAllModes();
    // Switching to multi-point mode
    enableMultiPointMeasurmentMode();
    // disableMeasurementMode();
  } else {
    // If clicked again, remove the mode
    disableMultiPointMeasurmentMode();

  }
});
// Event listener for the curve button (initially empty)
document.getElementById("CurveButton").addEventListener("click", async function () {
  if (activeMode!==4) {
    disableAllModes();
    // Switching to multi-point mode
    enableDrawCurveMode();
    // disableMeasurementMode();
  } else {
    // If clicked again, remove the mode
    disableDrawCurveMode();

  }
});
// Event listener for the Height button (initially empty)
document.getElementById("HeightButton").addEventListener("click", async function () {
  if (activeMode!==5) {
    disableAllModes();
    // Switching to multi-point mode
    enableHeightMeasurementMode();
    // disableMeasurementMode();
  } else {
    // If clicked again, remove the mode
    disableHeightMeasurementMode();

  }
});
