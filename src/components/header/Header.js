import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from '@/components/header/header.template';
import {$} from '@core/dom'
import * as actions from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/router/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }
  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }
  toHTML() {
    return createHeader(this.store.getState().tableName || defaultTitle)
  }
  onInput(e) {
    if ($(e.target).data.type === 'table-name') {
      this.$dispatch(actions.changeTableName($(e.target).text()));
    }
  }
  onClick(e) {
    const $target = $(e.target);
    let decision;
    if ($target.data.type === 'delete') {
      decision = confirm('Вы действительно хотите удалить таблицу?');
      if (decision) {
        localStorage.removeItem('excel:'+ ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.type === 'exit') {
      ActiveRoute.navigate('');
    }
    /*    switch ($target.data.type) {
      case 'delete':
        decision = confirm('Вы действительно хотите удалить таблицу?');
        if (decision) {
          localStorage.removeItem('excel:'+ ActiveRoute.param);
          ActiveRoute.navigate('');
        }
        break;
      case 'exit':
        ActiveRoute.navigate('');
        break;
      default:
        break
    }*/
  }
}