<template>
  <div class="auth">
    <form
      class="auth__form-container"
      @submit.prevent="onSubmit">
      <AppControlInput
        v-model="email"
        type="email"
        class="auth__input">E-Mail Address</AppControlInput>
      <AppControlInput
        v-model="password"
        type="password"
        class="auth__input">Password</AppControlInput>
      <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
      <AppButton
        type="button"
        btn-style="inverted"
        style="margin-left: 10px"
        @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>
    </form>
  </div>
</template>

<script>
import AppButton from '~/components/UI/AppButton'
import AppControlInput from '~/components/UI/AppControlInput'

export default {
  components: {
    AppButton,
    AppControlInput
  },
  data() {
    return {
      isLogin: true,
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('authenticateUser', {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/admin')
        })
    }
  }
}
</script>

<style scoped lang="scss">
.auth {
  background: grey url('~assets/img/torii_gate.jpg') no-repeat fixed center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .auth__form-container {
    background-color: $form-bg-color;
    padding: 20px;
  }
}
</style>
