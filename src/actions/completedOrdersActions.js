import { GET_ORDERS_COMPLETED_REQUEST, GET_COMPLETED_ORDER_REQUEST } from '../constants/CompletedOrder'

export function getOrdersCompleted (orders) {
  return {
    type: GET_ORDERS_COMPLETED_REQUEST,
    payload: orders
  }
}

export function getOrder (orderId) {
  return {
    type: GET_COMPLETED_ORDER_REQUEST,
    payload: orderId
  }
}

