<script>
export default {
  name: 'VSearchButton',
  components: {},
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue', 'handler'],
};
</script>

<template>
  <div class="flex items-center p-2 bg-white rounded-full dark:bg-dark-800">
    <button
      type="button"
      class="
        flex-shrink flex justify-center items-center w-10 h-10 mr-2
        appearance-none rounded-full hover:bg-primary-500 hover:text-white
        focus:outline-none active:bg-primary-700
        transition-colors duration-500"
      @click="$emit('handler')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
    <input
      v-bind="$attrs"
      type="text"
      class="
        block flex-grow h-10 px-3 tracking-wider rounded-r-full
        appearance-none placeholder-gray-400 bg-white text-lg
        focus:outline-none focus:bg-gray-50 focus:placeholder-gray-100
        dark:bg-dark-800 dark:focus:bg-dark-900
      "
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="$emit('handler')"
    >
  </div>
</template>
