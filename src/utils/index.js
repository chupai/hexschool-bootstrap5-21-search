import { NAME_SPACE } from '@/enums';

/**
 * 搜尋列表，選項必須是物件
 * @param {array} list - 列表陣列
 * @param {string} propName - 選項屬性
 * @param {string} keyword - 關鍵字
 * @returns {array} 搜尋結果
 */
export function searchList(list, propName, keyword) {
  if (keyword === '') return [];
  const reg = new RegExp(keyword.trim(), 'iu');
  return list.filter((item) => item[propName].match(reg));
}

export const storage = {
  set(key, value) {
    let data = window.localStorage.getItem(NAME_SPACE);
    if (!data) {
      data = {};
    } else {
      data = JSON.parse(data);
    }
    data[key] = value;
    window.localStorage.setItem(NAME_SPACE, JSON.stringify(data));
  },
  get(key, def) {
    let data = window.localStorage.getItem(NAME_SPACE);
    if (!data) { return def; }
    data = JSON.parse(data);
    const result = data[key];
    if (!result) { return def; }
    return data[key];
  },
};

/**
 * 日期字串轉 timestamp
 * @param {string} timeString
 * @returns {number} timestamp
 */
export function formatTimestamp(timeString) {
  const temp = timeString.split(' ');
  const d = temp[0].split('/');
  const t = temp[2].split(':');
  const meridiem = temp[1];
  const date = {
    year: Number(d[0]),
    month: Number(d[1]) - 1,
    date: Number(d[2]),
    hours: meridiem === '上午' ? Number(t[0]) : Number(t[0]) + 12,
    minutes: Number(t[1]),
    seconds: Number(t[2]),
  };
  const timestamp = new Date(
    date.year, date.month, date.date, date.hours, date.minutes, date.seconds,
  ).getTime();
  return timestamp;
}
