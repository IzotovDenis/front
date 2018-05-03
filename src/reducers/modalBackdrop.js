import { ADD_MODAL, DESTROY_MODAL } from '../constants/ModalBackdrop'

const initialState = {
  shown: false,
  count: 0,
  zIndex: 1039
}

const newState = {}

export default function modalBackdrop (state = initialState, action) {
  switch (action.type) {
    case ADD_MODAL:
      newState.shown = true
      newState.count = state.count+1
      newState.zIndex = initialState.zIndex+newState.count*10
      return { ...newState }
    case DESTROY_MODAL:
      newState.count = state.count-1
      newState.shown = (newState.count >= 1 ? true : false)
      newState.zIndex = initialState.zIndex+newState.count*10
      return { ...newState }
    default:
      return state
  }
}
