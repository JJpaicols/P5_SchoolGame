class Platform {

  // Aggiunta di un parametro per il range di movimento (0 = piattaforma statica)
  constructor(x, y, w, h, coloreCorpo, coloreTop, rangeMovimento = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.coloreCorpo = coloreCorpo; 
    this.coloreTop = coloreTop;     

    // movimento
    this.xIniziale = x;
    this.range = rangeMovimento; 
    this.velocita = 2; // Velocità dello spostamento

  }


// Aggiornamento della posizione per piattaforme mobili
update() {
    // Si muove SOLO SE il range è maggiore di zero
    if (this.range > 0) {
      this.x += this.velocita;
      
      // Se supera i limiti del range, inverte la direzione
      if (this.x > this.xIniziale + this.range || this.x < this.xIniziale) {
        this.velocita *= -1;
      }
    }
}


display() { // Disegna la piattaforma con dettagli grafici
  noStroke(); // Rimuove il bordo per un look più pulito
  
  
  // Lo facciamo solo se siamo all'Inferno (livello 1)
  if (livelloCorrente === 1) {
    for (let i = 10; i > 0; i--) {
      // Crea aloni sempre più grandi e trasparenti
      fill(255, 50, 0, map(i, 0, 10, 50, 0)); 
      rect(this.x - i, this.y - i, this.w + i*2, this.h + i*2, 10); // rect per un effetto più "solido" rispetto a ellipse
    }
  }

  // grafica piattaforma (corpo + parte superiore)
  fill(this.coloreCorpo);
  rect(this.x, this.y + 5, this.w, this.h - 5, 5);
  
  //grafica parte superiore (più chiara) con un bordo arrotondato
  fill(this.coloreTop);
  rect(this.x, this.y, this.w, 10, 5);

   
  // Una riga bianca sottile per dare l'effetto riflesso
  fill(255, 255, 255, 100);
  rect(this.x + 5, this.y + 2, this.w - 10, 2, 1);

  

    
    // Effetti speciali per ogni livello
    if (livelloCorrente === 1 && random(1) > 0.85) { // Leggermente più frequenti
    let sx = this.x + random(this.w); // Posizione casuale lungo la piattaforma
    let sy = this.y + random(this.h); // Posizione casuale lungo l'altezza della piattaforma
    let sz = random(3, 6); // Dimensione variabile

    // Bagliore esterno (Glow)
    fill(255, 150, 0, 150);
    noStroke();
    ellipse(sx, sy, sz * 2.5); // Un alone arancione più grande

    //Centro luminoso (Brillante)
    fill(255, 255, 200); // Giallo quasi bianco
    ellipse(sx, sy, sz);
    }

    let sfarfallio = map(sin(frameCount * 0.2), -1, 1, 100, 255); // Sfarfallio lento
    fill(255, 200, 50, sfarfallio);
    // Disegna piccoli punti di luce fissi che pulsano sui bordi
    ellipse(this.x + 10, this.y + 2, 4, 4);
    ellipse(this.x + this.w - 10, this.y + 2, 4, 4);



    
    // Effetto erba per il Paradiso
    if (livelloCorrente === 2) {
        fill(34, 139, 34); // Verde erba
        for (let i = 0; i < this.w; i += 20) { // Ogni 20 pixel
            triangle(this.x + i, this.y, this.x + i + 5, this.y - 5, this.x + i + 10, this.y); // Piccoli triangoli per l'erba
        }
    }

}

}



