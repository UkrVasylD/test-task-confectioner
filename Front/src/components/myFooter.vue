<template>
  <div class="container">
    <div class="order">
      <p>
        Замовлення приймаються за телефоном <br />
        067 409 72 77 з 9.00 до 18.00
      </p>
      <p>
        Зробіть Ваше замовлення завчасно, за 2-3 дні до бажаної дати отримання.
      </p>
    </div>
    <div class="about">
      <h3>ПРО BAKERSTREET:</h3>
      <p>ІНФОРМАЦІЯ ПРО КОМПАНІЮ</p>
      <p>ПОЛІТИКА КОМПАНІЇ</p>
      <p>ОФЕРТА</p>
    </div>
    <div class="buyers">
      <h3>ПОКУПЦЯМ:</h3>
      <p>КОНТАКТИ</p>
      <p>ЗАПИТАННЯ</p>
      <p @click="changePopUpVisible"><a> ЗВОРОТНІЙ ЗВ"ЯЗОК</a></p>
    </div>

    <div class="social">
      <h3>Social</h3>
      <div class="social-grid-container">
        <div class="social_img">
          <a
            href="https://www.facebook.com/profile.php?id=100020964107595"
            target="_blank"
          >
            <img
              :src="require('@/assets/Icons/facebook-icon.svg')"
              alt="No photo"
            />
            <span>facebook </span>
          </a>
        </div>
        <div class="social_img">
          <img
            :src="require('@/assets/Icons/instagram-icon.svg')"
            alt="No photo"
          />
          <span>instagram </span>
        </div>
        <div class="social_img">
          <img
            :src="require('@/assets/Icons/twitter-icon.svg')"
            alt="No photo"
          />
          <span>twitter </span>
        </div>
      </div>
    </div>

    <div class="about">
      Підписатись на новини
      <br />
      <label>
        <input type="text" placeholder="Enter your email adress" />
      </label>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "myFooter",

  methods: {
    ...mapActions("popUp", ["changePopUpVisible"]),
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: rgb(208, 208, 187);
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  .social-grid-container {
    display: grid;
    grid-auto-flow: row;
    // .social_img > span {
    //   vertical-align: middle;
    //   font-size: 120%;
    // }
  }
  //
}
</style>
