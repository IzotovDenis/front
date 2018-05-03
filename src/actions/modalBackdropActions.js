import { ADD_MODAL, DESTROY_MODAL } from '../constants/ModalBackdrop'

export function addModal () {
  return {
    type: ADD_MODAL
  }
}

export function destroyModal () {
  return {
    type: DESTROY_MODAL
  }
}