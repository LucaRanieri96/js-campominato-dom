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

let bombsArray = [];
console.log(bombsArray);

let cellNumber = 10;

// genero il bombsArray, mi creo una funzione generatebombsArray
function generateBombsArray() {
  bombsArray = [];

  while (bombsArray.length < 16) {
    const randomNumber =
      Math.floor(Math.random() * cellNumber * cellNumber) + 1;
    console.log(randomNumber);
    if (!bombsArray.includes(randomNumber)) {
      bombsArray.push(randomNumber);
    }
  }
}

// aggiorno il valore delle cellNumber in base alla difficoltà selezionata
select.addEventListener("change", function () {
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

// ora mi serve la funzione createGrid, questa funzione deve generare nel container una griglia cellNumber^2 ->(devo poter scegliere il valore)

function createGrid(cellNumber) {
  const grid = document.createElement("div");
  let number = 1;
  // Mi creo tante righe quant'è il valore di cellNumber e dentro mi creo altrettante colonne sempre seguendo il valore di cellNumber
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
          // se il bombsArray include il numero cliccato nella colonna allora la col si colora di rosso e compare un alert a schermo che dice all'utente di aver perso.. invece si va avanti e si incrementa lo userscore
          if (bombsArray.includes(Number(col.innerText))) {
            col.style.backgroundColor = "red";
            console.log("Hai calpestato una bomba!");
            // scrivere dentro una card il risultato ma prima la rendo visibile
            const card = document.querySelector('.card');
            card.classList.toggle('d-none', false);

            const cardHeader = document.querySelector(".card-header");
            cardHeader.innerText = "Hai calpestato una bomba!";
            const cardBody = document.querySelector(".card-body");
            cardBody.innerText = `il tuo score è : ${userScore}`;

            return;
          } else {
            // l'utente ha cliccato su una cella sicura
            col.style.backgroundColor = "lightblue";
            col.classList.add("clicked");
            userScore++;
            scoreSpan.innerHTML = userScore;
            console.log(userScore);
            console.log(`Cella cliccata: ${col.innerText}`);
            // Se andando avanti succede che l'userScore è uguale al numero di col - le bombe allora vuol dire che l'utente ha vinto
            if (userScore === cellNumber * cellNumber - bombsArray.length) {
              console.log("Hai vinto!");
              // scrivo dentro la card il risultato ma prima la rendo visibile
              const card = document.querySelector('.card');
              card.classList.toggle('d-none', false);

              const cardHeader = document.querySelector(".card-header");
              cardHeader.innerText = "Hai vinto!";
              const cardBody = document.querySelector(".card-body");
              cardBody.innerText = `il tuo score è : ${userScore}`;
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
  generateBombsArray();
  const grid = createGrid(cellNumber);
  gridContainer.appendChild(grid);
});

const resetButton = document.getElementById("resetGame");

resetButton.addEventListener("click", function(){
  gridContainer.innerHTML = "";
  userScore = 0;
  generateBombsArray();
  const grid = createGrid(cellNumber);
  gridContainer.appendChild(grid);
  const card = document.querySelector('.card');
  card.classList.toggle('d-none', true);
})

generateBombsArray();
const initialGrid = createGrid();
gridContainer.appendChild(initialGrid);
