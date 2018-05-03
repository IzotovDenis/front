import { SET_OPENED_CART,
    SET_CART_ITEMS,
    GET_CART_ITEMS_REQUEST,
    CART_DELETED,
    SELECT_ITEM,
    SET_COPY_VIEW,
    SET_MOVE_VIEW
     } from '../constants/Cart'

const initialState = {
  ids: [],
  orders: {},
  items: [],
  fetching: false,
  fetchingCartId: undefined,
  cartID: undefined,
  loaded: false,
  copyView: false,
  shownOrder: undefined,
  selectedItems: {111: {"29856": true}}
}

function setSelectedItem(state = {}, action) {

  let currentVal = state[action.itemId] || false
  return {...state, [action.itemId]: !currentVal }
}

function setSelectedCart(state= {}, action) {
  return {...state, [action.cartId]: setSelectedItem(state[action.cartId], action)}
}

function updateSelectedItems(state = {}, action) {
  let newSelected = {}
  action.payload.orderItems.map((item) => {
    if (state[item.id]) {
      newSelected[item.id] = state[item.id]
    }
  })
  console.log(newSelected)
  return newSelected
}

function updateSelectedOrder(state, action){
  if (state[action.payload.order.id]) {
    console.log('update')
    return {...state, [action.payload.order.id]: updateSelectedItems(state[action.payload.order.id], action) }
  }
  return {...state }
}

export default function cart (state = initialState, action) {
  switch (action.type) {
    case SET_OPENED_CART:
      return {...state, fetchingCartId: action.cartId, fetching: true}
    case SET_CART_ITEMS:
      return { ...state,
              items: action.payload.orderItems, 
              cartId: action.payload.order.id, 
              shownOrder: action.payload.order, 
              fetching: false, 
              loaded: true, 
              selectedItems: updateSelectedOrder(state.selectedItems, action)}
    case GET_CART_ITEMS_REQUEST:
      return {...state, items: [], fetching: true}
    case CART_DELETED:
      return {...state, loaded: false, cartId: undefined}
    case SELECT_ITEM:
      return {...state, selectedItems: setSelectedCart(state.selectedItems, action)}
    case SET_COPY_VIEW:
      return {...state, copyView: action.copyView}
    case SET_MOVE_VIEW:
      return {...state, moveView: action.moveView}
    default:
      return state
  }
}
