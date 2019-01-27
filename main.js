import { BasicScene } from "./components/BasicScene";
import { Mesh, SphereGeometry, MeshPhongMaterial, SmoothShading } from "three";

const basicScene = new BasicScene();
basicScene.showGrid();

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