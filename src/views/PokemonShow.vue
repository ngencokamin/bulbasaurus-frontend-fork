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
    <p>Category: {{ currentPokemon.pokemon_species }}</p>
    <p>Height: {{ currentPokemon.height }}</p>
    <p>Weight: {{ currentPokemon.weight }}</p>
    <p v-if="species?.shape">Shape: {{ species.shape }}</p>
    <p v-if="ability?.name">Abilities: {{ ability.name }}</p>
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
      ability: {},
      attribute: [],
      species: {},
    };
  },
  mounted: function () {
    this.showPokemon();
    this.abilityShow();
    this.speciesShow();
  },
  methods: {
    showPokemon() {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + this.$route.params.id).then((response) => {
        this.currentPokemon = response.data;
        let attribute = response.data.types;
        attribute.forEach((type) => {
          this.attribute.push(type.type.name);
        });
        console.log("AHHH!!!", this.attribute);
        console.log(this.currentPokemon);

        // document.querySelector("#pokemon-details").showModal();
      });
    },
    abilityShow() {
      axios.get("https://pokeapi.co/api/v2/ability/" + this.$route.params.id).then((response) => {
        this.ability = response.data;
        console.log("THIS IS THE ABILITY", this.ability);
      });
    },
    speciesShow() {
      axios.get("https://pokeapi.co/api/v2/pokemon-species/" + this.$route.params.id).then((response) => {
        this.species = response.data;
        console.log("THIS IS THE SPECIES", this.species);
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
</style>
