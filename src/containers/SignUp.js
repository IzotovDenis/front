import React, { Component } from 'react'
import cookie from 'react-cookie'
import SignInForm from '../components/SignInForm.js'
import md5 from 'md5'
import PropTypes from 'prop-types'

function WhatToShow (props) {
  const isLoggedIn = props.isLoggedIn
  if (isLoggedIn) {
    return <div> Вы успешно авторизированы, что вам еще надо?
    <a href='/'>вернуться на сайт</a></div>
  }
  return <SignInForm />
}

WhatToShow.propTypes = {
  isLoggedIn: PropTypes.string.isRequired
}

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = { token: cookie.load('token') }
  }
  componentWillMount () {
    console.log('hellso')
    console.log(md5('message'))
  }
  handleSubmit (event) {
  }
  deleteCookie () {
    cookie.remove('token', { path: '/' })
    this.setState({ token: cookie.load('token') })
  }
  setCookie () {
    cookie.save('token', 'token', { path: '/' })
    this.setState({ token: cookie.load('token') })
  }
  render () {
    return <div id='container'>
      <button onClick={this.deleteCookie}>Убрать куку</button>
      <button onClick={this.setCookie}>Поставить куку</button>
      <WhatToShow isLoggedIn={this.state.token} />
    </div>
  }
}

export default SignIn
