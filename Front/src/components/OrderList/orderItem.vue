<template>
  <div class="CartItem-container">
    <div class="CartItem-container">
      <div>
        <!-- <img :src="cartItem.productPhoto" alt="" /> -->
      </div>
      <div>
        {{ order.time }}
      </div>
      <div>{{ order.totalPrice }} грн.</div>
      <div v-for="(value, nameObj, index) in orderItemsList" :key="index">
        <div>
          {{ value }}
        </div>
        <div>
          {{ nameObj }}
        </div>
        <div>
          {{ value.price }}
        </div>
        <div>
          {{ value.title }}
        </div>
      </div>
      <div>
        <input
          class="input_weight"
          v-model="order"
          type="number"
          min="1"
          max="99"
        />
        кг
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "OrderItem",

  data() {
    return {
      order: {},
      orderItemsList: [],
    };
  },
  computed: {
    ...mapGetters("order", ["getOrderList"]),
  },
  methods: {
    ...mapActions("order", ["getOrderById"]),
    ...mapActions("productToRender", ["getProductById"]),

    showOrder(prodId_prodCount_obj_Arr) {},
  },
  async mounted() {
    if (this.$route.params.id) {
      try {
        this.order = await this.getOrderById(this.$route.params.id);
      } catch (err) {
        console.log(err);
      }

      try {
        // console.log("this.order.orderProductIdArr.length");
        // console.log(this.order.orderProductIdArr[0].length);
        // let a = this.order.orderProductIdArr[0].split(",");
        // console.log(a);
        this.order.orderProductIdArr[0].split(",").forEach((element) => {
          console.log("element");
          console.log(element);

          let prod = this.getProductById(element);
          console.log("prod");
          console.log(prod);
          this.orderItemsList.push(prod);
          console.log("this.orderItems");
          console.log(this.orderItemsList);
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.table-order td {
  border: solid 2px black;
}
</style>
