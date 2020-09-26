import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/Dashboard";
import AboutGumpReader from "../views/about/AboutGumpReader";
import AboutAuthor from "../views/about/AboutAuthor";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Dashboard,
      meta:{
        title:"home"
      }
    },
    {
      path: '/changeProfile',
      name: '/ChangeProfile',
      component: ()=>import("@/views/profile/ChangeProfile"),
      meta: {
        title: "changeProfile"
      }
    },
    {
      path: '/about/author',
      name: 'About',
      component:()=>import("@/views/PdfView/PdfLibEditer"),
      meta:{
        title:"author"
      }
    },
    {
      path: '/about/gump',
      name: 'Gump',
      component:()=>import("@/views/about/AboutGumpReader"),
      meta: {
        title:'gump'
      }
    },
    {
      path: "/pdfView",
      name: 'PdfView',
      component: ()=>import("@/views/PdfView/PdfEditer"),
      meta: {
        title: "PdfView"
      }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  console.log("导航守卫前置钩子调用");
  if(to.path == from.path){
    console.log("要去的路由和当前路由在一个页面");
    return
  }
  document.title = to.matched[0].meta.title
  next()
})
router.afterEach((to, from)=>{
  console.log("导航守卫后置钩子被调用");
})

export default router
