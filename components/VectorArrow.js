import { LineBasicMaterial, LineDashedMaterial, Geometry, Vector3, Line, Euler, Quaternion } from "three";
import formatNumber from './formatNumber';

export class VectorArrow {
    constructor({scene}) {
        this.length = 1;
        
        this.worldFront = this.makeLine(scene, 0xaaaaaa, new Vector3(this.length, 0, 0));
        this.cameraFront = this.makeLine(scene, 0x0000ff, new Vector3(this.length, 0, 0));
        this.rotatorFront = this.makeLine(scene, 0x00ff00, new Vector3(this.length, 0, 0), LineDashedMaterial);
        
        this.worldTop = this.makeLine(scene, 0xaaaaaa, new Vector3(0, this.length, 0));
        this.cameraTop = this.makeLine(scene, 0xff0000, new Vector3(0, this.length, 0));
        this.rotatorTop = this.makeLine(scene, 0x00aa00, new Vector3(0, this.length, 0), LineDashedMaterial);

        this.worldFrontVertice = this.worldFront.geometry.vertices[1];
        this.cameraFrontVertice = this.cameraFront.geometry.vertices[1];
        this.rotatorFrontVertice = this.rotatorFront.geometry.vertices[1];

        this.worldTopVertice = this.worldTop.geometry.vertices[1];
        this.cameraTopVertice = this.cameraTop.geometry.vertices[1];
        this.rotatorTopVertice = this.rotatorTop.geometry.vertices[1];

        this.helperV = new Vector3();
        this.euler = new Euler();
		this.q0 = new Quaternion();
		this.q1 = new Quaternion();
    }

    makeLine(scene, color, mobileVertice, Material) {

        const materialOptions = {color};

        if(!Material) {
            Material = LineBasicMaterial;
        } else {
            materialOptions.scale = 1;
            materialOptions.linewidth = 1;
            materialOptions.dashSize = 2;
            materialOptions.gapSize = 1;
        }


        const material = new Material(materialOptions);
        const geometry = new Geometry();

        geometry.vertices.push(new Vector3( 0, 0, 0 ) );
        geometry.vertices.push(mobileVertice);
        
        const line = new Line( geometry, material );
        scene.add(line);
        return(line);
    }

    update({alpha, beta, gamma}) {
        this.euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

        // camera follows the phone rotation
        this.cameraFrontVertice.set(0,this.length,0);
        this.cameraFrontVertice.applyEuler(this.euler);

        this.cameraTopVertice.set(this.length,0,0);
        this.cameraTopVertice.applyEuler(this.euler);

        //------------------------------
        // adjusting FRONT rotor vector
        //------------------------------
        this.q0.setFromUnitVectors(this.cameraFrontVertice.normalize(), this.worldFrontVertice.normalize());

        this.rotatorFrontVertice.set(this.length,0,0);
        this.rotatorFrontVertice.applyQuaternion(this.q0);

        //------------------------------
        // adjusting TOP rotor vector
        //------------------------------
        let v3 = this.cameraTopVertice.clone();
        v3.applyQuaternion(this.q0);
        this.q1.setFromUnitVectors(v3.normalize(), this.worldTopVertice.normalize());

        this.rotatorTopVertice.copy(this.worldTopVertice);
        this.rotatorTopVertice.applyQuaternion(this.q1);
        this.rotatorTopVertice.applyQuaternion(this.q0);

        //------------------------------
        this.cameraTop.geometry.verticesNeedUpdate = true;
        this.rotatorTop.geometry.verticesNeedUpdate = true;
        this.cameraFront.geometry.verticesNeedUpdate = true;
        this.rotatorFront.geometry.verticesNeedUpdate = true;
    }
}