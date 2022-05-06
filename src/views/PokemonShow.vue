<template>
  <div class="home">
    <router-link v-bind:to="`/pokemon/${p.id}`">
      <img
        v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`"
        class="card-img-top"
        v-bind:alt="p.name"
        style="max-width: 250px"
      />
    </router-link>
    <div></div>
    <router-link to="/pokemon">Back to all Pokemon!</router-link>
    <div v-for="p in pokemon" v-bind:key="p.id">
      <h2>{{ pokemon.name }}</h2>
    </div>
    <button v-on:click="showPokemon(pokemon)">More Info</button>

    <dialog id="pokemon-details">
      <form method="dialog">
        <h1>Pokemon Info</h1>
        <p>Name: {{ currentPokemon.name }}</p>
        <p>Base Experience: {{ currentPokemon.base_experience }}</p>
        <p>Order: {{ currentPokemon.order }}</p>
        <p>Weight: {{ currentPokemon.weight }}</p>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      pokemon: [],
      currentPokemon: {},
    };
  },
  created: function () {
    this.showPokemon();
  },
  methods: {
    showPokemon() {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemon.id}`).then((response) => {
        this.currentPokemon = response.data;
        document.querySelector("#pokemon-details").showModal();
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
