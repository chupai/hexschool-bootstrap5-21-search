export const NAME_SPACE = 'hexschool-bootstrap5-21';
export const WEEK_COUNT = 5;

const weekList = [];
for (let i = 1; i <= WEEK_COUNT; i += 1) {
  weekList.push(`week${i}`);
}
export const WEEK_LIST = weekList;

export const TAB_LIST = [
  {
    value: 'filterDone',
    label: '我有寫作業了 😁',
  },
  {
    value: 'none',
    label: '你才沒寫作業 😭',
  },
];
