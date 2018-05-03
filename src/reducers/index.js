import { combineReducers } from 'redux'
import user from './user'
import group from './group'
import items from './items'
import activeOrders from './activeOrders'
import completedOrders from './completedOrders'
import modal from './modal'
import search from './search'
import modalOrder from './modalOrder'
import view from './view'
import filters from './filters'
import discount from './discount'
import error from './error'
import cart from './cart'
import modalBackdrop from './modalBackdrop'
import item from './item'

export default combineReducers({
  user,
  group,
  items,
  activeOrders,
  modal,
  search,
  view,
  completedOrders,
  discount,
  modalOrder,
  filters,
  cart,
  error,
  modalBackdrop,
  item
})
