<template>
  <div>
    <div>Дата замовлення {{ order.created }}</div>
    <div>Загальна вартість {{ order.totalPrice }} грн.</div>
    <div>Імя замовника {{ order.buyerId && order.buyerId.name }}</div>
    <div>
      Електронна адреса замовника
      {{ order.buyerId && order.buyerId.email }}
    </div>

    <div class="OrderItem-container">
      <div
        class="OrderItem"
        v-for="(value, nameObj, index) in orderItemsList"
        :key="index"
      >
        <div>
          <!-- Номер -->
          {{ nameObj }})
        </div>
        <div>
          <img :src="value.photo" alt="" />
        </div>
        <div>
          Назва
          {{ value.title }}
        </div>
        <div>
          <!-- Ціна одиниці -->
          {{ value.price }} грн
        </div>
        <div>
          <!-- Кількість -->
          {{ value.count }} кг
        </div>
        <div>
          <!-- Вартість -->
          {{ value.price * value.count }} грн
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
  },
  async mounted() {
    if (this.$route.params.id) {
      try {
        this.order = await this.getOrderById(this.$route.params.id);
        console.log("this.order");
        console.log(this.order.buyerId.name);

        for (const item of this.order.orderProductIdArr) {
          let prod = await this.getProductById(item._id);
          prod.count = item.count;
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
.OrderItem-container {
  max-width: 100vw;
  display: grid;
  grid-auto-flow: row;
  // grid-template-columns: 2fr 5fr 2fr 2fr 3fr repeat(2, 2fr);
  // justify-items: center;
  // align-items: center;
  margin: 20px;
  padding: 10px;
  border: 2px solid blue;
  background-color: rgba(24, 181, 164, 0.75);
  .OrderItem {
    display: grid;
    grid-template-columns: 1fr 3fr 5fr repeat(3, 2fr);
    justify-content: space-between;
  }
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
