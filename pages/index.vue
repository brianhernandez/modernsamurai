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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae dolorem unde harum enim at, iusto, exercitationem nihil debitis vel laudantium facilis aperiam voluptatibus atque quis delectus repellat. Illo, nulla perferendis?</p>
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

<style scoped lang="scss">
// @import '~assets/styles/typography.scss';

.index-header {
  background: grey url('~assets/img/zen_garden.jpg') no-repeat fixed;
  background-size: cover;
}

.index-header__button {
  background-color: transparent;
  border: 1px solid white;
  border-radius: 0;

  &:hover {
    // background-color: rgb(221, 63, 63);
    background-color: white;
    color: grey;
  }
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  color: white;
}
</style>
