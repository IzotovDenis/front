import { SET_ITEM, CLEAR_ITEM } from '../constants/Item'

const initialState = {
  item: {},
  loaded: false
}

export default function item (state = initialState, action) {
  switch (action.type) {
    case SET_ITEM:
      return { ...initialState, item: action.item, loaded: true }
    default:
      return state
  }
}
