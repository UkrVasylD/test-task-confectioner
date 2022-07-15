<template>
  <div>
    <main-master-page>
      <template v-slot:kontent> <product-list /></template>
    </main-master-page>
  </div>
</template>

<script>
import MainMasterPage from "@/masterPage/MainMasterPage.vue";
import ProductList from "@/components/ProductList";

export default {
  name: "Product",

  components: {
    MainMasterPage,
    ProductList,
  },
};
</script>

<style lang="scss" scoped></style>
