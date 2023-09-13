import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/alpa',
      name: 'project-alpa',
      component: () => import('@/views/ProjectPage.vue'),
      props: {
        project: 'alpa',
      },
      meta: {
        pageTitle: 'Project alpa',
        breadcrumb: [
          {
            text: 'Project Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/thor',
      name: 'project-thor',
      component: () => import('@/views/ProjectPage.vue'),
      props: {
        project: 'thor',
      },
      meta: {
        pageTitle: 'Project thor',
        breadcrumb: [
          {
            text: 'Project Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/backoffice',
      name: 'project-backoffice',
      component: () => import('@/views/ProjectPage.vue'),
      props: {
        project: 'backoffice',
      },
      meta: {
        pageTitle: 'Project backoffice',
        breadcrumb: [
          {
            text: 'Project Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/report/thor/:test',
      name: 'report-page-thor',
      component: () => import('@/views/ReportPage.vue'),
      props: true,
      meta: {
        pageTitle: 'Report page',
        project: 'thor',
        breadcrumb: [
          {
            to: { name: 'project-thor' },
            text: 'Project page',
          },
          {
            text: 'Report page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/report/alpa/:test',
      name: 'report-page-alpa',
      component: () => import('@/views/ReportPage.vue'),
      props: true,
      meta: {
        pageTitle: 'Report page',
        project: 'alpa',
        breadcrumb: [
          {
            to: { name: 'project-alpa' },
            text: 'Project page',
          },
          {
            text: 'Report page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/report/backoffice/:test',
      name: 'report-page-backoffice',
      component: () => import('@/views/ReportPage.vue'),
      props: true,
      meta: {
        pageTitle: 'Report page',
        project: 'backoffice',
        breadcrumb: [
          {
            to: { name: 'project-backoffice' },
            text: 'Project page',
          },
          {
            text: 'Report page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
