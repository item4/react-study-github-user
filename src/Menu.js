import React from 'react';
import { Link } from 'react-router';
import './Menu.css';

export default class Menu extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>첫 페이지</Link></li>
          <li><Link to="/info/" activeClassName="active">정보 열람</Link></li>
        </ul>
      </nav>
    );
  }
}
