import React, { Component } from 'react'
import cookie from 'react-cookie'
import SignInForm from '../components/SignInForm.js'
import PropTypes from 'prop-types'

function WhatToShow (props) {
  const isLoggedIn = props.isLoggedIn
  if (isLoggedIn) {
    return <div> Вы успешно авторизированы, что вам еще надо?
            <a href='/'>вернуться на сайт</a>
    </div>
  }
  return <SignInForm authUser={props.authUser} />
}

WhatToShow.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  authUser: PropTypes.bool.isRequired
}

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = { token: cookie.load('token') }
    this.authUser = this.authUser.bind(this)
  }
  componentWillMount () {
    console.log('hello')
  }
  handleSubmit (event) {
  }
  deleteCookie () {
    cookie.remove('token', { path: '/' })
    this.setState({ token: cookie.load('token') })
  }
  authUser (data) {
    cookie.save('token', data.token, { path: '/' })
    this.setState({ token: data.token })
    window.location.replace('http://localhost:8080')
  }
  setCookie () {
    cookie.save('token', 'token', { path: '/' })
    this.setState({ token: cookie.load('token') })
  }
  render () {
    return <div id='container'>
      <div className='center'>
        <img src='images/logo100.png' />
      </div>
      <button onClick={this.deleteCookie}>Убрать куку</button>
      <WhatToShow isLoggedIn={this.state.token} authUser={this.authUser} />
    </div>
  }
}

export default SignIn
