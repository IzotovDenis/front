import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RegistrationForm from './RegistrationForm'
import RegistrationSuccess from './_RegistrationSuccess'
import cookie from 'react-cookie'

export default class Registration extends Component {
  constructor (props) {
    super(props)
    this.state = { success: false, user: { name:'ООО Ромашковое поле', inn: '223242423' } }
    this.handleSuccessRegistration = this.handleSuccessRegistration.bind(this)
  }
  handleSuccessRegistration (user, token) {
    this.setState({ success: true, user: user })
    cookie.save('token', token, { path: '/', maxAge: 26784000 })
    this.props.userActions.getUserRequest()
    this.props.activeOrderActions.getActiveOrdersRequest()
  }
  _render () {
    if (this.state.success === true) {
      return <RegistrationSuccess user={this.state.user} />
    } else {
      return <RegistrationForm handleSuccessRegistration={this.handleSuccessRegistration} />
    }
  }
  render () {
    const { user } = this.props
    return <div className={`modal-dialog ${this.state.success ? 'modal-success' : 'modal-lg'}`}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4>Регистрация</h4>
        </div>
        <div className='modal-body'>
          {this._render()}
        </div>
      </div>
    </div>
  }
}

Registration.propTypes = {
  user: PropTypes.object
}
