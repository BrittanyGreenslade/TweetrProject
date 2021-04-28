import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Discover from "@/views/Discover.vue";
import Feed from "@/views/Feed.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: "/discover",
    name: "Discover",
    component: Discover,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },

  {
    path: "/feed",
    name: "Feed",
    component: Feed,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
