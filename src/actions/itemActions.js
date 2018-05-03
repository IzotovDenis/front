import { SET_ITEMS, LOAD_POPULAR_ITEMS, SET_ITEM, FETCH_ITEM } from '../constants/Item'

export function setItems (items) {
  return {
    type: SET_ITEMS,
    payload: items
  }
}

export function loadPopularItems (count) {
  return {
    type: LOAD_POPULAR_ITEMS,
    payload: count
  }
}

export function setItem (item) {
  return {
    type: SET_ITEM,
    item: item
  }
}

export function fetchItem(itemId){
  return {
    type: FETCH_ITEM,
    itemId: itemId
  }}