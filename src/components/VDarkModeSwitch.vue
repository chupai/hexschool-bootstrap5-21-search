<script>
import { ref, watch } from 'vue';
import * as Util from '@/utils';

export default {
  name: 'VDarkModeSwitch',
  emits: ['update:modelValue'],
  setup() {
    const isDark = ref(Util.storage.get('darkMode', false));

    watch(isDark, (newVal) => {
      document.querySelector('body').classList.toggle('dark', newVal);
      Util.storage.set('darkMode', newVal);
    }, { immediate: true });

    return { isDark };
  },
};
</script>

<template>
  <div
    class="cursor-pointer select-none w-full h-full flex justify-center items-center"
    @click="isDark = !isDark"
  >
    <p>
      {{ isDark ? '🌙' : '🌞' }}
    </p>
  </div>
</template>
