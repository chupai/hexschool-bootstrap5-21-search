<script>
export default {
  name: 'UserItemLink',
  props: {
    url: {
      type: String,
      default: '',
    },
  },
};
</script>

<template>
  <a
    class="
      block p-1 select-none text-xs xs:text-base text-primary-600 hover:text-primary-400
      dark:text-primary-200 dark:hover:text-primary-100
    "
    :class="[
      url ? 'text-primary-600 dark:text-primary-200' : 'text-primary-200 dark:text-primary-800']"
    target="_blank"
    rel="noreferrer noopener"
    :href="url"
  >
    <slot />
  </a>
</template>
