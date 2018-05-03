import { GET_COMPLETED_ORDER_REQUEST,
   GET_COMPLETED_ORDER_SUCCESS,
    GET_ORDERS_COMPLETED_SUCCESS,
     GET_ORDERS_COMPLETED_REQUEST } from '../constants/CompletedOrder'

const initialState = {
  ids: [],
  orders: {}
}

export default function page (state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_COMPLETED_REQUEST:
      return { ...state }
    case GET_ORDERS_COMPLETED_SUCCESS:
      let ids = []
      let orders = { ...state.orders }
      action.payload.orders.map((order, index) => {
        ids.push(order.id)
        if (state.orders[order.id]) {
          orders = { ...orders }
        } else {
          orders = { ...orders, [order.id]: { ...order, items: [], loaded: false } }
        }
      })
      return { ...state, ids: ids, orders: orders }
    case GET_COMPLETED_ORDER_SUCCESS:
      let order = action.payload.order
      order.items = action.payload.items
      if (state.ids.indexOf(order.id) > 0) {
        ids = [...state.ids, order.id]
      }
      return { ...state, orders: { ...state.orders, [order.id]: { ...order, loaded: true } } }
    default:
      return state
  }
}
