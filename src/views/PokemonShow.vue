<template>
  <div class="pokemon-show">
    <div class="poke-name" style="text-align: center">
      <img
        v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png`"
        class="center"
        v-bind:alt="currentPokemon.name"
        style="max-width: 250px"
      />
      <h2>{{ currentPokemon.name }}</h2>
    </div>
    <div class="poke-info" style="text-align: center">
      <div class="types">
        <p>{{ attribute[0] }} {{ attribute[1] }}</p>
      </div>
      <p>Pokedex ID: {{ currentPokemon.id }}</p>
      <p>{{ bio }}</p>
      <p>Category: {{ species.genus }}</p>
      <p>Height: {{ currentPokemon.height }}</p>
      <p>Weight: {{ currentPokemon.weight }}</p>
      <p>Base Happiness: {{ species.base_happiness }}</p>
      <p>Capture Rate: {{ species.capture_rate }}</p>
      <p>Base Experience: {{ currentPokemon.base_experience }}</p>
      <p>Abilities: {{ ability[0] }}, {{ ability[1] }}</p>
    </div>
  </div>
  <div>
    <h3>Evolution Chain</h3>
    <div>
      <p>{{ baby }}</p>
    </div>
    <div>
      <p>{{ teen }}</p>
    </div>
    <div>
      <p>{{ adult }}</p>
    </div>
  </div>
  <div>
    <h3>Base Stats</h3>
    <p>HP: {{ stats[0] }}</p>
    <p>Attack: {{ stats[1] }}</p>
    <p>Defense: {{ stats[2] }}</p>
    <p>Special Attack: {{ stats[3] }}</p>
    <p>Special Defense: {{ stats[4] }}</p>
    <p>Speed: {{ stats[5] }}</p>
  </div>
  <div>
    <h3>Move Pool</h3>
    <p>Move example</p>
    <p>Move example</p>
    <p>Move example</p>
  </div>
  <div class="row">
    <h3>Sprites</h3>
    <div class="column" style="text-align: center">
      <!-- front default -->
      <img
        v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`"
        class="center"
        v-bind:alt="currentPokemon.name"
        style="max-width: 250px"
      />
      <p>Front Default</p>
    </div>
    <div class="column" style="text-align: center">
      <!-- front shiny -->
      <img
        v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${currentPokemon.id}.png`"
        class="center"
        v-bind:alt="currentPokemon.name"
        style="max-width: 250px"
      />
      <p>Front Shiny</p>
    </div>
    <div class="column" style="text-align: center">
      <!-- back default -->
      <img
        v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${currentPokemon.id}.png`"
        class="center"
        v-bind:alt="currentPokemon.name"
        style="max-width: 250px"
      />
      <p>Back Default</p>
    </div>
    <div class="column" style="text-align: center">
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
  <router-link to="/pokemon">Back to all Pokemon!</router-link>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      pokemon: [],
      currentPokemon: {},
      ability: [],
      attribute: [],
      stats: [],
      base_stat: [],
      moves: [],
      species: {},
      bio: [],
      baby: {},
      teen: {},
      adult: {},
    };
  },
  mounted: function () {
    this.showPokemon();
    this.showSpecies();
  },
  methods: {
    showPokemon() {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + this.$route.params.id).then((response) => {
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
        console.log("ABILITY", this.ability);
        console.log("STATS", this.stats);
        console.log("TYPES", this.attribute);
        console.log("POKEMON", this.currentPokemon);
      });
    },
    showSpecies() {
      axios.get("https://pokeapi.co/api/v2/pokemon-species/" + this.$route.params.id).then((response) => {
        this.species = response.data;
        console.log("SPECIES", this.species.evolution_chain.url);
        this.bio = response.data.flavor_text_entries[0].flavor_text;
        this.showEvolution(this.species.evolution_chain.url);
      });
    },
    showEvolution(chain) {
      axios.get(chain).then((response) => {
        console.log(response.data);
        this.baby = response.data.chain?.species.name;
        console.log(this.baby);
        this.teen = response.data.chain?.evolves_to[0]?.species.name;
        console.log(this.teen);
        this.adult = response.data.chain?.evolves_to[0]?.evolves_to[0]?.species.name;
        console.log(this.adult);
      });
    },
  },
};
</script>

<style>
h1 {
  color: rgb(61, 1, 101);
  text-shadow: 2px 2px #00eeff;
}
h2 {
  color: rgb(0, 0, 0);
}
p {
  color: rgb(0, 0, 0);
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.column {
  float: left;
  width: 22%;
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
</style>
