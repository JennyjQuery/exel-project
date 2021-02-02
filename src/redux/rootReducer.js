import {
  CHANGE_TEXT,
  TABLE_RESIZE,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TABLE_NAME,
  SET_OPENING_TIME
} from '@/redux/types'

export function rootReducer(state, action) {
  let field;
  let prevState;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {...state, [field]: value(state, field, action)};
    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)
      };
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data};
    case APPLY_STYLE:
      field = 'styleState';
      prevState = state[field] || {};
      action.data.ids.forEach(id => {
        prevState[id] = {...prevState[id], ...action.data.value}
      });
      return {
        ...state,
        [field]: prevState,
        currentStyles: {...state.currentStyles, ...action.data.value}
      };
    case CHANGE_TABLE_NAME:
      field = 'tableName';
      return {
        ...state,
        [field]: action.data
      };
    case SET_OPENING_TIME:
      field = 'openingDate';
      return {
        ...state,
        [field]: new Date().toJSON()
      };
    default: return state
  }
}
function value(state, field, action) {
  const prevState = state[field] || {};
  prevState[action.data.id] = action.data.value;
  return prevState
}