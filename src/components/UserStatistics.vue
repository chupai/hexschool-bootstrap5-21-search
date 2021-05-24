<script>
import { inject } from 'vue';
import VProgress from '@/components/VProgress.vue';

export default {
  name: 'UserStatistics',
  components: { VProgress },
  setup() {
    const statisticalData = inject('statisticalData');
    return { statisticalData };
  },
};
</script>

<template>
  <ul class="bg-white dark:bg-dark-800 rounded-xl mb-5 p-5 shadow">
    <li>
      <v-progress
        :percent="(statisticalData.doneCount / statisticalData.allCount) * 100"
        :pivot-text="`至少繳交一份的人數：${statisticalData.doneCount}`"
        :percent-text="`報名總人數：${statisticalData.allCount}`"
      />
    </li>
    <li
      v-for="(value, index) of statisticalData.weekList"
      :key="index"
    >
      <v-progress
        :percent="(value / statisticalData.doneCount) * 100"
        :pivot-text="`week${index + 1}：${value}`"
      />
    </li>
  </ul>
</template>
