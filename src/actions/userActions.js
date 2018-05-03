import { GET_USER_REQUEST, GET_USER_SUCCESS, UPDATE_USER_PROFILE, LOGOUT_USER } from '../constants/User'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export function getUserRequest () {
  return {
    type: GET_USER_REQUEST,
    payload: ''
  }
}

export function getUserSuccess (data) {
  return {
    type: GET_USER_SUCCESS,
    payload: data
  }
}

export function updateUserProfile (data) {
  return {
    type: UPDATE_USER_PROFILE,
    payload: data
  }
}

export function logoutUser(user) {
  cookies.remove("token", { path: '/' })
  console.log(cookies.get("token"))
  return {
    type: LOGOUT_USER
  }
}