import apiCall          from '../../../libs/apiCall'
import * as actionTypes from '../constants/settings'

export function loadSettings({apiHost}) {
  return dispatch => {
    dispatch({
      type: actionTypes.SETTINGS_LOAD_REQUESTED
    })

    return apiCall({
      method: 'GET',
      path: '/settings',
      host: apiHost
    })
    .then((res) => {
      dispatch({
        type: actionTypes.SETTINGS_LOAD_SUCCEEDED,
        settings: res.data,
      })
    })
    .catch((res) => {
      dispatch({
        type: actionTypes.SETTINGS_LOAD_FAILED,
        errors: {
          code: res.status,
          data: res.data,
        }
      })
    })
  }
}
