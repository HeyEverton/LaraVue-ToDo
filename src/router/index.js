import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TelaLogin from '@/views/TelaLogin.vue'
import TelaCadastro from '@/views/TelaCadastro'
import TelaVerificarEmail from '@/views/TelaVerificarEmail.vue'
import TelaEsqueceuSenha from '@/views/TelaEsqueceuSenha.vue'
import TelaResetarSenha from '@/views/TelaResetarSenha.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/login',
    name: 'login',
    component: TelaLogin,
  },

  {
    path: '/registro',
    name: 'registro',
    component: TelaCadastro,
  },

  {
    path: '/verificar-email',
    name: 'verificar-email',
    component: TelaVerificarEmail,
  },

  {
    path: '/esqueci-senha',
    name: 'esqueci-senha',
    component: TelaEsqueceuSenha,
  },

  {
    path: '/recuperar-senha',
    name: 'recuperar-senha',
    component: TelaResetarSenha,
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  model: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
