<template>
  <div class="cart-wraper">
    <div class="cart-item">
      <cart-item
        v-for="cartItem in getCartList"
        :key="cartItem.id"
        :cartItem="cartItem"
      />
      <div class="total-price">Total price = {{ getTotalPrice }} грн.</div>

      <button :disabled="!getCartList.length" @click="order">Замовити</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartItem from "@/components/CartList/CartItem.vue";

export default {
  name: "CartList",
  components: {
    CartItem,
  },

  computed: {
    ...mapGetters("cart", ["getCartList", "getTotalPrice"]),
  },
  methods: {
    ...mapActions("order", ["addOrder"]),

    async order() {
      try {
        let prodIdArr = [];
        let prodCountArr = [];
        for (let index = 0; index < this.getCartList.length; index++) {
          const element = this.getCartList[index].productId;
          const coutn = this.getCartList[index].productId.count;
          prodIdArr.push(element);
          prodCountArr.push(coutn);
        }
        let orderData = {
          order: prodIdArr,
          // time: new Date(),
          totalPrice: this.getTotalPrice,
        };
        console.log(orderData.order);
        await this.addOrder(orderData);
        alert(`Ваше замовлення на суму ${this.getTotalPrice} грн прийняте`);
        this.$router.push({ name: "product" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-wraper {
  display: grid;
  grid-template-columns: 1fr minmax(650px, 75vh) 1fr;
  min-height: 100%;
  // background-color: rgba(99, 143, 139, 0.75);

  .cart-item {
    grid-column-start: 2;
    grid-column-end: 3;
    background-color: rgba(99, 143, 139, 0.75);

    .total-price {
      font-size: 200%;
      background-color: rgba(21, 143, 131, 0.75);
      border-radius: 5px;
      padding-left: 15px;
    }
  }
}
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}
</style>
