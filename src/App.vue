<script>
import {
  ref, reactive, onMounted, provide, watch,
} from 'vue';
import * as Util from '@/utils';
import { WEEK_COUNT } from '@/enums';

import TheHeader from '@/layouts/TheHeader.vue';
import TheFooter from '@/layouts/TheFooter.vue';
import UserList from '@/components/UserList.vue';
import UserItem from '@/components/UserItem.vue';
import UserTabs from '@/components/UserTabs.vue';
import UserStatistics from '@/components/UserStatistics.vue';
import UserFilter from '@/components/UserFilter.vue';
import ScrollButtons from '@/components/ScrollButtons.vue';
import VSearchButton from '@/components/VSearchButton.vue';
import VLoading from '@/components/VLoading.vue';

function initUser(userList) {
  const likeList = Util.storage.get('likeList', []);
  userList.forEach((user, index) => {
    let doneCount = 0;
    for (let i = 1; i <= WEEK_COUNT; i += 1) {
      if (user[`week${i}`]) {
        doneCount += 1;
      }
    }
    user.doneCount = doneCount;

    user.id = index;

    if (likeList.includes(user.id)) {
      user.isLiked = true;
    } else {
      user.isLiked = false;
    }
  });
}

async function initUserList(userData) {
  const API_URL = 'https://raw.githubusercontent.com/hexschool/live-bootstrap5-21-api/master/data.json';
  const response = await fetch(API_URL);
  const data = await response.json();
  userData.all = data;
  initUser(userData.all);
  userData.none = userData.all.filter((item) => item.doneCount === 0);
  userData.done = userData.all.filter((item) => item.doneCount !== 0);
  userData.done.sort((a, b) => b.doneCount - a.doneCount);
  userData.filterDone = userData.done;
}

function calcStatisticalData(statisticalData, userData) {
  statisticalData.allCount = userData.all.length;
  statisticalData.doneCount = userData.done.length;

  const { weekList, doneList } = statisticalData;
  userData.all.forEach((user) => {
    weekList.forEach((count, index) => {
      if (user[`week${index + 1}`]) { // week1 為 0 所以 + 1
        weekList[index] += 1;
      }
    });
    doneList[user.doneCount] += 1;
  });
}

export default {
  name: 'App',
  components: {
    VLoading,
    TheHeader,
    TheFooter,
    UserList,
    UserItem,
    UserTabs,
    UserFilter,
    UserStatistics,
    ScrollButtons,
    VSearchButton,
  },
  setup() {
    const isLoading = ref(false);
    const userData = reactive({
      all: [],
      none: [],
      done: [],
      filterDone: [],
      search: [],
      like: [],
    });

    const statisticalData = reactive({
      allCount: 0,
      doneCount: 0, // 至少繳交一次
      weekList: [0, 0, 0], // 每周繳交數統計 week1 ~ week3
      doneList: [0, 0, 0, 0], // 繳交數量統計 0 ~ 3
    });
    provide('statisticalData', statisticalData);

    onMounted(async () => {
      isLoading.value = true;
      await initUserList(userData);
      calcStatisticalData(statisticalData, userData);
      isLoading.value = false;
    });

    const userFilters = ref([]);
    watch(userFilters, (newValue) => {
      isLoading.value = true;
      if (newValue.length === 0) {
        userData.filterDone = userData.done;
      } else {
        userData.filterDone = userData.done.filter((user) => {
          let temp = true;
          newValue.forEach((week) => {
            if (!user[week]) {
              temp = false;
            }
          });
          return temp;
        });
      }
      window.setTimeout(() => {
        isLoading.value = false;
      }, 500);
    });

    const tabState = ref('filterDone');
    const searchWord = ref('');

    const searchUser = () => {
      userData.search = [];
      userData.search = Util.searchList(userData.all, 'name', searchWord.value);
      tabState.value = 'search';
    };

    watch(tabState, (newVal) => {
      if (newVal === 'like') {
        const likeList = Util.storage.get('likeList', []);
        userData.like = userData.all.filter((user) => likeList.includes(user.id));
      }
    });

    return {
      tabState,
      userData,
      searchWord,
      statisticalData,
      searchUser,
      isLoading,
      userFilters,
    };
  },
};
</script>

<template>
  <div class="vld-parent">
    <the-header />
    <section class="py-5">
      <div class="container px-2 sm:px-4">
        <user-statistics />
        <v-search-button
          v-model="searchWord"
          placeholder="請輸入名字"
          @handler="searchUser"
        />
      </div>
    </section>
    <main class="mb-5 min-h-screen">
      <div class="container px-2 sm:px-4">
        <user-filter
          v-show="tabState === 'filterDone'"
          v-model:filters="userFilters"
        />
        <user-tabs v-model="tabState" />
        <user-list>
          <user-item
            v-for="user of userData[tabState]"
            :key="user.id"
            :user="user"
          />
        </user-list>
      </div>
    </main>
    <the-footer />
    <scroll-buttons v-model="tabState" />
    <v-loading v-model="isLoading" />
  </div>
</template>

<style lang="postcss">

body {
  background-image: url('@/assets/images/background.svg');
  @apply bg-fixed bg-no-repeat bg-cover bg-white;
  @apply tracking-wide text-primary-800;
}

body.dark{
  background-image: url('@/assets/images/background-dark.svg');
  @apply bg-repeat bg-auto bg-black;
  @apply text-primary-50;
}

</style>
