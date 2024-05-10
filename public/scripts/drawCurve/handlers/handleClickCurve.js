import * as Cesium from 'cesium/Cesium'
import { viewer,state } from "../../index.js";
import { getPosition } from "../../utiities/getPosition.js";
import { addMark } from "../../entities/addMark.js";
import { generateUniqueID } from "../../utiities/generateUniqueID.js";
let points = []; // Array to store the picked points
let middlePoint = null;
let startPoint=null;
let endPoint=null;
let drawComplete = false;
// Add this line to import the CatmullRomSpline class
const CatmullRomSpline = Cesium.CatmullRomSpline;



function drawCurve() {
    if (points.length === 3) {
         startPoint = points[0];
         middlePoint = points[1];
         endPoint = points[2];

        const curve = new CatmullRomSpline({
            times: [0, 0.5, 1],
            points: [startPoint, middlePoint, endPoint],
        });

        const curvePositions = [];
        const numSamples = 100;
        for (let i = 0; i <= numSamples; i++) {
            const time = i / numSamples;
            curvePositions.push(curve.evaluate(time));
        }

        // Create a polyline with the curve positions
        viewer.entities.add({
            polyline: {
                positions: curvePositions,
                material: Cesium.Color.RED,
                width: 3,
                depthFailMaterial: Cesium.Color.RED,
            },
        });

        // Clear the points array for the next measurement
        points = [];
        drawComplete = true;
    }
}


export function handleClickCurve(click) {
    viewer.selectedEntity = undefined;
    if (!drawComplete) {
        const point = getPosition(click.position);

        if (point) {
            points.push(point);

            addMark(point, generateUniqueID(point));

            if (points.length === 3) {
                // Draw the curve after picking three points
                drawCurve();
            }
        }
    } else {
        // Remove entities and cleanup
        viewer.entities.removeAll();
        
        drawComplete = false; // Reset the flag to allow new measurements
    }
}
//handler.setInputAction(handleClickCurve, Cesium.ScreenSpaceEventType.LEFT_CLICK);
// ***if you want to keep more curve at the same time, delete drawComplete flag***