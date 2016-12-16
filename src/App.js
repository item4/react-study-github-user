import debounce from 'lodash/debounce';
import React from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import { searchKeywordIfNeeded, changeKeyword } from './actions';
import Info from './Info';
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
    const { keyword, repo, info } = this.props;
    return (
      <div>
        <Search onChange={debounce(this.handleChange, 300)} onSubmit={this.handleSubmit} />
        { keyword && <Info info={info.data} /> }
        { keyword && <Table data={repo.items} /> }
      </div>
    );
  }
}

App.propTypes = {
  keyword: React.PropTypes.string.isRequired,
  repo: React.PropTypes.shape({
    isFetching: React.PropTypes.bool.isRequired,
    didInvalidate: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired,
  }).isRequired,
  info: React.PropTypes.shape({
    isFetching: React.PropTypes.bool.isRequired,
    didInvalidate: React.PropTypes.bool.isRequired,
    data: React.PropTypes.object.isRequired,
  }).isRequired,
  limit: React.PropTypes.shape({
    max: React.PropTypes.number.isRequired,
    remain: React.PropTypes.number.isRequired,
    reset: React.PropTypes.number.isRequired,
  }).isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { keyword, repo, info, limit } = state;
  return {
    keyword,
    repo,
    info,
    limit,
  };
};

export default connect(mapStateToProps)(App);
