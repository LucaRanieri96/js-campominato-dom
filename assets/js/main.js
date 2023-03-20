/* 
Traccia 2:
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati
abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina.
Altrimenti
la cella cliccata si colora di azzurro
l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. 
*/
// variabile per tenere conto dello userScore
let userScore = 0;
const scoreSpan = document.getElementById("score");
scoreSpan.innerHTML = userScore;
// Per prima cosa mi costruisco un array vuoto
let bombs = [];
console.log(bombs);

// creo le variabili per il container e il bottone
const container = document.querySelector(".my_container");
const btn = document.querySelector(".btn");

// bonus 1 fatto, solo penso proprio potrei scriverlo meglio, aspetto la correzione di Fabio Lunedì mattina
const select = document.querySelector("select");
// ora dovrei associare a ogni option del select un valore diverso della X
// potrei crearmi una funzione che tramite l'opzione del select mi cambia il valore della X
let cellNumber = 10;

select.addEventListener("change", function defineX() {
  if (select.value == "1") {
    cellNumber = 10;
    console.log(cellNumber);
  } else if (select.value == "2") {
    cellNumber = 9;
    console.log(cellNumber);
  } else {
    cellNumber = 7;
    console.log(cellNumber);
  }
  return cellNumber;
});

/* questo non mi serve più, in teoria ahah
let Y = 10;
// la Y varierà in base alla difficoltà scelta
let X = Y; 
*/

// aggiungo un event listener al pulsante questo event listener deve far partire una funzione che genererà una lista
btn.addEventListener("click", function () {
  container.innerHTML = ""; //per svuotare il container
  // definisco la X anche dentro la funzione che genera la griglia
  let cellNumber = 0;
  if (select.value == "1") {
    cellNumber = 10;
  } else if (select.value == "2") {
    cellNumber = 9;
  } else {
    cellNumber = 7;
  }
  while (bombs.length < 16) {
    // genero un numero da 1 a 100
    const randomNumber = Math.floor(Math.random() * cellNumber * cellNumber);
    // Se questo numero non è nell'array allora ce lo pusho
    if (!bombs.includes(randomNumber)) {
      bombs.push(randomNumber);
    }
  }
  const grid = createGrid(cellNumber); //questa sarà la mia funzione che crea la griglia
  container.appendChild(grid); //per mettere la griglia dentro il container
  /* 
  Questo array dovrà essere riempito con 16 numeri che rappresentano le nostre bombe, solo ogni volta devono essere 16 numeri diversi tra loro e diversi dalla generazione precedente 
  */
  // Mi creo un ciclo while per generare i numeri e metterli dentro l'array vuoto
  
});

// ora mi serve la funzione createGrid, questa funzione deve generare nel container una griglia X^2 >(devo poter scegliere il valore della X)

function createGrid(cellNumber) {
  const grid = document.createElement("div");
  let number = 1;
  // Mi creo tante righe quant'è il valore di X e dentro mi creo altrettante colonne sempre seguendo il valore della X
  for (let i = 0; i < cellNumber; i++) {
    const row = document.createElement("div");
    row.classList.add("my_row");
    for (let j = 0; j < cellNumber; j++) {
      const col = document.createElement("div");
      col.classList.add("my_col");
      col.innerText = number++;
      // aggiunta della colonna alla riga
      row.appendChild(col);
      
      // aggiungo un event listener per le col
      col.addEventListener("click", function () {
        // se l'utente clicca su un quadrato che è già cliccato lo resetta
        if (col.classList.contains("clicked")) {
          col.style.backgroundColor = "";
          col.classList.remove("clicked");
        } else {
          // se l'array bombs include il numero cliccato nella colonna allora la col si colora di rosso e compare un alert a schermo che dice all'utente di aver perso invece si va avanti e si incrementa lo userscore
          if (bombs.includes(Number(col.innerText))) {
            col.style.backgroundColor = "red";
            alert("Hai calpestato una bomba!");
            console.log("Hai calpestato una bomba!");
            // termina la partita
          } else {
            // l'utente ha cliccato su una cella sicura
            col.style.backgroundColor = "lightblue";
            col.classList.add("clicked");
            userScore++;
            console.log(userScore);
            console.log(`Cella cliccata: ${col.innerText}`);
            // Se andando avanti succede che l'userScore è uguale al numero di col - le bombe allora vuol dire che l'utente ha vinto
            if (userScore === cellNumber * cellNumber - bombs.length) {
              console.log("Hai vinto!");
              alert("Hai vinto!");
              // termina la partita
            }
          }
        }
      });
    }
    grid.appendChild(row);
  }
  return grid;
}
