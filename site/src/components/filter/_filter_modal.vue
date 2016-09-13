<template>
  <div class="window-filter" id="window-filter">
    <div class="filter-header">
      筛选
      <div class="i-cancel-wrap" @click="closeWindow()">
        <img class="i-cancel" :src="images.close"
             style="position:relative;top:50%;transform:translateY(-50%);width: 25px;height:auto;">
      </div>
    </div>
    <!-- 左侧tab -->
    <div class="filter-category" id="filter-category" :class="{ 'filter-category-fixed' : filter_category_style }">
      <div class="category-item"
           :class="{ 'category-active' : select_tab == $index }"
           @click="select_tab = $index"
           v-for="tab in filter_data">
        <p class="filter-item-title">{{ tab.tab_name }}</p>
        <p class="filter-item-content">{{ select_text(tab) }}</p>
      </div>
    </div>

    <!-- 右侧主内容 -->
    <div class="filter-content">
      <div class="filter-container-wrap">
        <div class="filter-container" id="card-move">
          <div v-show="select_tab == $index"
               v-for="item in filter_data">
            <!-- 一级菜单 -->
            <div class="filter-sort"
                 v-for="con in item.content">
              <div class="card-filter-item"
                   :class="{ 'card-item-active' : con.select, 'allselect': is_all_select($parent.$index, $index, con.child) }"
                   @click="select($parent.$index, $index, con, item.is_multiple_choice, con.child)">
                <icon :name="'i-check-o'"
                      :color="iconselect($parent.$index, $index, con, con.child)"
                      v-if="!(con.child && !item.is_multiple_choice)"
                      @click.stop="checkSelect($parent.$index, $index, con, item.is_multiple_choice, con.child)"></icon>
                {{ con.content_name }}
              </div>

              <!-- 二级菜单 -->
              <div v-if="con.child.length > 0">
                <div v-show="con.toggle">
                  <div class="filter-sort"
                       v-for="child in con.child">
                    <div class="card-filter-item"
                         :class="{ 'card-item-active' : child.select }"
                         @click="secSelect($parent.$parent.$index, $parent.$index, child, item.is_multiple_choice)"
                         style="margin-left: 40px;">
                      <icon :name="'i-check-o'" :color="child.select ? '#f77' : '#ccc'"></icon>
                      {{ child.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-query-wrap">
      <div class="btn-query" @click.stop="doQuery()">查询</div>
    </div>
  </div>
</template>

<style scoped>
  .window-filter { position: fixed; top: 0; left: 0; bottom: 0; right: 0; z-index: 10000; background-color: #fff; overflow: auto; padding-bottom: 60px; }
  .window-filter .filter-header { position: fixed; left: 0; right: 0; background-color: #fff; font-size: 16px; z-index: 103; color: #333; text-align: center; height: 41px; line-height: 40px; border-bottom: 1px solid #eaeaea; }
  .window-filter .i-cancel-wrap { position: absolute; height: 40px; width: 40px; top: 0; left: 15px; }
  .window-filter .i-cancel-wrap .i-cancel { display: inline-block; width: 22px; height: 40px; }
  .window-filter .filter-content { padding-left: 25%; margin-top: 40px; }
  .window-filter .filter-category { position: absolute; top: 41px; left: 0; bottom: 0; right: 75%; background-color: #ebebeb; }
  .window-filter .category-active { background-color: #fff; }
  .window-filter .category-item { padding: 15px 0 15px 15px; border-bottom: 1px solid #ebebeb; }
  .window-filter .category-item:last-child { border-bottom: none; }
  .window-filter .category-item .filter-item-title { margin: 0; font-size: 12px; line-height: 12px; color: #888; }
  .window-filter .category-item .filter-item-content { margin: 0; font-size: 14px; line-height: 14px; padding-top: 4px; color: #333; width: 65px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
  .window-filter .filter-container { background-color: #fff; transition-property: -webkit-transform; transform-origin: 0px 0px 0px; }
  .window-filter .filter-container-wrap { background-color: #fff; padding-left: 10px; overflow: hidden; }
  .window-filter .card-filter-item { height: 60px; line-height: 60px; border-bottom: 1px solid #eaeaea; padding: 0 10px 0 0; color: #333; font-size: 14px; }
  .window-filter .btn-query-wrap { position: fixed; left: 0; right: 0; bottom: 0; z-index: 102; height: 40px; padding: 10px 20px; background-color: #fff; border-top: 1px solid #eaeaea; }
  .window-filter .btn-query { position: relative; top: 50%; transform: translateY(-50%); background-color: #222641; color: #fff; text-align: center; line-height: 40px; font-weight: bolder; }
  .window-filter .card-item-active, .window-filter .allselect { color: #f77; }
  .window-filter .filter-category-fixed { position: fixed; }
  .window-filter .card-filter-item .i-check-o { position: relative; top: 50%; transform: translateY(-50%) }
</style>

<script type="text/babel">
  export default {
    props: ['cur_filter_data', 'select_tab'],
    replace: true,
    data () {
      return {
        // filter组件自身样式数据
        tran_distance: 0,
        filter_category_style: false,
        current_tag_id: 0,
        current_area_id: 0,
        current_type_id: 0,
        start_y: false,

        // 外部处理后的数据
        filter_data: {},

        // icon
        images: {
          close: require('../../assets/close.png'),
          arrow: require('../../assets/arrow-down.png')
        }
      }
    },
    compiled () {
      var self = this

      // 重要:取消父子组件之间的object双向绑定
      self.cur_filter_data = JSON.parse(JSON.stringify(self.cur_filter_data))
      self.filter_data = self.cur_filter_data
    },
    methods: {
      // 关闭筛选器
      closeWindow() {
        this.$dispatch('close-filter')
      },
      // 当前已选中的文字字符串
      select_text(tab) {
        var text = ''
        // 单选
        if (!tab.is_multiple_choice) {
          tab.content.map(item => {
            if (item.select) {
              text = item.content_name
            }
            if (item.child.length) {
              item.child.map(child => {
                if (child.select) {
                  text = child.name
                }
              })
            }
          })
        } else {
          tab.content.map(item => {
            if (item.select) {
              text += item.content_name
            }
            if (item.child.length) {
              item.child.map(children => {
                if (children.select) {
                  text += children.name
                }
              })
            }
          })
        }
        return text
      },
      // 一级选中
      /*
       * @param {pindex} 父级index
       * @param {index} 当前元素的index
       * @param {con} 当前选中的对象
       * @param {is_multiple_choice} 当前选项组是否是多选 Boolean
       * @param {child} 当前选中对象是否有二级菜单,如没有则为'',有则为Array
       * */
      select(pindex, index, con, is_multiple_choice, child) {
        var self = this
        // 每个tab第一个选项为“全部”选项,此选项只能单选
        if (index === 0) {
          // 一级取消选中
          self.filter_data[pindex].content.map(function (item) {
            item.select = false
            // 二级取消选中
            if (item.child.length) {
              item.child.map(function (child_item) {
                child_item.select = false
              })
            }
          })
          con.select = !con.select
        } else {
          // 没有二级菜单,直接选中
          if (!child.length) {
            // 单选
            if (!is_multiple_choice) {
              self.filter_data[pindex].content.map(function (item) {
                item.select = false
              })
            } else { // 多选,排除第一个
              self.filter_data[pindex].content[0].select = false
            }
            con.select = !con.select
          } else { // 有二级菜单,则为toggle动作
            con.toggle = !con.toggle
          }
        }
      },
      checkSelect(pindex, index, con, is_multiple_choice, child) {
        var self = this
        // 每个tab第一个选项为“全部”选项,此选项只能单选
        if (index === 0) {
          // 一级取消选中
          self.filter_data[pindex].content.map(function (item) {
            item.select = false
            // 二级取消选中
            if (item.child.length) {
              item.child.map(function (child_item) {
                child_item.select = false
              })
            }
          })
          con.select = !con.select
        } else {
          // 没有二级菜单,直接选中
          if (!child.length) {
            // 单选
            if (!is_multiple_choice) {
              self.filter_data[pindex].content.map(function (item) {
                item.select = false
              })
            } else {  // 多选,排除第一个
              self.filter_data[pindex].content[0].select = false
            }
            con.select = !con.select
          } else { // 有二级菜单,则为全选动作
            self.filter_data[pindex].content[0].select = false
            let count = 0
            for (let i = 0; i < child.length; i++) {
              if (child[i].select) {
                count++
              }
            }
            // 取消全选
            if (count === child.length) {
              child.map(function (child) {
                child.select = false
              })
            } else { // 如果当前没有全选,则全选
              child.map(function (child) {
                child.select = true
              })
            }
          }
        }
      },
      // 二级选中
      secSelect(ppindex, pindex, child, is_multiple_choice) {
        var self = this
        // 单选
        if (!is_multiple_choice) {
          self.filter_data[ppindex].content.map(function (item) {
            item.select = false
            if (item.child.length) {
              item.child.map(function (child) {
                child.select = false
              })
            }
          })
          child.select = !child.select
        } else { // 多选
          self.filter_data[ppindex].content[0].select = false
          child.select = !child.select
        }
      },
      // is全选?
      is_all_select(pindex, index, child) {
        var self = this
        if (child.length) {
          for (let i = 0; i < self.filter_data[pindex].content[index].child.length; i++) {
            if (!self.filter_data[pindex].content[index].child[i].select) {
              return false
            }
          }
          return true
        }
      },
      iconselect(pindex, index, con, child) {
        var self = this
        if (child.length) {
          for (let i = 0; i < self.filter_data[pindex].content[index].child.length; i++) {
            if (!self.filter_data[pindex].content[index].child[i].select) {
              return '#ccc'
            }
          }
          return '#f77'
        } else {
          if (con.select) {
            return '#f77'
          }
        }
        return '#ccc'
      },
      // 查询
      doQuery() {
        var self = this
        // 数据一级处理,将toggle为true但没有选择的选项复原
        self.filter_data.map(function (item) {
          item.content.map(function (con) {
            if (con.child.length) {
              var child_count = 0
              for (let i = 0; i < con.child.length; i++) {
                if (con.child[i].select) {
                  child_count++
                }
              }
              if (child_count === 0) {
                con.toggle = false
                item.content[0].select = true
              }
            }
          })
        })
        self.$nextTick(function () {
          self.$dispatch('do-query', self.filter_data)
        })
      }
    }
  }
</script>