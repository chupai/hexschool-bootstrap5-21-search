<script>
import { TAB_LIST } from '@/enums';

export default {
  name: 'UserTabs',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    return { TAB_LIST };
  },
};
</script>

<template>
  <nav>
    <ul class="flex justify-between space-x-5 mb-5">
      <li
        v-for="tab of TAB_LIST"
        :key="tab.value"
        class="flex-grow p-2 md:p-5 cursor-pointer rounded-xl
          text-base sm:text-2l md:text-3xl font-bold text-center text-white text-opacity-80
          hover:bg-primary-700 dark:hover:bg-dark-800
        "
        :class="{ 'is-active': modelValue === tab.value }"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
.is-active {
  @apply bg-gradient-to-br from-primary-500 to-primary-700 text-opacity-100;
   @apply dark:from-dark-700 dark:to-dark-900;
}
</style>
