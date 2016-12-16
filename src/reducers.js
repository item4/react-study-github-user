import { combineReducers } from 'redux';
import {
  CHANGE_KEYWORD,
  REQUEST_REPO, RECEIVE_REPO
} from './actions';

function keyword(state = '', action) {
  switch (action.type) {
    case CHANGE_KEYWORD:
      return action.keyword;
    default:
      return state;
  }
}

function repo(state = {isFetching: false, didInvalidate: false, items: []}, action) {
  switch (action.type) {
    case CHANGE_KEYWORD:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_REPO:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_REPO:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  keyword,
  repo,
});
export default rootReducer;
