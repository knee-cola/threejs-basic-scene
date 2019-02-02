import { BasicScene } from "./components/BasicScene";
import { initWsClient } from './components/wsClient';
import { Vector3, Quaternion, Math as ThreeMath, Euler } from "three";
import { AxesComponentHelper } from "./components/AxesComponentHelper";
import { DeviceOrientationHelper } from "./components/DeviceOrientationHelper";
import { ColladaElf } from "./components/ColladaElf";
import { Photosphere } from "./components/Photosphere";
import { VectorArrow } from "./components/VectorArrow";
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

//const oHelperEuler = new DeviceOrientationHelper(scene);
//const oHelperQuaternion = new DeviceOrientationHelper(scene, {color: 0x00AEB7, length:100, direction:new Vector3( 150, -1, 0 ), origin:new Vector3( 150, 0, 0 )});
//const alphaBetaHelper = new AxesComponentHelper({scene, origin:{x:5, y:5,z:-10}, length:.5});
//const alphaGammaHelper = new AxesComponentHelper({scene, origin:{x:10, y:5,z:-10}, length:.5});

// const elf = new ColladaElf(scene);
// const elf_mirror = new ColladaElf(scene, 200);
const sphere = new Photosphere(scene, basicScene.render);

// jako korisno jer prikazuje 2 vektora: naprijed i gore
const vArrow = new VectorArrow({scene});

const mirrorQ = new Quaternion();

basicScene.onAnimationFrame(() => {
    // https://www.learnthreejs.com/device-orientation-gyroscope-controls-tutorial/
    
    const {alpha, beta, gamma} = _mobileDeviceOrientation;
    updateInfoBox(_mobileDeviceOrientation);

    // oHelperQuaternion.updateViaQuaternion(_mobileDeviceOrientation);
//    oHelperEuler.updateViaEuler(_mobileDeviceOrientation);

    vArrow.update(_mobileDeviceOrientation);

    //sphere.update({alpha, beta, gamma});
    sphere.updateQuaternion(vArrow.q0, vArrow.q1);

//    // mirroring quaternion
//    mirrorQ.copy(oHelperQuaternion.quaternion);
//    mirrorQ.x *= 1;
//    mirrorQ.y *= -1;
//    mirrorQ.z *= -1;
//
//    elf_mirror.updateQuaternion(mirrorQ);


    // these helpers follow the camera
//    alphaBetaHelper.update({x: alpha, y: beta, z: 0}, basicScene.camera);
//    alphaGammaHelper.update({x: alpha, y: gamma, z: 0}, basicScene.camera);
});