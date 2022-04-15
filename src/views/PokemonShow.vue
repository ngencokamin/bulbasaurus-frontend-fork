<template>
  <div class="home">
    <h1>Pokemon Info</h1>
    <h2>{{ pokemon.name }}</h2>
    <p>{{ pokemon.id }}</p>
    <p>{{ pokemon.pokemon_type }}</p>
    <p>{{ pokemon.species }}</p>
    <p>{{ pokemon.height }}</p>
    <p>{{ pokemon.hp }}</p>
    <p>{{ pokemon.attack }}</p>
    <p>{{ pokemon.defense }}</p>
    <p>{{ pokemon.spec_attack }}</p>
    <p>{{ pokemon.spec_defense }}</p>
    <p>{{ pokemon.speed }}</p>
    <p>{{ pokemon.total }}</p>
    <img
      v-if="pokemon && pokemon.images && pokemon.images[0]"
      v-bind:src="pokemon.images[0].url"
      v-bind:alt="pokemon.name"
      style="max-width: 250px"
    />
    <div></div>
    <router-link to="/pokemon">Back to all Pokemon!</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      pokemon: [],
    };
  },
  created: function () {
    this.showPokemon();
  },
  methods: {
    showPokemon() {
      axios.get(`/pokemon/${this.$route.params.id}`).then((response) => {
        this.pokemon = response.data;
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
</style>
