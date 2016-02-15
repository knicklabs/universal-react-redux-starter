import React, { Component } from 'react'

import Header               from '../components/Header'

export default class Layout extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
