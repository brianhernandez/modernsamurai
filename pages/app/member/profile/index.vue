<template>
  <main class="profile">
    <h1 class="profile__heading">Your Member Profile</h1>
    <div class="profile__avatar"/>
    <transition
      name="el-fade"
      mode="out-in">
      <div
        v-if="!editMode"
        key="profileDisplay"
        class="profile__content">
        <p>{{ userFirstName }} {{ userLasName }}</p>
        <p>{{ userDOB }}</p>
        <p>{{ userEmail }}</p>
        <p class="profile__quote">{{ userProfileQuote }}</p>
      </div>
      <div
        v-else
        key="profileEdit"
        class="">
        <!-- <AppControlInput>First Name</AppControlInput> -->
        <div>
          <AppControlInput
            key="firstName"
            v-model="firstName"
            :placeholder="userFirstName"
            :value="userFirstName"
            control-type="input"
            name="firstName"
            class="profile__input">First Name</AppControlInput>
          <AppControlInput
            key="lastName"
            v-model="lastName"
            :placeholder="userLasName"
            :value="userLasName"
            control-type="input"
            name="lastName"
            class="profile__input">Last Name</AppControlInput>
        </div>
        <div>
          <AppControlInput
            key="dob"
            v-model="dob"
            control-type="date"
            name="dob"
            class="profile__input">Date of Birth</AppControlInput>
        </div>
        <div>
          <AppControlInput
            key="profileQuote"
            v-model="profileQuote"
            :placeholder="userProfileQuote"
            :value="userProfileQuote"
            control-type="textarea"
            name="profileQuote"
            class="profile__input">Profile Quote</AppControlInput>
        </div>
      </div>
    </transition>
    <AppButton
      :class="['profile__editSaveButton', {'bg-success': editMode}]"
      type="{submit: editMode}"
      @click="sendUserData(); editMode=!editMode">{{ toggleButtonText }} Profile</AppButton>
  </main>
</template>

<script>
import AppButton from '~/components/UI/AppButton'
import AppControlInput from '~/components/UI/AppControlInput'

export default {
  layout: 'authenticated',
  middleware: ['auth'],
  components: {
    AppButton,
    AppControlInput
  },
  data() {
    return {
      editMode: false,
      firstName: null,
      lastName: null,
      dob: null,
      profileQuote: null
    }
  },
  computed: {
    toggleButtonText() {
      return this.editMode ? 'Save' : 'Edit'
    },
    userFirstName() {
      return this.$store.getters.user.firstName || 'No First Name'
    },
    userLasName() {
      return this.$store.getters.user.lastName || 'No Last Name'
    },
    userDOB() {
      return this.$store.getters.user.dob || 'No Age'
    },
    userEmail() {
      return this.$store.getters.user.email || 'No Email'
    },
    userProfileQuote() {
      return (
        this.$store.state.user.profileQuote ||
        'No Profile Quote Has Been Given For This Account'
      )
    }
  },
  methods: {
    sendUserData() {
      if (this.editMode === true) {
        this.$store
          .dispatch('updateUserData', {
            ...this.$store.getters.user,
            firstName: this.firstName,
            lastName: this.lastName,
            dob: this.dob,
            profileQuote: this.profileQuote
          })
          .then(() => {
            this.editMode = false
          })
          .catch(e => console.log(e))
      }
    }
  }
}
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding-top: 140px;
  padding-bottom: 120px;
  text-align: center;

  .profile__avatar {
    width: 150px;
    height: 150px;
    margin: 30px 0;
    border-radius: 50%;
    background-image: url('~assets/img/blank_avatar.png');
    background-size: cover;
  }

  .profile__quote {
    max-width: 300px;
    text-align: justify;

    @media screen and (min-width: $md) {
      .profile__quote {
        max-width: 500px;
      }
    }
  }

  .profile__input {
    display: inline-block;
    text-align: left;
    margin-bottom: 30px;
  }

  .profile__editSaveButton {
    margin-top: 40px;
  }

  .profile__content {
    font-size: 18px;
  }

  .el-fade-enter-active,
  .el-fade-leave-active {
    transition: opacity 0.3s;
  }

  .el-fade-enter,
  .el-fade-leave-to {
    opacity: 0;
  }
}
</style>
