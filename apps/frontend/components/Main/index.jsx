import React, { Component } from 'react'
import Helmet               from 'react-helmet'

export default class Main extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <section id="page" className="page page--main">
        <Helmet title="Home" />
        <strong>Main</strong> page here!
      </section>
    );
  }
}
