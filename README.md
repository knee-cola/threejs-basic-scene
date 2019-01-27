# Whats this?
This is a basic ThreeJS scene boilerplate intended to be used as a starting point for any ThreeJS experiment.

# Demo
Demo can be found at [https://knee-cola.github.io/threejs-basic-scene/](https://knee-cola.github.io/threejs-basic-scene/). It's a basic scene, so don't expect much!

# How to use
**Step 1:** Fork it, clone it or download it.

**Step 2:** install by typing `npm i` to your console

**Step 3:** use the `main.js` as a starting point. You can replace the sphere with objects of your own.

**Step 4:** run it via `npm start`

# API
Public methods are:

* `add` = adds a new 3D object to the scene (i.e. THREE.Mesh)
* `showGrid` = a helper function which displays a reference grid
* `onAnimationFrame` = registers an function which will be called from the animation loop before the `render` is done - useful for updating objects on the screen (animation)