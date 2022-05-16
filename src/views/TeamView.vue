<template>
  <div class="team">
    <div class="poke-name" style="text-align: center">
      <!-- <img
        v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png`"
        class="center"
        v-bind:alt="currentPokemon.name"
        style="max-width: 250px"
      /> -->
      <h2>{{ currentPokemon.name }}</h2>
      <h2>{{ currentPokemon.category }}</h2>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      team: [],
    };
  },
  created: function () {
    this.addTeam();
  },
  methods: {
    addTeam(id) {
      axios.post("/team", { user_id: localStorage.user_id, pokemon_id: id }).then((response) => {
        console.log("GAH", response.data);
      });
    },
  },
};
</script>
