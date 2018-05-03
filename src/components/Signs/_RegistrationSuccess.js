import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './images/success.svg'

export default class RegistrationSuccess extends Component {
  render () {
    const { user } = this.props
    return <div className='registration-success'>
      <div className='icon-success' > </div>
      <p className='lead'> Спасибо за регистрацию </p>
      <div className='content'>
       Для оформления заказов и просмотра оптовых цен, вам необходимо позвонить администратору.
       <div className='tel'>тел: 8 (4232) 35-55-17 </div>
       <div>Назовите ваши данные:</div>
       <div className='strong'> {user.name} ИНН: {user.inn} </div>
      </div>
    </div>
  }
}

RegistrationSuccess.propTypes = {
  user: PropTypes.object
}
