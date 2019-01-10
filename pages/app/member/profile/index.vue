<template>
  <h1>Member Profile</h1>
</template>

<script>
export default {
  layout: 'authenticated',
  middleware: ['auth']
}
</script>

<style scoped>
</style>
