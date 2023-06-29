import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home";
import News from "../views/News";
import NewsPreview from "../views/NewsPreview";
import Product from "../views/Product";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/news",
    name: "news",
    component: News,
  },
  {
    path: "/product",
    name: "product",
    component: Product,
  },
  {
    path: '/news/:id',
    component: NewsPreview,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((from, to, next) => {
  nProgress.start();
  next();
});
router.afterEach((from, to, next) => {
  nProgress.done();
});
export default router;
