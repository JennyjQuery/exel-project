export class Page {
  constructor(params, time) {
    this.params = params;
    this.time = time
  }

  getRoot() {
    throw new Error('Method "getRoot" should be implemented')
  }
  afterRender() {}
  destroy() {}
}