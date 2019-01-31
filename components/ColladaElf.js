import ColladaLoader from 'three-collada-loader';
import { LoadingManager, Vector3, Matrix4 } from 'three';

export class ColladaElf {
    constructor(scene) {

        // based on source https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_collada.html

        var loadingManager = new LoadingManager( () => {

        });

        var loader = new ColladaLoader( loadingManager );

        loader.load( './collada/elf.dae', ( collada ) => {
            this.colladaScene = collada.scene;
            this.elf = this.colladaScene.children[0];

            const mx = new Matrix4();
                  mx.makeScale(20,20,20);

                this.elf.matrixAutoUpdate = false;
                this.elf.matrix.multiply(mx);

            scene.add( this.colladaScene );
        });
    }

    updateQuaternion(newQ) {
        if(this.elf) {
            this.colladaScene.rotation.setFromQuaternion(newQ);
        }
    }
}