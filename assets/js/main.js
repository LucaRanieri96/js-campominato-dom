/*
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
*/

// creo le variabili per il container e il bottone
const container = document.querySelector(".my_container");
const btn = document.querySelector(".btn");

// bonus 1 fatto, solo penso proprio potrei scriverlo meglio, aspetto la correzione di Fabio Lunedì mattina 
const select = document.querySelector("select");
// ora dovrei associare a ogni option del select un valore diverso della X
// potrei crearmi una funzione che tramite l'opzione del select mi cambia il valore della X
let cellNumber = 10;

select.addEventListener("change", function defineX () {

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
  const grid = createGrid(cellNumber); //questa sarà la mia funzione che crea la griglia
  container.appendChild(grid); //per mettere la griglia dentro il container
});

// ora mi serve la funzione createGrid, questa funzione deve generare nel container una griglia X^2 >(devo poter scegliere il valore della X)

function createGrid(cellNumber) {
  const grid = document.createElement('div');
  let number = 1;
  // Mi creo tante righe quant'è il valore di X e dentro mi creo altrettante colonne sempre seguendo il valore della X 
  for (let i = 0; i < cellNumber; i++) {
    const row = document.createElement('div');
    row.classList.add("my_row")
    for (let j = 0; j < cellNumber; j++) {
      const col = document.createElement('div');
      col.classList.add("my_col")
      col.innerText = number++
      // aggiunta della colonna alla riga
      row.appendChild(col);

      // aggiungo un event listener per le col 
      col.addEventListener('click', function() {
        if (col.classList.contains('clicked')) {
          col.style.backgroundColor = '';
          col.classList.remove('clicked');
        } else {
          col.style.backgroundColor = 'blue';
          col.classList.add('clicked');
          console.log(`Cella cliccata: ${col.innerText}`);
        }
      });
    }
    grid.appendChild(row);
  }
  return grid
}

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

// Per prima cosa mi costruisco un array vuoto
let bombs = [];
console.log(bombs);

/* 
Questo array dovrà essere riempito con 16 numeri che rappresentano le nostre bombe, solo ogni volta devono essere 16 numeri diversi tra loro e diversi dalla generazione precedente 
*/
// Mi creo un ciclo for per generare i numeri e metterli dentro l'array vuoto
for (let i = 0; i < 16; i++){
  // genero un numero da 1 a 100
  const randomNumber = Math.floor(Math.random() * 100);
  // Se questo numero non è nell'array allora ce lo pusho
  if (!bombs.includes(randomNumber)) {
    bombs.push(randomNumber);
  }
}
