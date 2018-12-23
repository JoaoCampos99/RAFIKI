import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Ranking from "./views/Ranking.vue";
import Badges from "./views/Badges.vue";
import Thread from "./views/Thread.vue";
import Profile from "./views/Profile.vue";
import Faq from "./views/Faq.vue";
import Login from "./views/Login.vue";
import CreateThread from "./views/CreateThread.vue";
import ContactUs from "./views/ContactUs.vue";
import store from "./store.js";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/rankings",
      name: "rankings",
      component: Ranking
    },
    {
      path: "/badges",
      name: "badges",
      component: Badges
    },
    {
      path: "/thread",
      name: "thread",
      component: Thread
    },
    {
      path: "/profile/:userid",
      name: "profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/faq",
      name: "faq",
      component: Faq
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/createThread",
      name: "createThread",
      component: CreateThread
    },
    {
      path: "/contactus",
      name: "contactus",
      component: ContactUs
    }
  ]
});
router.beforeEach((to, from, next) => {
  let auth = store.getters.getAuth;
  let idlogin = store.getters.getloginID;
  if (to.meta.requiresAuth && !auth) {
    alert("NOT LOGGED IN");
    next("/");
  } else if (to.meta.requiresAuth && auth) {
    if (idlogin != 0) {
      if (idlogin == to.params.userid) {
        next();
      } else {
        alert("You can't go there!");
        router.go(-1);
      }
    }
  } else {
    next();
  }
});
export default router;
