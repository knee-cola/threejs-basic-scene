import {Scene, PerspectiveCamera, WebGLRenderer, HemisphereLight, Clock, SpotLight, AmbientLight, LightShadow, GridHelper, Mesh, ShadowMaterial, PlaneGeometry} from 'three';
import OrbitControls from 'threejs-orbit-controls';

export class BasicScene {
    constructor() {

        // binding methods used as event handlers
        this.doLoopAnimations = this.doLoopAnimations.bind(this);

        this.setupRenderer();
        this.setupCamera();
		this.setupLight();
		this.setupControls();

        this.adjustSize();
        this.startAnimationLoop();

        window.addEventListener('resize', this.adjustSize.bind(this), false);
    }
    
    setupRenderer() {
        const renderer = this.renderer = new WebGLRenderer();

		renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor( 0xf0f0f0 );
        renderer.shadowMap.enabled = true;

        document.body.appendChild(renderer.domElement);

        this.scene = new Scene();
    }

    setupCamera() {

		const fieldOfView = 70,
			aspectRatio = 1,
			near = 1,
			far = 2000,
            cameraPosition = {
                x: 200,
                y: 0,
                z: 0
            };

		// http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera
		this.camera = new PerspectiveCamera(fieldOfView, aspectRatio, near, far);
		this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    }

    setupLight() {
        this.scene.add( new AmbientLight( 0xf0f0f0 ) );

        const spotlight = new SpotLight( 0xffffff, 1.5 );
        spotlight.position.set( 0, 1500, 200 );
        spotlight.castShadow = true;
        spotlight.shadow = new LightShadow( new PerspectiveCamera( 70, 1, 200, 2000 ) );
        spotlight.shadow.bias = -0.000222;
        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;
        this.scene.add( spotlight );
    }

    setupControls() {
        const controls = this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.damping = 0.2;
        controls.enableZoom = true;
    }

    startAnimationLoop() {
        this.clock = new Clock();
        requestAnimationFrame(this.doLoopAnimations);
    }

    doLoopAnimations() {
        if(this.isDisposed) {
            return;
        }

        if(this.animationFn) {
            this.animationFn();
        }

        this.render();

        // request the next animation frame
        requestAnimationFrame(this.doLoopAnimations);
    }

    render() {
        const dt = this.clock.getDelta();

        this.controls.update(dt);
        this.renderer.render(this.scene, this.camera);
    }

    adjustSize() {
        // The delay ensures the browser has a chance to layout
        // the page and update the clientWidth/clientHeight.
        // This problem particularly crops up under iOS.
        if (!this.sizeAdjPending) {
            window.setTimeout(() => {
                const width = window.innerWidth,
                      height = window.innerHeight;
  
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(width, height);
                this.sizeAdjPending = false;
            }, 250);
        }

        this.sizeAdjPending = true;
    }

    /**
     * Adds a new object to the scene
     * @param {Mash} object a 3D object to be added 
     * @returns instance reference for chaining
     */
    add(object) {
        this.scene.add(object);
        return(this);
    }

    /**
     * Registers a function to be called from the animation loop BEFORE the `render` is done
     * @param {Function} fn handler function
     * @returns instance reference for chaining
     */
    onAnimationFrame(fn) {
        this.animationFn = fn;
        return(this);
    }

    /**
     * Displays a floor grid
     * @returns instance reference for chaining
     */
    showGrid() {
        const scene = this.scene;
        const planeGeometry = new PlaneGeometry( 2000, 2000 );
        planeGeometry.rotateX( - Math.PI / 2 );
    
        const planeMaterial = new ShadowMaterial();
        planeMaterial.opacity = 0.2;
        
        const plane = new Mesh( planeGeometry, planeMaterial );
        plane.position.y = -2;
        plane.receiveShadow = true;
        scene.add( plane );
        
        const helper = new GridHelper( 1000, 100 );
        helper.position.y = -3;
        helper.material.opacity = 0.25;
        helper.material.transparent = true;
        scene.add( helper );
        
        return(this);
    }

    dispose() {
        this.isDisposed = true;
        document.body.removeChild(this.renderer.domElement);
        this.renderer.dispose();
    }
}