<template>
  <section class="list-filter">
    <filter-bar :cur_filter_data="filter_data"></filter-bar>
    <filter-modal v-if="is_show_list_filter"
                  :cur_filter_data="filter_data"
                  :select_tab="select_tab"
                  transition="slide-down"></filter-modal>
  </section>
</template>

<script>
  export default {
    props: {
      filter_data: {type: Array}
    },
    data() {
      return {
        is_show_list_filter: false,
        select_tab: 0 // 筛选器选择的tab
      }
    },
    events: {
      'open-filter-window': function(index) {
        this.select_tab = index
        this.is_show_list_filter = true
      },
      'close-filter': function() {
        this.is_show_list_filter = false
      },
      'do-query': function(data) {
        var self = this
        self.cur_filter_data = data
        self.is_show_list_filter = false
      }
    },
    components: {
      'filter-bar': require('./_filter_bar.vue'),
      'filter-modal': require('./_filter_modal.vue')
    }
  }
</script>