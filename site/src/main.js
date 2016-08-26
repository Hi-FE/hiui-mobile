import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  root: '/'
})

router.map({
  '/': {component: require('./views/home.vue'), name: 'home'},
  '/modal': {component: require('./views/modal.vue'), name: 'modal'},
  '/rating_stars': {component: require('./views/rating_stars.vue'), name: 'rating_stars'}
})

const App = Vue.extend(require('./App.vue'))
router.start(App, 'body')
