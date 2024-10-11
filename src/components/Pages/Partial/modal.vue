<template>
  <dialog :id="modalId" class="modal" @click.self="closeModal">
    <div class="modal-box bg-white">
      <h3 class="text-lg text-black font-bold mb-3">{{ title }}</h3>

      <input
        v-model="inputText"
        type="text"
        placeholder="Enter your text here"
        class="input input-bordered w-full my-2 bg-white text-black"
      />
      <p class="text-red-500 text-xs mt-2 ml-1">This field is required</p>

      <div class="modal-action flex justify-end space-x-2">
        <button
          class="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
          @click="closeModal"
        >
          Close
        </button>
        <button
          class="px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
          @click="submitInput"
        >
          Save
        </button>
      </div>
    </div>
  </dialog>
</template>

<script>

export default {
  props: {
    modalId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    universityData: {
      type: Object,
      default: () => ({}), // Tambahkan prop untuk data universitas
    },
  },
  data() {
    return {
      inputText: "",
    };
  },
  watch: {
    universityData: {
      immediate: true,
      handler(newVal) {
        this.inputText = newVal && newVal.name ? newVal.name : ""; // Cek jika newVal ada
      },
    },
  },

  methods: {
    closeModal() {
      const modal = document.getElementById(this.modalId);
      modal.close();
    },
    submitInput() {
    const payload = {
      id: this.universityData.id, 
      name: this.inputText,
    };
    
    this.$emit('submit-input', payload);
    this.closeModal();
  },
  },
};
</script>

<style scoped>
.modal {
  /* Custom styles for your modal */
}
</style>
