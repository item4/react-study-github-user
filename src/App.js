import debounce from 'lodash/debounce';
import React from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import { searchKeywordIfNeeded, changeKeyword } from './actions';
import Table from './Table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, keyword } = this.props;
    dispatch(searchKeywordIfNeeded(keyword));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyword !== this.props.keyword) {
      const { dispatch, keyword } = nextProps;
      dispatch(searchKeywordIfNeeded(keyword));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(keyword) {
    const { dispatch } = this.props;
    dispatch(changeKeyword(keyword));
  }

  render() {
    const { items } = this.props;
    return (
      <div>
        <Search onChange={debounce(this.handleChange, 300)} onSubmit={this.handleSubmit} />
        <Table data={items} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { keyword, repo } = state;
  const { isFetching, didInvalidate, items } = repo || {
    isFetching: false,
    didInvalidate: false,
    items: [],
  };
  return {
    keyword,
    isFetching,
    didInvalidate,
    items,
  };
}

export default connect(mapStateToProps)(App);
