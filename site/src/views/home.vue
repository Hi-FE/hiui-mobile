<template>
  <section class="page-home">
    <div class="component-list">
      <a class="component-item card" v-for="component in components" v-link="{ name: component.route_name }">
        <header class="item-name">{{ component.name }}</header>
        <p>{{ component.desc }}</p>
      </a>
    </div>
  </section>
</template>

<style scoped>
  .page-home { font-size: 14px; }
  .component-list { padding: 10px; }
  .component-item { display: block; color: #222; text-decoration: none; }
  .component-item:not(:first-child) { margin-top: 1px; }
  .component-item .item-name { font-weight: 100; font-size: 40px; font-family: "Helvetica Neue"; line-height: 1; }
  .component-item > p { font-size: 12px; color: #999; margin: 5px 0 0; }
</style>

<script>
  export default {
    data () {
      return {
        components: [
          {name: 'Modal', desc: '弹出层', route_name: 'modal'},
          {name: 'Rating stars', desc: '评价星星', route_name: 'rating_stars'},
          {name: 'List filter', desc: '列表筛选器', route_name: 'list_filter'}
        ]
      }
    }
  }
</script>