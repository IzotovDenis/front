import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActions from '../../actions/modalActions'

class HowToBuy extends Component {
  constructor (props) {
    super(props)
    this.HandleCloseModal = this.HandleCloseModal.bind(this)
  }
  HandleCloseModal () {
    this.props.modalActions.hideAllModals()
  }
  NotAuth (user) {
    const mapUrl = 'http://2gis.ru/ussuriysk/callout/131.97921%2C43.78716%2C16/center/131.977483%2C43.789507/zoom/16?utm_source=api2gis&utm_medium=widget&utm_campaign=firmsonmap%2F'// eslint-disable-line
    return <div className='row'>
      <div className='col-xs-6'>
        <h4>Я розничный покупатель</h4>
        <p> Адрес розничного магазина:</p>
        <p className='strong'>г.Уссурийск, ул.Сергея Ушакова, дом 21 </p>
        <p className='strong'> Телефон розничного зала (4234) 35-55-27</p>
        <p className='strong'> Телефон СТО (4234) 35-30-44 </p>
        <p><Link className='strong' to={mapUrl} target='_blank'>ОТКРЫТЬ КАРТУ</Link> (откроется в новом окне)</p>
      </div>
      <div className='col-xs-6'>
        <h4>Я оптовый покупатель</h4>
        <p className='strong'>
          -- Я первый раз на сайте. Я не проходил регистрацию.
        </p>
        <p>
          Вам необходимо пройти регистрацию на сайте. Кнопка регистрации в правом верхнем углу сайта.
        </p>
        <p>После регистрации вы сможете:</p>
        <ul>
          <li className='strong'>Смотреть оптовые цены</li>
          <li className='strong'>Смотреть остатки товара</li>
          <li className='strong'>Формировать и отправлять заказы</li>
        </ul>
        <p className='strong'>
          -- Я прошел регистрацию, у меня есть учетная запись.
        </p>
        <p>
          Вам необходимо авторизироваться на сайте. Кнопка в правом верхнем углу сайта.
        </p>
      </div>
    </div>
  }
  AuthCantOrder (user) {
    const userProps =
      { id:'Ваш ID',
        email:'e-mail',
        name:'Наименование организации',
        inn:'ИНН',
        person:'Контактное лицо',
        city:'Город' }
    const showProps = Object.keys(userProps).map((key, index) =>
      <p key={index}>{userProps[key]} = {user.profile[key]}</p>
    )

    return <div>
      <h1> Ваш аккаунт не активирован. </h1>
      <p> Для активации аккаунта вам необходимо позвонить администратору </p>
      {showProps}
    </div>
  }
  _render (user) {
    if (user.auth === false && user.can_order === false) {
      return this.NotAuth(user)
    } else if (user.auth === true && user.can_order === false) {
      return this.AuthCantOrder()
    }
  }
  render () {
    const { user } = this.props
    return <div className='modal-dialog modal-lg'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4>Как оформить заявку</h4>
        </div>
        <div className='modal-body'>
          {this._render(user)}
          <div className='row center'>
            <button className='btn btn-default btn-lg' onClick={this.HandleCloseModal}>Все понятно, закрыть это окно.</button>
          </div>
        </div>
      </div>
    </div>
  }
}

HowToBuy.propTypes = {
  user: PropTypes.object
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HowToBuy)
