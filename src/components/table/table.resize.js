import {$} from '@core/dom'
/* let tableCords = {};
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
        let value = null;
        if (selectColId) {
          document.querySelectorAll(`[data-col-id="${selectColId}"]`)
              .forEach(cell => {
                value = cell.offsetWidth - delta;
                cell.style.width = value > 0 ? value + 'px' : 0 + 'px'
              });
        } else if (selectRowId) {
          document.querySelectorAll(`[data-row-id="${selectRowId}"]`)
              .forEach(cell => {
                value = cell.offsetHeight - delta;
                cell.style.height = value > 0 ? value + 'px' : 0 + 'px'
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
        $resizer = null;
      })
  }
};*/
export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const tableCords = $(event.target).closest('.excel__table').getCoords();
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const $handler = $parent.selectChild('[data-type="resize-handler"]');
    const type = $resizer.data.resize;
    $handler.css({opacity: 1});
    let delta = null;
    let value;
    const coords = $resizer.getCoords();
    if (type === 'col') {
      $handler.css({height: tableCords.height + 'px'});
    } else if (type === 'row') {
      $handler.css({width: tableCords.width + 'px'})
    }
    document.onmousemove = event => {
      if (type === 'col') {
        delta = coords.right - event.clientX;
        $resizer.css({right: delta + 'px', opacity: 1, zIndex: 1000});
      } else if (type === 'row') {
        delta = coords.bottom - event.clientY;
        $resizer.css({bottom: delta + 'px', opacity: 1, zIndex: 1000});
      }
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'col') {
        document.querySelectorAll(`[data-col-id="${$parent.data.colId}"]`)
            .forEach(cell => {
              value = cell.offsetWidth - delta;
              cell.style.width = value > 0 ? value + 'px' : 0 + 'px'
            });
      } else if (type === 'row') {
        document.querySelectorAll(`[data-row-id="${$parent.data.rowId}"]`)
            .forEach(cell => {
              value = cell.offsetHeight - delta;
              cell.style.height = value > 0 ? value + 'px' : 0 + 'px'
            });
      }
      resolve({
        value,
        type,
        id: $parent.data[type + 'Id']
      });
      $handler.clearCss(['opacity', 'width', 'height']);
      $resizer.clearCss([
        'opacity',
        'z-index',
        'right',
        'bottom'
      ]);
    }
  })
}

