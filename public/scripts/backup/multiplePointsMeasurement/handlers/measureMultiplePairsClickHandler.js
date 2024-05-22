import * as Cesium from 'cesium/Cesium'
import { viewer, scene ,state} from "../../index.js";
//import { getPosition } from "../../multiplePointSelection/utilities/getPosition";
import { getPosition } from "../../utiities/getPosition.js";
import { generateUniqueID } from "../../utiities/generateUniqueID.js";

import { createLine } from "../../entities/createPolyline.js";
let labels = []; // Array to hold all labels
let tempPolyline = null; // Temporary polyline for dynamic display

export function handleMouseMoveMultiPairs(movement) {
	if (state.selectedPoints.length > 0) {
		const middlePoint = getPosition(movement.endPosition, scene, state.selectedPointIDs);
		if (middlePoint) {
			if (tempPolyline) {
				viewer.entities.remove(tempPolyline);
			}
			tempPolyline =createLine(state.selectedPoints[state.selectedPoints.length - 1].position,
								middlePoint)

		}
	}
}
export function measureMultiplePairsClickHandler(click) {
	viewer.selectedEntity = undefined;

	const clickedPoint = getPosition(click.position, scene, state.selectedPointIDs);

	if (!clickedPoint) {
		console.log("No point clicked");
		return; // Ignore clicks on empty space
	}

	let uniqueID = generateUniqueID(clickedPoint);

	if (state.selectedPointIDs.includes(uniqueID)) {
		// If the point is already selected, de-select it
		const deselectedPointIndex = state.selectedPoints.findIndex(
			(point) => point.id === uniqueID
		);

		if (deselectedPointIndex !== -1) {
			viewer.entities.remove(state.selectedPoints[deselectedPointIndex].markerEntity);
			state.selectedPoints.splice(deselectedPointIndex, 1);

			// Remove the point's unique ID from the selectedPointIDs array
			state.selectedPointIDs = state.selectedPointIDs.filter((id) => id !== uniqueID);

			// Update polyline positions if state.polyline is defined
			if (state.polyline && state.polyline.polyline) {
				const polylinePositions = state.selectedPoints.map((point) => point.position);
				state.polyline.polyline.positions = polylinePositions;
				// state.polyline.polyline.depthFailMaterial = Cesium.Color.RED;
			}
			// Update labels
			labels.forEach((label) => viewer.entities.remove(label));
			labels = [];
			for (let i = 0; i < state.selectedPoints.length - 1; i++) {
				const startPoint = state.selectedPoints[i].position;
				const endPoint = state.selectedPoints[i + 1].position;
				const distance = Cesium.Cartesian3.distance(startPoint, endPoint);
				const midpoint = Cesium.Cartesian3.lerp(
					startPoint,
					endPoint,
					0.5,
					new Cesium.Cartesian3()
				);
				const label = viewer.entities.add({
					position: midpoint,
					label: {
						text: distance.toFixed(2) + " meters",
						font: "14px sans-serif",
						fillColor: Cesium.Color.BLACK,
						// outlineColor: Cesium.Color.BLACK,
						// outlineWidth: 2,
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						pixelOffset: new Cesium.Cartesian2(0, -20),
					},
				});
				labels.push(label);
			}
		}
	} else {
		// If the point is not selected, add it to the selectedPointIDs array
		state.selectedPointIDs.push(uniqueID);

		//Add marker to the selected point
		const markerEntity = viewer.entities.add({
			id: uniqueID,
			position: clickedPoint,
			point: {
				pixelSize: 7,
				color: Cesium.Color.YELLOW,
				//outlineColor: Cesium.Color.BLACK,
				//outlineWidth: 2,
				disableDepthTestDistance: Number.POSITIVE_INFINITY,
			},
		});
		//markerEntity = addMark(clickedPoint,uniqueID)
		state.selectedPoints.push({
			id: uniqueID,
			position: clickedPoint,
			markerEntity: markerEntity,
		});
		// Initialize polyline if it's not already
		if (!state.polyline) {
			state.polyline = viewer.entities.add({
				polyline: {
					positions: [],
					material: Cesium.Color.RED,
					width: 2,
					disableDepthTestDistance: Number.POSITIVE_INFINITY,
				},
			});
		}

		// Update polyline positions
		const polylinePositions = state.selectedPoints.map((point) => point.position);
		state.polyline.polyline.positions = polylinePositions;
		state.polyline.polyline.depthFailMaterial = Cesium.Color.RED;
		// Update labels
		labels.forEach((label) => viewer.entities.remove(label));
		labels = [];
		for (let i = 0; i < state.selectedPoints.length - 1; i++) {
			const startPoint = state.selectedPoints[i].position;
			const endPoint = state.selectedPoints[i + 1].position;
			const distance = Cesium.Cartesian3.distance(startPoint, endPoint);
			const midpoint = Cesium.Cartesian3.lerp(
				startPoint,
				endPoint,
				0.5,
				new Cesium.Cartesian3()
			);
			const label = viewer.entities.add({
				position: midpoint,
				label: {
					text: distance.toFixed(2) + " meters",
					font: "14px sans-serif",
					fillColor: Cesium.Color.BLACK,
					style: Cesium.LabelStyle.FILL_AND_OUTLINE,
					pixelOffset: new Cesium.Cartesian2(0, -20),
					disableDepthTestDistance: Number.POSITIVE_INFINITY,

				},
			});
			labels.push(label);
		}
	}
}
