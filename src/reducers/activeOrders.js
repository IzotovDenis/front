import { ORDER_SET_ITEMS_SUCCESS,
      GET_ACTIVE_ORDERS_SUCCESS,
      SET_ACTIVE_ORDER_SUCCESS,
      CREATE_NEW_ORDER_SUCCESS,
      ORDER_COMPLETE_SUCCESS }
                from '../constants/ActiveOrder'

import { SET_CART_ITEMS } from '../constants/Cart'

const SET_ORDER_ITEMS = 'SET_ORDER_ITEMS'

const initialState = {
  currentOrderId: undefined,
  currentOrder: {},
  orderList: {},
  orders: {}
}

export default function activeOrders (state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_ITEMS:
      console.log("SET_ORDER_ITEMS")
      console.log(action.payload.orderId)
      console.log('action.payload.orderList',action.payload)
      console.log("/////SET_ORDER_ITEMS")
      return {
        ...state,
         orders: { ...state.orders, [action.payload.order.id]: action.payload.order },
         orderList: {...state.orderList, [action.payload.orderId]: action.payload.orderList}
      }
    case SET_CART_ITEMS:
      return {
        ...state,
        currentOrder: action.payload.order,
        orders: { ...state.orders, [action.payload.order.id]: action.payload.order },
        orderList: { ...state.orderList, [action.payload.order.id]: action.payload.orderList } }
    case ORDER_SET_ITEMS_SUCCESS:
      return {
        ...state,
        currentOrder: action.payload.order,
        orders: { ...state.orders, [action.payload.order.id]: action.payload.order },
        orderList: { ...state.orderList, [action.payload.order.id]: action.payload.orderList } }
    case CREATE_NEW_ORDER_SUCCESS:
      return {
        ...state,
        currentOrderId: action.payload.order.id,
        currentOrder: action.payload.order,
        orders: { ...state.orders, [action.payload.order.id]:action.payload.order },
        orderList: {} }
    case GET_ACTIVE_ORDERS_SUCCESS:
      return { ...action.payload }
    case SET_ACTIVE_ORDER_SUCCESS:
      return { ...state, currentOrderId: action.payload.currentOrderId, currentOrder: action.payload.currentOrder }
    case ORDER_COMPLETE_SUCCESS:
      return { ...state }
    default:
      return state
  }
}
