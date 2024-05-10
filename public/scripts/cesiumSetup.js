import * as Cesium from 'cesium/Cesium';
import { viewer } from "./index.js";

export async function ceisumSetup() {
    viewer.scene.camera.flyTo({
        destination: new Cesium.Cartesian3(
            4401744.644145314,
            225051.41078911052,
            4595420.374784433
        ),
        orientation: new Cesium.HeadingPitchRoll(
            5.646733805039757,
            -0.276607153839886,
            6.281110875400085
        ),
    });

    try {
        const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(16421);
        tileset.style = new Cesium.Cesium3DTileStyle();
        tileset.style.pointSize = "5";
        viewer.scene.primitives.add(tileset);
    } catch (error) {
        console.log(`Error with tileset: ${error}`);
    }
}
