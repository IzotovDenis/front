import { SET_FILTER_IS_NEW, SET_FILTER_ONLY_IN_STOCK } from '../constants/Filter'

export function setFilterIsNew (val) {
  return {
    type: SET_FILTER_IS_NEW,
    payload: val
  }
}

export function setFilterOnlyInStock (val) {
  return {
    type: SET_FILTER_ONLY_IN_STOCK,
    payload: val
  }
}