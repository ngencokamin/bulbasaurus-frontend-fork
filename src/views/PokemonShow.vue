<template>
  <div class="pokemon-show">
    <div class="poke-name" style="text-align: center">
      <img
        v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png`"
        class="center"
        v-bind:alt="currentPokemon.name"
        style="max-width: 250px"
      />
      <h1>{{ currentPokemon.name }}</h1>

      <div class="options">
        <Popper content="Great catch! This Pokemon has been added to your team!">
          <div class="option faded" id="option1">
            <div class="pokeball unselected" v-on:click="addTeam(currentPokemon.id)">
              <div class="upper-half"></div>
              <div class="lower-half"></div>
              <div class="base"></div>
              <div class="inner-circle"></div>
              <div class="indicator visible"></div>
              <div class="indicator-inner"></div>
            </div>
          </div>
        </Popper>
      </div>

      <div class="poke-info" style="text-align: center">
        <div class="types">
          <p>{{ attribute[0] }} {{ attribute[1] }}</p>
        </div>
        <p>National № : {{ currentPokemon.id }}</p>
        <p>{{ bio }}</p>
        <p>Category: {{ category }}</p>
        <p>Height: {{ currentPokemon.height }}m</p>
        <p>Weight: {{ currentPokemon.weight }}kg</p>
        <p>Base Happiness: {{ species.base_happiness }}</p>
        <p>Capture Rate: {{ species.capture_rate }}</p>
        <p>Base Experience: {{ currentPokemon.base_experience }}</p>
        <p>Abilities: {{ ability[0] }}</p>
      </div>
      <h3>Evolution Chain</h3>
      <div class="chain row">
        <div
          class="col-md"
          v-for="(evolution,index) in evolutionChain"
          :key="evolution._id"
        >
          <div>
            <img
              v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`"
              class="center img-responsive"
              v-bind:alt="evolution.name"
              style="max-width:250px;height: auto"
            />
            <p>{{ evolution.name }}</p>
          </div>
          <div class="arrowed" v-if="index < this.evolutionChain.length - 1">
          <div class="arrow-6"></div>
        </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="base">
            <h3>Base Stats</h3>
          </div>

          <div class="graph">
            <section class="bar-graph bar-graph-horizontal bar-graph-one">
              <div class="bar-one">
                <span class="year">HP</span>
                <div class="bar" data="60"></div>
              </div>
              <div class="bar-two">
                <span class="year">Attack</span>
                <div class="bar" data="65"></div>
              </div>
              <div class="bar-three">
                <span class="year">Defense</span>
                <div class="bar" data="60"></div>
              </div>
              <div class="bar-four">
                <span class="year">Special Attack</span>
                <div class="bar" data="130"></div>
              </div>
              <div class="bar-five">
                <span class="year">Special Defense</span>
                <div class="bar" data="75"></div>
              </div>
              <div class="bar-six">
                <span class="year">Speed</span>
                <div class="bar" data="110"></div>
              </div>
            </section>
          </div>
        </div>
        <div class="col">
          <div class="base" style="text-align: center; background-color: black">
            <h3>Moves</h3>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table class="table table-bordered table-striped mb-0">
                <thead class="color">
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>PP</th>
                    <th>Power</th>
                    <th>Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ ability[31] }}</td>
                    <td>Physical</td>
                    <td>30</td>
                    <td>30</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>{{ ability[67] }}</td>
                    <td>Special</td>
                    <td>15</td>
                    <td>80</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>{{ ability[52] }}</td>
                    <td>Special</td>
                    <td>10</td>
                    <td>75</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>{{ ability[83] }}</td>
                    <td>Physical</td>
                    <td>20</td>
                    <td>60</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>{{ ability[34] }}</td>
                    <td>Special</td>
                    <td>15</td>
                    <td>100</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>{{ ability[47] }}</td>
                    <td>Special</td>
                    <td>10</td>
                    <td>90</td>
                    <td>100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <h3>Sprites</h3>
        <div class="col-md-3" style="text-align: center">
          <!-- front default -->
          <img
            v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`"
            class="center"
            v-bind:alt="currentPokemon.name"
            style="max-width: 250px"
          />
          <p>Front Default</p>
        </div>
        <div class="col-md-3" style="text-align: center">
          <!-- back default -->
          <img
            v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${currentPokemon.id}.png`"
            class="center"
            v-bind:alt="currentPokemon.name"
            style="max-width: 250px"
          />
          <p>Back Default</p>
        </div>
        <div class="col-md-3" style="text-align: center">
          <!-- front shiny -->
          <img
            v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${currentPokemon.id}.png`"
            class="center"
            v-bind:alt="currentPokemon.name"
            style="max-width: 250px"
          />
          <p>Front Shiny</p>
        </div>

        <div class="col-md-3" style="text-align: center">
          <!-- back shiny -->
          <img
            v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${currentPokemon.id}.png`"
            class="center"
            v-bind:alt="currentPokemon.name"
            style="max-width: 250px"
          />
          <p>Back Shiny</p>
        </div>
      </div>
      <div class="router">
        <router-link to="/pokemon">Back to all Pokemon!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "../../public/css/styles.scss";
