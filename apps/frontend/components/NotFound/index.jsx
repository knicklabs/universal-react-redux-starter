import React, { Component } from 'react'
import Helmet               from 'react-helmet'

export default class NotFound extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <section id="page" className="page page--not-found">
        <Helmet title="Page not found" />
        Oops! Nother here.
      </section>
    );
  }
}
