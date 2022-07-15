<template>
  <div class="editor_container">
    <div>
      <label>
        Product category
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
        Type
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
      <label>
        Input product title
        <input
          minlength="3"
          maxlength="25"
          required
          v-model="product.title"
          type="text"
        />
      </label>
    </div>
    <div>
      <label>
        Input product price
        <input
          required
          min="1"
          max="100000"
          v-model="product.price"
          type="number"
        />
      </label>
    </div>

    <div>
      <label>
        Input product description
        <input
          minlength="3"
          maxlength="2000"
          v-model="product.description"
          type="text"
        />
      </label>
    </div>
    <div>
      <label>
        Photo
        <input type="file" @input="createLogoImage" />
      </label>
      <img id="img" :src="photoSrc" alt="" />
    </div>
    <div>
      <button @click="add_savePoduct">{{ btn1Text }}</button>
      <button @click="cansel_delPoduct">{{ btn2Text }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { menuListObj } from "@/components/myHeader/setting.js";

export default {
  name: "Editor",
  data() {
    return {
      menuListObj,
      btn1Text: "Add",
      btn2Text: "Cansel",
      product: {},
      rawPhotoData: null,
      // name: null,
      // price: null,
      // description: null,
      productModel: null,
    };
  },

  computed: {
    photoSrc() {
      return (
        this.rawPhotoData || this.product.photo
        // (this.product.photo && this.getImgSrc(this.product.photo))
      );
    },
  },

  methods: {
    ...mapActions("productToRender", [
      "updateProduct",
      "addProduct",
      "delProduct",
      "getProductById",
    ]),

    setProductModel(val) {
      this.productModel = val;
      this.product.category = this.menuListObj[val].category;
    },
    // getImgSrc(photo) {
    //   let binary = Buffer.from(photo.data);
    //   let imgData = new Blob([binary.buffer], {
    //     type: "application/octet-stream",
    //   });
    //   let link = URL.createObjectURL(imgData);
    //   return link;
    // },
    createLogoImage(event) {
      const file = event.target.files[0];
      console.log("file");
      console.log(file);
      let reader = new FileReader();
      const self = this;
      reader.onload = (e) => {
        self.rawPhotoData = e.target.result;
        self.product.photo = file;
      };
      reader.readAsDataURL(file);
    },

    async add_savePoduct() {
      try {
        if (!this.$route.params.id) await this.addProduct(this.product);
        else await this.updateProduct(this.product);
        this.$router.push({ name: "pie" });
      } catch (err) {
        console.log(err);
      }
    },

    cansel_delPoduct() {
      if (this.$route.params.id) {
        this.delProduct(this.$route.params.id);
      } else {
        this.$router.push({ name: "pie" });
      }
      this.$router.push({ name: "pie" });
    },
  },

  async mounted() {
    if (this.$route.params.id) {
      try {
        this.btn1Text = "Save";
        this.btn2Text = "Del";
        this.product = await this.getProductById(this.$route.params.id);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.editor_container {
  margin: 0 auto;
  max-width: 900px;
  background-color: rgb(58, 54, 59);
  color: azure;
  div {
    padding: 1% 3%;
    display: grid;
    grid-auto-flow: column;
    input {
      border: solid 2px blue;
      border-radius: 30px;
      background-color: bisque;
    }
    select {
      border: solid 2px blue;
      border-radius: 30px;
      background-color: bisque;
    }
    img {
      max-width: 250px;
    }
    button {
      background-color: rgb(120, 241, 183);
      color: black;
      padding: 1% 5%;
      border-radius: 15px;
      margin: 0% 5%;
      max-width: 25%;
    }
  }
}
</style>
