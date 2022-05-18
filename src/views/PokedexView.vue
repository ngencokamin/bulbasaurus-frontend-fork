<template>
  <div class="pokedex">
    <div class="left-container">
      <div class="left-container__top-section">
        <div class="top-section__blue"></div>
        <div class="top-section__small-buttons">
          <div class="top-section__red"></div>
          <div class="top-section__yellow"></div>
          <div class="top-section__green"></div>
        </div>
      </div>
      <div class="left-container__main-section-container">
        <div class="left-container__main-section">
          <div class="main-section__white">
            <div class="main-section__black">
              <div class="main-screen">
                <div class="screen__header">
                  <span class="poke-name"></span>
                  <span class="poke-id"></span>
                </div>
                <div class="screen__image">
                  <img src="" class="poke-front-image" alt="front" />
                  <img src="" class="poke-back-image" alt="back" />
                </div>
                <div class="screen__description">
                  <div class="stats__types">
                    <span class="poke-type-one"></span>
                    <span class="poke-type-two"></span>
                  </div>
                  <div class="screen__stats">
                    <p class="stats__weight">
                      weight:
                      <span class="poke-weight"></span>
                      lbs
                    </p>
                    <p class="stats__height">
                      height:
                      <span class="poke-height"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-container__controllers">
            <div class="buttons__button">B</div>
            <div class="controllers__d-pad">
              <div class="d-pad__cell top"></div>
              <div class="d-pad__cell left"></div>
              <div class="d-pad__cell middle"></div>
              <div class="d-pad__cell right"></div>
              <div class="d-pad__cell bottom"></div>
            </div>
          </div>
        </div>
        <div class="left-container__right">
          <div class="left-container__hinge"></div>
          <div class="left-container__hinge"></div>
        </div>
      </div>
    </div>
    <div class="right-container">
      <div class="right-container__black">
        <div class="right-container__screen">
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
          <div class="list-item"></div>
        </div>
      </div>
      <div class="container">
        <div class="blue-button"></div>
        <div class="blue-button"></div>
        <div class="yellow-button"></div>
        <div class="green-button"></div>
      </div>
      <div class="right-container__buttons">
        <div class="left-button">Prev</div>
        <div class="right-button">Next</div>
      </div>
    </div>
  </div>
  <!-- <div class="mobile">
    <h1>Mobile Stats</h1>
    <h4>Text +1(345-876-4567) your favorite Pokemon and receive their base stats straight to your device!</h4>
    <img src="https://i.pinimg.com/originals/00/ff/ea/00ffea6f4c8f8c6348703c6002ac9042.gif" />
  </div> -->
</template>

