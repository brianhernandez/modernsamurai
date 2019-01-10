<template>
  <div class="auth">
    <form
      :class="['auth__form-container', {shake: loginError}]"
      @submit.prevent="onSubmit"
      @input="resetError">
      <transition-group
        name="el-fade"
        mode="out-in">
        <AppControlInput
          key="email"
          v-model="email"
          control-type="email"
          name="email"
          class="auth__input animated">E-Mail Address</AppControlInput>
        <AppControlInput
          key="password"
          v-model="password"
          control-type="password"
          name="password"
          autocapitalize="off"
          class="auth__input animated">Password</AppControlInput>
        <AppControlInput
          v-show="!isLogin"
          key="confirmPassword"
          v-model="confirmPassword"
          control-type="confirmPassword"
          name="confirmPassword"
          autocapitalize="off"
          class="auth__input">Confirm Password</AppControlInput>
        <AppButton
          key="submitButton"
          :disabled="formIsInvalid"
          class="auth__button animated"
          type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton
          key="toggleButton"
          type="button"
          btn-style="inverted"
          class="auth__button animated"
          style="margin-left: 10px"
          @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>
        <div
          v-if="loginError"
          key="errorMessage"
          class="animated error-message"><span>{{ errorMessage }}</span></div>
      </transition-group>
    </form>
  </div>
</template>

<script>
import AppButton from '~/components/UI/AppButton'
import AppControlInput from '~/components/UI/AppControlInput'

export default {
  middleware: ['push-to-app'],
  components: {
    AppButton,
    AppControlInput
  },
  data() {
    return {
      isLogin: true,
      email: '',
      password: '',
      confirmPassword: '',
      loginError: false,
      errorMessage: ''
    }
  },
  computed: {
    formIsInvalid() {
      return Object.keys(this.fields).some(key => this.fields[key].invalid)
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
          this.loginError = true
          if (e.message === 'EMAIL_EXISTS') {
            this.errorMessage = 'That email already exists'
          } else if (e.message === 'INVALID_LOGIN') {
            this.errorMessage = 'Invalid login'
          } else {
            this.errorMessage = e.message
          }
        })
    },
    resetError() {
      this.loginError = false
      this.errorMessage = ''
    }
  }
}
</script>

<style lang="scss">
.auth {
  background: grey url('~assets/img/torii_gate.jpg') no-repeat fixed center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .auth__input:not(:first-of-type) {
    margin-top: 20px;
  }

  .auth__form-container {
    background-color: darken($form-bg-color, 30%);
    padding: 20px;
  }

  .auth__button {
    margin-top: 20px;
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

  .error-message {
    color: $white;
    margin-top: 20px;
  }

  .animated {
    transition: all 0.3s;
  }
}

.shake {
  animation-name: shake !important;
  animation-duration: 1s;
  background-color: rgba(182, 0, 0, 0.5) !important;
}

@keyframes shake {
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-5px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(5px, 0, 0);
  }
}
</style>
