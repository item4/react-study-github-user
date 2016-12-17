import axios from 'axios';

export const CHANGE_KEYWORD = 'CHANGE_KEYWORD';
export const REQUEST_REPO = 'REQUEST_REPO';
export const RECEIVE_REPO = 'RECEIVE_REPO';
export const RECEIVE_LIMIT = 'RECEIVE_LIMIT';
export const REQUEST_INFO = 'REQUEST_INFO';
export const RECEIVE_INFO = 'RECEIVE_INFO';

export const changeKeyword = () => {
  return {
    type: CHANGE_KEYWORD,
  };
};

export const requestRepo = () => {
  return {
    type: REQUEST_REPO,
  };
};

export const receiveRepo = (items) => {
  return {
    type: RECEIVE_REPO,
    items,
  }
};

export const receiveLimit = (limit) => {
  return {
    type: RECEIVE_LIMIT,
    limit,
  };
};

export const requestInfo = () => {
  return {
    type: REQUEST_INFO,
  };
};

export const receiveInfo = (data) => {
  return {
    type: RECEIVE_INFO,
    data,
  };
};

export const fetchRepo = (keyword) => {
  return (dispatch, getState) => {
    const { limit } = getState();

    dispatch(requestRepo());

    if (!keyword) {
      return dispatch(receiveRepo([]));
    }

    if (limit.remain > 0 || Date.now()/1000 > limit.reset) {
      return axios.get(`https://api.github.com/users/${keyword}/repos`)
        .then(res => {
          dispatch(receiveRepo(res.data));
          dispatch(receiveLimit({
            max: parseInt(res.headers['x-ratelimit-limit'], 10),
            remain: parseInt(res.headers['x-ratelimit-remaining'], 10),
            reset: parseInt(res.headers['x-ratelimit-reset'], 10),
          }));
        })
        .catch(res => {
          dispatch(receiveRepo([]));
          dispatch(receiveLimit({
            max: parseInt(res.response.headers['x-ratelimit-limit'], 10),
            remain: parseInt(res.response.headers['x-ratelimit-remaining'], 10),
            reset: parseInt(res.response.headers['x-ratelimit-reset'], 10),
          }));
        });
    }
  };
};

export const fetchInfo = (keyword) => {
  return (dispatch, getState) => {
    const { limit } = getState();

    dispatch(requestRepo());

    if (!keyword) {
      return dispatch(receiveInfo({}));
    }

    if (limit.remain > 0 || Date.now()/1000 > limit.reset) {
      return axios.get(`https://api.github.com/users/${keyword}`)
        .then(res => {
          dispatch(receiveInfo(res.data));
          dispatch(receiveLimit({
            max: parseInt(res.headers['x-ratelimit-limit'], 10),
            remain: parseInt(res.headers['x-ratelimit-remaining'], 10),
            reset: parseInt(res.headers['x-ratelimit-reset'], 10),
          }));
        })
        .catch(res => {
          dispatch(receiveInfo({}));
          dispatch(receiveLimit({
            max: parseInt(res.response.headers['x-ratelimit-limit'], 10),
            remain: parseInt(res.response.headers['x-ratelimit-remaining'], 10),
            reset: parseInt(res.response.headers['x-ratelimit-reset'], 10),
          }));
        });
    }
  };
};

export const shouldFetchRepo = (state) => {
  const repo = state.repo;
  if (!repo) {
    return true;
  } else if (repo.isFetching) {
    return false;
  }
  return repo.didInvalidate;
}

export const shouldFetchInfo = (state) => {
  const info = state.info;
  if (!info) {
    return true;
  } else if (info.isFetching) {
    return false;
  }
  return info.didInvalidate;
}

export const searchKeywordIfNeeded = (keyword) => {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldFetchRepo(state)) {
      dispatch(fetchRepo(keyword));
    }
    if (shouldFetchInfo(state)) {
      dispatch(fetchInfo(keyword));
    }
  }
}
