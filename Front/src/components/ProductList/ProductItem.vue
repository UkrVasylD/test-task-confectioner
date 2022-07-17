<template>
  <div class="productItem-container">
    <div class="img" @click="goToRoutName(productItem._id)">
      <img :src="productItem.photo" alt="" />
    </div>
    <div class="product-name">
      {{ productItem.title }}
    </div>
    <div class="product-price">{{ productItem.price }} грн.</div>
    <div @click="add_delToFavorite(productItem)">
      Add to favorite
      <div
        class="favorite-circle-gray"
        :class="{ 'favorite-circle-green': isActive }"
      ></div>
    </div>
    <div>
      <button @click="addToCart(productItem)">Add to cart</button>
      <button v-if="getAccessStatus" @click="edit(productItem._id)">
        Edit
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductItem",

  props: {
    productItem: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      // isActive: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["getAccessStatus"]),
    ...mapGetters("favorite", ["getFavoriteList"]),

    isActive() {
      let favoriteItem = this.getFavoriteList.find(
        (item) => item.productId === this.productItem._id
      );
      if (favoriteItem) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions("cart", ["addToCart"]),
    ...mapActions("favorite", ["addToFavorite", "del"]),

    add_delToFavorite(productItem) {
      const indexItem = this.getFavoriteList.find(
        (item) => item.productId === productItem._id
      );
      if (indexItem) {
        this.del(productItem._id);
      } else {
        this.addToFavorite(productItem);
      }
    },

    edit(id) {
      this.$router.push({ name: "editor", params: { id: id } });
    },
    goToRoutName(prodId) {
      this.$router.push({ name: "productItem", params: { id: prodId } });
    },
  },
};
</script>

<style lang="scss" scoped>
.productItem-container {
  display: grid;
  grid-template: auto 1fr minmax(40px, auto) minmax(40px, auto) / 1fr;
  margin: 2%;
  padding: 2% 2% 5% 2%;
  border: 2px solid blue;
  border-radius: 5%;
  background-color: beige;
  max-width: 250px;
  .favorite-circle-gray {
    display: inline-block;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: gray;
  }
  .favorite-circle-green {
    display: inline-block;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: green;
  }
  button {
    background-color: rgb(214, 241, 191);
    margin: 0 5%;
    padding: 1% 5%;
    border-radius: 15px;
  }
  .img {
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
      max-width: 250px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
        width: 230px;
      }
    }
  }
  .product-name {
    padding: 0 5%;
    font-size: 120%;
  }
  .product-price {
    padding: 0 5%;
    font-size: 120%;
    color: rgb(64, 80, 61);
  }
}
</style>
