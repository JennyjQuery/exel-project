export class TableSelection {
  static className = 'selected';
  constructor() {
    this.group = [];
    this.selectCell = null;
  }
  get selectedIds() {
    return this.group.map($el => $el.data.id)
  }
  select($el) {
    this.clearSelect();
    this.group.push($el);
    $el.focus().addClass(TableSelection.className);
    this.selectCell = $el
  }
  clearSelect() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }
  selectGroup($cells = []) {
    this.clearSelect();
    this.group = $cells;
    this.group.forEach($cell => {
      $cell.addClass(TableSelection.className);
    })
  }
  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}