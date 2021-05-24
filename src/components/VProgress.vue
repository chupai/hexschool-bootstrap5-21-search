<script>
export default {
  name: 'VProgress',
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    percentText: {
      type: String,
      default: '',
    },
    pivotText: {
      type: String,
      default: '百分比',
    },
    showPercent: {
      type: Boolean,
      default: true,
    },
    showPivot: {
      type: Boolean,
      default: true,
    },
    digits: {
      type: Number,
      default: 2,
    },
  },
};
</script>

<template>
  <div class="relative mb-1">
    <div
      class="
        flex item-center justify-between items-center mb-1
        text-xs sm:text-sm text-primary-600 dark:text-primary-300
      "
    >
      <span
        v-if="showPivot"
      >{{ pivotText }}</span>
      <span
        v-if="showPercent"
      >{{ percentText || percent.toFixed(digits) + ' %' }}</span>
    </div>
    <div class="overflow-hidden h-2 rounded-full bg-primary-200 dark:bg-primary-800">
      <div
        :style="{ width: percent + '%' }"
        class="h-full bg-primary-600 dark:bg-primary-300"
      />
    </div>
  </div>
</template>
