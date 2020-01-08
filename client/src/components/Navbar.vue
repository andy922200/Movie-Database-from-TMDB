// ./src/components/Navbar.vue
<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="mx-auto navbar-brand" to="/">The Movie Database</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse navbar-center">
      <div class="ml-auto d-flex align-items-center navbar-collapse-center">
        <router-link :to="{path:'/'}">
          <h5>Sign In</h5>
        </router-link>

        <a target="_blank" href="https://github.com/andy922200/Movie-Database-from-TMDB">
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
#navbarSupportedContent a {
  font-size: 30px;
  color: white;
  margin: 5px auto;
}
#navbarSupportedContent h5 {
  font-size: 20px;
  color: white;
  margin: 5px 10px;
}
</style>

