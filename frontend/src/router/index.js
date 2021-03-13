import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import toyApp from '../views/toy-app.vue'
import toyDetails from '../views/toy-details.vue'
import toyEdit from '../views/toy-edit.vue'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/toy',
    name: 'toyApp',
    component: toyApp
  },
  {
    path: '/toy/edit/:toyId?',
    name: 'toyEdit',
    component: toyEdit
  },
  {
    path: '/toy/details/:toyId?',
    name: 'toyDetails',
    component: toyDetails
  },
  {
    path: '/login/:userId?',
    name: 'login',
    component: login
  },
]

const router = new VueRouter({
  routes
})

export default router
