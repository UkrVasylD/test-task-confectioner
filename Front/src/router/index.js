import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AboutConfectioner from "../views/AboutConfectioner.vue";
import Product from "../views/Product.vue";
import Cart from "../views/Cart.vue";
import EditPage from "../views/EditPage.vue";
import Signup from "@/components/SignUp";
import Login from "@/components/Login/login.vue";
import OrderList from "@/components/OrderList";
import OrderItem from "@/components/OrderList/orderItem.vue";
import ProductItem from "@/components/ProductItem";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/product/:category/:type?",
    name: "product",
    component: Product,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/productItem/:id",
    name: "productItem",
    component: ProductItem,
  },
  {
    path: "/editor/:id?",
    name: "editor",
    component: EditPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/order",
    name: "order",
    component: OrderList,
  },
  {
    path: "/order/item:id",
    name: "orderItem",
    component: OrderItem,
  },
  {
    path: "/about",
    name: "AboutConfectioner",
    component: AboutConfectioner,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
