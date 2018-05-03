import { SET_MODAL_COMPONENT,
  HIDE_MODAL, MODAL_ITEM_REQUEST,
  MODAL_ITEM_SUCCESS,
  MODAL_ORDER_REQUEST,
  SHOW_MODAL_ITEM_IMAGE,
  SHOW_MODAL_ITEM,
  SHOW_MODAL_ORDER,
  SHOW_MODAL_LOGIN,
  SHOW_MODAL_REGISTRATION,
  SHOW_MODAL_HOW_TO_BUY,
  SHOW_MODAL_NEW_ORDER,
  HIDE_ALL_MODALS } from '../constants/Modal'
import ItemModal from '../components/modals/ItemModal'
import NewOrderModal from '../components/modals/NewOrderModal'
import OrderModal from '../components/modals/OrderModal'
import HowToBuy from '../components/modals/HowToBuy'
import Login from '../components/Signs/Login'
import Registration from '../components/Signs/Registraton'
import ItemImageModal from '../components/modals/ItemImageModal'

export function setModalNewOrder () {
  return {
    type: SHOW_MODAL_NEW_ORDER,
    component: NewOrderModal
  }
}

export function openModalOrder (orderId) {
  return {
    type: SET_MODAL_COMPONENT,
    modal_component: OrderModal,
    orderId: orderId
  }
}

export function modalItemRequest (item, modalId) {
  return {
    type: MODAL_ITEM_REQUEST,
    modalId: modalId,
    payload: item
  }
}

export function modalItemSuccess (item) {
  return {
    type: MODAL_ITEM_SUCCESS,
    payload: item
  }
}

export function modalOrderRequest (orderId) {
  return {
    type: MODAL_ORDER_REQUEST,
    payload: orderId
  }
}

export function showModalHowToBuy () {
  return {
    type: SHOW_MODAL_HOW_TO_BUY,
    component: HowToBuy
  }
}

export function hideModal (modalId) {
  return {
    type: HIDE_MODAL,
    modalId: modalId
  }
}

export function setModalLogin () {
  return {
    type: SHOW_MODAL_LOGIN,
    component: Login
  }
}

export function setModalRegistration () {
  return {
    type: SHOW_MODAL_REGISTRATION,
    component: Registration
  }
}

export function showItemImageModal (item) {
  return {
    type: SHOW_MODAL_ITEM_IMAGE,
    component: ItemImageModal,
    item: item
  }
}

export function showItemModal (item) {
  return {
    type: SHOW_MODAL_ITEM,
    component: ItemModal,
    item: item
  }
}

export function showOrderModal (orderId) {
  return {
    type: SHOW_MODAL_ORDER,
    component: OrderModal,
    orderId: orderId
  }
}

export function hideAllModals () {
  return {
    type: HIDE_ALL_MODALS
  }
}
