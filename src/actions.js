import axios from 'axios';

export const CHANGE_KEYWORD = 'CHANGE_KEYWORD';
export const REQUEST_REPO = 'REQUEST_REPO';
export const RECEIVE_REPO = 'RECEIVE_REPO';

export const changeKeyword = (keyword) => {
  return {
    type: CHANGE_KEYWORD,
    keyword,
  };
};

export const requestRepo = (keyword) => {
  return {
    type: REQUEST_REPO,
    keyword,
  };
};

export const receiveRepo = (keyword, items) => {
  return {
    type: RECEIVE_REPO,
    keyword,
    items,
  }
};

export const searchKeyword = (keyword) => {
  return (dispatch) => {
    dispatch(requestRepo(keyword));

    if (!keyword) {
      return dispatch(receiveRepo(keyword, []));
    }

    return axios.get(`https://api.github.com/users/${keyword}/repos`)
      .then(res => {
        dispatch(receiveRepo(keyword, res.data));
      })
      .catch(res => {
        dispatch(receiveRepo(keyword, []));
      });
  };
};

export const shouldFetchRepo = (state, keyword) => {
  const repos = state.repos;
  if (!repos) {
    return true;
  } else if (repos.isFetching) {
    return false;
  }
  return repos.didInvalidate;
}

export const searchKeywordIfNeeded = (keyword) => {
  return (dispatch, getState) => {
    if (shouldFetchRepo(getState(), keyword)) {
      dispatch(searchKeyword(keyword));
    }
  }
}
