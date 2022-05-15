<!-- <template>
  <div class="team">
    <div class="poke-name" style="text-align: center">
      <img
        v-bind:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png`"
        class="center"
        v-bind:alt="currentPokemon.name"
        style="max-width: 250px"
      />
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
      pokemon: [],
      currentPokemon: [],
    };
  },
  created: function () {
    this.myTeam();
  },
  methods: {
    myTeam() {
      axios.get("/team").then((response) => {
        this.currentPokemon = response.data;
        console.log(this.currentPokemon);
      });
    },
    pokemonTeam() {
      axios.post("/poketeam").then((response) => {});
    },
  },
};
</script> -->
