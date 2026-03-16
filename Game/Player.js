class Player {


  //imgDx e imgSx sono le immagini per le direzioni destra e sinistra
  constructor(imgDx, imgSx) {

    this.imgDx = imgDx; // Immagine rivolta a destra
    this.imgSx = imgSx; // Immagine rivolta a sinistra
    this.imgCorrente = imgDx; // Immagine attuale (di default rivolta a destra)
    
    
    this.w = 150;
    this.h = 150;
    this.reset();
    this.gravita = 0.8;
    this.forzaSalto = -18;
    this.velocitaX = 5;
  }


// Resetta la posizione e lo stato del giocatore (utile per quando muore)
reset() {
  this.x = 100;    // Un po' più a destra del bordo sennò non si vedeva
  this.y = 600;    // Coordinate che lo facciano cadere dolcemente sul pavimento
  this.velocitaX = 0;
  this.velocitaY = 0;
  this.aTerra = false; // Per sapere se può saltare
  this.imgCorrente = this.imgDx; // Resetta l'immagine a quella rivolta a destra
}


//movimento, la gravità e i limiti dello schermo
update() {
  // Gestione movimento orizzontale
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // Freccia destra o 'D'
    this.velocitaX = 8; 
    this.imgCorrente = this.imgDx;
  } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // Freccia sinistra o 'A'
    this.velocitaX = -8; 
    this.imgCorrente = this.imgSx;
  } else {
    this.velocitaX = 0; 
  }

  //gravità e movimento
  this.velocitaY += this.gravita;
  this.y += this.velocitaY;
  this.x += this.velocitaX;

  // Limiti bordi (Soffitto, Sinistra, Pavimento)
  if (this.y < 0) { this.y = 0; this.velocitaY = 0; }
  if (this.x < 0) { this.x = 0; }
  if (this.x + this.w > width) { this.x = width - this.w; } // Blocca a destra

  // Limite pavimento (considerando l'altezza del giocatore)
  if (this.y + this.h > height) {
    this.y = height - this.h; // Blocca al pavimento
    this.velocitaY = 0; // Resetta la velocità verticale
    this.aTerra = true; // Permette di saltare di nuovo
    } 
}


  // Permette di saltare solo se è a terra

  salta() {
    if (this.aTerra) {
      this.velocitaY = this.forzaSalto;
      this.aTerra = false;
    }
  }


// Disegna il giocatore con un offset grafico per "abbassarlo"

display() {
    let offsetGrafico = 35; // Aumenta questo numero per "abbassare" il personaggio
  
    if (this.imgCorrente) {
        // Aggiungiamo l'offset alla Y solo nel disegno
        image(this.imgCorrente, this.x, this.y + offsetGrafico, this.w, this.h);
    } else {
        fill(255, 0, 0);
        rect(this.x, this.y, this.w, this.h);
    }
 }

//camminare sulle piattaforme 
controllaCollisione(p) {
  if (this.velocitaY >= 0 && // Controlla se Dante sta cadendo
      this.x + this.w - 40 > p.x && // Aumenta il padding a 40: Dante deve "entrare" un po' nella piattaforma per atterrare
      this.x + 40 < p.x + p.w && // Aumenta il padding a 40 anche a sinistra
      this.y + this.h > p.y && // Controlla se Dante è sotto la piattaforma
      this.y + this.h < p.y + p.h) { // Controlla se Dante è sopra la piattaforma
    
    this.y = p.y - this.h; // Posiziona Dante esattamente sopra la piattaforma
    this.velocitaY = 0; // Resetta la velocità verticale
    this.aTerra = true;

    // SE la piattaforma è mobile (range > 0), Dante si sposta con lei
    if (p.range > 0) {
      this.x += p.velocita;
    }
  }
}

// Controllo per i nemici, con un padding più ampio per rendere la collisione più "giusta"
controllaCollisioneNemico(nemico) {
    // Aumentiamo il padding a 45: Dante deve "entrare" molto nel nemico per morire
    let paddingX = 45; 
    let paddingY = 30;
    
    return (this.x + paddingX < nemico.x + nemico.w - paddingX && // Controlla se Dante è a sinistra del nemico
            this.x + this.w - paddingX > nemico.x + paddingX && // Controlla se Dante è a destra del nemico
            this.y + paddingY < nemico.y + nemico.h - paddingY && // Controlla se Dante è sopra del nemico
            this.y + this.h - paddingY > nemico.y + paddingY); // Controlla se Dante è sotto del nemico
}

} 