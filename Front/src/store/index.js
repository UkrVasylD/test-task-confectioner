import { createStore } from "vuex";
import productToRender from "./productToRender";
import cart from "./cart";
import popUp from "./popUp";
import auth from "./auth";
import order from "./order";


export default createStore({
  state: {},
  getters: {},

  mutations: {},
  actions: {},
  modules: {
    productToRender,
    cart,
    popUp,
    auth,
    order,
  },
});
