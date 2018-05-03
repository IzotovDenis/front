import { SEARCH_REQUEST, SEARCH_SUCCESS, CLEAR_SEARCH } from '../constants/Search'

const initialState = {
  total_entries: 0,
  query_string: '',
  fetching: false
}

export default function search (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SEARCH:
      return { ...state, total_entries: 0, query_string: '' }
    case SEARCH_REQUEST:
      return { ...state, total_entries: 0, fetching: true, query_string: action.query.q }
    case SEARCH_SUCCESS:
      return { ...state, total_entries: action.payload.total_entries, fetching: false, query_string: action.payload.query_string }
    default:
      return state
  }
}
