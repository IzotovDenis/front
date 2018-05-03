import { SET_ITEMS, FETCHING_ITEMS } from '../constants/Item'

const initialState = {
  list: [],
  totalEntries: 0,
  loaded: false
}

export default function items (state = initialState, action) {
  switch (action.type) {
    case FETCHING_ITEMS:
      return { ...initialState, loaded: false }
    case SET_ITEMS:
      return { ...state, list: action.payload.items, totalEntries: action.payload.total_entries, loaded: true }
    default:
      return state
  }
}
