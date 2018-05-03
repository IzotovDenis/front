import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SignInForm from './SignInForm'
export default class SignIn extends Component {
  render () {
    const { user } = this.props
    return <div className='modal-dialog modal-xs'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4>Вход</h4>
        </div>
        <div className='modal-body'>
          <SignInForm />
        </div>
      </div>
    </div>
  }
}

SignIn.propTypes = {
  user: PropTypes.object
}
