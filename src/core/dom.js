class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this
    }
    return this.$el.outerHTML.trim()
  }
  text(text) {
    if (typeof text === 'string' || typeof text === 'number') {
      this.$el.textContent = text;
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }
  clear() {
    this.html('');
    return this
  }

  id(parse) {
    if (parse) {
      const id = this.id().split(':');
      return {
        row: +id[0],
        col: +id[1]
      }
    }
    return this.data.id
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else this.$el.appendChild(node);
    return this
  }
  get data() {
    return this.$el.dataset
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  selectChild(selector) {
    return $(this.$el.querySelector(selector))
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  findAll(selector) {
    return $(this.$el.querySelectorAll(selector))
  }
  addClass(className) {
    this.$el.classList.add(className);
    return this
  }
  focus() {
    this.$el.focus();
    return this
  }
  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this
    }
    return this.$el.getAttribute(name)
  }
  setCaret() {
    const range = document.createRange();
    const sel = window.getSelection();
    const {length} = this.$el.childNodes;
    const cursorPosition = this.$el.childNodes[length - 1];
    range.setStart(cursorPosition, cursorPosition.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range)
  }
  removeClass(className) {
    this.$el.classList.remove(className);
    return this
  }
  clearCss(styles = []) {
    styles.forEach(style => this.$el.style.removeProperty(style))
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key]
    });
    return this.$el
  }
  getStyles(styles = []) {
    return styles.reduce((res, style) => {
      res[style] = this.$el.style[style];
      return res
    }, {})
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
