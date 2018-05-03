import { call, put, takeLatest } from 'redux-saga/effects'
import { 
  FETCH_ITEM, SET_ITEM
} from '../constants/Item'
import API from '../helper/Api'

export function* fetchItem (action) {
  try {
    let response = yield call(API.getItem, action.itemId)
    yield put({ type: SET_ITEM, item: response.data.item })
  } catch (e) {
    console.error(e)
  }
}


export default function* watchCart () {
  yield takeLatest(FETCH_ITEM, fetchItem)
}