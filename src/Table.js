import React from 'react';

export default class Table extends React.Component {
  render() {
    const rows = this.props.data.map(data => {
      return (
        <tr key={data.id}>
          <td><a href={data.html_url}>{data.full_name}</a></td>
          <td>{data.language}</td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Repo</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}
