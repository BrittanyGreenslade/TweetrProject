import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import DiscoverPage from "@/views/DiscoverPage.vue";
import FeedPage from "@/views/FeedPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import UsersPage from "@/views/UsersPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/discover",
    name: "DiscoverPage",
    component: DiscoverPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },

  {
    path: "/users",
    name: "UsersPage",
    component: UsersPage,
  },
  {
    path: "/profile/:userId",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/feed",
    name: "FeedPage",
    component: FeedPage,
  },
];

const router = new VueRouter({
  routes,
  store,
});

export default router;
