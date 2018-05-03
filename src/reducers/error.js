import { SET_ERROR, CLEAR_ERROR } from '../constants/Error'

const initialState = {
  isError: false,
  code: undefined
}

export default function error (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, isError: true, code: action.code }
    case CLEAR_ERROR:
      return { ...state, isError: false, code: undefined }
    default:
      return state
  }
}
