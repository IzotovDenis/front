import { SET_DISCOUNT_VALUE } from '../constants/Discount'

const initialState = {
  value: 0
}

export default function page (state = initialState, action) {
  switch (action.type) {
    case SET_DISCOUNT_VALUE:
      return { ...state, value: action.payload }
    default:
      return state
  }
}
