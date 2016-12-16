import axios from 'axios';

export const CHANGE_KEYWORD = 'CHANGE_KEYWORD';
export const REQUEST_REPO = 'REQUEST_REPO';
export const RECEIVE_REPO = 'RECEIVE_REPO';
export const RECEIVE_LIMIT = 'RECEIVE_LIMIT';

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

export const receiveLimit = (limit) => {
  return {
    type: RECEIVE_LIMIT,
    limit,
  };
};

export const searchKeyword = (keyword) => {
  return (dispatch, getState) => {
    const { limit } = getState();

    dispatch(requestRepo(keyword));

    if (!keyword) {
      return dispatch(receiveRepo(keyword, []));
    }

    if (limit.remain > 0 || Date.now()/1000 > limit.reset) {
      return axios.get(`https://api.github.com/users/${keyword}/repos`)
        .then(res => {
          dispatch(receiveRepo(keyword, res.data));
          dispatch(receiveLimit({
            max: parseInt(res.headers['x-ratelimit-limit'], 10),
            remain: parseInt(res.headers['x-ratelimit-remaining'], 10),
            reset: parseInt(res.headers['x-ratelimit-reset'], 10),
          }));
        })
        .catch(res => {
          dispatch(receiveRepo(keyword, []));
          dispatch(receiveLimit({
            max: parseInt(res.response.headers['x-ratelimit-limit'], 10),
            remain: parseInt(res.response.headers['x-ratelimit-remaining'], 10),
            reset: parseInt(res.response.headers['x-ratelimit-reset'], 10),
          }));
        });
    }
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
