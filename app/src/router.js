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


Vue.use(Router);

export default new Router({
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
      path: "/profile",
      name: "profile",
      component: Profile
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
