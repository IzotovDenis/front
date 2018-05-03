import { ORDER_SET_ITEMS_REQUEST,
        GET_ORDER_REQUEST,
        GET_ACTIVE_ORDERS_REQUEST,
        GET_ACTIVE_ORDERS_SUCCESS,
        SET_ACTIVE_ORDER_REQUEST,
        CREATE_NEW_ORDER_REQUEST,
        DELETE_ITEM_FROM_ORDER_REQUEST,
        ORDER_COMPLETE_REQUEST } from '../constants/ActiveOrder'

export function setItemsRequest (orderId, itemId, qty, fullOrder = false) {
  return {
    type: ORDER_SET_ITEMS_REQUEST,
    orderId: orderId,
    payload: { [itemId]:qty },
    method: 'add_items',
    prop: { fullOrder: fullOrder }
  }
}

export function setItemsSuccess (orderId, itemId, qty) {
  return {
    type: ORDER_SET_ITEMS_REQUEST,
    orderId: orderId,
    itemId: itemId,
    qty: qty
  }
}

export function getActiveOrdersRequest () {
  return {
    type: GET_ACTIVE_ORDERS_REQUEST,
    payload: '{}'
  }
}

export function getActiveOrdersSuccess (active, ids, items) {
  return {
    type: GET_ACTIVE_ORDERS_SUCCESS,
    active: active,
    ids: ids,
    items: items
  }
}

export function setActiveOrderRequest (orderId) {
  return {
    type: SET_ACTIVE_ORDER_REQUEST,
    payload: orderId
  }
}

export function createNewOrderRequest (name) {
  return {
    type: CREATE_NEW_ORDER_REQUEST,
    payload: name
  }
}

export function getOrder (orderId) {
  return {
    type: GET_ORDER_REQUEST,
    payload: orderId
  }
}

export function deleteItemFromOrderRequest (orderId, itemIds, fullOrder = true) {
  return {
    type: DELETE_ITEM_FROM_ORDER_REQUEST,
    payload: itemIds,
    method: 'delete_items',
    orderId: orderId,
    prop: { fullOrder: fullOrder }
  }
}

export function orderComplete (orderId, comment) {
  return {
    type: ORDER_COMPLETE_REQUEST,
    comment: comment,
    orderId: orderId
  }
}