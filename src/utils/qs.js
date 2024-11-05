export function parse() {
  let searchStr;
  if (location.hash) { // hash 模式
    const index = location.hash.indexOf('?');
    searchStr = index !== -1 ? location.hash.substring(index + 1) : '';
  } else { // history模式
    searchStr = location.search.replace(/^\?/, ''); // hash模式会有问题，应用history模式
  }

  if (parse[searchStr]) {
    return parse[searchStr];
  }
  const qsObj = searchStr.split('&').reduce((pre, cur) => {
    const [key, value] = cur.split('=');
    pre[key] = value;
    return pre;
  }, {});
  parse[searchStr] = qsObj;
  return qsObj;
}
