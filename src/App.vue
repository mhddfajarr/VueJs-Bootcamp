<template>
  <div >
    <!-- <Dashboard :Days="Days">
      <p>Ini dari App.vue</p>
    </Dashboard> -->
    <login/>
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import login from "./components/Auth/login.vue";

export default {
  components: {
    Dashboard, login
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
