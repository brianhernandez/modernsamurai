<template>
  <h1>App Entrance</h1>
</template>

<script>
export default {
  layout: 'authenticated',
  middleware: ['auth']
}
</script>

<style scoped>
</style>
