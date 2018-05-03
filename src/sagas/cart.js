import { select, call, put, takeEvery, takeLatest, cancelled, race, take } from 'redux-saga/effects'
import { 
  SET_OPENED_CART, 
  SET_CART_ITEMS, 
  SET_ITEM_QTY, 
  GET_CART_ITEMS_REQUEST,
  DELETE_CART_ITEMS,
  DELETE_CART,
  CART_DELETED
} from '../constants/Cart'
import API from '../helper/Api'

export function* setOpenedCart (action) {
  try {
    yield put({ type: GET_CART_ITEMS_REQUEST, cartId: action.cartId })
  } catch (e) {
    console.error(e)
  }
}

export function* getCartItems (action) {
  try {
    let response = yield call(API.getOrderItems, action.cartId)
    yield put({ type: SET_CART_ITEMS, payload: response.data })
  } catch (e) {
    console.error(e)
  }
}

export function* setCartItemQty (action) {
  try {
    let response = yield call(API.setOrderItem, action.cartId, action.items, true)
    if (response.data.success) {
      yield put({ type: SET_CART_ITEMS, payload: response.data})
    }
    yield
  }
  catch (e) {
    console.log(e)
  }
}

export function* deleteCartItems (action) {
  try {
    let response = yield call(API.deleteOrderItems, action.cartId, action.items, true)
    if (response.data.success) {
      yield put({ type: SET_CART_ITEMS, payload: response.data})
    }
    yield
  }
  catch (e) {
    console.log(e)
  }
}

export function* deleteCart (action) {
  try {
    let response = yield call(API.deleteOrder, action.cartId)
    if (response.data.success) {
      yield put({ type: CART_DELETED})
      yield put({ type: 'GET_ACTIVE_ORDERS_REQUEST'})
    }
    yield
  }
  catch (e) {
    console.log(e)
  }
}

export default function* watchCart () {
  yield takeLatest(SET_OPENED_CART, setOpenedCart)
  yield takeLatest(GET_CART_ITEMS_REQUEST, getCartItems)
  yield takeLatest(SET_ITEM_QTY, setCartItemQty)
  yield takeLatest(DELETE_CART_ITEMS, deleteCartItems)
  yield takeLatest(DELETE_CART, deleteCart)
}