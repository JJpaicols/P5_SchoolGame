// --- VARIABILI GLOBALI ---

let stato = "MENU"; 
let livelloCorrente = 1;
let imgPlayer;
let player;
let piattaforme = []; // Array per contenere i livelli

let imgPlayerDx, imgPlayerSx;

let imgMenu;

let sfondi = [];

let traguardo;

let imgPausa;

let imgVittoria, imgSconfitta;
let btnRigiocaVittoria, btnEsciVittoria;
let btnRigiocaSconfitta, btnEsciSconfitta;  


let imgDiavoloDx, imgDiavoloSx;
let nemici = [];

let sistemaCenere = [];

let imgAnimaDx, imgAnimaSx;

let imgCherubinoDx, imgCherubinoSx;

let musicaSfondo;

let btnGioca, btnInfo, btnRiprendi, btnEsci, btnRicomincia;

// CARICAMENTO IMMAGINI E SUONI
function preload() {
  imgPlayerDx = loadImage('img/omino.png'); 
  imgPlayerSx = loadImage('img/ominoSx.png');

  sfondi[1] = loadImage('img/inferno.png');
  sfondi[2] = loadImage('img/purgatorio.png');
  sfondi[3] = loadImage('img/paradiso.png');

  imgMenu = loadImage('img/inizio.png');


  imgChiave = loadImage('img/chiave.png');

  imgPausa = loadImage('img/menu.png');

  imgVittoria = loadImage('img/vittoria.png'); 
  imgSconfitta = loadImage('img/perdi.png');

  imgDiavoloDx = loadImage('img/diavolo.png');
  imgDiavoloSx = loadImage('img/diavoloSx.png');

  imgAnimaDx = loadImage('img/animaSx.png'); 
  imgAnimaSx = loadImage('img/anima.png');

  imgCherubinoDx = loadImage('img/cherubino.png'); 
  imgCherubinoSx = loadImage('img/cherubinoSx.png');

  musicaSfondo = loadSound('img/suono.mp3');
}


//SETUP
// Inizializza il canvas, il player, i bottoni e le particelle per la cenere
// Bottoni del menu e della pausa (anche se invisibili, servono per gestire il mouseOver) 
// Per il menu iniziale che è un immagine con scritte, li rendiamo invisibili (true) e con colore trasparente, così non si vedono ma funzionano lo stesso

function setup() {
  createCanvas(1435, 905); 
  textAlign(CENTER, CENTER);

  player = new Player(imgPlayerDx, imgPlayerSx);

  // Bottoni invisibili per il menu
  btnGioca = new Button(400, 430, 638, 50, "", color(0), true); 
  btnInfo = new Button(628, 560, 185, 40, "", color(0), true);
  
  // Bottoni per la PAUSA (servono o avrai errori quando premi ESC)
  btnRiprendi = new Button(600, 350, 200, 50, "RIPRENDI", color(0, 0, 0, 150));
  btnRicomincia = new Button(600, 450, 200, 50, "RICOMINCIA", color(0, 0, 0, 150));
  btnEsci = new Button(600, 550, 200, 50, "ESCI", color(0, 0, 0, 150));

  // BOTTONI VITTORIA
  btnRigiocaVittoria = new Button(1230, 770, 180, 60, "", color(255, 0, 0, 100), true); 
  btnEsciVittoria = new Button(1230, 850, 180, 60, "", color(255, 0, 0, 100), true);

  // BOTTONI SCONFITTA
  btnRigiocaSconfitta = new Button(1230, 770, 180, 60, "", color(255, 0, 0, 100), true);
  btnEsciSconfitta = new Button(1230, 850, 180, 60, "", color(255, 0, 0, 100), true);


  // Inizializza il sistema di particelle per la cenere (250 particelle)
  for (let i = 0; i < 250; i++) {
    sistemaCenere.push(new Particella());
    }
}


// FUNZIONE PER GESTIRE LE VARI PARTI DEL GIOCO (MENU, INFO, GIOCO, PAUSA, VITTORIA, GAMEOVER)

