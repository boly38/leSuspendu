const ListeDeMots = require('./ListeDeMots.js');

class JeuPendu {
  constructor() {
    this.mots = (new ListeDeMots()).mots;
    this.mot = this.choisirUnMot();
    console.info("ordinateur a choisit le mot " + this.mot);
  };

  choisirUnMot() {
    let index = this.nombreAleatoire(0, this.mots.length-1);
    console.info("ordinateur a choisit l'index  " + index);
    return this.mots[index];
  };

  // On renvoie un nombre aléatoire entre une valeur min (incluse)
  // et une valeur max (exclue)
  nombreAleatoire(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  };

}


module.exports = JeuPendu;