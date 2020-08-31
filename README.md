# Pokelovers

Para acessar a página [clique aqui](https://camilagerarde.github.io/SAP004-data-lovers/). :computer:

## Projeto

O projeto **Pokelovers**, se trata de uma página WEB com visualização de um conjunto de dados, que se adequa a necessidade do usuário.
Nela é possível ao usuário, pesquisar dados, filtrá-los, ordená-los e fazer algum calculo agregado.

> Cálculo agregado se refere aos diversos cálculos que podem ser feitos com os dados para mostrar a informação mais relevante para os usuários (médias, valores máximos e mínimos, etc).

Utilizamos o banco de dados do anime **Pokémon**.

<p align="center">
<img src="https://media.giphy.com/media/vnGlErQHuF9BK/giphy.gif" width="200" heigth="200"> 
</p>

### 1. Processo de decisões do projeto:

#### 1.1 Identificação do usuário:

Como início da nossa definição de usuário criamos personas, que representam nossos possíveis usuários e suas necessidades, para assim compreender e planejar as soluções que deveríamos oferecer em nossa aplicação.

<p align="center">
<img src="./src/img/persona.png"/>
</p>

Também fizemos uma pesquisa de preferências pelo [Google Forms](https://www.google.com/forms/about/), para a definição dos dados e informações disponíveis ao usuário de acordo com suas reais necessidades.

#### 1.2 Identificação de Histórias de Usuário:

Com estes dados então definimos nossas Histórias de usuário e o protótipo para o nosso projeto:

**História de usuário 01**

> Eu como usuário, quero acessar a aplicação "POKELOVERS" e visualizar todos os pokemons de Kanto e suas informações básicas coletadas na pesquisa de preferências.

**História de usuário 02**

> Eu como usuário, quero buscar um Pokémon específico por nome e visualizar somente ele.

**História de usuário 03**

> Eu como usuário, quero ordenar os Pokémons por ordem alfabética, número de ID e chance de aparecer.

**História de usuário 04**

> Eu como usuário, quero filtrar os Pokémons por tipos e fraquezas.

**História de usuário 05**

> Eu como usuário, quero realizar algum cálculo e visualizar alguma estatística referente aos Pokémons.

#### 1.3 Protótipo de baixa fidelidade:

Define-se wireframe como um esqueleto, um protótipo ou uma versão bastante primitiva do visual de um projeto.  
Nesse projeto o Wireframe foi definido, pensando na experiência do usuário conforme esboço abaixo, realizado na ferramenta [Figma](https://www.figma.com/).

**Protótipo 01 - Página HOME**

<p align="center">
<img src="./src/img/prototipo.png" width="600"/>
</p>

**Protótipo 02 - Página EXTRAS**

<p align="center">
<img src="./src/img/prototipo2.png" width="600"/>
</p>

#### 1.4 Teste de usabilidade:

Realizamos uma pesquisa com a ferramenta [Google Forms](https://www.google.com/forms/about/) para identificação de problemas de usabilidade, e verificamos a necessidade de correções e melhorias dos itens abaixo:

- Tamanho das fontes.
- Tamanho do card.
- Tamanho do menu.
- Necessidade da opção TODOS nos filtros.

### 2.Desenvolvimento do projeto

#### 2.1 Sobre a página.

O nome **Pokelover** vem da junção de _Pokémon_ e o nome do projeto _Data Lovers_, a fonte do título na página é inspirado no logo do anime e usa as mesmas cores, levamos em consideração a harmonia com o título para a escolha da paleta de cores geral, usando tons de azul e roxo e deixando o amarelo pontual como ponto de atenção.  
A apresentação dos cards com as informações e imagem dos Pokémons, faz referência aos cards vendidos dos personagens.  
Incluímos também as páginas **Sobre e Extras** com mais informações para os usuários, como a história do anime, importante para os usuários que desejam conhecer este universo, ou até mesmo saber um pouco mais, curiosidades sobre o universo e dicas para que os jogadores de _PokémonGO_ aproveitem ainda mais a experiência, e na página **Extras** podemos calcular o Poder de Combate e obter o provável CP do Pokémon após a evolução e também consultar a porcentagem de Pokémons por tipo.

#### 2.2 Scripts e recursos utilizados.

O _HTML_ foi usado para estruturação do conteúdo da página, levando em consideração a utilização de tags semânticas para acessibilidade e inclusão de inputs e filtros.

O _CSS_ foi usado para estilizar a página e definir o desenho visual, além de garantir a responsividade da página para tablets e celulares.

O _JavaScript_ foi usado para fazer a interação do usuário com a página utilizando elementos do DOM e fazer a manipulação dos dados escolhidos, além de armazenar este banco de dados.
A lógica do projeto foi implementada inteiramente em _JavaScript_.

Foi executado testes unitários para verificação da funcionalidade e o padrão foi verificado de acordo com as bibliotecas _eslint_ e _htmlhint_.
Foi utilizado também _Charts.js, Git e GitHub_.

### 3. Montagem do ambiente de desenvolvimento - Instalação e execução.

<p align="center">
<img src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif" width="200" heigth="200"> 
</p>

> :warning: Para executar os comandos você precisará de um UNIX Shell, que é um programa que interpreta linhas de comando e também deve ter o git instalado.
> Se você usa um sistema operacional como GNU/Linux ou MacOS, você já tem um _shell_ (terminal) instalado (e provavelmente o `git` também).
> Se você usa Windows pode baixar a versão completa do [Cmder](https://cmder.net/) que inclue o [Git bash](https://git-scm.com/download/win), embora seja recomendado que você teste GNU/Linux.
> Se tem Windows 10 ou superior pode usar o [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

> Será necessária também a instalação do [Node.js](https://nodejs.org/) que contém o [npm](https://docs.npmjs.com/)

---

- [Clone](https://help.github.com/articles/cloning-a-repository/) o projeto na sua máquina executando o seguinte comando no seu terminal:

```sh
git clone https://github.com/camilagerarde/SAP004-data-lovers
```

- Instale as dependências do projeto com o comando:

```sh
npm install
```

- Rode o projeto na sua máquina com:

```sh
npm start
```

- E visualize o projeto no seu navegador com o link:

```sh
http://localhost:5000
```

**Testes** :clipboard:

- Para executar os testes:

```sh
npm test
```

**Deploy** :octocat:
O projeto está configurado com o github pages.

- Para executar deploy no github:

```sh
npm run deploy
```

Desenvolvimento [Camila Cunha](https://github.com/camilagerarde) e [Naere Loire](https://github.com/naereloire).
