<template>
  <div class="team">
    <div class="chain-row" style="text-align: center">
      <div class="col" style="width: 18rem" v-for="p in pokemon" v-bind:key="p.id">
        <img
          v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`"
          class="card-img-top"
          v-bind:alt="p.name"
        />
        <div class="col">
          <p class="col">
            {{ p.name }}
            <br />
            National № :{{ p.id }}
          </p>
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
          this.pokemon.push(this.poke);
          // let attribute = response.data.types;
          // attribute.forEach((type) => {
          //   this.attribute.push(type.type.name);
          // });
          // console.log("ABILITY", this.attribute);
          // console.log(this.poke);
        });
      }
      console.log("BEEP", this.pokemon);
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
</style>
