<template>
  <b-navbar
    toggleable="md"
    type="dark"
    class="b-navbar">
    <b-navbar-brand
      class="b-navbar__brand"
      to="/">
      <img
        src="~/assets/img/logo_text_white.png"
        alt="Modern Samurai Logo">
    </b-navbar-brand>
    <b-navbar-toggle
      target="nav_collapse"
      class="ml-auto border-0 b-navbar__toggle"/>
    <b-collapse
      id="nav_collapse"
      is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav
        class="ml-auto text-center">
        <b-nav-item
          v-if="!authenticated"
          to="/auth">Login/Signup
        </b-nav-item>
        <b-nav-item-dropdown
          v-if="authenticated"
          :text="user"
          right>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated
    },
    user() {
      return 'Brian'
      // return this.$store.getters.user
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped lang="scss">
.b-navbar {
  position: absolute;
  width: 100%;
  background-color: $header-bg-color;
  // background-color: rgb(65, 65, 65);
  z-index: 100;
}

.b-navbar__brand {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.b-navbar__toggle:focus {
  outline-color: $white;
}
</style>
