<template>
  <div class="CartItem-container">
    <router-link to="home"> Hme </router-link>
    <table class="table-order">
      <th>
        <td>
        N
        </td>
        <td>Дата</td>
        <td>Ціна</td>
        <!-- <td>Статус</td> -->
        <td>Детально</td>
        </th>
        <tr v-for="(order, index) in getOrderList" :key="order._id">
            <td>{{index+1}}</td>
            <td>{{order.time}}</td>
            <td>{{order.totalPrice}} грн</td>
            <!-- <td>{{order.status}}</td> -->
            <td>
                <button @click="showOrder(order._id)">Детально</button>
                </td>
        </tr>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "OrderList",

  computed: {
      ...mapGetters("order", ["getOrderList"]),

  },
  methods: {
    ...mapActions("order", ["loadOrders"]),
    showOrder(orderId){
      this.$router.push({ name: "orderItem", params: {id:orderId} });
    }
  },
  async mounted() {
    try {
     await this.loadOrders();
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style lang="scss" scoped>
.table-order td{
    border: solid 2px black;
}
</style>
