import { Engine, Scene, ArcRotateCamera, Vector3, StandardMaterial, Color3, Color4, HemisphericLight, SceneLoader, ImportMeshAsync } from "@babylonjs/core";
import "@babylonjs/loaders";

let scene;
let ruote = [];
let engine;

function changeWheelsColorFn(colorWheelsName) {
    let colorWheels;
    if (colorWheelsName === 'red') {
        colorWheels = new Color3(1, 0, 0);
    } else if (colorWheelsName === 'green') {
        colorWheels = new Color3(0, 1, 0);
    } else if (colorWheelsName === 'white') {
        colorWheels = new Color3(1, 1, 1);
    } else if (colorWheelsName === 'black') {
        colorWheels = new Color3(0, 0, 0);
    } else {
        colorWheels = new Color3(1, 1, 1); // default white
    }
    ruote.forEach(mesh => {
        const matRuota = new StandardMaterial("matRuota", scene);
        matRuota.diffuseColor = colorWheels;
        mesh.material = matRuota;
    });
}

const createScene = async (canvas) => {
    engine = new Engine(canvas, true);
    scene = new Scene(engine);

    scene.clearColor = new Color4(1, 1, 1, 1);

    // Camera
    const camera = new ArcRotateCamera(
        "Camera",
        0,
        Math.PI / 2.2,
        20,
        Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    // Light
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 1;

    // Load the model
    const bikeResult = await SceneLoader.ImportMeshAsync(
        "", // all meshes
        "/models/",
        "mountainBike.glb",
        scene
    );

    const matRuota = new StandardMaterial("matRuota", scene);
    matRuota.diffuseColor = new Color3(1, 0, 0);

    const matbody = new StandardMaterial("matbody", scene);
    matbody.diffuseColor = new Color3(1, 0.3, 3);

    const body = bikeResult.meshes.filter(mesh => mesh.name.toLowerCase().includes("body"));
    body.forEach(mesh => {
        mesh.material = matbody;
    });

    ruote = bikeResult.meshes.filter(mesh => mesh.name.toLowerCase().includes("ruota"));
    ruote.forEach(mesh => {
        mesh.material = matRuota;
    });

    engine.runRenderLoop(() => scene.render());

    window.addEventListener("resize", () => engine.resize());

    return scene;
};

export { createScene, changeWheelsColorFn }