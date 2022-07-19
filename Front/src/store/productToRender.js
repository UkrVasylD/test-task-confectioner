import axios from "axios";
import apiEndpoints from "@/constants/apiEndpoints";

export default {
  namespaced: true,

  state: {
    loading: false, 
    error: false, 

    productList: [],
  },
  getters: {
    isLoading: (state) => state.loading,
    isError: (state) => state.error,
    getProductById: (state) => (prodId) =>
      state.productList.find((item) => item._id === prodId),
    getProductList: (state) => state.productList,
  },
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },
    setError(state, data) {
      state.error = data;
    },

    setProduct(state, productList) {
      state.productList = productList;
    },

    deleteProductFromList(state, productId) {
      state.productList = state.productList.filter(
        (item) => item._id !== productId
      );
    },
    sortProductPriceDescending(state) {
      state.productList = state.productList.sort((a, b) => (a.price > b.price ? -1 : 1))
    },
    sortProductPriceAscending(state) {
      state.productList = state.productList.sort((a, b) => (a.price > b.price ? 1 : -1))
    },
    sortProductTitleLow(state) {
      state.productList = state.productList.sort((a, b) => (a.title > b.title ? -1 : 1))
    },
    sortProductTitleUp(state) {
      state.productList = state.productList.sort((a, b) => (a.title > b.title ? 1 : -1))
    },
  },
  actions: {
    loadProduct({ commit }, searchProduct) {
      commit("setLoading", true);
      commit("setError", null);
      //Запит на сервер
      axios
        .get(apiEndpoints.pie.readList, {
          params: {
            category: searchProduct.category,
            type: searchProduct.type,
            title: searchProduct.title,
            minPrice: searchProduct.minPrice,
            maxPrice: searchProduct.maxPrice,
            sortPrice: searchProduct.sortPrice,
            sortTitle: searchProduct.sortTitle,

          },
        }) //Асинхронна дія
        .then(
          //Якщо добре
          (res) => res.data
        )
        .then((resData) => {
          if (resData.success) commit("setProduct", resData.data);
          else throw new Error("Fatch failed!");
        })
        .catch((err) => {
          //Якщо погано
          commit("setError", err);
        })
        .finally(
          //Завжди
          () => commit("setLoading", false)
        );
    },

    updateProduct({ commit }, product) {
      commit("setLoading", true);
      commit("setError", null);

      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }
      return new Promise((resolve, reject) => {
        axios
          .put(apiEndpoints.pie.update, formData)
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fatch failed!");
          })
          .catch((err) => {
            //Якщо погано
            commit("setError", err);
            reject(err);
          })
          .finally(
            //Завжди
            () => commit("setLoading", false)
          );
      });
    },

    addProduct({ commit }, product) {
      commit("setLoading", true);
      commit("setError", null);

      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }

      return new Promise((resolve, reject) => {
        axios
          .post(apiEndpoints.pie.add, formData)
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fatch failed!");
          })
          .catch((err) => {
            //Якщо погано
            commit("setError", err);
            reject(err);
          })
          .finally(
            //Завжди
            () => commit("setLoading", false)
          );
      });
    },

    getProductById({ commit }, id) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .get(apiEndpoints.pie.getProductById(id))
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            console.log(resData.data);
            if (resData.success) resolve(resData.data);
            else throw new Error("Fatch failed!");
          })
          .catch((err) => {
            //Якщо погано
            commit("setError", err);
            reject(err);
          })
          .finally(
            //Завжди
            () => commit("setLoading", false)
          );
      });
    },

    delProduct({ commit }, id) {
      commit("setLoading", true);
      commit("setError", null);
      new Promise((resolve, reject) => {
        axios
          .delete(apiEndpoints.pie.delete, { data: { id } })
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            console.log("-resData");
            console.log(resData);
            if (resData.success) {
              commit("deleteProductFromList", id);
              resolve(true);
            } else throw new Error("Delete failed!");
          })
          .catch((err) => {
            //Якщо погано
            commit("setError", err);
            reject(err);
          })
          .finally(
            //Завжди
            () => commit("setLoading", false)
          );
      });
    },
    sortProductPriceAscending({ commit }) {
      commit("sortProductPriceAscending");
    },
    sortProductPriceDescending({ commit }) {
      commit("sortProductPriceDescending");
    },
    sortProductTitleLow({ commit }) {
      commit("sortProductTitleLow");
    },
    sortProductTitleUp({ commit }) {
      commit("sortProductTitleUp");
    },
  },
};
