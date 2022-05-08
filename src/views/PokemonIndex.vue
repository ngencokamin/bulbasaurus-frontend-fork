<template>
  <div class="row">
    <section class="page-section portfolio" id="portfolio">
      <div class="container">
        <div class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search by Pokemon"
            aria-label="Search by Pokemon"
            v-model="searchText"
          />
        </div>
        <!-- <div
          class="col"
          v-bind:class="{ selected: pokemon === currentPokemon }"
          v-for="pokemon in filterPokemon()"
          v-bind:key="pokemon.id"
          v-on:click="currentPokemon = pokemon"
        ></div> -->

        <!-- Portfolio Grid Items-->
        <div class="row justify-content-center">
          <!-- Portfolio Item 1-->
          <div class="col-md-6 col-lg-4 mb-5" v-for="p in pokemon" v-bind:key="p.id">
            <router-link :to="`/pokemon/` + p.id">
              <div class="portfolio-item mx-auto" :href="`/pokemon/` + p.id">
                <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div class="portfolio-item-caption-content text-center text-white">
                    <i class="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <img
                  v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`"
                  class="img-fluid"
                  v-bind:alt="pokemon.name"
                />
                <h1>{{ p.name }}</h1>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      pokemon: [],
      searchText: "",
      currentPokemon: {},
    };
  },
  created: function () {
    this.indexPokemons();
  },
  methods: {
    indexPokemons() {
      axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=152").then((response) => {
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
    filterPokemon() {
      return this.pokemon.filter((pokemon) => {
        var lowercaseTitle = pokemon.title.toLowerCase();
        var lowercaseSearchText = this.searchText.toLowerCase();
        return lowercaseTitle.includes(lowercaseSearchText);
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
</style>
