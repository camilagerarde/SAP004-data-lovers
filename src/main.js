import data from "./data/pokemon/pokemon.js";
import { selectInfosToShow, ordenation, filterInfos, getNextEvolution, } from "./data.js"

const arrayPokemon = data.pokemon
let arrayAuxiliar = arrayPokemon

function showPokemons(arrayPokemon) {
  let showPokemons = document.getElementById("local-cards");
  let card = "";
  showPokemons.innerHTML = "";

  if (arrayPokemon.length === 0) {
    card += "<br>Resultado não encontrado</br>";
  } else {
    arrayPokemon = selectInfosToShow(arrayPokemon)
    for (let pokemon of arrayPokemon) {
      card += `
    <div class="box-container">
      <div class="box-cards">
        <div class="card-style">
           <h2 class = "title-poke">${pokemon.name} ${pokemon.number}</h2>
           <img class="img-poke" src ="${pokemon.image}" alt ="imagem ${pokemon.name}"/>
          <div class="div-poke">
           <p class="subtitle-poke"><strong>Tipo:</strong></p>
           <p class="items-poke" >${pokemon.types}</p>
           <p class="subtitle-poke"><strong>Fraquezas:</strong></p>
           <p class="items-poke" >${pokemon.weaknesses}</p>
           <p class="subtitle-poke"><strong>Chance de aparecer:</strong></p>
           <p class="items-poke" > ${pokemon.probability}</p>
         </div>
        </div>
        <div class="card-back"> 
          <h2 class = "title-poke">${pokemon.name} ${pokemon.number}</h2>
          <p class="subtitle-poke"><strong>Peso:</strong></p>
          <p class="items-poke" >${pokemon.height}</p>
          <p class="subtitle-poke"><strong>Altura:</strong></p>
          <p class="items-poke" >${pokemon.weight}</p>
          <p class="subtitle-poke"><strong>Doce:</strong></p>
          <p class="items-poke" >${pokemon.candy}</p>
          <p class="subtitle-poke"><strong>Ovo:</strong></p>
          <p class="items-poke" >${pokemon.egg}</p>
          <button id="button-modal-${pokemon.name}" value="${pokemon.name}"class="search-style" ><strong>Evolução</strong></button>
        </div>
      </div>
    </div>`;
    }
  }
  showPokemons.innerHTML = card;
  if (arrayPokemon.length !== 0) {
    for (let pokemon of arrayPokemon) {
      document.getElementById(`button-modal-${pokemon.name}`).addEventListener("click", showEvolutions)
    }
  }
}

showPokemons(arrayPokemon)

let getSelectOrder = document.getElementById("ordination")

let divModal = document.getElementById("myModal")

function showEvolutions(event) {
  let namePokemon = event.currentTarget.value
  let divModalContent = document.getElementById("modal-value")
  let evolutions = getNextEvolution(arrayPokemon, namePokemon)

  if (evolutions.length === 0) {
    divModalContent.innerHTML = `
    <span class="close">&times;</span>
    <div class="modal-style-not">
    <h1>Pokémon não possui evolução.</h1>
    </div>
  `
  }
  else {
    if (evolutions[0].name === "Eevee") {
      divModalContent.innerHTML = `
    <span class="close">&times;</span>
    <div class="eevee-style" >
    <h1>Evoluções</h1>
    <h2>${evolutions[1].name}</h2>
    <img class="img-poke" src ="${evolutions[1].img}" alt ="imagem ${evolutions[1].name}"/>
    
    <h2>${evolutions[2].name}</h2>
    <img class="img-poke" src ="${evolutions[2].img}" alt ="imagem ${evolutions[1].name}"/>
    
    <h2>${evolutions[3].name}</h2>
    <img class="img-poke" src ="${evolutions[3].img}" alt ="imagem ${evolutions[1].name}"/>
    <p class="subtitle-poke"><strong>Doces para Evoluir:</strong></p>
    <p class="items-poke" >${evolutions[0].candy_count}</p>
  `;
    } else {
      divModalContent.innerHTML = `
    <span class="close">&times;</span>
    <div class="modal-style">
    <h1>Evolução</h1>
    <h2>${evolutions[1].name}</h2>
    <img class="img-poke" src ="${evolutions[1].img}" alt ="imagem ${evolutions[1].name}"/>
    <p class="subtitle-poke"><strong>Doces para Evoluir:</strong></p>
    <p class="items-poke" >${evolutions[0].candy_count}</p>
    </div>
  `;
    }
  }
  divModal.style.display = "block"
  document.getElementsByClassName("close")[0].onclick = function () {
    divModal.style.display = "none";
  }
}

window.onclick = function (event) {
  if (event.target === divModal) {
    divModal.style.display = "none";
  }
}

function sortPokemons(event) {
  let elementSelect = event.target
  let selectedOption = elementSelect.options[elementSelect.selectedIndex].value
  let list = []
  let arrayParameters = selectedOption.split("-")

  if (selectedOption === "") {
    list = arrayAuxiliar
  } else {
    list = ordenation(arrayAuxiliar, arrayParameters[0], arrayParameters[1])
  }
  showPokemons(list)
}

getSelectOrder.addEventListener("change", sortPokemons)


let getSelectFilterType = document.getElementById("filter-type")
let getSelectWeaknessType = document.getElementById("filter-weakness")

function filterPokemons() {
  let list = []
  let valueFiltertype = getSelectFilterType.options[getSelectFilterType.selectedIndex].value
  let valueFilterWkenesses = getSelectWeaknessType.options[getSelectWeaknessType.selectedIndex].value
  let list_type = arrayPokemon
  let list_weak = arrayPokemon
  let arrayParameters

  if (valueFilterWkenesses !== "") {
    arrayParameters = valueFilterWkenesses.split("-")
    list_type = filterInfos(list_type, arrayParameters[0], arrayParameters[1])
  }
  if (valueFiltertype !== "") {
    arrayParameters = valueFiltertype.split("-")
    list_weak = filterInfos(list_weak, arrayParameters[0], arrayParameters[1])
  }
  list = list_type.filter(function (x) {
    return list_weak.includes(x)
  });

  arrayAuxiliar = list
  let newEvent = document.createEvent("Event");
  newEvent.initEvent("change", true, true);
  getSelectOrder.dispatchEvent(newEvent);
}

getSelectFilterType.addEventListener("change", filterPokemons)
getSelectWeaknessType.addEventListener("change", filterPokemons)

let getInputSearch = document.getElementById("search")
let getButtonSearch = document.getElementById("button-search")


function searchByName(event) {
  if (event.key === "Enter" || event.type === "click") {
    let searchResult = filterInfos(arrayPokemon, "name", getInputSearch.value)
    showPokemons(searchResult)
  }
}

getInputSearch.addEventListener("keypress", searchByName)
getButtonSearch.addEventListener("click", searchByName)