import React from 'react';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import App from './App';
import IndexPage from './IndexPage';
import InfoApp from './InfoApp';

export default class Root extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={IndexPage} />
            <Route path="/info/" component={InfoApp} />
          </Route>
        </Router>
      </Provider>
    );
  }
}
Root.propTypes = {
  store: React.PropTypes.object.isRequired,
};
