<template>
  <div class="row">
    <h1>{{ message }}</h1>
    <div
      class="col"
      v-bind:class="{ selected: pokemon === currentPokemon }"
      v-for="pokemon in pokemons"
      v-bind:key="pokemon.id"
      v-on:click="currentPokemon = pokemon"
    >
      <div class="card" style="width: 18rem">
        <img class="card-img-top" v-bind:src="pokemon.image" v-bind:alt="pokemon.title" />
        <div class="card-body">
          <h5 class="card-title">{{ pokemon.title }}</h5>
          <p class="card-text">{{ pokemon.body }}</p>
          <a v-bind:href="`/pokemons/${pokemon.id}`" class="btn btn-primary">More Info</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Gotta catch them all!",
      pokemons: [],
      currentPokemon: {},
    };
  },
  created: function () {
    this.indexPokemons();
  },
  methods: {
    indexPokemons() {
      axios.get("/pokemon").then((response) => {
        console.log(response.data);
        this.pokemons = response.data;
      });
    },
  },
};
</script>

<style>
.selected .card-body {
  color: white;
  background-color: rgb(200, 101, 236);
}
</style>
