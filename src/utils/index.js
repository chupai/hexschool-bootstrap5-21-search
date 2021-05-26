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
 * 陣列比較
 * @param {array} arr1
 * @param {array} arr2
 * @returns {array} 回傳陣列之間的差異
 */
export function differenceArray(arr1, arr2) {
  const set = new Set(arr2);
  return arr1.filter((item) => !set.has(item));
}
