// Recupera il prezzo totale dal localStorage e lo mostra
const prezzoTotale = localStorage.getItem('prezzoTotale');
document.getElementById('cart-prezzo-totale').textContent = prezzoTotale ? `Prezzo totale: ${prezzoTotale} €` : 'Nessun articolo nel carrello.';


function creaImmagine(src) {
  const img = document.createElement('img');
  img.src = src;
  img.style.width = '100%'; // opzionale        
  return img;
}

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
    }, modello: {
        mountainBike: 459.99,
        bmx: 259.99,
        corsa: 899.99
    }
};

const immagini = {
  manubriobmx: creaImmagine('img/manubrio-bmx.png'),
  manubrioclassico: creaImmagine('img/manubrio-classico.png'),
  manubriocorsa: creaImmagine('img/manubrio-corsa.png'),
  manubriomountain: creaImmagine('img/manubrio-mountain.png'),
  ruotamountain: creaImmagine('img/mountainbike-tire.png'),
  ruotabmx: creaImmagine('img/tire-BMX.png'),
  ruotacorsa: creaImmagine('img/racing-tire.png'),
  sellabmx: creaImmagine('img/sella-bmx.png'),
  sellaclassica: creaImmagine('img/sella-classica.png'),
  sellacorsa: creaImmagine('img/sella-corsa.png'),
  sellamountain: creaImmagine('img/sella-mountain.png'),
  portatelefono: creaImmagine('img/porta-telefono.png'),
  borraccia: creaImmagine('img/borraccia.png'),
  mountainbike: creaImmagine('img/mountain.jpg'),
  corsabike: creaImmagine('img/racing.png'),
  bmxbike: creaImmagine('img/bmx.jpg')
};



const configSalvata = localStorage.getItem('configurazioneBici');
console.log("Configurazione salvata:", configSalvata);
const config = JSON.parse(configSalvata);

 if (configSalvata) {
        const config = JSON.parse(configSalvata);
        let pagina = "mountainBike.html";
        if (config.modello === "bmx") pagina = "bmxBike.html";
        else if (config.modello === "corsa") pagina = "RacingBike.html";
        document.getElementById("edit-btn").onclick = () => window.location.href = pagina;
        }

// Pulisci i div
document.getElementById('modello').innerHTML = '';
document.getElementById('manubrio').innerHTML = '';
document.getElementById('ruote').innerHTML = '';
document.getElementById('sella').innerHTML = '';
document.getElementById('accessori').innerHTML = '';

// Modello
switch (config.modello) {
case 'mountainBike':
document.getElementById('modello').appendChild(immagini.mountainbike);
const modelloTextMountain = document.createElement('p');
modelloTextMountain.textContent = `Mountain Bike - Prezzo: ${prezziComponenti.modello.mountainBike} €`;
document.getElementById('modello').appendChild(modelloTextMountain);
break;

case 'bmx':
document.getElementById('modello').appendChild(immagini.bmxbike);
const modelloTextBMX = document.createElement('p');
modelloTextBMX.textContent = `BMX - Prezzo: ${prezziComponenti.modello.bmx} €`;
document.getElementById('modello').appendChild(modelloTextBMX);
break;

case 'corsa':
document.getElementById('modello').appendChild(immagini.corsabike);
const modelloTextCorsa = document.createElement('p');
modelloTextCorsa.textContent = `Bicicletta da Corsa - Prezzo: ${prezziComponenti.modello.corsa} €`;
document.getElementById('modello').appendChild(modelloTextCorsa);
break;
}

