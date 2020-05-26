const translatedList = {
  "Grass": "Planta",
  "Poison": "Venenoso",
  "Fire": "Fogo",
  "Flying": "Voador",
  "Water": "Água",
  "Bug": "Inseto",
  "Electric": "Elétrico",
  "Ground": "Terra",
  "Fighting": "Lutador",
  "Psychic": "Psíquico",
  "Rock": "Pedra",
  "Ice": "Gelo",
  "Ghost": "Fantasma",
  "Dragon": "Dragão",
  "Fairy": "Fada",
  "Dark": "Sombras",
  "Steel": "Metal",
  "Normal": "Normal"
}

function translate(element) {
  return translatedList[element];
}

/**
 * Função para selecionar informações do array que serão mostradas.
 * @param {Array.<Object>} data Array contendo lista de objetos(151 pokémons).
 * @returns {Array.<Object>} Retorna uma variável newListCard, contendo uma lista com informações selecionadas,
 * no objeto anterior.
 */
export function selectInfosToShow(data) {
  let listCard = [];
  if (!Array.isArray(data) || !data.length) {
    throw new TypeError("parâmetro inválido");
  } else {
    const listPokemon = data;
    for (let pokemon of listPokemon) {
      let typesTranslate = pokemon.type.map(translate);
      let weaknessesTranslate = pokemon.weaknesses.map(translate);

      let verifiedCandy = pokemon.candy_count;
      if (verifiedCandy === undefined) {
        verifiedCandy = "Não possui evolução";
      }

      let infosCard = {
        number: pokemon.num,
        name: pokemon.name,
        image: pokemon.img,
        types: typesTranslate.join(", "),
        weaknesses: weaknessesTranslate.join(", "),
        probability: pokemon.spawn_chance,
        height: pokemon.height,
        weight: pokemon.weight,
        candy: "Doce de " + pokemon.candy.replace("Candy", ""),
        candy_count: verifiedCandy,
        egg: pokemon.egg.replace("Not in Eggs", "Não Nasce em Ovos"),
      }
      listCard.push(infosCard);
    }
  }
  return listCard;
}

/**
 * Função que compara dois elementos para definir a ordem de posicionamento do menor para o maior.
 * @param {Object} objeto1 Primeiro objeto a ser comparado (item da lista (um Pokémon)).
 * @param {Object} objeto2 Segundo  objeto a ser comparado (item da lista (um Pokémon)).
 * @param {String} option  Uma propriedade do objeto representada por uma string. Ex: no select tipo "type-Grass".
 * @returns Retorna a posição do elemento: -1 = para atrás; 1 = para frente e 0 = mantém a posição.
 */
