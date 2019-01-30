import { BasicScene } from "./components/BasicScene";
import { Mesh, SphereGeometry, MeshPhongMaterial, SmoothShading, ArrowHelper, Vector3, Euler, Math } from "three";
import {initWsClient} from './components/wsClient';
import {log} from './components/logger';

const basicScene = new BasicScene();
basicScene.showGrid();

let mobileDeviceOrientation = {
    alpha: 0,
    beta: 0,
    gamma: 0
};

/*
const speherRadius = 50,
sphere_H_segments = 64,
sphere_V_segments = 64,
sphere = new Mesh(
    new SphereGeometry(speherRadius, sphere_H_segments, sphere_V_segments),
    new MeshPhongMaterial({
        color: 0x3794cf,
        specular: 0xffffff,
        shininess: 40,
        flatShading: SmoothShading
    })
    );
    
sphere.castShadow = true;
basicScene.add(sphere);
*/

var origin = new Vector3( 0, -200, 0 );

var dir = new Vector3( 0, 0, 0 );
dir.normalize(); //normalize the direction vector (convert to vector of length 1)

var length = 100;
var color = 0xff0000;
const headLength = length/5;
const headWidth  = length/10;

var arrowHelper = new ArrowHelper( dir, origin, length, color, headLength, headWidth );
basicScene.add( arrowHelper );

const wsClient = initWsClient();

wsClient.onmessage = function (message) {
    const {alpha, beta, gamma} = JSON.parse(message.data).data;
    mobileDeviceOrientation = {
        alpha: Math.degToRad(alpha),
        beta: Math.degToRad(beta),
        gamma: Math.degToRad(gamma)
    };
};


basicScene.onAnimationFrame(() => {
    // https://www.learnthreejs.com/device-orientation-gyroscope-controls-tutorial/
    
    const {alpha, beta, gamma} = mobileDeviceOrientation;
    var newAngle = new Euler(beta, alpha, gamma, 'XYZ' );
    var newDir = new Vector3( 0, -4, 0 );
    newDir.normalize();
    newDir.applyEuler(newAngle);
    arrowHelper.setDirection(newDir);

    // wsClient.send(JSON.stringify({type:"screen-orientation-change", data: window.orientation || 0 }));
});