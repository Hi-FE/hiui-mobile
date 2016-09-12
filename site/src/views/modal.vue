<template>
  <section class="page-modal">

    <div class="card" v-highlight>
      <header style="margin-top: -4px;">
        <button class="button" @click="is_center_modal_show = true">From center</button>
        <button class="button" @click="is_top_modal_show = true">From top</button>
        <button class="button" @click="is_bottom_modal_show = true">From bottom</button>
        <button class="button" @click="is_left_modal_show = true">From left</button>
        <button class="button" @click="is_right_modal_show = true">From right</button>
      </header>
      <!-- code -->
      <pre><code class="html" v-text="code"></code></pre>
    </div>

    <!-- from center -->
    <modal :is_show.sync="is_center_modal_show">
      <div class="modal-inner">Keep clam & carry on.</div>
    </modal>

    <!-- from top -->
    <modal :is_show.sync="is_top_modal_show" :type="'from_top'">
      <div class="modal-inner">What the fuck.</div>
    </modal>

    <!-- from bottom -->
    <modal :is_show.sync="is_bottom_modal_show" :type="'from_bottom'">
      <div class="modal-inner">
        <h1>Read after me</h1>
        <p>A blind man who leans against a wall imagines that it''s the boundary of the world.</p>
      </div>
    </modal>

    <!-- from left -->
    <modal :is_show.sync="is_left_modal_show" :type="'from_left'">
      <div class="modal-inner">I can fly.</div>
    </modal>

    <!-- from right -->
    <modal :is_show.sync="is_right_modal_show" :type="'from_right'">
      <div class="modal-inner">Really? I can not believe it.</div>
    </modal>

  </section>
</template>

<style scoped>
  .page-modal { padding: 10px; }
  .button { margin-top: 4px; }
  .modal-inner { padding: 10px; }
</style>

<script>
  import modal from './../components/modal/modal.vue'
  export default {
    data () {
      return {
        is_center_modal_show: false,
        is_top_modal_show: false,
        is_bottom_modal_show: false,
        is_left_modal_show: false,
        is_right_modal_show: false,
        code: '<!-- from center -->\n' +
        '<modal :is_show.sync="is_center_modal_show">\n' +
        '  <div class="modal-inner">Keep clam & carry on.</div>\n' +
        '</modal>\n\n' +
        '<!-- from bottom -->\n' +
        '<modal :is_show.sync="is_bottom_modal_show" :type="\'from_bottom\'">\n' +
        '  <div class="modal-inner">\n' +
        '    <h1>Read after me</h1>\n' +
        '    <p>A blind man who leans against a wall imagines that it\'s the boundary of the world.</p>\n' +
        '  </div>\n' +
        '</modal>'
      }
    },
    components: {modal}
  }
</script>