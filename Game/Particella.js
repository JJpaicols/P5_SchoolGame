class Particella {

  // Il costruttore inizializza la particella con valori casuali
  constructor() {
    this.reset();
  }

  // Resetta la particella con nuove posizioni, velocità e dimensioni casuali
  reset() {
    this.x = random(-100, width + 100); // Può iniziare leggermente fuori dallo schermo per un effetto più naturale
    this.alpha = random(100, 200); // Opacità iniziale casuale per variare la visibilità
    


    // Impostazioni diverse per Inferno e Purgatorio
    if (livelloCorrente === 1) {
      // SETTAGGI INFERNO (Scintille piccole e veloci)
      this.y = height + random(200);
      this.vy = random(-2, -5);
      this.vx = random(-1, 1);
      this.size = random(3, 6);
    } else {
      // SETTAGGI PURGATORIO (Nebbia grande e lentissima)
      this.y = random(height); // La nebbia appare ovunque a schermo
      this.vy = random(-0.2, -0.5); 
      this.vx = random(-0.5, 0.5);
      this.size = random(40, 80); // MOLTO PIÙ GRANDE per fare nebbia
    }
  }


  // Aggiorna la posizione della particella e gestisce lo svanimento
  update() {
    this.x += this.vx; // Movimento orizzontale (per un effetto più dinamico)
    this.y += this.vy; // Movimento verticale (sale lentamente)
    
    // La nebbia svanisce più lentamente della cenere
    let velocitàSvanimento = (livelloCorrente === 1) ? 2 : 0.5; // Velocità di svanimento più lenta per la nebbia, se è 2 svanisce in 50 frame, se è 0.5 in 400 frame
    this.alpha -= velocitàSvanimento;

    // Se la particella è completamente trasparente, la resettiamo per farla ricomparire
    if (this.alpha <= 0) {
      this.reset();
    }
  }


  // Disegna la particella con stili diversi per Inferno e Purgatorio
  display() {
    noStroke(); // Rimuove il bordo per un look più pulito
    if (livelloCorrente === 1) {
      // Disegno Scintilla
      fill(255, 150, 0, this.alpha);
      ellipse(this.x, this.y, this.size);
    } else if (livelloCorrente === 2) {
      // DISEGNO NEBBIA (Cerchi azzurri molto sfumati)
      // Usiamo più strati per farla sembrare vapore
      fill(200, 220, 255, this.alpha * 0.2); // Colore azzurro molto trasparente
      ellipse(this.x, this.y, this.size);
      fill(255, 255, 255, this.alpha * 0.1);
      ellipse(this.x, this.y, this.size * 0.6); // Un cerchio più piccolo e più trasparente sopra per dare profondità
    }
  }
}