class Enemy {

  // Il costruttore prende la piattaforma su cui si muove e le immagini per entrambe le direzioni

  constructor(plat, imgDx, imgSx) {
    this.plat = plat; 
    this.imgDx = imgDx; // Immagine rivolta a destra
    this.imgSx = imgSx; // Immagine rivolta a sinistra
    this.w = 90; 
    this.h = 90;
    this.x = plat.x + plat.w / 2; // Inizia al centro della piattaforma
    this.y = plat.y - this.h; 
    this.velocita = 2.5; 
  }

  // Aggiorna la posizione dell'enemy e gestisce il cambio di direzione ai bordi della piattaforma
update() {
    this.x += this.velocita; // Si muove orizzontalmente

    // Inverte la marcia ai bordi della piattaforma
    if (this.x <= this.plat.x || this.x + this.w >= this.plat.x + this.plat.w) { // Controlla i bordi
      this.velocita *= -1;// Inverte la direzione
    }
}


// Disegna l'enemy con l'immagine corretta in base alla direzione
display() {
    // Se la velocità è positiva (va a destra) usa imgDx, altrimenti imgSx
    let immagineCorrente = (this.velocita > 0) ? this.imgDx : this.imgSx; // Sceglie l'immagine in base alla direzione
    image(immagineCorrente, this.x, this.y, this.w, this.h); // Disegna l'enemy
}


//controllo collisione con il player
controllaCollisione(player) {
    let m = 15; // Margine di tolleranza
    return (player.x + m < this.x + this.w - m && // Controlla i bordi del player con un margine
            player.x + player.w - m > this.x + m && // Controlla i bordi del player con un margine
            player.y + m < this.y + this.h - m && // Controlla i bordi del player con un margine
            player.y + player.h - m > this.y + m); // Controlla i bordi del player con un margine
}
}