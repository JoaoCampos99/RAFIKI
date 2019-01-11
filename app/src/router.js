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
import AboutMe from "./views/AboutMe.vue";
import MyThreads from "./views/MyThreads.vue";
import MyGroups from "./views/MyGroups.vue";
import MyBadges from "./views/MyBadges.vue";
import MyRankings from "./views/MyRankings.vue";
import Users from "./views/Users.vue";
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
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/badges",
      name: "badges",
      component: Badges
    },
    {
      path: "/thread/:threadid",
      name: "thread",
      component: Thread
    },
    {
      path: "/profile/:userid",
      name: "profile",
      component: Profile,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "about",
          name: "AboutMe",
          component: AboutMe
        },
        {
          path: "myThreads",
          name: "MyThreads",
          component: MyThreads
        },
        {
          path: "myGroups",
          name: "MyGroups",
          component: MyGroups
        },
        {
          path: "myBadges",
          name: "MyBadges",
          component: MyBadges
        },
        {
          path: "Rankings",
          name: "MyRankings",
          component: MyRankings
        }
      ]
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
      path: "/createThread/:userId",
      name: "createThread",
      component: CreateThread,
      meta: {
        needsAuth: true
      }
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
  if (to.matched.some(record => record.meta.requiresAuth) && !auth) {
    alert("NOT LOGGED IN");
    next("/");
  } else if (to.matched.some(record => record.meta.requiresAuth) && auth) {
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
  if (to.meta.needsAuth) {
    console.log(idlogin);
    if (idlogin != 0 && auth) {
      next();
    } else {
      alert("Log in pls");
      router.go(-1);
    }
  }
});
export default router;
