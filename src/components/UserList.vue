<script>
export default {
  name: 'UserList',
};
</script>

<template>
  <ul
    class="
      grid gap-4 items-start
      grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3"
  >
    <slot />
  </ul>
</template>
