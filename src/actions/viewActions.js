import { SET_VIEW_STYLE } from '../constants/View'

export function setViewStyle (val) {
  return {
    type: SET_VIEW_STYLE,
    payload: val
  }
}
