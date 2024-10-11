<template>
  <div >
  <RouterView/>
  </div>
</template>
<script>
import Dashboard from "./components/Pages/Dashboard.vue";
import login from "./components/Auth/login.vue";
import { RouterView } from "vue-router";

export default {
  components: {
    Dashboard, login, RouterView
  },
  setup() {
    const Days = [
      "senin",
      "selasa",
      "rabu",
      "kamis",
      "jumat",
      "sabtu",
      "minggu",
    ];
    return {Days};
  },
};
</script>

<style lang="scss" scoped></style>
