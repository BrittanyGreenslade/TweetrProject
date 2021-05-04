import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Discover from "@/views/Discover.vue";
import Feed from "@/views/Feed.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import SingleUser from "@/components/SingleUser.vue";
import OtherUsers from "@/components/OtherUsers.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: App,
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
    // children: [
    //   {
    //     path: "/login/:otherUserId",
    //     name: "Single User",
    //     component: SingleUser,
    //   },
    // { path: "/profile/:", name: "Other Users", component: OtherUsers },
    // ],
  },

  {
    path: "/profile",
    // name: "Profile",
    component: Profile,
    children: [
      {
        path: "/profile/:selectedUserId",
        name: "Single User",
        component: SingleUser,
      },
      {
        path: "/profile/OtherUsers",
        name: "Other Users",
        component: OtherUsers,
      },
    ],
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
