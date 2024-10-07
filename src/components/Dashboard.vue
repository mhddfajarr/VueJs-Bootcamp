<template>
  <div>
    <p class="text-xl text-green-500">ini dashboard</p>
    <p>{{ myData }}</p>
    <p><slot></slot></p>
  </div>

  <div v-if="stateShowModal">
    <modal />
  </div>
  <div v-else>
    <p>Tidak ada modal</p>
  </div>

  <div class="m-4">
    <button
      class="px-4 py-2 rounded-lg bg-black text-white"
      :class="stateShowModal ? 'loading loading-bars loading-lg' : ''"
      @click="showModal()"
    >
      contoh
    </button>
  </div>
  <div class="p-9">
    <table class="min-w-full border-collapse border border-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2">No</th>
          <th class="border border-gray-300 px-4 py-2">Monawdawth</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white hover:bg-gray-100"
          v-for="(Day, index) in Days"
          :key="index"
        >
          <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ Day }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="p-9">
    <table class="min-w-full border-collapse border border-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2">No</th>
          <th class="border border-gray-300 px-4 py-2">Monawdawth</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white hover:bg-gray-100"
          v-for="(dataMount, index) in dataMounts"
          :key="index"
        >
          <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ dataMount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>{{ Days }}</p>
</template>

<script>
import { ref } from "vue";
import modal from "./dashboard/modal.vue";
export default {
  props: ["Days"],
  components: {
    modal,
  },
  setup() {
    const myData = "ini  dari mydata";
    const stateShowModal = ref(false);
    let dataMounts = ["January", "February", "Mei", "Juni", "July"];
    return { myData, stateShowModal, dataMounts };
  },
  methods: {
    showModal() {
      console.log(this.stateShowModal);
      this.stateShowModal = !this.stateShowModal;
    },
  },
};
</script>

<style lang="scss" scoped></style>
