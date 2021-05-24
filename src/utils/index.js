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

const NAME_SPACE = 'hexschool-bootstrap5-21';
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