function draw() {
  background(200);

  if (stato === "MENU") {
    disegnaMenuIniziale();
  } else if (stato === "INFO") { 
    disegnaSchermataInfo();
  } else if (stato === "GIOCO") {
    eseguiGioco();
  } else if (stato === "PAUSA") {
    disegnaMenuPausa();
  } else if (stato === "VITTORIA") {
    disegnaSchermataVittoria();
  } else if (stato === "GAMEOVER") {
    disegnaSchermataSconfitta();
  }
}


// --- FUNZIONI DI DISEGNO ---

function disegnaMenuIniziale() {
  
  image(imgMenu, 0, 0, width, height);
  
  cursor(ARROW); //La frecia del mouse per il menu (non serve negli altri stati) deve essere visibile

 // BOTTONI NEL MENU INIZIALE (invisibili ma funzionanti) PER GIOCARE E INFO
  btnGioca.display();
  btnInfo.display();
}


// SCHERMATA INFO: SFOCATURA + VELO + TESTO


function disegnaSchermataInfo() {
  push(); // Isola gli stili per non influenzare il resto del gioco
  
  //Disegna l'immagine di sfondo
  image(imgMenu, 0, 0, width, height);
  
  //Applica la SFOCATURA (BLUR) + è alto il numero più è sfocato
  
  filter(BLUR, 5); 
  
  //Applica il "VELO" nero semitrasparente, valore 160 colore nero con alpha 160 (0-255), alpha è la dissolvenza 
  
  noStroke();
  fill(0, 0, 0, 160); 
  rect(0, 0, width, height);

  //METTO IL TESTO AL CENTRO
  textAlign(CENTER, CENTER);

  // TITOLO 
  textSize(85);
  textStyle(BOLD); 
  fill(255, 215, 0); 
  text("NEL MEZZO DEL CAMMIN", width / 2, 150);

  //  LA STORIA
  textStyle(ITALIC);
  fill(255, 245, 230, 240); // bianco avorio
  textSize(26);
  
  let yStoria = 350; // Posizione verticale iniziale del testo della storia
  text("« Perder la traccia nell'oscura selva è il principio del periglio. »", width / 2, yStoria);
  text("Guida il Sommo Poeta attraverso le fiamme dell'Inferno,", width / 2, yStoria + 45);
  text("scala le balze del Purgatorio e spezza le catene del peccato.", width / 2, yStoria + 90);
  text("Ogni Chiave della Sapienza raccolta è un passo verso la luce,", width / 2, yStoria + 135);
  text("fino a che l'etere non si aprirà per volgere lo sguardo al Paradiso.", width / 2, yStoria + 180);

  // COMANDI 
  stroke(255, 215, 0, 100);
  strokeWeight(2);
  line(width/2 - 250, 610, width/2 + 250, 610);
  noStroke();
  

  // TITOLO COMANDI
  textStyle(NORMAL);
  fill(255, 215, 0);
  textSize(22);
  text("L'ARTE DEL MOVIMENTO", width / 2, 650);
  fill(255);
  textSize(20);
  text("FRECCE/WASD: Movimento  •  SPAZIO: Salto  •  ESC: Pausa", width / 2, 690);

  // TESTO PULSANTE
  fill(255, 255, 255, map(sin(frameCount * 0.05), -1, 1, 80, 255));
  textSize(18);
  text("Clicca una lettera per tornare alla soglia", width / 2, height - 80);
  
  pop(); // Ripristina gli stili normali per il resto del gioco, funzione trovata su AI
}


// SCHERMATA PAUSA: SFOCATURA + IMMAGINE + BOX COMANDI + BOTTONI

