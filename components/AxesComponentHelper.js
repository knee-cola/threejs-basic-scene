import { LineBasicMaterial, Geometry, Vector3, Line } from "three";

export class AxesComponentHelper {
    constructor({scene, origin, length}) {

        this.origin = origin !== void 0 ? origin : {x:0,y:0,z:0};
        this.length = length;

        this.lineX = this.makeLine(0xff0000, scene);
        this.lineY = this.makeLine(0x00ff00, scene);
        this.lineZ = this.makeLine(0x0000ff, scene);
    }

    makeLine(color, scene) {
        const material = new LineBasicMaterial( { color } );
        const geometry = new Geometry();
        geometry.vertices.push(new Vector3( 0, 0, 0 ) );
        geometry.vertices.push(new Vector3( 0, 0, 0) );
        
        const line = new Line( geometry, material );
        scene.add(line);

        return(line);
    }

    update({x, y, z}, camera) {
        this.updateLine(this.lineX, 'x', x, camera);
        this.updateLine(this.lineY, 'y', y, camera);
        this.updateLine(this.lineZ, 'z', z, camera);
    }

    updateLine(line, axes, value, camera) {
        const origin = this.origin,
              length = this.length;
 
        if(camera) {
            line.position.copy( camera.position );
            line.rotation.copy( camera.rotation );
    
            line.translateX( origin.x );
            line.translateY( origin.y );
            line.translateZ( origin.z );
        }

        line.geometry.vertices[1][axes] = value * length;
        line.geometry.verticesNeedUpdate = true;
    }
}