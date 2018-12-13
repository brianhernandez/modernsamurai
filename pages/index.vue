<template>
  <div>
    <header class="index-header">
      <!-- <section class="container"> -->
      <div>
        <h1 class="title index-header__title">
          Modern Samurai
        </h1>
        <h2 class="subtitle index-header__subtitle">
          Life Optimization, Simplified
        </h2>
        <div class="links index-header__links">
          <b-button
            to="/login"
            size="lg"
            class="index-header__button">Login</b-button>
          <b-button
            to="/signup"
            size="lg"
            class="index-header__button">Signup</b-button>
        </div>
        <p class="lead index-header__lead">A simple web app for tracking self-improvement strategies.</p>
      </div>
      <!-- </section> -->
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
.index-header {
  background: grey url('~assets/img/zen_garden.jpg') no-repeat fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;

  .index-header__subtitle {
    font-style: italic;
  }

  .index-header__title {
    margin-top: 70px;
  }

  .index-header__links {
    margin-top: 20px;
    margin-bottom: 20px;

    .index-header__button {
      background-color: transparent;
      border: 1px solid white;
      border-radius: 0;

      &:hover {
        // background-color: rgb(221, 63, 63);
        background-color: white;
        color: darken(grey, 30%);
      }
    }
  }
}
</style>
