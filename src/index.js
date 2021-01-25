import './scss/index.scss';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {Store} from '@core/Store';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@/core/utils'
import {initialState} from '@/redux/initialState'

const store = new Store(rootReducer, initialState);

const storeListener = debounce(state => {
  console.log('App state', state);
  storage('excel-state', state);
}, 300);
store.subscribe(storeListener);
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store: store
});
excel.render();