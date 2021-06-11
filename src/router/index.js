import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutAuth from '@/layouts/Auth'
import LayoutDefault from '@/layouts/Default'
import Login from '@/views/Auth/Login'
import Logout from '@/views/Auth/Logout'
import Register from '@/views/Auth/Register'
import Home from '@/views/Home'

import Guard from '@/service/middleware';

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		component: LayoutAuth,
		beforeEnter: Guard.redirectIfAuthenticated,
		children: [
			{path: '', name: 'login', component: Login}
		]
	},
	{
		path: '/register',
		component: LayoutAuth,
		beforeEnter: Guard.redirectIfAuthenticated,
		children: [
			{path: '', name: 'register', component: Register}
		]
	},
	{
		path: '/',
		beforeEnter: Guard.redirectIfNotAuthenticated,
		component: LayoutDefault,
		children: [
			{path: '', name: 'home', component: Home}
		]
	},
	{
		path: '/logout',
		beforeEnter: Guard.redirectIfNotAuthenticated,
		component: Logout,
		name: "logout"
	}
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
