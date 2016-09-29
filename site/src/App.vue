<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
  body { background: #f7f7f7; }
  pre:last-child { margin-bottom: 5px; }
  .card { border-radius: 2px; box-shadow: 0 2px 8px -3px rgba(0, 0, 0, .3); background: #fff; padding: 20px 10px; }
  .card:not(:first-child) { margin-top: 1px; }
  .button { display: inline-block; background: #444; color: #fff; -webkit-appearance: none; border: none; border-radius: 2px; line-height: 30px; padding: 0 10px; font-size: 14px; }
  .hljs { font-size: 12px; }
</style>

<script>
  require('./styles/base.css')

  export default {
    replace: false
  }
</script>
