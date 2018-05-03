import { GET_GROUPS_REQUEST, GET_GROUPS_SUCCESS } from '../constants/Group'

const initialState = {
  groups: {},
  tree: [],
  second: [],
  loaded: false
}

export default function page (state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS_REQUEST:
      return { ...state }
    case GET_GROUPS_SUCCESS:
      return { ...state, groups: action.payload.groups, tree: action.payload.tree, loaded: true }
    default:
      return state
  }
}
