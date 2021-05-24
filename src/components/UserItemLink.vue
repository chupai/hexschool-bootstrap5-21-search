<script>

import { toRef } from 'vue';

export default {
  name: 'UserItemLink',
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const url = toRef(props, 'url');
    const clickHandler = (event) => {
      if (url.value === '') {
        event.preventDefault();
        alert('抱歉，沒提供作業連結');
      }
    };
    return { clickHandler };
  },
};
</script>

<template>
  <a
    class="
      font-cursive p-1 select-none text-sm text-primary-600 hover:text-primary-400
      dark:text-primary-200 dark:hover:text-primary-100
    "
    target="_blank"
    rel="noreferrer noopener"
    :href="url"
    @click="clickHandler"
  >
    <slot />
  </a>
</template>
