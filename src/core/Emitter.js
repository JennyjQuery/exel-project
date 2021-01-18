export class Emitter {
  constructor() {
    this.listenners = {}
  }
  emit(event, ...args) {
    if (!Array.isArray(this.listenners[event])) {
      return false
    }
    this.listenners[event].forEach(listener => {
      listener(...args)
    });
    return true
  }
  subscribe(event, fn) {
    this.listenners[event] = this.listenners[event] || [];
    this.listenners[event].push(fn);
    return () => {
      this.listenners[event] = this.listenners[event].filter(
          listener => listener !== fn
      )
    }
  }
}
