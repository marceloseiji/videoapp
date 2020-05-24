<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container">
          <router-link class="navbar-brand" to="home">Navbar</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <router-link class="nav-link" to="home">
                  Home
                  <span class="sr-only">(current)</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="gallery">Video Gallery</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../src/assets/css/style.css";
</style>

<script>
  export default {
    name: "app",
    components: {}
  };
</script>
