export default {
  namespaced: true,
  state: {
    cartList: [],

    loading: false,
    error: false,
  },
  getters: {
    isLoading: (state) => state.loading,
    isError: (state) => state.error,

    getCartList: (state) => {
      return state.cartList;
    },
    // getTotalPrice: (state, getters, rootState, rootGetters) =>
    //   state.cartList.reduce((prevSum, cartItem) => {
    //     const product = rootGetters["productToRender/getProductList"].find(
    //       (item) => {
    //         return item._id == cartItem.productId;
    //       }
    //     );
    //     return prevSum + product.price * cartItem.count;
    //   }, 0),
    getTotalPrice: (state, getters, rootState, rootGetters) =>
      state.cartList.reduce((prevSum, cartItem) => {
        return prevSum + cartItem.productPrice * cartItem.count;
      }, 0),
  },

  mutations: {
    increment(state, cartItemId) {
      const indexItem = state.cartList.findIndex(
        (item) => item.id === cartItemId
      );
      state.cartList[indexItem].count++;
    },

    decrement(state, cartItemId) {
      const indexItem = state.cartList.findIndex(
        (item) => item.id === cartItemId
      );
      if (state.cartList[indexItem].count > 1) {
        state.cartList[indexItem].count--;
      }
    },

    del(state, cartItemId) {
      state.cartList = state.cartList.filter((item) => item.id !== cartItemId);
    },

    addToCart(state, product) {
      const indexItem = state.cartList.findIndex(
        (item) => item.productId == product._id
      );
      if (indexItem >= 0) {
        state.cartList[indexItem].count++;
      } else {
        const cartProduct = {
          id: new Date().getTime(),
          productId: product._id,
          productTitle: product.title,
          productPrice: product.price,
          productPhoto: product.photo,
          count: 1,
        };
        state.cartList.push(cartProduct);
      }
    },

    setLoading(state, data) {
      state.loading = data;
    },
    setError(state, data) {
      state.error = data;
    },
  },
  actions: {
    del({ commit }, cartItemId) {
      commit("del", cartItemId);
    },
    decrement({ commit }, cartItemId) {
      commit("decrement", cartItemId);
    },
    increment({ commit }, cartItemId) {
      commit("increment", cartItemId);
    },
    addToCart({ commit }, product) {
      commit("addToCart", product);
    },
  },
};
