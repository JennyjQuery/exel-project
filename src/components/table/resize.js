import {$} from '@core/dom'

let tableCords = {};
let $resizer;
let $handler;
let coordinateX = 0;
let coordinateY = 0;
let selectColId = null;
let selectRowId = null;
let delta;
export const resize = {
  mouseDown(event) {
    tableCords = $(event.target).closest('.excel__table').getCoords();
    $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    $handler = $parent.selectChild('[data-type="resize-handler"]');
    $handler.css({opacity: 1});
    if ($resizer.data.resize === 'col') {
      $handler.css({height: tableCords.height + 'px'});
      coordinateX = $resizer.getCoords().right;
      selectColId = $parent.data.colId;
    } else if ($resizer.data.resize === 'row') {
      coordinateY = $resizer.getCoords().bottom;
      selectRowId = $parent.data.rowId;
      $handler.css({width: tableCords.width + 'px'})
    }
  },
  mouseMove(event) {
    if ($resizer) {
      if (coordinateX) {
        delta = coordinateX - event.clientX;
        $resizer.css({right: delta + 'px', opacity: 1, zIndex: 1000});
      } else if (coordinateY) {
        delta = coordinateY - event.clientY;
        $resizer.css({bottom: delta + 'px', opacity: 1, zIndex: 1000});
      }
    }
  },
  mouseUp() {
    if ($resizer) {
      if (selectColId) {
        document.querySelectorAll(`[data-col-id="${selectColId}"]`)
            .forEach(cell => {
              const newWidth = cell.offsetWidth - delta;
              cell.style.width = newWidth > 0 ? newWidth + 'px' : 0 + 'px'
            });
      } else if (selectRowId) {
        document.querySelectorAll(`[data-row-id="${selectRowId}"]`)
            .forEach(cell => {
              const newHeight = cell.offsetHeight - delta;
              cell.style.height = newHeight > 0 ? newHeight + 'px' : 0 + 'px'
            });
      }
      $handler.clearCss(['opacity', 'width', 'height']);
      $resizer.clearCss([
        'opacity',
        'z-index',
        'right',
        'bottom'
      ]);
      coordinateX = coordinateY = 0;
      selectRowId = selectColId = 0;
      $resizer = null
    }
  }
}

