import { BasicScene } from "./components/BasicScene";
import { initWsClient } from './components/wsClient';
import { Math as ThreeMath } from "three";
import { AxesComponentHelper } from "./components/AxesComponentHelper";
import { DeviceOrientationHelper } from "./components/DeviceOrientationHelper";

const basicScene = new BasicScene();
basicScene.showGrid();

let _mobileDeviceOrientation = {
    alpha: 0,
    beta: 0,
    gamma: 0
};

const wsClient = initWsClient();

wsClient.onmessage = function (message) {
    const {alpha, beta, gamma} = JSON.parse(message.data).data;
    _mobileDeviceOrientation = {
        alpha: ThreeMath.degToRad(alpha),
        beta: ThreeMath.degToRad(beta),
        gamma: ThreeMath.degToRad(gamma)
    };
};

const scene = basicScene.scene;

const oHelper = new DeviceOrientationHelper(scene);
const zyHelper = new AxesComponentHelper({scene, origin:{x:-5, y:5,z:-10}, length:1});
const xyHelper = new AxesComponentHelper({scene, origin:{x:0, y:5,z:-10}, length:1});
const alphaBetaHelper = new AxesComponentHelper({scene, origin:{x:5, y:5,z:-10}, length:.5});
const alphaGammaHelper = new AxesComponentHelper({scene, origin:{x:10, y:5,z:-10}, length:.5});

const infoBox = document.getElementById('info');

const formatNumber = number => {
    number = Math.round(number*100)/100;
    if(number<0) {number=number+'';} else {number=' '+number;}
    number = number+'.00'.substr(0,5-number.length);

    return(number);
}

basicScene.onAnimationFrame(() => {
    // https://www.learnthreejs.com/device-orientation-gyroscope-controls-tutorial/
    
    const {alpha, beta, gamma} = _mobileDeviceOrientation;

    infoBox.innerHTML = `alpha:${formatNumber(alpha)}<br/>beta:${formatNumber(beta)}<br/>gamma:${formatNumber(gamma)}`;

    oHelper.update(_mobileDeviceOrientation);

    const newDir = oHelper.direction;

    // these helpers follow the camera
    zyHelper.update({...newDir, x:newDir.z, z:0}, basicScene.camera);
    xyHelper.update({...newDir,z:0}, basicScene.camera);
    alphaBetaHelper.update({x: alpha, y: beta, z: 0}, basicScene.camera);
    alphaGammaHelper.update({x: alpha, y: gamma, z: 0}, basicScene.camera);
});