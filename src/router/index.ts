import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import EventList from "../views/EventList.vue";
import EventLayout from "../views/event/Layout.vue";
import EventDetails from "../views/event/Details.vue";
import EventRegister from "../views/event/Register.vue";
import EventEdit from "../views/event/Edit.vue";

const routes: Array<RouteRecordRaw> = [
  {
    // url
    path: "/",
    // name of the route
    name: "EventList",
    // which "view" component to render
    component: EventList,
    props: (route) => ({
      page:
        typeof route.query.page == "string" ? parseInt(route.query.page) : 1,
    }),
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    // send in route parameters as component props
    props: true,
    component: EventLayout,
    // nested child components
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // Performance Optimization
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
