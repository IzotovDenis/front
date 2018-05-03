import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cookie from 'react-cookie'
import API from '../../helper/Api'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class SignInForm extends Component {
  constructor (props) {
    super(props)
    this.state = { email: '', password: '', error: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount () {
  }
  handleChange (event) {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({ [name]: value })
  }
  handleSubmit (event) {
    event.preventDefault()
    API.signIn(this.state.email, this.state.password).then(response => {
      if (response.data.success) {
        cookies.set('token', response.data.token, { path: '/', maxAge: 26784000 })
        window.location.replace('/')
      } else {
        this.setState({ error: true })
      }
    })
  }
  renderError () {
    if (this.state.error) {
      return <div className='alert alert-danger'>
        <span> Опаньки... :( Неверно указано имя пользователя и пароль</span>
      </div>
    } else {
      return null
    }
  }
  render () {
    return <div id='container'>
      <form onSubmit={this.handleSubmit}>
        {this.renderError()}
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Email или ИНН</label>
          <input name='email' type='email' className='form-control' id='exampleInputEmail1'
            placeholder='email или ИНН' value={this.state.email} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword'>Пароль</label>
          <input name='password' type='password' className='form-control' id='exampleInputPassword1'
            placeholder='Пароль' value={this.state.password} onChange={this.handleChange} />
        </div>
        <div className='center'>
          <button type='submit' className='btn btn-default'>Войти</button>
        </div>
      </form>
    </div>
  }
}

SignInForm.propTypes = {
  authUser: PropTypes.func
}

export default SignInForm
