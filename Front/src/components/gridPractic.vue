<template>
  <div class="container">
    <div class="item-1">1</div>
    <div class="item-2">2</div>
    <div class="item-3">3</div>
    <!-- <div class="item-4">4</div>
    <div class="item-5">5</div>
    <div class="item-6">6</div> -->
  </div>
</template>

<script>
export default {
  name: "gridPractic",
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: grid;

  //   grid-template-columns: 1fr 30%;
  grid-template: minmax(150px, auto) 1fr minmax(100px, auto) / 1fr;
}
.item-1 {
  // grid-area: item-1;
  // max-width: 50%;
  background-color: aquamarine;
  margin: 10px;
  //   height: 1fr;
}
.item-2 {
  background-color: blue;
  margin: 10px;

  //   height: 8fr;
  // grid-area: item-2;
}
.item-3 {
  background-color: rgb(34, 255, 0);
  margin: 10px;
  // grid-area: item-3;
}
// .item-4 {
//   background-color: rgb(34, 255, 0);
//   max-width: 50%;

//   margin: 10px;
//   grid-area: item-4;
// }
// .item-5 {
//   background-color: rgb(34, 255, 0);
//   margin: 10px;
//   grid-area: item-5;
// }
// .item-6 {
//   background-color: rgb(34, 255, 0);
//   margin: 10px;
//   grid-area: item-6;
// }
</style>
