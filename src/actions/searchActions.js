import { CLEAR_SEARCH, SEARCH_REQUEST } from '../constants/Search'

export function clearSearch () {
  return {
    type: CLEAR_SEARCH,
    payload: {}
  }
}

export function searchRequest (query, page = 1) {
  return {
    type: SEARCH_REQUEST,
    query: query,
    page: page
  }
}
