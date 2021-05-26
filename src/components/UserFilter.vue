<script>
import { ref, toRefs, watch } from 'vue';
import { WEEK_LIST } from '@/enums';

export default {
  name: 'UserFilter',
  props: {
    filters: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:filters'],
  setup(props, { emit }) {
    const { filters } = toRefs(props, 'user');
    const valueList = ref(filters.value);
    watch(valueList, (newVal) => {
      emit('update:filters', newVal);
    });
    return { WEEK_LIST, valueList };
  },
};
</script>

<template>
  <ul class="flex space-x-2 mb-2 text-xs sm:text-base">
    <li
      v-for="week of WEEK_LIST"
      :key="week"
      class="checkbox"
    >
      <input
        :id="week"
        v-model="valueList"
        type="checkbox"
        :value="week"
      >
      <label :for="week">{{ week }}</label>
    </li>
  </ul>
</template>

<style lang="postcss" scoped>
.checkbox {
  @apply flex-grow;
  & input[type="checkbox"] {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  & input[type="checkbox"] + label {
    @apply block text-center py-2;
    @apply bg-primary-800 text-white rounded-lg cursor-pointer;
    @apply opacity-40 hover:opacity-80;
  }

  & input[type="checkbox"]:checked + label {
    @apply opacity-100;
  }
}

.dark .checkbox {
  & input[type="checkbox"] + label {
    @apply bg-dark-800 opacity-70;
  }
  & input[type="checkbox"]:checked + label {
    @apply opacity-100 bg-primary-500;
  }
}

</style>
