<template>
  <section class="page-filter">
      <filter-bar :cur_filter_data="cur_filter_data"></filter-bar>
      <list-filter :cur_filter_data="cur_filter_data"
                   :select_tab="select_tab"
                   transition="slide-down"
                   v-if="is_show_list_filter"></list-filter>
  </section>
</template>

<style scoped>
    .page-filter { margin: 0; padding: 0; }
    .page-filter p { margin: 0; }
</style>

<script type="text/babel">
    import filterBar from './../components/filter/filter_bar.vue'
    import listFilter from './../components/filter/list_filter.vue'
    export default {
        data() {
            return {
                is_show_list_filter: false,
                select_tab: 0, //筛选器选择的tab
                cur_filter_data: [
                    {
                        tab_name: '出发地',
                        is_multiple_choice: false, //是否多选
                        content: [
                            {
                                content_name: '不限',
                                child: '',
                                select: true
                            },
                            {
                                content_name: '华南',
                                child: [
                                    {
                                        name: '香港',
                                        select: false
                                    },
                                    {
                                        name: '深圳',
                                        select: false
                                    },
                                    {
                                        name: '广州',
                                        select: false
                                    },
                                    {
                                        name: '澳门',
                                        select: false
                                    },
                                    {
                                        name: '厦门',
                                        select: false
                                    }
                                ],
                                toggle: false
                            },
                            {
                                content_name: '华北',
                                child: [
                                    {
                                        name: '北京',
                                        select: false
                                    },
                                    {
                                        name: '天津',
                                        select: false
                                    }
                                ],
                                toggle: false
                            }
                        ]
                    },
                    {
                        tab_name: '出行时间',
                        is_multiple_choice: false,
                        content: [
                            {
                                content_name: '不限',
                                child: '',
                                select: true
                            },
                            {
                                content_name: '1月',
                                child: '',
                                select: false
                            },
                            {
                                content_name: '2月',
                                child: '',
                                select: false
                            },
                        ]
                    },
                    {
                        tab_name: '目的地',
                        is_multiple_choice: false,
                        content: [
                            {
                                content_name: '不限',
                                child: '',
                                select: true
                            },
                            {
                                content_name: '美洲',
                                child: '',
                                select: false
                            },
                            {
                                content_name: '亚洲',
                                child: '',
                                select: false
                            },
                            {
                                content_name: '欧洲',
                                child: '',
                                select: false
                            },
                        ]
                    }
                ]
            }
        },
        events: {
            'open-filter-window': function(index) {
                this.select_tab = index;
                this.is_show_list_filter = true;
            },
            'close-filter': function() {
                this.is_show_list_filter = false;
            },
            'do-query': function(data) {
                var self = this;
                self.cur_filter_data = data;
                self.is_show_list_filter = false;
            }
        },
        components: {
            filterBar,
            listFilter
        }
    }
</script>