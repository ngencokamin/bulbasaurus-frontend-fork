<template>
  <div class="pokemon-show">
    <div>
      <img
        v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`"
        class="center"
        v-bind:alt="currentPokemon.name"
        style="max-width: 250px"
      />
    </div>
    <h2>{{ currentPokemon.name }}</h2>
    <p>Types: {{ attribute[0] }}, {{ attribute[1] }}</p>
    <p>Under a full moon, this POKéMON likes to mimic the shadows of people and laugh at their fright.</p>
    <p>Category: Shadow Pokemon</p>
    <p>Height: {{ currentPokemon.height }}</p>
    <p>Weight: {{ currentPokemon.weight }}</p>
    <p>Abilities: {{ ability[0] }}</p>
  </div>
  <div>
    <h3>Evolution Chain</h3>
    <img
      src="https://sg.portal-pokemon.com/play/resources/pokedex/img/pm/5c619391fb78cbe0d3646a9b76da07372a18580e.png"
      id="left"
      style="max-width: 250px"
    />
    <img
      src="https://archives.bulbagarden.net/media/upload/thumb/6/62/093Haunter.png/250px-093Haunter.png"
      id="center"
      style="max-width: 250px"
    />

    <img
      src="https://archives.bulbagarden.net/media/upload/thumb/c/c6/094Gengar.png/250px-094Gengar.png"
      id="right"
      style="max-width: 250px"
    />
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
    };
  },
  mounted: function () {
    this.showPokemon();
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
        console.log("GEEEZZZ", this.ability);
        console.log("UGHHHH", this.stats);
        console.log("AHHH!!!", this.attribute);
        console.log(this.currentPokemon);

        // document.querySelector("#pokemon-details").showModal();
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
#center {
}
#left {
  float: left;
}
/* #right {
  float: right;
} */
</style>
