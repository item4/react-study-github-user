import React from 'react';

export default class Search extends React.Component {
  render() {
    const { onChange, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input type="search" onChange={(e) => onChange(e.target.value)} />
      </form>
    );
  }
}

Search.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
}
