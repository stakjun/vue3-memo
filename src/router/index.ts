import { createRouter, createWebHistory } from 'vue-router'
import dayjs from 'dayjs'
import HomeView from '@/views/Home.vue'
import LoginView from '@/views/Login.vue'
import { localGetItem } from '@/utils'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
      redirect: '/index',
      children: [
        {
          path: 'index',
          component: () => import("@/views/index/index.vue")
        }
      ]
    },
    {
      path: '/login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = localGetItem("login_user");
  // 登陆之后是否超过3天
  const is_valid = dayjs().isBefore(dayjs(user?.login_at).add(3, "day"));
  if (to.fullPath !== "/login") {
    if (!user || !is_valid) {
      return next("/login");
    }
  } else {
    if (user && is_valid) {
      return next("/");
    }
  }
  next();
});

export default router
