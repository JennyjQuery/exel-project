import {Page} from '@core/Page';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@/core/utils'
import {normalizeInitialState} from '@/redux/initialState'
//  import {createStore} from '@core/createStore';
import {Store} from '@core/store/Store';

function storageName(param) {
  return 'excel:' + param
}
export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString();
    const state = storage(storageName(params));
    const initialState = normalizeInitialState(state);
    const store = new Store(rootReducer, initialState);
    // const store = createStore(rootReducer, initialState);
    const storeListener = debounce(state => {
      storage(storageName(params), state);
    }, 300);
    store.subscribe(storeListener);
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store: store
    });
    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.init()
  }
  destroy() {
    this.excel.destroy()
  }
}