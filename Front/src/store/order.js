import axios from "axios";
import apiEndpoints from "@/constants/apiEndpoints";

export default {
  namespaced: true,
  state: {
    orderList: [],
  },
  getters: {
    getOrderList: (state) => {
      return state.orderList;
    },

  },

  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },
    setError(state, data) {
      state.error = data;
    },

    setOrderLisr(state, orderList) {
      state.orderList = orderList;
    },
  },
  actions: {
    

    addOrder({ commit }, orderData) {
      commit("setLoading", true);
      commit("setError", null);

      const formData = new FormData();
      for (const key in orderData) {
        formData.append(key, orderData[key]);
      }
      return new Promise((resolve, reject) => {
        axios
          .post(apiEndpoints.order.add, formData)
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
    
    loadOrders({ commit } ) {
      commit("setLoading", true);
      commit("setError", null);
      //Запит на сервер
      console.log(333333333333);
      axios
      .get(apiEndpoints.order.readList)
       //Асинхронна дія
      .then(
        //Якщо добре
        (res) => res.data
        )
      .then((resData) => {
        if (resData.success) commit("setOrderLisr", resData.data);
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
      getOrderById({ commit }, id) {
        commit("setLoading", true);
        commit("setError", null);
        return new Promise((resolve, reject) => {
          console.log(11111111111);
          axios
            .get(apiEndpoints.order.getOrderById(id))
            .then(
              //Якщо добре
              (res) => res.data
            )
            .then((resData) => {
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
    },
    };
