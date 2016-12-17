import debounce from 'lodash/debounce';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Search from './Search';
import { searchKeywordIfNeeded, changeKeyword } from './actions';
import Info from './Info';
import Table from './Table';

class InfoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(searchKeywordIfNeeded(params.keyword));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.keyword !== this.props.params.keyword) {
      const { dispatch } = nextProps;
      const { keyword } = nextProps.params;
      dispatch(searchKeywordIfNeeded(keyword));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(keyword) {
    const { dispatch } = this.props;
    dispatch(changeKeyword(keyword));
    browserHistory.push(`/info/${keyword}`);
  }

  render() {
    const { repo, info, params } = this.props;
    return (
      <div>
        <Search keyword={params.keyword} onChange={debounce(this.handleChange, 300)} onSubmit={this.handleSubmit} />
        { params.keyword && <Info info={info.data} /> }
        { params.keyword && <Table data={repo.items} /> }
      </div>
    );
  }
}

InfoApp.propTypes = {
//  keyword: React.PropTypes.string.isRequired,
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
  params: React.PropTypes.shape({
    keyword: React.PropTypes.string,
  }),
};

const mapStateToProps = (state) => {
  const { repo, info, limit } = state;
  return {
    repo,
    info,
    limit,
  };
};

export default connect(mapStateToProps)(InfoApp);
