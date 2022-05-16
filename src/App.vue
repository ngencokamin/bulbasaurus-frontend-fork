<template>
  <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand" href="#page-top">Bulbasaurus</a>
      <button
        class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-0 mx-lg-1">
            <a class="nav-link py-3 px-0 px-lg-3 rounded" href="/pokemon">Pokemon</a>
          </li>
          <li class="nav-item mx-0 mx-lg-1">
            <a class="nav-link py-3 px-0 px-lg-3 rounded" href="/team">My Team</a>
          </li>

          <li class="nav-item mx-0 mx-lg-1">
            <a class="nav-link py-3 px-0 px-lg-3 rounded" href="/extra">Extra</a>
          </li>
          <li v-if="!isLoggedIn" key="" class="nav-item mx-0 mx-lg-1">
            <a class="nav-link py-3 px-0 px-lg-3 rounded" href="/signup">Signup</a>
          </li>
          <li v-if="!isLoggedIn" class="nav-item mx-0 mx-lg-1">
            <a class="nav-link py-3 px-0 px-lg-3 rounded" href="/login">Login</a>
          </li>
          <li v-if="isLoggedIn" class="nav-item mx-0 mx-lg-1">
            <a class="nav-link py-3 px-0 px-lg-3 rounded" href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <header class="masthead bg-primary text-white text-center"></header>
  <router-view />
  <!-- <footer class="footer text-center"> -->
  <!-- <div class="container">
      <div class="row"> -->
  <!-- Footer Location-->
  <!-- <div class="col-lg-4 mb-5 mb-lg-0">
          <h4 class="text-uppercase mb-4">Location</h4>
          <p class="lead mb-0">
            2215 John Daniel Drive
            <br />
            Clark, MO 65243
          </p>
        </div> -->

  <!-- Footer About Text-->
  <!-- <div class="col-lg-4">
          <h4 class="text-uppercase mb-4">About Freelancer</h4>
          <p class="lead mb-0">
            Freelance is a free to use, MIT licensed Bootstrap theme created by
            <a href="http://startbootstrap.com">Start Bootstrap</a>
            .
          </p>
        </div>
      </div>
    </div> -->
  <!-- </footer> -->
</template>

<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>

<style>
#app {
  padding: 0;
  margin: 0;
}
body {
  background: url("https://i.pinimg.com/originals/ea/f5/e3/eaf5e3a15e19ffb8459ad1a2b8e471a2.jpg") no-repeat center
    center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-weight: bolder;
  font-family: "PT Serif", serif;
}
.masthead {
  background: url("https://res.cloudinary.com/dt6bbng8y/image/upload/v1652587826/cute_ubsbkx.jpg");
  background-size: cover;
}
</style>
