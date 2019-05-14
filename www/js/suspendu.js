class Suspendu {

    constructor() {
	   this.jeu = null;
	   this.toutesleslettres = this.leslettres();
	   this.bienvenue();
    }

	leslettres() {
		var lettres = [];
		// http://www.asciitable.com/
		for (var i = 97;i<=122;i++) {
			lettres.push(String.fromCharCode(i));
		}
		// https://www.w3schools.com/charsets/ref_utf_latin1_supplement.asp
		for (var j = 224;j<=255;j++) {
			lettres.push(String.fromCharCode(j));
		}
		return lettres;
	}

	bienvenue() {
		$("#bienvenue").show();
		$("#suspendu").hide();
		$("#termine").hide();
	}

	nouveauJeu() {
		$("#bienvenue").hide();
		$("#suspendu").show();
		$("#termine").hide();
		this.jeu = new JeuPendu();
	    this.illustration = (new Illustrations()).illustrationAleatoire();
		this.rafraichirJeu();
	}
	
	rafraichirJeu() {
		if (this.jeu.estTermine()) {
			this.afficherIllustration();
			$("#suspendu").hide();
			$("#termine").show();
			$("#termineMot").text(this.jeu.mot);
			if (this.jeu.succes) {
				$("#termineEtat").text("BRAVO");
			} else {
				$("#termineEtat").text("PERDU");
			}
			return;
		}
		this.afficherLettresDisponibles();
		this.afficherLettresChoisies();
		this.afficherMot();
		this.afficherIllustration();
	}

    afficherLettresDisponibles() {
		var jeu = this.jeu;
		var lettresDispoHtml = "";
		this.toutesleslettres.forEach(function(lettre) {
		  if (!jeu.estDansLesLettresChoisies(lettre)) {
			lettresDispoHtml += "<button type=\"button\" class=\"btn btn-circle btn-info btn-sm\" onclick=\"choixLettre('" + lettre + "')\">" + lettre + "</button>";
		  }
		});
		$("#lettresdisponibles").html(lettresDispoHtml);
	}

	afficherLettresChoisies() {
		var jeu = this.jeu;
		var lettresChoisiesHtml = "";
		this.toutesleslettres.forEach(function(lettre) {
		  if (jeu.estDansLesLettresChoisies(lettre) && !jeu.estDansLeMot(lettre)) {
			lettresChoisiesHtml += "<button type=\"button\" class=\"btn btn-warning btn-sm\" disabled>" + lettre + "</button>";
		  }
		});
		$("#lettreschoisies").html(lettresChoisiesHtml);
		if (lettresChoisiesHtml == "") {
		  $("#lettresnonpresentes").hide();
		} else {
		  $("#lettresnonpresentes").show();
		}
	}

    afficherMot() {
		// _ _ _ _ _ D _
		var mot = this.jeu.motMasque();
		console.info(mot);
		$("#motadeviner").html(mot);
		$("#tourRestant").text(this.jeu.tourRestants);
	}
	
	afficherIllustration() {
		var tour = this.jeu.tourEnCours();
		var nomImage = this.illustration.imageDuTour(tour);
		var credit = this.illustration.auteur + " - " + this.illustration.description;
		console.info(nomImage);
		$('#imageDuJeu').attr('src',nomImage);
		$('#imageCredit').html(credit);
		$('#termineImage').attr('src',nomImage);
		$('#termineCredit').html(credit);
	}

	choixLettre(lettre) {
		this.jeu.prochainTour(lettre, function(){});
		this.rafraichirJeu();
	}
}

// ************
var suspendu;

function auChargement() {
	$('[data-toggle="tooltip"]').tooltip();   
	suspendu = new Suspendu();
}

function nouveauJeu() {
	if (suspendu == null) {
		auChargement();
	}
	suspendu.nouveauJeu();
}

function choixLettre(lettre) {
	suspendu.choixLettre(lettre);
}