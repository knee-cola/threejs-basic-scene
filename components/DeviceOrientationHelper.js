import { ArrowHelper, Vector3, Euler } from "three";
import { AxesComponentHelper } from "./AxesComponentHelper";

export class DeviceOrientationHelper {
    constructor(scene, {color, direction, length, headLength, headWidth}={color:0xCD00FF,direction:100,length:100, direction:new Vector3( 0, -1, 0 )}) {
        this.direction = direction;
        this.direction.normalize(); //normalize the direction vector (convert to vector of length 1)
        this.originalDir = this.direction.clone();
        
        if(headLength===void 0) { headLength = length/5; }
        if(headWidth===void 0) { headWidth = length/10; }

        var origin = new Vector3( 0, 0, 0 );
        this.arrow = new ArrowHelper( this.direction, origin, length, color, headLength, headWidth );
        this.axesHelper = new AxesComponentHelper({scene, length});
        this.euler = new Euler();

        scene.add( this.arrow );
    }

    update({alpha, beta, gamma}) {

        // reseting the vector to original direction
        const {x,y,z} = this.originalDir;
        this.direction.set(x,y,z);

        // applying new direction
        this.euler.set(beta, alpha, gamma, 'XYZ' );
        this.direction.applyEuler(this.euler);

        this.arrow.setDirection(this.direction);
        this.axesHelper.update(this.direction);
    }
}