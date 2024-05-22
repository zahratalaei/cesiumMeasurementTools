import * as Cesium from "cesium";
import { handleClick } from "./tools/measurement/handlers/measureTwoPointsClickHandler.js";
import { handleMouseMove } from "./tools/measurement/handlers/handleMouseOver.js";
import { handleClickCurve } from "./tools/drawCurve/handlers/handleClickCurve.js";
import { clearAllEntities } from "./tools/entities/clearAllEntities.js";
import { createHighlightDiv } from "./tools/entities/createHighlightDiv.js";
import { updateButtonStyle } from "./tools/entities/updateStyles.js";
import {
	measureMultiplePairsClickHandler,
	handleMouseMoveMultiPairs,
} from "./tools/multiplePointsMeasurement/handlers/measureMultiplePairsClickHandler.js";
import { heightMeasurementClickHandler } from "./tools/heightMeasurement/handlers/heightMeasurementClickHandler.js";
import { handleMultiPointClick } from "./tools/multiplePointSelection/handlers/selectMultiplePointsClickHandler.js";
// import { viewerInstance as viewer} from "./CesiumMainNew.mjs";

// export const scene = viewer.scene;

let handler = null;
let moveHandler = null;
let activeMode = null;

export const state = {
	startPoint: null,
	endPoint: null,
	polyline: null,
	middlePoint: null,
	distance: null,
	highlightedPolyline: null,
	highlightDiv: createHighlightDiv(),
	selectedPoints: [], // Array to store selected points
	selectedPointIDs: [], // Array to store unique IDs of selected points
	polylineEntity: null, // Add this line
};

const modeConfigs = {
	1: {
		leftClick: handleClick,
		mouseMove: handleMouseMove,
		activeButton: "measurementButton",
	},
	2: {
		leftClick: handleMultiPointClick,
		mouseMove: null,
		activeButton: "multiPointButton",
	},
	3: {
		leftClick: measureMultiplePairsClickHandler,
		mouseMove: handleMouseMoveMultiPairs,
		activeButton: "multiPointMeasurementButton",
	},
	4: {
		leftClick: handleClickCurve,
		mouseMove: null,
		activeButton: "curveButton",
	},
	5: {
		leftClick: heightMeasurementClickHandler,
		mouseMove: null,
		activeButton: "heightButton",
	},
};

export function initializeHandlers(viewer) {
	if (handler === null) {
		handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	}
	if (moveHandler === null) {
		moveHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	}
}
function enableMode(modeType, viewer, shadowRoot) {
	initializeHandlers(viewer);
	if (activeMode !== modeType) {
		disableMode(viewer, handler, moveHandler, shadowRoot);
		const modeConfig = modeConfigs[modeType];
		if (modeConfig.leftClick) {
			handler.setInputAction(modeConfig.leftClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		}

		if (modeConfig.mouseMove) {
			moveHandler.setInputAction(
				modeConfig.mouseMove,
				Cesium.ScreenSpaceEventType.MOUSE_MOVE
			);
		}

		updateButtonStyle(modeConfig.activeButton, "#242526", "#FFFFFF", shadowRoot);
		activeMode = modeType;
	} else {
		disableMode(viewer, handler, moveHandler, shadowRoot);
	}
}
function disableMode(viewer, handler, moveHandler, shadowRoot) {
	if (activeMode !== null) {
		const currentModeConfig = modeConfigs[activeMode];
		handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		if (currentModeConfig.mouseMove) {
			moveHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		}
		clearAllEntities(viewer, state);
		updateButtonStyle(currentModeConfig.activeButton, "", "", shadowRoot);
		activeMode = null;
	}
}

function disableAllModes(viewer, handler, moveHandler, shadowRoot) {
	disableMode(viewer, handler, moveHandler, shadowRoot);
}

export function handleMeasurementButtonClick(viewer, shadowRoot) {
	//disableAllModes(viewer, handler, moveHandler)
	enableMode(1, viewer, shadowRoot);
}

export function handleMultiPointButtonClick(viewer, shadowRoot) {
	// disableAllModes(viewer, handler, moveHandler)
	enableMode(2, viewer, shadowRoot);
}

export function handleMultiPointMeasurementButtonClick(viewer, shadowRoot) {
	// disableAllModes(viewer, handler, moveHandler)
	enableMode(3, viewer, shadowRoot);
}

export function handleCurveButtonClick(viewer, shadowRoot) {
	// disableAllModes(viewer, handler, moveHandler)
	enableMode(4, viewer, shadowRoot);
}

export function handleHeightButtonClick(viewer, shadowRoot) {
	// disableAllModes(viewer, handler, moveHandler)
	enableMode(5, viewer, shadowRoot);
}

