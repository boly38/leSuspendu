const readline = require('readline');

const JeuPendu = require('./JeuPendu.js');


class JeuConsole {
  constructor() {
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
      if ((key.name == 'q')
       || (key && key.ctrl && key.name == 'c')) {
        console.info(" Au revoir!");
        process.exit();
      }
      switch (key.name) { // input menu key dispatcher
        case 'd': this.nouveauJeu(); break;
        case 'return': break; // ignore
        default :  this.afficherMenu();
        // console.log('commande inconnue "' + str + '" (ctrl:' + key.ctrl + ' name:' + key.name + ')');
      }
  };

  nouveauJeu() {
    console.info(" NOUVEAU JEU");
    new JeuPendu();
    this.afficherMenu();
  };

}

module.exports = JeuConsole;