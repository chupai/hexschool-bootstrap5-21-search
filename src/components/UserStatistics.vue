<script>
import { inject } from 'vue';
import VProgress from '@/components/VProgress.vue';
import { WEEK_LIST } from '@/enums';

export default {
  name: 'UserStatistics',
  components: { VProgress },
  setup() {
    const statisticalData = inject('statisticalData');
    return { WEEK_LIST, statisticalData };
  },
};
</script>

<template>
  <ul class="bg-white dark:bg-dark-800 rounded-xl mb-5 p-5 shadow">
    <li>
      <v-progress
        :percent="(statisticalData.doneCount / statisticalData.allCount) * 100"
        :pivot-text="`至少繳交一份：${statisticalData.doneCount}`"
        :percent-text="`報名數：${statisticalData.allCount}`"
      />
    </li>
    <li
      v-for="(value, index) of statisticalData.weekList"
      :key="index"
    >
      <v-progress
        :percent="(value / statisticalData.doneCount) * 100"
        :pivot-text="`${WEEK_LIST['week' + (index + 1)]}：${value}`"
      />
    </li>
    <li class="w-3/4 ml-8">
      <v-progress
        :percent="(statisticalData.week3List[0] / statisticalData.weekList[2]) * 100"
        :pivot-text="`LV1：${statisticalData.week3List[0]}`"
      />
      <v-progress
        :percent="(statisticalData.week3List[1] / statisticalData.weekList[2]) * 100"
        :pivot-text="`LV2：${statisticalData.week3List[1]}`"
      />
      <v-progress
        :percent="(statisticalData.week3List[2] / statisticalData.weekList[2]) * 100"
        :pivot-text="`恭喜完成 LV3：${statisticalData.week3List[2]}`"
      />
    </li>
  </ul>
</template>
