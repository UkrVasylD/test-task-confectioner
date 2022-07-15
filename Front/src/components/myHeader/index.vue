<template>
  <div class="container">
    <div class="head-titel">
      <div v-if="getAccessStatus" class="btn-order-list">
        <button @click="onClick2">Список замовлень</button>
      </div>
      <div class="head-title-text">Яна кондитер</div>
      <div class="login">
        <button @click="onClick3">Log in</button>

        <!-- <login /> -->
        <button @click="logout()">Log out</button>
        <!-- <button @click="onClick">Sign up</button> -->
      </div>
    </div>
    <div class="navigation">
      <div class="navigation-list">
        <div
          class="navigation-item"
          v-for="(value, nameObj, index) in menuListObj"
          :key="index"
          @click="goToRoutName(value.route, value.category)"
          @mouseover="
            onMouseover(value.submenu, value.img, value.category, value.route)
          "
        >
          {{ value.title }}
        </div>
        <submenu
          class="submenu"
          v-if="showSubmenu"
          :submenu="submenuData"
          :headImg="headImg"
          :category="category"
          :route="route"
          @mouseleave="onMouseleave"
        />
      </div>
      <div class="menu-rigth-column">
        <div class="navigation-item phone_svg" @click="changePopUpVisible">
          <img
            :src="require('@/assets/Icons/phone-icon.svg')"
            alt=""
            max-width="50px"
          />
        </div>
        <div class="navigation-item" @click="goToRoutName('cart')">
          <!-- Cart -->
          <img :src="require('@/assets/Icons/cart-icon.svg')" alt="" />
          {{ getTotalPrice }} грн.
        </div>
        <div
          class="editor"
          v-if="getAccessStatus"
          @click="goToRoutName('editor')"
        >
          Add
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { menuListObj } from "./setting.js";
import Submenu from "@/components/myHeader/Submenu";
import Login from "@/components/Login";

export default {
  name: "myHeader",

  components: {
    Submenu,
    Login,
  },

  data() {
    return {
      menuListObj,
      submenuData: null,
      headImg: null,
      showSubmenu: false,
      category: null,
      route: null,
    };
  },

  computed: {
    ...mapGetters("cart", ["getTotalPrice"]),
    ...mapGetters("auth", ["getAccessStatus"]),
  },

  methods: {
    ...mapActions("popUp", ["changePopUpVisible"]),
    ...mapActions("productToRender", ["loadProduct"]),
    ...mapActions("auth", ["logout"]),

    onMouseleave() {
      if (this.showSubmenu === true) {
        this.showSubmenu = false;
      }
    },

    onMouseover(submenuItem, headImg, category, route) {
      if ((submenuItem, headImg)) {
        this.showSubmenu = true;
      }

      this.submenuData = submenuItem;
      this.headImg = headImg;
      this.category = category;
      this.route = route;
    },

    async goToRoutName(routName, category) {
      this.$router.push({ name: routName, params: { category: category } });
      await this.loadProduct({ category });
    },
    // onClick() {
    //   this.$router.push({ name: "signup" });
    // },
    onClick2() {
      this.$router.push({ name: "order" });
    },
    onClick3() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: rgb(172, 146, 185);
  color: azure;

  .head-titel {
    height: 108px;
    text-align: center;
    font-size: 300%;
    padding: 30px 0;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr minmax(auto, 800px) 1fr;
    .head-title-text {
      display: grid;
      grid-column-start: 2;
      grid-column-end: 3;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    }
    .login {
      display: grid;
      grid-column-start: 3;
      grid-column-end: 4;
      justify-content: end;
      margin: 0 10% 0 0;
      font-size: 20px;
      button {
        background-color: #04aa6d;
        color: white;
        padding: 2px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
      }
    }
  }
  .navigation {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr minmax(auto, 800px) 1fr 1fr;

    .navigation-list {
      display: grid;
      grid-auto-flow: column;
      justify-items: center;
      grid-template-rows: 1fr;
      grid-column-start: 2;
      // grid-auto-columns: ;
      .space-end {
        grid-column-end: end;
      }
    }
    .menu-rigth-column {
      display: grid;
      grid-auto-flow: column;
      justify-items: center;
      .phone_svg {
        min-width: 20px;
        max-width: 30px;
      }
    }
  }
  .navigation-item {
    &:hover {
      color: rgb(60, 82, 60);
      cursor: pointer;
    }
  }
}
.submenu {
  position: absolute;
  z-index: 1;
  top: 138px;
  background-color: rgb(172, 146, 185, 0.9);
  color: azure;
}
.editor {
  &:hover {
    color: rgb(60, 82, 60);
    cursor: pointer;
  }
}
.btn-order-list {
  background-color: #04aa6d;
  color: white;
  padding: 2px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  height: 40px;
  font-size: 14px;
}
</style>
