import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../components/Profile.vue'
import Topic from '../components/topics/Topic.vue'
import Post from '../components/posts/Post.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/login',
      name: 'Login', 
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        auth: false
      }
    },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      auth: true 
    }
  },
  {
    path: '/module/:topicId',
    name: 'Topic',
    props: true,
    component: Topic,
    meta: {
      auth: true 
    }
  },
  {
    path: '/module/:topicId/:postId',
    name: 'Post',
    props: true,
    component: Post,
    meta: {
      auth: true 
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)) {
    if(localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath} 
      })
    }
    else {
      next()
    }
  }
  else {
    if(localStorage.getItem('jwt') != null) {
    next({
      path: '/',
      params: {nextUrl: '/'}
    })
    } else {
      next()
    }
  }
})

export default router
