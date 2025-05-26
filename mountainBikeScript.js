const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

let scene;
let ruote = [];
let telaio = [];
let manubrio = [];
let matbody = [];
let body = [];
let sella = [];
let matRuota;
let currentWheelsPath = 'null';

let prezzoTotale = 459; // Tiene traccia del prezzo totale della configurazione
let currentWheelsType = 'mountain'; // Tiene traccia del tipo di ruota scelto
let currentManubrioType = 'mountain'; // Tiene traccia del tipo di manubrio scelto
let currentSellaType = 'mountain'; // Tiene traccia del tipo di sella scelta

const prezziComponenti = {
    manubrio: {
        bmx: 69.99,
        classic: 9.99,
        mountain: 129.99,
        corsa: 79.99
    }, ruote: {
        mountain: 149.99,
        bmx: 199.99,
        corsa: 249.99
    }, sella: {
        mountain: 9.99,
        bmx: 19.99,
        classic: 9.99,
        corsa: 29.99
    }, accessori: {
        portaTelefono: 19.99,
        portaborraccia: 14.99
    }
};


document.getElementById("bmxManubrio").addEventListener("click", function () {
    currentManubrioType = "bmx";
    ChangeManubrio("bmx/bmxManubrio.glb",
        {
            position: new BABYLON.Vector3(0, 4.65, -3),
            rotation: new BABYLON.Vector3(0, Math.PI, 0),
            scaling: new BABYLON.Vector3(1, 1, 1)
        }
    );
    const input = this.querySelector('input[type="radio"]'); // Seleziona l'input radio associato
    if (input) input.checked = true;
});
document.getElementById("classicManubrio").addEventListener("click", function () {
    currentManubrioType = "classic";
    ChangeManubrio("classic/classicManubrio.glb",
        {
            position: new BABYLON.Vector3(0, 3.8, -3.1),
            rotation: new BABYLON.Vector3(0, 0, 0),
            scaling: new BABYLON.Vector3(1, 1, 1)
        }
    );
    const input = this.querySelector('input[type="radio"]'); // Seleziona l'input radio associato
    if (input) input.checked = true;
});
document.getElementById("mountainBikeManubrio").addEventListener("click", function () {
    currentManubrioType = "mountain";
    ChangeManubrio("mountainBike/mountainManubrio.glb",
        {
            position: new BABYLON.Vector3(0, 3.8, -3.13),
            rotation: new BABYLON.Vector3(0, 0, 0),
            scaling: new BABYLON.Vector3(1, 1, 1)
        }
    );
    const input = this.querySelector('input[type="radio"]'); // Seleziona l'input radio associato
    if (input) input.checked = true;
});
document.getElementById("corsaManubrio").addEventListener("click", function () {
    currentManubrioType = "corsa";
    ChangeManubrio("corsa/corsaManubrioTest.glb",
        {
            position: new BABYLON.Vector3(0, 3.8, -3.65),
            rotation: new BABYLON.Vector3(0, 0, 0),
            scaling: new BABYLON.Vector3(0.07, 0.07, 0.07)
        }
    );
    const input = this.querySelector('input[type="radio"]'); // Seleziona l'input radio associato
    if (input) input.checked = true;
})

function checkRadioSaddle(btn) {
    if (btn) {
        const input = btn.querySelector('input[type="radio"]');
        if (input) input.checked = true;
    }
}

async function changeWheels(pathNuovaRuota, btn) {
    if (!scene) return;

    // Only reload if the path is different
    /*  if (currentWheelsPath === pathNuovaRuota) {
         return; // Already loaded, do nothing
     } */

    if (btn) {
        const input = btn.querySelector('input[type="radio"]');
        if (input) input.checked = true;
    }
    currentWheelsPath = pathNuovaRuota;

    ruote.forEach(mesh => mesh.dispose());

    const nuovaRuotaR = await BABYLON.SceneLoader.ImportMeshAsync(
        "",
        "models/",
        pathNuovaRuota,
        scene
    );
    console.log("ruota:", nuovaRuotaR);
    const nuovaRuotaF = await BABYLON.SceneLoader.ImportMeshAsync(
        "",
        "models/",
        pathNuovaRuota,
        scene
    );
    nuovaRuotaR.meshes.forEach(mesh => {
        mesh.setAbsolutePosition(new BABYLON.Vector3(0, -0.1, -2));
    });
    nuovaRuotaF.meshes.forEach(mesh => {
        mesh.setAbsolutePosition(new BABYLON.Vector3(0, 0, 1.5));
    });

    ruote = [...nuovaRuotaR.meshes, ...nuovaRuotaF.meshes];

    nuovaRuotaR.meshes.forEach(mesh => {
        mesh.material = matRuota;
    });
    nuovaRuotaF.meshes.forEach(mesh => {
        mesh.material = matRuota;
    });

    /* if (matRuota) {
        ruote.forEach(mesh => {
            mesh.material = matRuota;
        });
    } */
}



