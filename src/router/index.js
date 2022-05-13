import { createRouter, createWebHistory } from "vue-router";
import PokemonIndex from "../views/PokemonIndex.vue";
import PokemonShow from "../views/PokemonShow.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import SignupView from "../views/SignupView.vue";
import PokedexView from "../views/PokedexView.vue";
import TeamView from "../views/TeamView.vue";

const routes = [
  {
    path: "/pokemon",
    name: "pokemon",
    component: PokemonIndex,
  },
  {
    path: "/pokemon/:id",
    name: "pokemon-show",
    component: PokemonShow,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/pokedex",
    name: "pokedex",
    component: PokedexView,
  },
  {
    path: "/team",
    name: "team",
    component: TeamView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