function sortCrescent(objeto1, objeto2, option) {
  if (objeto1[option] < objeto2[option]) {
    return -1;
  } else if (objeto1[option] > objeto2[option]) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * Função recebe lista de Pokémons e ordena de acordo com o parâmetro.
 * @param {Array.<Object>} data Array contendo lista de objetos(151 Pokémons).
 * @param {string} option Uma propriedade do objeto representada por uma string. Ex: no select ordenar "name-increasing".
 * @param {string} order  Uma string ("increasing"/"decreasing")que indica se a ordenação será crescente ou decrescente.
 * @returns uma lista ordenada.
 */
export function ordenation(data, option, order) {
  let sortedList = []
  if (
    !Array.isArray(data) || !data.length,
    typeof option !== "string" || !option.length,
    typeof order !== "string" || !order.length
  ) {
    throw new TypeError("parâmetro inválido");
  } else {
    const listPokemon = data;
    if (order === "increasing") {
      sortedList = listPokemon.sort((a, b) => sortCrescent(a, b, option));
    }
    if (order === "decreasing") {
      sortedList = listPokemon.sort((a, b) => sortCrescent(a, b, option)).reverse();
    }
    return sortedList;
  }
}

/**
 * Função que compara searchedValue com a propriedade buscada.
 * @param {Object} objeto Item(Pokémon)da lista de Pokémons que terá suas propriedades verificadas.
 * @param {string} option Uma propriedade(ex:name)do objeto reperesentada por uma string.
 * @param {string} searchedValue Uma string representando o valor da buscado. 
 * @returns Comparação entre o objeto e o searchedValue convertendo para LowerCase.
 */
function compareSearchedValue(objeto, option, searchedValue) {
  if (Array.isArray(objeto[option])) {
    for (let element of objeto[option]) {
      if (element === searchedValue) {
        return true;
      }
    }
  } else {
    return objeto[option].toLowerCase() === searchedValue.toLowerCase();
  }
}


//parei aqui


/**
 * Função aplica a seleção no array de acordo com o SearchedValue.
 * @param {Array.<Object>} data Array contendo lista de objetos(151 Pokémons).
 * @param {string} option Uma propriedade(ex:num)do objeto reperesentada por uma string.
 * @param {string} searchedValue uma string representando qualquer valor da buscado no array (o valor da propriedade).
 * @returns Uma lista contendo os objetos filtrados.
 */
export function filterInfons(data, option, searchedValue) {
  if (
    !Array.isArray(data) || data.length === 0 ||
    typeof option != "string" || option.length === 0 ||
    typeof searchedValue != "string"
  ) {
    throw new TypeError("parâmetro invalido")
  }
  let listPokemon = data
  let filteredList = []
  filteredList = listPokemon.filter(function (x) {
    return compareSearchedValue(x, option, searchedValue)
  })
  return filteredList
}

/**
 * Função realiza o calculo do futuro CP após evolução.
 * @param {Array.<Object>} data Array contendo lista de objetos(151 Pokémons).
 * @param {number} currentCp Cp atual do Pokémon representado por um numero.
 * @param {string} namePokemon Nome do Pokémon buscado que terá o futuro CP calculado.
 * @returns Um objeto contendo valor max/min e medio do futuro cp.
 */
export function computeCp(data, currentCp, namePokemon) {
  let pokemonSearched = filterInfons(data, "name", namePokemon);
  pokemonSearched = pokemonSearched[0];
  let computeResult;
  let percentMax = 1.1;
  let percentMin = 0.9;

  if (pokemonSearched.multipliers === null) {
    computeResult = {
      maxCp: "Não possui",
      minCp: "Não possui",
      mediaCp: "Como este Pokémon <br>não possui evolução, <br>ele não gera cálculo de CP.<br>"
    }
  } else {
    if (pokemonSearched.multipliers.length === 1) {
      computeResult = {
        maxCp: (currentCp * pokemonSearched.multipliers[0] * percentMax).toFixed(2),
        minCp: (currentCp * pokemonSearched.multipliers[0] * percentMin).toFixed(2),
        mediaCp: (currentCp * pokemonSearched.multipliers[0]).toFixed(2)
      }
    }
    if (pokemonSearched.multipliers.length === 2) {
      computeResult = {
        maxCp: (currentCp * pokemonSearched.multipliers[1]).toFixed(2),
        minCp: (currentCp * pokemonSearched.multipliers[0]).toFixed(2),
        mediaCp: (currentCp * ((pokemonSearched.multipliers[0] + pokemonSearched.multipliers[1]) / 2)).toFixed(2)
      }
    }
  }
  return computeResult
}

/**
 * Função que acessa o array e seleciona os objetos de interesse 
 * (ex: a proxima evolução do Pokémon filtrado).
 * @param {Array.<Object>} data Array contendo lista de objetos(151 Pokémons).
 * @param {Object} namePokemon Intém(Pokémon)da lista de Pokémons, 
 * que representa a proxima evolução do Pokémon filtrado.  
 * @returns Uma lista com um objeto.
 */
export function getNextEvolution(data, namePokemon) {
  let evolutionList = []
  let pokemon = filterInfons(data, "name", namePokemon)[0]
  if (pokemon.next_evolution === undefined) {
    return evolutionList = []
  }
  else {
    evolutionList.push(pokemon)
    for (let evolution of pokemon.next_evolution) {
      let pokemonEvolution = filterInfons(data, "name", evolution.name)[0]
      evolutionList.push(pokemonEvolution)
    }

    return evolutionList
  }
}

/**
 * Função realiza calculo estatístico da porcentagem de Pokémons por tipo.
 * @param {Array.<Object>} data Array contendo lista de objetos(151 Pokémons).
 * @param {string} option  Uma propriedade(ex:tipo)do objeto reperesentada por uma string.
 * @param {Array.<String>} arrayTypes Array contendo valores que serão filtrados para calculo.
 */
export function calcPorcent(data, option, arrayTypes) {
  if (arrayTypes.length === 0) { throw TypeError("parâmetro invalido") }
  let allPokemons = data
  let list = []
  for (let valueType of arrayTypes) {
    let typesPokemons = filterInfons(data, option, valueType)
    let calcResult = ((typesPokemons.length / allPokemons.length) * 100)
    list.push(calcResult.toFixed(0))
  }
  return list
}