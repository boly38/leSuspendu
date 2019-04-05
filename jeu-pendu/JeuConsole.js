const readline = require('readline');

const JeuPendu = require('./JeuPendu.js');


class JeuConsole {
  constructor() {
    this.jeu = null;
    this.afficherMenu();
    this.prochaineCommande();
  };

  afficherMenu() {
    console.info(" *** MENU ***");
    console.info(" - d - démarrer un jeu");
    console.info(" - q - quitter");
  };

  prochaineCommande() {
    // Key input
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => { this.onKeyPressed(str, key) });
  };

  onKeyPressed(str, key) {
      var jeuConsole = this;
      if (jeuConsole.jeu != null) {
        if (key.name == 'return') {
         console.info(" jeu annulé");
         jeuConsole.jeu = null;
         jeuConsole.afficherMenu();
         return;
        }
        jeuConsole.jeu.prochainTour(key.name, function() {
                if (jeuConsole.jeu.estTermine()) {
                    jeuConsole.jeu = null;
                    jeuConsole.afficherMenu();
                }
        });
        return;
      }
      if ((key.name == 'q')
       || (key && key.ctrl && key.name == 'c')) {
        console.info(" Au revoir!");
        process.exit();
      }
      switch (key.name) { // input menu key dispatcher
        case 'd': jeuConsole.nouveauJeu(); break;
        case 'return': break; // ignore
        default :  jeuConsole.afficherMenu();
        // console.log('commande inconnue "' + str + '" (ctrl:' + key.ctrl + ' name:' + key.name + ')');
      }
  };

  nouveauJeu() {
    console.info(" NOUVEAU JEU (touche ENTREE pour annuler)");
    this.jeu = new JeuPendu();
  };

}

module.exports = JeuConsole;