<template>
  <main class="profile">
    <h1 class="profile__heading">Your Member Profile</h1>
    <div class="profile__avatar"/>
    <p>First Lastname</p>
    <p>35 Years Old</p>
    <p>email@mail.com</p>
    <p class="profile__quote">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis necessitatibus recusandae vitae alias.</p>
    <AppButton
      :class="['profile__editButton', {'bg-success': editMode}]"
      btn-size="sm"
      @click="editMode=!editMode">{{ toggleButtonText }} Profile</AppButton>
  </main>
</template>

<script>
import AppButton from '~/components/UI/AppButton'

export default {
  layout: 'authenticated',
  middleware: ['auth'],
  components: {
    AppButton
  },
  data() {
    return {
      editMode: false
    }
  },
  computed: {
    toggleButtonText() {
      return this.editMode ? 'Save' : 'Edit'
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
    margin: 15px 0;
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
}
</style>
