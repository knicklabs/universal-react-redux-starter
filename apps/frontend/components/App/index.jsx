import React, { Component }   from 'react'
import { PropTypes as Type }  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import Helmet                 from 'react-helmet'

import Header                 from '../Header'
import fetchData              from '../../../../libs/decorators/fetchData'
import * as SettingsActions   from '../../actions/settings'

@fetchData(({ apiHost, auth, dispatch, params }) => {
  return dispatch(SettingsActions.loadSettings({ apiHost }));
})

@connect(state => ({ settings: state.settings }))

export default class App extends Component {
  static propTypes = {
    settings: Type.object.isRequired,
    dispatch: Type.func.isRequired
  }

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { settings } = this.props.settings
    const { title, description } = settings

    return (
      <section id="layout" className="layout layout--main">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: description },
          ]}
        />
        <Header title={title} />
        {this.props.children}
      </section>
    )
  }
}
