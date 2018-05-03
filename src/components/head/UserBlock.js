import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserHead from './UserHead'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActions from '../../actions/modalActions'

class UserBlock extends Component {
  constructor (props) {
    super(props)
    this.handleClickLogin = this.handleClickLogin.bind(this)
    this.handleClickRegistration = this.handleClickRegistration.bind(this)
  }
  handleClickLogin () {
    this.props.modalActions.setModalLogin()
  }
  handleClickRegistration () {
    this.props.modalActions.setModalRegistration()
  }
  render () {
    const { user } = this.props
    if (user.loaded === false) {
      return null
    }
    if (user.auth === true) {
      return <UserHead />
    }
    return <div>
      <button className='btn btn-default' onClick={this.handleClickRegistration}>Регистрация</button>
      <button className='btn btn-default' onClick={this.handleClickLogin}>Войти</button>
    </div>
  }
}

export default connect(
  (state) => {
    return {
      user: state.user }
  },
  (dispatch) => {
    return {
      modalActions: bindActionCreators(modalActions, dispatch)
    }
  })(UserBlock)
