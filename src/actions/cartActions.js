import { 
   SET_OPENED_CART,
   SET_ITEM_QTY,
   GET_CART_ITEMS_REQUEST,
   DELETE_CART_ITEMS,
   DELETE_CART,
   SELECT_ITEM,
   COPY_ITEMS,
   SET_COPY_VIEW,
   SET_MOVE_VIEW } from '../constants/Cart'

export function setOpenedCart (cartId) {
  return {
    type: SET_OPENED_CART,
    cartId: cartId
  }
}

export function getCartItems (cartId) {
  return {
    type: GET_CART_ITEMS_REQUEST,
    cartId: cartId
  }
}

export function setItemQty (cartId, itemId, qty) {
  return {
    type: SET_ITEM_QTY,
    cartId: cartId,
    items: {[itemId]: qty}
  }
}

export function deleteItem (cartId, itemId) {
  return {
    type: DELETE_CART_ITEMS,
    cartId: cartId,
    items: [itemId]
  }
}

export function deleteCart (cartId) {
  return {
    type: DELETE_CART,
    cartId: cartId
  }
}

export function selectItem (cartId, itemId) {
  return {
    type: SELECT_ITEM,
    cartId: cartId,
    itemId: itemId
  }
}

export function copyItems (fromCartId, toCartId, itemsIds) {
  return {
    type: COPY_ITEMS,
    fromCartId: fromCartId,
    toCartId: toCartId,
    itemsIds: itemsIds
  }
}

export function setCopyView (val) {
  return {
    type: SET_COPY_VIEW,
    copyView: val
  }
}

export function setMoveView (val) {
  return {
    type: SET_MOVE_VIEW,
    moveView: val
  }
}