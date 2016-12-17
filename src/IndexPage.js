import React from 'react';
import Menu from './Menu';


export default class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
        <main>
          <h1>GitHub User</h1>
          <p>GitHub 사용자를 검색하거나 열람할 수 있습니다.</p>
        </main>
      </div>
    );
  }
}