window.aggiungiPortaTelefono = async function () {
    if (window.portaTelefonoMesh && window.portaTelefonoMesh.isDisposed() === false) {
        portaTelefonoMesh.dispose()
        return;
    }

    const result = await BABYLON.SceneLoader.ImportMeshAsync(
        "", // all meshes
        ".blend/accessori/",
        "portaTelefono.glb",
        scene
    );


    const mesh = result.meshes[0]; // la porta telefono
    window.portaTelefonoMesh = mesh; // salva il riferimento globale
    if (currentManubrioType === "mountain") {
        mesh.position = new BABYLON.Vector3(-0.8, 4.1, -3.15);
    } else if (currentManubrioType === "bmx") {
        mesh.position = new BABYLON.Vector3(-0.5, 5.1, -3);
    } else if (currentManubrioType === "corsa") {
        mesh.position = new BABYLON.Vector3(-0.7, 4, -3.1);
    } else if (currentManubrioType === "classic") {
        mesh.position = new BABYLON.Vector3(-0.4, 4.0, -3.05);
    }

    // Rendi la borraccia draggabile
    const dragBehavior = new BABYLON.PointerDragBehavior();
    dragBehavior.useObjectOrientationForDragging = false;
    mesh.addBehavior(dragBehavior);
}

window.aggiungiBorraccia = async function () {
    if (window.borracciaMesh && window.borracciaMesh.isDisposed() === false) {
        borracciaMesh.dispose()
        return;
    }

    const result = await BABYLON.SceneLoader.ImportMeshAsync(
        "", // all meshes
        "models/accessori/",
        "portaborraccia.glb",
        scene
    );

    const mesh = result.meshes[0]; // la borraccia
    window.borracciaMesh = mesh; // salva il riferimento globale


    console.log("madonna impestata");

    mesh.position = new BABYLON.Vector3(0, 2, -1.6);

    // Rendi la borraccia draggabile
    const dragBehavior = new BABYLON.PointerDragBehavior();
    dragBehavior.useObjectOrientationForDragging = false;
    mesh.addBehavior(dragBehavior);
}