function disegnaMenuPausa() {
  push(); // Isola gli stili per non influenzare il resto del gioco, simile al pop precedente
  
  filter(BLUR, 3); 

  image(imgPausa, 0, 0, width, height);

  // BOX DEI COMANDI (Nero Trasparente)
  fill(0, 0, 0, 150); 
  noStroke();
  rect(100, 250, 350, 220, 20); // Rettangolo arrotondato
  
  fill(255); // Testo bianco
  textAlign(LEFT, TOP);
  textSize(25);
  text("GUIDA RAPIDA:", 130, 280);
  textSize(20);
  text("• FRECCE: Cammina\n• SPAZIO: Salto\n• ESC: Riprendi", 130, 330);

  // BOTTONI DELLA PAUSA
  btnRiprendi.display();
  btnRicomincia.display();
  btnEsci.display();
  
  pop();
}


// SCHERMATA VITTORIA E SCONFITTA: IMMAGINE + BOTTONI

function disegnaSchermataVittoria() {
  if (musicaSfondo.isPlaying()) musicaSfondo.stop(); // Ferma la musica alla Vittoria
  image(imgVittoria, 0, 0, width, height);
  btnRigiocaVittoria.display();
  btnEsciVittoria.display();
}

function disegnaSchermataSconfitta() {
  if (musicaSfondo.isPlaying()) musicaSfondo.stop(); // Ferma la musica al Game Over
  image(imgSconfitta, 0, 0, width, height);
  btnRigiocaSconfitta.display();
  btnEsciSconfitta.display();
}




//FUNZIONI DI GIOCO

function eseguiGioco() {

  // Avvia la musica di sottofondo se non è già in riproduzione
  if (musicaSfondo && !musicaSfondo.isPlaying()) {
    musicaSfondo.setVolume(0.5); 
    musicaSfondo.loop();
  }


    //  DISEGNA LO SFONDO DEL LIVELLO CORRENTE
    if (sfondi[livelloCorrente]) {
        image(sfondi[livelloCorrente], 0, 0, width, height);
    }

    //GESTIONE ATMOSFERA PER LIVELLO 1 - 2 - 3 
    if (livelloCorrente === 1) {
        for (let p of sistemaCenere) { // for per scorrere tutte le particelle della cenere, chiesto ad AI
            p.update(); // Scintille normali
            p.display();
        }
    } 



    else if (livelloCorrente === 2) {
        //CENERE IN NEBBIA
        for (let p of sistemaCenere) { // for per scorrere tutte le particelle della cenere, chiesto ad AI
            p.vy = random(-0.2, -0.8); // Molto lenta a salire
            p.vx = random(-2, 2);      // Si muove molto lateralmente (vento)
            p.size = random(10, 30);   // Diventa grande come nuvolette
            
            p.update(); // Aggiorna la posizione della particella
            
            // Disegniamo la nebbia (azzurro/bianco molto trasparente)
            noStroke();
            fill(200, 220, 255, p.alpha * 0.1); 
            ellipse(p.x, p.y, p.size * 2); 
        }
    }


    // Velo blu/azzurro per il Purgatorio/LIVELLO 2
    if (livelloCorrente === 2) {
        fill(100, 150, 255, 30); // Un velo blu/azzurro molto trasparente
        rect(0, 0, width, height);
    }


    // LIVELLO 3: PARTICELLE COME LUCE DORATA CHE CADONO LENTAMENTE
    else if (livelloCorrente === 3) {
        // TRASFORMIAMO LE PARTICELLE IN LUCE DORATA
        for (let p of sistemaCenere) { // for per scorrere tutte le particelle della cenere, chiesto ad AI
            p.vy = random(0.5, 1.5); // Cadono lentamente come petali
            p.vx = sin(frameCount * 0.01) * 2; // Oscillano dolcemente
            p.size = random(2, 5); // Piccole come scintille o petali
            p.update(); // Aggiorna la posizione della particella
            
            noStroke(); // noStroke serve per non disegnare il contorno delle particelle 
            fill(255, 255, 150, p.alpha); 
            ellipse(p.x, p.y, p.size);
        }
        // Velo di luce bianca
        fill(255, 255, 255, 20);
        rect(0, 0, width, height); // Un velo di luce bianca molto trasparente per rendere tutto più etereo
    }

    player.aTerra = false; // Resettiamo variabile,player su piattaforma true, altrimenti false e il player cade

    //DISEGNA LE PIATTAFORME E CONTROLLA LA COLLISIONE CON IL PLAYER

    for (let p of piattaforme) {
        p.update();
        p.display();
        player.controllaCollisione(p);
    }

    // DISEGNA I NEMICI, LI FA MUOVERE E CONTROLLA LA COLLISIONE CON IL PLAYER

    for (let n of nemici) {
        n.update();
        n.display();
        
        // Questa riga deve usare la funzione del PLAYER
        if (player.controllaCollisioneNemico(n)) {
            console.log("Colpito!"); 
            stato = "GAMEOVER"; 
        }
    }

    // DISEGNA LA CHIAVE
    if (traguardo) {
        traguardo.display();
    }

    // CONTROLLA SE L'OMINO PRENDE LA CHIAVE
    if (traguardo && traguardo.controllaVittoria(player)) {
        livelloCorrente++;
        if (livelloCorrente > 3) {
            stato = "VITTORIA";
        } else {
            caricaLivello(livelloCorrente);
            player.reset(); // Resetta la posizione del player per il nuovo livello
        }
    }

    player.update(); // Aggiorna la posizione del player
    player.display(); // Disegna il player dopo le piattaforme e i nemici per essere sopra di loro
}



