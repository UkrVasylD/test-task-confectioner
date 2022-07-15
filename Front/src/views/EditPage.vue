<template>
  <div>
    <main-master-page>
      <template v-slot:kontent> <editor /></template>
    </main-master-page>
  </div>
</template>

<script>
import MainMasterPage from "@/masterPage/MainMasterPage.vue";
import Editor from "@/components/Editor.vue";

export default {
  name: "EditPage",

  components: {
    MainMasterPage,
    Editor,
  },
};
</script>

<style lang="scss" scoped></style>
