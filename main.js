import { BasicScene } from "./components/BasicScene";
import { initWsClient } from './components/wsClient';
import { Math as ThreeMath } from "three";
import { Photosphere } from "./components/Photosphere";
import updateInfoBox from "./components/InfoBox";

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
const sphere = new Photosphere(scene, basicScene.render);

basicScene.onAnimationFrame(() => {
    updateInfoBox(_mobileDeviceOrientation);
    sphere.update(_mobileDeviceOrientation);
});