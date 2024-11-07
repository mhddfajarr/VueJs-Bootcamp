<template>
        
  <div class="p-4">
    <div class="bg-white shadow-md rounded-lg px-6 py-6 border-t-4 border-t-black">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl text-slate-700 font-bold">Account Management</h2>
        <button
          class="bg-slate-800 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
          @click="openAddModal"
        >
          Add new Account
        </button>
      </div>
      <hr class="border-gray-300 border-1 mb-8" />
      <Table
          :tableData="tableData"
          :columns="['NIK', 'Full Name', 'Phone', 'Email', 'Birth Date', 'University Name', 'Degree', 'GPA']"
          Context="employeeAccount"
        />
    </div>
  </div>
</template>
  

<script>
import Table from './Partial/table.vue';
import axios from "axios";

export default {
  data() {
    return {
      isSidebarVisible: true,
      tableData: [],
    //   selectedUniversity: null awdawda,
    //   modalTitle: "Add new university",
    };
  },
  components: {
    Table,
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("https://localhost:7245/api/Account/empData");
        this.tableData = response.data.data; 
      } catch (error) {
        console.error("There was an error fetching data:", error);
      }
    },
  },
  mounted() {
    this.fetchData(); 
  },
};
</script>


<style lang="scss" scoped></style>
