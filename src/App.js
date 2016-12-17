import React from 'react';
import Menu from './Menu';

export default class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <header>
          <Menu />
        </header>
        <main>
          { children }
        </main>
      </div>
    );
  }
}
