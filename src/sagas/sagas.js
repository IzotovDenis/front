import { select, call, put, takeEvery, takeLatest, cancelled, race, take, all } from 'redux-saga/effects'
import { GET_GROUPS_REQUEST, GET_GROUPS_SUCCESS, GET_GROUP_REQUEST } from '../constants/Group'
import { ORDER_SET_ITEMS_REQUEST,
            ORDER_SET_ITEMS_SUCCESS,
            GET_ORDER_REQUEST,
            GET_ACTIVE_ORDERS_REQUEST,
            GET_ORDER_SUCCESS,
            GET_ACTIVE_ORDERS_SUCCESS,
            SET_ACTIVE_ORDER_REQUEST,
            SET_ACTIVE_ORDER_SUCCESS,
            CREATE_NEW_ORDER_REQUEST,
            CREATE_NEW_ORDER_SUCCESS,
            DELETE_ITEM_FROM_ORDER_REQUEST,
            ORDER_COMPLETE_REQUEST,
            ORDER_COMPLETE_SUCCESS } from '../constants/ActiveOrder'
import { GET_ORDERS_COMPLETED_REQUEST,
            GET_ORDERS_COMPLETED_SUCCESS,
            GET_COMPLETED_ORDER_REQUEST,
            GET_COMPLETED_ORDER_SUCCESS } from '../constants/CompletedOrder'
import { GET_ORDER_ITEMS, SET_ORDER_ITEMS, CLEAR_MODAL_ORDER } from '../constants/ModalOrder'
import { GET_USER_REQUEST, GET_USER_SUCCESS, USER_NOT_AUTH } from '../constants/User'
import { FETCHING_ITEMS, SET_ITEMS, LOAD_POPULAR_ITEMS } from '../constants/Item'
import { SEARCH_REQUEST, SEARCH_SUCCESS } from '../constants/Search'
import { MODAL_ITEM_REQUEST,
          MODAL_ITEM_SUCCESS,
          MODAL_ORDER_REQUEST,
          MODAL_ORDER_SUCCESS,
          SHOW_MODAL_COMPLETED_ORDER,
          HIDE_ALL_MODALS } from '../constants/Modal'
import { SET_ERROR, CLEAR_ERROR } from '../constants/Error'
import Cookies from 'universal-cookie'
import API from '../helper/Api'
import HowToBuy from '../components/modals/HowToBuy'

import axios from 'axios'

import watchCart from './cart'
import watchItem from './item'

const cookies = new Cookies()

export const getCompletedOrders = (state) => state.completedOrders
export const getUser = (state) => state.user
export const getActiveOrders = (state) => state.activeOrders
export const getView = (state) => state.view
export const getError = (state) => state.error

//
// API URL GENERATOR
// ========================================================================
function apiUrl (path, id = undefined, data = {}) {
  return API.buildUri(path, id, data)
}
// ========================================================================
// API URL GENERATOR
//

export function* createAsync () {
  try {
    let response = yield call(axios.get, apiUrl('/groups'))
    yield put({ type: GET_GROUPS_SUCCESS, payload: response.data })
  } catch (e) {

  }
}

export function* locationChange () {
  try {
    yield put({ type: HIDE_ALL_MODALS })
    let error = yield select(getError)
    if (error.isError) {
      yield put({ type: CLEAR_ERROR })
    }
  } catch (e) {

  }
}

export function* GroupRequest (action) {
  try {
    yield put({ type: FETCHING_ITEMS })
    let filters = yield select(getView)
    let response = yield call(API.getGroup, action.group_id, action.filters)
    yield put({ type: SET_ITEMS, payload: response.data })
  } catch (e) {
    console.log(e)
  } finally {
    if (yield cancelled()) {

    }
  }
}

export function* SearchRequest (action) {
  try {
    yield put({ type: FETCHING_ITEMS })
    let query = action.query
    let url = apiUrl('/search', undefined, query)
    let response = yield call(axios.get, `${url}`)
    yield put({ type: SEARCH_SUCCESS, payload: response.data })
    yield put({ type: SET_ITEMS, payload: response.data })
  } catch (e) {
    if (e.response.status === 500) {
      yield put({ type: SET_ERROR, code: 500 })
    }
  }
}

export function* ItemRequest (action) {
  try {
    let response = yield call(axios.get, apiUrl('/items', action.payload, { prop:1 }))
    yield put({ type: MODAL_ITEM_SUCCESS, item: response.data.item, modalId: action.modalId })
  } catch (e) {

  }
}

export function* UserRequest (action) {
  try {
    if (cookies.get('token') !== undefined) {
      let response = yield call(axios.get, apiUrl('/users/profile'))
      yield put({ type: GET_USER_SUCCESS, payload: response.data })
    } else {
      yield put({ type: USER_NOT_AUTH })
    }
  } catch (e) {

  }
}

export function* ActiveOrdersRequest (action) {
  try {
    if (cookies.get('token') !== undefined) {
      let response = yield call(axios.get, apiUrl('/orders/active'))
      yield put({ type: GET_ACTIVE_ORDERS_SUCCESS, payload: response.data })
    }
  } catch (e) {
  }
}

