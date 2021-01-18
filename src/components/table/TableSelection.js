export class TableSelection {
  static className = 'selected';
  constructor() {
    this.group = [];
    this.selectCell = null;
  }

  select($el) {
    this.clearSelect();
    this.group.push($el);
    $el.focus().addClass(TableSelection.className);
    this.selectCell = $el
  }
  clearSelect() {
    if (this.group.length) {
      this.group.forEach($el => $el.removeClass(TableSelection.className));
      this.group = [];
    }
  }
  selectGroup($cells = []) {
    this.clearSelect();
    this.group = $cells;
    this.group.forEach($cell => {
      $cell.addClass(TableSelection.className);
    })
  }
/*  changePosition(direction) {
    let {row, col} = this.selectCell.id(true);
    switch (direction) {
      case 'left': {
        if (col - 1 < 0) {
          break
        }
        col--;
        break
      }
      case 'right': {
        col++;
        break
      }
      case 'up': {
        if (row - 1 < 0) {
          break
        }
        row--;
        break
      }
      case 'down': {
        row++;
        break
      }
    }
    this.select(this.$root.find(`[data-id='${row}:${col}']`));
  }*/
}