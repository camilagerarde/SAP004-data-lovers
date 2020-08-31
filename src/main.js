import data from "./data/pokemon/pokemon.js";
import { selectInfosToShow, ordenation, filterInfos, getNextEvolution, } from "./data.js";

const arrayPokemon = data.pokemon;
let arrayAuxiliar = arrayPokemon;

function showPokemons(arrayPokemon) {
  let showPokemons = document.getElementById("local-cards");
  let card = "";
  showPokemons.innerHTML = "";

  if (!arrayPokemon.length) {
    card += "<h2>Resultado não encontrado</h2>";
  } else {
    arrayPokemon = selectInfosToShow(arrayPokemon)
    for (let pokemon of arrayPokemon) {
      card += `
        <div class="box-container">
          <div class="box-cards">
            <div class="card-style">
              <h2 class="title-poke">${pokemon.name} ${pokemon.number}</h2>
              <img class="img-poke" src="${pokemon.image}" alt="imagem ${pokemon.name}" />
              <div class="div-poke">
                <p class="subtitle-poke"><span class="bold">Tipo:</span></p>
                <p class="items-poke">${pokemon.types}</p>
                <p class="subtitle-poke"><span class="bold">Fraquezas:</span></p>
                <p class="items-poke">${pokemon.weaknesses}</p>
                <p class="subtitle-poke"><span class="bold">Chance de aparecer:</span></p>
                <p class="items-poke"> ${pokemon.probability}</p>
              </div>
            </div>
            <div class="card-back">
              <h2 class="title-poke">${pokemon.name} ${pokemon.number}</h2>
              <p class="subtitle-poke"><span class="bold">Peso:</span></p>
              <p class="items-poke">${pokemon.height}</p>
              <p class="subtitle-poke"><span class="bold">Altura:</span></p>
              <p class="items-poke">${pokemon.weight}</p>
              <p class="subtitle-poke"><span class="bold">Doce:</span></p>
              <p class="items-poke">${pokemon.candy}</p>
              <p class="subtitle-poke"><span class="bold">Ovo:</span></p>
              <p class="items-poke">${pokemon.egg}</p>
              <button id="button-modal-${pokemon.name}" value="${pokemon.name}" class="options-style">Evolução</span></button>
            </div>
          </div>
        </div>`;
    }
  }
  showPokemons.innerHTML = card;
  if (arrayPokemon.length !== 0) {
    for (let pokemon of arrayPokemon) {
      document.getElementById(`button-modal-${pokemon.name}`).addEventListener("click", showEvolutions);
    }
  }
}
showPokemons(arrayPokemon);

const getSelectOrder = document.getElementById("ordination");
getSelectOrder.addEventListener("change", sortPokemons);
const divModal = document.getElementById("myModal");

function showEvolutions(event) {
  let namePokemon = event.currentTarget.value;
  const divModalContent = document.getElementById("modal-value");
  let evolutions = getNextEvolution(arrayPokemon, namePokemon);

  if (!evolutions.length) {
    divModalContent.innerHTML = `
    <span class="close">&times;</span>
    <div class="modal-style-not">
    <h1>Pokémon não possui evolução.</h1>
    </div>`;
  } else {
    if (evolutions[0].name === "Eevee") {
      divModalContent.innerHTML = `
        <span class="close">&times;</span>
        <div class="eevee-style">
          <h1>Evoluções</h1>
          <h2>${evolutions[1].name}</h2>
          <img class="img-poke" src="${evolutions[1].img}" alt="imagem ${evolutions[1].name}" />
          <h2>${evolutions[2].name}</h2>
          <img class="img-poke" src="${evolutions[2].img}" alt="imagem ${evolutions[1].name}" />
          <h2>${evolutions[3].name}</h2>
          <img class="img-poke" src="${evolutions[3].img}" alt="imagem ${evolutions[1].name}" />
          <p class="subtitle-poke"><span class="bold">Doces para Evoluir:</span></p>
          <p class="items-poke">${evolutions[0].candy_count}</p>
        </div>`;
    } else {
      divModalContent.innerHTML = `
        <span class="close">&times;</span>
        <div class="modal-style">
          <h1>Evolução</h1>
          <h2>${evolutions[1].name}</h2>
          <img class="img-poke" src ="${evolutions[1].img}" alt ="imagem ${evolutions[1].name}"/>
          <p class="subtitle-poke"><span class="bold">Doces para Evoluir:</span></p>
          <p class="items-poke" >${evolutions[0].candy_count}</p>
        </div>`;
    }
  }
  divModal.style.display = "block"
  document.getElementsByClassName("close")[0].onclick = () => divModal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target === divModal) {
    divModal.style.display = "none";
  }
}

function sortPokemons(event) {
  let elementSelect = event.target;
  let selectedOption = elementSelect.options[elementSelect.selectedIndex].value;
  let list = [];
  let arrayParameters = selectedOption.split("-");

  if (!selectedOption) {
    list = arrayAuxiliar;
  } else {
    list = ordenation(arrayAuxiliar, arrayParameters[0], arrayParameters[1]);
  }
  showPokemons(list);
}



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