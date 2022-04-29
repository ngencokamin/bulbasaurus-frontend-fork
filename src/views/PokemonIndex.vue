<template>
  <div class="row">
    <h1>{{ message }}</h1>
    <div class="col" v-for="p in pokemon" v-bind:key="p.id">
      <div class="card" style="width: 10rem">
        <img
          v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`"
          class="card-img-top"
          v-bind:alt="pokemon.name"
        />
        <div class="card-body">
          <h5 class="card-title">{{ pokemon.name }}</h5>
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
      message: "shit",
      pokemon: [],
    };
  },
  created: function () {
    this.indexPokemons();
  },
  methods: {
    indexPokemons() {
      axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40").then((response) => {
        console.log(response.data.results);
        this.pokemon = response.data.results;
        for (var i = 0; i < this.pokemon.length; i++) {
          var pokemon_url_array = this.pokemon[i].url.split("/");
          console.log(pokemon_url_array);
          this.pokemon[i].id = pokemon_url_array[6];
        }
        console.log(this.pokemon);
      });
    },
  },
};
</script>

<style>
.selected .card-body {
  color: white;
  background-color: rgb(200, 101, 236);
  width: 20%;
  height: 20%;
}
</style>
