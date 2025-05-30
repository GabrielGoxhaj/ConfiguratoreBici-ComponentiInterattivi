// Recupera il prezzo totale dal localStorage e lo mostra
const prezzoTotale = localStorage.getItem('prezzoTotale');
document.getElementById('cart-prezzo-totale').textContent = prezzoTotale ? `Prezzo totale: ${prezzoTotale} €` : 'Nessun articolo nel carrello.';


function creaImmagine(src) {
  const img = document.createElement('img');
  img.src = src;
  img.style.width = '100%'; // opzionale        
  return img;
}

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
break;
case 'bmx':
document.getElementById('modello').appendChild(immagini.bmxbike);
break;
case 'corsa':
document.getElementById('modello').appendChild(immagini.corsabike);
break;
}

// Manubrio
switch (config.manubrio) {
case 'bmx':
document.getElementById('manubrio').appendChild(immagini.manubriobmx);
break;
case 'classic':
document.getElementById('manubrio').appendChild(immagini.manubrioclassico);
break;
case 'mountain':
document.getElementById('manubrio').appendChild(immagini.manubriomountain);
break;
case 'corsa':
document.getElementById('manubrio').appendChild(immagini.manubriocorsa);
break;
}

// Ruote
switch (config.ruote) {
case 'mountain':
document.getElementById('ruote').appendChild(immagini.ruotamountain);
break;
case 'bmx':
document.getElementById('ruote').appendChild(immagini.ruotabmx);
break;
case 'corsa':
document.getElementById('ruote').appendChild(immagini.ruotacorsa);
break;
}

// Sella
switch (config.sella) {
case 'mountain':
document.getElementById('sella').appendChild(immagini.sellamountain);
break;
case 'bmx':
document.getElementById('sella').appendChild(immagini.sellabmx);
break;
case 'corsa':
document.getElementById('sella').appendChild(immagini.sellacorsa);
break;
case 'classic':
document.getElementById('sella').appendChild(immagini.sellaclassica);
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