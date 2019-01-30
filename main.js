import { BasicScene } from "./components/BasicScene";
import { Mesh, SphereGeometry, MeshPhongMaterial, SmoothShading, ArrowHelper, Vector3, Euler, Math as ThreeMath } from "three";
import {initWsClient} from './components/wsClient';
import {log} from './components/logger';
import { AxesComponentHelper } from "./components/AxesComponentHelper";

const basicScene = new BasicScene();
basicScene.showGrid();

let mobileDeviceOrientation = {
    alpha: 0,
    beta: 0,
    gamma: 0
};

const makeArrow =({color, dir, length, headLength, headWidth}) => {

    var origin = new Vector3( 0, 0, 0 );
    dir = dir || new Vector3( 0, 0, 0 );
    dir.normalize(); //normalize the direction vector (convert to vector of length 1)
    
    length = length !== void 0 ? length : 100;
    headLength = headLength!==void 0 ? headLength : length/5;
    headWidth  = headWidth !==void 0 ? headWidth : length/10;
    
    var arrowHelper = new ArrowHelper( dir, origin, length, color, headLength, headWidth );
    basicScene.add( arrowHelper );

    return(arrowHelper);
}

const wsClient = initWsClient();

wsClient.onmessage = function (message) {
    const {alpha, beta, gamma} = JSON.parse(message.data).data;
    mobileDeviceOrientation = {
        alpha: ThreeMath.degToRad(alpha),
        beta: ThreeMath.degToRad(beta),
        gamma: ThreeMath.degToRad(gamma)
    };
};

const _arrowLength = 100;
const directionArrow = makeArrow({color:0xCD00FF, length:_arrowLength, headWidth: 10});

const scene = basicScene.scene;
const axesHelper = new AxesComponentHelper({scene, length:100});
const zyHelper = new AxesComponentHelper({scene, origin:{x:-5, y:5,z:-10}, length:1});
const xyHelper = new AxesComponentHelper({scene, origin:{x:0, y:5,z:-10}, length:1});
const alphaBetaHelper = new AxesComponentHelper({scene, origin:{x:5, y:5,z:-10}, length:.5});
const alphaGammaHelper = new AxesComponentHelper({scene, origin:{x:10, y:5,z:-10}, length:.5});

basicScene.onAnimationFrame(() => {
    // https://www.learnthreejs.com/device-orientation-gyroscope-controls-tutorial/
    
    const {alpha, beta, gamma} = mobileDeviceOrientation;
    var newAngle = new Euler(beta, alpha, gamma, 'XYZ' );
    var newDir = new Vector3( 0, -4, 0 );
    newDir.normalize();

    newDir.applyEuler(newAngle);

    directionArrow.setDirection(newDir);

    axesHelper.update(newDir);
    zyHelper.update({...newDir, x:newDir.z, z:0}, basicScene.camera);
    xyHelper.update({...newDir,z:0}, basicScene.camera);
    alphaBetaHelper.update({x: alpha, y: beta, z: 0}, basicScene.camera);
    alphaGammaHelper.update({x: alpha, y: gamma, z: 0}, basicScene.camera);
});