<template>
  <div class="wraper_container">
    <div class="header">
      <my-header />
    </div>
    <popUp v-if="getPopUpVisible" />
    <div class="kontent">
      <div class="loader" v-if="isLoading"></div>
      <!-- <div v-if="isLoading">Loading......</div> -->
      <div v-if="isError">Error!!!!</div>
      <slot name="kontent"> </slot>
    </div>
    <button></button>
    <div class="footer">
      <my-footer />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import myFooter from "@/components/myFooter.vue";
import myHeader from "@/components/myHeader";
import popUp from "@/components/popUp.vue";

export default {
  name: "MainMasterPage",

  components: {
    myFooter,
    myHeader,
    popUp,
  },
  computed: {
    ...mapGetters("popUp", ["getPopUpVisible"]),
    ...mapGetters("productToRender", ["isLoading", "isError"]),
  },
};
</script>

<style lang="scss" scoped>
.wraper_container {
  min-height: 100vh;
  display: grid;
  grid-template: minmax(100px, auto) 1fr minmax(100px, auto) / 1fr;
  background: url("@/assets/bg_repeat.jpg") repeat;
}
.loader {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
