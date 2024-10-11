<template>
  <div>
    <!-- Flex container for search and items per page selection -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <label for="entries" class="mr-2 text-sm text-gray-700">Show:</label>
        <select
          id="entries"
          v-model="itemsPerPage"
          @change="changeItemsPerPage"
          class="select select-bordered text-black bg-white select-sm w-full max-w-xs"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div class="flex items-center">
        <label for="search" class="mr-2 text-sm text-gray-700">Search:</label>
        <input
          id="search"
          type="text"
          v-model="searchQuery"
          @input="onSearchQueryChange"
          placeholder="Search account..."
          class="input input-bordered input-sm text-black text-sm border bg-white border-gray-300 rounded px-4 py-2 max-w-xs"
        />
      </div>
    </div>

    <!-- Table Content -->
    <div class="overflow-x-auto">
    <table class="w-full table-auto  bg-white border border-gray-200 rounded-lg text-sm">
      <thead>
        <tr class="bg-white border-b-2 border-gray-300">
          <th
            class="px-4 py-2 text-left border-r border-gray-300 text-black font-bold"
          >
            No
          </th>
          <th
            v-for="(column, key) in columns"
            :key="key"
            class="px-4 py-2 text-left text-sm border-r border-gray-300 text-black font-bold"
          >
            {{ column }}
          </th>
          <th
            v-if="Context == 'University'"
            class="px-4 py-2 text-left text-black font-bold"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="paginatedTableData.length === 0">
          <td colspan="100%" class="px-4 py-2 text-center text-gray-700">
            No data found.
          </td>
        </tr>
        <tr
          v-for="(item, index) in paginatedTableData"
          :key="index"
          class="bg-gray-50 even:bg-gray-200 border-b border-gray-200"
        >
          <td class="px-4 py-2 text-gray-700 border-r border-gray-300">
            {{ (currentPage - 1) * itemsPerPage + index + 1 }}
          </td>
          <td
            v-for="(value, key) in item"
            :key="key"
            class="px-4 py-2 text-gray-700 border-r border-gray-300"
          >
            {{ value }}
          </td>
          <td v-if="Context == 'University'" class="px-4 py-2">
            <button
              @click="editEntry(item)"
              class="px-2 py-1 text-white text-sm bg-yellow-400 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              @click="deleteEntry(item.id)"
              class="px-2 py-1 text-white text-sm bg-red-500 rounded hover:bg-red-600 ml-2"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <!-- Pagination Controls -->
    <div
      class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{
            (currentPage - 1) * itemsPerPage + 1
          }}</span>
          to
          <span class="font-medium">{{
            Math.min(currentPage * itemsPerPage, filteredTableData.length)
          }}</span>
          of
          <span class="font-medium">{{ filteredTableData.length }}</span>
          results
        </p>
      </div>
      <nav
        class="isolate inline-flex -space-x-px rounded-md"
        aria-label="Pagination"
      >
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none cursor-pointer"
        >
          <span class="sr-only">Previous</span>
          <svg
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <span
          v-for="page in displayPages"
          :key="page"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer"
          :class="
            currentPage === page
              ? 'bg-gray-300 border-gray-300 text-black'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-100'
          "
          @click="selectPage(page)"
        >
          {{ page }}
        </span>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none cursor-pointer"
        >
          <span class="sr-only">Next</span>
          <svg
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8.22 14.78a.75.75 0 0 1 0-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    tableData: Array,
    Context: String,
    columns: Array,
  },
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    filteredTableData() {
      if (this.searchQuery) {
        return this.tableData.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      }
      return this.tableData;
    },
    paginatedTableData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredTableData.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    totalPages() {
      return Math.ceil(this.filteredTableData.length / this.itemsPerPage);
    },
    displayPages() {
      const pages = [];
      const total = this.totalPages;

      if (total <= 5) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);

        if (this.currentPage > 3) {
          pages.push("...");
        }

        const startPage = Math.max(2, this.currentPage - 1);
        const endPage = Math.min(total - 1, this.currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        if (this.currentPage < total - 2) {
          pages.push("...");
        }

        pages.push(total);
      }
      return pages;
    },
  },
  methods: {
    onSearchQueryChange() {
      this.currentPage = 1;
    },
    changeItemsPerPage() {
      this.currentPage = 1;
    },
    selectPage(page) {
      this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    editEntry(item) {
      console.log(item);
      this.$emit("edit-university", item);
    },
    deleteEntry(id) {
      console.log(id);
      this.$emit("delete-university", id);
    },
  },
};
</script>
