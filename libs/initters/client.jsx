import React                from 'react'
import ReactDOM             from 'react-dom'
import Router               from 'react-router'
import createHistory        from 'history/lib/createBrowserHistory'
import { combineReducers }  from 'redux'
import { applyMiddleware }  from 'redux'
import { createStore }      from 'redux'
import { Provider }         from 'react-redux'
import middleware           from 'redux-thunk'

export default (params) => {

  const reducer   = combineReducers(params.reducers);
  const store     = applyMiddleware(middleware)(createStore)(reducer, window.__DATA__);
  const history   = new createHistory();
  const routes    = params.routes({ store });

  let initialRender = true;

  const appComponent = (Component, props) => {
    return (
      <Component
        store={store}
        initialRender={initialRender}
        {...props}
      />
    );
  };

  const AppContainer = (
    <Provider store={store}>
      <Router history={history} children={routes} createElement={appComponent} />
    </Provider>
  );

  const appDOMNode = document.getElementById('app');

  ReactDOM.render(AppContainer, appDOMNode, () => initialRender = false);
}
