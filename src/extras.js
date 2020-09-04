/* global Chart*/

import data from "./data/pokemon/pokemon.js";
import { ordenation, computeCp, filterInfos, getNextEvolution, calcPorcent } from "./data.js";

const arrayPokemon = data.pokemon;
let dataListSorted = ordenation(arrayPokemon, "name", "increasing");
let getDataList = document.getElementById("pokemon-list");

for (let pokemon of dataListSorted) {
  let createOption = document.createElement("option");
  createOption.value = pokemon.name;
  getDataList.appendChild(createOption);
}

document.getElementById("button-search").addEventListener("click", calculateAndShow);

function calculateAndShow(event) {
  event.preventDefault();
  document.getElementById("div-text").style.display = "none";

  let showPokemon = document.getElementById("cards");
  let inputName = document.getElementById("search-name").value;
  let inputCp = document.getElementById("search-cp").value;
  let result = (computeCp(arrayPokemon, inputCp, inputName));
  let pokemon = filterInfos(arrayPokemon, "name", inputName);
  let evolutions = getNextEvolution(arrayPokemon, inputName);
  let card = "";
  showPokemon.innerHTML = "";
  pokemon = pokemon[0];

  if (evolutions.length === 0) {
    card += `
  <div class="card-style">
   <h1>${pokemon.name}</h1>
    <img class="img-poke" src ="${pokemon.img}" alt ="imagem ${pokemon.name}"/>
  </div>

  <div class="card-style">
   <p><strong>Este Pokémon não possui evolução.</strong></p>
  </div>`;

    showPokemon.innerHTML = card;
  } if (inputName.toLowerCase() === "eevee") {
    card += `
  <div class="card-style">
   <h1>${pokemon.name}</h1>
    <img class="img-poke" src ="${pokemon.img}" alt ="imagem ${pokemon.name}"/>
  </div>

  <div class="div-seta">
    <img class="seta-poke" src ="./img/seta-roxa.png" alt ="imagem seta"/>
  </div>

  <div class="card-style">
    <p>O Pokémon <strong>Eevee</strong> pode evoluir para 
    <br><strong>Vaporeon, Jolteon ou Flareon</strong>.
    <br>Essa evolução acontence de maneira aleatória.</p>
    <img class="seta-poke" src ="./img/interrogacao.png" alt ="imagem seta"/>
  </div>

  <div class="card-style">
    <p><strong>Média CP:</strong> ${result.mediaCp}<br>
    <strong>Min CP:</strong> ${result.minCp}<br>
    <strong>Max CP:</strong> ${result.maxCp}</p>
    <p><strong>Doce:</strong> ${pokemon.candy}<br>
    <strong>Quant. de doces:</strong> ${pokemon.candy_count}</p>
  </div>`;

    showPokemon.innerHTML = card;
  } else {
    if (inputName !== "") {
      card += `
    <div class="card-style">
     <h1>${pokemon.name}</h1>
     <img class="img-poke" src ="${pokemon.img}" alt ="imagem ${pokemon.name}"/>
    </div>
          
    <div class="div-seta">
      <img class="seta-poke" src ="./img/seta-roxa.png" alt ="imagem seta"/>
    </div>

    <div class="card-style">
      <h1>${evolutions[1].name}</h1>
      <img class="img-poke" src ="${evolutions[1].img}" alt ="imagem ${evolutions[1].name}"/>
    </div>
          
    <div class="card-style">
      <p><strong>Média CP:</strong> ${result.mediaCp}<br>
      <strong>Min CP:</strong> ${result.minCp}<br>
      <strong>Max CP:</strong> ${result.maxCp}</p>
      <p><strong>Doce:</strong> ${pokemon.candy}<br>
      <strong>Quant. de doces:</strong> ${pokemon.candy_count}</p>
    </div>`;
    }
    showPokemon.innerHTML = card;
  }
}

const arrayTypes = [
  "Grass",
  "Poison",
  "Fire",
  "Flying",
  "Water",
  "Bug",
  "Electric",
  "Ground",
  "Fighting",
  "Psychic",
  "Rock",
  "Ice",
  "Ghost",
  "Dragon",
]
let porcentResult = calcPorcent(arrayPokemon, "type", arrayTypes)

let canva = document.getElementById("graphic-types").getContext("2d")
let colorList = [
  "#81B66E",
  "#EE82EE",
  "#E9B629",
  "#808080",
  "#6666FF",
  "#006600",
  "#E9DC29",
  "#663300",
  "#FF3333",
  "#FF66B2",
  "#202020",
  "#66FFFF",
  "#660066",
  "#FF9100",
  "#FFCCE5",
  "#001933",
  "#404040",
]

let _graphicTypes = new Chart(canva, {
  type: "doughnut",
  data: {
    labels: arrayTypes,
    datasets: [{
      label: "Porcentual de pokemons",
      data: porcentResult,
      backgroundColor: colorList
    }]
  },
  options: {
    plugins: {
      labels: {
        fontColor: "#000000",
        orverlap: false,
        position: "outside",
        arc: true,
        textMargin: 1,
        fontSize: 8,
        render: function (value) {
          return value.value + "%"
        },
        showActualPercentages: false,
      }
    },
    responsive: true,
    onResize: function (chart, size) {
      removeLegends(chart, size)
      chart.update()
    },
    legend: {
      fontColor: "#000000",
      fontSize: "14",
      position: "right"
    },
    title: {
      display: true,
      fontColor: "#000000",
      fontSize: "18",
      text: "Pokémons por tipo"
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 0,
        bottom: 0,
      }
    }
  }
});

function removeLegends(chart, size) {
  if (size.width < 750) {
    chart.options.legend.display = false
  } else {
    chart.options.legend.display = true
  }
}
removeLegends(_graphicTypes, _graphicTypes)
_graphicTypes.update()