// INPUT DA TASTIERA E MOUSE

function keyPressed() { // Gestione del tasto ESC per la pausa
  if (keyCode === ESCAPE) {
    if (stato === "GIOCO") stato = "PAUSA";
    else if (stato === "PAUSA") stato = "GIOCO";
  }

  if (stato === "INFO") stato = "MENU";

  if (stato === "GIOCO") {
        // Salto con Freccia Su, Spazio o W
        if (keyCode === UP_ARROW || key === ' ' || keyCode === 87) {   // 87 tasto W
            player.salta();
        }
    }
}


// Gestione del mouse per i bottoni (sia nel menu che nella pausa, vittoria e sconfitta)
function mousePressed() {
  if (stato === "MENU") {
    if (btnGioca.isMouseOver()) iniziaGioco();
    if (btnInfo.isMouseOver()) stato = "INFO";
  } 
  else if (stato === "PAUSA") {
    if (btnRiprendi.isMouseOver()) stato = "GIOCO";
    
    if (btnRicomincia.isMouseOver()) {
      livelloCorrente = 1;           // <-- AGGIUNGI QUESTA RIGA: Forza il ritorno al liv 1
      caricaLivello(livelloCorrente);
      player.reset();
      stato = "GIOCO";
    }
    
    if (btnEsci.isMouseOver()) stato = "MENU";
  }

  if (stato === "VITTORIA") {
    if (btnRigiocaVittoria.isMouseOver()) iniziaGioco();
    if (btnEsciVittoria.isMouseOver()) stato = "MENU";
  } 
  else if (stato === "GAMEOVER") {
    if (btnRigiocaSconfitta.isMouseOver()) iniziaGioco();
    if (btnEsciSconfitta.isMouseOver()) stato = "MENU";
  }
}


// FUNZIONE PER INIZIARE IL GIOCO: CARICA IL LIVELLO 1 E RESETTA LA POSIZIONE DEL PLAYER
function iniziaGioco() {
  livelloCorrente = 1;
  caricaLivello(livelloCorrente); // Prima carichiamo le piattaforme
  player.reset();                 // Poi resettiamo l'omino
  stato = "GIOCO";
}



// GIOCO E LIVELLI

