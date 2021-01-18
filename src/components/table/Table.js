import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template';
import {resize} from '@/components/table/resize'
import {
  shouldResize,
  isCell,
  matrix,
  changePosition
} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'mouseup', 'keydown', 'input'],
      ...options
    });
  }
  toHTML() {
    return createTable();
  }
  prepare() {
    this.tableSelection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find(`[data-id='0:0']`));
    this.$on('formula:input', text => {
      this.tableSelection.selectCell.text(text);
    });
    this.$on('formula:enter', () => {
      this.tableSelection.selectCell.focus().setCaret()
    })
  }

  selectCell($cell) {
    this.tableSelection.select($cell);
    this.$emit('table:select', this.tableSelection.selectCell.text());
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resize.mouseDown(event)
    } else if (isCell(event)) {
      this.$target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix(this.$target, this.tableSelection.selectCell)
            .map(id =>{
              return this.$root.find(`[data-id='${id}']`);
            });
        this.tableSelection.selectGroup($cells)
      } else {
        this.tableSelection.select(this.$target);
        this.$emit('table:select', this.tableSelection.selectCell.text())
      }
    }
  }
  onMousemove(event) {
    resize.mouseMove(event)
  }
  onMouseup() {
    resize.mouseUp();
  }
  onKeydown(e) {
    const keys = [
      'Enter',
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft',
      'Tab'
    ];
    const {key} = e;
    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault();
      const newCellId = changePosition(this.tableSelection.selectCell, key);
      const $newCell = this.$root.find(newCellId);
      this.selectCell($newCell);
    }
  }
  onInput(e) {
    this.$emit('table:input', $(e.target).text())
  }
}