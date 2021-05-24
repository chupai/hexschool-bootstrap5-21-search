<script>
import VDarkModeSwitch from '@/components/VDarkModeSwitch.vue';

export default {
  name: 'TheHeader',
  components: { VDarkModeSwitch },
};
</script>

<template>
  <header class="bg-white dark:bg-dark-800 py-4 sm:py-5 shadow text-xl sm:text-2xl md:text-3xl">
    <div class="container px-5">
      <div class="flex items-center justify-between">
        <a
          href="https://forms.gle/cbYW3oH7WYsX7n3WA"
          target="_blank"
          rel="noreferrer noopener"
          title="報名了？該交作業囉！"
        >
          <h1 class="font-bold">
            21 天 Bootstrap 5 實戰營 誰沒寫作業
          </h1>
        </a>
        <v-dark-mode-switch />
      </div>
    </div>
  </header>
</template>
