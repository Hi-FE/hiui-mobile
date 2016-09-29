<template>
  <section class="page-calendar">
    <calendar :codes="codes"></calendar>
  </section>
</template>

<style scoped>

</style>

<script>
  module.exports = {
    data: function() {
      return {
        codes: {
          code1:
          '<calendar   :is_show.sync="is_show_demo1" \n' +
          '            :first_value.sync="first_value_demo1"\n' +
          '            :sec_value.sync="sec_value_demo1"\n' +
          '            :is_range="is_range_demo1"></calendar>',
          code2:
          '<calendar   :is_show.sync="is_show_demo2" \n' +
          '            :first_value.sync="first_value_demo2"\n' +
          '            :sec_value.sync="sec_value_demo2"\n' +
          '            :is_range="is_range_demo2"\n' +
          '            :is_single_month="true"></calendar>',
          code3:
          '<calendar    :is_show.sync="true"\n' +
          '             :daterange="true"\n' +
          '             :date-begin="[2016, 7, 7]"\n' +
          '             :date-end="[2016, 11, 11]"\n' +
          '             :first_value.sync="first_value_demo3"\n' +
          '             :sec_value.sync="sec_value_demo3"\n' +
          '             :is_range="is_range_demo3"\n' +
          '             :is_single_month="true"\n' +
          '             :is_today_disable="false"></calendar>',
          code4:
          '<calendar    :is_show.sync="true"\n' +
          '             :first_value.sync="first_value_demo4"\n' +
          '             :sec_value.sync="sec_value_demo4"\n' +
          '             :is_range="is_range_demo4"\n' +
          '             :is_single_month="true"\n' +
          '             :json_data="\'{ 1475164800000: true, 1476057600000: true, 1476489600000: true }\'"\n' +
          '             :is_today_disable="false"></calendar>'
        }
      }
    },
    components: {
      'calendar': require('./../components/calendar/calendar.vue')
    }
  }
</script>