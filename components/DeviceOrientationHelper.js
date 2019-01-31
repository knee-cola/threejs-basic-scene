import { ArrowHelper, Vector3, Euler, Quaternion, Math as ThreeMath } from "three";
import { AxesComponentHelper } from "./AxesComponentHelper";

export class DeviceOrientationHelper {
    constructor(scene, {color, direction, length, headLength, headWidth, origin}={color:0xCD00FF, length:100, direction:new Vector3( 0, -1, 0 ), origin:new Vector3( 0, 0, 0 )}) {
        this.direction = direction;
        this.direction.normalize(); //normalize the direction vector (convert to vector of length 1)
        this.originalDir = this.direction.clone();

		this.zee = new Vector3( 0, 0, 1 );
		this.euler = new Euler();
		this.quaternion = new Quaternion();
		this.q0 = new Quaternion();
		this.q1 = new Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis
        
        if(headLength===void 0) { headLength = length/5; }
        if(headWidth===void 0) { headWidth = length/10; }

        this.arrow = new ArrowHelper( this.direction, origin, length, color, headLength, headWidth );
        this.axesHelper = new AxesComponentHelper({scene, length, origin});
        this.euler = new Euler();

        scene.add( this.arrow );
    }

    update({alpha, beta, gamma}) {
        this.updateViaEuler({alpha, beta, gamma});
        // this.updateViaQuaternion({alpha, beta, gamma});
    }

    updateViaEuler({alpha, beta, gamma}) {
        // reseting the vector to original direction
        const {x,y,z} = this.originalDir;
        this.direction.set(x,y,z);

        this.euler.set(beta, alpha, gamma, 'XYZ' );

        // applying new direction
        this.direction.applyEuler(this.euler);

        this.arrow.setDirection(this.direction);
        this.axesHelper.update(this.direction);
    }

    updateViaQuaternion({alpha, beta, gamma}) {
        // reseting the vector to original direction
        const {x,y,z} = this.originalDir;
        this.direction.set(x,y,z);

        const orient = window.orientation ? ThreeMath.degToRad( window.orientation ) : 0; // O

        this.euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us
        this.quaternion.setFromEuler( this.euler ); // orient the device
        this.quaternion.multiply( this.q1 ); // camera looks out the back of the device, not the top
        this.quaternion.multiply( this.q0.setFromAxisAngle( this.zee, -orient ) ); // adjust for screen orientation

        // applying new direction
        this.direction.applyQuaternion(this.quaternion);

        this.arrow.setDirection(this.direction);
        this.axesHelper.update(this.direction);
    }
}