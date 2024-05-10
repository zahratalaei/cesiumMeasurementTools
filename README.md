# cesiumMeasureTools
- [cesiumMeasureTools](#cesiummeasuretools)
  - [How to run it locally](#how-to-run-it-locally)
  - [Quick Try](#quick-try)
  - [Description](#description)
  - [Issue](#issue)
  - [Notes](#notes)

## How to run it locally

**Local install instruction**

1. Clone the project using git enter `git clone link`
2. Open terminal on the file and enter `npm install` to install packages
3. Create a `.env` file in the root directory, copy and paste content from `.env.example` to `.env` and remove its comment
4. `npm run dev` to run the project locally
5. If browser didn't start, enter manually `localhost:8080` on your browser to see the webpage
   
**Note**: add `import * as Cesium from 'cesium/Cesium';` to any files which uses Cesium.

**Pull work from github branch**
To pull work from branches follow the instructions:
-   To pull dev-eric branch to see the result:
    run this in bash terminal:
    1. `git checkout -b dev-eric` to create local dev-eric branch, it will automatically change to dev-eric after create
    2. `git branch` to see if you are at `dev-eric` branch
    3. `git pull origin dev-eric` to pull work of dev-eric from github to local
    4. now you can see dev-eric work, to see the result repeat **_local install instruction_ step 1 - 5**

-   To pull dev-zahra branch to see the result:
    run this in bash terminal:
    1. `git checkout -b dev-zahra` to create local dev-zahra branch, it will automatically change to dev-zahra after create
    2. `git branch` to see if you are at dev-zahra branch
    3. `git pull origin dev-zahra` to pull work of dev-zahra from github to local
    4. now you can see dev-zahra work, to see the result repeat **_local install instruction_ step 1 - 5**

## Quick Try

**Cesium sandcastle**: https://sandcastle.cesium.com/

For **dev-eric branch**:
copy the js code of the following file and paste it to https://sandcastle.cesium.com/ to see the work. Each one of the file represent a feature.

-   [Two points distance measure](https://github.com/cognitive-earth/cesiumMeasureTools/blob/dev-eric/public/scripts/cesiumSandcastle03MeasureDistance3d.js)
-   [Multipick points](https://github.com/cognitive-earth/cesiumMeasureTools/blob/dev-eric/public/scripts/cesiumSandcastle04multiPicks.js)
-   [Measure height/ground clearance](https://github.com/cognitive-earth/cesiumMeasureTools/blob/dev-eric/public/scripts/cesiumSandcastle05groundClearance.js)
-   [Three points picked to draw curve](https://github.com/cognitive-earth/cesiumMeasureTools/blob/dev-eric/public/scripts/cesiumSandcastle06curveline3points.js)
-   [Measure multiple points distance](https://github.com/cognitive-earth/cesiumMeasureTools/blob/dev-eric/public/scripts/cesiumSandcastle07MeasureMultiDistance.js)

For **dev-zahra branch**:
...

## Description
This is a measurement tools for CesiumJS

- **Tasks 1**: Provide javascript for cesiumjs that allows to measure between two picked points.
- **Tasks 2**: Provide javascript for cesiumjs that allows to pick points on map
- **Tasks 3**: Provide javascript for cesiumjs that allows user to pick three points to draw a curve line 
- **Extra 1**: Provide javascript for cesiumjs that allows user to measure height for the object' height to the ground
- **Extra 2**: Provide javascript for cesiumjs that allows user to measure multiple points distance
___

## Issue

- Issue 1: 
     - Description: Mac user may encounter line jettering/jumping issue. 
     - Solution: install chrome carnary - chrome latest beta version
     - run this commend in terminal: `/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --user-data-dir=/tmp/c1 --use-cmd-decoder=passthrough --use-angle=metal`
- Issue 2:
___
## Notes

Functions are wrapped into different module. 
- Try Cesium: https://sandcastle.cesium.com/
- Learn Cesium: https://cesium.com/learn/cesiumjs-learn/
- For quick try, please see [Quick Try](#quick-try)
