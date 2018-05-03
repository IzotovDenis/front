import { SET_VIEW_STYLE } from '../constants/View'

const initialState = {
  style: 'table'
}

export default function view (state = initialState, action) {
  switch (action.type) {
    case SET_VIEW_STYLE:
      return { ...state, style: action.payload }
    default:
      return state
  }
}
