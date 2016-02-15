import * as actionTypes from '../constants/settings'

const initialState = {
  settings: {}
}

function settings(state = initialState, action) {
  const { type, settings, errors } = action

  switch (type) {
    case actionTypes.SETTINGS_LOAD_REQUESTED:
      return {
        ...state,
        type,
        settings: {},
        loading: true,
      }
    case actionTypes.SETTINGS_LOAD_SUCCEEDED:
      return {
        ...state,
        type,
        settings,
        loading: false,
      }
    case actionTypes.SETTINGS_LOAD_FAILED:
      return {
        ...state,
        type,
        settings: {},
        errors,
        loading: false,
      }
    default:
      return state
  }
}

export default settings
