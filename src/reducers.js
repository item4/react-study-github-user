import { combineReducers } from 'redux';
import {
  CHANGE_KEYWORD,
  REQUEST_REPO, RECEIVE_REPO,
  RECEIVE_LIMIT,
  REQUEST_INFO, RECEIVE_INFO,
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

function limit(state = {max: 60, remain: 60, reset: 0}, action) {
  switch (action.type) {
    case RECEIVE_LIMIT:
      return action.limit;
    default:
      return state;
  }
}

function info(state = {isFetching: false, didInvalidate: false, data: {}}, action) {
  switch (action.type) {
    case CHANGE_KEYWORD:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_INFO:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_INFO:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  keyword,
  repo,
  limit,
  info,
});
export default rootReducer;
