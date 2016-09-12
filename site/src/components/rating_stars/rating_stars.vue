<template>
  <span class="rating-stars">

    <span class="above-stars" :style="{ 'width': (rating * parseInt(size[0]) * 5) + (size[1] || 'px') }">
      <div v-if="!is_customize">
        <i-star v-for="x in 5"
                :color="color"
                :style="{ 'width': size[0] + (size[1] || 'px'),
                          'height': size[0] + (size[1] || 'px') }"></i-star>
      </div>
      <div v-if="is_customize" :style="{ 'height': size[0] + (size[1] || 'px') }">
        <slot v-for="x in 5"></slot>
      </div>
    </span>

    <span class="under-stars" v-if="with_under && !is_customize" :style="{ 'margin-top': '-' + size[0] + (size[1] || 'px') }">
      <i-star v-for="x in 5"
              :color="under_color"
              :style="{ 'width': size[0] + (size[1] || 'px'),
                        'height': size[0] + (size[1] || 'px') }"></i-star>
    </span>

  </span>
</template>

<style>
  .rating-stars { display: inline-block; position: relative; line-height: 1.1; }
  .rating-stars .i-star { vertical-align: top; }
  .rating-stars img { height: 100%; }
  .rating-stars .above-stars { display: block; position: relative; z-index: 10; overflow: hidden; white-space: nowrap; }
  .rating-stars .under-stars { display: block; position: relative; white-space: nowrap; }
</style>

<script>
  export default {
    props: {
      rating: {type: Number, default: 0.9},
      with_under: {type: Boolean, default: true},
      color: {type: String, default: '#666'},
      under_color: {type: String, default: '#ccc'},
      is_customize: {type: Boolean, default: false},
      size: {
        type: Array,
        default: function () {
          return [20, 'px']
        }
      }
    },
    components: {
      'i-star': require('./_i_star.vue')
    }
  }
</script>