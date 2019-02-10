import { Mesh, RepeatWrapping, SphereGeometry, MeshBasicMaterial, BackSide, Matrix4, TextureLoader, Quaternion, Vector3, Euler} from 'three';
import { PitchYawRollHelper } from '../helpers/PitchYawRollHelper';

const _sphere_radius = 100,
      _sphere_H_segments = 64,
      _sphere_V_segments = 64;

export class Photosphere {

    constructor(scene, renderer) {
        this.scene = scene;
		this.renderer = renderer;
		this.scale = 5;
		
		//this.deformMatrix = new Matrix4();
		this.makeSphere();
		this.loadTexture();

		this.pyrHelper = new PitchYawRollHelper();
	}
	
	makeSphere() {
		this.sphereMesh = new Mesh(
			new SphereGeometry(_sphere_radius, _sphere_H_segments, _sphere_V_segments),
			new MeshBasicMaterial({
				// map: loadedTexture,
				// color: 0xff0000,
				flatShading: true,
				// draw texture on inner side of the sphere
				//side: BackSide
			})

		);

		this.quaternion = this.sphereMesh.quaternion;
		this.scene.add(this.sphereMesh);
	}
    
	loadTexture() {
		const loader = new TextureLoader();

		// load a resource
		loader.load('/textures/PANO_20140421_152929.jpg',
			// onLoad callback
			loadedTexture => {
				// loadedTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
				// texture needs to be flipped horizonatally
				// since rendering it on the inner side of a sphrere
				// will flip it  
				loadedTexture.wrapS = RepeatWrapping;
				loadedTexture.repeat.x=-1;

				this.sphereMesh.material.map = loadedTexture;
				this.sphereMesh.material.needsUpdate = true;
		});
	}

	updateDeformation(rotQ) {
		if(!this.sphereMesh) {
			return;
		}

//		// rotating the coordinate system
//		this.deformMatrix.makeRotationFromQuaternion(rotQ);
//	
//		const mx4rotInverse = new Matrix4();
//		mx4rotInverse.getInverse(this.deformMatrix);
//	
//		// doing the scaling in the rotated coordinates
//		const mx4scale = new Matrix4();
//		mx4scale.makeScale(2,1,1);
//		this.deformMatrix.multiply(mx4scale);
	
		// undoing the rotation - returning to the
		// original coordinate system
		// > the scaling is not rotated
		// > object will not be rotated
		// this.deformMatrix.multiply(mx4rotInverse);

		this.deformMatrix.makeScale(1,4,4);
		
		const mx4rot = new Matrix4();
		mx4rot.makeRotationFromQuaternion(rotQ);
		this.deformMatrix.multiply(mx4rot);

	}

	commitDeformation() {
		if(!this.sphereMesh) {
			return;
		}
        this.sphereMesh.matrix.identity();
		this.sphereMesh.matrix.multiply(this.deformMatrix);
	}

	update(deviceOrientation) {
		this.quaternion.copy(this.pyrHelper.calculate(deviceOrientation));
	}
}