<template>
  <div class="Submenu-container">
    <div></div>
    <div class="Submenu-column2">
      <div v-for="(item, index) in submenu" :key="index">
        <p
          @click="goToRoutName(route, category, item.type)"
          @mouseover="showImage(item.img)"
        >
          {{ item.title }}
        </p>
      </div>
    </div>

    <div class="Submenu-column4">
      <img :src="subImage" alt="" v-if="subImage" />
      <img :src="headImg" alt="" v-if="!subImage" />
    </div>
    <div>
      <!-- {{ showImage }} -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Submenu",
  data() {
    return {
      subImage: null,
    };
  },

  props: {
    submenu: {
      type: Object,
      default: () => ({}),
    },
    headImg: {
      type: Object,
      default: () => ({}),
    },
    category: {
      type: String,
    },
    route: {
      type: String,
    },
  },

  methods: {
    ...mapActions("productToRender", ["loadProduct"]),

    async goToRoutName(routName, category, type) {
      this.$router.push({
        name: routName,
        params: { category: category, type: type },
      });
      await this.loadProduct({ category: category, type: type });
    },

    showImage(img) {
      return (this.subImage = img);
    },
  },
};
</script>

<style lang="scss" scoped>
.Submenu-container {
  max-width: 900px;
  min-width: 65vw;
  display: grid;
  grid-template-columns: 0.1fr 1fr 0.5fr 1fr 0.1fr;
  justify-items: center;
  .Submenu-column2 {
    grid-column-start: 2;
    grid-column-end: 3;
    font-size: 150%;
  }
  .Submenu-column4 {
    grid-column-start: 4;
    grid-column-end: 5;
    img {
      max-width: 100%;
      height: 350px;
    }
  }
  .Submenu-column2 p {
    &:hover {
      color: rgb(60, 82, 60);
      cursor: pointer;
    }
  }
}
</style>