//funzione carica le piattaforme, i nemici e il traguardo in base al numero del livello (1, 2 o 3)
function caricaLivello(n) {
  piattaforme = []; 
  nemici = []; 

  if (n === 1) { // --- INFERNO: IL PERCORSO INIZIALE ---
    let corpo = color(255, 204, 0); 
    let sopra = color(200, 0, 0);   
    piattaforme.push(new Platform(0, 800, width, 105, corpo, sopra)); 
    piattaforme.push(new Platform(300, 650, 300, 30, corpo, sopra));
    piattaforme.push(new Platform(850, 500, 300, 30, corpo, sopra));
    piattaforme.push(new Platform(100, 500, 150, 30, corpo, sopra));
    piattaforme.push(new Platform(350, 350, 200, 30, corpo, sopra));
    piattaforme.push(new Platform(650, 250, 250, 30, corpo, sopra));
    piattaforme.push(new Platform(1000, 200, 150, 30, corpo, sopra));

    nemici.push(new Enemy(piattaforme[1], imgDiavoloDx, imgDiavoloSx));
    nemici.push(new Enemy(piattaforme[2], imgDiavoloDx, imgDiavoloSx));
    traguardo = new Goal(1050, 140, 40, 60, imgChiave); 
  } 



  else if (n === 2) {  // --- PURGATORIO: IL PERCORSO INTERMEDIO ---
    let colCorpo = color(60, 60, 60);
    let colSopra = color(100, 180, 100); 
    
    piattaforme.push(new Platform(0, 800, width, 105, colCorpo, colSopra));
    
    // a 250/300 così il nemico (largo 100) può camminare
    piattaforme.push(new Platform(350, 680, 300, 25, colCorpo, colSopra));
    piattaforme.push(new Platform(700, 580, 250, 25, colCorpo, colSopra));
    piattaforme.push(new Platform(1000, 480, 250, 25, colCorpo, colSopra));
    piattaforme.push(new Platform(650, 350, 250, 25, colCorpo, colSopra));
    piattaforme.push(new Platform(250, 250, 250, 25, colCorpo, colSopra));
    piattaforme.push(new Platform(550, 140, 250, 25, colCorpo, colSopra)); 

    // Nemici
    nemici.push(new Enemy(piattaforme[1], imgAnimaDx, imgAnimaSx));
    nemici.push(new Enemy(piattaforme[3], imgAnimaDx, imgAnimaSx));
    nemici.push(new Enemy(piattaforme[5], imgAnimaDx, imgAnimaSx));

    traguardo = new Goal(580, 60, 40, 60, imgChiave);
  }



  else if (n === 3) { // --- PARADISO: IL PERCORSO FINALE ---
    let colCorpo = color(240, 240, 240, 220); 
    let colSopra = color(255, 215, 0);        
    
    //Pavimento base
    piattaforme.push(new Platform(0, 800, width, 105, colCorpo, colSopra)); 
    
    //LE 4 PIATTAFORME FERME (con nemici)
    //400px così i nemici hanno spazio per muoversi
    piattaforme.push(new Platform(100, 680, 400, 30, colCorpo, colSopra)); 
    piattaforme.push(new Platform(900, 680, 400, 30, colCorpo, colSopra)); 
    piattaforme.push(new Platform(100, 400, 400, 30, colCorpo, colSopra)); 
    piattaforme.push(new Platform(900, 400, 400, 30, colCorpo, colSopra)); 
    
    // LE 3 PIATTAFORME MOBILI no nemici
    // Posizionate al centro per collegare le piattaforme laterali
    piattaforme.push(new Platform(550, 550, 250, 25, colCorpo, colSopra, 250)); 
    piattaforme.push(new Platform(550, 450, 250, 25, colCorpo, colSopra, 250)); 
    piattaforme.push(new Platform(550, 250, 250, 25, colCorpo, colSopra, 250)); 

    //Piattaforma chiave (In alto a destra)
    piattaforme.push(new Platform(1150, 150, 250, 25, colCorpo, colSopra)); 

    //Solo sulle prime 4 piattaforme ferme) sennò si buggava :)
    nemici.push(new Enemy(piattaforme[1], imgCherubinoDx, imgCherubinoSx));
    nemici.push(new Enemy(piattaforme[2], imgCherubinoDx, imgCherubinoSx));
    nemici.push(new Enemy(piattaforme[3], imgCherubinoDx, imgCherubinoSx));
    nemici.push(new Enemy(piattaforme[4], imgCherubinoDx, imgCherubinoSx));

    // CHIAVE IN ALTO A DESTRA
    traguardo = new Goal(1250, 90, 40, 60, imgChiave);
  }
}
