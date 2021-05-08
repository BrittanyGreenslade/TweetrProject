import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Discover from "@/views/Discover.vue";
import Feed from "@/views/Feed.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Users from "@/views/Users.vue";

Vue.use(VueRouter);

const routes = [
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
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/profile/:userId",
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
  store,
});

export default router;
