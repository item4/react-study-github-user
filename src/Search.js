import React from 'react';

export default class Search extends React.Component {
  render() {
    const { keyword, onChange, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input type="search" ref="keyword" value={keyword} onChange={(e) => onChange(e.target.value)} />
      </form>
    );
  }
}
