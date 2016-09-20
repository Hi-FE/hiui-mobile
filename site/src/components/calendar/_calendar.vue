<template>
  <section class="calendar"
           v-show="is_show" transition="calendar" transition-mode="out-in"
           @click.stop @touchstart.stop>

    <h2 v-if="is_single_month">
      <a @click.stop="preMonth" v-if="!is_disable_prev"><icon :name="'i-arrow-left'" :color="'#fff'"></icon></a>
      <div class="info">{{ year }} 年 {{ month+1 }} 月</div>
      <a @click.stop="nextMonth" v-if="!is_disable_next"><icon :name="'i-arrow-right'" :color="'#fff'"></icon></a>
    </h2>
    <!-- 星期头 -->
    <table class="day-title">
      <tbody>
        <tr>
          <td v-for="day in week_days">{{ day }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 月 -->
    <section class="month" v-for="item in total_days" track-by="$index">
      <h3 v-if="!is_single_month">{{ item.year }} 年 {{ item.month }} 月</h3>
      <table>
        <tbody>
          <tr v-for="(k1, day) in item.arr" track-by="$index">
            <td v-for="(k2, child) in day" track-by="$index">
              <div :class="{ 'selected': child.select,
                                            'weekend': child.weekend,
                                            'nodisplay': child.nodisplay,
                                            'disable': child.disable,
                                            'range-begin' : child.range_begin,
                                            'range-end' : child.range_end }"
                   @click="select(k1, k2, item.year, item.month, $event)">
                <em>{{ child.day }}</em>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

  </section>
</template>


