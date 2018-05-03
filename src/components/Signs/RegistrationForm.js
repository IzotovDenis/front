import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import './css/index.sass'
import API from '../../helper/Api'

export default class RegistrationForm extends Component {
  constructor (props) {
    super(props)
    this.labels = {
      email: { text: 'email', type: 'email', field: 'input' },
      name: { text: 'Наименование', type: 'text', field: 'input' },
      city: { text: 'Город', type: 'text', field: 'input' },
      person: { text: 'Контактное лицо', type: 'text', field: 'input' },
      phone: { text: 'Телефон', type: 'text', field: 'input' },
      inn: { text: 'ИНН', type: 'text', field: 'input' },
      ogrn: { text: 'ОГРН', type: 'text', field: 'input' },
      kpp: { text: 'КПП', type: 'text', field: 'input' },
      legal_address: { text: 'Юридический адрес', type: 'text', field: 'input' },
      actual_address: { text: 'Фактический адрес', type: 'text', field: 'input' },
      bank_name: { text: 'Наименование банка', type: 'text', field: 'input' },
      bik: { text: 'БИК', type: 'text', field: 'input' },
      corr_account: { text: 'Корреспондентский счёт', type: 'text', field: 'input' },
      curr_account: { text: 'Лицевой счет', type: 'text', field: 'input' },
      note: { text: 'Примечание', type: 'text', field: 'textarea' },
      password: { text: 'Пароль', type: 'password', field: 'input' },
      password_confirmation: { text: 'Пароль еще раз', type: 'password', field: 'input' } }
    let fields = {}
    Object.keys(this.labels).map((key) =>
      fields[key] = '')
    this.state = { fields: fields, errors: {} }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.ListErrors = this.ListErrors.bind(this)
  }
  handleChange (event) {
    const target = event.target
    const name = target.name
    const value = target.value
    let fields = this.state.fields
    fields[name] = value
    this.setState({ fields: fields })
  }
  handleSubmit (event) {
    event.preventDefault()
    axios.post(`${API()}/users/sign_up`, { user: this.state.fields
    }).then(response => {
      if (response.data.success) {
        this.props.handleSuccessRegistration(response.data.user, response.data.token)
      } else {
        console.log(response.data.errors)
        this.setState({ errors: response.data.errors })
      }
    })
  }
  ListErrors (key) {
    if (this.state.errors[key]) {
      this.state.errors[key].map((error, index) => (<h1>Error</h1>))
    }
  }
  render () {
    const ListInputs = Object.keys(this.labels).map((key, index) =>
      <div className={`form-group ${this.state.errors[key] ? 'has-error' : ''}`} key={index}>
        <label className='col-sm-3 control-label'>{this.labels[key].text}</label>
        <div className='col-sm-9'>
          { this.labels[key].field === 'input' &&
          <input name={key} type={this.labels[key].type} className='form-control'
            placeholder={this.labels[key].text} value={this.state.fields[key]} onChange={this.handleChange} />
          }
          { this.labels[key].field === 'textarea' &&
          <textarea name={key} type={this.labels[key].type} className='form-control'
            placeholder={this.labels[key].text} value={this.state.fields[key]} onChange={this.handleChange} />
          }
          { this.state.errors[key]
            ? this.state.errors[key].map((msg, index) => <span className='error' key={index}>{msg} </span>)
            : null}
        </div>
      </div>
      )
    return <div>
      <form className='form-horizontal' onSubmit={this.handleSubmit}>
        {ListInputs}
        <div className='row center'>
          <button type='submit' className='btn btn-default'>Регистрация</button>
        </div>
      </form>
    </div>
  }
}
