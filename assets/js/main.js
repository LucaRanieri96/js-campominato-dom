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

// variabili
const gridContainer = document.querySelector(".my_container");
const btn = document.querySelector(".btn");
const select = document.querySelector("select");

let userScore = 0;
const scoreSpan = document.getElementById("score");
scoreSpan.innerHTML = userScore;

let bombsArray = [];
console.log(bombsArray);

let cellNumber = 10;

// genero il bombsArray, mi creo una funzione
while (bombsArray.length < 16) {
  // genero un numero da 1 a cellNumber^2
  const randomNumber = Math.floor(Math.random() * cellNumber * cellNumber);
  // Se questo numero non è nell'array allora ce lo pusho
  if (!bombsArray.includes(randomNumber)) {
    bombsArray.push(randomNumber);
  }
}

// aggiorno il valore delle cellNumber in base alla difficoltà selezionata
select.addEventListener("change", function() {
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
          if (bombsArray.includes(Number(col.innerText))) {
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
            if (userScore === cellNumber * cellNumber - bombsArray.length) {
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

btn.addEventListener("click", function () {
  gridContainer.innerHTML = "";
  userScore = 0;
  const grid = createGrid();
  gridContainer.appendChild(grid);
});

// Initialize the game
const initialGrid = createGrid();
gridContainer.appendChild(initialGrid);