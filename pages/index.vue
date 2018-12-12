<template>
  <div>
    <header class="index-header">
      <section class="container">
        <div>
          <h1 class="title">
            ModernSamurai.io
          </h1>
          <h2 class="subtitle">
            My outstanding Nuxt.js project
          </h2>
          <div class="links">
            <!-- <a
              href="https://nuxtjs.org/"
              target="_blank"
              class="button--green">Documentation</a>
            <a
              href="https://github.com/nuxt/nuxt.js"
              target="_blank"
              class="button--grey">GitHub</a> -->
            <b-button
              to="/login"
              size="lg"
              class="index-header__button">Login</b-button>
            <b-button
              to="/signup"
              size="lg"
              class="index-header__button">Signup</b-button>
          </div>
        </div>
      </section>
    </header>
    <section>Section Here</section>
    <footer>Footer Here</footer>
    <div/>
</div></template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.index-header {
  background: grey url('~assets/img/zen_garden.jpg') no-repeat fixed;
  background-size: cover;
}

.index-header__button {
  background-color: transparent;
  border: 1px solid white;
  border-radius: 0;
}

.index-header__button:hover {
  /* background-color: rgba(255, 255, 255, 0.75); */
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: white;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
