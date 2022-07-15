<template>
  <div>
    <!-- Home -->
    <main-master-page>
      <template v-slot:kontent> <myHomeKontent /></template>
    </main-master-page>
  </div>
</template>

<script>
import MainMasterPage from "@/masterPage/MainMasterPage.vue";
import myHomeKontent from "@/components/myHomeKontent.vue";

export default {
  name: "Home",

  components: {
    MainMasterPage,
    myHomeKontent,
  },
};
</script>

<style lang="scss" scoped></style>
