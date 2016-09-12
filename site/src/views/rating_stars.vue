<template>
  <section class="page-rating-stars">

    <div class="card" v-highlight>
      <rating-stars :rating=".9" :size="[40, 'px']"></rating-stars>
      <pre><code class="html" v-text="code_1"></code></pre>
      <rating-stars :rating=".9" :with_under="false" :color="'#f77'"></rating-stars>
      <pre><code class="html" v-text="code_2"></code></pre>
    </div>

    <div class="card" v-highlight>
      <rating-stars :rating=".8" :with_under="false" :color="'#f77'" :is_customize="true">
        <img :src="i_logo">
      </rating-stars>
      <pre><code class="html" v-text="code_3"></code></pre>
    </div>

  </section>
</template>

<style scoped>
  .page-rating-stars { padding: 10px; }
</style>

<script>
  import ratingStars from './../components/rating_stars/rating_stars.vue'

  export default {
    data () {
      return {
        i_logo: require('./../assets/logo.png'),
        code_1: '<rating-stars :rating=".9" :size="[40, \'px\']"></rating-stars>',
        code_2: '<rating-stars :rating=".9" :with_under="false" :color="\'#f77\'"></rating-stars>',
        code_3: '<rating-stars :rating=".8" :with_under="false" :color="\'#f77\'" :is_customize="true">\n' +
        '  <img :src="\'xxxx.png\'">\n' +
        '</rating-stars>'
      }
    },
    components: {ratingStars}
  }
</script>