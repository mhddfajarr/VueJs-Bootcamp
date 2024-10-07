<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="w-full max-w-sm bg-white rounded-lg shadow-md p-12">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-center text-gray-700 mb-0">
          Log in to Your Account hehe
        </h2>
      </div>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="block text-gray-700 text-md font-bold mb-2" for="email">
            Email
          </label>
          <div class="input input-bordered flex items-center gap-2 bg-white">
            <input
              type="email"
              id="email"
              class="grow text-gray-600"
              v-model="email"
              placeholder="Enter your email"
            />
            <i class="fas fa-envelope h-4 w-4 text-gray-400"></i>
          </div>
        </div>
        <div class="mb-11">
          <label
            class="block text-gray-700 text-md font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <div class="input input-bordered flex items-center gap-2 bg-white">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="grow text-gray-600"
              v-model="password"
              placeholder="Enter your password"
            />
            <i
              :class="
                showPassword
                  ? 'fas fa-eye h-4 w-4 text-gray-400 cursor-pointer'
                  : 'fas fa-eye-slash h-4 w-4 text-gray-400 cursor-pointer'
              "
              @click="togglePassword"
            >
            </i>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center">
          <button
            v-if="!buttonLogin"
            type="submit"
            class="w-full btn bg-slate-950 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            @click="clickButton()"
          >
            Login
          </button>
          <span
            :class="
              buttonLogin ? 'loading loading-dots loading-lg text-neutral' : ''
            "
          ></span>
          <!-- <a v-if="!buttonLogin"
            href="#"
            class="mt-4 inline-block align-baseline font-bold text-sm text-slate-500 hover:text-slate-950"
          >
            Forgot Password?
          </a> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "", // untuk menampung password
      showPassword: false,
      buttonLogin: false,
    };
  },
  methods: {
    clickButton() {
      this.buttonLogin = !this.buttonLogin;
    },
    togglePassword() {
      this.showPassword = !this.showPassword; // Membalik status showPassword
    },
  },
};
</script>

<style lang="scss" scoped></style>
