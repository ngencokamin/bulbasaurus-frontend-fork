<template>
  <div class="team">
    <h1>My Team</h1>
    <div class="row">
      <div class="column" style="width: 18rem" v-for="p in pokemon" v-bind:key="p.id">
        <router-link v-bind:to="`/pokemon/${p.id}`">
          <img
            v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`"
            class="card-img-top"
            v-bind:alt="p.name"
          />
        </router-link>
        <div class="col">
          <h1 class="col">{{ p.name }}</h1>
          <br />
          <p class="col">National № :{{ p.id }}</p>
          <button class="pulse" v-on:click="destroyPokemon(p.team_id)">Delete</button>
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
      team: [],
      pokemon: [],
      poke: [],
      attribute: [],
      game: "",
    };
  },
  created: function () {
    this.addPokemon();
  },

  methods: {
    addPokemon() {
      axios.get("/team").then((response) => {
        this.team = response.data;
        this.showPokemon();
        console.log("MEEP", this.team);
      });
    },
    showPokemon() {
      for (let i = 0; i < this.team.length; i++) {
        // console.log(i);
        // console.log(this.team[i]);
        axios.get("https://pokeapi.co/api/v2/pokemon/" + this.team[i].pokemon_id).then((response) => {
          this.poke = response.data;
          this.poke.team_id = this.team[i].id;
          console.log(this.poke);
          this.pokemon.push(this.poke);
        });
      }
      console.log("BEEP", this.pokemon);
    },
    destroyPokemon(pokemon_id) {
      axios.delete(`/team/${pokemon_id}`).then((response) => {
        console.log(response);
        let index = this.pokemon.indexOf(pokemon_id);
        this.pokemon.splice(index, 1);
      });
    },
  },
};
</script>

<style>
img {
  object-fit: cover;
  width: 100%;
  height: 250px;
}
.body {
  background-color: black;
}
.row {
  text-align: center;
  resize: horizontal;
  overflow: auto;
}

.column {
  margin: auto;
  width: 25%;
  padding: 5px 10px;
}
h5 {
  font-family: "Pokemon Solid";
}
.pulse {
}
</style>
