import { GET_ORDER_ITEMS } from '../constants/ModalOrder'

export function getOrderItems (orderId) {
  return {
    type: GET_ORDER_ITEMS,
    orderId: orderId
  }
}
