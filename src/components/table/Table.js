import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize'
import {
  shouldResize,
  isCell,
  matrix,
  changePosition
} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {defaultStyles} from '@/constants'
import * as actions from '@/redux/actions'
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }
  toHTML() {
    return createTable(20, this.store.getState());
  }
  prepare() {
    this.tableSelection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find(`[data-id='0:0']`));
    this.$on('formula:input', text => {
      this.tableSelection.selectCell
          .attr('data-value', text)
          .text(parse(text));
      this.updateTextInStore(text)
    });
    this.$on('formula:enter', () => {
      this.tableSelection.selectCell.focus().setCaret()
    });
    this.$on('toolbar:applyStyle', (value) => {
      this.tableSelection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.tableSelection.selectedIds
      }))
    });
  }

  selectCell($cell) {
    this.tableSelection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }
  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      this.$target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix(this.$target, this.tableSelection.selectCell)
            .map(id =>{
              return this.$root.find(`[data-id='${id}']`);
            });
        this.tableSelection.selectGroup($cells)
      } else {
        this.selectCell(this.$target)
      }
    }
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
  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.tableSelection.selectCell.id(),
      value
    }));
  }
  onInput(e) {
    this.updateTextInStore($(e.target).text())
  }
}