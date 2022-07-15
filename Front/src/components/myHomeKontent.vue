<template>
  <div>
    <div class="carousel">
      <v-carousel hide-delimiters cycle :interval="interval">
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          interval="2000"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </div>
    <section class="content__gallery gallery">
      <h2 class="gallery__title">Галерея</h2>
      <div class="gallery__items">
        <div class="gallery__item gallery__item_big">
          <img :src="require('@/assets/Image/1.jpg')" alt="" />
        </div>
        <div class="gallery__item">
          <img :src="require('@/assets/Image/2.jpg')" alt="" />
        </div>
        <div class="gallery__item">
          <img :src="require('@/assets/Image/3.jpg')" alt="" />
        </div>
        <div class="gallery__item">
          <img :src="require('@/assets/Image/4.jpg')" alt="" />
        </div>
        <div class="gallery__item">
          <img :src="require('@/assets/Image/5.jpg')" alt="" />
        </div>
        <div class="gallery__item">
          <img :src="require('@/assets/Image/6.jpg')" alt="" />
        </div>
        <div class="gallery__item">
          <img :src="require('@/assets/Image/7.jpg')" alt="" />
        </div>
        <div class="gallery__item gallery__item_big">
          <img :src="require('@/assets/Image/8.jpg')" alt="" />
        </div>
        <div class="gallery__item">
          <img :src="require('@/assets/Image/9.jpg')" alt="" />
        </div>
        <div class="gallery__item">
          <img :src="require('@/assets/Image/10.jpg')" alt="" />
        </div>
        <div class="gallery__item">
          <img :src="require('@/assets/Image/11.jpg')" alt="" />
        </div>
        <div class="gallery__item">
          <img :src="require('@/assets/Image/12.jpg')" alt="" />
        </div>
        <div class="gallery__item">
          <img :src="require('@/assets/Image/13.jpg')" alt="" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "myHomeKontent",
  data() {
    return {
      interval: 5000,
      items: [
        {
          src: "https://images.squarespace-cdn.com/content/v1/56b25779e32140ec4133a635/1628688275216-BCFB0HFGKW724M6652JE/Anton_amp_amp_Ksyusha_wed-851.jpg?format=2500w",
        },
        {
          src: "https://klike.net/uploads/posts/2019-06/1560061011_1.jpg",
        },
        {
          src: "https://images.squarespace-cdn.com/content/v1/56b25779e32140ec4133a635/1630575153524-FYJJ58XO51580O6HQXGR/image-asset.jpeg?format=500w",
        },
        {
          src: "https://images.squarespace-cdn.com/content/v1/56b25779e32140ec4133a635/1630059535890-RKSYFP3I4PCBOM6A68AN/image-asset.jpeg?format=500w",
        },
        {
          src: "https://images.squarespace-cdn.com/content/v1/56b25779e32140ec4133a635/1629998604106-YUFI323YY4M7O7RCQQ9R/image-asset.jpeg?format=500w",
        },
        {
          src: "https://images.squarespace-cdn.com/content/v1/56b25779e32140ec4133a635/1629887771776-G7J1KPJ9VF6WY1GZMV18/image-asset.jpeg?format=500w",
        },
        {
          src: "https://images.squarespace-cdn.com/content/v1/56b25779e32140ec4133a635/1629799579112-C0VN3MGE75MSE0GV295H/image-asset.jpeg?format=500w",
        },
        {
          src: "https://images.squarespace-cdn.com/content/v1/56b25779e32140ec4133a635/1629799579112-IXXEPCMHXQPEOZN8A4BY/image-asset.jpeg?format=500w",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.carousel {
  max-width: 100%;
  margin: 0 auto;
  background-color: rgb(219, 240, 233);
}
.gallery {
  display: grid;
  grid-template-rows: minmax(50px, auto) 1fr;
  grid-template-columns: 1fr minmax(auto, 1100px) 1fr;
}
.gallery__title {
  grid-column-start: 2;
  grid-column-end: 3;
  text-align: center;
  font-size: 300%;
  color: red;
  padding-top: 2vh;
  background-color: rgb(135, 127, 116, 0.7);
}
.gallery__items {
  display: grid;
  grid-column-start: 2;
  grid-column-end: 3;

  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}
.gallery__item {
  img {
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.gallery__item_big {
  grid-column: span 2;
  grid-row: span 2;
}
</style>
