export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export function range(start, end) {
  const array = [];
  if (start > end) {
    [end, start] = [start, end];
  }
  for (let i = start; i <= end; i++) {
    array.push(i)
  }
  return array
}
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}
export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}
function camelToKebabCase(val) {
  return val
      .split(/(?=[A-Z])/)
      .map(el => el.toLowerCase())
      .join('-');
}
export function toInlineStyles(style = {}) {
  return Object.keys(style)
      .map(key => `${camelToKebabCase(key)}:${style[key]}`)
      .join(';');
}
export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line
      fn.apply(this, args)
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait)
  }
}