import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {mouseDown, mouseMove, mouseUp} from '@/components/table/resize'

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup']
    });
  }
  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    mouseDown(event)
  }
  onMousemove(event) {
    mouseMove(event)
  }
  onMouseup() {
    mouseUp()
  }
}