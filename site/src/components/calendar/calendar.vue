<template>
  <div class="calendar">
    <!-- demo1 -->
    <div class="demo">
      <h3>demo1:连续输出模式</h3>
      <p class="item"><input type="text" v-model="first_value_demo1"><a class="button" @click="is_show_demo1=true">呼出日历</a></p>
      <p class="item" v-if="is_range_demo1"><input type="text" v-model="sec_value_demo1"></p>
      <p class="item">
        当前日历模式: {{ is_range_demo1 ? '多选' : '单选' }}
        <a class="button" @click="is_range_demo1 = !is_range_demo1">点击切换为{{ is_range_demo1 ? '单选' : '多选' }}</a>
      </p>

      <div class="box" v-if="is_show_demo1">
        <calendar    :is_show.sync="is_show_demo1"
                     :first_value.sync="first_value_demo1"
                     :sec_value.sync="sec_value_demo1"
                     :is_range="is_range_demo1"></calendar>
        <div class="bottom-btn" @click="is_show_demo1 = false">close</div>
      </div>
    </div>

    <!-- demo2 -->
    <div class="demo">
      <h3>demo2:单月输出模式</h3>
      <p class="item"><input type="text" v-model="first_value_demo2">
      <p class="item" v-if="is_range_demo2"><input type="text" v-model="sec_value_demo2"></p>
      <p class="item">
        当前日历模式: {{ is_range_demo2 ? '多选' : '单选' }}
        <a class="button" @click="is_range_demo2 = !is_range_demo2">点击切换为{{ is_range_demo2 ? '单选' : '多选' }}</a>
      </p>

      <calendar    :is_show.sync="true"
                   :first_value.sync="first_value_demo2"
                   :sec_value.sync="sec_value_demo2"
                   :is_range="is_range_demo2"
                   :is_single_month="true"></calendar>
    </div>

    <!-- demo3 -->
    <div class="demo">
      <h3>demo3:限制日期输出模式</h3>
      <p class="item"><input type="text" v-model="first_value_demo3">
      <p class="item" v-if="is_range_demo3"><input type="text" v-model="sec_value_demo3"></p>
      <p class="item">
        当前日历模式: {{ is_range_demo3 ? '多选' : '单选' }}
        <a class="button" @click="is_range_demo3 = !is_range_demo2">点击切换为{{ is_range_demo3 ? '单选' : '多选' }}</a>
      </p>

      <calendar    :is_show.sync="true"
                   :daterange="true"
                   :date-begin="[2016, 8, 10]"
                   :date-end="[2017, 1, 11]"
                   :first_value.sync="first_value_demo3"
                   :sec_value.sync="sec_value_demo3"
                   :is_range="is_range_demo3"
                   :is_single_month="true"></calendar>
    </div>
  </div>
</template>

<style scoped>
  .demo { margin: 10px; padding: 10px; border: 1px solid #eee; }
  .button { display: inline-block; font-size: 12px; background-color: #f77; color: #fff; }
  .item { margin-bottom: 5px; font-size: 14px; }
  .box { padding-bottom: 40px; position: absolute; top: 0; left: 0; width: 100%; z-index: 999; }
  .box .bottom-btn { position: fixed; bottom: 0; left: 0; width: 100%; height: 40px; line-height: 40px; text-align: center; background-color: #f77; color: #fff; z-index: 99; }
</style>

<script>
  module.exports = {
    data: function() {
      return {
        // demo1
        first_value_demo1: '',
        sec_value_demo1: '',
        is_range_demo1: true,
        is_show_demo1: false,

        // demo2
        first_value_demo2: '',
        sec_value_demo2: '',
        is_range_demo2: true,

        // demo3
        first_value_demo3: '',
        sec_value_demo3: '',
        is_range_demo3: true
      }
    },
    components: {
      'calendar': require('./_calendar.vue')
    }
  }
</script>