import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import GStore from "@/store";
import NProgress from "nprogress";
import EventService from "../services/EventService";
import EventList from "../views/event/List.vue";
import EventLayout from "../views/event/Layout.vue";
import EventDetails from "../views/event/Details.vue";
import EventRegister from "../views/event/Register.vue";
import EventEdit from "../views/event/Edit.vue";
import NotFound from "../views/event/NotFound.vue";
import NetworkError from "../views/event/NetworkError.vue";
import { AxiosResponse } from "axios";

const routes: Array<RouteRecordRaw> = [
  {
    // url
    path: "/",
    // name of the route
    name: "EventList",
    // which "view" component to render
    component: EventList,
    props: (route) => ({
      page: parseInt(String(route.query.page)) || 1,
    }),
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    // send in route parameters as component props
    props: true,
    component: EventLayout,
    beforeEnter: (to) => {
      return EventService.getEvent(parseInt(String(to.params.id)))
        .then((response: AxiosResponse<never>) => {
          GStore.event = response.data;
        })
        .catch((error: any) => {
          if (error.response && error.response.status == 404) {
            // If the event doesn't exist, load 404
            return {
              name: "404Resource",
              params: { resource: "event" },
            };
          } else {
            // Otherwise assume network error
            return { name: "NetworkError" };
          }
        });
    },
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
  {
    // Match all routes that don't match an existing route
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
