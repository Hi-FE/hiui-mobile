<template>
  <section class="page-list-filter" v-highlight>
    <list-filter :filter_data="filter_data" :selected_data.sync="selected_data"></list-filter>

    <!-- code -->
    <pre><code class="html" v-text="code"></code></pre>

    <div class="select-content">
      <p>选中选项</p>
      <pre>
        {{ selected_data | json }}
      </pre>
    </div>
  </section>
</template>

<style scoped>
  .page-list-filter { margin: 0; padding: 0; }
  .select-content { font-size: 12px; }
</style>

<script>
  export default {
    data: function() {
      return {
        is_show_list_filter: false,
        select_tab: 0, // 筛选器选择的tab
        selected_data: [],
        filter_data: [
          {
            tab_name: '阵营',
            is_multiple_choice: true, // 是否多选
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
              }
            ]
          },
          {
            tab_name: '目的地',
            is_multiple_choice: true,
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
              }
            ]
          }
        ],
        code: '<!-- filter bar -->\n' +
        '<filter-bar :cur_filter_data="filter_data"></filter-bar>\n\n' +
        '<!-- filter modal -->\n' +
        '<filter-modal v-if="is_show_list_filter"\n' +
        '              :cur_filter_data="filter_data"\n' +
        '              :select_tab="select_tab"\n' +
        '              transition="slide-down"></filter-modal>'
      }
    },
    components: {
      'list-filter': require('./../components/filter/list_filter.vue')
    }
  }
</script>