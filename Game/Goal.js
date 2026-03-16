class Goal {

  // Il costruttore del goal prende posizione, dimensioni e un'immagine opzionale
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
  }


  // Disegna il goal (la chiave) se l'immagine è disponibile
  display() {
    if (this.img) {
      image(this.img, this.x, this.y, this.w, this.h); // Disegna l'immagine della chiave
    }
  }


  // Controlla se il player ha raggiunto il goal (vittoria)
  controllaVittoria(player) {
    // Riduciamo l'area sensibile della chiave.
    // Usiamo un padding alto per la parte inferiore (y)
    let paddingX = 20;// Più alto è questo valore, più Dante deve "entrare" nella chiave per prenderla
    let paddingY = 20; // Più alto è questo valore, più Dante deve "salire" per prenderla

    return (player.x + paddingX < this.x + this.w - paddingX && // Controlla se Dante è a sinistra del goal con un margine
            player.x + player.w - paddingX > this.x + paddingX && // Controlla se Dante è a destra del goal con un margine
            player.y + paddingY < this.y + this.h - paddingY && // Controlla se Dante è sopra del goal con un margine
            player.y + player.h - paddingY > this.y + paddingY); // Controlla se Dante è sotto del goal con un margine
}
}