function selectWheelButton(colorClass) {
    document.querySelectorAll('.tireColorSelector-wrapper button').forEach(btn => {
        if (btn.classList.contains(colorClass)) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function selectTelaioButton(colorClass) {
    document.querySelectorAll('.telaioColorSelector-wrapper button').forEach(btn => {
        if (btn.classList.contains(colorClass)) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function changeWheelsColor(colorWheelsName) {
    let colorWheels;
    if (colorWheelsName === 'red') {
        console.log('red tires');
        colorWheels = new BABYLON.Color3(1, 0, 0);
        selectWheelButton('red-wheels');
    } else if (colorWheelsName === 'green') {
        console.log('green tires');
        colorWheels = new BABYLON.Color3(0, 1, 0);
        selectWheelButton('green-wheels');
    } else if (colorWheelsName === 'white') {
        console.log('white tires');
        colorWheels = new BABYLON.Color3(1, 1, 1);
        selectWheelButton('white-wheels');
    } else if (colorWheelsName === 'black') {
        console.log('black tires');
        colorWheels = new BABYLON.Color3(0, 0, 0);
        selectWheelButton('black-wheels');
    } else {
        colorWheels = new BABYLON.Color3(1, 1, 1); // default white
    }
    ruote.forEach(mesh => {
        matRuota = new BABYLON.StandardMaterial("matRuota", scene);
        matRuota.diffuseColor = colorWheels;
        mesh.material = matRuota; // applica il materiale
    });
}

function changeTelaioColor(colorTelaioName) {
    let colorTelaio;
    if (colorTelaioName === 'red') {
        console.log('red telaio');
        colorTelaio = new BABYLON.Color3(1, 0, 0);
        selectTelaioButton('red-telaio');
    } else if (colorTelaioName === 'green') {
        console.log('green telaio');
        colorTelaio = new BABYLON.Color3(0, 1, 0);
        selectTelaioButton('green-telaio');
    } else if (colorTelaioName === 'white') {
        console.log('white telaio');
        colorTelaio = new BABYLON.Color3(1, 1, 1);
        selectTelaioButton('white-telaio');
    } else if (colorTelaioName === 'black') {
        console.log('black telaio');
        colorTelaio = new BABYLON.Color3(0, 0, 0);
        selectTelaioButton('black-telaio');
    } else {
        colorTelaio = new BABYLON.Color3(1, 1, 1); // default white
    }
    const matTelaio = new BABYLON.StandardMaterial("matTelaio", scene);
    matTelaio.diffuseColor = colorTelaio;

    if (matbody) {
        matbody.diffuseColor = colorTelaio;
    }
    // Change color of manubrio
    manubrio.forEach(mesh => {
        mesh.material = matTelaio;
    });
}

async function ChangeManubrio(nuovomanubrio, options = {}) {
    console.log(options);
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

    Array.from(manubrio).filter(m => {
        return m.id.toLowerCase().indexOf('manubrio') >= 0
    }).forEach(mesh => {
        mesh.material = matbody;
    });

    Array.from(manubrio).filter(m => {
        return m.id.toLowerCase().indexOf('__root__') >= 0
    }).forEach(mesh => {
        console.log(mesh);

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


// Funzione per aggiornare il totale dei costi
function aggiornaTotale() {
    prezzoTotale = 459;
    let totale = 0;
    // Manubrio
    if (prezziComponenti.manubrio[currentManubrioType]) {
        totale += prezziComponenti.manubrio[currentManubrioType];
    }
    // Ruote
    if (prezziComponenti.ruote[currentWheelsType]) {
        totale += prezziComponenti.ruote[currentWheelsType];
    }
    // Sella
    if (prezziComponenti.sella[currentSellaType]) {
        totale += prezziComponenti.sella[currentSellaType];
    }

    if (window.portaTelefonoMesh) {
        totale += prezziComponenti.accessori.portaTelefono;
    }
    if (window.borracciaMesh) {
        totale += prezziComponenti.accessori.portaborraccia;
    }

    prezzoTotale += totale;
    // Aggiorna il carrello in pagina se vuoi
    const el = document.getElementById('prezzoTotale');
    if (el) el.textContent = totale + ' €';
}


const createScene = async () => {
    scene = new BABYLON.Scene(engine);

    const sphere = BABYLON.MeshBuilder.CreateSphere("mysphere", { diameter: 1 }, scene);
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

    camera.lowerRadiusLimit = 5;   // distanza minima (non si avvicina più di 5)
    camera.upperRadiusLimit = 40;  // distanza massima (non si allontana più di 50)

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1;
    const bikeResult = await BABYLON.SceneLoader.ImportMeshAsync(
        "", // all meshes
        "models/mountainBike/",
        "mountainBike.glb",
        scene
    );

    bikeResult.meshes.forEach(mesh => {
        console.log("Mesh trovata:", mesh.name);
    });

    const ruotaPosteriore = scene.getMeshByName("ruotaPosteriore");
    const ruotaAnteriore = scene.getMeshByName("ruota");
    const telaio = scene.getMeshByName("bodyCentrale");
    let sella = scene.getMeshByName("sella");

    async function changeSaddle(pathNuovaSaddle, btn) {
        // Se sella è una mesh, eliminala; se è un array, elimina tutte le mesh
        if (sella) {
            if (Array.isArray(sella)) {
                sella.forEach(mesh => mesh.dispose && mesh.dispose());
            } else if (sella.dispose) {
                sella.dispose();
            }
        }

        checkRadioSaddle(btn);

        const nuovaSaddle = await BABYLON.SceneLoader.ImportMeshAsync(
            "",
            "models/",
            pathNuovaSaddle,
            scene

        );

        matSaddle = new BABYLON.StandardMaterial("matSaddle", scene);
        matSaddle.diffuseColor = new BABYLON.Color3(1, 1, 3);

        // Trova la mesh della sella tra quelle importate
        let selleImportate = nuovaSaddle.meshes.filter(mesh => mesh.name.toLowerCase().includes("sella"));
        if (selleImportate.length === 0) {
            // Se non trova una mesh con "sella" nel nome, usa la prima mesh importata
            selleImportate = [nuovaSaddle.meshes[0]];
        }

        // Rimuovi tutte le selle precedenti dalla scena
        if (window.sellePresenti && Array.isArray(window.sellePresenti)) {
            window.sellePresenti.forEach(mesh => mesh.dispose && mesh.dispose());
        }
        window.sellePresenti = selleImportate;

        // Applica posizione e materiale a ciascuna sella importata
        selleImportate.forEach(mesh => {
            // Gestione manuale per ogni modello di sella
            if (mesh.name.toLowerCase().includes("bmx")) {
                mesh.position = new BABYLON.Vector3(0, 3.4, 0.2);
                mesh.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
                mesh.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
                currentSellaType = "bmx";

            } else if (mesh.name.toLowerCase().includes("classic")) {
                mesh.position = new BABYLON.Vector3(0, 3.5, 0.3);
                mesh.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
                mesh.rotation = new BABYLON.Vector3(1.7, 3.2, 0); // 180° asse X
                currentSellaType = "classic";

            } else if (mesh.name.toLowerCase().includes("corsa")) {
                mesh.position = new BABYLON.Vector3(0, 3.6, 0.3);
                mesh.scaling = new BABYLON.Vector3(0.3, 0.2, 0.2);
                currentSellaType = "corsa";
            } else if (mesh.name.toLowerCase().includes("mountain")) {
                mesh.position = new BABYLON.Vector3(0, 3.3, 0.3);
                mesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
                currentSellaType = "mountain";
            }
        });
    }

    window.changeSaddle = changeSaddle;

    matbody = new BABYLON.StandardMaterial("matbody", scene);
    matbody.diffuseColor = new BABYLON.Color3(1, 1, 3);

    const body = bikeResult.meshes.filter(mesh => mesh.name.toLowerCase().includes("body"));
    body.forEach(mesh => {
        mesh.material = matbody; // applica il materiale
    });

    ruote = bikeResult.meshes.filter(mesh => mesh.name.toLowerCase().includes("ruota"));

    manubrio = bikeResult.meshes.filter(mesh => mesh.name.toLowerCase().includes("manubrio"));

    // Imposta automaticamente onload gli elementi per la bici da mountain bike
    await changeWheels("mountainBike/mountainBikeRuota.glb");
    await changeSaddle("mountainBike/sellaMountain.glb");
    await ChangeManubrio("mountainBike/mountainManubrio.glb", {
        position: new BABYLON.Vector3(0, 3.8, -3.13),
        rotation: new BABYLON.Vector3(0, 0, 0),
        scaling: new BABYLON.Vector3(1, 1, 1)
    });

    return scene;
};

createScene().then(scene => {
    engine.runRenderLoop(() => scene.render());

    // --- RIPRISTINO CONFIGURAZIONE SALVATA DOPO CHE LA SCENA È PRONTA ---
    const configSalvata = localStorage.getItem('configurazioneBici');
    if (configSalvata) {
        const config = JSON.parse(configSalvata);
        // Aggiorna variabili globali
        currentManubrioType = config.manubrio;
        currentWheelsType = config.ruote;
        currentSellaType = config.sella;
        console.log("Configurazione caricata:", config);

        // Manubrio
        if (currentManubrioType === 'bmx') {
            document.getElementById('bmxManubrio').click();
        } else if (currentManubrioType === 'classic') {
            document.getElementById('classicManubrio').click();
        } else if (currentManubrioType === 'mountain') {
            document.getElementById('mountainBikeManubrio').click();
        } else if (currentManubrioType === 'corsa') {
            document.getElementById('corsaManubrio').click();
        }
        // Ruote
        if (currentWheelsType === 'bmx') {
            changeWheels('bmx/bmxRuota2.glb');
        } else if (currentWheelsType === 'mountain' || currentWheelsType === 'mountainBike') {
            changeWheels('mountainBike/mountainBikeRuota.glb');
        } else if (currentWheelsType === 'corsa') {
            changeWheels('corsa/ruoteCorsa.glb');
        }
        // Sella
        if (currentSellaType === 'bmx') {
            document.getElementById('sellaBMX').click();
        } else if (currentSellaType === 'classic') {
            document.getElementById('classicSella').click();
        } else if (currentSellaType === 'mountain') {
            document.getElementById('mountainSella').click();
        } else if (currentSellaType === 'corsa') {
            document.getElementById('corsaSella').click();

        }
        // Accessori
        if (config.accessori && config.accessori.portaTelefono) {
            aggiungiPortaTelefono();
        }
        if (config.accessori && config.accessori.portaborraccia) {
            aggiungiBorraccia();
        }
    }
    // --- FINE RIPRISTINO CONFIGURAZIONE ---
});


// Resize handling
window.addEventListener("resize", () => engine.resize());


salvaPrezzoTotale = () => {
    aggiornaTotale();
    // Aggiorna la configurazione prima di salvare
    let configurazione = {
        manubrio: currentManubrioType,
        ruote: currentWheelsType,
        sella: currentSellaType,
        accessori: {
            portaTelefono: !!window.portaTelefonoMesh,
            portaborraccia: !!window.borracciaMesh
        },
        prezzoTotale: prezzoTotale
    };
    console.log("Configurazione da salvare:", configurazione.manubrio);
    // Salva la configurazione e il prezzo totale nel localStorage
    localStorage.setItem('configurazioneBici', JSON.stringify(configurazione));
    localStorage.setItem('prezzoTotale', prezzoTotale);

};
console.log("prezzo tot", prezzoTotale);