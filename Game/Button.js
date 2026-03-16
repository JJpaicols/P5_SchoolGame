class Button {

  // Il costruttore del bottone prende posizione, dimensioni, testo, colore e un flag per l'invisibilità
  constructor(x, y, w, h, testo, colore, invisibile = false) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.testo = testo;
    this.coloreBase = colore;
    this.invisibile = invisibile;
  }


  // Disegna il bottone, cambiando colore se il mouse è sopra
  display() {
    // Se il bottone è impostato come invisibile (per il menu), non disegna nulla
    if (this.invisibile) return;

    push(); // Salva lo stato grafico


    // Cambia colore se il mouse è sopra
    if (this.isMouseOver()) { 
      // Schiarisce leggermente il colore (aggiunge 40 alla luminosità)
      fill(red(this.coloreBase) + 40, green(this.coloreBase) + 40, blue(this.coloreBase) + 40, alpha(this.coloreBase)); // Mantiene la stessa trasparenza
      cursor(HAND); // Cambia il cursore in una manina
    } else {
      fill(this.coloreBase);// Colore normale
    }

    noStroke();
    rectMode(CORNER); // Usa x,y come angolo in alto a sinistra
    // Disegna il rettangolo con angoli arrotondati (10px)
    rect(this.x, this.y, this.w, this.h, 10); // Aggiunge un raggio di 10 per gli angoli arrotondati

    // Disegna il testo perfettamente al centro
    fill(255); // Colore del testo (bianco)
    textSize(22);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    
    // Calcolo della posizione centrale
    let centerX = this.x + this.w / 2; 
    let centerY = this.y + this.h / 2;
    
    text(this.testo, centerX, centerY);
    pop();
  }

  // Funzione per capire se il mouse è sopra il bottone
  isMouseOver() {
    return mouseX > this.x && // Controlla se il mouse è a destra del bordo sinistro
           mouseX < this.x + this.w && // Controlla se il mouse è a sinistra del bordo destro
           mouseY > this.y && // Controlla se il mouse è sotto il bordo superiore
           mouseY < this.y + this.h; // Controlla se il mouse è sopra il bordo inferiore
  }
}

