<template>
  <div class="side-bar">
    <div>
      <label>
        Категорія
        <select
          v-model="product.model"
          @change="setProductModel(product.model)"
        >
          <option
            v-for="(valueObj, nameObj, index) in menuListObj"
            :key="index"
            :value="nameObj"
          >
            {{ valueObj.title }}
          </option>
        </select>
      </label>
    </div>
    <div v-if="menuListObj[productModel] && menuListObj[productModel].submenu">
      <label>
        Тип
        <select v-model="product.type">
          <option
            v-for="submenuItem in menuListObj[productModel].submenu"
            :key="submenuItem.title"
            :value="submenuItem.type"
          >
            {{ submenuItem.title }}
          </option>
        </select>
      </label>
    </div>
    <div>
      <label> Назва <input v-model="product.title" type="text" /> </label>
    </div>
    <div>
      <p>Ціна</p>
    </div>
    <div class="filter-price">
      <label
        >від <input type="number" v-model.number="product.minPrice"
      /></label>
      <label
        >до <input type="number" v-model.number="product.maxPrice"
      /></label>
    </div>

    <div>
      <button @click="onSearch">Пошук</button>
    </div>
    <div>
      <h2>Сортування</h2>
      <div>
        <label>
          <p>За ціною</p>
          <select
            v-model="sortPriceSelectValue"
            @change="sortByPrice(sortPriceSelectValue)"
          >
            <option :value="true">Спадання ціни</option>
            <option :value="false">Зростання ціни</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <p>За назвою</p>
          <select
            v-model="sortTitleSelectValue"
            @change="sortByTitle(sortTitleSelectValue)"
          >
            <option :value="true">Я - А</option>
            <option :value="false">А - Я</option>
          </select>
        </label>
      </div>
      <!-- <button @click="sort()"></button> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { menuListObj } from "@/components/myHeader/setting.js";

export default {
  name: "SideBar",
  data() {
    return {
      menuListObj,
      product: {},
      productModel: null,
      sortPriceSelectValue: null,
      sortTitleSelectValue: null,
    };
  },

  methods: {
    ...mapActions("productToRender", [
      "loadProduct",
      "sortProductPriceAscending",
      "sortProductPriceDescending",
      "sortProductTitleLow",
      "sortProductTitleUp",
    ]),

    setProductModel(val) {
      this.productModel = val;
      this.product.category = this.menuListObj[val].category;
    },

    async onSearch() {
      if (this.product.minPrice > this.product.maxPrice) {
        let min = this.product.maxPrice;
        this.product.minPrice = this.product.minPrice;
        this.product.minPrice = min;
      }
      try {
        await this.loadProduct(this.product);
      } catch (err) {
        console.log(err);
      }
    },

    sortByPrice(value) {
      if (value) {
        this.sortProductPriceDescending();
      } else {
        this.sortProductPriceAscending();
      }
    },
    sortByTitle(value) {
      if (value) {
        this.sortProductTitleLow();
      } else {
        this.sortProductTitleUp();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  // margin: 0 auto;
  max-width: 300px;
  background-color: rgb(58, 54, 59);
  color: azure;
  height: 600px;

  div {
    padding: 3% 0 0 5px;
    display: grid;
    grid-auto-flow: row;
    input {
      border: solid 2px blue;
      border-radius: 3px;
      background-color: bisque;
    }
    select {
      border: solid 2px blue;
      border-radius: 3px;
      background-color: bisque;
      width: 75%;
    }

    button {
      background-color: rgb(120, 241, 183);
      color: black;
      padding: 1% 5%;
      border-radius: 15px;
      margin: 0 auto;
      max-width: 50%;
    }
  }
  .filter-price {
    grid-auto-flow: column;

    padding: 20px 0 0 0;
    input {
      margin: 0 auto;
      width: 75px;
    }
  }
  p {
    margin: 0 auto;
  }
}
</style>
