import {range} from '@core/utils';
import {defaultRowCount, defaultColCount} from '@/components/table/table.config'
export function shouldResize(event) {
  return event.target.dataset.type === 'resizer'
}
export function isCell(event) {
  return event.target.dataset.type === 'cell'
}
export function matrix($current, $select) {
  const cId = $current.id(true);
  const sId = $select.id(true);
  const colIds = range(cId.col, sId.col);
  const rowIds = range(cId.row, sId.row);
  return rowIds.reduce((array, rowId) => {
    colIds.forEach(colId => array.push(`${rowId}:${colId}`));
    return array
  }, []);
}
export function changePosition(currentCell, direction) {
  let {row, col} = currentCell.id(true);
  switch (direction) {
    case 'ArrowLeft': {
      if (col - 1 < 0) {
        break
      }
      col--;
      break
    }
    case 'ArrowRight':
    case 'Tab': {
      if (col + 1 > defaultColCount - 1) {
        break
      }
      col++;
      break
    }
    case 'ArrowUp': {
      if (row - 1 < 0) {
        break
      }
      row--;
      break
    }
    case 'ArrowDown':
    case 'Enter': {
      if (row + 1 > defaultRowCount - 1) {
        break
      }
      row++;
      break
    }
  }
  return `[data-id='${row}:${col}']`
}