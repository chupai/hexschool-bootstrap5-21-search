<script>
import VDarkModeSwitch from '@/components/VDarkModeSwitch.vue';

export default {
  name: 'ScrollButtons',
  components: { VDarkModeSwitch },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    const clickHandler = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };
    return { clickHandler };
  },
};
</script>

<template>
  <teleport to="body">
    <div class="flex flex-col space-y-2 fixed right-5 bottom-5 z-50">
      <a
        class="btn"
        title="暗黑模式"
        @click.prevent=""
      >
        <v-dark-mode-switch />
      </a>
      <a
        href=""
        title="我的追蹤"
        class="btn"
        :class="{'!bg-opacity-100': modelValue === 'like'}"
        @click.prevent="$emit('update:modelValue', 'like')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="
        M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969
        0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755
        1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176
        0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1
        1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1
        1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </a>
      <a
        title="電梯向上"
        class="btn"
        @click.prevent="clickHandler"
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
            d="M8 7l4-4m0 0l4 4m-4-4v18"
          />
        </svg>
      </a>
    </div>
  </teleport>
</template>

<style lang="postcss" scoped>
  .btn {
    @apply flex justify-center items-center w-12 h-12 cursor-pointer;
    @apply rounded-md bg-primary-900 bg-opacity-50 text-white;
    @apply dark:bg-dark-900 dark:bg-opacity-50;
    @apply hover:bg-opacity-100;
  }
</style>
