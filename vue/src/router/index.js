import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import surveyView from "../views/SurveyView.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue"
import surveys from "../views/Surveys.vue";
import store from "../store/index.js";
import AuthLayout from "../components/AuthLayout.vue";

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Dashboard',
    component: DefaultLayout,
    meta: {requiresAuth: true},
    children: [
      {path: '/dashboard', component: Dashboard, name: 'Dashboard'},
      {path: '/surveys', component: surveys, name: 'surveys'},
      {path: '/surveys/create', component: surveyView, name: 'CreateSurvey'},
      {path: '/surveys/:id', component: surveyView, name: 'surveysView'}

    ]
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    component: AuthLayout,
    meta: {isGuest: true},
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
    ]
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'Login'})
  }
  if (store.state.user.token && (to.meta.isGuest)) {
    next({name: 'Dashboard'})
  } else {
    next()
  }
})
export default router
