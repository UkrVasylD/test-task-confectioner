<template>
  <div>
    <!-- <main-master-page> -->
    <!-- <template v-slot:kontent>  -->
    <grid-practic />
    <!-- </template> -->
    <!-- </main-master-page> -->
  </div>
</template>

<script>
// import MainMasterPage from "@/masterPage/MainMasterPage.vue";
import gridPractic from "@//components/gridPractic.vue";

export default {
  name: "AboutConfectioner",

  components: {
    // MainMasterPage,
    gridPractic,
  },
};
</script>

<style lang="scss" scoped></style>
