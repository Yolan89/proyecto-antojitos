import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Category from '../views/Category.vue';
import Cart from '../views/Cart.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  {
    path:"/register",
    name: "Register",
    component:Register,
  },
 { 
  path:"/cart",
  name: "Cart",
  component:Cart,

 },
  {
    path:"/:category",
    name: "Category",
    component:Category,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
