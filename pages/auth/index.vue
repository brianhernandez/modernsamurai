<template>
  <div class="auth">
    <form
      class="auth__form-container"
      @submit.prevent="onSubmit">
      <transition-group
        name="el-fade"
        mode="out-in">
        <AppControlInput
          key="email"
          v-model="email"
          type="email"
          class="auth__input animated">E-Mail Address</AppControlInput>
        <AppControlInput
          key="password"
          v-model="password"
          type="password"
          autocapitalize="off"
          class="auth__input animated">Password</AppControlInput>
        <AppControlInput
          v-show="!isLogin"
          key="confirmPassword"
          v-model="confirmPassword"
          type="password"
          autocapitalize="off"
          class="auth__input">Confirm Password</AppControlInput>
        <AppButton
          key="submitButton"
          class="animated"
          type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton
          key="toggleButton"
          type="button"
          btn-style="inverted"
          class="animated"
          style="margin-left: 10px"
          @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>
      </transition-group>
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
      password: '',
      confirmPassword: ''
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
          this.$router.push('/app')
        })
        .catch(e => {
          console.log(e)
          if (e.message === 'EMAIL_EXISTS') {
            console.log('Email Already exists: ', e.message)
          }
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

  .el-fade-enter-active,
  .el-fade-leave-active {
    transition: opacity 0.3s;
  }

  .el-fade-leave-active {
    position: absolute;
  }

  .el-fade-enter,
  .el-fade-leave-to {
    opacity: 0;
  }

  .animated {
    transition: all 0.3s;
  }
}
</style>
