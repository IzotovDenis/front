import { GET_ORDER_ITEMS, SET_ORDER_ITEMS, CLEAR_MODAL_ORDER } from '../constants/ModalOrder'

const initialState = {
  shownOrderId: undefined,
  fetching: false,
  orderItems: [],
  completed: false
}

export default function items (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_ITEMS:
      return { ...state, orderItems: [], shownOrderId: action.orderId, fetching: true }
    case SET_ORDER_ITEMS:
      return { ...state, orderItems: action.payload.orderItems, shownOrderId: action.payload.orderId, fetching: false }
    case CLEAR_MODAL_ORDER:
      return initialState
    default:
      return state
  }
}
