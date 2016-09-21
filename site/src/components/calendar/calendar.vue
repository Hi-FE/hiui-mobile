<template>
  <div class="calendar">
    <input type="text" v-model="first_value">
    <input type="text" v-model="sec_value">
    <calendar    :daterange="true"
                 :date-begin="[2016, 8, 15]"
                 :date-end="[2017, 1, 11]"
                 :first_value.sync="first_value"
                 :sec_value.sync="sec_value"
                 :is_show.sync="true"
                 :is_single_month="is_single_month"
                 :is_range="true"
                 :json_data="json_data"
                 :cur_year.sync="cur_year"
                 :cur_month.sync="cur_month"></calendar>
  </div>
</template>

<stype scoped>

</stype>

<script>
  module.exports = {
    data: function() {
      return {
        first_value: '',
        sec_value: '',

        is_single_month: false, // 是否为单日期输出,默认为true
        dateBegin: [],
        dateEnd: [],
        n_months: 3, // 连续输出模式下输出月份的个数
        cur_year: 0, // 单月份输出模式下日历的当前年份、连续输出模式下日历的第一个年份
        cur_month: 0, // 单月份输出模式下日历的当前月份、连续输出模式下日历的第一个月份
        json_data: {}// 需要自定义禁用日期的object
      }
    },
    components: {
      'calendar': require('./_calendar.vue')
    }
  }
</script>