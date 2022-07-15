<template>
  <div class="main-wraper">
    <side-bar />
    <div class="ProductList-wraper">
      <product-item
        v-for="product in getProductList"
        :key="product.id"
        :productItem="product"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductItem from "@/components/ProductList/ProductItem.vue";
import SideBar from "@/components/SideBar";

export default {
  name: "ProductList",
  components: {
    ProductItem,
    SideBar,
  },
  data() {
    return {
      ProductList: [],
    };
  },
  computed: {
    ...mapGetters("productToRender", ["getProductList"]),

    // ProductList() {
    //   this.ProductList = this.getProductList;
    //   return this.ProductList;
    // },
  },

  methods: {
    ...mapActions("productToRender", ["loadProduct"]),
  },

  async mounted() {
    try {
      let category = this.$route.params.category;
      let type = this.$route.params.type;

      await this.loadProduct({ category: category, type: type });
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style lang="scss" scoped>
.main-wraper {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 900px) 1fr;

  .ProductList-wraper {
    display: grid;
    grid-column-start: 2;
    grid-column-end: 3;

    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    justify-content: space-around;
    grid-auto-rows: 1fr;
    column-gap: 20px;
    row-gap: 50px;
  }
}
</style>
