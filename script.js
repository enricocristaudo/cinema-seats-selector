const numFile = document.getElementById("file");
const postiPerFila = document.getElementById("postiPerFila");
const postiOccupati = document.getElementById("postiOccupati");

const tabella = document.getElementById("tabellaPosti")
const login = document.getElementById("login")
const postiContainer = document.getElementById("main")
const spanOccupati = document.getElementById("spanOccupati")
const spanDisponibili = document.getElementById("spanDisponibili")
const spanSelezionati = document.getElementById("spanSelezionati")
const spanPrezzo = document.getElementById("spanPrezzo")

const btnReset = document.getElementById("btnReset")

const errore = document.getElementById("error")

const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

var occupati = 0;
var selezionati = 0;
var confermati = 0;
var prezzo_cumulativo = 0;
const prezzo = 7;

function inizializza() {
  
  if(!check()) return

  for(let i = 0; i < numFile.value; i++) {
    const row = document.createElement("tr");
    var lettera = document.createElement("p")
    lettera.innerText = alfabeto[i]
    row.appendChild(lettera)

    for(let j = 0; j < postiPerFila.value; j++) {
      const cell = document.createElement("td")
      var button = document.createElement("button");
      button.id = i+","+j
      button.className = "btnPoltrona"
      button.visited = false
      button.textContent = alfabeto[i]+(j+1)
      button.onclick = function() {
        if(this.className !== "btnPoltrona occupato" && this.visited == false){
          this.className = "btnPoltrona selezionato"
          this.visited = true
          selezionati++
          spanSelezionati.innerText = selezionati
          prezzo_cumulativo += prezzo
          spanPrezzo.innerText = prezzo_cumulativo + "€"
          return
        }
        if(this.className == "btnPoltrona selezionato" && this.visited == true) {
          this.className = "btnPoltrona"
          this.visited = false
          selezionati--
          spanSelezionati.innerText = selezionati
          prezzo_cumulativo -= prezzo
          spanPrezzo.innerText = prezzo_cumulativo + "€"
          return
        }
      }
        
      cell.appendChild(button);
      row.appendChild(cell);
    }
    tabella.appendChild(row)
  }
  
  login.style = "display: none"
  postiContainer.style= "display: block"
  
  occupaPosti(postiOccupati.value)
  
  spanOccupati.innerText = occupati
  spanDisponibili.innerText = (numFile.value*postiPerFila.value) - occupati
}

function occupaPosti(n) {
  for(let i = 0; i < n; i++) {
    do{
      var r = Math.floor(Math.random() * postiPerFila.value);
      var c = Math.floor(Math.random() * numFile.value);
      var x = document.getElementById(c+","+r)
      
    }while(x.className == "btnPoltrona occupato")
    x.className = "btnPoltrona occupato"
  }
  occupati = n;
}

function reset() {
  for(let i = 0; i < numFile.value; i++) {
    for(let j = 0; j < postiPerFila.value; j++) {
      var b = document.getElementById(i+","+j)
      if(b.className !== "btnPoltrona occupato" && b.className !== "btnPoltrona confermati") {
        b.className = "btnPoltrona"
        b.visited = false
        selezionati = confermati;
        spanSelezionati.innerText = selezionati
      }
    }
  }
  selezionati = 0;
  spanSelezionati.innerText = selezionati
  prezzo_cumulativo = 0;
  spanPrezzo.innerText = prezzo_cumulativo + "€"
}

function conferma() {
  for(let i = 0; i < numFile.value; i++) {
    for(let j = 0; j < postiPerFila.value; j++) {
      var b = document.getElementById(i+","+j)
      if(b.className == "btnPoltrona selezionato"){
        confermati++
        b.className = "btnPoltrona confermati"
      }
    }
  }

  spanOccupati.innerText = parseInt(occupati) + parseInt(confermati)
  spanDisponibili.innerText = ((numFile.value*postiPerFila.value) - occupati) - parseInt(confermati)
  selezionati = 0;
  spanSelezionati.innerText = selezionati

  prezzo_cumulativo = 0;
  spanPrezzo.innerText = prezzo_cumulativo + "€"
}

function check() {
  if(numFile.value == "" || postiPerFila.value == "" || postiOccupati.value == "") {
    errore.innerText = "*Tutti i campi devono essere compilati!"
    numFile.className = "error-box"
    postiPerFila.className = "error-box"
    postiOccupati.className = "error-box"
    return false
  }

  if(postiOccupati.value >= numFile.value * postiPerFila.value) {
    errore.innerText = "*Non puoi occupare "+numFile.value * postiPerFila.value+" posti o più."
    postiOccupati.className = "error-box"
    return false
  }

  if(numFile.value > alfabeto.length) {
    errore.innerText = "*Non puoi inserire più di "+alfabeto.length+" file."
    numFile.className = "error-box"
    return false
  }
  if(postiPerFila.value > 20) {
    errore.innerText = "*Non puoi inserire più di 20 posti per fila."
    postiPerFila.className = "error-box"
    return false
  }
  return true
}

function resetStyle() {
  numFile.className = "error-reset";
  postiPerFila.className = "error-reset";
  postiOccupati.className = "error-reset";
  errore.innerText = ""
}
