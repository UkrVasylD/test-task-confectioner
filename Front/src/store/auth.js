import axios from "axios";
import apiEndpoints from "@/constants/apiEndpoints";

const store = {
  namespaced: true,
  state: {
    usersList: [],
    authData: JSON.parse(localStorage.getItem("authData")) || null,
    expiresAt: localStorage.getItem("expiresAt") || null,
    access: false,
  },
  getters: {
    usersList: (state) => state.usersList,
    getUserId: (state) => state.authData._id,
    getFavoriteIdList: (state) => state.authData.favoriteIdList,

    isAuthenticated: (state) => () => {
      return state.authData && new Date().getTime() < state.expiresAt;
    },
    getAccessToken: (state) => () => {
      return state.authData && state.authData.access_token;
    },
    authorized: (state) =>
      state.authData && new Date().getTime() < state.expiresAt,

    getAccessStatus: (state) => state.access,
  },
  mutations: {
    setUsersList(state, usersList) {
      state.usersList = usersList;
    },
    setAuthData(state, { authData, expiresAt }) {
      state.authData = { ...authData };
      state.expiresAt =
        expiresAt || state.authData.expires_in * 1000 + new Date().getTime();

      if (authData.type === "admin") state.access = true;
      else state.access = false;

      localStorage.setItem("authData", JSON.stringify(state.authData));
      localStorage.setItem("expiresAt", JSON.stringify(state.expiresAt));
    },
    clearAuthData(state) {
      state.authData = null;
      state.expiresAt = null;

      localStorage.removeItem("authData");
      localStorage.removeItem("expiresAt");
    },
  },
  actions: {
    signup({ commit }, { name, email, password }) {
      return new Promise((resolve, reject) => {
        axios
          .post(apiEndpoints.user.signup, { name, email, password })
          .then(function () {
            //   commit('setAuthData', { authData: user.data })
            resolve(true);
          })
          .catch((err) => {
            commit("clearAuthData");
            reject(err);
          });
      });
    },

    login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        axios
          .post(apiEndpoints.user.login, { email, password })
          .then((res) => res.data)
          .then((data) => {
            commit("setAuthData", { ...data.user });
            resolve(true);
          })
          .catch((err) => {
            commit("clearAuthData");
            reject(err);
          });
      });
    },

    logout({ commit }) {
      commit("clearAuthData");
    },
  },
};

export default store;
