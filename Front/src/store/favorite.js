export default {
  namespaced: true,
  state: {
    favoriteList: JSON.parse(localStorage.getItem('favoriteList')) || [],
    // liveTo:JSON.parse(localStorage.getItem('liveTo')) || null
  },
  getters: {
    getFavoriteList: (state) =>  {
      return state.favoriteList;
    },
  },

  mutations: {
    del(state, favoriteItemId) {
      state.favoriteList = state.favoriteList.filter((item) => item.productId !== favoriteItemId);
      localStorage.setItem('favoriteList', JSON.stringify(state.favoriteList))
    },
    addToFavorite(state, product) {
        const cartProduct = {
          id: new Date().getTime(),
          productId: product._id,
          title: product.title,
          price: product.price,
          photo: product.photo,
          description: product.description
        };
        state.favoriteList.push(cartProduct);
        localStorage.setItem('favoriteList', JSON.stringify(state.favoriteList))
        // state.liveTo= new Date().getTime() + 2592000000
        // localStorage.setItem('liveTo', JSON.stringify(state.liveTo))
      }
  },
  actions: {
  addToFavorite({ commit }, product) {
    commit("addToFavorite", product);
  },
  del({ commit }, cartItemId) {
    commit("del", cartItemId);
  },
  }
};