export function* OrderSetItemsRequest (action) {
  try {
    if (cookies.get('token') !== undefined) {
      let response = yield call(axios.post,
              apiUrl(`/orders/${action.orderId}/${action.method}`, undefined, { ...action.prop }),
              { items:action.payload })
      if (response.data.orderItems) {
        yield put({ type: SET_ORDER_ITEMS, payload: response.data })
      }
      yield put({ type: ORDER_SET_ITEMS_SUCCESS, payload: response.data })
    }
  } catch (e) {
  }
}

export function* CreateNewOrderRequest (action) {
  try {
    if (cookies.get('token') !== undefined) {
      let response = yield call(axios.post, apiUrl(`/orders`), { order:{ name:action.payload } })
      yield put({ type: CREATE_NEW_ORDER_SUCCESS, payload: response.data })
    }
  } catch (e) {
  }
}

export function* SetActiveOrderRequest (action) {
  try {
    if (cookies.get('token') !== undefined) {
      let response = yield call(axios.post, apiUrl(`/orders/${action.payload}/select_order`))
      yield put({ type: SET_ACTIVE_ORDER_SUCCESS, payload: response.data })
    }
  } catch (e) {
  }
}

export function* OrderRequest (action) {
  try {
    if (cookies.get('token') !== undefined) {
      let response = yield call(axios.get, apiUrl('/orders', action.payload))
      yield put({ type: GET_ORDER_SUCCESS, payload: response.data })
    }
  } catch (e) {
  }
}

export function* ModalOrderRequest (action) {
  try {
    if (cookies.get('token') !== undefined) {
      let response = yield call(axios.get, apiUrl('/orders', action.payload))
      yield put({ type: MODAL_ORDER_SUCCESS, payload: response.data.order })
    }
  } catch (e) {
  }
}

export function* OrderComplete (action) {
  try {
    if (cookies.get('token') !== undefined) {
      let response = yield call(axios.post,
                  apiUrl(`/orders/${action.orderId}/complete`, undefined, { comment: action.comment }))
      if (response.data.success) {
        yield put({ type: HIDE_ALL_MODALS })
        yield put({ type: CLEAR_MODAL_ORDER })
        yield put({ type: SHOW_MODAL_COMPLETED_ORDER, payload: { ...response.data } })
        yield put({ type: GET_ACTIVE_ORDERS_REQUEST, payload: {} })
        yield put({ type: ORDER_COMPLETE_SUCCESS, payload: response.data.order })
      }
    }
  } catch (e) {
  }
}

export function* GetCompletedOrdersRequest (action) {
  try {
    if (cookies.get('token') !== undefined) {
      let response = yield call(axios.get, apiUrl('/orders/'))
      yield put({ type: GET_ORDERS_COMPLETED_SUCCESS, payload: response.data })
    }
  } catch (e) {
  }
}

export function* GetCompletedOrderRequest (action) {
  try {
    if (cookies.get('token') !== undefined) {
      let response = yield call(axios.get, apiUrl('/orders', action.payload))
      yield put({ type: GET_COMPLETED_ORDER_SUCCESS, payload: response.data })
    }
  } catch (e) {
  }
}

export function* GetOrderItems (action) {
  try {
    if (cookies.get('token') !== undefined) {
      let response = yield call(API.getOrderItems, action.orderId)
      yield put({ type: SET_ORDER_ITEMS, payload: response.data })
    }
  } catch (e) {

  }
}

export function* loadPopularItems (action) {
  try {
    let response = yield call(API.loadPopularItems, action.payload)
    yield put({ type: SET_ITEMS, payload: response.data })
  } catch (e) {
    console.info('SOME ERROR HAPPENED in loadPopularItems', e)
  }
}

export function* watchCreateLesson () {
  yield takeEvery(GET_GROUPS_REQUEST, createAsync)
  yield takeLatest(GET_GROUP_REQUEST, GroupRequest)
  yield takeEvery(SEARCH_REQUEST, SearchRequest)
  yield takeEvery(GET_USER_REQUEST, UserRequest)
  yield takeEvery(GET_ACTIVE_ORDERS_REQUEST, ActiveOrdersRequest)
  yield takeEvery(ORDER_SET_ITEMS_REQUEST, OrderSetItemsRequest)
  yield takeEvery(CREATE_NEW_ORDER_REQUEST, CreateNewOrderRequest)
  yield takeEvery(SET_ACTIVE_ORDER_REQUEST, SetActiveOrderRequest)
  yield takeEvery(GET_ORDER_REQUEST, OrderRequest)
  yield takeEvery(DELETE_ITEM_FROM_ORDER_REQUEST, OrderSetItemsRequest)
  yield takeEvery(ORDER_COMPLETE_REQUEST, OrderComplete)
  yield takeLatest(LOAD_POPULAR_ITEMS, loadPopularItems)
  yield takeEvery('@@router/LOCATION_CHANGE', locationChange)
  yield takeEvery(GET_ORDERS_COMPLETED_REQUEST, GetCompletedOrdersRequest)
  yield takeEvery(GET_COMPLETED_ORDER_REQUEST, GetCompletedOrderRequest)
  yield takeEvery(MODAL_ITEM_REQUEST, ItemRequest)
  yield takeEvery(MODAL_ORDER_REQUEST, ModalOrderRequest)
  yield takeEvery(GET_ORDER_ITEMS, GetOrderItems)
}

export default function* rootSaga () {
  yield all([
    watchCreateLesson(), watchCart(), watchItem()
  ])
}
