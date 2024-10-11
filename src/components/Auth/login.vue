<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="w-full max-w-sm bg-white rounded-lg shadow-md p-12">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-center text-gray-700 mb-0">
          Log in to Your Account
        </h2>
      </div>
      <form >
        <div class="mb-3">
          <label class="block text-gray-700 text-md font-bold mb-2" for="email">
            Email
          </label>
          <div :class="['input input-bordered flex items-center gap-2 bg-white', { 'input-error': emailError }]">
            <input
              type="email"
              class="grow text-gray-600"
              v-model="email"
              placeholder="Enter your email"
            />
            <i class="fas fa-envelope h-4 w-4 text-gray-400"></i>
          </div>
          <p v-if="emailError" class="text-red-500 text-xs mt-2 ml-1">{{ emailError }}</p>
        </div>
        <div class="mb-11">
          <label
            class="block text-gray-700 text-md font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <div :class="['input input-bordered flex items-center gap-2 bg-white', { 'input-error': passwordError }]">
            <input
              :type="showPassword ? 'text' : 'password'"
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
          <p v-if="passwordError" class="text-red-500 text-xs mt-2 ml-1">{{ passwordError }}</p>
        </div>

        <div class="flex flex-col items-center justify-center">
          <button
            v-if="!buttonLogin"
            type="submit"
            class="w-full btn bg-slate-950 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            @click.prevent="login"
          >
            Login
          </button>
          <span
            :class="
              buttonLogin ? 'loading loading-dots loading-lg text-neutral' : ''
            "
          ></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const emailError = ref('');
    const password = ref('');
    const passwordError = ref('');
    const showPassword = ref(false);
    const buttonLogin = ref(false);
    const router = useRouter();

    const validateEmail = () => {
      if (!email.value) {
        emailError.value = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = "Email must be a valid email address.";
      } else {
        emailError.value = ""; 
      }
    };

    const validatePassword = () => {
      if (!password.value) {
        passwordError.value = "Password is required.";
      } else {
        passwordError.value = ""; 
      }
    };

    const login = () => {
      validateEmail(); 
      validatePassword(); 

      if (!emailError.value && !passwordError.value) {
        buttonLogin.value = true; 
        setTimeout(() => {
          buttonLogin.value = false; 
          router.push({ name: "dashboard", params: { email: email.value } });
        }, 1500);
      } 
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      email,
      emailError,
      password,
      passwordError, // Tambahkan passwordError ke return
      showPassword,
      buttonLogin,
      login,
      togglePassword
    };
  },
};
</script>


<style lang="scss" scoped></style>
