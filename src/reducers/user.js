import { GET_USER_REQUEST, GET_USER_SUCCESS, UPDATE_USER_PROFILE, USER_NOT_AUTH, LOGOUT_USER } from '../constants/User'

const initialState = {
  auth: false,
  can_order: false,
  loaded: false,
  profile: {}
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, loaded: false }
    case GET_USER_SUCCESS:
      return { ...state,
        loaded: true,
        auth: action.payload.auth,
        profile: action.payload.user,
        can_order: action.payload.can_order }
    case UPDATE_USER_PROFILE:
      return { ...state, profile: action.payload }
    case USER_NOT_AUTH:
      return { ...initialState, loaded: true }
    case LOGOUT_USER:
      return { ...initialState}
    default:
      return state
  }
}
