<template>
  <div>
    <main-master-page>
      <template v-slot:kontent> <cart-list /></template>
    </main-master-page>
  </div>
</template>

<script>
import MainMasterPage from "@/masterPage/MainMasterPage.vue";
import CartList from "@/components/CartList";

export default {
  name: "Cart",

  components: {
    MainMasterPage,
    CartList,
  },
};
</script>

<style lang="scss" scoped></style>