import Popper from "vue3-popper";

export default {
  components: {
    Popper,
  },
  data: function () {
    return {
      currentPokemon: {},
      ability: [],
      attribute: [],
      stats: [],
      base_stat: [],
      species: {},
      bio: [],
      baby: {},
      teen: {},
      adult: {},
      category: {},
      moves: {},
      babyId: {},
      teenId: {},
      adultId: {},
      evolutionChain: [],
    };
  },
  mounted: function () {
    this.showPokemon();
    this.showSpecies();

    const options = ["option1"];

    options.forEach((option) => {
      document.getElementById(option).addEventListener("click", function () {
        const pokeballs = document.getElementsByClassName("pokeball");
        for (var i = 0; i < pokeballs.length; i++) {
          let pokeball = pokeballs[i];
          if (pokeball.parentNode.id != option) {
            pokeball.classList.remove("selected");
            pokeball.parentNode.classList.add("faded");
          } else {
            pokeball.classList.add("selected");
            pokeball.parentNode.classList.remove("faded");
          }
        }
      });
    });
  },
  methods: {
    showPokemon() {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + this.$route.params.id)
        .then((response) => {
          console.log("HEY", this.$route.params.id);
          this.currentPokemon = response.data;
          let attribute = response.data.types;
          attribute.forEach((type) => {
            this.attribute.push(type.type.name);
          });
          let stats = response.data.stats;
          stats.forEach((base_stat) => {
            this.stats.push(base_stat.base_stat);
          });
          let ability = response.data.abilities;
          ability.forEach((ability) => {
            this.ability.push(ability.ability.name);
          });
          let moves = response.data.moves;
          moves.forEach((move) => {
            this.ability.push(move.move.name);
          });

          console.log("ABILITY", this.ability);
          console.log("STATS", this.stats);
          console.log("TYPES", this.attribute);
          console.log("POKEMON", this.currentPokemon);
        });
    },
    showSpecies() {
      axios
        .get("https://pokeapi.co/api/v2/pokemon-species/" + this.$route.params.id)
        .then((response) => {
          this.species = response.data;
          console.log("SPECIES", this.species.evolution_chain.url);
          console.log("CATEGORY", this.species.genera[7]);
          this.bio = response.data.flavor_text_entries[0].flavor_text;
          this.category = response.data.genera[7].genus;
          this.showEvolution(this.species.evolution_chain.url);
        });
    },
    showEvolution(chain) {
      axios.get(chain).then((response) => {
        console.log(response.data);
        let currentEvolution = response.data.chain;
        let url = currentEvolution.species.url.replace(/\/$/, "");
        this.evolutionChain.push({
          name: currentEvolution.species.name,
          id: url.substring(url.lastIndexOf("/") + 1),
        });
        let hasEvolution = response.data.chain?.evolves_to.length > 0 ? true : false;
        while (hasEvolution) {
          if (currentEvolution.evolves_to.length > 0) {
            currentEvolution = currentEvolution.evolves_to[0];
            let url = currentEvolution.species.url.replace(/\/$/, "");
            this.evolutionChain.push({
              name: currentEvolution.species.name,
              id: url.substring(url.lastIndexOf("/") + 1),
            });
          } else {
            hasEvolution = false;
          }
        }
      });
    },
    addTeam(id) {
      axios
        .post("/team", { user_id: localStorage.user_id, pokemon_id: id })
        .then((response) => {
          console.log("GAH", response.data);
        });
    },
  },
};
</script>

