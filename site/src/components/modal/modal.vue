<template>
  <section class="modal" v-if="is_show" :class="type" :transition="mask_transition" @click="is_show = false">
    <div class="modal-wrap"
         v-if="is_show" :transition="transition_option[type]" :style="{ 'background': background }" @click.stop>
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
  .modal { position: fixed; z-index: 10000; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, .6); }
  .modal .modal-wrap { box-shadow: 0 -2px 8px -3px rgba(0, 0, 0, .3); }
  /* type */
  .modal.from_center { display: flex; align-items: center; justify-content: center; }
  .modal.from_top .modal-wrap { position: absolute; top: 0; left: 0; right: 0; }
  .modal.from_bottom .modal-wrap { position: absolute; bottom: 0; left: 0; right: 0; }
  .modal.from_left .modal-wrap { position: absolute; bottom: 0; left: 0; top: 0; max-width: 100%; }
  .modal.from_right .modal-wrap { position: absolute; bottom: 0; top: 0; right: 0; max-width: 100%; }
</style>

<script>
  require('./../../styles/transitions.css')

  export default {
    props: {
      is_show: {
        type: Boolean, twoWay: true, default: false
      },
      mask_transition: {
        type: String, default: 'fade'
      },
      type: {
        type: String, default: 'from_center'
      },
      background: {
        type: String, default: '#fff'
      }
    },
    data () {
      return {
        transition_option: {
          from_center: 'bounce',
          from_top: 'slide-down',
          from_bottom: 'slide-up',
          from_left: 'slide-left',
          from_right: 'slide-right'
        }
      }
    }
  }
</script>
