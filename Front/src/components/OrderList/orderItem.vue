<template>
  <div>
    <div>{{ order.totalPrice }} грн.</div>

    <div class="CartItem-container">
      <div v-for="(value, nameObj, index) in orderItemsList" :key="index">
        <div>
          <img :src="value.photo" alt="" />
        </div>
        <div>
          {{ value.price }}
        </div>
        <div>
          {{ nameObj }}
        </div>

        <div>
          {{ value.title }}
        </div>
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
        console.log("this.order.orderProductIdArr");
        console.log(this.order.orderProductIdArr);

        for (const item of this.order.orderProductIdArr) {
          let prod = await this.getProductById(item._id);

          this.orderItemsList.push(prod);
        }
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
.CartItem-container {
  max-width: 75vw;
  display: grid;
  // grid-auto-flow: column;
  grid-template-columns: 2fr 5fr 2fr 2fr 3fr repeat(2, 2fr);
  justify-items: center;
  align-items: center;
  margin: 20px;
  padding: 10px;
  border: 2px solid blue;
  background-color: rgba(24, 181, 164, 0.75);
  .input_weight {
    width: 50px;
    background-color: rgba(21, 143, 131, 0.75);
    border-radius: 25%;
    padding-left: 5px;
    text-align: center;
  }
  img {
    width: 50px;
  }
}
</style>
