import React from 'react'

import {
    SET_MODAL_COMPONENT,
    HIDE_MODAL, MODAL_ITEM_REQUEST,
    MODAL_ITEM_SUCCESS,
    MODAL_ORDER_REQUEST,
    MODAL_ORDER_SUCCESS,
    SHOW_MODAL_ITEM_IMAGE,
    SHOW_MODAL_ITEM,
    SHOW_MODAL_ORDER,
    SHOW_MODAL_LOGIN,
    SHOW_MODAL_REGISTRATION,
    SHOW_MODAL_HOW_TO_BUY,
    HIDE_ALL_MODALS,
    SHOW_MODAL_NEW_ORDER,
    SHOW_MODAL_COMPLETED_ORDER
      } from '../constants/Modal'

import {
  CREATE_NEW_ORDER_SUCCESS
} from '../constants/ActiveOrder'

import CompletedOrder from '../components/modals/CompletedOrder'

const initialState = {
  components: [],
  data: []
}

export default function modal (state = initialState, action) {
  switch (action.type) {
    case MODAL_ITEM_REQUEST:
      return { ...state }
    case SET_MODAL_COMPONENT:
      return { ...state, component: action.component, order: { items:[] } }
    case SHOW_MODAL_ITEM_IMAGE:
      return { ...state, components: [...state.components, action.component], data: [...state.data, { item: action.item }] }
    case SHOW_MODAL_ITEM:
      return { ...state, components: [...state.components, action.component], data: [...state.data, { item: action.item }] }
    case MODAL_ITEM_SUCCESS:
      return { ...state, data: [...state.data.slice(0, action.modalID - 1), { item: action.item }, ...state.data.slice(action.modalId)] }
    case SHOW_MODAL_ORDER:
      return { ...state, components: [...state.components, action.component], data: [...state.data, { orderId: action.orderId }] }
    case SHOW_MODAL_LOGIN:
      return { ...state, components: [...state.components, action.component], data: [...state.data] }
    case SHOW_MODAL_REGISTRATION:
      return { ...state, components: [...state.components, action.component], data: [...state.data] }
    case MODAL_ORDER_REQUEST:
      return { ...state, fetching: true, order_completed: false }
    case MODAL_ORDER_SUCCESS:
      return { ...state, order: action.payload, order_completed: false, fetching: false }
    case SHOW_MODAL_HOW_TO_BUY:
      return { ...state, components: [...state.components, action.component], data: [...state.data] }
    case SHOW_MODAL_COMPLETED_ORDER:
      return { ...state, components: [...state.components, CompletedOrder], data: [...state.data, action.payload] }
    case SHOW_MODAL_NEW_ORDER:
      return { ...state, components: [...state.components, action.component], data: [...state.data] }
    case 'ORDER_COMPLETE_SUCCESS':
      return { ...state, order_completed: true }
    case HIDE_MODAL:
      return {
        components: [...state.components.slice(0, action.modalId), ...state.components.slice(action.modalId + 1)],
        data: [...state.data.slice(0, action.modalId), ...state.data.slice(action.modalId + 1)] }
    case HIDE_ALL_MODALS:
      return {
        ...initialState
      }
    case CREATE_NEW_ORDER_SUCCESS:
      return { ...initialState }
    default:
      return state
  }
}
