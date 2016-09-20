<template>
  <section class="page-calendar">
    <calendar></calendar>
  </section>
</template>

<style scoped>

</style>

<script>
  module.exports = {
    components: {
      'calendar': require('./../components/calendar/calendar.vue')
    }
  }
</script>