export default {
  namespaced: true,
  state: {
    popUpVisible: false,
  },
  getters: {
    getPopUpVisible: (state) => {
      return state.popUpVisible;
    },
  },

  mutations: {
    changePopUpVisible(state, payloud) {
      if (state.popUpVisible) {
        state.popUpVisible = false;
      } else {
        state.popUpVisible = true;
      }
    },
  },
  actions: {
    changePopUpVisible({ commit }, payloud) {
      commit("changePopUpVisible", payloud);
    },
  },
};
