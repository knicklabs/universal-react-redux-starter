import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        <ul>
          <li><Link to="/">Main</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/404">Not Found</Link></li>
        </ul>
      </header>
    );
  }
}
