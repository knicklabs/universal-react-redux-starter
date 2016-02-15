import React, { Component } from 'react'
import Helmet               from 'react-helmet'

export default class About extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <section id="page" className="page page--about">
        <Helmet title="About" />
        <strong>About</strong> page here!
      </section>
    );
  }
}
