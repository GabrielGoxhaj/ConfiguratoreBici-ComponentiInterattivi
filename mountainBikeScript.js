const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

let scene;
let ruote = [];
let matbody
let matRuota;
let currentWheelsPath = null;



document.getElementById("bmxManubrio").addEventListener("click", function () {
    ChangeManubrio("bmx/bmxManubrio.glb"
    );
});
document.getElementById("classicManubrio").addEventListener("click", function () {
    ChangeManubrio("classic/classicManubrio.glb");
});
document.getElementById("corsaManubrio").addEventListener("click", function () {
    ChangeManubrio("corsa/corsaManubrioTest.glb",
        {
            position: new BABYLON.Vector3(0, 0 , 0 ),
            rotation: new BABYLON.Vector3(0, 0, 0),
            scaling: new BABYLON.Vector3(0.25, 0.25, 0.25)
        }
    );
})

async function changeWheels(pathNuovaRuota) {
    if (!scene) return;

    // Only reload if the path is different
    if (currentWheelsPath === pathNuovaRuota) {
        return; // Already loaded, do nothing
    }
    currentWheelsPath = pathNuovaRuota;

    const positions = ruote.map(mesh => mesh.position.clone());

    ruote.forEach(mesh => mesh.dispose());

    const nuovaRuota = await BABYLON.SceneLoader.ImportMeshAsync(
        "",
        "models/",
        pathNuovaRuota,
        scene
    );

    ruote = nuovaRuota.meshes;

    nuovaRuota.meshes.forEach(mesh => {
        mesh.material = matRuota;
    });

    if (matRuota) {
        ruote.forEach(mesh => {
            mesh.material = matRuota;
        });
    }
}

window.aggiungiBorraccia = async function () {
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
        "", // all meshes
        "models/accessori/",
        "portaborraccia.glb",
        scene
    );

    const mesh = result.meshes[0]; // la borraccia

    // Rendi la borraccia draggabile
    const dragBehavior = new BABYLON.PointerDragBehavior();
    dragBehavior.useObjectOrientationForDragging = false;
    mesh.addBehavior(dragBehavior);
}

function changeWheelsColor(colorWheelsName) {
    let colorWheels;
    if (colorWheelsName === 'red') {
        console.log('red');
        colorWheels = new BABYLON.Color3(1, 0, 0);
    } else if (colorWheelsName === 'green') {
        console.log('green');
        colorWheels = new BABYLON.Color3(0, 1, 0);
    } else if (colorWheelsName === 'white') {
        console.log('white');
        colorWheels = new BABYLON.Color3(1, 1, 1);
    } else if (colorWheelsName === 'black') {
        console.log('black');
        colorWheels = new BABYLON.Color3(0, 0, 0);
    } else {
        colorWheels = new BABYLON.Color3(1, 1, 1); // default white
    }
    ruote.forEach(mesh => {
        matRuota = new BABYLON.StandardMaterial("matRuota", scene);
        matRuota.diffuseColor = colorWheels;
        mesh.material = matRuota; // applica il materiale
    });
}

async function ChangeManubrio(nuovomanubrio, options = {}) {
    await manubrio.forEach(mesh => {
        mesh.dispose();
    });

    const result = await BABYLON.SceneLoader.ImportMeshAsync(
        "",
        "models/",
        nuovomanubrio,
        scene
    );

    manubrio = result.meshes;

    manubrio.forEach(mesh => {
        mesh.material = matbody;

        if (options.position) {
            mesh.position = options.position.clone();
        }
        if (options.rotation) {
            mesh.rotation = options.rotation.clone();
        }
        if (options.scaling) {
            mesh.scaling = options.scaling.clone();
        }
    });
}


const createScene = async () => {
    scene = new BABYLON.Scene(engine);

    const sphere = BABYLON.MeshBuilder.CreateSphere("mysphere", {diameter: 1}, scene);
    sphere.position = new BABYLON.Vector3(0, 0, 0);

    scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);
    const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        0,     // α: lato destro
        Math.PI / 2.2,   // β: leggera vista dall’alto
        25,               // distanza dalla bici
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1;
    const bikeResult = await BABYLON.SceneLoader.ImportMeshAsync(
        "", // all meshes
        "models/",
        "mountainBike.glb",
        scene
    );

    bikeResult.meshes.forEach(mesh => {
        console.log("Mesh trovata:", mesh.name);
    });

    const ruotaPosteriore = scene.getMeshByName("ruotaPosteriore");
    const ruotaAnteriore = scene.getMeshByName("ruota");
    const telaio = scene.getMeshByName("bodyCentrale");
    const sella = scene.getMeshByName("sella");

    matbody = new BABYLON.StandardMaterial("matbody", scene);
    matbody.diffuseColor = new BABYLON.Color3(1, 0.3, 3);


    const body = bikeResult.meshes.filter(mesh => mesh.name.toLowerCase().includes("body"));
    body.forEach(mesh => {
        mesh.material = matbody; // applica il materiale
    });

    ruote = bikeResult.meshes.filter(mesh => mesh.name.toLowerCase().includes("ruota"));

    manubrio = bikeResult.meshes.filter(mesh => mesh.name.toLowerCase().includes("manubrio"));
    return scene;
};

createScene().then(scene => {
    engine.runRenderLoop(() => scene.render());
});

// Resize handling
window.addEventListener("resize", () => engine.resize());