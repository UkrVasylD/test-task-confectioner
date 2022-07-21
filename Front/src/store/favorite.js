import axios from "axios";
import apiEndpoints from "@/constants/apiEndpoints";

export default {
  namespaced: true,
  state: {
    favoriteList: JSON.parse(localStorage.getItem("favoriteList")) || [],
    // liveTo:JSON.parse(localStorage.getItem('liveTo')) || null
  },
  getters: {
    getFavoriteList: (state) => {
      return state.favoriteList;
    },
  },

  mutations: {
    del(state, favoriteItemId) {
      state.favoriteList = state.favoriteList.filter(
        (item) => item.productId !== favoriteItemId
      );
      localStorage.setItem("favoriteList", JSON.stringify(state.favoriteList));
    },
    addToFavorite(state, product) {
      const cartProduct = {
        id: new Date().getTime(),
        productId: product._id,
        title: product.title,
        price: product.price,
        photo: product.photo,
        description: product.description,
      };
      state.favoriteList.push(cartProduct);
      localStorage.setItem("favoriteList", JSON.stringify(state.favoriteList));
      // state.liveTo= new Date().getTime() + 2592000000
      // localStorage.setItem('liveTo', JSON.stringify(state.liveTo))
    },
  },
  actions: {
    addToFavorite({ commit }, product) {
      commit("addToFavorite", product);
    },
    del({ commit }, cartItemId) {
      commit("del", cartItemId);
    },

    updateUserFavoriteList({ commit }, updateData) {
      // commit("setLoading", true);
      // commit("setError", null);

      // const formData = new FormData();
      // for (const key in state.favoriteList) {
      //   formData.append(key, state.favoriteList[key]);
      // }

      return new Promise((resolve, reject) => {
        axios
          .put(apiEndpoints.user.update, updateData)
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fatch failed!");
          })
          .catch((err) => {
            // commit("setError", err);
            reject(err);
          });
        // .finally(() => commit("setLoading", false));
      });
    },
  },
};
