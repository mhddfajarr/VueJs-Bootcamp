<template>
  <div class="p-4">
    <div class="bg-white shadow-md rounded-lg px-6 py-6 border-t-4 border-t-black">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl text-slate-700 font-bold">University Management</h2>
        <button
          class="bg-slate-800 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
          @click="openAddModal"
        >
          Add new university
        </button>
      </div>
      <hr class="border-gray-300 border-1 mb-8" />

      <Modal
        modalId="my_modal_1"
        :title="modalTitle"
        @submit-input="handleSubmitInput"
        :universityData="selectedUniversity"
      />
      <Table
        :tableData="tableData"
        :columns="['Id', 'Name']"
        Context="University"
        @delete-university="handleDeleteUniversity"
        @refresh-data="fetchData"
        @edit-university="handleEdit"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Table from "./Partial/table.vue";
import Modal from "./Partial/modal.vue";

export default {
  data() {
    return {
      isSidebarVisible: true,
      tableData: [],
      selectedUniversity: null,
      modalTitle: "Add new university",
    };
  },
  components: {
    Table,
    Modal,
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    handleEdit(university) {
      this.selectedUniversity = university;
      this.modalTitle = "Edit University";
      this.openModal();
    },
    openAddModal() {
      this.selectedUniversity = {};
      this.modalTitle = "Add new university";
      this.openModal();
    },
    openModal() {
      const modal = document.getElementById("my_modal_1");
      modal.showModal();
    },
    //get data
    async fetchData() {
      try {
        const response = await axios.get("https://localhost:7245/api/University");
        this.tableData = response.data.data
    //     this.tableData = response.data.data.map(item => {
    //     return {
    //       Id: item.id,
    //       universitasName: item.name, 

    //     };
    // });
      } catch (error) {
        console.error("There was an error fetching data:", error);
      }
    },
    //add dan update data yang di triggrer dari modal
    async handleSubmitInput(payload) {
    try {
      if (payload.id) {
        // Update university
        await axios.put(`https://localhost:7245/api/University/${payload.id}`, payload);
      } else {
        // Add new university
        await axios.post("https://localhost:7245/api/University", payload);
      }
      this.fetchData(); // Refresh data setelah submit
    } catch (error) {
      console.error("There was an error submitting the data:", error);
    }
  },
    //delete data
    async handleDeleteUniversity(id) {
    try {
      await axios.delete(`https://localhost:7245/api/University/${id}`);
      this.fetchData(); // Refresh data setelah penghapusan
    } catch (error) {
      console.error("Error deleting university:", error);
    }
  },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