<style scoped>
  .calendar { width : 100%; max-width : 350px; margin-left : auto; margin-right : auto; background : #222; padding : 0 1px; color : #fff; overflow : hidden; }
  .calendar h2 { padding-top: 10px; font-size: 16px; text-align: center; display: flex; }
  .calendar h2 .info { flex: 1; }
  .calendar h2 a { text-decoration: none; color: inherit; font-size: inherit; }
  .calendar table { width : 100%; text-align : center; }
  .calendar table td { height : 40px; font-weight : bold; border : 6px solid transparent; }
  .day-title { font-weight : bold; color : #ccc; }
  .month > h3 { font-size : 16px; line-height : 30px; padding : 10px 0 0 20px; }
  .month td div { position : relative; line-height : 34px; overflow : hidden; }
  .month td div.selected { background : #fff; color : #333; border-radius : 5px; box-shadow : 0 8px 15px -8px #000; }
  .month td div.weekend { color : #ff5a5f; }
  .month td div.nodisplay { visibility : hidden; color : #c0c0c0; pointer-events : none !important; cursor : default !important; }
  .month td div.disable { color : #666; pointer-events : none !important; cursor : default !important; }
  .month td div.range-begin::before { content : ""; display : block; position : absolute; top : 0; left : 0; bottom : 0; right : 12px; background : #ddd; }
  .month td div.range-end::before { content : ""; display : block; position : absolute; top : 0; left : 12px; bottom : 0; right : 0; background : #ddd; }
  .month td div.range-begin::after { content : ""; display : block; position : absolute; top : 0; bottom : 0; right : 2px; width : 0; height : 0; border-width : 17px 0 17px 10px; border-style : solid; border-color : transparent transparent transparent #ddd; }
  .month td div.range-end::after { content : ""; display : block; position : absolute; top : 0; bottom : 0; left : 2px; width : 0; height : 0; border-width : 17px 10px 17px 0; border-style : solid; border-color : transparent #ddd transparent transparent; }
  .month td div em { position : relative; z-index : 1; }
</style>

<script>
  module.exports = {
    props: {
      // 连续输出的月份数量,从本月之后算起(此参数受daterange参数影响,如daterange为true则n_months参数无效)
      n_months: {
        type: Number,
        default: 4
      },
      // 日历是否显示
      is_show: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      // 单选时绑定的值、多选是绑定的第一个值
      first_value: {
        type: String,
        twoWay: true,
        default: ""
      },
      // 多选时绑定的第二个值
      sec_value: {
        type: String,
        twoWay: true,
        default: ""
      },
      // 是否选择日期范围
      is_range: {
        type: Boolean,
        default: false
      },
      // 日历范围输出（如果此参数为true,则n_months参数无效）
      daterange: {
        type: Boolean,
        default: false
      },
      dateBegin: {
        type: Array,
        default: Array
      },
      dateEnd: {
        type: Array,
        default: Array
      },
      // 是否禁用今天之前的日期,默认禁用
      is_todayDisable: {
        type: Boolean,
        default: true
      },
      // 日期范围选择时共选择的天数
      select_sum: {
        type: Number,
        default: 0
      },

      // 一次输出一个月份,月份可前后切换
      cur_year: {
        twoWay: true,
        default: 0
      },
      cur_month: {
        twoWay: true,
        default: 0
      },
      is_single_month: {
        type: Boolean,
        default: false
      },
      json_data: {
        type: Object,
        default: Object
      }
    },
    data: function() {
      return {
        today: 0, // 今天时间
        year: 0, // 当前年份
        month: 0, // 当前月份
        day: 0, // 当前日期
        total_days: [], // 总天数
        select_day: [],// 选择天数(单选用)
        days: [], // 当前月份的天数
        rangeBegin: [], // 范围选择起始日期
        rangeEnd: [], // 范围选择结束日期
        formated_json_data: {},
        sep: '-',
        week_days: ['日', '一', '二', '三', '四', '五', '六']
      }
    },
    computed: {
      is_disable_prev: function() {
        var self = this
        if (self.daterange) {
          if (self.year === self.dateBegin[0] && self.month + 1 === self.dateBegin[1]) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
      is_disable_next: function() {
        var self = this
        if (self.daterange) {
          if (self.year === self.dateEnd[0] && self.month + 1 === self.dateEnd[1]) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
    },
    created: function() {
      var now = new Date()

      this.year = now.getFullYear() // 本年
      this.month = now.getMonth() // 本月
      this.day = now.getDate() // 本日
      if (this.range) {
        this.rangeBegin = Array
        this.rangeEnd = Array
      }
      this.today = Number(new Date(this.year, this.month, this.day))
      this.cur_year = this.year
      this.cur_month = this.month
      this.render()
    },
    events: {
      // 重新渲染,该事件触发在单月渲染模式下切换月份时
      're_render': function() {
        var self = this
        self.render()
      },
      // 复位
      'calendar_reset': function() {
        var self = this
        self.first_value = ''
        self.sec_value = ''
        self.rangeBegin = []
        self.rangeEnd = []
        self.select_day = []
        self.render()
      },
      // 复位起始日期选项
      'calendar_reset_first': function() {
        var self = this
        self.first_value = ''
        if (self.is_range) {
          self.rangeBegin = []
        }
        else {
          self.select_day = []
        }
        self.render()
      },
      // 复位结束日期选项
      'calendar_reset_sec': function() {
        var self = this
        self.sec_value = ''
        self.rangeEnd = []
        self.rangeEndTemp = 0
        self.render()
      }
    },
    methods: {
      zero: function(n) {
        return n < 10 ? '0' + n : n
      },
      // 渲染日期列表
      render: function() {
        var self = this
        self.total_days = []

        // 统一json_data的数据格式
        if (!!self.json_data) {
          var new_json_data = {}
          for (var time in self.json_data) {
            var temp_date = new Date(parseInt(time))
            var temp_year = temp_date.getFullYear()
            var temp_month = temp_date.getMonth()
            var temp_day = temp_date.getDate()
            new_json_data[Number(new Date(temp_year, temp_month, temp_day))] = true
          }
          self.formated_json_data = new_json_data
        }

        // 1.连续输出模式
        if (!self.is_single_month) {
          // 1.1不是日期范围输出,则输出连续n_months个月
          if (!self.daterange) {
            // kds变量为连续输出的月份数量
            var y = self.year
            var m = self.month
            self.select_sum = 0
            for (var kds = 0; kds < self.n_months; kds++, m++) {
              // 月份数到达13后的处理方式
              if (m === 12) {
                m = 0
                y = y + 1
              }
              var fin_temp = {}
              fin_temp.arr = self.renderMonth(y, m)
              fin_temp.year = y
              fin_temp.month = m + 1
              self.total_days.push(fin_temp)
            }
          } else { // 1.2范围内日期输出
            // 判断合法日期
            var b = Number(new Date(self.dateBegin[0], self.dateBegin[1], self.dateBegin[2]))
            var e = Number(new Date(self.dateEnd[0], self.dateEnd[1], self.dateEnd[2]))
            // 非法日期
            if (b > e) {
              throw '日期范围不合法!'
              return
            } else { // 合法时间
              var y = self.dateBegin[0]
              var m = self.dateBegin[1] - 1
              // 开始时间和结束时间都在一个月内
              if (self.dateBegin[0] === self.dateEnd[0] && self.dateBegin[1] === self.dateEnd[1]) {
                var step = 0
              } else if (self.dateBegin[0] === self.dateEnd[0] && self.dateBegin[1] < self.dateEnd[1]) {
                // 开始时间和结束时间都在同一年内
                var step = self.dateEnd[1] - self.dateBegin[1]
              } else if (self.dateBegin[0] < self.dateEnd[0]) {
                // 开始时间和结束时间不在一年内
                var step = (12 - self.dateBegin[1]) + 12 * (self.dateEnd[0] - self.dateBegin[0] - 1) +
                    self.dateEnd[1]
              }

              self.select_sum = 0
              for (var kds = 0; kds <= step; kds++, m++) {
                // 月份数到达13后的处理方式
                if (m === 12) {
                  m = 0
                  y = y + 1
                }
                var fin_temp = {}
                fin_temp.arr = self.renderMonth(y, m)
                fin_temp.year = y
                fin_temp.month = m + 1
                self.total_days.push(fin_temp)
              }
            }
          }
        } else { // 2.单月输出模式
          // 2.1非区间日期输出
          if (!self.daterange) {
            var y = self.year
            var m = self.month
            self.total_days = []
            self.select_sum = 0

            var fin_temp = {}
            fin_temp.arr = self.renderMonth(y, m)
            fin_temp.year = y
            fin_temp.month = m + 1
            self.total_days.push(fin_temp)
          } else { // 2.2区间输出
            // 判断合法日期
            var b = Number(new Date(self.dateBegin[0], self.dateBegin[1], self.dateBegin[2]))
            var e = Number(new Date(self.dateEnd[0], self.dateEnd[1], self.dateEnd[2]))
            // 非法日期
            if (b > e) {
              throw '日期范围不合法!'
              return
            } else { // 合法时间
              var y = self.year
              var m = self.month
              self.total_days = []
              self.select_sum = 0

              var fin_temp = {}
              fin_temp.arr = self.renderMonth(y, m)
              fin_temp.year = y
              fin_temp.month = m + 1
              self.total_days.push(fin_temp)
            }
          }
          // 区间输出end
        }
        // 单月输出end
      },
      // 日期选中
      select: function(k1, k2, year, mon, e) {
        if (e !== undefined) e.stopPropagation()
        var self = this

        // 日期范围选择
        if (self.is_range) {
          var select_days = []
          // 寻找本月日期数组
          for (var i = 0; i < self.total_days.length; i++) {
            if (self.total_days[i].year === year && self.total_days[i].month === mon) {
              select_days = self.total_days[i].arr
              break
            }
          }
          if (self.rangeBegin.length === 0 || self.rangeEndTemp !== 0) {
            self.rangeBegin = [year, mon - 1, select_days[k1][k2].day]
            self.rangeBeginTemp = self.rangeBegin
            self.rangeEnd = [year, mon - 1, select_days[k1][k2].day]
            self.rangeEndTemp = 0
            // 输出
            self.first_value = self.output(self.rangeBegin)
            self.sec_value = ''
          } else { // 选择结束时间
            // 判断结束日期小于开始日期则重置始发日期
            self.rangeEnd = [year, mon - 1, select_days[k1][k2].day]
            if (+new Date(self.rangeEnd[0], self.rangeEnd[1], self.rangeEnd[2]) < +new Date(self.rangeBegin[0], self.rangeBegin[1], self.rangeBegin[2])) {
              self.rangeBegin = self.rangeEnd
              self.first_value = self.output(self.rangeBegin)
              // self.rangeEnd = self.rangeBeginTemp
              // alert('结束时间不能在起始时间之前!')
              // return
            } else {
              self.rangeEndTemp = 1
              // 输出
              self.sec_value = self.output(self.rangeEnd)
              // console.log(self.select_sum)
            }
          }

          // 数据初始化
          self.total_days = []
          self.render()
        } else { // 单选
          var select_days = []
          // 寻找本月日期数组
          for (var i = 0; i < self.total_days.length; i++) {
            if (self.total_days[i].year === year && self.total_days[i].month === mon) {
              select_days = self.total_days[i].arr
              break
            }
          }
          var i = select_days[k1][k2].day
          self.select_day[0] = year
          self.select_day[1] = mon - 1
          self.select_day[2] = i
          self.first_value = self.output(self.select_day)
          self.render()
        }
      },
      // 格式化输出
      output: function(args) {
        var self = this
        return args[0] + self.sep + self.zero(args[1] + 1) + self.sep + self.zero(args[2])
      },
      // 上一个月
      preMonth: function() {
        var self = this
        if (self.month === 0) {
          self.month = 11
          self.year = self.year - 1
        } else {
          self.month = self.month - 1
        }
        self.cur_year = self.year
        self.cur_month = self.month
        self.render()
        self.$dispatch('change')
      },
      // 下一月
      nextMonth: function() {
        var self = this
        if (self.month === 11) {
          self.month = 0
          self.year = self.year + 1
        } else {
          self.month = self.month + 1
        }
        self.cur_year = self.year
        self.cur_month = self.month
        self.render()
        self.$dispatch('change')
      },
      renderMonth: function(y, m) {
        var self = this
        var firstDayOfMonth = new Date(y, m, 1).getDay() // 当月第一天
        var lastDateOfMonth = new Date(y, m + 1, 0).getDate() // 当月最后一天
        var lastDayOfLastMonth = new Date(y, m, 0).getDate() // 最后一月的最后一天

        var seletSplit = self.first_value.split(' ')[0].split(self.sep)

        var i, line = 0, temp = []
        for (i = 1; i <= lastDateOfMonth; i++) {
          var dow = new Date(y, m, i).getDay()
          // 第一行
          if (dow === 0) {
            temp[line] = []
          } else if (i === 1) {
            temp[line] = []
            var k_first = lastDayOfLastMonth - firstDayOfMonth + 1
            for (var j = 0; j < firstDayOfMonth; j++) {
              // 非本月日期不显示
              temp[line].push({ day: k_first, nodisplay: true })
              k_first++
            }
          }

          var nowTime = Number(new Date(self.year, self.month, self.day))
          // 获得星期数
          var thisDay = new Date(y, m, i).getDay()
          // 当天时间
          var thisTime = Number(new Date(y, m, i))
          // 日期多选
          if (self.is_range) {
            var options = { day: i }
            if (self.rangeBegin.length > 0) {
              var beginTime = Number(new Date(self.rangeBegin[0], self.rangeBegin[1], self.rangeBegin[2]))
              var endTime = Number(new Date(self.rangeEnd[0], self.rangeEnd[1], self.rangeEnd[2]))
              if (beginTime <= thisTime && endTime >= thisTime && !self.json_data[thisTime]) {
                options.select = true
                self.select_sum++
              }
              if (beginTime === thisTime) {
                options.range_begin = true
              } else if (endTime === thisTime) {
                options.range_end = true
              }
            }
            if (self.daterange) {
              // 日期范围输出的情况下禁用边界外的日期
              var r_b_m = Number(new Date(self.dateBegin[0], self.dateBegin[1] -
                  1, self.dateBegin[2]))
              var r_e_m = Number(new Date(self.dateEnd[0], self.dateEnd[1] - 1, self.dateEnd[2]))
              if (thisTime < r_b_m || thisTime > r_e_m) {
                options.disable = true
              }
            }
            // 今天之前的日期禁用
            if (self.is_todayDisable) {
              if (thisTime < self.today) {
                options.disable = true
              }
            }
            // 周末时间
            if (thisDay === 0 || thisDay === 6) {
              options.weekend = true
            }
            // 结合json数据
            if (!!self.formated_json_data) {
              if (self.formated_json_data[thisTime]) {
                options.disable = true
              }
            }
            temp[line].push(options)
          } else { // 日期单选
            var options = { day: i }
            var thisTime = Number(new Date(y, m, i))
            var selectTime = Number(new Date(self.select_day[0], self.select_day[1], self.select_day[2]))
            if (self.daterange) {
              // 日期范围输出的情况下禁用边界外的日期
              var r_b_s = Number(new Date(self.dateBegin[0], self.dateBegin[1] -
                  1, self.dateBegin[2]))
              var r_e_s = Number(new Date(self.dateEnd[0], self.dateEnd[1] - 1, self.dateEnd[2]))
              if (thisTime < r_b_s || thisTime > r_e_s) {
                options.disable = true
              }
            }
            // 今天之前的日期禁用
            if (thisTime < self.today) {
              options.disable = true
            }
            if (thisDay === 0 || thisDay === 6) {
              options.weekend = true
            }
            if (thisTime === selectTime) {
              options.select = true
            }
            // 结合json数据
            var json = !!self.formated_json_data
            if (json) {
              if (self.formated_json_data[thisTime]) {
                options.disable = true
              }
            }
            temp[line].push(options)
          }

          // 最后一行
          if (dow === 6) {
            line++
          } else if (i === lastDateOfMonth) {
            var k_last = 1
            for (dow; dow < 6; dow++) {
              temp[line].push({ day: k_last, nodisplay: true })
              k_last++
            }
          }
        }
        return temp
      }
    }
  }
</script>