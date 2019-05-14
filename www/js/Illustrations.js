class Illustration {
  constructor({
	auteur = 'Anonyme',
	description = '',
	imagePrefix = null
  }) {
	  this.dossier = "assets/";
      this.auteur = auteur;
      this.description = description;
      this.imagePrefix = imagePrefix;
  }
  
  imageDuTour(tour) {
	  return this.dossier + this.imagePrefix + "_" + tour + ".jpg";
  }
}

class Illustrations {
  constructor() {
      this.illustrations = [
		new Illustration({auteur:"Brice",description:"le classique",imagePrefix:"pendu_400_3"}),
		new Illustration({auteur:"Mathéo",description:"le bonhomme",imagePrefix:"pendu_400_1"})
      ];
  }

  illustrationAleatoire() {
	  return this.illustrations[Math.floor(Math.random() * this.illustrations.length)];
  }
  
  
}