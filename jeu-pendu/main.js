

const ListeDeMots = require('./ListeDeMots.js');
const JeuConsole =  require('./JeuConsole.js');

let mots = (new ListeDeMots()).mots;
let nbMots = mots.length;

console.info("bonjour, je connais " + nbMots + " mots");

let jeuConsole = new JeuConsole();