// Manubrio
switch (config.manubrio) {
case 'bmx':
document.getElementById('manubrio').appendChild(immagini.manubriobmx);
const manubrioTextBMX = document.createElement('p');
manubrioTextBMX.textContent = `Manubrio BMX - Prezzo: ${prezziComponenti.manubrio.bmx} €`;
document.getElementById('manubrio').appendChild(manubrioTextBMX);
break;

case 'classic':
document.getElementById('manubrio').appendChild(immagini.manubrioclassico);
const manubrioTextClassic = document.createElement('p');
manubrioTextClassic.textContent = `Manubrio Classico - Prezzo: ${prezziComponenti.manubrio.classic} €`;
document.getElementById('manubrio').appendChild(manubrioTextClassic);
break;

case 'mountain':
document.getElementById('manubrio').appendChild(immagini.manubriomountain);
const manubrioTextMountain = document.createElement('p');
manubrioTextMountain.textContent = `Manubrio Mountain Bike - Prezzo: ${prezziComponenti.manubrio.mountain} €`;
document.getElementById('manubrio').appendChild(manubrioTextMountain);
break;

case 'corsa':
document.getElementById('manubrio').appendChild(immagini.manubriocorsa);
const manubrioTextCorsa = document.createElement('p');
manubrioTextCorsa.textContent = `Manubrio Bicicletta da Corsa - Prezzo: ${prezziComponenti.manubrio.corsa} €`;
document.getElementById('manubrio').appendChild(manubrioTextCorsa);
break;
}

// Ruote
switch (config.ruote) {
case 'mountain':
document.getElementById('ruote').appendChild(immagini.ruotamountain);
const ruoteTextMountain = document.createElement('p');
ruoteTextMountain.textContent = `Ruota Mountain Bike - Prezzo: ${prezziComponenti.ruote.mountain} €`;
document.getElementById('ruote').appendChild(ruoteTextMountain);
break;

case 'bmx':
document.getElementById('ruote').appendChild(immagini.ruotabmx);
const ruoteTextBMX = document.createElement('p');
ruoteTextBMX.textContent = `Ruota BMX - Prezzo: ${prezziComponenti.ruote.bmx} €`;
document.getElementById('ruote').appendChild(ruoteTextBMX);
break;

case 'corsa':
document.getElementById('ruote').appendChild(immagini.ruotacorsa);
const ruoteTextCorsa = document.createElement('p');
ruoteTextCorsa.textContent = `Ruota Bicicletta da Corsa - Prezzo: ${prezziComponenti.ruote.corsa} €`;
document.getElementById('ruote').appendChild(ruoteTextCorsa);
break;
}

// Sella
switch (config.sella) {
case 'mountain':
document.getElementById('sella').appendChild(immagini.sellamountain);
const modelloTextSellaMountain = document.createElement('p');
modelloTextSellaMountain.textContent = `Sella Mountain Bike - Prezzo: ${prezziComponenti.sella.mountain} €`;
document.getElementById('sella').appendChild(modelloTextSellaMountain);
break;

case 'bmx':
document.getElementById('sella').appendChild(immagini.sellabmx);
const modelloTextSellaBMX = document.createElement('p');
modelloTextSellaBMX.textContent = `Sella BMX - Prezzo: ${prezziComponenti.sella.bmx} €`;
document.getElementById('sella').appendChild(modelloTextSellaBMX);
break;

case 'corsa':
document.getElementById('sella').appendChild(immagini.sellacorsa);
const modelloTextSellaCorsa = document.createElement('p');
modelloTextSellaCorsa.textContent = `Sella Bicicletta da Corsa - Prezzo: ${prezziComponenti.sella.corsa} €`;
document.getElementById('sella').appendChild(modelloTextSellaCorsa);
break;

case 'classic':
document.getElementById('sella').appendChild(immagini.sellaclassica);
const modelloTextSellaClassic = document.createElement('p');
modelloTextSellaClassic.textContent = `Sella Classica - Prezzo: ${prezziComponenti.sella.classic} €`;
document.getElementById('sella').appendChild(modelloTextSellaClassic);
break;
}

// Accessori
if (config.accessori) {
        if (config.accessori.portaTelefono) {
                document.getElementById('accessori').appendChild(immagini.portatelefono);
        }
        if (config.accessori.portaborraccia) {
                document.getElementById('accessori').appendChild(immagini.borraccia);
        }
}

console.log("Configurazione caricata:", config);

// function openActiveConfigurator() {
//         if (config.modello === 'mountainBike') {
//                 window.location.href = 'mountainBike.html';
//         }
//         else if (config.modello === 'bmx') {
//                 window.location.href = 'bmxBike.html';
//         }
//         else if (config.modello === 'corsa') {
//                 window.location.href = 'racingBike.html';
//         } // corsa è da ricontrollare quando la fn viene applicata correttamente
// }