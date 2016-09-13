import Vue from 'vue'
import VueRouter from 'vue-router'
import Hljs from 'highlight.js'

Vue.use(VueRouter)

require('./../node_modules/highlight.js/styles/default.css')

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  root: '/hiui-mobile'
})

router.map({
  '/': {component: require('./views/home.vue'), name: 'home'},
  '/modal': {component: require('./views/modal.vue'), name: 'modal'},
  '/rating_stars': {component: require('./views/rating_stars.vue'), name: 'rating_stars'},
  '/list_filter': {component: require('./views/list_filter.vue'), name: 'list_filter'}
})

Vue.directive('highlight', function () {
  let blocks = this.el.querySelectorAll('pre code')
  Array.prototype.forEach.call(blocks, Hljs.highlightBlock)
})

const App = Vue.extend(require('./App.vue'))
router.start(App, 'body')
