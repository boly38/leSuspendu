class JeuPendu {
  constructor() {
    this.mots = (new ListeDeMots()).mots;
    this.mot = this.choisirUnMot();
    this.jeuFini = false;
    this.tourRestants = 12;
    this.lettresChoisies = [];
    // console.info("ordinateur a choisit le mot " + this.mot);
    console.info("ordinateur a choisit un mot de longueur" + this.mot.length);
    this.afficheMot();
  }

  choisirUnMot() {
    var index = this.nombreAleatoire(0, this.mots.length-1);
    // console.info("ordinateur a choisit l'index  " + index);
    return this.mots[index];
  }

  estDansLeMot(lettre) {
    return (this.mot.indexOf(lettre) != -1);
  }

  estDansLesLettresChoisies(lettre) {
    return (this.lettresChoisies.indexOf(lettre) != -1);
  }
  
  motMasque() {
    var motMasque = "";
    var estTrouve = true;
    for (var i = 0; i < this.mot.length; i++) {
      var lettre = this.mot.charAt(i);
      if (this.estDansLesLettresChoisies(lettre)) {
        motMasque = motMasque + lettre;
      } else {
        motMasque = motMasque + "_";
        estTrouve = false;
      }
    }
	return motMasque;
  }

  afficheMot() {
    var motMasque = "";
    var estTrouve = true;
    for (var i = 0; i < this.mot.length; i++) {
      var lettre = this.mot.charAt(i);
      if (this.estDansLesLettresChoisies(lettre)) {
        motMasque = motMasque + lettre;
      } else {
        motMasque = motMasque + "_";
        estTrouve = false;
      }
    }
    if (estTrouve) {
      this.jeuFini = true;
	  this.succes = true;
      console.info("BRAVO! c'était bien ça ", this.mot);
      return;
    }
    console.info(" ", motMasque, "reste ", this.tourRestants, "tour(s)");
  }

  prochainTour(keyName, cb) {
    console.info("touche", keyName);
    if (this.estDansLesLettresChoisies(keyName)) {
      this.tourRestants--;
      console.info("déjà choisie, c'est balot !");
    } else if (!this.estDansLeMot(keyName)) {
      this.tourRestants--;
    }
    this.lettresChoisies.push(keyName);
    this.afficheMot();
    if (this.tourRestants == 0) {
        console.info("Jeu terminé!");
        console.info("PERDU! c'était ", this.mot);
        this.jeuFini = true;
		this.succes = false;
    }
    cb();
  }

  estTermine() {
    return this.jeuFini;
  }

  // On renvoie un nombre aléatoire entre une valeur min (incluse)
  // et une valeur max (exclue)
  nombreAleatoire(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

}
