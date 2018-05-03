import { SET_DISCOUNT_VALUE } from '../constants/Discount'

export function setDiscountValue (value) {
  return {
    type: SET_DISCOUNT_VALUE,
    payload: value
  }
}