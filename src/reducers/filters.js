import { SET_FILTER_IS_NEW, SET_FILTER_ONLY_IN_STOCK } from '../constants/Filter'

const initialState = {
  onlyNew: false,
  onlyNewAvaiable: false,
  onlyNewCount: 0,
  onlyInStock: false
}

export default function view (state = initialState, action) {
  switch (action.type) {
    case SET_FILTER_IS_NEW:
      const onlyNew = ((typeof action.payload) === 'boolean' ? action.payload : !state.onlyNew)
      return { ...state, onlyNew: onlyNew }
    case SET_FILTER_ONLY_IN_STOCK:
      const onlyInStock = ((typeof action.payload) === 'boolean' ? action.payload : !state.onlyInStock)
      return { ...state, onlyInStock: onlyInStock }
    default:
      return state
  }
}
