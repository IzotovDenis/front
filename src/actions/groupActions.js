import { GET_GROUPS_REQUEST, GET_GROUPS_SUCCESS, GET_GROUP_REQUEST, GET_GROUP_SUCCESS } from '../constants/Group'

export function getGroupsRequest () {
  return {
    type: GET_GROUPS_REQUEST,
    payload: ''
  }
}

export function getGroupsSuccess (data) {
  return {
    type: GET_GROUPS_SUCCESS,
    payload: data
  }
}

export function getGroupRequest (groupId, filters = {}) {
  return {
    type: GET_GROUP_REQUEST,
    group_id: groupId,
    filters: filters
  }
}

export function getGroupSuccess (data) {
  return {
    type: GET_GROUP_SUCCESS,
    payload: data
  }
}