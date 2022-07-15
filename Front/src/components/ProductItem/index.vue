<template>
  <div class="productItem-wraper">
    <div class="img">
      <img :src="productItem.photo" alt="" />
    </div>
    <div class="product-column2">
      <div class="product-name">
        {{ productItem.title }}
      </div>
      <div class="product-price">
        <p>{{ productItem.price }} грн.</p>
      </div>
      <div class="btn">
        <button @click="addToCart(productItem)">Добавити</button>
      </div>
    </div>
    <p>{{ productItem.description }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductItem",
  data() {
    return {
      productItem: {},
    };
  },
  computed: {
    ...mapGetters("auth", ["getAccessStatus"]),
  },
  methods: {
    ...mapActions("cart", ["addToCart"]),
    ...mapActions("productToRender", ["getProductById"]),
  },
  async mounted() {
    try {
      let prodId = this.$route.params.id;
      this.productItem = await this.getProductById(prodId);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style lang="scss" scoped>
.productItem-wraper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  // grid-template: auto 1fr minmax(40px, auto) minmax(40px, auto) / 1fr;
  margin: 2%;
  padding: 2% 2% 5% 2%;
  border: 2px solid blue;
  border-radius: 5%;
  background-color: rgb(245, 245, 235);

  .img {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 2;

    position: relative;
    padding: 0px 0px 90% 0px;
    margin: 10px 5px 20px 5px;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      // max-width: 250px;
      width: 40vw;
    }
  }
  .product-column2 {
    display: grid;
    grid-column-start: 2;
    grid-column-end: 3;
    // justify-content: center;
    .product-name {
      padding: 20% 0 0 0;
      font-size: 120%;
      margin: 0 auto;
    }
    .product-price {
      padding: 0 5%;
      font-size: 120%;
      color: rgb(64, 80, 61);
      margin: 0 auto;
    }
    .btn {
      margin: 0 auto;
    }
    button {
      background-color: rgb(214, 241, 191);
      margin: 0 5%;
      padding: 1% 5%;
      border-radius: 15px;
    }
  }
  p {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
</style>
