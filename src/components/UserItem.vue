<script>
import { toRef, computed, inject } from 'vue';
import * as Util from '@/utils';
import { WEEK_COUNT, WEEK_LIST } from '@/enums';

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

    const statisticalData = inject('statisticalData');
    const rankMessage = computed(() => {
      if (isNone.value) {
        return '同學，報名有紀錄der！該寫作業囉！';
      }

      let winCount = statisticalData.allCount; // 預設人數
      for (let i = 5; i >= user.value.rank; i -= 1) {
        if (i >= 3) {
          winCount -= statisticalData.week3List[i - 3]; // 陣列位置為 3 4 5 所以減3
        } else {
          winCount -= statisticalData.doneList[i];
        }
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
      WEEK_COUNT, WEEK_LIST, isNone, rankMessage, updateLiked,
    };
  },
};
</script>

<template>
  <li
    class="
     px-4 py-4 rounded-md shadow bg-white dark:bg-dark-800
    "
    :class="[user.isLiked ? 'opacity-100' : 'opacity-95']"
  >
    <div>
      <div class="flex justify-between items-center">
        <h2
          class="tooltip text-xl md:text-2xl font-bold leading-none flex items-center"
          :data-tooltip="rankMessage"
        >
          <span
            v-if="!isNone"
            class="px-4 mr-2 rounded-full select-none text-base font-normal text-white"
            :class="{
              'bg-primary-300 dark:bg-primary-300': user.rank === 1,
              'bg-primary-400 dark:bg-primary-400': user.rank === 2,
              'bg-primary-500 dark:bg-primary-500': user.rank === 3,
              'bg-primary-600 dark:bg-primary-600': user.rank === 4,
              'bg-primary-700 dark:bg-primary-700': user.rank === 5,
            }"
          >{{ user.rank !== 5 ? `進度：${user.rank}`: '恭喜完成' }}</span>
          {{ user.name }}
        </h2>
        <user-item-like
          :value="user.isLiked"
          @update:value="updateLiked"
        />
      </div>
      <p
        v-if="isNone"
        class=" text-sm text-gray-400 select-none"
      >
        📅 報名時間：{{ user.timestamp }}
      </p>
      <p
        v-if="!isNone"
        class=" text-sm text-gray-400 select-none"
      >
        📅 更新時間：{{ user.timestamp }}
      </p>
      <ul
        v-if="!isNone"
        class="mt-2 grid grid-cols-3 gap-1"
      >
        <li
          v-for="(value, key) of WEEK_LIST"
          :key="key"
        >
          <user-item-link
            :url="user[`${key}Url`]"
            :class="{'pointer-events-none': !user[`${key}Url`] }"
          >
            <span class="font-bold">{{ value }}</span>：{{ user[`${key}Url`] ? user[key] : '' }}
          </user-item-link>
        </li>
      </ul>
    </div>
  </li>
</template>
