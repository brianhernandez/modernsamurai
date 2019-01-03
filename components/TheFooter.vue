<template>
  <footer class="footer">
    <b-container>
      <b-row>
        <b-col>
          <p>Copyright &copy; {{ returnCurrentDate() | filterYear }} Modern Samurai</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <a
            href="https://brianhernandez.net"
            class="footer__by-line">Designed &amp; Developmend by Brian Hernandez</a>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    returnCurrentDate() {
      return new Date()
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  background-color: $footer-bg-color;
  padding: 50px 0 calc(50px - 14px);
  color: $header-tx-color;
  text-align: center;

  .footer__by-line {
    color: $footer-tx-color;
    font-size: 10px;
    border-bottom: 1px solid transparent;
    transition: border 0.15s, color 0.15s;

    &:hover,
    &:focus {
      text-decoration: none;
      color: $link-hover-color;
      border-bottom: 1px solid $link-hover-color;
    }
  }
}
</style>
