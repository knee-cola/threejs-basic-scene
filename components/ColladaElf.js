import ColladaLoader from 'three-collada-loader';
import { LoadingManager, Vector3, Matrix4, Quaternion } from 'three';

const rotQ = new Quaternion(- Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) );

export class ColladaElf {
    constructor(scene, translateX) {

        // based on source https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_collada.html

        var loadingManager = new LoadingManager( () => {

        });

        var loader = new ColladaLoader( loadingManager );

        loader.load( './collada/elf.dae', ( collada ) => {
            this.colladaScene = collada.scene;
            if(translateX) {
                this.colladaScene.translateX(translateX);
            }
            this.elf = this.colladaScene.children[0];

            const mx = new Matrix4();
                  mx.makeScale(20,20,20);

                this.elf.matrixAutoUpdate = false;
                this.elf.matrix.multiply(mx);

            scene.add( this.colladaScene );
        });
    }

    updateQuaternion(newQ, translateX) {
        if(this.elf) {
            newQ.multiply(rotQ);
            this.colladaScene.rotation.setFromQuaternion(newQ);
            
            if(translateX) {
                this.colladaScene.translateX(translateX);
           }
        }
    }
}