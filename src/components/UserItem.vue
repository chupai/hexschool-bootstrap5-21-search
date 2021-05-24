<script>
import { toRef, computed, inject } from 'vue';
import * as Util from '@/utils';
import { WEEK_COUNT } from '@/enums';

import UserItemLink from '@/components/UserItemLink.vue';
import UserItemLike from '@/components/UserItemLike.vue';

export default {
  name: 'UserItem',
  components: { UserItemLink, UserItemLike },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const user = toRef(props, 'user');
    const isNone = computed(() => user.value.doneCount === 0);
    const isAllDone = computed(() => user.value.doneCount === WEEK_COUNT);

    const statisticalData = inject('statisticalData');
    const progress = computed(() => {
      if (isAllDone.value) {
        return '完成';
      }
      return `${(user.value.doneCount / WEEK_COUNT) * 100}%`;
    });
    const rankMessage = computed(() => {
      if (isNone.value) {
        return '該寫作業囉！';
      }

      let winCount = statisticalData.allCount;
      for (let i = WEEK_COUNT; i >= user.value.doneCount; i -= 1) {
        winCount -= statisticalData.doneList[i];
      }
      const percentileRanking = winCount / (statisticalData.allCount - 1);
      return `你已贏過 ${(percentileRanking * 100).toFixed(2)}% 的人`;
    });

    const updateLiked = (value) => {
      user.value.isLiked = value;
      const { id } = user.value;
      let likeList = Util.storage.get('likeList', []);
      likeList = likeList.filter((item) => item !== id);
      if (value) {
        likeList.push(id);
      }
      Util.storage.set('likeList', likeList);
    };

    return {
      WEEK_COUNT, progress, isNone, isAllDone, rankMessage, updateLiked,
    };
  },
};
</script>

<template>
  <li
    class="
     px-4 py-4 rounded-md shadow-xl dark:bg-dark-800
    "
    :class="[user.isLiked ? 'bg-white' : 'bg-gray-50']"
  >
    <div>
      <div class="flex justify-between items-center">
        <h3
          class="tooltip text-xl md:text-2xl font-bold leading-none flex items-center"
          :data-tooltip="rankMessage"
        >
          <span
            v-if="!isNone"
            class="px-4 mr-2 rounded-full select-none text-base font-normal text-white"
            :class="{
              'bg-primary-400 dark:bg-primary-800': user.doneCount === 1,
              'bg-primary-500 dark:bg-primary-700': user.doneCount === 2,
              'bg-primary-600 dark:bg-primary-600': user.doneCount === 3,
              'bg-primary-700 dark:bg-primary-500': user.doneCount === 4,
              'bg-primary-800 dark:bg-primary-400': user.doneCount === 5,
            }"
          >{{ progress }}</span>
          {{ user.name }}
        </h3>
        <user-item-like
          :value="user.isLiked"
          @update:value="updateLiked"
        />
      </div>
      <ul
        v-if="!isNone"
        class="mt-2 grid grid-flow-row sm:grid-flow-col gap-1
         grid-rows-none xs:grid-rows-3 grid-cols-1 xs:grid-cols-2"
      >
        <li
          v-for="n of WEEK_COUNT"
          :key="n"
        >
          <user-item-link
            :url="user[`week${n}Url`]"
            :class="{'pointer-events-none': !user[`week${n}`] }"
          >
            {{ `Week${n}:${user[`week${n}`] || ''}` }}
          </user-item-link>
        </li>
      </ul>
    </div>
  </li>
</template>
