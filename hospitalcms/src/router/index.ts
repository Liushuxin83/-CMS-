import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Login = () => import('../views/login/Login.vue')
const Register = () => import('../views/register/Register.vue')
const Home = () => import('../views/home/Home.vue')
const HomeWelcom = () => import('../views/home/HomeWelcom.vue')
const SendCard = () => import('../views/home/SendCard.vue')
const Calling = () => import('../views/home/Calling.vue')
const Inspect = () => import('../views/home/Inspect.vue')
const MedicalHistory = () => import('../views/home/MedicalHistory.vue')
const Prescription = () => import('../views/home/Prescription.vue')
const Test = () => import('../views/home/Test.vue')
const Error = () => import('../views/404/404.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/error',
    component: Error
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/welcome',
    children: [
      {
        path: '/home/welcome',
        components: { HomeWelcom }
      },
      {
        path: '/sendcard',
        component: SendCard
      },
      {
        path: '/calling',
        component: Calling
      },
      {
        path: '/inspect',
        component: Inspect
      },
      {
        path: '/medicalhistory',
        component: MedicalHistory
      },
      {
        path: '/test',
        component: Test
      },
      {
        path: '/prescription',
        component: Prescription
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
