import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import IndexPage from './IndexPage';
import InfoApp from './InfoApp';

export default class Root extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={IndexPage} />
          <Route path="/info/" component={InfoApp} />
        </Router>
      </Provider>
    );
  }
}
Root.propTypes = {
  store: React.PropTypes.object.isRequired,
};
