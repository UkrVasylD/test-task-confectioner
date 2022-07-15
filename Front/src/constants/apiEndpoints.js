export default {
  pie: {
    readList: `${process.env.VUE_APP_API_URL}/pie`,
    add: `${process.env.VUE_APP_API_URL}/pie`,
    update: `${process.env.VUE_APP_API_URL}/pie`,
    getProductById: (id) => `${process.env.VUE_APP_API_URL}/pie/${id}`,
    delete: `${process.env.VUE_APP_API_URL}/pie`,
  },
  user: {
    usersList: `${process.env.VUE_APP_API_URL}/users`,
    signup: `${process.env.VUE_APP_API_URL}/users/signup`,
    login: `${process.env.VUE_APP_API_URL}/users/login`,
  },
  order: {
    add: `${process.env.VUE_APP_API_URL}/order`,
    readList: `${process.env.VUE_APP_API_URL}/order`,
    getOrderById: (id) => `${process.env.VUE_APP_API_URL}/order/${id}`,

  },
};