<script>
export default {
  mounted: function () {
    const mainScreen = document.querySelector(".main-screen");
    const pokeName = document.querySelector(".poke-name");
    const pokeId = document.querySelector(".poke-id");
    const pokeFrontImage = document.querySelector(".poke-front-image");
    const pokeBackImage = document.querySelector(".poke-back-image");
    const pokeTypeOne = document.querySelector(".poke-type-one");
    const pokeTypeTwo = document.querySelector(".poke-type-two");
    const pokeHeight = document.querySelector(".poke-height");
    const pokeWeight = document.querySelector(".poke-weight");
    const pokeListItems = document.querySelectorAll(".list-item");
    const leftButton = document.querySelector(".left-button");
    const rightButton = document.querySelector(".right-button");

    // const + var
    const TYPES = [
      "normal",
      "fighting",
      "flying",
      "poison",
      "ground",
      "rock",
      "bug",
      "ghost",
      "steel",
      "fire",
      "water",
      "grass",
      "electric",
      "psychic",
      "ice",
      "dragon",
      "dark",
      "fairy",
    ];

    let prevUrl = null;
    let nextUrl = null;

    // FUNCTIONS

    const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

    const resetScreen = () => {
      mainScreen.classList.remove("hide");
      for (const type of TYPES) {
        mainScreen.classList.remove(type);
        console.log(type);
      }
    };

    const fetchPokeList = (url) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const { results, previous, next } = data;
          prevUrl = previous;
          nextUrl = next;

          for (let i = 0; i < pokeListItems.length; i++) {
            const pokeListItem = pokeListItems[i];
            const resultData = results[i];

            if (resultData) {
              const { name, url } = resultData;
              const urlArray = url.split("/");
              const id = urlArray[urlArray.length - 2];
              pokeListItem.textContent = id + ". " + capitalize(name);
            } else {
              pokeListItem.textContent = "";
            }
          }
        });
    };

    const fetchPokeData = (id) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => {
          resetScreen();

          const dataTypes = data["types"];
          const dataFirstType = dataTypes[0];
          const dataSecondType = dataTypes[1];
          pokeTypeOne.textContent = capitalize(dataTypes[0]["type"]["name"]);
          if (dataSecondType) {
            pokeTypeTwo.classList.remove("hide");
            pokeTypeTwo.textContent = capitalize(dataSecondType["type"]["name"]);
          } else {
            pokeTypeTwo.classList.add("hide");
            pokeTypeTwo.textContent = "";
          }

          mainScreen.classList.add(dataFirstType["type"]["name"]);

          pokeName.textContent = capitalize(data["name"]);
          pokeId.textContent = "#" + data["id"].toString().padStart(3, "0");
          pokeWeight.textContent = data["weight"] + " lbs";
          pokeHeight.textContent = data["height"];

          pokeFrontImage.src = data["sprites"]["front_default"] || "";
          pokeBackImage.src = data["sprites"]["back_default"] || "";
        });
    };

    const handleLeftButtonClick = () => {
      if (prevUrl) {
        fetchPokeList(prevUrl);
      }
    };

    const handleRightButtonClick = () => {
      if (nextUrl) {
        fetchPokeList(nextUrl);
      }
    };

    const handleListItemClick = (e) => {
      if (!e.target) return;

      const listItem = e.target;
      if (!listItem.textContent) return;

      const id = listItem.textContent.split(".")[0];
      fetchPokeData(id);
    };

    // get data for left side

    // get data for right side of screen

    // event listeners
    leftButton.addEventListener("click", handleLeftButtonClick);
    rightButton.addEventListener("click", handleRightButtonClick);

    for (const pokeListItem of pokeListItems) {
      pokeListItem.addEventListener("click", handleListItemClick);
    }
    // initialize app

    fetchPokeList("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
/* .pokedex {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
} */
body {
  display: flex;
  font-family: sans-serif;
  justify-content: center;
}

.pokedex {
  align-items: flex-end;
  display: flex;
  height: 600px;
  margin: 50px;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.left-container,
.right-container {
  border: 3px solid black;
  width: 50%;
}

.right-container {
  border-left: none;
}

.left-container {
  background: #e71d23;
  height: 100%;
  width: calc(50% + 50px);
}

.left-container__top-section {
  border-bottom: 3px solid black;
  display: flex;
  height: 50px;
  padding: 8px;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}

.top-section__blue {
  background: radial-gradient(farthest-corner at 10px 10px, white, #369cd4, #369cd4);
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.5);
  height: 30px;
  width: 30px;
}

.top-section__small-buttons {
  display: flex;
  margin: 0 25px;
}

.top-section__red,
.top-section__yellow,
.top-section__green {
  border-radius: 50%;
  border: 1px solid black;
  height: 10px;
  margin-right: 5px;
  width: 10px;
}

.left-container__main-section-container {
  display: flex;
  height: calc(100% - 70px);
}

.left-container__main-section {
  height: 100%;
  padding: 25px;
  width: 500px;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}

.main-section__white {
  background: #dedede;
  border: 3px solid black;
  box-shadow: inset 0 0 3px 3px rgba(0, 0, 0, 0.3);
  height: 325px;
}

.main-section__black {
  background: black;
  height: calc(100% - 50px);
  margin: 25px;
  padding: 10px;
  width: calc(100% - 50px);
  border-radius: 10px;
}

.main-screen {
  border-radius: 15px;
  height: 100%;
  padding: 15px;
}

.screen__header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.poke-name {
  color: white;
  font-size: 25px;
  font-weight: bold;
}

.poke-id {
  color: rgba(0, 0, 0, 0.5);
  font-size: 20px;
}

.screen__image {
  display: flex;
  justify-content: space-around;
}

.poke-front-image,
.poke-back-image {
  height: 96px;
  width: 96px;
}

.screen__description {
  display: flex;
  height: 100px;
  justify-content: space-around;
}

.screen__stats {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 20px 15px;
}

.stats__types {
  height: 100%;
  padding: 5px;
}

.poke-type-one,
.poke-type-two {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  text-align: center;
}

.left-container__controllers {
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin: 10px 25px 0;
}

.controllers__d-pad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.d-pad__cell {
  background: black;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
  height: 15px;
  width: 15px;
}

.d-pad__cell.top {
  border-left: 1px solid dimgrey;
  border-radius: 5px 5px 0 0;
  border-right: 1px solid dimgrey;
  border-top: 1px solid dimgrey;
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
}

.d-pad__cell.left {
  border-bottom: 1px solid dimgrey;
  border-left: 1px solid dimgrey;
  border-radius: 5px 0 0 5px;
  border-top: 1px solid dimgrey;
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
}

.d-pad__cell.middle {
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
}

.d-pad__cell.right {
  border-bottom: 1px solid dimgrey;
  border-radius: 0 5px 5px 0;
  border-right: 1px solid dimgrey;
  border-top: 1px solid dimgrey;
  grid-column: 3 / span 1;
  grid-row: 2 / span 1;
}

.d-pad__cell.bottom {
  border-bottom: 1px solid dimgrey;
  border-left: 1px solid dimgrey;
  border-radius: 0 0 5px 5px;
  border-right: 1px solid dimgrey;
  grid-column: 2 / span 1;
  grid-row: 3 / span 1;
}

.controllers__buttons {
  display: flex;
  justify-content: space-around;
  width: 100px;
}

.buttons__button {
  align-items: center;
  background: black;
  border-radius: 50%;
  border: 1px solid dimgrey;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.75);
  display: flex;
  height: 40px;
  justify-content: space-around;
  align-self: flex-start;
  float: left;
  width: 40px;
}

.buttons__button:first-child {
  margin-top: 5px;
}

.buttons__button:last-child {
  margin-top: -5px;
}

.left-container__right {
  border-left: 3px solid black;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 50px;
}

.left-container__hinge {
  background: linear-gradient(to right, #7f100f, #e71d23, #e71d23, #7f100f);
  height: 75px;
  width: 100%;
}

.left-container__hinge:first-child {
  border-bottom: 3px solid black;
}

.left-container__hinge:last-child {
  border-top: 3px solid black;
}

.top-section__red {
  background: #7f100f;
}

.top-section__yellow {
  background: #edf18e;
}

.top-section__green {
  background: #33915a;
}

.right-container {
  background: #e71d23;
  height: calc(100% - 50px);
  padding: 25px;
  width: calc(50% - 50px);
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}

.right-container__black {
  background: black;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
  height: 300px;
  padding: 10px;
}

.right-container__screen {
  background: #1b211d;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  padding: 15px 15px 0;
}

.list-item {
  font-family: "Pokemon Pixel Font", monospace;
  text-shadow: 2px 2px #0f8cdf;
  align-items: center;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 11px;
  height: 25px;
  overflow-x: hidden;
  padding-left: 5px;
  width: 50%;
}

.list-item:hover {
  background: #85cbf2;
  color: black;
}

.list-item:active {
  background: #1280f2;
  color: white;
}

.right-container__buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}
.yellow-button {
  background: radial-gradient(farthest-corner at 10px 10px, white, #f6de2a, #9b6747);
  border-radius: 50%;
  border: 0.75px solid brown;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.5);
  height: 15px;
  width: 15px;
  justify-content: space-around;
  display: inline-block;
  margin-left: 140px;
}
.green-button {
  background: radial-gradient(farthest-corner at 10px 10px, white, #21ac52, #1c5d33);
  border-radius: 50%;
  border: 0.75px solid brown;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.5);
  height: 15px;
  width: 15px;
  justify-content: space-around;
  display: inline-block;
  margin-left: 10px;
}

.blue-button {
  display: inline-block;
  background: #0f8cdf;
  border-radius: 3px;
  border: 2px solid black;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-weight: bold;
  height: 15px;
  width: 50px;
  margin-top: 20px;
}

.blue-button-line {
  width: 40px;
  height: 100px;
  border-bottom: 1px solid black;
}

.left-button,
.right-button {
  font-family: "Press Start 2P", cursive;
  align-items: center;
  background: #dedede;
  border-radius: 3px;
  border: 2px solid black;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  font-weight: bold;
  height: 30px;
  justify-content: center;
  text-transform: uppercase;
  width: 100px;
}

.left-button:hover,
.right-button:hover {
  background: white;
}

.left-button:active,
.right-button:active {
  box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, 0.3);
}

.hide {
  display: none;
}

.normal {
  background: #babaae;
}

.fighting {
  background: #a75543;
}

.flying {
  background: #78a2ff;
}

.poison {
  background: #a95ca0;
}

.ground {
  background: #eecc55;
}

.rock {
  background: #ccbd72;
}

.bug {
  background: #c2d21e;
}

.ghost {
  background: #7975d7;
}

.steel {
  background: #c4c2db;
}

.fire {
  background: #fa5643;
}

.water {
  background: #56adff;
}

.grass {
  background: #8cd750;
}

.electric {
  background: #fde139;
}

.psychic {
  background: #fa65b4;
}

.ice {
  background: #96f1ff;
}

.dragon {
  background: #8673ff;
}

.dark {
  background: #8d6855;
}

.fairy {
  background: #f9aeff;
}
.mobile {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
img {
  max-width: 100%;
  height: auto;
}
</style>