<style>
h1 {
  color: rgb(61, 1, 101);
  text-shadow: 2px 2px #00eeff;
  font-family: "Pokemon Solid";
  text-align: center;
}
h3 {
}
h2 {
  color: rgb(0, 0, 0);
}
p {
  color: rgb(0, 0, 0);
  font-weight: bolder;
}
.options .p {
  text-align: center;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.column {
  width: 25%;
  padding: 5px;
}
.row::after {
  content: "";
  clear: both;
  display: table;
}
.poke-name {
  text-transform: uppercase;
}
.types {
  text-shadow: 2px 2px #8569f5;
  text-transform: uppercase;
  font-weight: bold;
}
@media screen and (max-width: 480px) {
  img {
    width: 400px;
  }
}
.chain::after {
  content: "";
  clear: both;
  display: table;
}
h3 {
  text-align: center;
  text-shadow: 2px 2px #bc2626;
  font-weight: bolder;
}
.row {
  text-align: center;
  resize: horizontal;
  overflow: auto;
}
.graph {
  text-shadow: 1px 1px #140a5a;
  padding-left: 1cm;
}
.chain {
  text-align: center;
}
.base {
  text-align: left;
  padding: 10px 15px;
}
img {
  max-width: 100%;
  min-width: 300px;
  height: auto;
}
.router {
  text-align: center;
}
body {
  font-family: "Roboto Slab", serif;
  font-weight: 900;
  padding: 20px;
}

/* Bar Graph Horizontal */
.bar-graph .year {
  -webkit-animation: fade-in-text 2.2s 0.1s forwards;
  -moz-animation: fade-in-text 2.2s 0.1s forwards;
  animation: fade-in-text 2.2s 0.1s forwards;
  opacity: 0;
}

.bar-graph-horizontal {
  max-width: 380px;
}

.bar-graph-horizontal > div {
  float: left;
  margin-bottom: 8px;
  width: 100%;
}

.bar-graph-horizontal .year {
  float: left;
  margin-top: 10px;
  width: 50px;
  padding-right: 20%;
}

.bar-graph-horizontal .bar {
  border-radius: 3px;
  height: 55px;
  float: left;
  position: relative;
  width: 0;
}

.bar-graph-one .bar::after {
  -webkit-animation: fade-in-text 2.2s 0.1s forwards;
  -moz-animation: fade-in-text 2.2s 0.1s forwards;
  animation: fade-in-text 2.2s 0.1s forwards;
  color: #fff;
  content: attr(data);
  font-weight: 700;
  position: absolute;
  right: 20px;
  top: 17px;
}

.bar-graph-one .bar-one .bar {
  background-color: #9d75fa;
  -webkit-animation: show-bar-one 1.2s 0.1s forwards;
  -moz-animation: show-bar-one 1.2s 0.1s forwards;
  animation: show-bar-one 1.2s 0.1s forwards;
  padding-left: 5%;
}

.bar-graph-one .bar-two .bar {
  background-color: #7d52df;
  -webkit-animation: show-bar-two 1.2s 0.2s forwards;
  -moz-animation: show-bar-two 1.2s 0.2s forwards;
  animation: show-bar-two 1.2s 0.2s forwards;
  padding-left: 5%;
}

.bar-graph-one .bar-three .bar {
  background-color: #6538cf;
  -webkit-animation: show-bar-three 1.2s 0.3s forwards;
  -moz-animation: show-bar-three 1.2s 0.3s forwards;
  animation: show-bar-three 1.2s 0.3s forwards;
  padding-left: 5%;
}

.bar-graph-one .bar-four .bar {
  background-color: #5626c5;
  -webkit-animation: show-bar-four 1.2s 0.4s forwards;
  -moz-animation: show-bar-four 1.2s 0.4s forwards;
  animation: show-bar-four 1.2s 0.4s forwards;
  padding-left: 5%;
}
.bar-graph-one .bar-five .bar {
  background-color: #461fa2;
  -webkit-animation: show-bar-five 1.2s 0.5s forwards;
  -moz-animation: show-bar-five 1.2s 0.5s forwards;
  animation: show-bar-five 1.2s 0.5s forwards;
  padding-left: 5%;
}
.bar-graph-one .bar-six .bar {
  background-color: #2c0a7c;
  -webkit-animation: show-bar-six 1.2s 0.6s forwards;
  -moz-animation: show-bar-six 1.2s 0.6s forwards;
  animation: show-bar-six 1.2s 0.6s forwards;
  padding-left: 5%;
}
/* Bar Graph Horizontal Animations */
@-webkit-keyframes show-bar-one {
  0% {
    width: 0;
  }
  100% {
    width: 40%;
  }
}

@-webkit-keyframes show-bar-two {
  0% {
    width: 0;
  }
  100% {
    width: 45%;
  }
}

@-webkit-keyframes show-bar-three {
  0% {
    width: 0;
  }
  100% {
    width: 40%;
  }
}

@-webkit-keyframes show-bar-four {
  0% {
    width: 0;
  }
  100% {
    width: 75%;
  }
}
@-webkit-keyframes show-bar-five {
  0% {
    width: 0;
  }
  100% {
    width: 55%;
  }
}
@-webkit-keyframes show-bar-six {
  0% {
    width: 0;
  }
  100% {
    width: 70%;
  }
}

@-webkit-keyframes fade-in-text {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.color {
  background-color: black;
  color: white;
}
.arrowed {
  position: relative;
  display: inline-block;
  height: 200px;
  width: 200px;
  margin: 0 20px 20px 0;
}

/* Just centering the examples */
.arrowed div {
  position: absolute;
  top: 10px;
  bottom: 0;
  left: 10px;
  right: 0;
  margin: auto;
}
.arrow-6 {
  /* more triangle */
  height: 20px;
  width: 20px;

  border: 1px solid rgba(0, 0, 0, 0.6);
  border-width: 3px 3px 0 0;
  transform: rotate(45deg);
}

.arrow-6:before,
.arrow-6:after {
  content: "";
  position: absolute;
  display: block;
  height: 20px;
  width: 20px;
  border-width: 3px 3px 0 0;
}

.arrow-6:before {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-width: 3px 3px 0 0;
  /* top - distance minus border */
  top: 7px;
  left: -10px;
}

.arrow-6:after {
  border: 1px solid rgb(0, 0, 0);
  border-width: 3px 3px 0 0;
  /* top - distance plus border */
  top: -13px;
  left: 10px;
}
:root {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>
