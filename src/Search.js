import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super();
    this.state = {value: props.keyword};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const keyword = e.target.value;
    this.setState({value: keyword});
    this.props.onChange(keyword);
  }
  
  render() {
    const { onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input type="search" value={this.state.value} onChange={this.handleChange} />
      </form>
    );
  }
}

Search.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
}
