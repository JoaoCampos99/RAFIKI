import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    // {
    //   path: "/rankings",
    //   name: "rankings",
    //   component: Ranking
    // },
    // {
    //   path: "/badges",
    //   name: "badges",
    //   component: Badges
    // },
    // {
    //   path: "/thread",
    //   name: "thread",
    //   component: Thread
    // },
    // {
    //   path: "/profile",
    //   name: "profile",
    //   component: Profile
    // },
    // {
    //   path: "/faq",
    //   name: "faq",
    //   component: Faq
    // },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: Login
    // },
    // {
    //   path: "/createThread",
    //   name: "createThread",
    //   component: CreateThread
    // }
  ]
});
